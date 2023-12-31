import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  Easing,
  TouchableOpacity,
  Modal,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import StudyButton from "../components/StudyButton";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { GetSettings, GetStudySessions, GetStudyStreak } from "../firebase/FirebaseFirestore";
import { useNavigation } from "@react-navigation/core";

const Study = () => {
  const motivationalMessages = [
    "You're doing great, sweetie!",
    "Keep up the good work!",
    "Proud of you, son.",
    "What're you studying?",
    "Not bad!",
    "Lookin' good!",
    "What're we working on today?",
    "Hey, look at you go!",
  ];
  const negativeReinforcementMessages = [
    "You can do better.",
    "Stop being lazy and get to work.",
    "Get off your a**",
    "You're still not done?",
    "I'll be honest, it's pretty pathetic that you're not done yet.",
    "Your dad thinks you're a failure. Go on, prove him wrong.",
  ];

  const currentDate = new Date();
  const today = currentDate.getDay();

  const theme = useColorScheme();
  const darkColor = "#222227";
  const [isDarkMode, setIsDarkMode] = React.useState(theme === "dark");

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
    return firestoreSessions;
  }

  async function GetFirestoreSettings() {
    const firestoreSettings = await GetSettings();
    return firestoreSettings;
  }

  async function GetFirestoreStreak() {
    const firestoreStreak = await GetStudyStreak();
    return firestoreStreak;
  }

  const [streak, setStreak] = useState(0);
  const [weeklyHours, setWeeklyHours] = useState(0);
  const [weeklyMinutes, setWeeklyMinutes] = useState(0);
  const [weeklySessions, setWeeklySessions] = useState(0);
  const [weeklyGoalHours, setWeeklyGoalHours] = useState(0);
  const [weeklyGoalMinutes, setWeeklyGoalMinutes] = useState(0);
  const [fillAmount, setFillAmount] = useState(0);
  const [extraHours, setExtraHours] = useState(0);
  const [extraMinutes, setExtraMinutes] = useState(0);
  const [extraTime, setExtraTime] = useState(0);

  useEffect(() => {
    GetFirestoreStudySessions().then((data) => {
      if (!data) {
        return;
      }
      let totalMinutes = 0;
      let totalHours = 0;
      let totalSessions = 0;
      // Parse through all sessions:
      Object.keys(data).forEach((key) => {
        totalMinutes += data[key].sessionLength;
        totalSessions++;
      });
      // Convert minutes into hours & minutes:
      while (totalMinutes > 60) {
        totalMinutes -= 60;
        totalHours++;
      }
      // Set states:
      setWeeklyMinutes(totalMinutes);
      setWeeklyHours(totalHours);
      setWeeklySessions(totalSessions);
    });
    GetFirestoreStreak().then((weeks) => {
      setStreak(weeks);
    });
  }, []);

  useEffect(() => {
    GetFirestoreSettings().then((data) => {
      let completedPercent =
        ((weeklyMinutes + weeklyHours * 60) / data.WeeklyStudyGoal) * 100;
        if (completedPercent > 100){
          setFillAmount(100);
          setExtraTime(completedPercent-100);
          setExtraMinutes((weeklyMinutes + (weeklyHours*60)) - data.WeeklyStudyGoal)
        }
        else {
          setFillAmount(completedPercent);
        }
      let goalHours = 0;
      let goalMinutes = data.WeeklyStudyGoal;
      while (goalMinutes >= 60) {
        goalMinutes -= 60;
        goalHours++;
      }
      setWeeklyGoalHours(goalHours);
      setWeeklyGoalMinutes(goalMinutes);
    });
  }, [weeklyMinutes, weeklyHours]);

  const navigation = useNavigation();

  const navigateToSessionPage = () => {
    navigation.replace("Session");
  };

  const showMoreStats = () => {
    ShowHideLanguageModal();
  };

  const [showMoreModalVisible, setModalVisible] = React.useState(false);

  const ShowHideLanguageModal = () => {
    setModalVisible(!showMoreModalVisible);
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={showMoreModalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContentContainer}>
          <View
            style={[
              styles.modalVisiblePanel,
              { backgroundColor: isDarkMode ? "#121212" : "white" },
            ]}
          >
            <Text
              style={[
                styles.progressInfo,
                isDarkMode ? { color: "white" } : { color: darkColor },
              ]}
            >
              Study Streak: {streak}
            </Text>
            <Text
              style={[
                styles.progressInfo,
                isDarkMode ? { color: "white" } : { color: darkColor },
              ]}
            >
              Your Weekly Goal:{" "}
              {weeklyGoalHours == 0 ? "" : weeklyGoalHours + " Hrs "}
              {weeklyGoalMinutes} Min
            </Text>
            <Text
              style={[
                styles.progressInfo,
                isDarkMode ? { color: "white" } : { color: darkColor },
              ]}
            >
              This Week: {weeklyHours == 0 ? "" : weeklyHours + " Hrs "}
              {weeklyMinutes} Min - {fillAmount.toPrecision(3)}%
            </Text>
            <Text
            style={[
              styles.progressInfo,
              isDarkMode ? { color: "white" } : { color: darkColor },
            ]}
          >
            Banked Time: {extraHours == 0 ? "" : extraHours + " Hrs "}
            {extraMinutes} Min - {extraTime.toPrecision(3)}%
          </Text>
            <Text
              style={[
                styles.progressInfo,
                isDarkMode ? { color: "white" } : { color: darkColor },
              ]}
            >
              Throughout {weeklySessions} Sessions
            </Text>
            <TouchableOpacity
              onPress={ShowHideLanguageModal}
              style={[
                styles.languageModalCancelButton,
                { borderColor: isDarkMode ? "white" : darkColor },
              ]}
            >
              <Text
                style={[
                  {
                    fontSize: 16,
                    fontWeight: "bold",
                    color: isDarkMode ? darkColor : darkColor,
                  },
                ]}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View
        style={[
          styles.container,
          isDarkMode
            ? { backgroundColor: darkColor }
            : { backgroundColor: "white" },
        ]}
      >
        <View style={styles.progressContainer}>
          <Text
            style={[
              styles.progressInfo,
              isDarkMode ? { color: "white" } : { color: darkColor },
            ]}
          >
            Study Streak: {streak}
          </Text>
          <Text
            style={[
              styles.progressInfo,
              isDarkMode ? { color: "white" } : { color: darkColor },
            ]}
          >
            This Week: {weeklyHours == 0 ? "" : weeklyHours + " Hrs "}
            {weeklyMinutes} Min - {fillAmount.toPrecision(3)}%
          </Text>
          {(extraTime != 0)?           
          <Text
            style={[
              styles.progressInfo,
              isDarkMode ? { color: "white" } : { color: darkColor },
            ]}
          >
            Banked Time: {extraHours == 0 ? "" : extraHours + " Hrs "}
            {extraMinutes} Min - {extraTime.toPrecision(3)}%
          </Text> : null
          }
          <TouchableOpacity
            onPress={showMoreStats}
            style={[
              styles.showMoreButton,
              { zIndex: 1, borderColor: isDarkMode ? "white" : darkColor },
            ]}
          >
            <Text
              style={[
                { fontSize: 16 },
                isDarkMode ? { color: "white" } : { color: darkColor },
              ]}
            >
              Show More Info
            </Text>
          </TouchableOpacity>
        </View>
        <AnimatedCircularProgress
          size={240}
          width={26}
          rotation={-115}
          lineCap="round"
          arcSweepAngle={230}
          fill={fillAmount} // Use the fill state
          tintColor={"#550000"}
          tintColorSecondary={"#009900"}
          duration={3000}
          easing={Easing.inOut(Easing.ease)}
          onAnimationComplete={() => setAnimComplete(true)}
          backgroundColor={"#999999"}
        >
          {(fill) =>
            animComplete ? (
              <StudyButton openSessionPage={navigateToSessionPage} />
            ) : (
              <Animated.View
                key={"uniqueKey"}
                entering={FadeIn.duration(500)}
                exiting={FadeOut.duration(100)}
              >
                <Text
                  style={[
                    styles.progressText,
                    isDarkMode ? { color: "white" } : { color: darkColor },
                  ]}
                >
                  {fill.toFixed(0)}
                </Text>
              </Animated.View>
            )
          }
        </AnimatedCircularProgress>
        <Text
          style={[
            styles.motivationalMessageText,
            isDarkMode ? { color: "white" } : { color: darkColor },
          ]}
        >
          {animComplete
            ? motivationalMessage
            : "Let's see how you've been doing..."}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalContentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalVisiblePanel: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: "75%",
    height: "50%",
    borderRadius: 10,
    borderColor: "darkgrey",
    borderWidth: 2,
  },
  languageModalCancelButton: {
    position: "absolute",
    bottom: 0,
    width: "70%",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 25,
  },
  progressInfo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  motivationalMessageText: {
    fontSize: 25,
    flexWrap: "wrap",
    width: "75%",
    textAlign: "center",
  },
  progressText: {
    fontSize: 27,
    fontWeight: "bold",
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
  showMoreButton: {
    borderWidth: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default Study;
