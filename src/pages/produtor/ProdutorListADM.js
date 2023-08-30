import React, { useState, useCallback } from 'react';
import AlertMsg from '../../components/AlertMsg';
import { useFocusEffect } from '@react-navigation/native';
import API from '../../../config/API';
import { StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { NativeBaseProvider, Box, Icon, Text, HStack, Avatar, VStack, Spacer, FlatList,
   Card, Pressable , Fab, useToast, Input} from 'native-base';

export default function ProdutorListADM({ navigation }) {
    const toast = useToast();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    const loadData = useCallback(async () => {
        setData([]);
        try {
            const response = await API.call('produtor');
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    //useState useEffect
    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [loadData])
    );

    const deleteData = async (item) => {
        try {
            var response = await API.call(
                'produto/' + item.id, // nome da url + id
                item, // objeto
                'DELETE' // method
            );
            console.log(response);
            loadData();
            let msg = { titulo: 'Excluido com sucesso!' };
            toast.show({
                render: () => {
                    return <AlertMsg status="success" msg={msg} />;
                },
            });
        } catch (error) {
            console.error(error);
            let msg = await API.errorCall(error);
            toast.show({
                render: () => {
                    return <AlertMsg msg={msg} />;
                },
            });
        }
    };

    const dataFilter = data.filter(
        ({ nome }) => nome.toLowerCase()?.indexOf(search.toLowerCase()) > -1
    );

    const searchData = (text) => {
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

    const ListagemProdutos = () => (
        <>
                <VStack w="100%" space={5} alignSelf="center">
                    <Input
                        placeholder="Pesquisar"
                        value={search}
                        //isFocused={true}
                        onChangeText={(value) => setSearch(value)}
                        // onClear={(text) => searchData('')}
                        width="100%"
                        borderRadius="4"
                        py="3"
                        px="1"
                        fontSize="14"
                        InputLeftElement={
                            <Icon
                                m="2"
                                ml="3"
                                size="6"
                                color="gray.400"
                                as={<FontAwesome name="search" />}
                            />
                        }
                        InputRightElement={
                            <Icon
                                m="2"
                                mr="3"
                                size="6"
                                color="gray.400"
                                as={<FontAwesome name="microphone" />}
                            />
                        }
                    />
                </VStack>

                <FlatList
                    data={dataFilter}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => {
                                navigation.navigate('ProdutorPerfil', { item: item || null });
                            }}
                            onLongPress={() => {
                                if (confirm('Deseja remover o registro?')) {
                                    deleteData(item);
                                }
                            }}
                            rounded="8"
                            overflow="hidden"
                            borderWidth="1"
                            borderColor="coolGray.300"
                            shadow="3"
                            bg="coolGray.100"
                            pl={['0', '10']} pr={['10', '5']} py="4"
                           >
                            <Box >
                                <HStack space={[5, 10]} justifyContent="space-between">
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
                                            {item.cpf}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.rg}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.municipio_id}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.conjuge_id}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.data_nascimento}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.sexo}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.raca}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.nomepai}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.nomemae}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.usuario_id}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.telefone1}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.telefone2}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.email}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.link}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.site}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.agendamento}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.acessibilidade}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.certificacao}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: 'warmGray.200',
                                            }}>
                                            {item.imagem}
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
                        </Pressable>
                    )}
                    keyExtractor={(item) => item.id}
                />
        </>
    );

    return (
        <NativeBaseProvider>
                <Box>
                    <Card style={styles.cardListagem}>
                        <ListagemProdutos />
                    </Card>
                    <Fab
                        placement="bottom-right"
                        colorScheme="green"
                        size="lg"
                        icon={<Icon as={FontAwesome} name="plus" size="sm" />}
                        onPress={() => navigation.navigate('ProdutorForm', { item: '' })}
                    />
                </Box>
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