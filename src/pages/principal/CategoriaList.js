import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
  List,
  Divider,
  Button,
  ScrollView,
  Image,
  useColorMode,
} from 'native-base';

const CategoriaList = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);
  const [paramCategoriaId, setParamCategoriaId] = useState(0);

  const loadData = async () => {
    try {
      const response = await API.call('tipo-produto');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useState(() => {
    loadData();
  });

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <ScrollView contentContainerStyle={{ width: '100%' }}>
        <VStack w="100%" space={5} alignSelf="flex-start">
          <ScrollView contentContainerStyle={{ width: '100%' }} vertical>
            <List
              flexDirection='row'
              justifyContent="space-around"
              borderWidth={0}
              w="100%">
              {data?.map((item, index) => (
                <List.Item
                  key={index}
                  onPress={() => {
                    navigation.navigate('TelaPrincipalFiltro', { item: '' });
                    //alert(item.id);
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
          </ScrollView>
        </VStack>
      </ScrollView>
    </>
  );
}

export default CategoriaList;