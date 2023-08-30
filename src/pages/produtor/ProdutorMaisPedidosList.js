{/*Não está sendo implementada ainda pois precisa de uma base dos usuários */}
import React, { useState } from "react";
import API from '../../../config/API';

import {
  Box,
  Text,
  HStack,
  Avatar,
  VStack,
  Spacer,
  List,
  Divider,
  ScrollView,
  useColorMode,
} from "native-base";

const ProdutorMaisPedidosList = ({ navigation }) => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const response = await API.call("produtor");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    loadData();
  });

  const { colorMode } = useColorMode();

  return (
    <>
      <ScrollView contentContainerStyle={{ width: "100%" }}>
        <List
          divider={
            <Divider ml={16} opacity={colorMode == "dark" ? "0.4" : "1"} />
          }
          px={3}
          py={0}
          borderWidth={0}
          borderRightWidth={0}
          w="100%"
        >
          {data?.map((item, index) => (
            <List.Item
              key={index}
              onPress={() => {
                navigation.navigate("ProdutosProdutor", { item: item || null });
              }}
              _hover={{ bg: "coolGray.300" }}
            >
              <Box pl={["0", "4"]} pr={["0", "5"]} py="2">
                <HStack space={[3, 0]} justifyContent="space-between">
                  <Avatar
                    size="58px"
                    source={{
                      uri: "https://media.istockphoto.com/id/1156406125/pt/vetorial/user-green-icon-avatar-vector.jpg?s=170667a&w=0&k=20&c=tFRJyvbOVeVmO2sV87VOMdIanPASdciVlt3xpBBqScU=",
                    }}
                  />
                  <VStack>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {item.nome}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.cpf}
                    </Text>
                  </VStack>
                  <Spacer />
                </HStack>
              </Box>
            </List.Item>
          ))}
        </List>
      </ScrollView>
    </>
  );
};

export default ProdutorMaisPedidosList;
