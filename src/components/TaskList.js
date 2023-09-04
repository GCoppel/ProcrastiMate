import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import Task from "./Task";

import HomeStyles from "../styles/HomeStyles";

const TaskList = (props) => {
  return (
    <View>
      <FlatList
        style={HomeStyles.taskList}
        data={props.data}
        renderItem={Task}
        ListEmptyComponent={<Empty />}
        keyExtractor={(item) => item.taskName}
        extraData={props.addTaskFunc}
      />
    </View>
  );
};

const Empty = () => {
  return <Text style={HomeStyles.emptyTaskList}>You don't have any tasks right now!</Text>;
};

export default TaskList;
