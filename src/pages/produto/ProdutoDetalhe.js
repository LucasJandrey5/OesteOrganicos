import React, {useState, useEffect} from 'react';
import {Stack, Button, Text, ScrollView, Image, Fab, Modal, Box,} from 'native-base';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../../../config/API';

export default function ProdutoDetalhe({route, navigation}) {
    const {item, produtorObj} = route.params;
    const [enableButton, setEnableButton] = useState(false);
    const [count, setCount] = useState(0);
    const [unidade_medida, setUnidade_medida] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [setItem] = useState({});

    const img = require('../../assets/sem_imagem.jpg');

    const checkImagemParam = () => {
        try {
            if (item.length === 0 || item.imagem == null) {
                //console.log('img');
                return img;
            } else if (item.imagem.includes('https')) {
                // console.log('Palavra "https" encontrada na URL');
                return {uri: item.imagem};
            } else {
                let img = item.imagem ? API.urlFile() + item.imagem : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU';
                return {uri: img}
            }
        } catch (e) {
            console.log(e);
        }
    };

    let estoque_id = '';

    if (item.pivot?.id !== undefined) {
        estoque_id = item.pivot?.id;
    } else if (item.estoque_id !== undefined) {
        estoque_id = item.estoque_id;
    } else {
        estoque_id = '';
    }

    const [produto, setProduto] = useState({
        id: item.id || '',
        nome: item.nome || '',
        preco: item.preco || '',
        unidade_medida_id: item.unidade_medida_id || '',
        tipo_produto_id: item.tipo_produto_id || '',
        imagem: checkImagemParam(),
        sasionalidade: item.sasionalidade || '',
        estoque_id: estoque_id,
    });

    const [produtor, setProdutor] = useState({
        id: produtorObj.id || '',
        nome: produtorObj.nome || '',
        cpf: produtorObj.cpf || '',
        produtos: produtorObj.produtos || '',
        telefone1: produtorObj.telefone1 || '',
    });

    const [tempProduto, setTempProduto] = useState([]);

    const [pedido, setPedido] = useState({
        produtor: produtor, obs: '', itens: [], endereco: {}, total: '',
    });

    const loadData = async () => {
        try {
            let pedidoAS = await AsyncStorage.getItem('pedido');
            let data = (await JSON.parse(pedidoAS)) || pedido;
            console.log(data);

            setUnidade_medida(await AsyncStorage.getItem('unidade-medida/' + produto?.unidade_medida_id));

            console.log('unidade');
            console.log(unidade_medida);

            console.log('pedido.itens');
            console.log(pedido);
            const response = await API.call('produto/' + produto?.id); //recarrega as informações do produto

            console.log("response.data");
            console.log(response.data);
            //setItem(response.data);
            console.log("item");
            console.log(item);
            console.log("response.data.preco");
            console.log(response.data.preco);
            setProduto({
                ...produto, preco: response.data.preco, imagem: API.urlFile() + response.data?.imagem,
            });

            setPedido(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        navigation.addListener('focus', () => {
            loadData();
        });
    });

    const saveData = async () => {
        console.log("produto?.preco");
        console.log(produto?.preco);
        console.log("item.preco");
        console.log(item.preco);
        try {
            if (count !== 0) {
                for (let i = 0; i < count; i++) {
                    tempProduto?.push(produto);
                }
                setEnableButton(true);
            } else {
                setShowModal(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const saveDataVerSacola = async () => {
        try {
            let mergerProduto = [];
            console.log('pedido.itens');
            console.log(pedido);

            if (pedido.itens.length !== 0) {
                let tempProdutoDirefente = pedido.itens.filter((e) => e.id != produto?.id);

                mergerProduto = [...tempProdutoDirefente, ...tempProduto];
            } else {
                mergerProduto = [...tempProduto];
            }

            pedido.itens = [];
            for (let i = 0; i < count; i++) {
                pedido.itens = [...mergerProduto];
            }
            await AsyncStorage.setItem('pedido', JSON.stringify(pedido));
            console.log('saveDataVerSacola');
            console.log(await AsyncStorage.getItem('pedido'));

            navigation.dispatch(CommonActions.reset({
                routes: [{
                    name: 'VerSacola',
                },],
            }));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <ScrollView w="100%" backgroundColor="white">
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton/>
                        <Modal.Header>Ops! </Modal.Header>

                        <Modal.Body>Adicione pelo menos um item a sacola.</Modal.Body>
                    </Modal.Content>
                </Modal>
                <Stack
                    space={2.5}
                    alignSelf="center"
                    px="4"
                    safeArea
                    mt="4"
                    w={{
                        base: '100%', md: '25%',
                    }}>
                    <Image
                        source={checkImagemParam()}
                        alt="imagem produto"
                        size="100%"
                        maxHeight="100px"
                    />
                    <Stack>
                        <Text fontSize={15} fontWeight={'bold'} textAlign={'left'}>
                            {produto?.nome}
                        </Text>
                    </Stack>
                    <Stack>
                        <Text fontSize={14} textAlign={'left'}>
                            {produto?.sasionalidade}
                        </Text>
                    </Stack>
                    <Stack>
                        <Text fontSize={14} textAlign={'left'}>
                            R$ {produto?.preco}
                        </Text>
                    </Stack>
                    <Stack>
                        <Text fontSize={14} textAlign={'left'}>
                            Tempo de entrega: a combinar com o produtor
                        </Text>
                    </Stack>
                    <Stack>
                        <Text fontSize={14} textAlign={'left'}>
                            Unidade de medida: {unidade_medida}
                        </Text>
                    </Stack>
                    <Box>
                        <Stack>
                            <Stack
                                flex={2}
                                flexDirection="row"
                                justifyContent="space-around"
                                alignItems="center">
                                <Stack
                                    backgroundColor="#004D0C"
                                    flexDirection="row"
                                    width="30%"
                                    fontSize="14"
                                    marginTop="5">
                                    <Button
                                        color="white"
                                        marginTop="0"
                                        borderRadius="0"
                                        backgroundColor="none"
                                        onPress={() => {
                                            setCount(count > 0 ? count - 1 : 0);
                                            count === 1 ? setEnableButton(false) : '';
                                        }}>
                                        <Text color="white"> - </Text>
                                    </Button>
                                    <Text color="white" marginTop="2.5">
                                        {count}
                                    </Text>
                                    <Button
                                        color="white"
                                        marginTop="0"
                                        padding="2"
                                        borderRadius="0"
                                        backgroundColor="none"
                                        onPress={() => setCount(count + 1)}>
                                        <Text color="white"> + </Text>
                                    </Button>
                                </Stack>

                                <Button
                                    color="white"
                                    width="60%"
                                    marginTop="5"
                                    padding="2.5"
                                    borderRadius="0"
                                    backgroundColor="#004D0C"
                                    fontSize="14"
                                    variant="subtle"
                                    name="save"
                                    size="sm"
                                    onPress={saveData}>
                                    <Text color="white">
                                        Adicionar R$ {produto?.preco * count}
                                    </Text>
                                </Button>
                            </Stack>
                            {enableButton ? (<Stack
                                style={{
                                    backgroundColor: '#CBEDD1',
                                    marginTop: '5%',
                                    padding: '10%',
                                    flex: 1,
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Fab
                                    onPress={saveDataVerSacola}
                                    renderInPortal={false}
                                    shadow={6}
                                    colorScheme="green"
                                    placement="bottom"
                                    right={0}
                                    paddingRight="40%"
                                    paddingLeft="40%"
                                    height="12"
                                    size="sm"
                                    borderRadius="10"
                                    label={<Text color="white" fontSize="md">Ver Sacola</Text>}
                                />
                            </Stack>) : (<></>)}
                        </Stack>
                    </Box>
                </Stack>
            </ScrollView>
        </>);
}
