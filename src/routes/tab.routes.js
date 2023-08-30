import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

import { HomeStackScreen } from "./HomeStack";
import { SearchStackScreen } from "./SearchStack";
import { OrderStackScreen } from "./OrderStack";
import { UserStackScreen } from "./UserStack";
import { AccessStackScreen } from "./AccessStack";

const Tab = createBottomTabNavigator();
export const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="inicio"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="buscar"
        component={SearchStackScreen}
        options={{
          tabBarLabel: "Buscar",
          tabBarIcon: ({ color }) => (
            <Icon name="search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="pedidos"
        component={OrderStackScreen}
        options={{
          tabBarLabel: "Historico Pedidos",
          tabBarIcon: ({ color }) => (
            <Icon name="shopping-basket" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="login"
        component={AccessStackScreen}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="usuario"
        component={UserStackScreen}
        options={{
          tabBarLabel: "Usuário",
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
