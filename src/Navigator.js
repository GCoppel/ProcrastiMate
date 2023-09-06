import React from "react";
import {} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Settings from "./screens/Settings";

const Navigator = () => {
  const TabBar = createBottomTabNavigator();
  return (
    <TabBar.Navigator>
      <TabBar.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
            <TabBar.Screen
        options={{ headerShown: false }}
        name="Study"
        component={Home}
      />
            <TabBar.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={Settings}
      />
    </TabBar.Navigator>
  );
};

export default Navigator;
