import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, Dimensions, StatusBar, Animated, Pressable} from 'react-native';
import API from '../../../config/API';

import {
  NativeBaseProvider,
  Box,
  Icon,
  Text,
  Input,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Fab,
  List,
  Divider,
  useColorMode,
  ScrollView,
  Card,
} from 'native-base';



const Tab = createMaterialTopTabNavigator();

export default function NotificacoesList({  route, navigation  }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);
  

/*const data = [
    {
    
      avatarUrl:
      'https://cdn-icons-png.flaticon.com/512/1082/1082146.png',
  }, 
    {
      nome: 'Título',
      descricao: 'Descrição',
      avatarUrl:
     'https://cdn-icons-png.flaticon.com/512/1082/1082146.png',
  }, 
    {
      nome: 'Título',
      descricao: 'Descrição',
      avatarUrl:
     'https://cdn-icons-png.flaticon.com/512/1082/1082146.png',
  }, 
    {
      nome: 'Título',
      descricao: 'Descrição',
      avatarUrl:
      'https://cdn-icons-png.flaticon.com/512/1082/1082146.png',
  }, 
    {
      nome: 'Título',
      descricao: 'Descrição',
      avatarUrl:
      'https://cdn-icons-png.flaticon.com/512/1082/1082146.png',
  }, 
    {
      nome: 'Título',
      descricao: 'Descrição',
      avatarUrl:
      'https://cdn-icons-png.flaticon.com/512/1082/1082146.png',
  }, 
  ];*/

  const loadData = async () => {
    try {
      const response = await API.call('notificacao');
      setData(response.data);

      // return data;
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(data)
  //useState useEffect
  useState(() => {
    loadData();
  });

  const { colorMode, toggleColorMode } = useColorMode();

  const Notificacoes = () => (
    <>
      <ScrollView w='100%'>
      <Card>
        <List
          divider={
            <Divider ml={0} opacity={colorMode == 'dark' ? '0.4' : '1'} />
          }
          px={0}
          //mt={12}
          py={0}
          borderColor="red.200"
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
              <Box pl={['0', '4']} pr={['0', '5']} py="1">
                <HStack space={[3, 0]} justifyContent="center">
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
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.titulo}
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
                </HStack>
              </Box>
            </List.Item>
          ))}
        </List>
        </Card>
      </ScrollView>
    </>
  );

  return (
      <ScrollView> 
        <Box>
          <Card style={styles.cardListagem}>
            <Notificacoes />
          </Card>
        </Box>
      </ScrollView>
  );
}
const styles = StyleSheet.create({
   cardListagem:{
    borderRadius: 0,
    shadowRadius: 0,
    marginTop: -20, 
    //paddingLeft: 0,
  },
  /*texto: {
    alignSelf: 'center',
  }*/
});