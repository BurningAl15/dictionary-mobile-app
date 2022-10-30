import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../screens/SearchScreen";
import MeaningScreen from "../screens/MeaningScreen";
import { Icon, View, Text } from "react-native";

const Stack = createNativeStackNavigator();

function Meaning() {
  return (
    <View>
      <Text>Meaning</Text>
    </View>
  );
}

export default function CustomNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Busqueda",
          headerTransparent: true,
          headerTranslucent: true,
          headerHideShadow: true,
        }}
      />
      <Stack.Screen
        name="Meaning"
        component={MeaningScreen}
        options={({ navigation, route }) => ({
          title: "Significados",
          headerBackTitle: "Go Back to Search",
          headerTransparent: true,
          headerTranslucent: true,
          headerHideShadow: true,
          // headerRight: () => null,
          // headerLeft: () => (
          //   <Icon
          //     name="arrow-left"
          //     color="#fff"
          //     size={20}
          //     style={{ marginLeft: 20 }}
          //     onPress={navigation.goBack}
          //   />
          // ),
        })}
      />
    </Stack.Navigator>
  );
}
