import React, {useState} from 'react';
import {
    StyleSheet,
} from 'react-native';

import {
    NativeBaseProvider,
    Box,
    SectionList,
    Center,
    Card,
    Avatar,
    Spacer,
    Heading,
    HStack,
    VStack,
    Pressable, Text, FlatList,
} from 'native-base';
import API from "../../../config/API";

export default function ProdutorPerfil({route, navigation}) {
    const {item} = route?.params;

    const [produtor, setProdutor] = useState(item);

    const data = [
        {
            titulo: 'Formulário Produtor',
            imagem: '',
            descricao: "Texto aqui",
            rota: {nome: "ProdutorForm", param: {item: produtor}}
        },
        {
            titulo: 'Meus Produtos',
            imagem: '',
            descricao: "Texto aqui",
            rota: {nome: "ProdutosProdutor", param: {item: item || null}}
        },
        {
            titulo: 'Endereços',
            imagem: '',
            descricao: "Texto aqui",
            rota: {nome: "EnderecosProdutor", param: {item: item || null}}
        },
    ];

    const ListagemProdutos = () => (
        <>
            <FlatList
                data={data}
                renderItem={({item}) => (
                    <Pressable
                        onPress={() => {
                            navigation.navigate(item.rota.nome, item.rota.param);
                        }}
                        rounded="8"
                        overflow="hidden"
                        borderWidth="1"
                        borderColor="coolGray.300"
                        shadow="3"
                        bg="coolGray.100"
                        p="5">
                        <Box pl={['-10', '0']} pr={['40', '10']} py="2">
                            <HStack space={[5, 1]} >
                                <Avatar
                                    size="58px"
                                    source={{
                                        uri: item.imagem
                                            ? API.urlFile() + item.imagem
                                            : 'https://media.istockphoto.com/id/1156406125/pt/vetorial/user-green-icon-avatar-vector.jpg?s=170667a&w=0&k=20&c=tFRJyvbOVeVmO2sV87VOMdIanPASdciVlt3xpBBqScU=',
                                    }}
                                />
                                <VStack space={5} >
                                    <Text
                                        _dark={{
                                            color: 'warmGray.50',
                                        }}
                                        color="coolGray.800"
                                        bold>
                                        {item.titulo}
                                    </Text>
                                    <Text
                                        color="coolGray.600"
                                        _dark={{
                                            color: 'warmGray.200',
                                        }}>
                                        {item.descricao}
                                    </Text>
                                </VStack>
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
                    <ListagemProdutos/>
                </Card>
            </Box>
        </NativeBaseProvider>
    );
}
const styles = StyleSheet.create({
    cardListagem: {
        borderRadius: 0,
        shadowRadius: 0,
        // marginTop: -30,
        //paddingLeft: 0,
    },
    texto: {
        alignSelf: 'center',
    },
});