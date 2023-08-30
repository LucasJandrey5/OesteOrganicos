import React, { useState, useEffect } from 'react';
import API from '../../../config/API';

import {
  Box,
  Text,
  HStack,
  VStack,
  List,
  ScrollView,
  useColorMode,
  Image,
} from 'native-base';

const ProdutosPorCategoriaList = ({ categoria_id, navigation }) => {
  console.log('ProdutosPorCategoriaList');
  console.log(categoria_id);
  const [data, setData] = useState([]);

  const loadData = async (categoria_id = 0) => {
    try {
      const response = await API.call(
        'produto-por-tipo/' + categoria_id
      );
      setData(response.data[0].produtos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData(categoria_id);
  }, [categoria_id]);

  return (
    <>
      {console.log(data)}
      {/* Listagem de todos os tipo-produto cadastrados  */}
      <VStack w="90%" space={5} alignSelf="center" backgroundColor="white">
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
                  console.log("pressionou");
                  navigation.navigate('ProdutoDetalhe');
                }}
                _hover={{ bg: 'coolGray.300' }}>
                <Box
                  borderRadius="0"
                  shadowRadius="0"
                  width="100%"
                  borderWidth={0}
                  margin="0"
                  padding="2">
                  <HStack justifyContent="flex-start">
                    <Box borderRadius="0" shadowRadius="0" alignItems="center">
                      <Image
                        size="60px"
                        borderRadius="5"
                        source={{
                          uri: item.imagem
                            ? API.urlFile() + item.imagem
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
                          {item?.nome}
                        </Text>
                        <Text
                          alignSelf="center"
                          color="coolGray.600"
                          _dark={{
                            color: 'warmGray.200',
                          }}>
                          {item?.preco}
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
    </>
  );
};

export default ProdutosPorCategoriaList;