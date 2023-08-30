import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {
    FormControl,
    Input,
    Stack,
    Box,
    Center,
    Pressable,
    Button,
    Image,
    View,
    Checkbox,
    Text,
    Flex,
    ScrollView,
    Icon,
    Divider,
    useToast,
} from 'native-base';
import AlertMsg from '../../components/AlertMsg';
import API from '../../../config/API';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {SelectList} from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker';
import {DatePickerModal} from 'react-native-paper-dates';

export default function ProdutorForm({navigation, route}) {
    const toast = useToast();
    const {item} = route?.params;
    //console.log('item');
    //console.log(item);

    const img = require('../../assets/sem_imagem.jpg');

    const checkParamImg = () => {
        try {
            console.log('img');
            console.error( item.imagem);
            console.error(item.length === 0 || item.imagem == null);
            if (item.length === 0 || item.imagem == null) {
                return img;
            } else if (item.imagem.includes('https')) {
                //console.log('Palavra "https" encontrada na URL');
                return item.imagem;
            } else {
                return API.urlFile() + item.imagem;
            }
        } catch (e) {
            console.error(e);
        }
    };

    const [produtor, setProdutor] = useState({
        id: item.id || '',
        nome: item.nome || 'nome teste',
        cpf: item.cpf || '11122233344',
        rg: item.rg || '',
        municipio_id: item.municipio_id || '',
        conjuge_id: item.conjuge_id || '',
        data_nascimento: item.data_nascimento || '',
        sexo: item.sexo || '',
        raca: item.raca || '',
        nomepai: item.nomepai || '',
        nomemae: item.nomemae || '',
        usuario_id: item.usuario_id || '',
        telefone1: item.telefone1 || '',
        telefone2: item.telefone2 || '',
        email: item.email || '',
        link: item.link || '',
        site: item.site || '',
        descricao: item.descricao || '',
        agendamento: item.agendamento || false,
        acessibilidade: item.acessibilidade || false,
        certificacao: item.certificacao || false,
        imagem: item.imagem || '',
    });

    useFocusEffect(
        useCallback(() => {

            loadData();

            if (item) {
                setProdutor({
                    id: item?.id || '',
                    nome: item?.nome || 'TESTE NOME',
                    cpf: item?.cpf || '11122233344',
                    rg: item?.rg || '',
                    municipio_id: item?.municipio_id || '',
                    conjuge_id: item?.conjuge_id || '',
                    data_nascimento: item?.data_nascimento || '',
                    sexo: item?.sexo || '',
                    raca: item?.raca || '',
                    nomepai: item?.nomepai || '',
                    nomemae: item?.nomemae || '',
                    usuario_id: item?.usuario_id || '',
                    telefone1: item?.telefone1 || '',
                    telefone2: item?.telefone2 || '',
                    email: item?.email || '',
                    link: item?.link || '',
                    site: item?.site || '',
                    descricao: item?.descricao || '',
                    agendamento: item?.agendamento || false,
                    acessibilidade: item?.acessibilidade || false,
                    certificacao: item?.certificacao || false,
                    imagem: checkParamImg(),
                });
            }
        }, [item])
    );

    const [dataNascimento, setDataNascimento] = useState('');
    const [visivelDataNascimento, setVisivelDataNascimento] = useState(false);
    const [imagemForm, setImagemForm] = useState('');
    const [loading, setLoading] = useState(false);
    const [municipio, setMunicipio] = useState([]);

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
        } catch (error) {
            console.error(error);
        }
    };

    const saveData = async () => {
        setLoading(true);
        console.log('produtor');
        console.log(produtor);
        try {
            const response = await API.call(
                'produtor', // nome da url
                produtor, // objeto
                'POST' // method
            );
            //console.log('response');
            // console.log(response);
            if (response.success) {
                navigation.push('ProdutorListADM');
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
            setProdutor(produtor); // <-
            console.error(error);
            let msg = await API.errorCall(error);
            toast.show({
                render: () => {
                    return <AlertMsg status="error" msg={msg}/>;
                },
            });
        }

        setLoading(false);
    };

    const updateData = async () => {
        try {
            setProdutor({id: item.id});

            console.log('produtor');
            console.log(produtor);

            var response = await API.call(
                'produtor/' + item.id, // nome da url
                produtor, // objeto
                'POST' // method
            );
            console.log('updateData');
            console.log(response);

            if (response.success) {
                navigation.push('ProdutorListADM');
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
            setProdutor(produtor); // <-
            console.error(error);
            let msg = await API.errorCall(error);
            toast.show({
                render: () => {
                    return <AlertMsg status="error" msg={msg}/>;
                },
            });
        }
        setLoading(false);
    };

    const deleteData = async () => {
        try {
            setProdutor({id: produtor.usuario_id});
            var response = await API.call(
                'produtor/' + item.id, // nome da url + id
                produtor, // objeto
                'DELETE' // method
            );
            console.log(response);
            //console.log("ID PRODUTO DELETAR: " + item.id);

            navigation.push('ProdutorListADM');
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
            setProdutor({
                ...produtor,
                imagem: result.assets[0].uri,
            });

            console.log('teste: ' + JSON.stringify(produtor));
        } else {
            alert('Você não selecionou nenhuma imagem.');
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
                        <FormControl isRequired>
                            <FormControl.Label>Nome</FormControl.Label>
                            <Input
                                backgroundColor="#CBEDD1"
                                type="text"
                                placeholder="nome"
                                name="nome"
                                value={produtor.nome}
                                onChangeText={(value) =>
                                    setProdutor({...produtor, nome: value})
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl isRequired>
                            <FormControl.Label>CPF</FormControl.Label>
                            <Input
                                backgroundColor="#CBEDD1"
                                type="text"
                                placeholder="cpf"
                                name="cpf"
                                value={produtor.cpf}
                                onChangeText={(value) =>
                                    setProdutor({...produtor, cpf: value})
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl>
                            <FormControl.Label>RG</FormControl.Label>
                            <Input
                                backgroundColor="#CBEDD1"
                                type="text"
                                placeholder="rg"
                                name="rg"
                                value={produtor.rg}
                                onChangeText={(value) =>
                                    setProdutor({...produtor, rg: value})
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl>
                            <FormControl.Label>Município</FormControl.Label>
                            <SelectList
                                onSelect={() => produtor.municipio_id}
                                setSelected={(value) =>
                                    setProdutor({...produtor, municipio_id: value})
                                } //mesmo que onChangeText
                                data={municipio} //tá dizendo o vetor que ele quer trazer
                                save="key" //atributo dos objetos do vetor que ele quer salvar
                                defaultOption={
                                    municipio.filter(
                                        (e) => e.key === produtor.municipio_id
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
                            <FormControl.Label>Cônjuge</FormControl.Label>
                            <Input
                                backgroundColor="#CBEDD1"
                                type="text"
                                placeholder="conjuge_id"
                                name="conjuge_id"
                                value={produtor.conjuge_id}
                                onChangeText={(value) =>
                                    setProdutor({...produtor, conjuge_id: value})
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl>
                            <FormControl.Label>Data Nascimento</FormControl.Label>
                            <Pressable
                                onPress={() => {
                                    setVisivelDataNascimento(true);
                                }}>
                                <Input
                                    name="data_inicio"
                                    value={dataNascimento}
                                    placeholder="00/00/2000"
                                    backgroundColor="#CBEDD1"
                                    onChangeText={(value) =>
                                        setProdutor({...produtor, data_nascimento: value})
                                    }
                                />
                            </Pressable>
                            <DatePickerModal
                                locale="pt"
                                mode="single"
                                visible={visivelDataNascimento}
                                onDismiss={() => {
                                    setVisivelDataNascimento(false);
                                }}
                                date={dataNascimento}
                                onConfirm={(value) => {
                                    setVisivelDataNascimento(false);
                                    setDataNascimento(value.date.toLocaleDateString('pt-BR'));
                                }}
                            />
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl>
                            <FormControl.Label>Gênero</FormControl.Label>
                            <Input
                                backgroundColor="#CBEDD1"
                                type="text"
                                placeholder="genero"
                                name="sexo"
                                value={produtor.sexo}
                                onChangeText={(value) =>
                                    setProdutor({...produtor, sexo: value})
                                }
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormControl.Label>Etnia</FormControl.Label>
                            <Input
                                backgroundColor="#CBEDD1"
                                type="text"
                                placeholder="etnia"
                                name="raca"
                                value={produtor.raca}
                                onChangeText={(value) =>
                                    setProdutor({...produtor, raca: value})
                                }
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormControl.Label>Nome Pai</FormControl.Label>
                            <Input
                                backgroundColor="#CBEDD1"
                                type="text"
                                placeholder="nomepai"
                                name="nomepai"
                                value={produtor.nomepai}
                                onChangeText={(value) =>
                                    setProdutor({...produtor, nomepai: value})
                                }
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormControl.Label>Nome Mãe</FormControl.Label>
                            <Input
                                backgroundColor="#CBEDD1"
                                type="text"
                                placeholder="nomemae"
                                name="nomemae"
                                value={produtor.nomemae}
                                onChangeText={(value) =>
                                    setProdutor({...produtor, nomemae: value})
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl>
                            <FormControl.Label>Telefone 1</FormControl.Label>
                            <Input
                                backgroundColor="#CBEDD1"
                                type="text"
                                placeholder="telefone1"
                                name="telefone1"
                                value={produtor.telefone1}
                                onChangeText={(value) =>
                                    setProdutor({...produtor, telefone1: value})
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl>
                            <FormControl.Label>Telefone 2</FormControl.Label>
                            <Input
                                backgroundColor="#CBEDD1"
                                type="text"
                                placeholder="telefone2"
                                name="telefone2"
                                value={produtor.telefone2}
                                onChangeText={(value) =>
                                    setProdutor({...produtor, telefone2: value})
                                }
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input
                                backgroundColor="#CBEDD1"
                                type="text"
                                placeholder="email"
                                name="email"
                                value={produtor.email}
                                onChangeText={(value) =>
                                    setProdutor({...produtor, email: value})
                                }
                            />
                        </FormControl>
                    </Box>
                    {/*
              <Box>
                <FormControl>
                  <FormControl.Label>Link</FormControl.Label>
                  <Input
                      backgroundColor="#CBEDD1"
                      type="text"
                      placeholder="link"
                      name="link"
                      value={produtor?.link}
                      onChangeText={(value) =>
                          setProdutor({ ...produtor, link: value })
                      }
                  />
                </FormControl>
              </Box>
              */}
                    <Box>
                        <FormControl>
                            <FormControl.Label>Site</FormControl.Label>
                            <Input
                                backgroundColor="#CBEDD1"
                                type="text"
                                placeholder="site"
                                name="site"
                                value={produtor.site}
                                onChangeText={(value) =>
                                    setProdutor({...produtor, site: value})
                                }
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormControl.Label>Descrição</FormControl.Label>
                            <Input
                                backgroundColor="#CBEDD1"
                                type="text"
                                placeholder="Descrição..."
                                name="descricao"
                                value={produtor.descricao}
                                onChangeText={(value) =>
                                    setProdutor({...produtor, descricao: value})
                                }
                            />
                        </FormControl>
                    </Box>

                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            colorScheme="green"
                            name="agendamento"
                            isChecked={produtor.agendamento}
                            value={produtor.agendamento}
                            onChange={(value) =>
                                setProdutor({...produtor, agendamento: value})
                            }
                        />
                        <Text> Precisa de agendamento</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            colorScheme="green"
                            name="acessibilidade"
                            isChecked={produtor.acessibilidade}
                            value={produtor.acessibilidade}
                            onChange={(value) =>
                                setProdutor({...produtor, acessibilidade: value})
                            }
                        />
                        <Text> Possui acessibilidade</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            colorScheme="green"
                            name="certificacao"
                            isChecked={produtor.certificacao}
                            value={produtor.certificacao}
                            onChange={(value) =>
                                setProdutor({...produtor, certificacao: value})
                            }
                        />
                        <Text> Possui certificacao</Text>
                    </View>
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
                            onPress={item == '' ? saveData : updateData}
                            startIcon={<Icon as={FontAwesome} name="save" size="sm"/>}>
                            {item == '' ? 'Salvar' : 'Atualizar'}
                        </Button>
                        <Button
                            style={styles.botao}
                            variant="subtle"
                            onPress={() => navigation.navigate('ProdutorListADM')}
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
    );
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
    },
    botao: {
        backgroundColor: '#CBEDD1',
        //width: '30%',
    },
});
