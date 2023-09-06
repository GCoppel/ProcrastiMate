import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Study = () => {
  const [isChecked, setChecked] = useState(false);

  const StudyFunc = () => {
    console.log("Studying");
  };

  const motivationalMessages = [
    "You're doing great, sweetie!",
    "Keep up the good work!",
    "Proud of you, son.",
  ]

  let motivationalMessage = motivationalMessages[Math.floor(Math.random()*motivationalMessages.length)];
  
  return (
    <View style={styles.container}>
      <Text style={styles.motivationalMessageText}>{motivationalMessage}</Text>
      <TouchableOpacity onPress={StudyFunc} style={styles.studyButton}>
        <Text style={styles.studyButtonText}>GO</Text>
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
  motivationalMessageText: {
    fontSize: 25,
    flexWrap: 'wrap',
    width: '75%',
    textAlign: 'center'
  },
  studyButton: {
    marginTop: 20,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: "lightgreen",
  },
  studyButtonText: {
    fontSize: 35,
    fontWeight: "bold",
    flexWrap: 'wrap',
    textAlign: 'center',
  },
});

export default Study;
