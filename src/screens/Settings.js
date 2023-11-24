import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme, Appearance, Modal } from "react-native";
import { useNavigation } from "@react-navigation/core";
import ToggleItem from "../components/ToggleItem";
import TextField from "../components/TextField";
import { auth } from "../firebase/FirebaseInitialize";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { UpdateSettings, GetSettings, UpdateStudyStreak, GetStudyStreak, GetStudySessions } from "../firebase/FirebaseFirestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as frenchLang from "../json/Francais.json"

const COLOR_SCHEME_KEY = "colorScheme";

const Settings = () => {
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

  const navigation = useNavigation();

  const theme = useColorScheme();
  const darkColor = "#222227";

  const [studyStreak, setStudyStreak] = React.useState(1);
  const [pastSessionsTotal, setPastSessionsTotal] = React.useState();

  const [darkModeEnabled, toggleDarkMode] = React.useState(theme === 'dark');
  const [notificationsEnabled, toggleNotifications] = React.useState(false);
  const [negativeReinforcementEnabled, toggleNegativeReinforcement] = React.useState(false);
  const [studyGoal, setStudyGoal] = React.useState("");
  const [oldstudyGoal, setOldStudyGoal] = React.useState("");
  const [language, setLanguage] = React.useState("English");
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

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
      toggleNotifications(data.Notifications);
      toggleNegativeReinforcement(data.NegativeReinforcement);
      setStudyGoal(data.WeeklyStudyGoal);
      setOldStudyGoal(data.WeeklyStudyGoal);
      setLanguage(data.Language)
    });
    GetFirestoreStreak().then((streak) => {
      setStudyStreak(streak);
    })
  }, []);

  const SaveSettings = () => {
    CheckStudyStreakNeedsDecrement();
    UpdateSettings(
      language,
      darkModeEnabled,
      notificationsEnabled,
      negativeReinforcementEnabled,
      studyGoal
    );
  };

  const CheckStudyStreakNeedsDecrement = async () => {
    // If the new study goal would mean that this week's goal was not met, but we've already marked it as met, then we need to decrement it.
    if ((studyGoal > pastSessionsTotal) && (oldstudyGoal <= pastSessionsTotal)){
      UpdateStudyStreak(studyStreak-1)
    }
  }

  const SignOut = async () => {
    signOut(auth);
    navigation.replace("Login");
  };

  const ShowHideLanguageModal = () => {
    setLanguageModalVisible(!languageModalVisible)
  }

  const ChangeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setLanguageModalVisible(false);
  }

  useEffect(() => {
    // Load color scheme preference from AsyncStorage
    AsyncStorage.getItem(COLOR_SCHEME_KEY).then((storedColorScheme) => {
      if (storedColorScheme) {
        toggleDarkMode(storedColorScheme === "dark");
        Appearance.setColorScheme(storedColorScheme);
      }
    });
  }, []);

  const toggleColorScheme = () => {
    toggleDarkMode(!darkModeEnabled);
    const newColorScheme = darkModeEnabled ? "light" : "dark";
    Appearance.setColorScheme(newColorScheme);
    // Save color scheme preference to AsyncStorage
    AsyncStorage.setItem(COLOR_SCHEME_KEY, newColorScheme);
    //console.log(newColorScheme + " " + Appearance.getColorScheme());
  };

  const SettingsList = () => {
    return (
      <>
        <View style={styles.settingsListContainer}>
          <ToggleItem
            colorTheme={darkModeEnabled? '#555555':darkColor}
            enabledTextColor={darkModeEnabled? "white":darkColor}
            disabledTextColor={darkModeEnabled? "#555555":"lightgrey"}
            text={(language == "English")? "Dark Mode":frenchLang.Settings.DarkModeSettingMsg}
            type={"square"}
            isChecked={darkModeEnabled}
            setChecked={toggleColorScheme}
            disabled={false}
          />
          <ToggleItem
            colorTheme={darkModeEnabled? '#555555':darkColor}
            enabledTextColor={darkModeEnabled? "white":darkColor}
            disabledTextColor={darkModeEnabled? "#555555":"lightgrey"}
            text={(language == "English")? "Notifications (Unavailable)":frenchLang.Settings.NotificationsSettingMsg}
            type={"square"}
            isChecked={notificationsEnabled}
            setChecked={toggleNotifications}
            disabled={true}
          />
        </View>
      </>
    );
  };

  return (
    <View style={[styles.container, darkModeEnabled? {backgroundColor: darkColor}:{backgroundColor:'white'}]}>
      <Modal
        animationType="slide"
        visible={languageModalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContentContainer}>
          <View
            style={[
              styles.modalVisiblePanel,
              { backgroundColor: darkModeEnabled ? '#121212' : "white" },
            ]}
          >
            <Text style={[{fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: (darkModeEnabled? 'white':darkColor)}]}>{(language == "English")? "Language: ":frenchLang.Settings.LanguageSettingMsg}</Text>
            <TouchableOpacity onPress={() => ChangeLanguage("English")} style={[styles.languageButton, {borderColor: (darkModeEnabled? 'white':darkColor)}]}>
              <Text style={[{color: (darkModeEnabled? 'white':darkColor)}]}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => ChangeLanguage("Français")} style={[styles.languageButton, {borderColor: (darkModeEnabled? 'white':darkColor)}]}>
              <Text style={[{color: (darkModeEnabled? 'white':darkColor)}]}>Français</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ShowHideLanguageModal} style={[styles.languageModalCancelButton, {borderColor: (darkModeEnabled? 'white':darkColor)}]}>
              <Text style={[{fontSize: 16, fontWeight: 'bold',color: (darkModeEnabled? darkColor:darkColor)}]}>{(language == "English")? "Cancel":frenchLang.Settings.CancelBtn}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={[styles.settingsTitle, darkModeEnabled? {color: 'white'}:{color:'black'}]}>{(language == "English")? "Settings":frenchLang.Settings.SettingsHeaderMsg}</Text>
      <SettingsList />
      <View style={styles.textbox}>
          <Text style={[styles.studyGoalText, darkModeEnabled? {color: 'white'}:{color:'black'}]}>{(language == "English")? "Weekly Study Goal":frenchLang.Settings.WeeklyStudyGoalSettingMsg}</Text>
          <TextField
            colorTheme={darkModeEnabled? "white" : darkColor}
            text={studyGoal}
            onChangeText={setStudyGoal}
            type={"Weekly Study Goal (Minutes)"}
            entryType={'number-pad'}
            characterLimit={3}
          />
      </View>
      <View style={[styles.languageContainer, {marginTop: 0}]}>
        <Text style={[styles.studyGoalText, darkModeEnabled? {color: 'white'}:{color:'black'}]}>{(language == "English")? "Language:":frenchLang.Settings.LanguageSettingMsg}</Text>
        <Text style={[styles.settingsWarning, darkModeEnabled? {color: 'white'}:{color:'black'}]}>{(language == "English")? "Requires app restart":frenchLang.Settings.RequiresRestartMsg}</Text>
        <TouchableOpacity onPress={ShowHideLanguageModal} style={[styles.languageButton, {borderColor: (darkModeEnabled? 'white':darkColor)}]}>
          <Text style={[styles.signOutText, darkModeEnabled? {color: 'white'}:{color:'black'}]}>{language}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.importantButtonsContainer}>
        <TouchableOpacity onPress={SaveSettings} style={[styles.signOutBtn, darkModeEnabled? {backgroundColor: 'white', borderColor: 'white'}:{backgroundColor: darkColor, borderColor: 'white'}]}>
          <Text style={[styles.signOutText, darkModeEnabled? {color: 'black'}:{color:'white'}]}>{(language == "English")? "Save Settings":frenchLang.Settings.SaveBtn}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={SignOut} style={[styles.signOutBtn, darkModeEnabled? {backgroundColor: darkColor, borderColor: 'white'}:{backgroundColor: 'white', borderColor: darkColor}]}>
          <Text style={[styles.signOutText, darkModeEnabled? {color: 'white'}:{color:'black'}]}>{(language == "English")? "Sign Out":frenchLang.Settings.SignOutBtn}</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  importantButtonsContainer: {
    position: 'absolute',
    bottom: 25,
    flexDirection: 'row-reverse',
    backgroundColor: '#121212',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20
  },
  textbox: {
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  languageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25
  },
  settingsTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
  },
  settingsWarning: {
    fontSize: 9,
    fontWeight: '300',
    fontStyle: 'italic',
    margin: 0
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsListContainer: {
    alignItems: "flex-start",
  },
  signOutBtn: {
    width: 150,
    height: 50,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
  },
  languageButton: {
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: "center",
    borderWidth: 1.5,
    borderRadius: 10,
    margin: 5,
  },
  signOutText: {
    color: "white",
    fontWeight: "800",
  },
  toggleItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  toggleItemCheckbox: {
    width: 25,
    height: 25,
  },
  toggleItemText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  toggleItemTextDisabled: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
    color: "lightgrey",
  },
  studyGoalText: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default Settings;
