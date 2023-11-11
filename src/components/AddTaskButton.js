import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import HomeStyles from "../styles/HomeStyles";

const AddTaskButton = (props) => {
  var [addTaskIconColor, setAddTaskIconColor] = React.useState(props.addTaskIconColor);
  return (
    <TouchableOpacity onPress={props.onPressFunc} style={[HomeStyles.addTaskButton, {borderColor: addTaskIconColor}]}>
      <MaterialIcons
        //style={HomeStyles.addTaskButton}
        name={"add-task"}
        size={30}
        color={addTaskIconColor}
      />
    </TouchableOpacity>
  );
};

export default AddTaskButton;
