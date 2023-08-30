import { createNativeStackNavigator } from "@react-navigation/native-stack";

const SearchStack = createNativeStackNavigator();

export const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator
      initialRouteName="BuscaPorProdutorItem"
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "green" },
      }}
    ></SearchStack.Navigator>
  );
};
