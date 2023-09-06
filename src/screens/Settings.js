import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase";
import {
    signOut,
    onAuthStateChanged,
  } from "firebase/auth";

const Settings = () => {
    const [isChecked, setChecked] = useState(false);
    const navigation = useNavigation();

    const SignOut = () => {
        console.log("Signing out user")
        signOut(auth)
        navigation.replace("Login")
    }

  return (
    <View style={styles.container}>
      <Text>Hello!</Text>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        disabled={true}
        onValueChange={setChecked}
        color={isChecked ? "#000" : undefined}
      />
      <TouchableOpacity onPress={SignOut} style={styles.signOutBtn}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    width: 25,
    height: 25
  },
  signOutBtn: {
    width: 150,
    height: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10
  },
  signOutText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default Settings;
