import React, {useState} from 'react';
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

export default function BuscaGeral({navigation}) {
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
    //useState useEffect
    useState(() => {
        loadData();
    });

    return (
        <>
            <VStack w="100%" alignSelf="flex-start">
                <HStack
                    h="30px"
                    alignItems="center"
                    marginBottom="-15px"
                    marginTop="-5"
                    padding="8"
                    marginLeft="-5">
                    <Text bold fontSize="xl">
                        {' '}
                        Categorias{' '}
                    </Text>
                </HStack>
            </VStack>

            <VStack w="100%" space={5} alignSelf="flex-start">
                <ScrollView contentContainerStyle={{width: '100%'}} vertical>
                    <List flexWrap="wrap" flexDirection="row" borderWidth={0} w="100%">
                        {data?.map((item, index) => (
                            <List.Item
                                justifyContent="center"
                                width="50%"
                                key={index}
                                onPress={() => {
                                    let jumpTo = '';
                                    if (item.nome === 'Fruta') {
                                        jumpTo = 'Fruta';
                                    }
                                    if (item.nome === 'Verdura') {
                                        jumpTo = 'Verdura';
                                    }
                                    if (item.nome === 'Carboidratos') {
                                        jumpTo = 'Carboidrato';
                                    }
                                    navigation.navigate('TelaPrincipalFiltro', {
                                        item: item || '',
                                        jumpTo: jumpTo,
                                    });
                                }}
                                _hover={{bg: 'coolGray.300'}}>
                                <Box
                                    justifyContent="center"
                                    alignItems="center"
                                    borderRadius="0"
                                    shadowRadius="0"
                                    width="100%"
                                    borderWidth={0}
                                    margin="0">
                                    <HStack>
                                        <Box
                                            borderRadius="0"
                                            shadowRadius="0"
                                            alignItems="center">
                                            <Box
                                                justifyContent="center"
                                                alignItems="center"
                                                marginLeft="-8px"
                                                bgColor="black"
                                                borderRadius="20">
                                                <Image
                                                    size="70px"
                                                    borderRadius="20"
                                                    width="150"
                                                    opacity="0.6"
                                                    source={require('../../assets/produto/verduras.jpg')}></Image>
                                                <VStack alignItems="center">
                                                    <Text
                                                        bold
                                                        position="absolute"
                                                        marginTop="-50px"
                                                        color="#f5f5f5"
                                                        fontSize="xl">
                                                        {item?.nome}
                                                    </Text>
                                                </VStack>
                                            </Box>
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
}
