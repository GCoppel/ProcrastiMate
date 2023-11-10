import React, { useEffect } from "react";
import { useColorScheme, Appearance } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Feather } from "@expo/vector-icons";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Study from "./screens/Study";
import Session from "./screens/Session";

const Navigator = () => {
  const TabBar = createBottomTabNavigator();

  const theme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = React.useState(theme === "dark");

  return (
    <TabBar.Navigator
      screenOptions={{
        tabBarActiveTintColor: isDarkMode? 'white':'black',
        tabBarHideOnKeyboard: true,
        tabBarLabelPosition: "below-icon",
        tabBarItemStyle: { paddingVertical: 5 },
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 12 },
        tabBarStyle: [
          { height: "7%"},
          isDarkMode
            ? { backgroundColor: "#121212", tintColor: 'white' }
            : { backgroundColor: "white", tintColor: 'white' },
        ],
      }}
    >
      <TabBar.Screen
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ tintColor, size }) => (
            <Feather name="home" size={21} style={isDarkMode? {color: 'darkgrey'}:{color:'black'}}/>
          ),
        }}
        name="Home"
        component={Home}
      />
      <TabBar.Screen
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ tintColor, size }) => (
            <Feather name="book" size={21} style={isDarkMode? {color: 'darkgrey'}:{color:'black'}} />
          ),
        }}
        name="Study"
        component={Study}
      />
      <TabBar.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ tintColor, size }) => (
            <Feather name="settings" size={21} style={isDarkMode? {color: 'darkgrey'}:{color:'black'}} />
          ),
        }}
        name="Settings"
        component={Settings}
      />
    </TabBar.Navigator>
  );
};

export default Navigator;
