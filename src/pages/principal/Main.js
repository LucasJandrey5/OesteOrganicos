import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeBaseProvider, Box, Button, Icon, Fab } from 'native-base';

// You can import from local files

export default function Main({ navigation }) {
  return (
    <Box>
      <Button
        onPress={() => {
          navigation.navigate('ProdutorForm', { item: '' });
          //alert(item.id);
        }}>
        Teste
      </Button>
      <Button onPress={() => console.log('hello world')}>Click Me</Button>
    </Box>
  );
}
