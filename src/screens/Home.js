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
import SortModal, { sortTasks } from "../components/SortModal";

let LISTDATA = [];

const Home = () => {
  const theme = useColorScheme();
  const darkColor = "#222227";
  const [isDarkMode, setIsDarkMode] = React.useState(theme === "dark");

  const [newTaskText, onNewTaskTextChange] = React.useState();
  const [newTaskPriority, onNewTaskPriorityChange] = React.useState();

  const [sortMode, setSortMode] = React.useState("Suggested Order");
  const [sortDirection, setSortDirection] = React.useState("highest");

  // Function to calculate estimated value for a task
  const calculateEstimatedValue = (priority, difficulty, estimatedTime) => {
    // Normalize values to a scale of 0 to 1
    const normalizedImportance = priority / 9.0;
    const normalizedDifficulty = difficulty / 9.0;
    const normalizedEstimatedTime = estimatedTime / 999.0;

    // Calculate the estimated value using weighted sum
    const estimatedValue =
      0.5 * normalizedImportance +
      0.25 * normalizedDifficulty +
      0.25 * normalizedEstimatedTime;

    return estimatedValue;
  };

  function AddTask() {
    let newItem = {
      taskID: Date.now(),
      taskName: newTaskText,
      taskEstimatedValue: 0,
      taskPriority: !newTaskPriority ? "---" : newTaskPriority,
      taskEstimatedTime: 0,
      taskDifficulty: 0,
      taskCompleted: false,
      taskDeadline: "---",
      taskGroup: "---",
      taskLocation: "---",
      isDarkMode: isDarkMode,
      collapsed: true,
    };
    if (newItem.taskPriority && newItem.taskDifficulty && newItem.taskEstimatedTime){
      newItem.taskEstimatedValue = calculateEstimatedValue(newItem.taskPriority, newItem.taskDifficulty, newItem.taskEstimatedTime);
    }
    LISTDATA.push(newItem);
    AddTaskToFirestore(
      newItem.taskID,
      newItem.taskName,
      newItem.taskPriority,
      newItem.taskDifficulty,
      newItem.taskEstimatedTime,
      newItem.taskDeadline,
      newItem.taskLocation,
      newItem.taskGroup,
      newItem.taskCompleted
    );
    onNewTaskTextChange("");
    onNewTaskPriorityChange("");
  }

  useEffect(() => {
    LISTDATA = sortTasks(sortMode, LISTDATA)
    setForceRefreshCheat(!forceRefreshCheat)
  }, [sortMode])

  async function GetFireStoreTasks() {
    const firestoreTasks = await GetTasks();
    return firestoreTasks;
  }

  const [forceRefreshCheat, setForceRefreshCheat] = React.useState(false);
  useEffect(() => {
    // Do nothing
  }, [forceRefreshCheat]);

  function compareTasks(a, b) {
    if (a.estimatedValue > b.estimatedValue) {
      return 1;
    }
    if (a.estimatedValue < b.estimatedValue) {
      return -1;
    }
    return 0;
  }

  const updateSorting = (newMode) => {
    setSortMode(newMode)
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
          taskEstimatedValue: 0,
          taskPriority: data[key].priority,
          taskEstimatedTime: data[key].estimatedTime,
          taskDifficulty: data[key].difficulty,
          taskCompleted: data[key].complete,
          taskDeadline: data[key].deadline,
          taskGroup: data[key].group,
          taskLocation: data[key].location,
          collapsed: true, // Always collapsed on page open
        };
        if ((newItem.taskPriority != "---") && (newItem.taskDifficulty != "---") && (newItem.taskEstimatedTime != "---")){
          newItem.taskEstimatedValue = calculateEstimatedValue(newItem.taskPriority, newItem.taskDifficulty, newItem.taskEstimatedTime);
          LISTDATA.push(newItem);
        }
        // if (newItem.taskEstimatedValue == "0") {
        //   noPriorityTasks.push(newItem);
        else {
          noPriorityTasks.push(newItem);
        }
      });
      // First order by highest priority
      for (i in noPriorityTasks) {
        LISTDATA.push(noPriorityTasks[i]);
      }
      setForceRefreshCheat(true);
    });
  }, []);

  const [sortModalVisible, setSortModalVisible] = React.useState(false);

  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [editModalTaskIndex, setEditModalTaskIndex] = React.useState(0);
  const [editModalTaskName, setEditModalTaskName] = React.useState("");
  const [editModalTaskPriority, setEditModalTaskPriority] = React.useState("");
  const [editModalTaskDifficulty, setEditModalTaskDifficulty] =
    React.useState("");
  const [editModalTaskEstimatedTime, setEditModalTaskEstimatedTime] =
    React.useState("");
  const [editModalTaskDeadline, setEditModalTaskDeadline] = React.useState("");
  const [editModalTaskLocation, setEditModalTaskLocation] = React.useState("");
  const [editModalTaskGroup, setEditModalTaskGroup] = React.useState("");

  const collapseTask = (taskIndex) => {
    LISTDATA[taskIndex].collapsed = !LISTDATA[taskIndex].collapsed; // Collapse/Expand Task
    setForceRefreshCheat(!forceRefreshCheat); // Force refresh on TaskList
  };
  const editTask = (taskIndex) => {
    setEditModalTaskIndex(taskIndex);
    setEditModalTaskName(LISTDATA[taskIndex].taskName);
    if (LISTDATA[taskIndex].taskPriority != "---") {
      setEditModalTaskPriority(LISTDATA[taskIndex].taskPriority);
    }
    if (LISTDATA[taskIndex].taskDifficulty != "---") {
      setEditModalTaskDifficulty(LISTDATA[taskIndex].taskDifficulty);
    }
    if (LISTDATA[taskIndex].taskEstimatedTime != "---") {
      setEditModalTaskEstimatedTime(LISTDATA[taskIndex].taskEstimatedTime);
    }
    if (LISTDATA[taskIndex].taskDeadline != "---") {
      setEditModalTaskDeadline(LISTDATA[taskIndex].taskDeadline);
    }
    if (LISTDATA[taskIndex].taskLocation != "---") {
      setEditModalTaskLocation(LISTDATA[taskIndex].taskLocation);
    }
    if (LISTDATA[taskIndex].taskGroup != "---") {
      setEditModalTaskGroup(LISTDATA[taskIndex].taskGroup);
    }
    setEditModalVisible(true);
  };
  const saveEdit = () => {
    LISTDATA[editModalTaskIndex].taskName = editModalTaskName;
    LISTDATA[editModalTaskIndex].taskPriority = editModalTaskPriority;
    LISTDATA[editModalTaskIndex].taskDifficulty = editModalTaskDifficulty;
    LISTDATA[editModalTaskIndex].taskEstimatedTime = editModalTaskEstimatedTime;
    LISTDATA[editModalTaskIndex].taskDeadline = editModalTaskDeadline;
    LISTDATA[editModalTaskIndex].taskLocation = editModalTaskLocation;
    LISTDATA[editModalTaskIndex].taskGroup = editModalTaskGroup;
    EditFirestoreTask(
      LISTDATA[editModalTaskIndex].taskID,
      LISTDATA[editModalTaskIndex].taskName,
      LISTDATA[editModalTaskIndex].taskPriority,
      LISTDATA[editModalTaskIndex].taskDifficulty,
      LISTDATA[editModalTaskIndex].taskEstimatedTime,
      LISTDATA[editModalTaskIndex].taskDeadline,
      LISTDATA[editModalTaskIndex].taskLocation,
      LISTDATA[editModalTaskIndex].taskGroup
    );
    closeEditModal();
  };
  const deleteTask = () => {
    DeleteFirestoreTask(LISTDATA[editModalTaskIndex].taskID);
    LISTDATA.splice(editModalTaskIndex, 1);
    closeEditModal();
  };
  const setTaskCompleted = (taskIndex) => {
    let isComplete = !LISTDATA[taskIndex].taskCompleted;
    MarkFirestoreTaskComplete(LISTDATA[taskIndex].taskID, isComplete);
    LISTDATA[taskIndex].taskCompleted = isComplete;
    setForceRefreshCheat(!forceRefreshCheat); // Call a refresh to make the TaskList update its appearance
  };
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
                  text={editModalTaskPriority.toString()}
                  onChangeText={setEditModalTaskPriority}
                  type={"Task Priority"}
                  entryType={"number-pad"}
                  characterLimit={1}
                />
              </View>
              <View style={styles.editPanel}>
                <Text style={[styles.editHeader, { color: "white" }]}>
                  Difficulty:
                </Text>
                <TextField
                  colorTheme={isDarkMode ? "white" : darkColor}
                  text={editModalTaskDifficulty.toString()}
                  onChangeText={setEditModalTaskDifficulty}
                  type={"Task Difficulty"}
                  entryType={"number-pad"}
                  characterLimit={1}
                />
              </View>
              <View style={styles.editPanel}>
                <Text style={[styles.editHeader, { color: "white" }]}>
                  Estimated Min:
                </Text>
                <TextField
                  colorTheme={isDarkMode ? "white" : darkColor}
                  text={editModalTaskEstimatedTime.toString()}
                  onChangeText={setEditModalTaskEstimatedTime}
                  type={"Est. Minutes to Complete"}
                  entryType={"number-pad"}
                  characterLimit={3}
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
                <Text
                  style={[
                    {
                      fontWeight: "bold",
                      color: isDarkMode ? "white" : darkColor,
                    },
                  ]}
                >
                  Save Changes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={deleteTask}
                style={[
                  styles.saveChangesButton,
                  { borderColor: "#af2525", marginBottom: "50%" },
                ]}
              >
                <Text style={{ fontWeight: "bold", color: "#ef2525" }}>
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
      <SortModal isDarkMode={isDarkMode} visible={sortModalVisible} setModalVisible={setSortModalVisible} changeSortMode={setSortMode} updateSorting={updateSorting} />
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
      <TouchableOpacity onPress={() => setSortModalVisible(true)} style={[styles.sortButton, {borderColor: (isDarkMode? 'white':darkColor)}]}>
        <Text style={{fontWeight: '700', color: (isDarkMode? 'white':darkColor)}}>Sort By: {sortMode}</Text>
      </TouchableOpacity>
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
  sortButton: {
    alignSelf: 'center',
    borderWidth: 3,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 6
  },
});
