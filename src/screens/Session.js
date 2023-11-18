import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  useColorScheme,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import TextField from "../components/TextField";
import {
  AddStudySession,
  GetStudySessions,
  UpdateStudyStreak,
  GetSettings,
  GetStudyStreak,
} from "../firebase/FirebaseFirestore";

const Session = () => {
  const theme = useColorScheme();
  const darkColor = "#222227";
  const [isDarkMode, setIsDarkMode] = React.useState(theme === "dark");

  const [userEmail, onChangeUserEmail] = React.useState("admin@test.com");
  const [userPassword, onChangeUserPassword] = React.useState("password");
  navigation = useNavigation();

  const [pastSessionsTotal, setPastSessionsTotal] = React.useState();
  const [studyGoal, setStudyGoal] = React.useState();
  const [studyStreak, setStudyStreak] = React.useState();

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

  useEffect(() => {
    GetFirestoreStudySessions().then((data) => {
      if (!data) {
        return;
      }
      let totalMinutes = 0;
      // Parse through all sessions:
      Object.keys(data).forEach((key) => {
        totalMinutes += data[key].sessionLength;
      });
      setPastSessionsTotal(totalMinutes);
    });
    GetFirestoreSettings().then((data) => {
      setStudyGoal(data.WeeklyStudyGoal);
    });
    GetFirestoreStreak().then((streak) => {
      setStudyStreak(streak);
    });
  }, []);

  // State and refs to manage time and Timer status
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  // Function to start the Timer
  const startTimer = () => {
    startTimeRef.current = Date.now() - seconds * 1000;
    intervalRef.current = setInterval(() => {
      let secs = Math.floor((Date.now() - startTimeRef.current) / 1000);
      let mins = minutes;
      while (secs >= 60) {
        mins++;
        secs -= 60;
      }
      setSeconds(secs);
      setMinutes(mins);
    }, 1000);
    setRunning(true);
  };
  // Function to pause the Timer
  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };
  // Function to reset the Timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setSeconds(0);
    setMinutes(0);
    setRunning(false);
  };
  // Function to resume the Timer
  const resumeTimer = () => {
    startTimeRef.current = Date.now() - seconds * 1000;
    intervalRef.current = setInterval(() => {
      let secs = Math.floor((Date.now() - startTimeRef.current) / 1000);
      let mins = minutes;
      while (secs >= 60) {
        mins++;
        secs -= 60;
      }
      setSeconds(secs);
      setMinutes(mins);
    }, 1000);
    setRunning(true);
  };
  // Function to save the session data to FireStore via FirebaseFirestore.js
  const onEndConfirm = () => {
    let totalTime = minutes + (seconds >= 30 ? 1 : 0); // Set the session length in minutes
    if (totalTime >= 1) {
      let sessionSubj =
        sessionSubject == "" ? "NONE" : sessionSubject.toUpperCase();
      if (pastSessionsTotal < studyGoal) {
        // If our study goal has not already been met,
        if (pastSessionsTotal + totalTime >= studyGoal) {
          // But this session met the goal,
          UpdateStudyStreak(studyStreak + 1);
        }
      }
      AddStudySession(totalTime, sessionSubj);
      navigation.replace("Navigator");
    } else {
      navigation.replace("Navigator");
    }
  };
  const onEndPress = () => {
    setModalVisible(true);
  };

  const cancelEndSession = () => {
    setModalVisible(false);
    setSessionSubject("");
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [sessionSubject, setSessionSubject] = useState("");

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? darkColor : "white" },
      ]}
    >
      <Modal
        animationType="slide"
        visible={modalVisible}
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
                styles.timeText,
                { color: isDarkMode ? "white" : darkColor },
              ]}
            >
              {
                seconds >= 30
                  ? minutes + 1 + (minutes == 1 ? " Minute " : " Minutes ") // Rounded up
                  : minutes + (minutes == 1 ? " Minute " : " Minutes ") // Rounded Down
              }
            </Text>
            <TextField
              colorTheme={isDarkMode ? "white" : darkColor}
              text={sessionSubject}
              onChangeText={setSessionSubject}
              type={"Session Subject (Optional)"}
            />
            <TouchableOpacity
              style={[
                styles.endSessionConfirmButton,
                { backgroundColor: isDarkMode ? "white" : darkColor },
              ]}
              onPress={() => onEndConfirm()}
            >
              <Text
                style={[
                  styles.modalButtonText,
                  { color: isDarkMode ? darkColor : "white" },
                ]}
              >
                End Session
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.endSessionCancelButton}
              onPress={() => cancelEndSession()}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.timerContainer}>
        <Text
          style={[styles.timeText, { color: isDarkMode ? "white" : darkColor }]}
        >
          {minutes == 0 ? "" : minutes + (minutes == 1 ? " Min " : " Mins ")}
          {seconds} Sec
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {running ? (
          <View style={styles.runningContainer}>
            <TouchableOpacity
              style={[styles.button, styles.pauseButton]}
              onPress={pauseTimer}
            >
              <Text style={[styles.buttonText, { color: "#9999ff" }]}>
                Pause
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={resetTimer}
            >
              <Text style={[styles.buttonText, { color: "#ff0000" }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {
              // If time is not 0, we want the resume button
              seconds != 0 ? (
                <TouchableOpacity
                  style={[styles.button, styles.resumeButton]}
                  onPress={resumeTimer}
                >
                  <Text style={[styles.buttonText, { color: "#33ff33" }]}>
                    Resume
                  </Text>
                </TouchableOpacity>
              ) : (
                // If time is 0, we want the start button
                <>
                  <TouchableOpacity
                    style={[styles.button, styles.startButton]}
                    onPress={startTimer}
                  >
                    <Text style={[styles.buttonText, { color: "#33ff33" }]}>
                      Start
                    </Text>
                  </TouchableOpacity>
                </>
              )
            }
          </View>
        )}
      </View>
      <TouchableOpacity
        style={[
          styles.endSessionButton,
          { borderColor: isDarkMode ? "white" : darkColor },
        ]}
        onPress={onEndPress}
      >
        <Text
          style={[
            styles.endSessionButtonText,
            { color: isDarkMode ? "white" : darkColor },
          ]}
        >
          End Session
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  endSessionWarningText: {
    marginTop: 25,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
  },
  endSessionConfirmButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "black",
    borderRadius: 100,
  },
  endSessionCancelButton: {
    position: "absolute",
    bottom: 0,
    width: "70%",
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7f0000",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 0,
  },
  modalButtonText: {
    color: "#dddddd",
    fontSize: 20,
    fontWeight: "700",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  runningContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  endSessionButton: {
    padding: 10,
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 10,
  },
  endSessionButtonText: {
    fontWeight: "800",
  },
  timerContainer: {
    height: "40%",
    alignContent: "center",
    justifyContent: "flex-end",
  },
  timeText: {
    textAlign: "center",
    fontSize: 48,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 0,
    height: "45%",
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 100,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  startButton: {
    borderColor: "green",
    borderWidth: 7,
    borderRadius: 100,
  },
  resetButton: {
    borderColor: "#af0000",
    borderWidth: 7,
  },
  pauseButton: {
    borderColor: "#7777ff",
    borderWidth: 7,
  },
  resumeButton: {
    borderColor: "green",
    borderWidth: 7,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default Session;
