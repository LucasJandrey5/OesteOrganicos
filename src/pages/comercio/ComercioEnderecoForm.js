import React, { useState } from 'react';
import { Platform } from 'react-native';

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
  Text,
} from 'native-base';
import { SelectList } from 'react-native-dropdown-select-list';
import { CommonActions } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import API from '../../../config/API';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default function ComercioEnderecoForm({ route, navigation }) {
  const { item } = route.params;


  const [endereco, setEndereco] = useState({
    id: item.id || '',
    nome: item.nome || '',
    tipo: item.tipo || '',
    municipio_id: item.municipio_id,
    comercio_id:item,
    rua: item.rua,
    numero: item.numero,
    bairro: item.bairro,
    cep: item.cep,
    complemento: item.complemento,
    ponto_referencia: item.ponto_referencia,
   
  });
  const [imagemSelected, setImagemSelected] = useState(
    endereco.imagem || 'https://wallpaperaccess.com/full/317501.jpg'
  );

  const [municipio, setMunicipio] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {

    const responseM = await API.call('municipio');
    console.log('Teste ');
    console.log(responseM);
    let m = responseM.data.map((item) => {
      return {
        key: item.id,
        value: item.nome,
      };
    });

    setMunicipio(m);
  };

  useState(() => {
    loadData();
  }, []);

  const saveData = async () => {
    setLoading(true);
    try {
      console.log('saveData');
      console.log(endereco);
      var response = await API.call(
        'endereco', // nome da url
        endereco, // objeto
        'POST' // method
      );
      // uploadImage();
      console.log('response');
      console.log(response);
      if (response.success) {
        navigation.push('ComercioEnderecoList');
      } else {
        let msg = response.message + ' nos campos abaixo:' + '\n';

        for (let index in response.data) {
          let tipoValidate = '';
          if (response.data[index] == 'validation.required') {
            tipoValidate = ' Obrigatório';
          }
          if (response.data[index] == 'validation.min.string') {
            tipoValidate = ' Quantidade mínima de caracteres';
          }
          if (response.data[index] == 'validation.max.string') {
            tipoValidate = ' Quantidade máxima de caracteres';
          }
          msg += index + ':' + tipoValidate + '\n';
        }
        alert(msg);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const updateData = async () => {
    try {
      setEndereco({ id: item.id });
      console.log('atualizando os dados');
      console.log(endereco);

      var response = await API.call(
        'endereco/' + endereco.id, // nome da url + id
        endereco, // objeto
        'POST' // method
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    navigation.dispatch(CommonActions.goBack());
  };

  const deleteData = async () => {
    try {
      setEndereco({ id: item.id });

      var response = await API.call(
        'endereco/' + endereco.id, // nome da url + id
        endereco, // objeto
        'DELETE' // method
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    navigation.push('ComercioEnderecoList');
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
              <FormControl>
                <Text style={styles.titulo}>Nome</Text>
                <Input
                  style={styles.input}
                  value={endereco.nome}
                  onChangeText={(value) =>
                    setEndereco({ ...endereco, nome: value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Text style={styles.titulo}>Cidade</Text>
                <SelectList
                  onSelect={() => endereco.municipio_id}
                  setSelected={(value) =>
                    setEndereco({ ...endereco, municipio_id: value })
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
                <Text style={styles.titulo}>Rua</Text>
                <Input
                  style={styles.input}
                  value={endereco.rua}
                  onChangeText={(value) =>
                    setEndereco({ ...endereco, rua: value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Text style={styles.titulo}>Tipo</Text>
                <Input
                  style={styles.input}
                  value={endereco.tipo}
                  onChangeText={(value) =>
                    setEndereco({ ...endereco, tipo: value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Text style={styles.titulo}>Numero</Text>
                <Input
                  style={styles.input}
                  value={endereco.numero}
                  onChangeText={(value) =>
                    setEndereco({ ...endereco, numero: value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Text style={styles.titulo}>Bairro ou comunidade</Text>
                <Input
                  style={styles.input}
                  value={endereco.bairro}
                  onChangeText={(value) =>
                    setEndereco({ ...endereco, bairro: value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Text style={styles.titulo}>CEP</Text>
                <Input
                  style={styles.input}
                  value={endereco.cep}
                  onChangeText={(value) =>
                    setEndereco({ ...endereco, cep: value })
                  }
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl>
                <Text style={styles.titulo}>Complemento</Text>
                <Input
                  style={styles.input}
                  value={endereco.complemento}
                  onChangeText={(value) =>
                    setEndereco({ ...endereco, complemento: value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Text style={styles.titulo}>Ponto de referência</Text>
                <Input
                  style={styles.input}
                  value={endereco.ponto_referencia}
                  onChangeText={(value) =>
                    setEndereco({ ...endereco, ponto_referencia: value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Text style={styles.titulo}>Mapa</Text>
                <Input style={styles.input} placeholder="olhar api" />
              </FormControl>
            </Box>
            <Divider />
            <Button.Group
              isAttached
              colorScheme="blue"
              w="100%"
              mx={{
                base: 'auto',
                md: 10,
              }}
              size="sm"
              alignSelf="center">
              <Button
              style={styles.button}
                variant="subtle"
                onPress={item == '' ? saveData : updateData}
                w={item.id ? '50%' : '100%'}
                backgroundColor="#CBEDD1"
                startIcon={<Icon as={FontAwesome} name="save" size="sm" />}>
                {item == '' ? 'Salvar' : 'Atualizar'}
              </Button>

              {item !== '' ? (
                <Button
                style={styles.button}
                  variant="subtle"
                  colorScheme="danger"
                  onPress={() => {
                    if (confirm('Deseja remover o registro?')) {
                      deleteData();
                    }
                  }}
                  w={item.id ? '50%' : '100%'}
                  startIcon={<Icon as={FontAwesome} name="trash" size="sm" />}>
                  Deletar
                </Button>
              ) : (
                <> </>
              )}
            </Button.Group>
          </Stack>
        </ScrollView>
      </Center>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#CBEDD1',
  },
  titulo: {
    fontWeight: 'bold',
  },
  button: {
  marginBottom: 30,
  marginTop: 20,
},
});
