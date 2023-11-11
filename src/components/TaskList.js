import React, {useState} from "react";
import { SafeAreaView, Text, FlatList, ScrollView } from "react-native";

import Task from "./Task";

import HomeStyles from "../styles/HomeStyles";

const TaskList = (props) => {
  const renderTask = ({ item }) => {
    return <Task taskName={item.taskName} taskPriority={item.taskPriority} colorTheme={props.colorTheme} />;
  };
  return (
    <SafeAreaView >
      <FlatList
        style={HomeStyles.taskList}
        data={props.data}
        renderItem={renderTask}
        ListEmptyComponent={<Empty colorTheme={props.colorTheme}/>}
        keyExtractor={(item) => item.taskName}
        extraData={props.addTaskFunc}
      />
    </SafeAreaView>
  );
};

const Empty = (props) => {
  return <Text style={[HomeStyles.emptyTaskList, {color: props.colorTheme}]}>You don't have any tasks right now!</Text>;
};

export default TaskList;
