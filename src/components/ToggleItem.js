import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

const ToggleItem = (props) => {
  const { text, defaultState, enabled } = props;
  const [isChecked, setChecked] = useState(defaultState);
  return (
    <View style={styles.toggleItemContainer}>
      <Checkbox
        style={styles.toggleItemCheckbox}
        value={isChecked}
        disabled={false}
        onValueChange={setChecked}
        color={isChecked ? "#000" : undefined}
      />
      <Text style={styles.toggleItemText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  toggleItemCheckbox: {
    width: 25,
    height: 25,
  },
  toggleItemText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default ToggleItem;
