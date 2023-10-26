import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Easing } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import StudyButton from '../components/StudyButton'
import StudyProgress from '../components/StudyProgress'
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { GetStudySessions } from "../firebase/FirebaseFirestore";

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

  // Use an effect to listen for changes in animComplete
  useEffect(() => {
    // Just using this to call a redraw on the Text and AnimatedCircularProgress components
  }, [animComplete]);

  async function GetFirestoreStudySessions() {
    const firestoreSessions = await GetStudySessions();
    return firestoreSessions
  }
  
  const [streak, setStreak] = useState(0)
  const [weeklyHours, setWeeklyHours] = useState(0)
  const [weeklyMinutes, setWeeklyMinutes] = useState(0)
  const [weeklySessions, setWeeklySessions] = useState(0)

  useEffect(() => {
    GetFirestoreStudySessions()
      .then((data) => {       
        if (!data){return} 
        let totalMinutes = 0
        let totalHours = 0
        let totalSessions = 0
        // Parse through all sessions:
        Object.keys(data).forEach((key) => {
          totalMinutes += data[key].sessionLength
          totalSessions++
        });
        // Convert minutes into hours & minutes:
        while (totalMinutes > 60){
          totalMinutes -= 60
          totalHours++
        }
        // Set states:
        setWeeklyMinutes(totalMinutes)
        setWeeklyHours(totalHours)
        setWeeklySessions(totalSessions)
      });
  }, []);

  return (
    <View style={styles.container}>
      {/* <StudyProgress></StudyProgress> */}
      <View style={styles.progressContainer}>
            <Text style={styles.progressInfo}>Study Streak: {streak}</Text>
            <Text style={styles.progressInfo}>This Week: {(weeklyHours==0)? "": weeklyHours +" Hrs "}{weeklyMinutes} Min</Text>
            <Text style={styles.progressInfo}>Throughout {weeklySessions} Sessions</Text>
        </View>
      <AnimatedCircularProgress
        size={240}
        width={26}
        rotation={-115}
        lineCap="round"
        arcSweepAngle={230}
        fill={100} // Use the fill state
        tintColor={"#550000"}
        tintColorSecondary={"#009900"}
        duration={3000}
        easing={Easing.inOut(Easing.ease)}
        onAnimationComplete={() => setAnimComplete(true)}
        backgroundColor="#999999"
      >
        {(fill) =>
          animComplete ? (
            <StudyButton/>
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
  progressContainer:{
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '12%',
  },
  progressInfo: {
    fontSize: 20,
    fontWeight: 'bold'
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
