import React from "react";
import { TouchableOpacity, View, Text, Modal, StyleSheet } from "react-native";

function sortBySuggestedOrder(a, b){
  if (a.taskEstimatedValue > b.taskEstimatedValue) {
    return 1;
  }
  if (a.taskEstimatedValue < b.taskEstimatedValue) {
    return -1;
  }
  return 0;
}

function sortByHighestPriority(a, b){
  if (a.taskPriority < b.taskPriority) {
    return 1;
  }
  if (a.taskPriority > b.taskPriority) {
    return -1;
  }
  return 0;
}

function sortByLowestPriority(a, b){
  if (a.taskPriority > b.taskPriority) {
    return 1;
  }
  if (a.taskPriority < b.taskPriority) {
    return -1;
  }
  return 0;
}

function sortByHighestDifficulty(a, b){
  if (a.taskDifficulty < b.taskDifficulty) {
    return 1;
  }
  if (a.taskDifficulty > b.taskDifficulty) {
    return -1;
  }
  return 0;
}

function sortByLowestDifficulty(a, b){
  if (a.taskDifficulty > b.taskDifficulty) {
    return 1;
  }
  if (a.taskDifficulty < b.taskDifficulty) {
    return -1;
  }
  return 0;
}

function sortByHighestEstimatedTime(a, b){
  if (a.taskEstimatedTime < b.taskEstimatedTime) {
    return 1;
  }
  if (a.taskEstimatedTime > b.taskEstimatedTime) {
    return -1;
  }
  return 0;
}

function sortByLowestEstimatedTime(a, b){
  if (a.taskEstimatedTime > b.taskEstimatedTime) {
    return 1;
  }
  if (a.taskEstimatedTime < b.taskEstimatedTime) {
    return -1;
  }
  return 0;
}

export function sortTasks(sortMode, tasks){
  let newTasks;

  switch(sortMode){
    case "Suggested Order": {
      newTasks = tasks.sort(sortBySuggestedOrder);
      break;
    }
    case "Highest Priority": {
      newTasks = tasks.sort(sortByHighestPriority);
      break;
    }
    case "Lowest Priority": {
      newTasks = tasks.sort(sortByLowestPriority);
      break;
    }
    case "Highest Difficulty": {
      newTasks = tasks.sort(sortByHighestDifficulty);
      break;
    }
    case "Lowest Difficulty": {
      newTasks = tasks.sort(sortByLowestDifficulty);
      break;
    }
    case "Highest Estimated Time": {
      newTasks = tasks.sort(sortByHighestEstimatedTime);
      break;
    }
    case "Lowest Estimated Time": {
      newTasks = tasks.sort(sortByLowestEstimatedTime);
      break;
    }
    default: {
      // Invalid sort mode, do nothing:
      compareResult = 0;
      break;
    }
  }
  return newTasks;
}

const SortModal = (props) => {
  return (
    <Modal
        animationType="slide"
        visible={props.visible}
        transparent={true}
        onRequestClose={() => {
          props.setModalVisible(false);
        }}
      >
        <View style={styles.modalContentContainer}>
          <View
            style={[
              styles.modalVisiblePanel,
              { backgroundColor: props.isDarkMode ? '#121212' : "white" },
            ]}
          >
            <Text style={[{fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: (props.isDarkMode? 'white':props.darkColor)}]}>Sort By:</Text>
            <TouchableOpacity onPress={() => {props.updateSorting("Suggested Order"); props.setModalVisible(false)}} style={[styles.button, {borderColor: (props.isDarkMode? 'white':props.darkColor)}]}>
              <Text style={[{color: (props.isDarkMode? 'white':props.darkColor)}]}>Suggested Order</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {props.updateSorting("Highest Priority"); props.setModalVisible(false)}} style={[styles.button, {borderColor: (props.isDarkMode? 'white':props.darkColor)}]}>
              <Text style={[{color: (props.isDarkMode? 'white':props.darkColor)}]}>Highest Priority</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {props.updateSorting("Lowest Priority"); props.setModalVisible(false)}} style={[styles.button, {borderColor: (props.isDarkMode? 'white':props.darkColor)}]}>
              <Text style={[{color: (props.isDarkMode? 'white':props.darkColor)}]}>Lowest Priority</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {props.updateSorting("Highest Difficulty"); props.setModalVisible(false)}} style={[styles.button, {borderColor: (props.isDarkMode? 'white':props.darkColor)}]}>
              <Text style={[{color: (props.isDarkMode? 'white':props.darkColor)}]}>Highest Difficulty</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {props.updateSorting("Lowest Difficulty"); props.setModalVisible(false)}} style={[styles.button, {borderColor: (props.isDarkMode? 'white':props.darkColor)}]}>
              <Text style={[{color: (props.isDarkMode? 'white':props.darkColor)}]}>Lowest Difficulty</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {props.updateSorting("Highest Estimated Time"); props.setModalVisible(false)}} style={[styles.button, {borderColor: (props.isDarkMode? 'white':props.darkColor)}]}>
              <Text style={[{color: (props.isDarkMode? 'white':props.darkColor)}]}>Highest Estimated Time</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {props.updateSorting("Lowest Estimated Time"); props.setModalVisible(false)}} style={[styles.button, {borderColor: (props.isDarkMode? 'white':props.darkColor)}]}>
              <Text style={[{color: (props.isDarkMode? 'white':props.darkColor)}]}>Lowest Estimated Time</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.setModalVisible(false)} style={[styles.languageModalCancelButton, {borderColor: (props.isDarkMode? 'white':props.darkColor)}]}>
              <Text style={[{fontSize: 16, fontWeight: 'bold',color: (props.isDarkMode? props.darkColor:props.darkColor)}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  );
};
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
      borderRadius: 10,
      borderColor: "darkgrey",
      borderWidth: 2,
    },
    languageModalCancelButton: {
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
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 3,
        borderRadius: 10,
        marginVertical: 5
    }
})

export default SortModal;