import React, { useState } from 'react';
import API from '../../../config/API';
import { NativeBaseProvider, FormControl, Input, Stack, WarningOutlineIcon, Box, Center, Avatar, HStack, Button, Image, View, Checkbox, Text, Select, CheckIcon, Icon, FontAwesome, ScrollView, useToast,} from "native-base";
import AlertMsg from '../../components/AlertMsg';
'../../components/AlertMsg'
export default function TelaCadastroUsuario({ navigation }) {
  const [user, setUser] = useState({ // isso tá certo - MUDAR O FORMULARIO
    name: 'Airton', //adicionar um input com o nome na página
    email: 'airton432@admin.com', //o login é o gmail
    email_verified_at: '1999-12-31 23:59:59',
    password: 'd7483heiw7jud73',
    c_password: 'd7483heiw7jud73',
    //api_token: "",
    //remember_token: "",
  });
  const [loading, setLoading] = useState(false);

  const saveData = async () => {
    setLoading(true);
    try {
      var response = await API.call(
        'register', // nome da url
        user, // objeto
        'POST' // method
      );
      console.log(response);

      if (response.success) {
        navigation.push('TelaPrincipalFiltro',{item:''});
      }
      toast.show({
        render: () => {
          return (
            <AlertMsg
              status="success"
              msg={{ titulo: 'Registro Salvo com sucesso!' }}
            />
          );
        },
      });

    } catch (error) {
      //setUser(user);
      console.error(error);
      let msg = await API.errorCall(error);
      toast.show({
        render: () => {
          return <AlertMsg status="error" msg={msg} />;
        },
      });
    }

    setLoading(false);
  };

  return (
  <>
  <ScrollView>
    <NativeBaseProvider>
      <Center flex={1} px="3" backgroundColor='#CBEDD1'>
        <Box alignItems="center">
    <View maxWidth="80px">
        <Image  maxHeight='80px' source={require('../../assets/simboloIF.jpg')}
      /> 
    </View>

      <Box w="100%" maxWidth="300px">
        <FormControl isRequired>
          <Stack mx="4">
            
            {/*<FormControl isRequired isInvalid>
              <Select marginTop='10px' backgroundColor='white'  accessibilityLabel="Tipo de cadastro" placeholder="Choose Service" _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />
            }} mt="1">
                <Select.Item label="Usuário" value="web" />
                <Select.Item label="Produtor" value="web" />
              </Select>
            </FormControl>*/}

            <Input type="text"  placeholder="Nome" marginTop='10px' backgroundColor='white' 
              name="nome"
              value={user.name}
              onChangeText={(value) => setUser({ ...user, name: value })}
            />
            <Input type="user" placeholder="Login" marginTop='10px' backgroundColor='white' 
              name="email"
              value={user.email}
              onChangeText={(value) => setUser({ ...user, email: value })}
            />
            <Input type="password" marginTop='10px' backgroundColor='white' 
              name="password"
              value={user.password}
              onChangeText={(value) =>
                setUser({ ...user, password: value })
              }
              placeholder="******"
            />
            <Input type="password" marginTop='10px' backgroundColor='white' 
              name="c_password"
              value={user.c_password}
              onChangeText={(value) =>
                setUser({ ...user, c_password: value })
              }
              placeholder="******"
            />

            <Box alignItems="center">
              <Button marginTop='10px' backgroundColor='white' variant="subtle" 
                onPress={saveData}>
                <Text colorScheme='dark'>Salvar</Text>
              </Button>
            </Box>

            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Atleast 6 characters are required.
            </FormControl.ErrorMessage>
          </Stack> 
        </FormControl>
      </Box>
    </Box>

            </Center>
    </NativeBaseProvider>
    </ScrollView>
  </>
  );
}