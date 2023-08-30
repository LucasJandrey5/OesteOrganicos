import React, { useState } from 'react';
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
  Select,
  CheckIcon,
  NativeBaseProvider,
  Image,
} from 'native-base';
import { SelectList } from 'react-native-dropdown-select-list';
import { StyleSheet } from 'react-native';
import API from '../../../config/API';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
//import { IMaskInput } from 'react-imask';


//VÃO VIR DA ROTA:
//produtor_id
//comercio_id
//produto_id
export default function EstoqueList({ navigation, route }) {
  const { item, produtorObj } = route?.params;
  console.log(item);

  React.useEffect(() => {
    if (route.params?.item) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      // const { item } = route.params ;
      console.log(route.params?.item2);
    }
    // }, [route.params?.item]);
  });

  const [produto, setProduto] = useState({
    id: item.id || '',
    codigo: item.codigo || '',
    quantidade: item.quantidade || '',
    disponivel_venda: item.disponivel_venda || '',
    data_inicio: item.data_inicio || '',
    data_fim: item.data_fim || '',
  });

  const [loading, setLoading] = useState(false);
  const [unidadeMedida, setUnidadeMedida] = useState([]);
  const [tipoProduto, setTipoProduto] = useState([]);

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

      // componente combobox = select
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
      navigation.push('ProdutosProdutor', { item: produtorObj });
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async () => {
    try {
      setProduto({ id: item.id });

      var response = await API.call(
        'produto/' + item.id, // nome da url + id
        produto, // objeto
        'PUT' // method
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    navigation.push('ProdutoList');
  };

  const deleteData = async () => {
    try {
      setProduto({ id: produto.id });

      var response = await API.call(
        'produto/' + item.id, // nome da url + id
        produto, // objeto
        'DELETE' // method
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    navigation.push('ProdutoList');
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
                <FormControl.Label>Nome</FormControl.Label>
                <Input
                  style={styles.itemFormulario}
                  value={produto.codigo}
                  onChangeText={(value) =>
                    setProduto({ ...produto, nome: value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormControl.Label>Quantidade</FormControl.Label>
                <Input
                  style={styles.itemFormulario}
                  value={produto.quantidade}
                  onChangeText={(value) =>
                    setProduto({ ...produto, nome: value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormControl.Label>Disponivel venda</FormControl.Label>
                <Input
                  style={styles.itemFormulario}
                  value={produto.disponivel_venda}
                  onChangeText={(value) =>
                    setProduto({ ...produto, nome: value })
                  }
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl>
                <FormControl.Label>Data inicio</FormControl.Label>
                <Input
                  style={styles.itemFormulario}
                  value={produto.data_inicio}
                  onChangeText={(value) =>
                    setProduto({ ...produto, nome: value })
                  }
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl>
                <FormControl.Label>Data fim</FormControl.Label>
                <Input
                  //mask="00/00/0000"
                  style={styles.itemFormulario}
                  value={produto.data_fim}
                  onChangeText={(value) =>
                    setProduto({ ...produto, nome: value })
                  }
                />
              </FormControl>
            </Box>

            
            <Divider />

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
                startIcon={<Icon as={FontAwesome} name="save" size="sm" />}>
                {item == '' ? 'Salvar' : 'Atualizar'}
              </Button>

              <Button
                style={styles.botao}
                variant="subtle"
                onPress={() => navigation.navigate('ProdutoList')}
                startIcon={
                  <Icon as={FontAwesome} name="arrow-left" size="sm" />
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
  itemFormulario: {
    backgroundColor: '#CBEDD1',
  },
  botao: {
    backgroundColor: '#CBEDD1',
    //width: '30%',
  },
});
