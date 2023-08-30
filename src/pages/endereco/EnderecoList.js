import React, { useState, useEffect } from 'react';
import API from '../../../config/API';
import { View, StyleSheet, Dimensions, StatusBar, Animated, Pressable} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { NativeBaseProvider, Box, Icon, Text, HStack, Avatar, VStack, Spacer, FlatList,
  ScrollView, Image, Card, Center, Button, List, Divider, useColorMode, Fab} from 'native-base';


export default function EnderecoList({ navigation }) { //AJUSTADO

  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);

  const loadData = async () => {
    try {
      const response = await API.call('endereco');
      setData(response.data);
      // return data;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  
  //useState useEffect
  useState(() => {
    //  const response = API.call('endereco');
    // setData(response.data);
    //  return data;
    //console.log(response.data);
    loadData();
  });

  searchData = (text) => {
    if (text) {
      //alert('Pesquisando... ' + text);
      const newArray = data.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        console.log(text);
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
     // setTimeout(() => {
        setSearch(text);
        setData(newArray);
        console.log(data);
     // }, '3000');
    } else { 
      loadData();
      setSearch(null);
    }
  };

  const { colorMode, toggleColorMode } = useColorMode();

  const ListagemProdutos = () => (
    <>
    <ScrollView contentContainerStyle={{ width: '100%' }}>
        <List
          divider={
            <Divider ml={16} opacity={colorMode == 'dark' ? '0.4' : '1'} />
          }
          px={1}
          // mt={12}
          py={0}
          // borderColor="red.200"
          borderWidth={0}
          borderRightWidth={0} 
          w="100%">
          {data?.map((item, index) => (
            <List.Item
              key={index}
              onPress={() => {
                navigation.navigate('EnderecoForm', { item: item || null });
                //alert('Teste ' + item.name + ' - ' + item.id);
              }}
              _hover={{ bg: 'coolGray.300' }}>

              <Box pl={['0', '4']} pr={['0', '5']} py="2">
                <HStack space={[3, 0]} justifyContent="space-between">

                  <VStack>
                    <Text
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color="coolGray.800"
                      bold>
                      {item.nome}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.produtor_id}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.comercio_id}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.municipio_id}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.tipo}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.rua}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.numero}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.cep}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.bairro}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.complemento}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.ponto_referencia}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.estacionamento}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.refeicao}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.latitude}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.longitude}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.iconeMapa}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.telefone}
                    </Text>
                  </VStack>

                  <Spacer />

                  <Text
                    fontSize="xs"
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="coolGray.800"
                    alignSelf="flex-start">
                    {item.timeStamp}
                  </Text>

                </HStack>
              </Box>
            </List.Item>
          ))}
        </List>
      </ScrollView>
    </>
  );

  return ( 
    <NativeBaseProvider>  
      <ScrollView> 
        <Box>
          <Card style={styles.cardListagem}>
            <ListagemProdutos />
          </Card>

          <Fab
            placement="bottom-right"
            colorScheme="green"
            size="lg"
            icon={<Icon as={FontAwesome} name="plus" size="sm" />}
            onPress={() => navigation.navigate('EnderecoForm', { item: '' })}
          />
 
        </Box>
      </ScrollView>
    </NativeBaseProvider>
    
  );
}
const styles = StyleSheet.create({
   cardListagem:{
    borderRadius: 0,
    shadowRadius: 0,
    marginTop: -30,
    width: '100%',
  },
});