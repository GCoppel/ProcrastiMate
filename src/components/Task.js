import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

import HomeStyles from "../styles/HomeStyles";
import ToggleItem from "./ToggleItem";

const Task = ({ item }) => {
  return (
    <View style={HomeStyles.taskItem}>
      <ToggleItem isChecked={true} setChecked={null} disabled={false} />
      <View>
        <Text>{"Name: " + item.taskName}</Text>
        <Text>{"Priority: " + item.taskPriority}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskWrapper: {
    flexDirection: "row",
  }
})


export default Task;
