//import { StatusBar } from "expo-status-bar";
import { StyleSheet, StatusBar, useColorScheme } from "react-native";
import React from 'react'

import Login from "./src/screens/Login";
import Navigator from "./src/Navigator";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Session from "./src/screens/Session";

const Stack = createNativeStackNavigator();

export default function App() {
  const theme = useColorScheme();
  StatusBar.setBarStyle(theme === "light" ? 'dark-content':'light-content')
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Navigator"
            component={Navigator}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Session"
            component={Session}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
