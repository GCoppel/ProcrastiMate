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
import {
  AddTaskToFirestore,
  DeleteFirestoreTask,
  EditFirestoreTask,
  GetTasks,
  MarkFirestoreTaskComplete,
} from "../firebase/FirebaseFirestore";
import { setDoc, doc, getDoc, collection } from "firebase/firestore";
import { ScrollView } from "react-native";

const LISTDATA = [];

const Home = () => {
  const theme = useColorScheme();
  const darkColor = "#222227";
  const [isDarkMode, setIsDarkMode] = React.useState(theme === "dark");

  const [newTaskText, onNewTaskTextChange] = React.useState();
  const [newTaskPriority, onNewTaskPriorityChange] = React.useState();

  const [sortMode, setSortMode] = React.useState("highestPriority");

  function AddTask() {
    let newItem = {
      taskID: Date.now(),
      taskName: newTaskText,
      taskPriority: !newTaskPriority ? "None" : newTaskPriority,
      taskCompleted: false,
      taskDeadline: "None",
      taskGroup: "None",
      taskLocation: "None",
      isDarkMode: isDarkMode,
      collapsed: true
    };
    LISTDATA.push(newItem);
    AddTaskToFirestore(newItem.taskID, newItem.taskName, newItem.taskPriority, newItem.taskDeadline, newItem.taskLocation, newItem.taskGroup, newItem.taskCompleted);
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

  function compareTasks(a, b) {
    if (a.taskPriority > b.taskPriority) {
      return 1;
    }
    if (a.taskPriority < b.taskPriority) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    GetFireStoreTasks().then((data) => {
      if (!data) {
        return;
      } // If user has no Tasks document, do nothing
      // Clear the array before populating it, prevents duplicate data in React.StrictMode dev state
      LISTDATA.length = 0;
      let noPriorityTasks = [];

      Object.keys(data).forEach((key) => {
        let newItem = {
          taskID: data[key].id,
          taskName: data[key].name,
          taskPriority: data[key].priority,
          taskCompleted: data[key].complete,
          taskDeadline: "December 11, 2023",
          taskGroup: "Graduation Stuff",
          taskLocation: "Home",
          collapsed: true, // Always collapsed on page open
        };
        if (newItem.taskPriority == "None") {
          noPriorityTasks.push(newItem);
        } else {
          LISTDATA.push(newItem);
        }
      });
      // First order by highest priority
      LISTDATA.sort(compareTasks);
      for (i in noPriorityTasks) {
        LISTDATA.push(noPriorityTasks[i]);
      }
      if (sortMode == "lowestPriority") {
        // Then reverse order if lowest priority sort is active
        LISTDATA.reverse();
      }
      setForceRefreshCheat(true);
    });
  }, []);

  const [taskEnabled, toggleTaskEnabled] = React.useState(false);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [editModalTaskIndex, setEditModalTaskIndex] = React.useState(0);
  const [editModalTaskName, setEditModalTaskName] = React.useState("");
  const [editModalTaskPriority, setEditModalTaskPriority] = React.useState("");
  const [editModalTaskDeadline, setEditModalTaskDeadline] = React.useState("");
  const [editModalTaskLocation, setEditModalTaskLocation] = React.useState("");
  const [editModalTaskGroup, setEditModalTaskGroup] = React.useState("");

  const collapseTask = (taskIndex) => {
    LISTDATA[taskIndex].collapsed = !(LISTDATA[taskIndex].collapsed); // Collapse/Expand Task
    setForceRefreshCheat(!forceRefreshCheat); // Force refresh on TaskList
  }
  const editTask = (taskIndex) => {
    setEditModalTaskIndex(taskIndex);
    setEditModalTaskName(LISTDATA[taskIndex].taskName);
    if (LISTDATA[taskIndex].taskPriority != "None") {
      setEditModalTaskPriority(LISTDATA[taskIndex].taskPriority);
    }
    if (LISTDATA[taskIndex].taskDeadline != "None") {
      setEditModalTaskDeadline(LISTDATA[taskIndex].taskDeadline);
    }
    if (LISTDATA[taskIndex].taskLocation != "None") {
      setEditModalTaskLocation(LISTDATA[taskIndex].taskLocation);
    }
    if (LISTDATA[taskIndex].taskGroup != "None") {
      setEditModalTaskGroup(LISTDATA[taskIndex].taskGroup);
    }
    setEditModalVisible(true);
  };
  const saveEdit = () => {
    LISTDATA[editModalTaskIndex].taskName = editModalTaskName;
    LISTDATA[editModalTaskIndex].taskPriority = editModalTaskPriority;
    EditFirestoreTask(
      LISTDATA[editModalTaskIndex].taskID,
      LISTDATA[editModalTaskIndex].taskName,
      LISTDATA[editModalTaskIndex].taskPriority,
      LISTDATA[editModalTaskIndex].taskDeadline,
      LISTDATA[editModalTaskIndex].taskLocation,
      LISTDATA[editModalTaskIndex].taskGroup,
    );
    closeEditModal();
  };
  const deleteTask = () => {
    DeleteFirestoreTask(LISTDATA[editModalTaskIndex].taskID);
    LISTDATA.splice(editModalTaskIndex, 1);
    closeEditModal();
  }
  const setTaskCompleted = (taskIndex) => {
    let isComplete = !(LISTDATA[taskIndex].taskCompleted);
    MarkFirestoreTaskComplete(LISTDATA[taskIndex].taskID, isComplete);
    LISTDATA[taskIndex].taskCompleted = isComplete;
    setForceRefreshCheat(!forceRefreshCheat); // Call a refresh to make the TaskList update its appearance
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
            <ScrollView style={styles.contentContainer}>
              <Text
                style={[
                  styles.editModalTitle,
                  {
                    color: isDarkMode ? "white" : darkColor,
                    borderColor: isDarkMode ? "white" : darkColor,
                  },
                ]}
              >
                Edit Task
              </Text>
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
                  Priority:
                </Text>
                <TextField
                  colorTheme={isDarkMode ? "white" : darkColor}
                  text={editModalTaskPriority}
                  onChangeText={setEditModalTaskPriority}
                  type={"Task Priority"}
                  entryType={"number-pad"}
                  characterLimit={1}
                />
              </View>
              <View style={styles.editPanel}>
                <Text style={[styles.editHeader, { color: "white" }]}>
                  Date/Deadline:
                </Text>
                <TextField
                  colorTheme={isDarkMode ? "white" : darkColor}
                  text={editModalTaskDeadline}
                  onChangeText={setEditModalTaskDeadline}
                  type={"Task Date/Deadline"}
                  entryType={"default"}
                  characterLimit={25}
                />
              </View>
              <View style={styles.editPanel}>
                <Text style={[styles.editHeader, { color: "white" }]}>
                  Location:
                </Text>
                <TextField
                  colorTheme={isDarkMode ? "white" : darkColor}
                  text={editModalTaskLocation}
                  onChangeText={setEditModalTaskLocation}
                  type={"Task Location"}
                  entryType={"default"}
                  characterLimit={25}
                />
              </View>
              <View style={styles.editPanel}>
                <Text style={[styles.editHeader, { color: "white" }]}>
                  Group:
                </Text>
                <TextField
                  colorTheme={isDarkMode ? "white" : darkColor}
                  text={editModalTaskGroup}
                  onChangeText={setEditModalTaskGroup}
                  type={"Task Group Name"}
                  entryType={"default"}
                  characterLimit={25}
                />
              </View>
              <TouchableOpacity
                onPress={saveEdit}
                style={[
                  styles.saveChangesButton,
                  { borderColor: isDarkMode ? "white" : darkColor },
                ]}
              >
                <Text style={[{ fontWeight: 'bold', color: isDarkMode ? "white" : darkColor }]}>
                  Save Changes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteTask} style={[styles.saveChangesButton, {borderColor: '#af2525', marginBottom: '50%'}]}>
                <Text style={{fontWeight: 'bold', color: '#ef2525'}}>
                  Delete Task
                </Text>
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity
              onPress={closeEditModal}
              style={[
                styles.editModalCancelButton,
                {
                  borderColor: isDarkMode ? "white" : darkColor,
                  backgroundColor: isDarkMode ? "white" : darkColor,
                },
              ]}
            >
              <Text
                style={[
                  {
                    fontSize: 16,
                    fontWeight: "bold",
                    color: isDarkMode ? darkColor : "white",
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
          setTaskCompleted={setTaskCompleted}
          toggleCollapsed={collapseTask}
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
    padding: 25,
    alignContent: "center",
  },
  editModalTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
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
    marginTop: 10,
    borderWidth: 3,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    alignSelf: "center",
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
