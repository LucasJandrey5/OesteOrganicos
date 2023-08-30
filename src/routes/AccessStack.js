import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AccessStack = createNativeStackNavigator();

export const AccessStackScreen = () => {
  return (
    <AccessStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    ></AccessStack.Navigator>
  );
};
