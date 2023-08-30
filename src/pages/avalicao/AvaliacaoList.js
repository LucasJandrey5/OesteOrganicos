import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, Dimensions, StatusBar, Animated, Pressable} from 'react-native';
import API from '../../../config/API';
import { AirbnbRating } from '@rneui/themed';

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

export default function AvaliacaoList({  navigation  }) {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const response = await API.call('usuario-avaliacao/1');
      setData(response.data[0]);

      // return data;
      console.log('avaliaçoes')
      console.log(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

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
          {data?.avaliacoes?.map((item, index) => (
            
            <List.Item
           
              
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
                  <Text>Avaliação {index+1}</Text>
                  <Text>Nota: {item.nota}</Text>
                  <Text>Descrição: {item.descricao}</Text>
                  <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                    
                    </Text>
                  </VStack>
                  <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 30,
        }}
      >
      
      
        <AirbnbRating size={15} count={5} defaultRating={item.nota/2} isDisabled={true} />
  
      
      </View>
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