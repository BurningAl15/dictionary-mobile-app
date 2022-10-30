import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SearchScreen from "./src/screens/SearchScreen";
import { NavigationContainer } from "@react-navigation/native";
import CustomNavigator from "./src/navigation/CustomNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <CustomNavigator />
    </NavigationContainer>
  );
}
