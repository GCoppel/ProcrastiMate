import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import ToggleItem from "../components/ToggleItem";
import { auth } from "../firebase/FirebaseInitialize";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { UpdateSettings } from "../firebase/FirebaseFirestore";

const Settings = () => {
  const navigation = useNavigation();

  const SaveSettings = () => {
    UpdateSettings("Anglais", true, false, false)
  }

  const SignOut = () => {
    console.log("Signing out user");
    signOut(auth);
    navigation.replace("Login");
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

const SettingsList = () => {
  return (
    <View style={styles.settingsListContainer}>
      <ToggleItem text={"Dark Mode"} defaultState={false} disabled={true} />
      <ToggleItem text={"Notifications"} defaultState={true} disabled={false} />
      <ToggleItem text={"Negative Reinforcement"} defaultState={false} disabled={false} />
      <ToggleItem
        text={"Third Setting"}
        defaultState={false}
        disabled={false}
      />
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
});

export default Settings;
