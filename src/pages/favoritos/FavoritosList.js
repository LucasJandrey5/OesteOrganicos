import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet} from 'react-native';

import API from '../../../config/API';

import {
    Box,
    Button,
    Icon,
    Text,
    HStack,
    Avatar,
    VStack,
    Spacer,
    List,
    Divider,
    useColorMode,
    ScrollView,
} from 'native-base';

const Tab = createMaterialTopTabNavigator();

export default function FavoritosList({navigation}) {
    const [data, setData] = useState([]);

    const loadData = async (tipo = 0) => {
        try {
            const response = await API.call('favorito');

            let filtro = '';
            if (tipo === 0) {
                filtro = response.data.filter((item) => item.produtor_id != null);
            } else {
                filtro = response.data.filter((item) => item.produtor_id == null);
            }

            setData(filtro);
        } catch (error) {
            console.log('Error');
            console.error(error);
        }
    };
    useEffect(() => {
        loadData();
    }, []);

    const img = require('../../assets/sem_imagem.jpg');
    const checkParamImg = (data = null) => {
        try {
            if (data.imagem === null || data.imagem === undefined) {
                return img;
            } else {
                return {uri: API.urlFile() + data.imagem};
            }
        } catch (e) {
            console.error(e);
        }
    };

    const deleteData = async (objeto) => {
        try {
            var response = await API.call(
                'favorito/' + objeto.id, // nome da url + id
                objeto, // objeto
                'DELETE' // method
            );

            console.log(response);
        } catch (error) {
            console.error(error);
        }
        loadData();
    };

    const {colorMode, toggleColorMode} = useColorMode();

    const Favoritos = () => (
        <>
            <ScrollView contentContainerStyle={{width: '100%'}}>
                <List
                    divider={
                        <Divider ml={0} opacity={colorMode === 'dark' ? '0.4' : '1'}/>
                    }
                    px={3}
                    // mt={12}
                    py={0}
                    // borderColor="red.200"
                    borderWidth={0}
                    borderRightWidth={0}
                    w="100%"
                    style={styles.back}>
                    {data?.map((item, index) => (
                        <List.Item
                            key={index}
                            onPress={() => {
                                navigation.navigate('Favoritos', {
                                    item: item || null,
                                });
                            }}
                            _hover={{bg: 'coolGray.300'}}>
                            <Box pl={['0', '4']} pr={['0', '5']} py="2">
                                <HStack space={[3, 0]} justifyContent="space-between">
                                    {item.produtor ? (
                                        <Avatar size="58px" source={checkParamImg(item.produtor)}/>
                                    ) : (
                                        <Avatar size="58px" source={checkParamImg(item.produto)}/>
                                    )}
                                    <VStack>
                                        <Text
                                            _dark={{
                                                color: 'warmGray.50',
                                            }}
                                            color="coolGray.800"
                                            bold>
                                            {item.produtor ? item.produtor.nome : item.produto.nome}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.produtor
                                                ? item.produtor.descricao
                                                : item.produto.descricao}
                                        </Text>

                                        <Button
                                            style={styles.button}
                                            variant="subtle"
                                            colorScheme="danger"
                                            onPress={() => {
                                                if (confirm('Deseja remover o registro?')) {
                                                    deleteData(item);
                                                }
                                            }}
                                            startIcon={
                                                <Icon as={FontAwesome} name="heart-broken" size="sm"/>
                                            }></Button>
                                    </VStack>

                                    <Spacer/>
                                </HStack>
                            </Box>
                        </List.Item>
                    ))}
                </List>
            </ScrollView>
        </>
    );

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Produtores"
                component={Favoritos}
                listeners={({navigation, route}) => ({
                    tabPress: (e) => {
                        loadData();
                        navigation.jumpTo('Produtor');
                    },
                })}
            />
            <Tab.Screen
                name="Produtos"
                component={Favoritos}
                listeners={({navigation, route}) => ({
                    tabPress: (e) => {
                        loadData('Produto');
                        navigation.jumpTo('Produtos');
                    },
                })}
            />
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    back: {
        //backgroundColor: '#CBEDD1',
    },
    button: {
        //width:"50%",
        //position:"absolute",
        //left:"200px",
        position: 'absolute',
        left: 190,
        top: 15,
        width: 30,
        height: 30,
    },
});
