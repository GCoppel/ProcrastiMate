import React from "react";
import { SafeAreaView, View, Text, StatusBar } from "react-native";
import HomeStyles from "../styles/HomeStyles";
import TextField from "../components/TextField";
import TaskList from "../components/TaskList";
import ProgressWidget from "../components/ProgressWidget";
import StreakCounter from "../components/StreakCounter";
import AddTaskButton from "../components/AddTaskButton";
import StudyButton from "../components/StudyButton";
import { auth, username, database } from "../firebase/FirebaseAuthenticator";
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
    ToFireStore(newItem)
    onNewTaskTextChange("")
    onNewTaskPriorityChange("")
  }

  async function ToFireStore(Message){
    const msgID = "msg_"+counter
    await setDoc(doc(database, auth.currentUser.uid, "Todos"), {
      [msgID]: {
        name: Message.taskName,
        priority: Message.taskPriority
      }
    }, {merge: true})
    counter = counter + 1;
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
