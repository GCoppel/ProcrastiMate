import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

const ToggleItem = (props) => {
  const { text, type, isChecked, setChecked, disabled } = props;
  return (
    <View style={styles.toggleItemContainer}>
      <Checkbox
        style={ type=="square" ? styles.squareCheckbox : styles.circleCheckbox}
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
  squareCheckbox: {
    width: 25,
    height: 25,
  },
  circleCheckbox: {
    width: 25,
    height: 25,
    borderRadius: 100,
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
