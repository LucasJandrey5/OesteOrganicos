import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import API from '../../../config/API';
import {StyleSheet} from 'react-native';
import {
    FormControl,
    Input,
    Stack,
    Box,
    Center,
    Button,
    View,
    Checkbox,
    Text,
    ScrollView,
    Divider,
    Icon,
    useToast,
} from 'native-base';
import AlertMsg from '../../components/AlertMsg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SelectList} from 'react-native-dropdown-select-list';

export default function EnderecoForm({navigation, route}) {
    const toast = useToast();
    const {item, produtorId,} = route?.params || '';
    console.log('item ');
    console.log(item);

    const [endereco, setEndereco] = useState({
        id: item.id || '',
        nome: item.nome || '',
        produtor_id: produtorId || '',
        //comercio_id: item.comercio_id || '',
        municipio_id: item.municipio_id || '',
        tipo: 'PRODUTOR',
        rua: item.rua || '',
        numero: item.numero || '',
        cep: item.cep || '',
        bairro: item.bairro || '',
        complemento: item.complemento || '',
        ponto_referencia: item.ponto_referencia || '',
        estacionamento: item.estacionamento || false,
        refeicao: item.refeicao || false,
        latitude: item.latitude || '',
        longitude: item.longitude || '',
        //iconeMapa: item.iconeMapa || '',
        telefone: item.telefone || '',
    });

    useFocusEffect(
        useCallback(() => {
            if (item) {
                setEndereco({
                    id: item?.id || '',
                    nome: item?.nome || '',
                    produtor_id: produtorId || '',
                    //comercio_id: item?.comercio_id || '',
                    municipio_id: item?.municipio_id || '',
                    tipo: 'PRODUTOR',
                    rua: item?.rua || '',
                    numero: item?.numero || '',
                    cep: item?.cep || '',
                    bairro: item?.bairro || '',
                    complemento: item?.complemento || '',
                    ponto_referencia: item?.ponto_referencia || '',
                    estacionamento: item?.estacionamento || false,
                    refeicao: item?.refeicao || false,
                    latitude: item?.latitude || '',
                    longitude: item.longitude || '',
                    //iconeMapa: item.iconeMapa || '',
                    telefone: item?.telefone || '',
                });
            }
        }, [item])
    );

    const [loading, setLoading] = useState(false);
    const [municipio, setMunicipio] = useState([]);
    const [tipoEndereco, setTipoEndereco] = useState([]);

    const loadData = async () => {
        try {
            // componente combobox = select
            const responseM = await API.call('municipio');
            let m = responseM.data.map((item) => {
                return {
                    key: item.id,
                    value: item.nome,
                };
            });
            setMunicipio(m);

            const responseTE = await API.call('tipo-endereco'); //VER COMO VAI SER O NOME NA API
            let te = responseTE.data.map((item) => {
                return {
                    key: item.id,
                    value: item.nome,
                };
            });
            setTipoEndereco(te);
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
                'endereco', // nome da url
                endereco, // objeto
                'POST' // method
            );

            if (response.success) {
                navigation.navigate('EnderecosProdutor', {item: '', produtorId: produtorId || null})
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
            setEndereco(endereco);
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
            setEndereco({id: item.id});

            var response = await API.call(
                'endereco/' + item.id, // nome da url + id
                endereco, // objeto
                'POST' // method
            );
            console.log(response);

            if (response.success) {
                navigation.push('EnderecosProdutor', {item: '', produtorId: produtorId || null});
            }
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
        } catch (error) {
            setEndereco(endereco);
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
            setEndereco({id: item.id});

            var response = await API.call(
                'endereco/' + item.id, // nome da url + id
                endereco, // objeto
                'DELETE' // method
            );
            //console.log(response);
            navigation.push('EnderecosProdutor', {item: '', produtorId: produtorId || null});
            toast.show({
                render: () => {
                    return (
                        <AlertMsg
                            status="success"
                            msg={{titulo: 'Registro removido com sucesso!'}}
                        />
                    );
                },
            });

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

    return (
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
                        <FormControl>
                            <FormControl.Label>Nome</FormControl.Label>
                            <Input
                                style={styles.botao}
                                type="text"
                                placeholder="Nome"
                                name="nome"
                                value={endereco.nome}
                                onChangeText={(value) =>
                                    setEndereco({...endereco, nome: value})
                                }
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl isRequired>
                            <FormControl.Label>Município</FormControl.Label>
                            <SelectList
                                onSelect={() => endereco.municipio_id}
                                setSelected={(value) =>
                                    setEndereco({...endereco, municipio_id: value})
                                } //mesmo que onChangeText
                                data={municipio} //tá dizendo o vetor que ele quer trazer
                                save="key" //atributo dos objetos do vetor que ele quer salvar
                                defaultOption={
                                    municipio.filter(
                                        (e) => e.key === endereco.municipio_id
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
                        <FormControl>
                            <FormControl.Label>Rua</FormControl.Label>
                            <Input
                                style={styles.botao}
                                type="text"
                                placeholder="Rua"
                                name="rua"
                                value={endereco.rua}
                                onChangeText={(value) =>
                                    setEndereco({...endereco, rua: value})
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl>
                            <FormControl.Label>Número</FormControl.Label>
                            <Input
                                style={styles.botao}
                                type="text"
                                placeholder="Número"
                                name="numero"
                                value={endereco.numero}
                                onChangeText={(value) =>
                                    setEndereco({...endereco, numero: value})
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl>
                            <FormControl.Label>CEP</FormControl.Label>
                            <Input
                                style={styles.botao}
                                type="text"
                                placeholder="CEP"
                                name="cep"
                                value={endereco.cep}
                                onChangeText={(value) =>
                                    setEndereco({...endereco, cep: value})
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl>
                            <FormControl.Label>Bairro</FormControl.Label>
                            <Input
                                style={styles.botao}
                                type="text"
                                placeholder="Bairro"
                                name="bairro"
                                value={endereco.bairro}
                                onChangeText={(value) =>
                                    setEndereco({...endereco, bairro: value})
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl>
                            <FormControl.Label>Complemento</FormControl.Label>
                            <Input
                                style={styles.botao}
                                type="text"
                                placeholder="Complemento"
                                name="complemento"
                                value={endereco.complemento}
                                onChangeText={(value) =>
                                    setEndereco({...endereco, complemento: value})
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl>
                            <FormControl.Label>Ponto de Referência</FormControl.Label>
                            <Input
                                style={styles.botao}
                                type="text"
                                placeholder="Ponto de referência"
                                name="ponto_referencia"
                                value={endereco.ponto_referencia}
                                onChangeText={(value) =>
                                    setEndereco({...endereco, ponto_referencia: value})
                                }
                            />
                        </FormControl>
                    </Box>

                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            colorScheme="green"
                            name="estacionamento"
                            isChecked={endereco.estacionamento}
                            value={endereco.estacionamento}
                            onChange={(value) =>
                                setEndereco({...endereco, estacionamento: value})
                            }
                        />
                        <Text> Oferece estacionamento</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            colorScheme="green"
                            name="refeicao"
                            isChecked={endereco.refeicao}
                            value={endereco.refeicao}
                            onChange={(value) =>
                                setEndereco({...endereco, refeicao: value})
                            }
                        />
                        <Text> Oferece Refeição </Text>
                    </View>

                    <Box>
                        <FormControl>
                            <FormControl.Label>Latitude</FormControl.Label>
                            <Input
                                style={styles.botao}
                                type="text"
                                placeholder="Latitude"
                                name="latitude"
                                value={endereco.latitude}
                                onChangeText={(value) =>
                                    setEndereco({...endereco, latitude: value})
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl>
                            <FormControl.Label>Longitude</FormControl.Label>
                            <Input
                                style={styles.botao}
                                type="text"
                                placeholder="Longitude"
                                name="longitude"
                                value={endereco.longitude}
                                onChangeText={(value) =>
                                    setEndereco({...endereco, longitude: value})
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl>
                            <FormControl.Label>Ícone do mapa</FormControl.Label>
                            <Input
                                style={styles.botao}
                                type="text"
                                placeholder="ÍconeMapa"
                                name="iconeMapa"
                                value={endereco.iconeMapa}
                                onChangeText={(value) =>
                                    setEndereco({...endereco, iconeMapa: value})
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl>
                            <FormControl.Label>Telefone</FormControl.Label>
                            <Input
                                style={styles.botao}
                                type="text"
                                placeholder="Telefone"
                                name="telefone"
                                value={endereco.telefone}
                                onChangeText={(value) =>
                                    setEndereco({...endereco, telefone: value})
                                }
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
                            onPress={() => navigation.navigate('EnderecosProdutor', {
                                item: '',
                                produtorId: produtorId || null
                            })}
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
                            <> </>
                        )}
                    </Button.Group>
                </Stack>
            </ScrollView>
        </Center>
    );
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    botao: {
        backgroundColor: '#CBEDD1',
        //width: '30%',
    },
});