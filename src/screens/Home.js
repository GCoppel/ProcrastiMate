import React from "react";
import { SafeAreaView, View, Text, StatusBar } from "react-native";

import HomeStyles from "../styles/HomeStyles";

import { MaterialIcons } from "@expo/vector-icons";
import TextField from "../components/TextField";
import TaskList from "../components/TaskList";
import ProgressWidget from "../components/ProgressWidget";
import StreakCounter from "../components/StreakCounter";
import AddTaskButton from "../components/AddTaskButton";
import StudyButton from "../components/StudyButton";

const LISTDATA = [];

const Home = () => {
  const [newTaskText, onNewTaskTextChange] = React.useState();
  var [streakNum, setStreakNum] = React.useState(0);
  function IncrementStreak() {
    setStreakNum(streakNum + 1);
  }
  function AddTask() {
    console.log(newTaskText);
    let newItem = {
      taskName: newTaskText,
      taskPriority: 1,
    };
    LISTDATA.push(newItem);
    onNewTaskTextChange("")
  }
  return (
    <SafeAreaView style={HomeStyles.container}>
      <View style={HomeStyles.header}>
        <StreakCounter value={streakNum} />
        <ProgressWidget />
        <StudyButton incrementer={IncrementStreak} />
      </View>
      <Text style={HomeStyles.tasksHeader}>Tasks:</Text>
      <View style={HomeStyles.taskWrapper}>
        <View style={HomeStyles.addTask}>
          <TextField
            type={"Task Name"}
            addTaskFunc={AddTask}
            text={newTaskText}
            onChangeText={onNewTaskTextChange}
          />
        </View>
        <AddTaskButton onPressFunc={AddTask} taskData={LISTDATA} />
      </View>
      <View style={HomeStyles.body}>
        <TaskList data={LISTDATA} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
