import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Image } from "react-native";
import LoginStyles from "../styles/LoginStyles";
import TextField from "../components/TextField";
import { LoginButton, RegisterButton } from "../components/Buttons";
import { auth } from '../firebase/FirebaseInitialize'

const Login = () => {
  const [userEmail, onChangeUserEmail] = React.useState('admin@test.com');
  const [userPassword, onChangeUserPassword] = React.useState('password');
  return (
    <SafeAreaView style={LoginStyles.container}>
      <Image style={LoginStyles.logoImg} source={require('../../assets/Logo_Variants/ProcrastiMate-logos_black.png')} />
      <Text style={LoginStyles.welcome}>Welcome to ProcrastiMate</Text>
      <TextField text={userEmail} onChangeText={onChangeUserEmail} type={"email"} entryType={"email-address"} />
      <TextField text={userPassword} onChangeText={onChangeUserPassword} type={"password"} />
      <LoginButton email={userEmail} password={userPassword}/>
      <RegisterButton email={userEmail} password={userPassword}/>
    </SafeAreaView>
  );
};

export default Login;
