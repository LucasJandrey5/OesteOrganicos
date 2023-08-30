import React, { useState } from 'react';
import API from '../../../config/API';
import { View, StyleSheet, Dimensions, StatusBar, Animated, Pressable} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { NativeBaseProvider, Box, Icon, Text, HStack, Avatar, VStack, Spacer, FlatList,
  ScrollView, Image, Card, Center, Button,Fab, List, Divider, useColorMode} from 'native-base';


export default function ProdutoList({ navigation }) { //AJUSTADO

  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);

  const loadData = async () => { 
    try {
      const response = await API.call('produto');
      setData(response.data);

      // return data;
      //console.log(response.data);
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
                navigation.navigate('ProdutoForm',
                 // {params: { item: item }});
                 { item: item });
                //alert('Teste ' + item.nome + ' - ' + item.id);
              }}
              _hover={{ bg: 'coolGray.300' }}>
              <Box pl={['0', '4']} pr={['0', '5']} py="2">
                <HStack space={[3, 0]} justifyContent="space-between">
                  <Avatar
                    size="58px"
                    source={{
                      uri: item.imagem
                        ? API.urlFile() + item.imagem
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
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
                      {item.unidade_medida_id}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.tipo_produto_id}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.sazonalidade}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.preco}
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
            onPress={() => navigation.navigate('ProdutoForm', { item: '' })}
          />
        </Box>
        <Button onPress={() => navigation.navigate('EstoqueList', { item: '' })}>Estoque</Button>
      </ScrollView>
    </NativeBaseProvider>
    
  );
}
const styles = StyleSheet.create({
   cardListagem:{
    borderRadius: 0,
    shadowRadius: 0,
    marginTop: -30,
  },
});