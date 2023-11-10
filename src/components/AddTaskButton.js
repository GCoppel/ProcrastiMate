import React from "react";
import { TouchableHighlight } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import HomeStyles from "../styles/HomeStyles";

const AddTaskButton = (props) => {
  var [addTaskIconColor, setAddTaskIconColor] = React.useState(props.addTaskIconColor);
  var touchProps = {
    activeOpacity: 1,
    underlayColor: "black",
    // onHideUnderlay: () => setAddTaskIconColor("black"),
    // onShowUnderlay: () => setAddTaskIconColor("white"),
    onPress: props.onPressFunc,
  };
  return (
    <TouchableHighlight {...touchProps} style={[HomeStyles.addTaskButtonWrapper]}>
      <MaterialIcons
        style={HomeStyles.addTaskButton}
        name={"add-task"}
        size={30}
        color={addTaskIconColor}
      />
    </TouchableHighlight>
  );
};

export default AddTaskButton;
