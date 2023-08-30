import React from 'react';
import {
    VStack,
    Center,
    NativeBaseProvider,
    Button,
    Icon,
    Box,
    Text,
    ScrollView,
    Container, Image
} from 'native-base';
import {StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default function TelaPerfil({route, navigation}) {
    return (
        <Container w="100%">
            <ScrollView w="100%" backgroundColor="white">
                {/*<Box style={styles.imageWrapper}></Box>*/}
                <Box style={styles.bgImagem}>
                    <Image
                        alt="logo"
                        style={styles.logo}
                        source={require('../../assets/logo_oeste_organicos.png')}
                    />
                    <Text style={styles.titulo}> OESTE ORGÂNICOS </Text>
                </Box>

                <Box
                    contentContainerStyle={styles.content}
                    style={{paddingVertical: 20}}>
                    <Center flex={1} px="3">
                        <VStack space={5} alignItems="center">
                            <Button
                                w="290"
                                h="12"
                                bg="green.300"
                                rounded="12"
                                shadow={3}
                                startIcon={<Icon as={FontAwesome} name="user" size="35"/>}
                                onPress={() => navigation.navigate('Usuario')}>
                                <Text bold fontSize="20">
                                    Usuário
                                </Text>
                            </Button>
                            <Button
                                w="290"
                                h="12"
                                bg="green.300"
                                rounded="12"
                                shadow={3}
                                startIcon={
                                    <Icon as={FontAwesome} name="shopping-cart" size="35"/>
                                }
                                onPress={() => navigation.navigate('PedidosHistorico')}>
                                <Text bold fontSize="20" padding="2">
                                    Pedidos
                                </Text>
                            </Button>
                            <Button
                                w="290"
                                h="12"
                                bg="green.300"
                                rounded="12"
                                shadow={3}
                                startIcon={<Icon as={FontAwesome} name="heart" size="35"/>}
                                onPress={() => navigation.navigate('FavoritosList')}>
                                <Text bold fontSize="20" padding="2">
                                    Favoritos
                                </Text>
                            </Button>
                            <Button
                                w="290"
                                h="12"
                                bg="green.300"
                                rounded="12"
                                shadow={3}
                                startIcon={<Icon as={FontAwesome} name="leaf" size="35"/>}>
                                <Text bold fontSize="20" padding="2">
                                    Produtos
                                </Text>
                            </Button>
                            <Button
                                w="290"
                                h="12"
                                bg="green.300"
                                rounded="12"
                                shadow={3}
                                startIcon={<Icon as={FontAwesome} name="tractor" size="35"/>}>
                                <Text bold fontSize="20" padding="4">
                                    Produtores
                                </Text>
                            </Button>
                            <Button
                                w="290"
                                h="12"
                                bg="green.300"
                                rounded="12"
                                shadow={3}
                                startIcon={<Icon as={FontAwesome} name="building" size="35"/>}
                                onPress={() => navigation.navigate('ComercioList')}>
                                <Text bold fontSize="20" padding="2">
                                    Comércios
                                </Text>
                            </Button>
                            <Button
                                w="290"
                                h="12"
                                bg="green.300"
                                rounded="12"
                                shadow={3}
                                startIcon={<Icon as={FontAwesome} name="map" size="35"/>}
                                onPress={() => navigation.navigate('MapaProdutores')}>
                                <Text bold fontSize="20" padding="2">
                                    Ver Mapa
                                </Text>
                            </Button>
                            <Button
                                w="290"
                                h="12"
                                bg="green.300"
                                rounded="12"
                                shadow={3}
                                startIcon={<Icon as={FontAwesome} name="home" size="35"/>}
                                onPress={() => navigation.navigate('EnderecoListagem')}>
                                <Text bold fontSize="20" padding="2">
                                    Endereços
                                </Text>
                            </Button>
                            <Button
                                w="290"
                                h="12"
                                bg="green.300"
                                rounded="12"
                                shadow={3}
                                startIcon={<Icon as={FontAwesome} name="star" size="35"/>}
                                onPress={() => navigation.navigate('AvaliacaoList')}>
                                <Text bold fontSize="20" padding="2">
                                    Avaliações
                                </Text>
                            </Button>
                            <Button
                                w="290"
                                h="12"
                                bg="green.300"
                                rounded="12"
                                shadow={3}
                                startIcon={<Icon as={FontAwesome} name="bell" size="35"/>}
                                onPress={() => navigation.navigate('Notificacoes')}>
                                <Text bold fontSize="20" padding="2">
                                    Notificações
                                </Text>
                            </Button>
                            <Button
                                w="290"
                                h="12"
                                bg="green.300"
                                rounded="12"
                                shadow={3}
                                startIcon={<Icon as={FontAwesome} name="cog" size="35"/>}>
                                <Text bold fontSize="20" padding="2">
                                    Configurações
                                </Text>
                            </Button>
                            <Button w="290" h="12" bg="green.300" rounded="12" shadow={3}>
                                <Text bold fontSize="20">
                                    Sair
                                </Text>
                            </Button>
                        </VStack>
                    </Center>
                </Box>
            </ScrollView>

        </Container>
    );
}

const styles = StyleSheet.create({
    logo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        top: 0,
        //left: 0,
        width: '100%',
        height: '80%',
        resizeMode: 'center',
    },
    bgImagem: {
        //position: 'absolute',
        top: 0,
        //left: 0,
        width: '125%',
        height: '21%',
        backgroundColor: 'green',
    },
    /*imageWrapper: {
      position: 'center',
      width: '100%',
      height: 200,
    },*/
    titulo: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 20,
    },
});