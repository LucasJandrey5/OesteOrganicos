import React, {useState, useCallback} from 'react';
import {
    FormControl,
    Input,
    Stack,
    Icon,
    Button,
    Box,
    ScrollView,
    Center,
    Divider,
    NativeBaseProvider,
    Image,
    useToast,
    Pressable,
    Flex,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import {StyleSheet} from 'react-native';
import API from '../../../config/API';
import AlertMsg from '../../components/AlertMsg';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import {DatePickerModal} from 'react-native-paper-dates';

export default function ProdutoForm({navigation, route}) {
    const {item, produtorId, estoqueObj} = route?.params || '';
    const toast = useToast();

    const img = require('../../assets/adicionar.png');

    const checkParamImg = () => {
        try {
            if (item.length === 0 || item.imagem == null || item.imagem === '') {
                //console.log('img');
                return img;
            } else if (item.imagem.includes('https')) {
                return item.imagem;
            } else {
                return API.urlFile() + item.imagem;
            }
        } catch (e) {
            console.error(e);
        }
    };

    const [produto, setProduto] = useState({
        id: item.id || '',
        nome: item.nome || 'Produto teste',
        unidade_medida_id: item.unidade_medida_id || '',
        tipo_produto_id: item.tipo_produto_id || '',
        sasionalidade: item.sasionalidade || '',
        preco: item.preco || '2',
        peso_estimado: item.peso_estimado || '',
        imagem: item.imagem || '',
        descricao: item.descricao || '',
    });

    useFocusEffect(
        useCallback(() => {
            if (item) {
                setProduto({
                    id: item?.id || '',
                    nome: item?.nome || 'Produto teste',
                    unidade_medida_id: item?.unidade_medida_id || '',
                    tipo_produto_id: item?.tipo_produto_id || '',
                    sasionalidade: item?.sasionalidade || '',
                    preco: item?.preco || '2',
                    peso_estimado: item?.peso_estimado || '',
                    imagem: checkParamImg(),
                    descricao: item?.descricao || '',
                });
            }
        }, [item])
    );

    const [estoque, setEstoque] = useState({
        id: estoqueObj.id || 1,
        produtor_id: estoqueObj.produtor_id || 1,
        comercio_id: item.comercio_id || '',
        produto_id: estoqueObj.produto_id || 1,
        codigo: estoqueObj.codigo || 12344,
        quantidade: estoqueObj.quantidade || 2,
        disponivel_venda: estoqueObj.disponivel_venda || 1,
        data_inicio: estoqueObj.data_inicio || '05-10-2021',
        data_fim: estoqueObj.data_fim || '05-10-2023',
    });

    useFocusEffect(
        useCallback(() => {
            if (estoqueObj) {
                setEstoque({
                    id: estoqueObj?.id || '',
                    produtor_id: estoqueObj?.produtor_id || 1,
                    comercio_id: item?.comercio_id || '',
                    produto_id: estoqueObj?.produto_id || 1,
                    codigo: estoqueObj?.codigo || 12344,
                    quantidade: estoqueObj?.quantidade || 2,
                    disponivel_venda: estoqueObj?.disponivel_venda || 1,
                    data_inicio: estoqueObj?.data_inicio || '',
                    data_fim: estoqueObj?.data_fim || '',
                });
            }
        }, [estoqueObj])
    );

    const [dataInicio, setDataInicio] = useState('');
    const [visivelDataInicio, setVisivelDataInicio] = useState(false);
    const [dataFim, setDataFim] = useState('');
    const [visivelDataFim, setVisivelDataFim] = useState(false);

    const [loading, setLoading] = useState(false);
    const [unidadeMedida, setUnidadeMedida] = useState([]);
    const [tipoProduto, setTipoProduto] = useState([]);

    const [imagemForm, setImagemForm] = useState(img);

    const loadData = async () => {
        try {
            // componente combobox = select
            const responseUM = await API.call('unidade-medida'); //tá trazendo os dados diretamente da API
            let um = responseUM.data.map((item) => {
                return {
                    key: item.id,
                    value: item.nome,
                };
            });
            setUnidadeMedida(um);

            const responseTP = await API.call('tipo-produto');
            let tp = responseTP.data.map((item) => {
                return {
                    key: item.id,
                    value: item.nome,
                };
            });
            setTipoProduto(tp);

        } catch (error) {
            console.error(error);
        }
    };

    useState(() => {
        loadData();
    });

    const saveData = async () => {
        try {
            var response = await API.call(
                'produto', // nome da url
                produto, // objeto
                'POST' // method
            );

            let estoqueObj = {
                produtor_id: produtorId,
                //comercio_id: item.comercio_id ,
                produto_id: response.data.id,
                codigo: estoque.codigo,
                quantidade: estoque.quantidade,
                disponivel_venda: estoque.disponivel_venda,
                data_inicio: estoque.data_inicio,
                data_fim: estoque.data_fim,
            };

            var responseE = await API.call(
                'estoque', // nome da url
                estoqueObj, // objeto
                'POST' // method
            );

            if (response.success) {
                navigation.push('ProdutosProdutor', {item: '', produtorId: produtorId || null});
                toast.show({
                    render: () => {
                        return (
                            <AlertMsg
                                status="success"
                                msg={{titulo: 'Registro Salvo com sucesso!'}}
                            />
                        );
                    },
                });
            }
        } catch (error) {
            setProduto(produto);
            setEstoque(estoque);
            console.error(error);
            let msg = await API.errorCall(error);
            toast.show({
                render: () => {
                    return <AlertMsg status="error" msg={msg}/>;
                },
            });
        }
    };

    const updateData = async () => {
        try {
            setProduto({id: item.id});
            //setEstoque({ id: estoque.id });

            var response = await API.call(
                'produto/' + item.id, // nome da url + id
                produto, // objeto
                'POST' // method
            );

            var responseE = await API.call(
                'estoque/' + estoque.id, // nome da url + id
                estoque, // objeto
                'POST' // method
            );

            if (response.success) {
                navigation.push('ProdutosProdutor', {item: '', produtorId: produtorId || null});
                toast.show({
                    render: () => {
                        return (
                            <AlertMsg
                                status="success"
                                msg={{titulo: 'Registro Atualizado com sucesso!'}}
                            />
                        );
                    },
                });
            }
        } catch (error) {
            setProduto(produto);
            setEstoque(estoque);
            console.error(error);
            let msg = await API.errorCall(error);
            toast.show({
                render: () => {
                    return <AlertMsg status="error" msg={msg}/>;
                },
            });
        }
    };

    const deleteData = async () => {
        try {
            setProduto({id: item.id});
            var responseE = await API.call(
                'estoque/' + estoque.id, // nome da url + id
                estoque, // objeto
                'DELETE' // method
            );
            var response = await API.call(
                'produto/' + item.id, // nome da url + id
                produto, // objeto
                'DELETE' // method
            );

            navigation.push('ProdutosProdutor', {item: '', produtorId: produtorId || null});

        } catch (error) {
            console.error(error);
            let msg = await API.errorCall(error);
            toast.show({
                render: () => {
                    return <AlertMsg error={msg}/>;
                },
            });
        }
    };

    const selecionarImagem = async () => {
        let permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (!result.canceled) {
            setImagemForm({
                uri: result.assets[0].uri,
            });
            setProduto({
                ...produto,
                imagem: result.assets[0].uri,
            });

            console.log('teste: ' + JSON.stringify(produto));
        } else {
            alert('Você não selecionou nenhuma imagem.');
        }
    };

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <ScrollView w="100%">
                    <Stack
                        space={2.5}
                        alignSelf="center"
                        px="4"
                        safeArea
                        mt="4"
                        w={{
                            base: '100%',
                            md: '25%',
                        }}>
                        <Box>
                            <Pressable onPress={selecionarImagem}>
                                <Flex alignSelf="center">
                                    <Image
                                        source={imagemForm}
                                        borderRadius="8"
                                        width="279"
                                        height="180"
                                        shadow="5"
                                        alt="Imagem"
                                    />
                                </Flex>
                            </Pressable>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormControl.Label>Nome</FormControl.Label>
                                <Input
                                    style={styles.itemFormulario}
                                    value={produto.nome}
                                    onChangeText={(value) =>
                                        setProduto({...produto, nome: value})
                                    }
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormControl.Label>Unidade de Medida</FormControl.Label>
                                <SelectList
                                    onSelect={() => produto.unidade_medida_id}
                                    setSelected={(value) =>
                                        setProduto({...produto, unidade_medida_id: value})
                                    } //mesmo que onChangeText
                                    data={unidadeMedida} //tá dizendo o vetor que ele quer trazer
                                    save="key" //atributo dos objetos do vetor que ele quer salvar
                                    defaultOption={
                                        unidadeMedida.filter(
                                            (e) => e.key === produto.unidade_medida_id
                                        )[0] || null
                                    } //traz os dados selecionados para update
                                    searchPlaceholder="Pesquisar"
                                    notFoundText="Dados não encontrado"
                                    placeholder="Selecione"
                                    boxStyles={{
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: '#d9d9d9',
                                        padding: 8,
                                        backgroundColor: '#CBEDD1',
                                    }} //override default styles
                                    dropdownStyles={{
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: '#d9d9d9',
                                        padding: 8,
                                        backgroundColor: '#CBEDD1',
                                    }}
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl isRequired>
                                <FormControl.Label>Tipo</FormControl.Label>
                                <SelectList
                                    setSelected={(value) =>
                                        setProduto({...produto, tipo_produto_id: value})
                                    }
                                    data={tipoProduto}
                                    save="key"
                                    defaultOption={
                                        tipoProduto.filter(
                                            (e) => e.key === produto.tipo_produto_id
                                        )[0] || null
                                    }
                                    searchPlaceholder="Pesquisar"
                                    notFoundText="Dados não encontrado"
                                    placeholder="Selecione"
                                    boxStyles={{
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: '#d9d9d9',
                                        padding: 8,
                                        backgroundColor: '#CBEDD1',
                                    }} //override default styles
                                    dropdownStyles={{
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: '#d9d9d9',
                                        padding: 5,
                                        backgroundColor: '#CBEDD1',
                                    }}
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormControl.Label>Sazonalidade</FormControl.Label>
                                <Input
                                    style={styles.itemFormulario}
                                    value={produto.sasionalidade}
                                    onChangeText={(value) =>
                                        setProduto({...produto, sasionalidade: value})
                                    }
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormControl.Label>Preço</FormControl.Label>
                                <Input
                                    style={styles.itemFormulario}
                                    value={produto.preco}
                                    onChangeText={(value) =>
                                        setProduto({...produto, preco: value})
                                    }
                                    placeholder="1.99"
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormControl.Label>Peso estimado</FormControl.Label>
                                <Input
                                    style={styles.itemFormulario}
                                    value={produto.peso_estimado}
                                    onChangeText={(value) =>
                                        setProduto({...produto, peso_estimado: value})
                                    }
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormControl.Label>Descrição</FormControl.Label>
                                <Input
                                    style={styles.itemFormulario}
                                    value={produto.descricao}
                                    onChangeText={(value) =>
                                        setProduto({...produto, descricao: value})
                                    }
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormControl.Label>Código</FormControl.Label>
                                <Input
                                    style={styles.itemFormulario}
                                    value={estoque.codigo}
                                    onChangeText={(value) =>
                                        setEstoque({...estoque, codigo: value})
                                    }
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormControl.Label>Quantidade</FormControl.Label>
                                <Input
                                    style={styles.itemFormulario}
                                    value={estoque.quantidade}
                                    onChangeText={(value) =>
                                        setEstoque({...estoque, quantidade: value})
                                    }
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormControl.Label>Disponivel venda</FormControl.Label>
                                <Input
                                    style={styles.itemFormulario}
                                    value={estoque.disponivel_venda}
                                    onChangeText={(value) =>
                                        setEstoque({...estoque, disponivel_venda: value})
                                    }
                                />
                            </FormControl>
                        </Box>
                        {/*<Box>
              <FormControl>
                <FormControl.Label>Data inicio</FormControl.Label>
                <Input
                  style={styles.itemFormulario}
                  value={estoque.data_inicio}
                  onChangeText={(value) =>
                    setEstoque({ ...estoque, data_inicio: value })
                  }
                />
              </FormControl>
            </Box>*/}
                        <Box>
                            <FormControl>
                                <FormControl.Label>Data Início</FormControl.Label>
                                <Pressable
                                    onPress={() => {
                                        setVisivelDataInicio(true);
                                    }}>
                                    <Input
                                        style={styles.itemFormulario}
                                        name="data_inicio"
                                        value={dataInicio}
                                        placeholder="00/00/2000"
                                        onChangeText={(value) =>
                                            setEstoque({...estoque, data_inicio: value})
                                        }
                                    />
                                </Pressable>
                                <DatePickerModal
                                    locale="pt"
                                    mode="single"
                                    visible={visivelDataInicio}
                                    onDismiss={() => {
                                        setVisivelDataInicio(false);
                                    }}
                                    date={dataInicio}
                                    onConfirm={(value) => {
                                        setVisivelDataInicio(false);
                                        setDataInicio(value.date.toLocaleDateString('pt-BR'));
                                    }}
                                />
                            </FormControl>
                        </Box>
                        {/*<Box>
              <FormControl>
                <FormControl.Label>Data fim</FormControl.Label>
                <Input
                  //mask="00/00/0000"
                  style={styles.itemFormulario}
                  value={estoque.data_fim}
                  onChangeText={(value) =>
                    setEstoque({ ...estoque, data_fim: value })
                  }
                />
              </FormControl>
            </Box>*/}
                        <Box>
                            <FormControl>
                                <FormControl.Label>Data Fim</FormControl.Label>
                                <Pressable
                                    onPress={() => {
                                        setVisivelDataFim(true);
                                    }}>
                                    <Input
                                        style={styles.itemFormulario}
                                        name="data_fim"
                                        value={dataFim}
                                        placeholder="00/00/2000"
                                    />
                                </Pressable>
                                <DatePickerModal
                                    locale="pt"
                                    mode="single"
                                    visible={visivelDataFim}
                                    onDismiss={() => {
                                        setVisivelDataFim(false);
                                    }}
                                    date={dataFim}
                                    onConfirm={(value) => {
                                        setVisivelDataFim(false);
                                        setDataFim(value.date.toLocaleDateString('pt-BR'));
                                    }}
                                />
                            </FormControl>
                        </Box>
                        <Divider/>
                        <Button.Group
                            justifyContent="space-around"
                            isAttached
                            colorScheme="blue"
                            mx={{
                                base: 'auto',
                                md: 10,
                            }}
                            size="sm">
                            <Button
                                style={styles.botao}
                                variant="subtle"
                                onPress={item === '' ? saveData : updateData}
                                startIcon={<Icon as={FontAwesome} name="save" size="sm"/>}>
                                {item === '' ? 'Salvar' : 'Atualizar'}
                            </Button>
                            <Button
                                style={styles.botao}
                                variant="subtle"
                                onPress={() =>
                                    navigation.navigate('ProdutosProdutor', {
                                        item: '', produtorId: produtorId || null,
                                    })
                                }
                                startIcon={
                                    <Icon as={FontAwesome} name="arrow-left" size="sm"/>
                                }>
                                Voltar
                            </Button>
                            {item !== '' ? (
                                <Button
                                    style={styles.botao}
                                    variant="subtle"
                                    colorScheme="danger"
                                    onPress={() => {
                                        if (confirm('Deseja remover o registro?')) {
                                            deleteData();
                                        }
                                    }}
                                    startIcon={<Icon as={FontAwesome} name="trash" size="sm"/>}>
                                    Deletar
                                </Button>
                            ) : (
                                <></>
                            )}
                        </Button.Group>
                    </Stack>
                </ScrollView>
            </Center>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    itemFormulario: {
        backgroundColor: '#CBEDD1',
    },
    botao: {
        backgroundColor: '#CBEDD1',
        //width: '30%',
    },
});