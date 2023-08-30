import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import API from '../../../config/API';
import {
    Box,
    Text,
    HStack,
    Avatar,
    VStack,
    Spacer,
    Image,
    List,
    View,
    ScrollView,
} from 'native-base';

export default function ProdutosProdutor({navigation, route}) {
    const {item} = route.params;
    const [data, setData] = useState([item]);

    const loadData = async () => {
        try {
            //const response = await API.call('produtor-produto');
            //setData(item);
        } catch (error) {
            console.error(error);
        }
    };

    useState(() => {
        loadData();
    });

    return (
        <ScrollView backgroundColor="white">
            <List>
                {data?.map((item, index) => (
                    <List.Item key={index} borderWidth={0}>
                        <VStack style={{width: '100%'}}>
                            <HStack
                                space={[5, 0]}
                                justifyContent="flex-start"
                                alignItems="center"
                                margin="5%"
                                borderWidth={0}>
                                <Avatar
                                    size="58px"
                                    source={{
                                        uri: 'https://media.istockphoto.com/id/1156406125/pt/vetorial/user-green-icon-avatar-vector.jpg?s=170667a&w=0&k=20&c=tFRJyvbOVeVmO2sV87VOMdIanPASdciVlt3xpBBqScU=',
                                    }}
                                />
                                <VStack>
                                    <Text
                                        _dark={{
                                            color: 'warmGray.50',
                                        }}
                                        color="coolGray.800"
                                        fontSize="15"
                                        bold>
                                        {item?.nome}
                                    </Text>
                                    <Text
                                        color="coolGray.600"
                                        _dark={{
                                            color: 'warmGray.200',
                                        }}>
                                        {item?.descricao || "Descrição"}
                                    </Text>
                                </VStack>
                            </HStack>
                            <VStack style={{alignItems: 'center'}}>
                                <HStack
                                    backgroundColor="#004D0C"
                                    margin="2%"
                                    textAlign="center"
                                    alignSelf="center"
                                    paddingTop="2%"
                                    paddingBottom="2%"
                                    paddingLeft="10%"
                                    paddingRight="10%"
                                    borderRadius="10"
                                    shadow="3">
                                    <Text color="white"> Entrega ou retirada </Text>
                                </HStack>

                                {/* Mostra todos os produtos do produtor*/}
                                <View margin="5%" borderWidth={0}>
                                    <List
                                        borderWidth={0}
                                        borderRightWidth={0}
                                        style={{
                                            width: '100%',
                                            alignItems: 'flex-start',
                                        }}>
                                        {item.produtos?.map((subItem, index) => (
                                            <List.Item
                                                borderBottomWidth="1"
                                                key={index}
                                                onPress={() => {
                                                    navigation.navigate('ProdutoDetalhe', {
                                                        item: subItem || null,
                                                        produtorObj: item || null,
                                                    });
                                                }}
                                                _hover={{bg: 'coolGray.300'}}>
                                                <View
                                                    style={{
                                                        width: '100%',
                                                        padding: '5%',
                                                    }}>
                                                    <HStack
                                                        style={{
                                                            width: '100%',
                                                            justifyContent: 'flex-start',
                                                            alignItems: "center"
                                                        }}
                                                        space={[3, 0]}>
                                                        <Image
                                                            size="60px"
                                                            borderRadius="5"
                                                            source={{
                                                                uri: subItem.imagem
                                                                    ? API.urlFile() + subItem.imagem
                                                                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKiT0OTac84GzM5Vgb3F2ggLuSxIKbpFJoHg&usqp=CAU',
                                                            }}
                                                        />
                                                        <VStack>
                                                            <Text
                                                                _dark={{
                                                                    color: 'warmGray.50',
                                                                }}
                                                                color="coolGray.800"
                                                                bold>
                                                                {subItem.nome}
                                                            </Text>
                                                            <Text
                                                                color="coolGray.600"
                                                                _dark={{
                                                                    color: 'warmGray.200',
                                                                }}>
                                                                R$ {subItem.preco}
                                                            </Text>
                                                        </VStack>
                                                        <Spacer/>
                                                    </HStack>
                                                </View>
                                            </List.Item>
                                        ))}
                                    </List>
                                </View>
                                {/* */}
                            </VStack>
                        </VStack>
                    </List.Item>
                ))}
            </List>
        </ScrollView>
    );
}