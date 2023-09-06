import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Study = () => {
    const [isChecked, setChecked] = useState(false);

    const StudyFunc = () => {
        console.log("Studying")
    }

  return (
    <View style={styles.container}>
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
