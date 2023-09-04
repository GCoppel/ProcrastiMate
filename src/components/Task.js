import React from "react";
import { View, Text, TouchableHighlight } from "react-native";

import HomeStyles from "../styles/HomeStyles";

const Task = ({ item }) => {
  return (
    <View style={HomeStyles.taskItem}>
      <Text>{"Name: " + item.taskName}</Text>
      <Text>{"Priority: " + item.taskPriority}</Text>
    </View>
  );
};


export default Task;
