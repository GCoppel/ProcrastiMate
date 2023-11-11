import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  useColorScheme,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import HomeStyles from "../styles/HomeStyles";
import TextField from "../components/TextField";
import TaskList from "../components/TaskList";
import StreakCounter from "../components/StreakCounter";
import AddTaskButton from "../components/AddTaskButton";
import StudyButton from "../components/StudyButton";
import { auth, database } from "../firebase/FirebaseInitialize";
import { AddTaskToFirestore, EditFirestoreTask, GetTasks } from "../firebase/FirebaseFirestore";
import { setDoc, doc, getDoc, collection } from "firebase/firestore";

const LISTDATA = [];

const Home = () => {
  const theme = useColorScheme();
  const darkColor = "#222227";
  const [isDarkMode, setIsDarkMode] = React.useState(theme === "dark");

  const [newTaskText, onNewTaskTextChange] = React.useState();
  const [newTaskPriority, onNewTaskPriorityChange] = React.useState();
  var [streakNum, setStreakNum] = React.useState(0);
  function IncrementStreak() {
    setStreakNum(streakNum + 1);
  }
  function AddTask() {
    let newItem = {
      taskName: newTaskText,
      taskPriority: !newTaskPriority ? "None" : newTaskPriority,
      taskDeadline: null,
      taskGroup: null,
      taskLocation: null,
      isDarkMode: isDarkMode,
    };
    LISTDATA.push(newItem);
    AddTaskToFirestore(newItem.taskName, newItem.taskPriority);
    onNewTaskTextChange("");
    onNewTaskPriorityChange("");
  }

  async function GetFireStoreTasks() {
    const firestoreTasks = await GetTasks();
    return firestoreTasks;
  }

  const [forceRefreshCheat, setForceRefreshCheat] = React.useState(false);
  useEffect(() => {
    // Do nothing
  }, [forceRefreshCheat]);

  useEffect(() => {
    GetFireStoreTasks().then((data) => {
      if (!data) {
        return;
      } // If user has no Tasks document, do nothing
      // Clear the array before populating it, prevents duplicate data in React.StrictMode dev state
      LISTDATA.length = 0;

      Object.keys(data).forEach((key) => {
        let newItem = {
          taskID: data[key].id,
          taskName: data[key].name,
          taskPriority: data[key].priority,
        };
        LISTDATA.push(newItem);
      });
      setForceRefreshCheat(true);
    });
  }, []);

  const [taskEnabled, toggleTaskEnabled] = React.useState(false);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [editModalTaskIndex, setEditModalTaskIndex] = React.useState(0);
  const [editModalTaskName, setEditModalTaskName] = React.useState("");
  const [editModalTaskPriority, setEditModalTaskPriority] = React.useState("");

  const editTask = (taskIndex) => {
    setEditModalTaskIndex(taskIndex);
    setEditModalTaskName(LISTDATA[taskIndex].taskName);
    if (LISTDATA[taskIndex].taskPriority != "None") {
      setEditModalTaskPriority(LISTDATA[taskIndex].taskPriority);
    }
    setEditModalVisible(true);
  };
  const saveEdit = () => {
    LISTDATA[editModalTaskIndex].taskName = editModalTaskName;
    LISTDATA[editModalTaskIndex].taskPriority = editModalTaskPriority;
    EditFirestoreTask(LISTDATA[editModalTaskIndex].taskID, LISTDATA[editModalTaskIndex].taskName, LISTDATA[editModalTaskIndex].taskPriority)
    closeEditModal();
  }
  const closeEditModal = () => {
    setEditModalVisible(false);
    setEditModalTaskName("");
    setEditModalTaskPriority("");
  };

  return (
    <SafeAreaView
      style={[
        HomeStyles.container,
        isDarkMode
          ? { backgroundColor: darkColor }
          : { backgroundColor: "white" },
      ]}
    >
      <Modal
        animationType="slide"
        visible={editModalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContentContainer}>
          <View
            style={[
              styles.modalVisiblePanel,
              { backgroundColor: isDarkMode ? "#121212" : "white" },
            ]}
          >
            <View style={styles.contentContainer}>
              <Text style={[styles.editModalTitle, {color:(isDarkMode? 'white':darkColor), borderColor:(isDarkMode? 'white':darkColor)}]}>Edit Task</Text>
              <View style={styles.editPanel}>
                <Text style={[styles.editHeader, { color: "white" }]}>
                  Task Name:
                </Text>
                <TextField
                  colorTheme={isDarkMode ? "white" : darkColor}
                  text={editModalTaskName}
                  onChangeText={setEditModalTaskName}
                  type={"Task Name"}
                  entryType={"default"}
                  characterLimit={25}
                />
              </View>
              <View style={styles.editPanel}>
                <Text style={[styles.editHeader, { color: "white" }]}>
                  Task Priority:
                </Text>
                <TextField
                  colorTheme={isDarkMode ? "white" : darkColor}
                  text={editModalTaskPriority}
                  onChangeText={setEditModalTaskPriority}
                  type={"Task Name"}
                  entryType={"number-pad"}
                  characterLimit={1}
                />
              </View>
              <TouchableOpacity onPress={saveEdit} style={[styles.saveChangesButton, {borderColor: (isDarkMode? 'white':darkColor)}]}>
                <Text style={[{color:(isDarkMode? 'white':darkColor)}]}>Save Changes</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={closeEditModal}
              style={[
                styles.editModalCancelButton,
                { borderColor: isDarkMode ? "white" : darkColor },
              ]}
            >
              <Text
                style={[
                  {
                    fontSize: 16,
                    fontWeight: "bold",
                    color: isDarkMode ? darkColor : darkColor,
                  },
                ]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={HomeStyles.header}>
        <Text
          style={[
            HomeStyles.headerText,
            isDarkMode ? { color: "white" } : { color: darkColor },
          ]}
        >
          ProcrastiMate
        </Text>
      </View>
      <Text
        style={[
          HomeStyles.tasksHeader,
          isDarkMode
            ? { color: "white", borderColor: "white" }
            : { color: darkColor, borderColor: darkColor },
        ]}
      >
        Tasks:
      </Text>
      <View style={HomeStyles.taskWrapper}>
        <View style={HomeStyles.addTask}>
          <TextField
            colorTheme={isDarkMode ? "white" : darkColor}
            type={"Task Name"}
            entryType={"default"}
            text={newTaskText}
            onChangeText={onNewTaskTextChange}
            characterLimit={25}
          />
          <TextField
            colorTheme={isDarkMode ? "white" : darkColor}
            type={"Priority (Optional)"}
            entryType={"number-pad"}
            text={newTaskPriority}
            onChangeText={onNewTaskPriorityChange}
            characterLimit={1}
          />
        </View>
        <AddTaskButton
          addTaskIconColor={isDarkMode ? "white" : darkColor}
          onPressFunc={AddTask}
          taskData={LISTDATA}
        />
      </View>
      <View style={HomeStyles.body}>
        <TaskList
          data={LISTDATA}
          colorTheme={isDarkMode ? "white" : darkColor}
          editTask={editTask}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  modalContentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalVisiblePanel: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: "75%",
    height: "50%",
    minHeight: 400,
    borderRadius: 10,
    borderColor: "darkgrey",
    borderWidth: 2,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 25,
    alignContent: 'center',
  },
  editModalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    borderBottomWidth: 3,
  },
  editHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  editPanel: {
    flexDirection: "column",
  },
  saveChangesButton: {
    marginTop: 25,
    borderWidth: 3,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
    alignSelf: 'center'
  },
  editModalCancelButton: {
    position: "absolute",
    bottom: 0,
    width: "70%",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 0,
  },
});
