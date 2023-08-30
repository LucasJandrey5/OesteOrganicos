import React, { useState, useCallback } from 'react';
import API from '../../../config/API';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {
  NativeBaseProvider,
  Box,
  Icon,
  Text,
  HStack,
  Avatar,
  VStack,
  Spacer,
  FlatList,
  ScrollView,
  Card,
  Image,
  Button,
  Input,
  Fab,
  List,
  Divider,
  useColorMode,
  colorMode,
} from 'native-base';

const Tab = createMaterialTopTabNavigator();

export default function TelaPrincipalFiltro({ navigation, route }) {
  const { item, jumpTo, endereco } = route.params || 0;

  const [objeto, setObjeto] = useState({});
  //const navigation = useNavigation();

  //const { item } = route.params;
  console.log('ITEMM');
  console.log(item);
  const [data, setData] = useState([]);
  const [dataTipo, setDataTipo] = useState([]);
  const [search, setSearch] = useState(null);
  const [idFiltro, setIdFiltro] = useState(0);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState([]);

  //função que é carregada quando a página é chamada
  useFocusEffect(
      useCallback(() => {
        //função que vai retornar alguma coisa
        if (jumpTo) {
          if (jumpTo === 'Fruta') {
            navigation.jumpTo('Fruta');
          }
          if (jumpTo === 'Verdura') {
            navigation.jumpTo('Verdura');
          }
          if (jumpTo === 'Carboidrato') {
            navigation.jumpTo('Carboidrato');
          }
        }
      }, [jumpTo]) //(a função useCallback tá retornando jumpTo)
  );

  const loadData = async (idParam = 0) => {
    try {
      let id = item ? item.id : idParam;
      //console.log('id: ' + id);
      const responseTP = await API.call('tipo-produto');
      // console.log('DataTipo');
      // console.log(responseTP.data);
      setDataTipo(responseTP.data);

      if (id === 0) {
        //console.log('id: true');
        const responseP = await API.call('produto');
        setData(responseP.data);
      } else {
        //console.log('id: false');
        const responsePT = await API.call('produto-por-tipo/' + id);
        setData(responsePT.data[0].produtos);
        //console.log('TESTE!!!!');
        //console.log(responsePT.data);
      }

      const enderecoSelecionado = await AsyncStorage.getItem(
          'enderecoSelecionado'
      );

      let dataEndereco = (await JSON.parse(enderecoSelecionado)) || [];
      console.log('dataEndereco');
      console.log(dataEndereco);

      setEnderecoSelecionado(dataEndereco);

    } catch (error) {
      console.error(error);
    }
  };
  //useState useEffect

  useState(() => {
    loadData();
  });

  const searchData = (text) => {
    if (text) {
      //alert('Pesquisando... ' + text);
      const newArray = data.filter((item) => {
        const itemData = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
        //console.log(text);
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      // setTimeout(() => {
      setSearch(text);
      setData(newArray);
      //console.log(data);
      // }, '3000');
    } else {
      loadData();
      setSearch(null);
    }
  };

  const TelaPrincipal = () => {
    return (
        <>
          <ScrollView>
            <Button
                fontSize="14"
                backgroundColor="lightgray"
                borderRadius="10"
                width="90%"
                alignSelf="center"
                marginTop="10px"
                marginBottom="10px"
                onPress={() => {
                  navigation.navigate('EnderecosUsuario', {
                    item: '',
                  });
                }}
                startIcon={<Icon as={FontAwesome} name="map" size="sm" />}>
              {enderecoSelecionado?.nome} {enderecoSelecionado?.rua}
            </Button>
            <VStack w="100%" space={5} alignSelf="center">
              <Input
                  placeholder="Pesquisar"
                  value={search}
                  onChangeText={(value) => searchData(value)}
                  onClear={(text) => searchData('')}
                  py="3"
                  px="1"
                  fontSize="14"
                  backgroundColor="lightgray"
                  borderRadius="10"
                  width="90%"
                  alignSelf="center"
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
            </VStack>

            {/*{console.log('VERDURA')}*/}
            {/*{console.log(data)}*/}

            <Box style={styles.alinhamento}>
              <ScrollView horizontal={true}>
                <VStack w="100%" space={5} alignSelf="flex-start">
                  <List
                      flexDirection="row"
                      justifyContent="space-around"
                      borderWidth={0}
                      w="100%">
                    {dataTipo?.map((item, index) => (
                        <List.Item
                            key={index}
                            onPress={() => {
                              /*let nomeRota = '"' + item.nome + '"';
                            console.log(nomeRota);
                            navigation.jumpTo(nomeRota);*/

                              if (item.nome === 'Fruta') {
                                navigation.jumpTo('Fruta');
                              }
                              if (item.nome === 'Verdura') {
                                navigation.jumpTo('Verdura');
                              }
                              if (item.nome === 'Carboidratos') {
                                navigation.jumpTo('Carboidrato');
                              }

                              // alert(item.id);
                              setIdFiltro(item.id);
                              loadData(item.id); //chama o loadData e passa o id clicado por parametro
                            }}
                            _hover={{ bg: 'coolGray.300' }}>
                          <Box
                              borderRadius="0"
                              shadowRadius="0"
                              width="100%"
                              borderWidth={0}
                              margin="0"
                              padding="2">
                            <HStack justifyContent="space-around">
                              <Box
                                  borderRadius="0"
                                  shadowRadius="0"
                                  alignItems="center">
                                <Image
                                    size="58px"
                                    borderRadius="10"
                                    width="90"
                                    alt="Imagem"
                                    source={require('../../assets/produto/verduras.jpg')}
                                />
                                <VStack>
                                  <Text
                                      _dark={{
                                        color: 'warmGray.50',
                                      }}
                                      color="coolGray.800"
                                      padding="1">
                                    {item?.nome}
                                  </Text>
                                </VStack>
                              </Box>
                            </HStack>
                          </Box>
                        </List.Item>
                    ))}
                  </List>
                </VStack>
              </ScrollView>
            </Box>

            {/*
          <Card style={styles.card}>
            <Text style={styles.titulo}>RECOMENDADOS</Text>
          </Card>
          <Box style={styles.alinhamento}>
            <ScrollView horizontal={true}>
              <Card style={styles.recomendados}>
                <Card style={styles.cardRecomendacao}>
                  <Button style={styles.imgRecomendacao}>
                    <Image
                      style={styles.imgRecomendacao}
                      source={require('../../assets/laranjaRecomecacao.jpg')}
                    />
                  </Button>
                </Card>
                <Text style={styles.textoCardSub}> Laranja X </Text>
              </Card>

              <Card style={styles.recomendados}>
                <Card style={styles.cardRecomendacao}>
                  <Button style={styles.imgRecomendacao}>
                    <Image
                      style={styles.imgRecomendacao}
                      source={require('../../assets/uvaRecomendacao.jpg')}
                    />
                  </Button>
                </Card>
                <Text style={styles.textoCardSub}> Uva Y </Text>
              </Card>

              <Card style={styles.recomendados}>
                <Card style={styles.cardRecomendacao}>
                  <Button style={styles.imgRecomendacao}>
                    <Image
                      style={styles.imgRecomendacao}
                      source={require('../../assets/geleiaRecomendacao.jpg')}
                    />
                  </Button>
                </Card>
                <Text style={styles.textoCardSub}> Geleia Z </Text>
              </Card>
            </ScrollView>
          </Box>
          */}

            <Card style={styles.card}>
              <Text style={styles.titulo}>PRODUTOS</Text>
            </Card>
            <ScrollView contentContainerStyle={{ width: '100%' }}>
              {/*{console.log(data?.produtos)}*/}
              <List
                  divider={
                    <Divider ml={16} opacity={colorMode == 'dark' ? '0.4' : '1'} />
                  }
                  px={3}
                  // mt={12}
                  py={0}
                  // borderColor="red.200"
                  borderWidth={0}
                  borderRightWidth={0}
                  w="100%">
                {data.map((item, index) => (
                    <List.Item
                        key={index}
                        onPress={() => {
                          navigation.navigate('ProdutoForm', {
                            item: item,
                            produtorObj: '',
                            estoqueObj: '',
                          }); //item é o produto
                          //alert('Teste ' + item.name + ' - ' + item.id);
                          {
                            /*console.log(item.nome + data.nome);*/
                          }
                        }}
                        _hover={{ bg: 'coolGray.300' }}>
                      <Box pl={['0', '4']} pr={['0', '5']} py="2">
                        <HStack space={[3, 0]} justifyContent="space-between">
                          <Avatar
                              size="58px"
                              source={{
                                uri:
                                    item.avatarUrl ||
                                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
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
                              {item.preco}
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
          </ScrollView>
        </>
    );
  };

  return (
      <Tab.Navigator
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarIndicatorStyle: {
              backgroundColor: 'green',
              tabBarActiveTintColor: 'green',
              tabBarStyle: { backgroundColor: 'green' },
              height: 2,
            },
          }}>
        <Tab.Screen
            name="Inicio"
            component={TelaPrincipal}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                loadData(0); // id do tipo
                navigation.jumpTo('Produtor');
              },
            })}
        />
        <Tab.Screen
            name="Verdura"
            component={TelaPrincipal}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                loadData(7); // id do tipo
                navigation.jumpTo('Verdura');
              },
            })}
        />
        <Tab.Screen
            name="Fruta"
            component={TelaPrincipal}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                loadData(6); // id do tipo
                navigation.jumpTo('Fruta');
              },
            })}
        />
        <Tab.Screen
            name="Carboidrato"
            component={TelaPrincipal}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                loadData(8); // id do tipo
                navigation.jumpTo('Carboidrato');
              },
            })}
        />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
    shadowRadius: 0,
  },
  titulo: {
    marginBottom: -12,
    marginTop: 0,
    fontSize: 15,
    textAlign: 'left',
  },
  alinhamento: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});