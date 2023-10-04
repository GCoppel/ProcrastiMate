import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

const ToggleItem = (props) => {
  const { text, isChecked, setChecked, defaultState, disabled } = props;
  return (
    <View style={styles.toggleItemContainer}>
      <Checkbox
        style={styles.toggleItemCheckbox}
        value={isChecked}
        disabled={disabled}
        onValueChange={setChecked}
        color={isChecked ? "#000" : undefined}
      />
      <Text
        style={
          !disabled ? styles.toggleItemText : styles.toggleItemTextDisabled
        }
      >
        {text}
      </Text>
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
  toggleItemTextDisabled: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
    color: "lightgrey",
  },
});

export default ToggleItem;
