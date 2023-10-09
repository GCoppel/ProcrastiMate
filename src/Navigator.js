import React from "react";
import {} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Feather } from "@expo/vector-icons";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Study from "./screens/Study";

const Navigator = () => {
  const TabBar = createBottomTabNavigator();
  return (
    <TabBar.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarHideOnKeyboard: true,
        tabBarLabelPosition: 'below-icon',
        tabBarItemStyle: { paddingVertical: 5 },
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 12 },
        tabBarStyle: { height: "7%" },
      }}
    >
      <TabBar.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ tintColor, size }) => <Feather name="home" size={21} />,
        }}
        name="Home"
        component={Home}
      />
      <TabBar.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ tintColor, size }) => <Feather name="book" size={21} />,
        }}
        name="Study"
        component={Study}
      />
      <TabBar.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ tintColor, size }) => (
            <Feather name="settings" size={21} />
          ),
        }}
        name="Settings"
        component={Settings}
      />
    </TabBar.Navigator>
  );
};

export default Navigator;
