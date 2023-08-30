import React, { useState, useEffect ,useCallback} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
} from 'react-native';
import API from '../../../config/API';
import * as ImagePicker from 'expo-image-picker';
import AlertMsg from '../../components/AlertMsg';

import {
 
  Button,
  Icon,
  Text,
  Input,
  ScrollView,
  NativeBaseProvider,
  Center,
  Stack,
  FormControl,
  Box,
  Image,
  Flex,
  Pressable,
  useToast
} from 'native-base';

export default function AlteraDados({ route, navigation }) {
  const toast = useToast();  
  const { item } = route.params;

  const img = require('../../assets/usuario/imagemUsuario.png');

  const checkParamImg = () => {
    if (item.length === 0 || item.imagem == null) {
      //console.log('img');
      return img;
    } else if (item.imagem !== null && item.imagem.includes('https')) {
      // console.log('Palavra "https" encontrada na URL');
      return item.imagem;
    } else {
      return API.urlFile() + item.imagem;
    }
  };
  
  console.log(item);
  const [usuario, setUsuario] = useState({
    id: 1,
    name:"",
    email:"",
    password: '',
    chave_pix: '',
    cpf:"",
    api_token:"",
    imagem: '',
  });

   useFocusEffect(
    useCallback(() => {
      if (item) {
        setUsuario({
          id: item?.id || '',
          name: item?.name || '',
          email: item?.email || '',
          password: item?.unidade_medida_id || '',
          chave_pix: item?.chave_pix || '',
          cpf: item?.cpf || '',
          api_token: item?.api_token || '',
          imagem: checkParamImg(),
        });
        console.log(item);
      }
    }, [item])
  );

 const [imagemForm, setImagemForm] = useState(checkParamImg());

  const saveData = async () => {
    try {
      console.log('O q ta trazendo');
      console.log(usuario)
      setUsuario({id:item.id});
      var response = await API.call(
        'usuario/' + item.id, // nome da url
        usuario, // objeto
        'POST' // method
      );
      console.log('o q volta do response')
      console.log(response)
      navigation.push('Usuario')
       
    } catch (error) {
     setUsuario(usuario);
      console.error(error);
      let msg = await API.errorCall(error);
      toast.show({
        render: () => {
          return <AlertMsg error={msg} />;
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
      setUsuario({
        ...usuario,
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
             
            <FormControl>
              <Text style={styles.titulo}>Nome de Usuário</Text>
              <Input
                style={styles.input}
                placeholder="nome do usuario"
                value={usuario.name}
                onChangeText={(value) =>
                  setUsuario({ ...usuario, name: value })
                }
              />
            </FormControl>

            <FormControl>
              <Text style={styles.titulo}>E-mail</Text>
              <Input
                style={styles.input}
                placeholder="email"
                value={usuario.email}
                onChangeText={(value) =>
                  setUsuario({ ...usuario, email: value })
                }
              />
            </FormControl>
                 <FormControl>
              <Text style={styles.titulo}>Pix</Text>
              <Input
                style={styles.input}
                placeholder="Pix"
                value={usuario.chave_pix}
                onChangeText={(value) =>
                  setUsuario({ ...usuario, chave_pix: value })
                }
              />
            </FormControl>
              <FormControl>
              <Text style={styles.titulo}>api Token</Text>
              <Input
                style={styles.input}
                placeholder=""
                value={usuario.api_token}
                onChangeText={(value) => setUsuario({ ...usuario, api_token: value })}
              />
            </FormControl>

          

            <FormControl>
              <Text style={styles.titulo}>CPF</Text>
              <Input
                style={styles.input}
                placeholder=" cpf 000.000.000-00"
                value={usuario.cpf}
                onChangeText={(value) => setUsuario({ ...usuario, cpf: value })}
              />
            </FormControl>

            <FormControl>
              <Text style={styles.titulo}>Senha</Text>
              <Input
                style={styles.input}
                placeholder="senha"
                value={usuario.password}
                onChangeText={(value) =>
                  setUsuario({ ...usuario, password: value })
                }
              />
            </FormControl>

            <FormControl>
              <Text style={styles.titulo}>Confirmar a Senha </Text>
              <Input
                style={styles.input}
                placeholder="confirmar senha"
                value={usuario.password_confirmation}
                onChangeText={(value) =>
                  setUsuario({ ...usuario, password_confirmation: value })
                }
              />
            </FormControl>

            <Button
              style={styles.button}
              variant="subtle"
              onPress={saveData /*item == '' ? updateData : saveData*/}
              startIcon={<Icon as={FontAwesome} name="save" size="sm" />}>
              {item == '' ? 'Salvar' : 'Atualizar'}
            </Button>
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