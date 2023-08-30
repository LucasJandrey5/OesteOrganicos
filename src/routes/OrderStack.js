import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PedidosHistorico from "../pages/pedido/PedidosHistorico";
import DadoPedido from "../pages/pedido/DadoPedido";

const OrderStack = createNativeStackNavigator();

export const OrderStackScreen = () => {
  return (
    <OrderStack.Navigator
      initialRouteName="PedidosHistorico"
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "green" },
      }}
    >
      <OrderStack.Screen
        name="Pedidos"
        component={PedidosHistorico}
        options={{ title: "Historico de Pedidos" }}
      />
      <OrderStack.Screen
        name="DadoPedido"
        component={DadoPedido}
        options={{ title: "Dados do Pedido" }}
      />
    </OrderStack.Navigator>
  );
};
