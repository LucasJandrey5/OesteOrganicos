import React, {useState, useEffect} from 'react';
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

export default function EnderecoListagem({navigation}) {
    const [data, setData] = useState([]);
    const [num, setNum] = useState(0);

    const loadData = async () => {
        try {
            const response = await API.call('usuario-endereco/1');
            setData(response.data[0]);
            console.log("Endereços");
            console.log(response.data[0]);
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

    return (
        <>
            <ScrollView contentContainerStyle={{width: '100%'}} marginTop="15">
                <HStack alignSelf="center" style={styles.endereco} w="90%" py={3} px={3}>
                    <VStack>
                        <Text style={{fontWeight: "bold"}}>Usar Localização atual: </Text>
                        <Text>Usar Localização atual </Text>
                    </VStack>
                </HStack>
                <List
                    style={styles.back}
                    px={3}
                    // mt={12}
                    py={3}
                    // borderColor="red.200"
                    alignSelf="center"
                    w="90%"
                    marginTop='10px'>
                    {data?.enderecos?.map((item, index) => (

                        <List.Item
                            key={index}
                            onPress={() => {
                                navigation.navigate('EnderecoFormulario', {item: item || null});
                                // alert('Teste ' + item.enderecos[0].tipo + ' - ' + item.id);
                            }}
                            style={styles.endereco}
                            w="95%"
                            alignSelf="center"
                        >
                            <Box pl={['0', '4']} pr={['0', '5']} py="2">
                                <HStack space={[3, 0]} justifyContent="space-between"
                                >

                                    <VStack>

                                        <Text
                                            _dark={{
                                                color: 'warmGray.50',
                                            }}
                                            color="coolGray.800"
                                            bold>
                                            Endereço {index + 1}:
                                        </Text>


                                        <Text
                                            fontSize="xs"
                                            _dark={{
                                                color: 'warmGray.50',
                                            }}
                                            color="coolGray.800"
                                            alignSelf="flex-start">
                                            {item.municipio.nome}, {item.bairro}, {item.rua},
                                        </Text>

                                        <Text
                                            fontSize="xs"
                                            _dark={{
                                                color: 'warmGray.50',
                                            }}
                                            color="coolGray.800"
                                            alignSelf="flex-start">
                                            {item.numero},{item.complemento}, {item.cep}

                                        </Text>
                                        <Text
                                            fontSize="xs"
                                            _dark={{
                                                color: 'warmGray.50',
                                            }}
                                            color="coolGray.800"
                                            alignSelf="flex-start">
                                            {item.ponto_referencia}
                                        </Text>

                                    </VStack>
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
                icon={<Icon as={FontAwesome} name="plus" size="sm"/>}
                onPress={() => navigation.navigate('EnderecoFormulario', {item: ''})}
            />
        </>
    );


}

const styles = StyleSheet.create({
    back: {
        backgroundColor: '#CBEDD1',

    },
    endereco: {
        marginTop: 5,
        backgroundColor: "#8fbc8f",
        borderRadius: 5,
    },
    tex: {
        textAlign: 'center',
    }
});
