import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import HomeStyles from "../styles/HomeStyles";
import ToggleItem from "./ToggleItem";

const Task = (props) => {
  // console.log(props.taskName)
  // console.log(props.colorTheme)
  return (
    <View
      style={[
        HomeStyles.taskItem,
        { borderColor: props.colorTheme, alignItems: 'center', justifyContent: 'flex-start'},
      ]}
    >
      <ToggleItem
        colorTheme={props.colorTheme}
        enabledTextColor={props.colorTheme }
        disabledTextColor={props.colorTheme }
        isChecked={true}
        setChecked={null}
        disabled={false}
      />
      <View style={styles.infoWrapper}>
        <Text style={{ color: props.colorTheme }}>
          {"Name: " + props.taskName}
        </Text>
        <Text style={{ color: props.colorTheme }}>
          {"Priority: " + props.taskPriority}
        </Text>
      </View>
      <View style={styles.editWrapper}>
        <TouchableOpacity onPress={()=>props.editTask(props.taskKey)} style={[styles.editButton, {borderColor: props.colorTheme}]}>
          <Feather name="edit-3" size={21} style={{color: (props.colorTheme)}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskWrapper: {
    flexDirection: "row",
  },
  infoWrapper: {
    marginLeft: 5,
  },
  editWrapper: {
    flexGrow: 1,
    alignItems: 'flex-end'
  },
  editButton: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 3,
  }
});

export default Task;
