import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import ToggleItem from "../components/ToggleItem";
import { auth } from "../firebase/FirebaseInitialize";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { UpdateSettings, GetSettings } from "../firebase/FirebaseFirestore";

const Settings = () => {
  async function GetFirestoreSettings() {
    const firestoreSettings = await GetSettings();
    console.log(firestoreSettings.Language)
    return firestoreSettings.DarkMode
  }

  const navigation = useNavigation();

  const [darkModeEnabled, toggleDarkMode ] = React.useState(GetFirestoreSettings.DarkMode)
  const [notificationsEnabled, toggleNotifications ] = React.useState(GetFirestoreSettings.Notifications)
  const [negativeReinforcementEnabled, toggleNegativeReinforcement ] = React.useState(GetFirestoreSettings.NegativeReinforcement)

  const SaveSettings = () => {
    UpdateSettings("Francais", darkModeEnabled, notificationsEnabled, negativeReinforcementEnabled)
  }

  const SignOut = async () => {
    signOut(auth);
    navigation.replace("Login");
  };

  const SettingsList = () => {
    return (
      <View style={styles.settingsListContainer}>
        <ToggleItem text={"Dark Mode"} isChecked={darkModeEnabled} setChecked={toggleDarkMode} defaultState={false} disabled={true} />
        <ToggleItem text={"Notifications"} isChecked={notificationsEnabled} setChecked={toggleNotifications} defaultState={true} disabled={false} />
        <ToggleItem text={"Negative Reinforcement"} isChecked={negativeReinforcementEnabled} setChecked={toggleNegativeReinforcement} defaultState={false} disabled={false} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.settingsTitle}>Settings</Text>
      <SettingsList />
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
  settingsTitle: {
    fontSize: 30,
    fontWeight: "bold",
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
});

export default Settings;
