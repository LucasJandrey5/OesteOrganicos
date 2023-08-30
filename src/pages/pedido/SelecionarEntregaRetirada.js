import React, { useState, useEffect } from 'react';
import API from '../../../config/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  Stack,
  HStack,
  Avatar,
  View,
  Fab,
  Button,
  ScrollView,
} from 'native-base';
import { SelectList } from 'react-native-dropdown-select-list';
import SelecionarRetirada from './SelecionarRetirada';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function SelecionarEntregaRetirada({ navigation }) {

  const SelecionarEntrega = ({ navigation }) => {
    
  const [enderecoUsuario, setEnderecoUsuario] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState([]);
  const [pedido, setPedido] = useState({});
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const values = await AsyncStorage.getItem('@usuario');
      let usuario = await JSON.parse(values);

      const pedidoAS = await AsyncStorage.getItem('pedido');
      let dataPedido = (await JSON.parse(pedidoAS)) || [];
      if (usuario) {
        setData(usuario); 
      } //data = usuario

      console.log("usuario");
      console.log(usuario);

      const response = await API.call(
        'usuario-endereco/' + usuario.usuario_id
      );

      setEnderecoUsuario(response.data[0].enderecos);
      setPedido(dataPedido);

      let ep = response.data[0].enderecos.map((item) => {
        return {
          key: item.id,
          value: item.nome,
        };
      });
      setEnderecoSelecionado(ep);
      console.log("ep");
      console.log(ep);
      
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    loadData();
  });

  const saveData = async (data) => {
    try {
      setPedido({
        ...pedido,
        endereco: enderecoUsuario,
      });
      console.log(pedido);
      console.log(pedido.endereco);

      await AsyncStorage.setItem('pedido', JSON.stringify(pedido));

      if (Object.keys(enderecoSelecionado).length < 0) {
        alert('selecione um endereço para continuar');
      } else {
        navigation.push('ConfirmarPedido');
      }
    } catch (error) {
      console.error(error);
    }
  };

  {
    /* Primeira tab- SELECIONAR ENTREGA */
  }
  return(
    <>
      <ScrollView
        contentContainerStyle={{ width: '100%' }}
        backgroundColor="white">
        <View
          style={{
            backgroundColor: '#CBEDD1',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              padding: '5%',
            }}>
            Receba o produto na sua casa!
          </Text>
        </View>
        <HStack
          margin="4"
          paddingBottom="5"
          borderBottomWidth="1"
          alignItems="center"
          borderColor="grey">
          <Avatar
            size="58px"
            source={{
              uri: 'https://media.istockphoto.com/id/1156406125/pt/vetorial/user-green-icon-avatar-vector.jpg?s=170667a&w=0&k=20&c=tFRJyvbOVeVmO2sV87VOMdIanPASdciVlt3xpBBqScU=',
            }}
          />
          <Text bold marginLeft="3">
            {data.name || 'Nome do usuario'}
          </Text>
        </HStack>

        <View margin="5%">
          <Text bold fontSize="14" marginBottom="5%">
            Endereço de entrega:
          </Text>

          <SelectList
            onSelect={() => pedido.endereco}
            setSelected={(value) => {
              let ep = enderecoUsuario.filter((e) => e.id === value);
              setPedido({ ...pedido, endereco: ep[0] });
            }}
            data={enderecoSelecionado}
            save="key"
            defaultOption={{
              key: pedido.endereco?.id || 1,
              value: pedido.endereco?.nome || '',
            }}
            searchPlaceholder="Selecione seu endereço "
            placeholder="Selecione seu endereço"
            boxStyles={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#d9d9d9',
              padding: 10,
            }} //override default styles
            dropdownStyles={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#d9d9d9',
              padding: 10,
              backgroundColor: '#CBEDD1',
            }}
          />

          <Text
            onPress={() => {
              navigation.navigate('FormularioEnderecos');
            }}
            fontSize="12"
            color="grey"
            marginTop="7%"
            textDecorationLine="underline">
            Não tem endereço cadastrado?
          </Text>

          <Button
            size="sm"
            colorScheme="green"
            width="60%"
            marginTop="3%"
            onPress={() => {
              navigation.navigate('FormularioEnderecos');
            }}>
            Cadastrar novo endereço
          </Button>

          <Text bold fontSize="14" marginTop="10%">
            Data de entrega:
          </Text>
          <Text fontSize="14" marginTop="2%">
            A ser combinada com o produtor
          </Text>
        </View>

        <Stack
          style={{
            backgroundColor: '#CBEDD1',
            marginTop: '5%',
            padding: '10%',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Fab
            onPress={saveData}
            renderInPortal={false}
            shadow={6}
            colorScheme="green"
            placement="bottom"
            right={0}
            paddingRight="40%"
            paddingLeft="40%"
            height="10"
            size="sm"
            borderRadius="10"
            label={
              <Text color="white" fontSize="sm">
                Continuar
              </Text>
            }
          />
        </Stack>
      </ScrollView>
    </>
  )
  };

  return (
    <Tab.Navigator>
      <Tab.Screen name="Entrega" component={SelecionarEntrega} />
      <Tab.Screen name="Retirada" component={SelecionarRetirada} />
    </Tab.Navigator>
  );
}
