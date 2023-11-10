import React, { useEffect } from "react";
import { SafeAreaView, View, Text, useColorScheme, Appearance } from "react-native";
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

const Home = () => {
  const theme = useColorScheme();
  const darkColor = "#222227";
  const [isDarkMode, setIsDarkMode] = React.useState(theme === 'dark');

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
      taskDeadline: null,
      taskGroup: null,
      taskLocation: null
    };
    LISTDATA.push(newItem)
    AddTaskToFirestore(newItem.taskName, newItem.taskPriority)
    onNewTaskTextChange("")
    onNewTaskPriorityChange("")
  }

  async function GetFireStoreTasks() {
    const firestoreTasks = await GetTasks();
    return firestoreTasks
  }

  // useEffect(() => {
  //   GetFireStoreTasks()
  //     .then((data) => {
  //       if (!data){return} // If user has no Tasks document, do nothing
  //       // Clear the array before populating it, prevents duplicate data in React.StrictMode dev state
  //       LISTDATA.length = 0;
        
  //       Object.keys(data).forEach((key) => {
  //         let newItem = {
  //           taskName: data[key].name,
  //           taskPriority: data[key].priority,
  //         };
  //         LISTDATA.push(newItem);
  //       });
  //     });
  // }, []);

  const [taskEnabled, toggleTaskEnabled ] =  React.useState(false)
  
  return (
    <SafeAreaView style={[HomeStyles.container, isDarkMode? {backgroundColor: darkColor}:{backgroundColor: 'white'}]}>
      <View style={HomeStyles.header}>
        {/* <StreakCounter value={streakNum} /> */}
        <Text style={[HomeStyles.headerText, isDarkMode? {color: 'white'} : {color: darkColor}]}>ProcrastiMate</Text>
        {/* <StudyButton incrementer={IncrementStreak} /> */}
      </View>
      <Text style={[HomeStyles.tasksHeader, isDarkMode? {color: 'white', borderColor: 'white'}:{color: darkColor, borderColor: darkColor}]}>Tasks:</Text>
      <View style={HomeStyles.taskWrapper}>
        <View style={HomeStyles.addTask}>
          <TextField
            colorTheme={isDarkMode ? "white" : darkColor}
            type={"Task Name"}
            entryType={'default'}
            text={newTaskText}
            onChangeText={onNewTaskTextChange}
            characterLimit={25}
          />
          <TextField
            colorTheme={isDarkMode ? "white" : darkColor}
            type={"Priority (Optional)"}
            entryType={'number-pad'}
            text={newTaskPriority}
            onChangeText={onNewTaskPriorityChange}
            characterLimit={1}
          />
        </View>
        <AddTaskButton addTaskIconColor={isDarkMode? 'white':darkColor} onPressFunc={AddTask} taskData={LISTDATA} />
      </View>
      <View style={HomeStyles.body}>
        <TaskList data={LISTDATA} colorTheme={isDarkMode? 'white':darkColor} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
