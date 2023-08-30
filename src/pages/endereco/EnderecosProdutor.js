import React, {useState, useEffect, useCallback} from 'react';
import AlertMsg from '../../components/AlertMsg';
import {useFocusEffect} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import API from '../../../config/API';

import {StyleSheet,} from 'react-native';

import {
    NativeBaseProvider,
    Box,
    Icon,
    Text,
    HStack,
    Avatar,
    VStack,
    Spacer,
    FlatList,
    ScrollView,
    Pressable,
    Card,
    Center,
    Button,
    List,
    Divider,
    useColorMode,
    Fab,
    Heading,
    useToast,
    Input,
} from 'native-base';

export default function EnderecosProdutor({navigation, route}) {
    const {item, produtorId} = route?.params || '';
    const toast = useToast();
    const [data, setData] = useState([]);
    const [dataProdutor, setDataProdutor] = useState([]);
    const [search, setSearch] = useState('');
    const [filtro, setfiltro] = useState([]);

    const loadData = useCallback(async (id = 0) => {
        try {
            let id = produtorId ? produtorId : item.id;
            const response = await API.call('produtor-endereco/' + id);

            setDataProdutor({id: response.data[0].id, nome: response.data[0].nome});
            setData(response.data[0].enderecos);

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

    /*const searchData = (text) => {
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
    };*/

    const deleteData = async (item) => {
        try {
            var response = await API.call(
                'produto/' + item.id, // nome da url + id
                item, // objeto
                'DELETE' // method
            );
            console.log(response);
            loadData();
            let msg = {titulo: 'Excluido com sucesso!'};
            toast.show({
                render: () => {
                    return <AlertMsg status="success" msg={msg}/>;
                },
            });
        } catch (error) {
            console.error(error);
            let msg = await API.errorCall(error);
            toast.show({
                render: () => {
                    return <AlertMsg msg={msg}/>;
                },
            });
        }
    };

    const dataFilter = data.filter(
        ({nome}) => nome.toLowerCase()?.indexOf(search.toLowerCase()) > -1
    );

    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <NativeBaseProvider>
            <Heading size="md"> Enderecos de {dataProdutor.nome || ''} </Heading>
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
                            as={<FontAwesome name="search"/>}
                        />
                    }
                    InputRightElement={
                        <Icon
                            m="2"
                            mr="3"
                            size="6"
                            color="gray.400"
                            as={<FontAwesome name="microphone"/>}
                        />
                    }
                />
            </VStack>

            <FlatList
                data={dataFilter}
                renderItem={({item}) => (
                    <Pressable
                        onPress={() => {
                            navigation.navigate('EnderecoForm', {
                                item: item,
                                produtorId: dataProdutor.id,
                            });
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
                        maxW="96"
                        shadow="3"
                        bg="coolGray.100"
                        p="5">
                        <Box pl={['0', '4']} pr={['0', '5']} py="2">
                            <HStack space={[3, 0]} justifyContent="space-between">
                                {/*<Avatar
                    size="58px"
                    source={{
                      uri: item.imagem
                        ? API.urlFile() + item.imagem
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
                    }}
                  />*/}
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
                                        {item.produtor_id}
                                    </Text>
                                    <Text
                                        color="coolGray.600"
                                        _dark={{
                                            color: 'warmGray.200',
                                        }}>
                                        {item.comercio_id}
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
                                        {item.tipo}
                                    </Text>
                                    <Text
                                        color="coolGray.600"
                                        _dark={{
                                            color: 'warmGray.200',
                                        }}>
                                        {item.rua}
                                    </Text>
                                    <Text
                                        color="coolGray.600"
                                        _dark={{
                                            color: 'warmGray.200',
                                        }}>
                                        {item.numero}
                                    </Text>
                                    <Text
                                        color="coolGray.600"
                                        _dark={{
                                            color: 'warmGray.200',
                                        }}>
                                        {item.cep}
                                    </Text>
                                    <Text
                                        color="coolGray.600"
                                        _dark={{
                                            color: 'warmGray.200',
                                        }}>
                                        {item.bairro}
                                    </Text>
                                    <Text
                                        color="coolGray.600"
                                        _dark={{
                                            color: 'warmGray.200',
                                        }}>
                                        {item.complemento}
                                    </Text>
                                    <Text
                                        color="coolGray.600"
                                        _dark={{
                                            color: 'warmGray.200',
                                        }}>
                                        {item.ponto_referencia}
                                    </Text>
                                    <Text
                                        color="coolGray.600"
                                        _dark={{
                                            color: 'warmGray.200',
                                        }}>
                                        {item.estacionamento}
                                    </Text>
                                    <Text
                                        color="coolGray.600"
                                        _dark={{
                                            color: 'warmGray.200',
                                        }}>
                                        {item.refeicao}
                                    </Text>
                                    <Text
                                        color="coolGray.600"
                                        _dark={{
                                            color: 'warmGray.200',
                                        }}>
                                        {item.latitude}
                                    </Text>
                                    <Text
                                        color="coolGray.600"
                                        _dark={{
                                            color: 'warmGray.200',
                                        }}>
                                        {item.longitude}
                                    </Text>
                                    <Text
                                        color="coolGray.600"
                                        _dark={{
                                            color: 'warmGray.200',
                                        }}>
                                        {item.iconeMapa}
                                    </Text>
                                    <Text
                                        color="coolGray.600"
                                        _dark={{
                                            color: 'warmGray.200',
                                        }}>
                                        {item.telefone}
                                    </Text>
                                </VStack>

                                <Spacer/>

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
            <Fab
                placement="bottom-right"
                colorScheme="green"
                size="lg"
                icon={<Icon as={FontAwesome} name="plus" size="sm"/>}
                onPress={() =>
                    navigation.navigate('EnderecoForm', {item: '', produtorId: dataProdutor.id,}) //data
                }
            />
        </NativeBaseProvider>
    );
}
const styles = StyleSheet.create({
    cardListagem: {
        borderRadius: 0,
        shadowRadius: 0,
        marginTop: -30,
        width: '100%',
    },
});
