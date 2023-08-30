import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {CommonActions} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import API from '../../../config/API';
import {StyleSheet} from 'react-native';

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

export default function PedidosHistorico({navigation}) {
    const [data, setData] = useState([]);
    const [entregue, setEntregue] = useState(0);

    const loadData = async (tipo = 0) => {
        try {
            const historico = await API.call('pedido-historico/1');

            if (tipo === 0) {
                let aberto = '';
                aberto = historico.data.filter((item) => item.status === 'ABERTO');
                setData(aberto);
                setEntregue(0);
            } else {
                let fechado = '';
                fechado = historico.data.filter((item) => item.status === 'FECHADO');
                setData(fechado);
                setEntregue(1);
            }
        } catch (error) {
            console.error(error);
        }
    };
    console.log(data);
    const img = require('../../assets/sem_imagem.jpg');
    const checkParamImg = (data = null) => {
        try {
            if (
                data.produto_imagem === null ||
                data.produto_imagem === undefined ||
                data.produto_imagem === ''
            ) {
                return img;
            } else if (data.produto_imagem !== null) {
                return {uri: API.urlFile() + data.produto_imagem};
            }
        } catch (e) {
            console.error(e);
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

    const {colorMode, toggleColorMode} = useColorMode();

    const Pedidos = () => (
        <>
            <VStack w="100%" space={5} alignSelf="center"></VStack>
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
                    w="100%">
                    <Box style={[styles.boxBG, styles.top]}>
                        <Text style={styles.text}>
                            {entregue === 0 ? 'Em andamento' : 'Entregue'}
                        </Text>
                    </Box>

                    {/*-- */}
                    {data?.map((item, index) => (
                        <List.Item
                            key={index}
                            onPress={() => {
                                navigation.navigate('DadoPedido', {item: item || null});
                                // alert('Teste ' + item.enderecos[0].tipo + ' - ' + item.id);
                            }}
                            _hover={{bg: 'coolGray.300'}}>
                            <Box pl={['0', '4']} pr={['0', '5']} py="2">
                                <HStack space={[3, 0]} justifyContent="space-between">
                                    <Avatar size="58px" source={checkParamImg(item)}/>

                                    <Spacer/>
                                    <VStack>
                                        <Text
                                            fontSize="xs"
                                            _dark={{
                                                color: 'warmGray.50',
                                            }}
                                            color="coolGray.800"
                                            alignSelf="flex-start">
                                            {API.dataBr(item.data_pedido)}
                                        </Text>
                                        <Text
                                            fontSize="xs"
                                            _dark={{
                                                color: 'warmGray.50',
                                            }}
                                            color="coolGray.800"
                                            alignSelf="flex-start">
                                            {item.produtor_nome}
                                        </Text>

                                        <Text
                                            fontSize="xs"
                                            _dark={{
                                                color: 'warmGray.50',
                                            }}
                                            color="coolGray.800"
                                            alignSelf="flex-start">
                                            Produtos: {item.produto_nome}
                                        </Text>
                                        <Text
                                            fontSize="xs"
                                            _dark={{
                                                color: 'warmGray.50',
                                            }}
                                            color="coolGray.800"
                                            alignSelf="flex-start">
                                            Descrição:{item.produto_descricao}
                                        </Text>
                                    </VStack>
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
                name="Aberto"
                component={Pedidos}
                listeners={({navigation, route}) => ({
                    tabPress: (e) => {
                        loadData();
                        navigation.jumpTo('PedidosHistorico');
                    },
                })}
            />
            <Tab.Screen
                name="Entregue"
                component={Pedidos}
                listeners={({navigation, route}) => ({
                    tabPress: (e) => {
                        loadData('Produto');
                        navigation.jumpTo('PedidosHistorico');
                    },
                })}
            />
        </Tab.Navigator>
    );
}
const styles = {
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    boxBG: {
        backgroundColor: '#9AFF9A',
        height: 40,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    top: {
        marginTop: 10,
    },
};
