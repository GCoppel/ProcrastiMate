import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme, Appearance } from "react-native";
import { useNavigation } from "@react-navigation/core";
import ToggleItem from "../components/ToggleItem";
import TextField from "../components/TextField";
import { auth } from "../firebase/FirebaseInitialize";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { UpdateSettings, GetSettings } from "../firebase/FirebaseFirestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COLOR_SCHEME_KEY = "colorScheme";

const Settings = () => {
  async function GetFirestoreSettings() {
    const firestoreSettings = await GetSettings();
    return firestoreSettings;
  }

  const navigation = useNavigation();

  const theme = useColorScheme();
  const darkColor = "#222227";
  
  const [darkModeEnabled, toggleDarkMode] = React.useState(theme === 'dark');
  const [notificationsEnabled, toggleNotifications] = React.useState(false);
  const [negativeReinforcementEnabled, toggleNegativeReinforcement] = React.useState(false);
  const [studyGoal, setStudyGoal] = React.useState("");

  useEffect(() => {
    GetFirestoreSettings().then((data) => {
      //toggleDarkMode(data.DarkMode);
      toggleNotifications(data.Notifications);
      toggleNegativeReinforcement(data.NegativeReinforcement);
      setStudyGoal(data.WeeklyStudyGoal);
    });
  }, []);

  const SaveSettings = () => {
    UpdateSettings(
      "Francais",
      darkModeEnabled,
      notificationsEnabled,
      negativeReinforcementEnabled,
      studyGoal
    );
  };

  const SignOut = async () => {
    signOut(auth);
    navigation.replace("Login");
  };

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
            text={"Dark Mode"}
            type={"square"}
            isChecked={darkModeEnabled}
            setChecked={toggleColorScheme}
            disabled={false}
          />
          <ToggleItem
            colorTheme={darkModeEnabled? '#555555':darkColor}
            enabledTextColor={darkModeEnabled? "white":darkColor}
            disabledTextColor={darkModeEnabled? "#555555":"lightgrey"}
            text={"Notifications (Unavailable)"}
            type={"square"}
            isChecked={notificationsEnabled}
            setChecked={toggleNotifications}
            disabled={true}
          />
          <ToggleItem
            colorTheme={darkModeEnabled? '#555555':darkColor}
            enabledTextColor={darkModeEnabled? "white":darkColor}
            disabledTextColor={darkModeEnabled? "#555555":"lightgrey"}
            text={"Negative Reinforcement"}
            type={"square"}
            isChecked={negativeReinforcementEnabled}
            setChecked={toggleNegativeReinforcement}
            disabled={false}
          />
        </View>
      </>
    );
  };

  return (
    <View style={[styles.container, darkModeEnabled? {backgroundColor: darkColor}:{backgroundColor:'white'}]}>
      <Text style={[styles.settingsTitle, darkModeEnabled? {color: 'white'}:{color:'black'}]}>Settings</Text>
      <Text style={[styles.settingsWarning, darkModeEnabled? {color: 'white'}:{color:'black'}]}>Note: All settings changes require app restart!</Text>
      <SettingsList />
      <View style={styles.textbox}>
          <Text style={[styles.studyGoalText, darkModeEnabled? {color: 'white'}:{color:'black'}]}>Weekly Study Goal:</Text>
          <TextField
            colorTheme={darkModeEnabled? "white" : darkColor}
            text={studyGoal}
            onChangeText={setStudyGoal}
            type={"Weekly Study Goal (Minutes)"}
            entryType={'number-pad'}
            characterLimit={3}
          />
        </View>
      <TouchableOpacity onPress={SaveSettings} style={[styles.signOutBtn, darkModeEnabled? {backgroundColor: 'white', borderColor: 'white'}:{backgroundColor: darkColor, borderColor: darkColor}]}>
        <Text style={[styles.signOutText, darkModeEnabled? {color: 'black'}:{color:'white'}]}>Save Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={SignOut} style={[styles.signOutBtn, darkModeEnabled? {backgroundColor: darkColor, borderColor: 'white'}:{backgroundColor: 'white', borderColor: darkColor}]}>
        <Text style={[styles.signOutText, darkModeEnabled? {color: 'white'}:{color:'black'}]}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textbox: {
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
  },
  settingsWarning: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 15,
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
    borderWidth: 3,
    borderRadius: 10,
    margin: 10,
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
