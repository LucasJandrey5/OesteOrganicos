import React, { useState } from 'react';
import API from '../../../config/API';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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

export default function TelaPrincipalAba({ navigation }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);

  const loadData = async () => {
    try {
      const response = await API.call('produto');
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //useState useEffect
  useState(() => {
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




  function filtraVerdura(verdura){
    return verdura.tipo = 7;
  }

 


  const TelaPrincipal = ({ navigation }) => (
    <>
      <ScrollView>
        <Card style={styles.card}>
          <Text style={styles.subtitle}>Endereço: Getúlio Vargas, 155</Text>
        </Card>


        /*
        <Box style={styles.alinhamento}>
          <ScrollView horizontal={true}>
            <Card style={styles.categoria}>
              <Card style={styles.cardSubcategorias}>
                <Button
                  style={styles.cardSubcategorias}
                  onPress={() => {
                    navigation.jumpTo('Verduras');
                    let data = data.filter((e)=> e.tipo_produto_id ==6)
                    setData(data);

                  }}>
                  <Image
                    style={styles.imgSubcategoria}
                    source={require('../../assets/produto/verduras.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Verduras </Text>
            </Card>

            <Card style={styles.categoria}>
              <Card style={styles.cardSubcategorias}>
                <Button style={styles.cardSubcategorias}
                  onPress={() => {
                    navigation.jumpTo('Frutas');
                    let data = data.filter((e)=> e.tipo_produto_id == 7)
                    setData(data);

                  }}>
                  <Image
                    style={styles.imgSubcategoria}
                    source={require('../../assets/produto/frutas.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Frutas </Text>
            </Card>

            <Card style={styles.categoria}>
              <Card style={styles.cardSubcategorias}>
                <Button style={styles.cardSubcategorias}>
                  <Image
                    style={styles.imgSubcategoria}
                    source={require('../../assets/produto/massa.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Carboidratos </Text>
            </Card>

            <Card style={styles.categoria}>
              <Card style={styles.cardSubcategorias}>
                <Button style={styles.cardSubcategorias}>
                  <Image
                    style={styles.imgSubcategoria}
                    source={require('../../assets/produto/legumes.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Legumes </Text>
            </Card>
          </ScrollView>
        </Box>
        */



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
                    source={require('../../assets/produto/laranjaRecomecacao.jpg')}
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
                    source={require('../../assets/produto/geleiaRecomendacao.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Geleia Z </Text>
            </Card>
          </ScrollView>
        </Box>

        <Card style={styles.card}>
          <Text style={styles.titulo}>PRODUTOS</Text>
        </Card>

        <ScrollView contentContainerStyle={{ width: '100%' }}>
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
            {data?.map((item, index) => (
              <List.Item
                key={index}
                onPress={() => {
                  navigation.navigate('ModeloAPIForm', { item: item || null });
                  //alert('Teste ' + item.name + ' - ' + item.id);
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
                        {item.descricao}
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

  const Verduras = () => (
    <>
      <ScrollView>
        <Card style={styles.card}>
          <Text style={styles.subtitle}>Endereço: Getúlio Vargas, 155</Text>
        </Card>

        <Input
          type="text"
          variant="filled"
          placeholder="Buscar em Verduras e Legumes"
          backgroundColor="lightgray"
          borderRadius="full"
          width="90%"
          alignSelf="center"
        />

        <Box style={styles.alinhamento}>
          <ScrollView horizontal={true}>
            <Card style={styles.categoria}>
              <Card style={styles.cardSubcategorias}>
                <Button style={styles.cardSubcategorias}
                  onPress={() => {
                    navigation.jumpTo('Verduras');
                    let data = data.filter((e)=> e.tipo_produto_id ==6)
                    setData(data);

                  }}>
                  <Image
                    style={styles.imgSubcategoria}
                    source={require('../../assets/produto/verduras.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Verduras </Text>
            </Card>

            <Card style={styles.categoria}>
              <Card style={styles.cardSubcategorias}>
                <Button style={styles.cardSubcategorias}
                  onPress={() => {
                    navigation.jumpTo('Frutas');
                    let data = data.filter((e)=> e.tipo_produto_id ==6)
                    setData(data);

                  }}>
                  <Image
                    style={styles.imgSubcategoria}
                    source={require('../../assets/produto/frutas.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Frutas </Text>
            </Card>

            <Card style={styles.categoria}>
              <Card style={styles.cardSubcategorias}>
                <Button style={styles.cardSubcategorias}>
                  <Image
                    style={styles.imgSubcategoria}
                    source={require('../../assets/produto/massa.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Carboidratos </Text>
            </Card>

            <Card style={styles.categoria}>
              <Card style={styles.cardSubcategorias}>
                <Button style={styles.cardSubcategorias}>
                  <Image
                    style={styles.imgSubcategoria}
                    source={require('../../assets/produto/legumes.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Legumes </Text>
            </Card>
          </ScrollView>
        </Box>

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
                    source={require('../../assets/produto/laranjaRecomecacao.jpg')}
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
                    source={require('../../assets/produto/geleiaRecomendacao.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Geleia Z </Text>
            </Card>
          </ScrollView>
        </Box>

        <Card style={styles.card}>
          <Text style={styles.titulo}>PRODUTOS</Text>
        </Card>
        <ScrollView contentContainerStyle={{ width: '100%' }}>
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
            {data?.map((item, index) => (
              <List.Item
                key={index}
                onPress={() => {
                  navigation.navigate('ModeloAPIForm', { item: item || null });
                  //alert('Teste ' + item.name + ' - ' + item.id);
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
                        {item.descricao}
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

  const Frutas = () => (
    <>
      <ScrollView>
        <Card style={styles.card}>
          <Text style={styles.subtitle}>Endereço: Getúlio Vargas, 155</Text>
        </Card>

        <Input
          type="text"
          variant="filled"
          placeholder="Buscar em Frutas"
          backgroundColor="lightgray"
          borderRadius="full"
          width="90%"
          alignSelf="center"
        />

        <Box style={styles.alinhamento}>
          <ScrollView horizontal={true}>
            <Card style={styles.categoria}>
              <Card style={styles.cardSubcategorias}>
                <Button style={styles.cardSubcategorias}
                  onPress={() => {
                    navigation.jumpTo('Verduras');
                    let data = data.filter((e)=> e.tipo_produto_id ==6)
                    setData(data);
                  }}>
                  <Image
                    style={styles.imgSubcategoria}
                    source={require('../../assets/produto/verduras.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Verduras </Text>
            </Card>

            <Card style={styles.categoria}>
              <Card style={styles.cardSubcategorias}>
                <Button style={styles.cardSubcategorias}
                  onPress={() => {
                    navigation.jumpTo('Frutas');
                    let data = data.filter((e)=> e.tipo_produto_id ==6)
                    setData(data);

                  }}>
                  <Image
                    style={styles.imgSubcategoria}
                    source={require('../../assets/produto/frutas.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Frutas </Text>
            </Card>

            <Card style={styles.categoria}>
              <Card style={styles.cardSubcategorias}>
                <Button style={styles.cardSubcategorias}>
                  <Image
                    style={styles.imgSubcategoria}
                    source={require('../../assets/produto/massa.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Carboidratos </Text>
            </Card>

            <Card style={styles.categoria}>
              <Card style={styles.cardSubcategorias}>
                <Button style={styles.cardSubcategorias}>
                  <Image
                    style={styles.imgSubcategoria}
                    source={require('../../assets/produto/legumes.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Legumes </Text>
            </Card>
          </ScrollView>
        </Box>

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
                    source={require('../../assets/produto/laranjaRecomecacao.jpg')}
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
                    source={require('../../assets/produto/geleiaRecomendacao.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Geleia Z </Text>
            </Card>
          </ScrollView>
        </Box>

        <Card style={styles.card}>
          <Text style={styles.titulo}>PRODUTOS</Text>
        </Card>
        <ScrollView contentContainerStyle={{ width: '100%' }}>
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
            {data?.map((item, index) => (
              <List.Item
                key={index}
                onPress={() => {
                  navigation.navigate('ModeloAPIForm', { item: item || null });
                  //alert('Teste ' + item.name + ' - ' + item.id);
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
                        {item.descricao}
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

  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={TelaPrincipal} />
      <Tab.Screen name="Verduras" component={Verduras} />
      <Tab.Screen name="Frutas" component={Frutas} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
    shadowRadius: 0,
  },
  subtitle: {
    marginTop: -10,
    marginBottom: -10,
    fontSize: 10,
    textAlign: 'center',
  },
  titulo: {
    marginBottom: -12,
    marginTop: 0,
    fontSize: 15,
    textAlign: 'left',
  },
  textoCardSub: {
    fontSize: 11,
    textAlign: 'center',
  },
  cardSubcategorias: {
    backgroundColor: '#CBEDD1',
    width: 75,
    height: 40,
    margin: 8,
    padding: 0,
    borderRadius: 3,
    shadowRadius: 0,
  },
  imgSubcategoria: {
    width: 90,
    height: 70,
  },
  cardRecomendacao: {
    backgroundColor: '#CBEDD1',
    width: 110,
    height: 70,
    margin: 10,
    padding: 0,
    borderRadius: 0,
    shadowRadius: 0,
  },
  imgRecomendacao: {
    width: 110,
    height: 70,
  },
  categoria: {
    borderRadius: 0,
    width: 120,
    height: 95,
    shadowRadius: 0,
  },
  recomendados: {
    borderRadius: 0,
    shadowRadius: 0,
  },
  alinhamento: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
