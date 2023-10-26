import React, {useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { GetStudySessions } from "../firebase/FirebaseFirestore";
import Animated, { FadeIn, FadeOut, withDelay } from "react-native-reanimated";

const StudyProgress = () => {
    const {streak, setStreak} = useState(0)
    const {weeklyHours, setWeeklyHours} = useState(5)
    return (
        <View>
            <Text>Study Streak: {streak}</Text>
            <Text>This Week: {weeklyHours} Hours</Text>
        </View>
    )
}

const styles = StyleSheet.create({

  })
  

export default StudyProgress