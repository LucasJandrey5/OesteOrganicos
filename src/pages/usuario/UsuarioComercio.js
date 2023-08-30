import React, { useState, useEffect,useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect } from "@react-navigation/native";
import { Dimensions } from 'react-native';
import API from '../../../config/API';

import {
  Icon,
  Button,
  Box,
  Container,
  Image,
  NativeBaseProvider,
  Text,
  HStack,
  VStack,
} from 'native-base';

export default function UsuarioComercio({ navigation, route }) {
  const { item } = route.params;
  console.log(item);

  const img = require('../../assets/sem_imagem.jpg');

  const checkParamImg = () => {
    try {
      if (comercio.length === 0 || comercio.imagem == null) {
        //console.log('img');
        return img;
      } else if (comercio.imagem.includes('https')) {
        console.log('Palavra "https" encontrada na URL');
        return { uri: comercio.imagem };
      } else {
        return { uri: API.urlFile() + comercio.imagem };
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [imagemForm, setImagemForm] = useState('');

  const loadData = async () => {
    try {
      // componente combobox = select
      const responseUM = await API.call('comercio/' + comercio.id);
      setComercio(responseUM.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const data = navigation.addListener('focus', () => {
      // do something
      loadData();
      setImagemForm(checkParamImg());
    });

    return data;
  }, [navigation]);
  const [comercio, setComercio] = useState({
    id: item.id || '',
    nome: item.nome || 'TESTE NOME',
    cnpj: item.cnpj || "",
    tipo: item.tipo || '',
    municipio_id: item.municipio_id || '',
    usuario_id: item.usuario_id || '',
    telefone1: item.telefone1 || '',
    telefone2: item.telefone2 || '',
    email: item.email || '',
    link: item.link || '',
    site: item.site || '',
    agendamento: item.agendamento || false,
    acessibilidade: item.acessibilidade || false,
    certificacao: item.certificacao || false,
    data_nascimento: item.data_nascimento || '',
    imagem:item.imagem||""
  });

  useFocusEffect(
      useCallback(() => {
        if (item) {
          setComercio({
            id: item?.id || '',
            nome: item?.nome || 'TESTE NOME',
            cnpj: item?.cnpj || "",
            tipo: item?.tipo || '',
            municipio_id: item?.municipio_id || '',
            usuario_id: item?.usuario_id || '',
            telefone1: item?.telefone1 || '',
            telefone2: item?.telefone2 || '',
            email: item?.email || '',
            link: item?.link || '',
            site: item?.site || '',
            agendamento: item?.agendamento || false,
            acessibilidade: item?.acessibilidade || false,
            certificacao: item?.certificacao || false,
            data_nascimento: item?.data_nascimento || '',
            imagem: checkParamImg(),
          });
        }
      }, [item])
  );


  return (
      <NativeBaseProvider>
        <Container>
          <Box style={styles.buttonGroup}>
            <Box style={[styles.buttonUser, styles.transparentButton]}>
              <Image
                  style={styles.imgUsuario}
                  source={imagemForm}
                  // source={{
                  //   uri:
                  //     comercio.imagem !== null && comercio.imagem.includes('https')
                  //       ? comercio.imagem
                  //       : comercio.imagem !== null
                  //       ? API.urlFile() + comercio.imagem
                  //       : img,
                  // }}
              />
              <Box>
                <Text style={styles.tituloUser}>{comercio.nome}</Text>
                <Text style={styles.descricaoUser}>Gerencie seu perfil</Text>
              </Box>
            </Box>
            <Box style={styles.separator} />
            <Button
                style={[styles.button, styles.transparentButton]}
                onPress={() =>
                    navigation.push('ComercioForm', {
                      item: comercio,
                    })
                }>
              <Text style={styles.titulo}>Alterar dados</Text>
              <Text style={styles.descricao}>Altere suas informações</Text>
            </Button>

            <Box style={styles.separator} />
            <Button
                style={[styles.button, styles.transparentButton]}
                onPress={() =>
                    navigation.navigate('ComercioEnderecoList', { item: comercio })
                }>
              <Text style={styles.titulo}>Endereço</Text>
              <Text style={styles.descricao}>Gerencie seus endereços</Text>
            </Button>
            <Box style={styles.separator} />
            <Button style={[styles.button, styles.transparentButton]}>
              <Text style={styles.titulo}>Avaliações</Text>
              <Text style={styles.descricao}>Visualize suas avaliações</Text>
            </Button>
          </Box>
        </Container>
      </NativeBaseProvider>
  );
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  buttonGroup: {
    marginTop: 20,
    backgroundColor: '#fff',
    marginLeft: 0,
    marginRight: 0,
    //borderRadius: 5,
    //overflow: 'hidden',
  },
  separator: {
    height: 2,
    backgroundColor: '#cccc',
  },
  buttonUser: {
    height: 90,
    width: width * 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    height: 70,
    width: width * 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  transparentButton: {
    backgroundColor: 'transparent',
  },
  descricaoUser: {
    fontSize: 13,
    color: '#666',
    marginTop: 5,
  },
  descricao: {
    fontSize: 13,
    color: '#666',
    marginTop: 5,
  },
  tituloUser: {
    fontSize: 17,
    marginTop: -55,
  },

  titulo: {
    fontSize: 17,
  },
  imgUsuario: {
    height: 60,
    width: 60,
    borderRadius: 20,
    //alignContent:  'left',
    marginLeft: -250,
    marginTop: 15,
    //position: 'absolute',
  },
});
