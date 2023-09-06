import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

const Study = () => {
    const [isChecked, setChecked] = useState(false);

    const StudyFunc = () => {
        console.log("Studying")
    }

  return (
    <View style={styles.container}>
      <Text>Hello!</Text>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? "#000" : undefined}
      />
      <TouchableOpacity onPress={StudyFunc} style={styles.signOutBtn}>
        <Text style={styles.signOutText}>Study</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Study;
