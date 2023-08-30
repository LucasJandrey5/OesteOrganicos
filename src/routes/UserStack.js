import { createNativeStackNavigator } from "@react-navigation/native-stack";

const UserStack = createNativeStackNavigator();

export const UserStackScreen = () => {
  return <UserStack.Navigator></UserStack.Navigator>;
};
