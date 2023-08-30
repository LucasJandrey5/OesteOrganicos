import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import API from '../../../config/API';

import BuscarPorItem from './BuscarPorItem';

import {
  Icon,
  Text,
  Input,
  HStack,
  Avatar,
  VStack,
  List,
  ScrollView,
  Fab,
  View,
  Image,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createMaterialTopTabNavigator();

export default function BuscaPorProdutorItem({ navigation }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);
  const [enableButton, setEnableButton] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const loadData = async () => {
    try {
      const response = await API.call('produtor-produto/0');
      setData(response.data);

      let pedidoAS = await AsyncStorage.getItem('pedido');
      if (pedidoAS) {
        setEnableButton(true);
      } else {
        setEnableButton(false);
      }
    } catch (error) {
      console.error(error);
    }
    setCarregando(false);
  };

  useState(() => {
    loadData();
  });

  const searchData = (text) => {
    if (text) {
      const newArray = data.filter((item) => {
        const itemData = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
        console.log(text);
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearch(text);
      setData(newArray);
      console.log(data);
    } else {
      loadData();
      setSearch(null);
    }
  };

  const ListagemProdutor = () => (
      <>
        <View w="100%" alignSelf="flex-start" backgroundColor="white">
          <Input
              placeholder="Pesquisar"
              value={search}
              onChangeText={(value) => searchData(value)}
              onClear={(text) => searchData('')}
              width="100%"
              borderRadius="4"
              py="3"
              px="1"
              fontSize="14"
              InputLeftElement={
                <Icon
                    m="2"
                    ml="3"
                    size="6"
                    color="gray.400"
                    as={<FontAwesome name="search" />}
                />
              }
              InputRightElement={
                <Icon
                    m="2"
                    mr="3"
                    size="6"
                    color="gray.400"
                    as={<FontAwesome name="microphone" />}
                />
              }
          />
        </View>

        <View style={{ backgroundColor: 'white' }}>
          {carregando && (
              <View
                  style={{
                    backgroundColor: '#CBEDD1',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      padding: '3%',
                    }}>
                  {' '}
                  Carregando...
                </Text>
              </View>
          )}
        </View>

        <ScrollView
            contentContainerStyle={{ width: '100%' }}
            backgroundColor="white">
          <List px={3} py={0} borderWidth={0} borderRightWidth={0} w="100%" >
            {data?.map((item, index) => (
                <List.Item
                    borderBottomWidth="1"
                    key={index}
                    onPress={() => {
                      navigation.navigate('ProdutosProdutor', { item: item || null });
                    }}
                    _hover={{ bg: 'coolGray.300' }}>
                  <View pl={['0', '4']} pr={['0', '5']} py="2">
                    <HStack
                        space={[3, 0]}
                        justifyContent="space-between"
                        alignContent="center">
                      <Avatar alt="img"
                          size="58px"
                          source={{
                            uri: 'https://media.istockphoto.com/id/1156406125/pt/vetorial/user-green-icon-avatar-vector.jpg?s=170667a&w=0&k=20&c=tFRJyvbOVeVmO2sV87VOMdIanPASdciVlt3xpBBqScU=',
                          }}
                      />
                      <VStack justifyContent="center">
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
                          {item.descricao || 'Descrição'}
                        </Text>
                      </VStack>
                    </HStack>
                  </View>
                </List.Item>
            ))}
          </List>
        </ScrollView>

        {enableButton ? (
            <Fab
                onPress={() => navigation.navigate('VerSacola')}
                renderInPortal={false}
                shadow={6}
                colorScheme="green"
                placement="bottom-left"
                right={4}
                height="10"
                size="sm"
                borderRadius="10"
                icon={<Icon as={FontAwesome} name="shopping-cart" size="5" />}
                label={
                  <Text color="white" fontSize="sm">
                    Ver Sacola
                  </Text>
                }
            />
        ) : (
            <></>
        )}
      </>
  );

  return (
      <Tab.Navigator>
        <Tab.Screen name="Produtor" component={ListagemProdutor} />
        <Tab.Screen name="Itens" component={BuscarPorItem} />
      </Tab.Navigator>
  );
}
