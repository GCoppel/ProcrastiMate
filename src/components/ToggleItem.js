import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

const ToggleItem = (props) => {
  const { colorTheme, enabledTextColor, disabledTextColor, text, type, isChecked, setChecked, disabled } = props;
  return (
    <View style={styles.toggleItemContainer}>
      <Checkbox
        style={[type=="square" ? styles.squareCheckbox : styles.circleCheckbox, disabled? {borderColor: disabledTextColor}:{borderColor: enabledTextColor}]}
        value={isChecked}
        disabled={false} // Never actually disabled due to limited border color accessibility. Instead set disabled functionality in onValueChanged logic
        onValueChange={disabled? null: setChecked}
        color={isChecked ? (colorTheme) : undefined}
      />
      <Text
        style={[
          !disabled ? ([styles.toggleItemText, {color: enabledTextColor}]) : ([styles.toggleItemTextDisabled, {color: disabledTextColor}])
        ]}
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
