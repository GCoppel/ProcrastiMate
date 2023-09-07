import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const StudyFunc = () => {
  console.log("Studying");
};

propStyle = (percent) => {
    const base_degrees = -135;
    const rotateBy = base_degrees + (percent * 3.6);
    return {
      transform:[{rotateZ: `${rotateBy}deg`}]
    };
  }

const ProgressWheel = ({percent}) => {
  let stylesFromProps = propStyle(percent);
  return (
    <View style={styles.container}>
      <View style={[styles.progress, stylesFromProps]}></View>
      <View style={styles.offsetLayer}></View>
      <TouchableOpacity onPress={StudyFunc} style={styles.studyButton}>
        <Text style={styles.studyButtonText}>GO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 220,
    borderWidth: 25,
    borderRadius: 10000,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  progress: {
    width: 220,
    height: 220,
    borderWidth: 25,
    borderRadius: 110, // Must be exatly half of the width/height to prevent overlapping
    position: "absolute",
    borderRightColor: 'pink',
    transform:[{rotateZ: '-45deg'}] // To start at top of circle
  },
  offsetLayer: {
    width: 200,
    height: 200,
    borderWidth: 20,
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'grey',
    borderTopColor: 'grey',
    transform:[{rotateZ: '-135deg'}]
  },
  studyButton: {
    position: "absolute",
    marginTop: 20,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "lightgreen",
  },
  studyButtonText: {
    fontSize: 35,
    fontWeight: "bold",
    flexWrap: "wrap",
    textAlign: "center",
  },
});

export default ProgressWheel;
