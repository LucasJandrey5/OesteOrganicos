 import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CommonActions } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import API from '../../../config/API';

import {
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
  
} from 'native-base';



const Tab = createMaterialTopTabNavigator();

export default function ComercioList({ navigation }) {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const response = await API.call('comercio');
         setData(response.data);
        //  console.log("comercios");
        // console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  };
  //useState useEffect
useEffect(() => {
    const data = navigation.addListener('focus', () => {
      // do something
      loadData();
    });

    return data;
  }, [navigation]);

  

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
    <ScrollView contentContainerStyle={{ width: '100%' }}>
        <List
          divider={
            <Divider ml={0} opacity={colorMode == 'dark' ? '0.4' : '1'} />
          }
          px={3}
          // mt={12}
          py={0}
          // borderColor="red.200"
          borderWidth={0}
          borderRightWidth={0}
          w="100%"
          

          >
          {data?.map((item, index) => (

           <List.Item
            onPress={() => {
                navigation.navigate('UsuarioComercio', { item: item || null });
              }}
              _hover={{ bg: 'coolGray.300' }}>
              <Box pl={['0', '4']} pr={['0', '5']} py="2">
                <HStack space={[3, 0]} justifyContent="space-between">

                {console.log(API.urlFile() + item.imagem)}
                  <Avatar
                    size="58px"
                    source={{
                      uri: item.imagem
                        ? API.urlFile() + item.imagem
                        : 'https://encrypted-tbn0.gstatic.com/images?   q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
               
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
                      Descrição
                    </Text>
                  
                  </VStack>
                  <Spacer />
                </HStack>
              </Box>
            </List.Item>
          ))}
        </List>
        
      </ScrollView>
     <Fab
        placement="bottom-right"
        colorScheme="green"
        size="lg"
        renderInPortal={false} 
        icon={<Icon as={FontAwesome} name="plus" size="sm" />}
        onPress={() => navigation.navigate('ComercioForm', { item:  "" })}
      />
    </>
  );

 
}


