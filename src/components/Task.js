import React from "react";
import { StyleSheet, View, Text, useColorScheme } from "react-native";

import HomeStyles from "../styles/HomeStyles";
import ToggleItem from "./ToggleItem";

const Task = (props) => {
  // console.log(props.taskName)
  // console.log(props.colorTheme)
  return (
    <View
      style={[
        HomeStyles.taskItem,
        { borderColor: props.colorTheme },
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
      <View>
        <Text style={{ color: props.colorTheme }}>
          {"Name: " + props.taskName}
        </Text>
        <Text style={{ color: props.colorTheme }}>
          {"Priority: " + props.taskPriority}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskWrapper: {
    flexDirection: "row",
  },
});

export default Task;
