import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import ToggleItem from "../components/ToggleItem";
import TextField from "../components/TextField";
import { auth } from "../firebase/FirebaseInitialize";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { UpdateSettings, GetSettings } from "../firebase/FirebaseFirestore";

const Settings = () => {
  async function GetFirestoreSettings() {
    const firestoreSettings = await GetSettings();
    return firestoreSettings;
  }

  const navigation = useNavigation();

  const [darkModeEnabled, toggleDarkMode] = React.useState(false);
  const [notificationsEnabled, toggleNotifications] = React.useState(false);
  const [negativeReinforcementEnabled, toggleNegativeReinforcement] = React.useState(false);
  const [studyGoal, setStudyGoal] = React.useState("");

  useEffect(() => {
    GetFirestoreSettings().then((data) => {
      toggleDarkMode(data.DarkMode);
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

  const SettingsList = () => {
    return (
      <>
        <View style={styles.settingsListContainer}>
          <ToggleItem
            text={"Dark Mode"}
            type={"square"}
            isChecked={darkModeEnabled}
            setChecked={toggleDarkMode}
            disabled={true}
          />
          <ToggleItem
            text={"Notifications"}
            type={"square"}
            isChecked={notificationsEnabled}
            setChecked={toggleNotifications}
            disabled={false}
          />
          <ToggleItem
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
    <View style={styles.container}>
      <Text style={styles.settingsTitle}>Settings</Text>
      <SettingsList />
      <View style={styles.textbox}>
          <Text style={styles.studyGoalText}>Weekly Study Goal:</Text>
          <TextField
            text={studyGoal}
            onChangeText={setStudyGoal}
            type={"Weekly Study Goal (Minutes)"}
            entryType={'number-pad'}
            characterLimit={3}
          />
        </View>
      <TouchableOpacity onPress={SaveSettings} style={styles.signOutBtn}>
        <Text style={styles.signOutText}>Save Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={SignOut} style={styles.signOutBtn}>
        <Text style={styles.signOutText}>Sign Out</Text>
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
    borderRadius: 10,
    margin: 10,
  },
  signOutText: {
    color: "white",
    fontWeight: "bold",
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
