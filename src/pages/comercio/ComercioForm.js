import React, { useState } from 'react';
import { Platform } from 'react-native';

import {
  FormControl,
  Input,
  Stack,
  Icon,
  Button,
  Box,
  WarningOutlineIcon,
  ScrollView,
  Center,
  Divider,
  Image,
  NativeBaseProvider,
  Text,
  HStack,
  VStack,
  View,
  Checkbox,
} from 'native-base';
import { SelectList } from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker';
import { CommonActions } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import API from '../../../config/API';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default function ComercioForm({ route, navigation }) {
  const { item } = route.params;
  const [comercio, setComercio] = useState({
    id: item.id || '',
    nome: item.nome || '',
    cnpj: item.cnpj || '',
    tipo: item.tipo || '',
    telefone1: item.telefone1,
    telefone2: item.telefone2,
    email: item.email,
    link: item.link,
    site: item.site,
    agendamento: item.agendamento,
    acessibilidade: item.acessibilidade,
    certificacao: item.certificacao,
  });
  console.log(item);

  const [municipio, setMunicipio] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    const responseM = await API.call('municipio');
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

  const updateData = async () => {
    try {
      setComercio({ id: item.id });
      console.log('valores depois de clicar para atualizar');
      console.log(comercio);

      var response = await API.call(
        'comercio/' + item.id, // nome da url + id
        comercio, // objeto
        'POST' // method
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    navigation.push('UsuarioComercio', { item: item || null });
  };

  const saveData = async () => {
    setLoading(true);
    try {
      console.log('Setado em comercio');
      console.log(comercio);
      var response = await API.call(
        'comercio', // nome da url
        comercio, // objeto
        'POST' // method
      );

      if (response.success) {
        navigation.push('ComercioList');
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

      console.log('SaveData');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
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
                <Text style={styles.titulo}>Nome do Comércio</Text>
                <Input
                  style={styles.input}
                  placeholder="Nome do Comércio"
                  value={comercio.nome}
                  onChangeText={(value) =>
                    setComercio({ ...comercio, nome: value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Text style={styles.titulo}>CNPJ</Text>
                <Input
                  style={styles.input}
                  placeholder="CNPJ do Comércio"
                  value={comercio.cnpj}
                  onChangeText={(value) =>
                    setComercio({ ...comercio, cnpj: value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Text style={styles.titulo}>Tipo do comercio</Text>
                <Input
                  style={styles.input}
                  placeholder="Tipo do comercio"
                  value={comercio.tipo}
                  onChangeText={(value) =>
                    setComercio({ ...comercio, tipo: value })
                  }
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl>
                <Text style={styles.titulo}>Cidade</Text>
                <SelectList
                  onSelect={() => comercio.municipio_id}
                  setSelected={(value) =>
                    setComercio({ ...comercio, municipio_id: value })
                  } //mesmo que onChangeText
                  data={municipio} //tá dizendo o vetor que ele quer trazer
                  save="key" //atributo dos objetos do vetor que ele quer salvar
                  defaultOption={
                    municipio.filter(
                      (e) => e.key === comercio.municipio_id
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
                <Text style={styles.titulo}>Telefone 1</Text>
                <Input
                  style={styles.input}
                  placeholder="Telefone Principal"
                  value={comercio.telefone1}
                  onChangeText={(value) =>
                    setComercio({ ...comercio, telefone1: value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Text style={styles.titulo}>Telefone 2</Text>
                <Input
                  style={styles.input}
                  placeholder="Telefone Secundário"
                  value={comercio.telefone2}
                  onChangeText={(value) =>
                    setComercio({ ...comercio, telefone2: value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Text style={styles.titulo}>E-mail</Text>
                <Input
                  style={styles.input}
                  placeholder="E-mail do comercio"
                  value={comercio.email}
                  onChangeText={(value) =>
                    setComercio({ ...comercio, email: value })
                  }
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl>
                <Text style={styles.titulo}>Link Google</Text>
                <Input
                  style={styles.input}
                  placeholder="Link do comercio"
                  value={comercio.link}
                  onChangeText={(value) =>
                    setComercio({ ...comercio, link: value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Text style={styles.titulo}>Url Site</Text>
                <Input
                  style={styles.input}
                  placeholder="Site do comercio"
                  value={comercio.site}
                  onChangeText={(value) =>
                    setComercio({ ...comercio, site: value })
                  }
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl>
                <Text style={styles.titulo}>Precisa de Agendamento?</Text>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    colorScheme="green"
                    name="agendamento"
                    isChecked={comercio.agendamento}
                    value={comercio.agendamento}
                    onChange={(value) =>
                      setComercio({ ...comercio, agendamento: value })
                    }
                  />
                </View>
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Text style={styles.titulo}>Acessibilidade?</Text>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    colorScheme="green"
                    name="acessibilidade"
                    isChecked={comercio.acessibilidade}
                    value={comercio.acessibilidade}
                    onChange={(value) =>
                      setComercio({ ...comercio, acessibilidade: value })
                    }
                  />
                </View>
              </FormControl>
            </Box>

            <Box>
              <FormControl>
                <Text style={styles.titulo}>Certificacao?</Text>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    colorScheme="green"
                    name="certificacao"
                    isChecked={comercio.certificacao}
                    value={comercio.certificacao}
                    onChange={(value) =>
                      setComercio({ ...comercio, certificacao: value })
                    }
                  />
                </View>
              </FormControl>
            </Box>

            <Divider
              mt={2} // espaço acima
              mb={2} // espaço abaixo
            />
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
                onPress={item != '' ? updateData : saveData}
                w="100%"
                startIcon={<Icon as={FontAwesome} name="save" size="sm" />}>
                {item != '' ? 'Atualizar' : 'Cadastrar'}
              </Button>
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
    backgroundColor: '#CBEDD1',
  },
});
