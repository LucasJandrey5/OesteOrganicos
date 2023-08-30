import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, Dimensions, StatusBar, Animated, Pressable} from 'react-native';
import { WebView } from 'react-native-webview'; // Importando a WebView
import {
  Box,
  Icon,
  Text,
  Input,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Fab,
  List,
  Divider,
  useColorMode,
  ScrollView,
} from 'native-base';

// Função para exibir o mapa dos produtores
const MapaComercios = () => {
  const mapUrl = 'http://organicossc.com.br/Mapa-Organicos/Mapa-Chape.html';
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: mapUrl }}
        style={styles.map}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
};

export default function Mapa() {
  return (
    <MapaComercios />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
