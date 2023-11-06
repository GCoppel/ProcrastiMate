import React, { useEffect, useState } from "react";
import { Text, Pressable, Alert } from "react-native";
import LoginStyles from "../styles/LoginStyles";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase/FirebaseInitialize";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { SetDefaultSettings } from "../firebase/FirebaseFirestore";

const LoginButton = (props) => {
  const { email, password } = props;
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Navigator");
      }
    });

    return unsubscribe; //Stop listening for authentication change
  }, []);
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        Alert.alert("Login Successful","Logged in with: " + user.email);
      })
      .catch((error) => Alert.alert("Error Logging In", error.message));
  };

  return (
    <Pressable
      style={[LoginStyles.button, LoginStyles.loginButton]}
      onPress={handleLogin}
    >
      <Text style={LoginStyles.buttonTextWhite}>Login</Text>
    </Pressable>
  );
};

const RegisterButton = (props) => {
  const { email, password } = props;
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Navigator");
      }
    });

    return unsubscribe; //Stop listening for authentication change
  }, []);
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        alert("Successfully registered with: " + user.email);
        SetDefaultSettings();
      })
      .catch((error) => alert(error.message));
  };
  return (
    <Pressable
      style={[LoginStyles.button, LoginStyles.registerButton]}
      onPress={handleSignUp}
    >
      <Text style={LoginStyles.buttonTextBlack}>Register</Text>
    </Pressable>
  );
};

export { LoginButton, RegisterButton };
