import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Easing } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import StudyButton from '../components/StudyButton'
import { AnimatedCircularProgress } from "react-native-circular-progress";

const Study = () => {
  const motivationalMessages = [
    "You're doing great, sweetie!",
    "Keep up the good work!",
    "Proud of you, son.",
    "What're you studying?",
    "It's a good day for studying.",
    "Lookin' good!",
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

  const [animComplete, setAnimComplete] = useState(false);
  const [fillPercent, setFill] = useState(50);

  // Use an effect to listen for changes in animComplete
  useEffect(() => {
    // Just using this to call a redraw on the Text and AnimatedCircularProgress components
  }, [animComplete]);

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={240}
        width={26}
        rotation={-115}
        lineCap="round"
        arcSweepAngle={230}
        fill={40} // Use the fill state
        tintColor={"#550000"}
        tintColorSecondary={"#009900"}
        duration={3000}
        easing={Easing.inOut(Easing.ease)}
        onAnimationComplete={() => setAnimComplete(true)}
        backgroundColor="#999999"
      >
        {(fill) =>
          animComplete ? (
            <StudyButton />
          ) : (
            <Animated.View
            key={"uniqueKey"}
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(100)}
          >
            <Text style={styles.progressText}>{fill.toFixed(0)}</Text>
          </Animated.View>
          )
        }
      </AnimatedCircularProgress>
      <Text style={styles.motivationalMessageText}>{animComplete? motivationalMessage : "Let's see how you've been doing..."}</Text>
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
  progressText: {
    fontSize: 27,
    fontWeight: 'bold'
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
