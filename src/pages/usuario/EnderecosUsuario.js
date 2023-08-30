import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../../../config/API';
import AlertMsg from '../../components/AlertMsg';
import {StyleSheet} from 'react-native';

import {Box, Icon, Text, HStack, VStack, Fab,Pressable, FlatList, Heading, Spacer,} from 'native-base';

export default function EnderecosUsuario({navigation, route}) {
    const [data, setData] = useState([]);
    const loadData = async () => {
        try {
            const values = await AsyncStorage.getItem('@usuario');
            let usuario = await JSON.parse(values);
            if (usuario) {
                setData(usuario);
            } //data = usuario

            console.log('values');
            console.log(values); //usuario

            const response = await API.call(
                'usuario-endereco/' + usuario.usuario_id
            );

            setData(response.data[0]);
            console.log('response.data[0]');
            console.log(response.data[0]);
        } catch (error) {
            console.error(error);
        }
    };

    useState(() => {
        loadData();
    });

    return (
        <>
            <Heading size="md">
                Nome: {data.name}
            </Heading>
            <HStack
                // alignSelf="center"
                style={styles.endereco}
                w="90%"
                py={3}
                px={3}>
                <VStack>
                    <Text style={{fontWeight: 'bold'}}>
                        Usar Localização atual:
                    </Text>
                    <Text>Usar Localização atual </Text>
                </VStack>
            </HStack>
            <FlatList
                data={data?.enderecos}
                style={styles.back}
                renderItem={({item,index}) => (
                    <Pressable
                        onPress={async () => {
                            await AsyncStorage.setItem('enderecoSelecionado', JSON.stringify(item));

                            navigation.push('TelaPrincipalFiltro', {item: ''});
                        }}
                        rounded="8"
                        overflow="hidden"
                        borderWidth="1"
                        borderColor="coolGray.300"
                        maxW="96"
                        shadow="3"
                        bg="coolGray.100"
                        style={styles.endereco}
                        p="5">

                        <Box pl={['0', '4']} pr={['0', '5']} py="2">
                            <HStack space={[3, 0]} justifyContent="space-between">
                                <VStack>
                                    <Text color="coolGray.800" bold>
                                        Endereço {index + 1}:
                                    </Text>
                                    <Text color="coolGray.800">
                                        {item.municipio.nome}, {item.bairro}, {item.rua},
                                    </Text>
                                    <Text color="coolGray.800">
                                        {item.numero},{item.complemento}, {item.cep}
                                    </Text>
                                    <Text color="coolGray.800">
                                        {item.ponto_referencia}
                                    </Text>
                                </VStack>
                                <Spacer/>
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
                renderInPortal={false}
                icon={<Icon as={FontAwesome} name="plus" size="sm"/>}
                onPress={() => navigation.navigate('EnderecoForm', {item: ''})}
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
        backgroundColor: '#8fbc8f',
        borderRadius: 5,
    },
});
