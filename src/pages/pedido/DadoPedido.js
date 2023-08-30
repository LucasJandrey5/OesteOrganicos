import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
    Button,
    Text,
    Icon,
    Image,
    Box,
    HStack,
    Avatar,
    VStack,
    Divider,
    ScrollView,
} from 'native-base';
import {Dimensions, Linking} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function DadoPedido({navigation, route}) {
    const [pedido, setPedido] = useState({});

    const loadData = async () => {
        const {item} = route.params;
        setPedido(item);
    };
    const img = require('../../assets/sem_imagem.jpg');
    const checkParamImg = (item) => {
        try {
            if (item.produto_imagem === null || item.produto_imagem === undefined || item.produto_imagem === "") {
                return img;
            } else if (item.produto_imagem !== null) {
                return {uri: API.urlFile() + item.produto_imagem};
            }
        } catch (e) {
            console.error(e);
        }
    };

    useState(() => {
        loadData();
    });

    return (
        <ScrollView w="100%">
            <Box style={styles.greenBox} w="100%">
                <Box style={styles.topRow}>
                    <Text style={styles.text}>Data Pedido: {pedido.data_pedido}</Text>
                    <Text style={styles.text}>Hora Saída: </Text>
                </Box>

                <Box style={styles.imgtext}>
                    <Image style={styles.imagem}
                           source={checkParamImg(pedido)}
                    />

                    <Box style={styles.bottomRow}>
                        <Box style={styles.half}>
                            <Text style={styles.text}>Produto:{pedido.produto_nome}</Text>
                        </Box>

                        <Box style={styles.half}>
                            <Text style={styles.text}>Produtor: {pedido.produtor_nome}</Text>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <View flex={1} justifyContent="center" alignItems="center">
                        <View flexDirection="row" justifyContent="space-between" width="80%">
                            <Box width="45%" backgroundColor="blue.200" padding={4}>
                                <Text style={styles.text}>Desconto: {pedido.desconto}</Text>
                            </Box>
                            <Box width="45%" backgroundColor="red.200" padding={4}>
                                <Text style={styles.text}>Valor total: {pedido.total_valor}</Text>
                            </Box>
                        </View>
                    </View>
                    <Box marginTop={2}>
                        <Text style={styles.text}>Descrição: </Text>
                    </Box>
                    <Box marginTop={5}>
                        <Text style={styles.text}>
                            Status: {pedido.status === 'ABERTO' ? 'Em andamento' : 'Entregue'}
                        </Text>
                    </Box>
                </Box>
            </Box>
            <Box
                style={{
                    flex: 1,
                    left: '50%',
                    alignItems: 'center',
                    position: 'relative',
                }}
                justifyContent="flex-end"
                bg="green.500"
                borderRadius={2}
                width="50%"
                py={2} // altura da box
                mt={10} // espaço acima da box
                mb={2} // espaço abaixo da box
            >
                <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
                    Valor total: {pedido.total_valor}
                </Text>
            </Box>
            <Divider
                style={styles.divider}
                mt={2} // espaço acima
                mb={2} // espaço abaixo
            />
            <Box paddingLeft={3}>
                <Text style={styles.text}>
                    {' '}
                    Endereço de Entrega: {pedido.endereco_id}

                </Text>
            </Box>
            <Divider
                style={styles.divider}
                mt={2} // espaço acima
                mb={2} // espaço abaixo
            />
            <Box paddingLeft={4} w="100%">
                <Text marginTop={5} style={styles.text}>
                    Contate o Produtor
                </Text>
                <HStack
                    margin="4"
                    paddingBottom="4"
                    borderBottomWidth="1"
                    borderColor="grey"
                    justifyContent="space-around">
                    <HStack>
                        <Avatar
                            size="58px"
                            source={{
                                uri: 'https://media.istockphoto.com/id/1156406125/pt/vetorial/user-green-icon-avatar-vector.jpg?s=170667a&w=0&k=20&c=tFRJyvbOVeVmO2sV87VOMdIanPASdciVlt3xpBBqScU=',
                            }}
                        />
                        <VStack justifyContent="center">
                            <Text bold marginLeft="3">
                                {pedido.produtor_nome}
                            </Text>
                            <Text marginLeft="3">Contato: teste </Text>
                        </VStack>
                    </HStack>

                    <HStack justifyContent="flex-end">
                        <Button
                            colorScheme="green"
                            alignSelf="flex-end"
                            leftIcon={<Icon as={FontAwesome} name="whatsapp" size="lg"/>}
                            onPress={() =>
                                Linking.canOpenURL(
                                    'https://wa.me//' +
                                    'teste' +
                                    '?text=Tenho%20interesse%20em%20comprar%20seu%20carro'
                                ).then((supported) => {
                                    if (supported) {
                                        return Linking.openURL(
                                            'https://wa.me//' +
                                            'teste' +
                                            '?text=Tenho%20interesse%20em%20comprar%20seu%20carro'
                                        );
                                    } else {
                                        return Linking.openURL(
                                            'https://api.whatsapp.com/send?phone=5531999999999&text=Oi'
                                        );
                                    }
                                })
                            }>
                        </Button>
                    </HStack>
                </HStack>
            </Box>
        </ScrollView>
    );
}
const styles = {
    greenBox: {
        backgroundColor: '#9AFF9A',
        padding: 20,
        //width: 310,
        //height: 270,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    imagem: {
        width: 90,
        height: 90,
        //backgroundColor: 'darkgreen',
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    bottomRow: {
        marginBottom: 10,
        marginTop: 10,
    },
    imgtext: {
        flexDirection: 'row',
    },
    half: {
        flex: 0.5,
        paddingLeft: 8,
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    divider: {
        width: '150%',
        height: 1,
    },
    imagemProdutor: {
        width: 50,
        height: 50,
        backgroundColor: 'darkgreen',
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    imgWats: {
        width: 50,
        height: 50,
        backgroundColor: 'darkgreen',
        borderRadius: 50,
        marginBottom: 10,
        marginTop: 13,
        left: '30%',
    },
};