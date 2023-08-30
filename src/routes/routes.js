import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { StackScreen } from "./stack.routes";

import { TabNavigator } from "./tab.routes";

import { RequireAuth } from "../contexts/RequireAuth";
import { AuthProvider } from "../contexts/AuthProvider";

HomeStackScreen();

SearchStackScreen();

UserStackScreen();

OrderStackScreen();

AccessStackScreen();

export default function Routes() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RequireAuth test={true}>
          <StackScreen />
        </RequireAuth>
      </AuthProvider>
    </NavigationContainer>
  );
}
