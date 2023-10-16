import React, { useEffect } from "react";
import { SafeAreaView, View, Text, StatusBar } from "react-native";
import HomeStyles from "../styles/HomeStyles";
import TextField from "../components/TextField";
import TaskList from "../components/TaskList";
import StreakCounter from "../components/StreakCounter";
import AddTaskButton from "../components/AddTaskButton";
import StudyButton from "../components/StudyButton";
import { auth, database } from "../firebase/FirebaseInitialize";
import { AddTaskToFirestore, GetTasks } from '../firebase/FirebaseFirestore'
import { setDoc, doc, getDoc, collection } from "firebase/firestore";

const LISTDATA = [];

let counter = 0;

const Home = () => {
  const [newTaskText, onNewTaskTextChange] = React.useState();
  const [newTaskPriority, onNewTaskPriorityChange] = React.useState();
  var [streakNum, setStreakNum] = React.useState(0);
  function IncrementStreak() {
    setStreakNum(streakNum + 1);
  }
  function AddTask() {
    let newItem = {
      taskName: newTaskText,
      taskPriority: newTaskPriority,
    };
    LISTDATA.push(newItem)
    AddTaskToFirestore(newItem.taskName, newItem.taskPriority, counter)
    counter = counter + 1;
    onNewTaskTextChange("")
    onNewTaskPriorityChange("")
  }

  async function GetFireStoreTasks() {
    const firestoreTasks = await GetTasks();
    return firestoreTasks
  }

  useEffect(() => {
    GetFireStoreTasks()
      .then((data) => {
        // Clear the array before populating it, prevents duplicate data in React.StrictMode dev state
        LISTDATA.length = 0;
        
        Object.keys(data).forEach((key) => {
          let newItem = {
            taskName: data[key].name,
            taskPriority: data[key].priority,
          };
          LISTDATA.push(newItem);
        });
        counter = Object.keys(data).length;
      });
  }, []);
  
  return (
    <SafeAreaView style={HomeStyles.container}>
      <View style={HomeStyles.header}>
        {/* <StreakCounter value={streakNum} /> */}
        <Text style={HomeStyles.headerText}>ProcrastiMate</Text>
        {/* <StudyButton incrementer={IncrementStreak} /> */}
      </View>
      <Text style={HomeStyles.tasksHeader}>Tasks:</Text>
      <View style={HomeStyles.taskWrapper}>
        <View style={HomeStyles.addTask}>
          <TextField
            type={"Task Name"}
            entryType={'default'}
            text={newTaskText}
            onChangeText={onNewTaskTextChange}
          />
          <TextField
            type={"Priority (Optional)"}
            entryType={'number-pad'}
            text={newTaskPriority}
            onChangeText={onNewTaskPriorityChange}
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
