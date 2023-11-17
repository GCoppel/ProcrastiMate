import React, { useState } from "react";
import { SafeAreaView, Text, FlatList, ScrollView, Modal } from "react-native";

import Task from "./Task";

import HomeStyles from "../styles/HomeStyles";

const TaskList = (props) => {
  const renderTask = ({ item, index }) => {
    return (
        <Task
          taskName={item.taskName}
          taskPriority={item.taskPriority}
          colorTheme={props.colorTheme}
          editTask={props.editTask}
          taskKey={index}
          completed={item.taskCompleted}
          toggleCompleted={props.setTaskCompleted}
        />
    );
  };
  return (
    <SafeAreaView>
      <FlatList
        style={HomeStyles.taskList}
        data={props.data}
        renderItem={renderTask}
        ListEmptyComponent={<Empty colorTheme={props.colorTheme} />}
        keyExtractor={(item) => item.taskName}
        extraData={props.addTaskFunc}
      />
    </SafeAreaView>
  );
};

const Empty = (props) => {
  return (
    <Text style={[HomeStyles.emptyTaskList, { color: props.colorTheme }]}>
      You don't have any tasks right now!
    </Text>
  );
};

export default TaskList;
