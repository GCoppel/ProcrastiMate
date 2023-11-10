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
  const { colorTheme, textColor, email, password } = props;
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
        //Alert.alert("Login Successful","Logged in with: " + user.email);
      })
      .catch((error) => Alert.alert("Error Logging In", error.message));
  };

  return (
    <Pressable
      style={[LoginStyles.button, LoginStyles.loginButton, {backgroundColor:colorTheme, borderColor: colorTheme}]}
      onPress={handleLogin}
    >
      <Text style={[LoginStyles.buttonTextWhite, {color:textColor}]}>Login</Text>
    </Pressable>
  );
};

const RegisterButton = (props) => {
  const { colorTheme, textColor, email, password } = props;
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
      style={[LoginStyles.button, LoginStyles.registerButton, {backgroundColor: colorTheme, borderColor: textColor}]}
      onPress={handleSignUp}
    >
      <Text style={[LoginStyles.buttonTextBlack, {color:textColor}]}>Register</Text>
    </Pressable>
  );
};

export { LoginButton, RegisterButton };
