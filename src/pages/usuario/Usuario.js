import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  Button,
  Text,
  Icon,
  Container,
  Content,
  Image,
  Box,
  NativeBaseProvider,
   useToast,
} from 'native-base';
import { Dimensions } from 'react-native';
import API from '../../../config/API';

export default function Usuario({ navigation }) {
  const [usuario, setUsuario] = useState([]);

  const loadData = async () => {
    try {
      // componente combobox = select
      const responseUM = await API.call('usuario/1');

      setUsuario(responseUM.data);
      console.log('loadData');
      console.log(responseUM.data);
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    loadData();
  });

  return (
    <NativeBaseProvider>
      <Container>
        <Box style={styles.buttonGroup}>
          <Box style={[styles.buttonUser, styles.transparentButton]}>
            <Image
              style={styles.imgUsuario}
              source={{uri:usuario.imagem}}
            />
            <Box>
              <Text style={styles.tituloUser}>{usuario.name}</Text>
              <Text style={styles.descricaoUser}>Gerencie seu perfil</Text>
            </Box>
          </Box>
          <Box style={styles.separator} />
          <Button
            style={[styles.button, styles.transparentButton]}
            onPress={() =>
              navigation.navigate('AlteraPerfilUsuario', {
                item: usuario,
              })
            }>
            <Text style={styles.titulo}>Alterar dados</Text>
            <Text style={styles.descricao}>Altere suas informações</Text>
          </Button>
          <Box style={styles.separator} />
          <Button style={[styles.button, styles.transparentButton]}
          onPress={() =>
              navigation.navigate('EnderecoListagem', {
                item: usuario,
              })
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
