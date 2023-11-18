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
        {alignItems: 'center', justifyContent: 'flex-start'},
        props.completed? {borderColor: 'grey'}:{borderColor: props.colorTheme}
      ]}
    >
      <ToggleItem
        colorTheme={'grey'}
        enabledTextColor={props.colorTheme }
        disabledTextColor={props.colorTheme }
        isChecked={props.completed}
        setChecked={() => props.toggleCompleted(props.taskKey)}
        showCheckmark={false}
        disabled={false}
      />
      <TouchableOpacity onPress={()=>props.toggleCollapsed(props.taskKey)} style={styles.infoWrapper}>
        <Text style={props.completed? {color: 'grey'}:{ color: props.colorTheme }}>
          {"Name: " + props.taskName}
        </Text>
        {(props.taskPriority != "None")? 
        <Text style={props.completed? {color: 'grey'}:{ color: props.colorTheme }}>
          {"Priority: " + props.taskPriority} 
        </Text> : null
        }
        {props.collapsed? 
        null : 
        <>
          {(props.taskPriority == "None")? <Text style={props.completed? {color: 'grey'}:{ color: props.colorTheme }}>
            {"Priority: " + props.taskPriority} 
          </Text> : null
          }
          <Text style={props.completed? {color: 'grey'}:{ color: props.colorTheme }}>Deadline: {props.taskDeadline}</Text>
          <Text style={props.completed? {color: 'grey'}:{ color: props.colorTheme }}>Location: {props.taskLocation}</Text>
          <Text style={props.completed? {color: 'grey'}:{ color: props.colorTheme }}>Group: {props.taskGroup}</Text>
        </>
        }
      </TouchableOpacity>
      <View style={styles.editWrapper}>
        <TouchableOpacity onPress={()=>props.editTask(props.taskKey)} style={[styles.editButton, props.completed? {borderColor: 'grey'}:{borderColor: props.colorTheme}]}>
          <Feather name="edit-3" size={21} style={props.completed? {color:'grey'}:{color: (props.colorTheme)}} />
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
    flexGrow: 1
  },
  editWrapper: {
    flexGrow: 0,
    alignItems: 'flex-end'
  },
  editButton: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 3,
  }
});

export default Task;
