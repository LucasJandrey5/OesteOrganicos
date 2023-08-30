import React, { useState } from 'react';
import API from '../../../config/API';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  NativeBaseProvider,
  Box,
  Icon,
  Text,
  HStack,
  Avatar,
  VStack, 
  Spacer,
  FlatList,
  ScrollView,
  Card,
  Image,
  Button,
  Input,
  Fab,
  List,
  Divider,
  useColorMode,
  colorMode,
} from 'native-base';

  const ItensAbaPrincipal = (props) => (
    <>
      <ScrollView>
        <Card style={styles.card}>
          <Text style={styles.subtitle}>Endereço: Getúlio Vargas, 155</Text>
        </Card>

        <Box style={styles.alinhamento}>
          <ScrollView horizontal={true}>
            <Card style={styles.categoria}>
              <Card style={styles.cardSubcategorias}>
                <Button
                  style={styles.cardSubcategorias}
                  onPress={() => {
                    navigation.jumpTo('Verduras');
                    let data = data.filter((e) => e.tipo_produto_id == 6);
                    setData(data);
                  }}>
                  <Image
                    style={styles.imgSubcategoria}
                    source={require('../../assets/produto/verduras.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Verduras </Text>
            </Card>

            <Card style={styles.categoria}>
              <Card style={styles.cardSubcategorias}>
                <Button
                  style={styles.cardSubcategorias}
                  onPress={() => {
                    navigation.jumpTo('Frutas');
                    let data = data.filter((e) => e.tipo_produto_id == 7);
                    setData(data);
                  }}>
                  <Image
                    style={styles.imgSubcategoria}
                    source={require('../../assets/produto/frutas.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Frutas </Text>
            </Card>

            <Card style={styles.categoria}>
              <Card style={styles.cardSubcategorias}>
                <Button style={styles.cardSubcategorias}>
                  <Image
                    style={styles.imgSubcategoria}
                    source={require('../../assets/produto/massa.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Carboidratos </Text>
            </Card>

            <Card style={styles.categoria}>
              <Card style={styles.cardSubcategorias}>
                <Button style={styles.cardSubcategorias}>
                  <Image
                    style={styles.imgSubcategoria}
                    source={require('../../assets/produto/legumes.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Legumes </Text>
            </Card>
          </ScrollView>
        </Box>

        <Card style={styles.card}>
          <Text style={styles.titulo}>RECOMENDADOS</Text>
        </Card>
        <Box style={styles.alinhamento}>
          <ScrollView horizontal={true}>
            <Card style={styles.recomendados}>
              <Card style={styles.cardRecomendacao}>
                <Button style={styles.imgRecomendacao}>
                  <Image
                    style={styles.imgRecomendacao}
                    source={require('../../assets/produto/laranjaRecomecacao.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Laranja X </Text>
            </Card>

            <Card style={styles.recomendados}>
              <Card style={styles.cardRecomendacao}>
                <Button style={styles.imgRecomendacao}>
                  <Image
                    style={styles.imgRecomendacao}
                    source={require('../../assets/uvaRecomendacao.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Uva Y </Text>
            </Card>

            <Card style={styles.recomendados}>
              <Card style={styles.cardRecomendacao}>
                <Button style={styles.imgRecomendacao}>
                  <Image
                    style={styles.imgRecomendacao}
                    source={require('../../assets/produto/geleiaRecomendacao.jpg')}
                  />
                </Button>
              </Card>
              <Text style={styles.textoCardSub}> Geleia Z </Text>
            </Card>
          </ScrollView>
        </Box>

        <Card style={styles.card}>
          <Text style={styles.titulo}>PRODUTOS</Text>
        </Card>

        <ScrollView contentContainerStyle={{ width: '100%' }}>
        tela inicio
          <List
            divider={
              <Divider ml={16} opacity={colorMode == 'dark' ? '0.4' : '1'} />
            }
            px={3}
            // mt={12}
            py={0}
            // borderColor="red.200"
            borderWidth={0}
            borderRightWidth={0}
            w="100%">
            {data?.produtos?.map((item, index) => (
              <List.Item
                key={index}
                onPress={() => {
                  navigation.navigate('ModeloAPIForm', { item: item || null });
                  //alert('Teste ' + item.name + ' - ' + item.id);
                }}
                _hover={{ bg: 'coolGray.300' }}>
                <Box pl={['0', '4']} pr={['0', '5']} py="2">
                  <HStack space={[3, 0]} justifyContent="space-between">
                    <Avatar
                      size="58px"
                      source={{
                        uri:
                          item.imagem ||
                          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
                      }}
                    />
                    <VStack>
                      <Text
                        _dark={{
                          color: 'warmGray.50',
                        }}
                        color="coolGray.800"
                        bold>
                        {item.nome}
                      </Text>
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: 'warmGray.200',
                        }}>
                        {item.preco}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Text
                      fontSize="xs"
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color="coolGray.800"
                      alignSelf="flex-start">
                      {item.timeStamp}
                    </Text>
                  </HStack>
                </Box>
              </List.Item>
            ))}
          </List>
        </ScrollView>

        {/* LISTAGEM ARRAY
  <Card shadowRadius='0' paddingTop="-5">
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Box
          borderBottomWidth="1"
          _dark={{ 
            borderColor: 'muted.50',
          }}
          borderColor="muted.800"
          pl={['0', '4']}
          pr={['0', '5']}
          py="3">
          <HStack space={[3,0]} justifyContent="space-between">
            <Avatar
              size="58px"
              source={{
                uri: item.avatarUrl,
              }}
            />
            <VStack>
              <Text
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                bold>
                {item.nomeProdutor}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}>
                {item.descricao}
              </Text>
            </VStack>
            <Spacer />
          </HStack>
        </Box>
      )}
      keyExtractor={(item) => item.id}
    />
    </Card>
    */}
      </ScrollView>
    </>
  );

  export default ItensAbaPrincipal;