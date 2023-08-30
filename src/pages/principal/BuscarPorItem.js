import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import API from '../../../config/API';

import {
  Icon,
  Text,
  Input,
  HStack,
  Avatar,
  VStack,
  Spacer,
  List,
  Image,
  Box,
  ScrollView,
  View,
  useColorMode,
} from 'native-base';

const BuscarPorItem = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const loadData = async () => {
    try {
      const response = await API.call('produtor-produto/0'); //0 carrega todos
      setData(response.data);
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

  return (
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
              Carregando...
            </Text>
          </View>
        )}
      </View>

      <ScrollView
        contentContainerStyle={{ width: '100%' }}
        backgroundColor="white">
        <List>
          {data?.map((item, index) => (
            <List.Item
              style={{ justifyContent: 'flex-start', width: '95%', alignSelf:"center" }}
              borderBottomWidth="1"
              key={index}
              onPress={() => {
                navigation.navigate('ProdutosProdutor', {
                  item: item || null,
                });
              }}
              _hover={{ bg: 'coolGray.300' }}>
              <VStack style={{width:280, alignSelf:"center"}}>
                <HStack
                  space={[3, 0]}
                  justifyContent="flex-start"
                  alignItems="center">
                  <Avatar
                    size="58px"
                    source={{
                      uri: 'https://media.istockphoto.com/id/1156406125/pt/vetorial/user-green-icon-avatar-vector.jpg?s=170667a&w=0&k=20&c=tFRJyvbOVeVmO2sV87VOMdIanPASdciVlt3xpBBqScU=',
                    }}
                  />
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
                      {item.descricao || 'Descrição'}
                    </Text>
                  </VStack>
                </HStack>

                {/* */}
                <HStack
                  w="100%"
                  space={5}
                  alignSelf="flex-start">
                  <ScrollView
                    contentContainerStyle={{ width: '100%' }}
                    horizontal>
                    <List
                      flexDirection="row"
                      justifyContent="flex-start"
                      borderWidth={0}
                      >
                      {item.produtos.map((subItem, index) => (
                        <List.Item
                          key={index}
                          onPress={() => {
                            navigation.navigate('ProdutoDetalhe', {
                              item: subItem || null,
                              produtorObj: item,
                            });
                          }}
                          _hover={{ bg: 'coolGray.300' }}>
                          <Box
                            borderRadius="0"
                            shadowRadius="0"
                            width="100%"
                            borderWidth={0}
                            padding="2">
                            <HStack
                              justifyContent="flex-start"
                              alignItems="center">
                              <Image
                                size="60px"
                                borderRadius="5"
                                source={{
                                  uri: subItem.imagem
                                    ? API.urlFile() + subItem.imagem
                                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKiT0OTac84GzM5Vgb3F2ggLuSxIKbpFJoHg&usqp=CAU',
                                }}
                              />
                              <VStack>
                                <Text
                                  alignSelf="center"
                                  _dark={{
                                    color: 'warmGray.50',
                                  }}
                                  color="coolGray.800"
                                  bold>
                                  {subItem.nome}
                                </Text>
                                <Text
                                  color="coolGray.600"
                                  alignSelf="center"
                                  _dark={{
                                    color: 'warmGray.200',
                                  }}>
                                  R$
                                  {subItem.preco}
                                </Text>
                              </VStack>
                            </HStack>
                          </Box>
                        </List.Item>
                      ))}
                    </List>
                  </ScrollView>
                </HStack>
              </VStack>
              {/* */}
              <Spacer />
            </List.Item>
          ))}
        </List>
      </ScrollView>
    </>
  );
};

export default BuscarPorItem;
