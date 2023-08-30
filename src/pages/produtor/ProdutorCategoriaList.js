import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import API from '../../../config/API';

//Import da listagem dos produtores mais pedidos
import ProdutorMaisPedidosList from './ProdutorMaisPedidosList';
import ProdutosPorCategoriaList from './ProdutosPorCategoriaList';
import { TouchableOpacity } from 'react-native';

import {
  Box,
  Icon,
  Text,
  Input,
  HStack,
  VStack,
  List,
  ScrollView,
  Image,
  View,
  IconButton,
  useColorMode,
} from 'native-base';

const Tab = createMaterialTopTabNavigator();

//ProdutorCategoriaList é a página de listagem principal

export default function ProdutorCategoriaList({ route, navigation }) {
  const { item } = route.params;
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);
  const [paramCategoriaId, setParamCategoriaId] = useState(0);
  const [nomeCategoria, setNomeCategoria] = useState('FRUTA');
  const [carregando, setCarregando] = useState(true);

  const loadData = async (id = 0) => {
    let _id = item.id ? item.id : id;
    console.log('loadData');
    console.log(_id);
    console.log(item);
    try {
      /*
      const response = await API.call('produto-por-tipo/' + _id);
      setData(response.data); */
      
      const response = await API.call('tipo-produto');
      setData(response.data);
      setParamCategoriaId(item.id);
      setNomeCategoria(item.nome.toUpperCase());
      //setDataTP(response.data);
      
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
      <View w="100%" space={5} alignSelf="center" backgroundColor="white">
        <Input
          placeholder="Buscar em Categoria"
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
              as={<FontAwesome name="search" 
              />}
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

        {/* Listagem de todos os tipo-produto cadastrados  */}
        <VStack w="100%" space={5} alignSelf="flex-start" backgroundColor="white">

        <VStack
          w="100%"
          space={5}
          alignSelf="flex-start"
          backgroundColor="white"
          marginTop="5%"
          marginLeft="5%">
          <Text bold>
            Categorias disponíveis:
          </Text>
        </VStack>

          <ScrollView
            contentContainerStyle={{ width: '100%' }}
            horizontal
            backgroundColor="white">
            <List
              flexDirection="row"
              justifyContent="flex-start"
              borderWidth={0}
              w="100%">
              {data?.map((item, index) => (
                <List.Item
                  key={index}
                  onPress={() => {
                    setParamCategoriaId(item.id);
                    setNomeCategoria(item.nome.toUpperCase());
                  }}
                  _hover={{ bg: 'coolGray.300' }}>
                  <Box
                    borderRadius="0"
                    shadowRadius="0"
                    width="100%"
                    borderWidth={0}
                    padding="1">
                    <HStack justifyContent="space-between">
                      <Box
                        borderRadius="0"
                        shadowRadius="0"
                        alignItems="center">
                        <Image
                          size="58px"
                          borderRadius="10"
                          width="90"
                          source={require('../../assets/produto/categorias.jpg')}
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
          </ScrollView>
        </VStack>

        <VStack
          w="100%"
          space={5}
          alignSelf="flex-start"
          marginLeft="4"
          backgroundColor="white">
          <Text>
            Peça a categoria <strong>{nomeCategoria}: </strong>
          </Text>
        </VStack>

        {/* Listagem dos produtos da categoria*/}
        <VStack>
          <ProdutosPorCategoriaList categoria_id={paramCategoriaId} />
        </VStack>

        {/* ----------Ajustar futuramente uma listagem filtrada dos mais pedidos------
      <VStack>
      <Text> Mais pedidos </Text>
      </VStack>
      
      <VStack>
        {<ProdutorMaisPedidosList/>}
      </VStack> */}
      </View>
    </>
  );
}
