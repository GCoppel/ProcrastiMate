import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Easing } from "react-native";

import ProgressWheel from "../components/ProgressWheel";

import { AnimatedCircularProgress } from "react-native-circular-progress";

const Study = () => {
  const motivationalMessages = [
    "You're doing great, sweetie!",
    "Keep up the good work!",
    "Proud of you, son.",
    "What're you studying?",
    "It's a good day for studying.",
    "Welcome back!",
    "What're we working on today?",
  ];

  const negativeReinforcementMessages = [
    "You can do better.",
    "Stop being lazy and get to work.",
    "Get off your a**",
    "You're still not done?",
    "I'll be honest, it's pretty pathetic that you're not done yet.",
    "Your dad thinks you're a failure. Go on, prove him wrong.",
  ];

  let motivationalMessage =
    motivationalMessages[
      Math.floor(Math.random() * motivationalMessages.length)
    ];

  return (
    <View style={styles.container}>
      <Text style={styles.motivationalMessageText}>{motivationalMessage}</Text>
      <AnimatedCircularProgress
        size={240}
        width={26}
        fill={100}
        tintColor={"#550000"}
        tintColorSecondary={"#009900"}
        duration={3000}
        easing={Easing.inOut(Easing.ease)}
        onAnimationComplete={() => console.log("onAnimationComplete")}
        backgroundColor="#999999"
      >
        {(fill) => <Text>{fill.toFixed(0)}</Text>}
      </AnimatedCircularProgress>
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
    flexWrap: "wrap",
    width: "75%",
    textAlign: "center",
  },
  studyButton: {
    marginTop: 50,
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

export default Study;
