import React, { useEffect } from "react";
import { SafeAreaView, useState, Text, TouchableOpacity, Image, useColorScheme, Appearance } from "react-native";
import LoginStyles from "../styles/LoginStyles";
import TextField from "../components/TextField";
import { LoginButton, RegisterButton } from "../components/Buttons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COLOR_SCHEME_KEY = "colorScheme";

const Login = () => {
  const [userEmail, onChangeUserEmail] = React.useState('admin@test.com');
  const [userPassword, onChangeUserPassword] = React.useState('password');

  const theme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = React.useState(theme === 'dark');

  const darkColor = '#242424'

  useEffect(() => {
    // Load color scheme preference from AsyncStorage
    AsyncStorage.getItem(COLOR_SCHEME_KEY).then((storedColorScheme) => {
      if (storedColorScheme) {
        setIsDarkMode(storedColorScheme === "dark");
        Appearance.setColorScheme(storedColorScheme);
      }
    });
  }, []);

  const toggleColorScheme = () => {
    setIsDarkMode(!isDarkMode);
    const newColorScheme = isDarkMode ? 'light' : 'dark';
    Appearance.setColorScheme(newColorScheme);
    // Save color scheme preference to AsyncStorage
    AsyncStorage.setItem(COLOR_SCHEME_KEY, newColorScheme);
    //console.log(newColorScheme + " " + Appearance.getColorScheme());
  };

  return (
    <SafeAreaView style={[LoginStyles.container, isDarkMode? {backgroundColor: darkColor} : {backgroundColor: 'white'}]}>
      <Image style={LoginStyles.logoImg} source={isDarkMode? require('../../assets/Logo_Variants/ProcrastiMate-logos_white.png') : require('../../assets/Logo_Variants/ProcrastiMate-logos_black.png')} />
      <Text style={[LoginStyles.welcome, isDarkMode? {color: 'white'}: {color: 'black'}]}>Welcome to ProcrastiMate</Text>
      <TextField colorTheme={isDarkMode? 'white':darkColor} text={userEmail} onChangeText={onChangeUserEmail} type={"email"} entryType={"email-address"} characterLimit={50} />
      <TextField colorTheme={isDarkMode? 'white':darkColor} text={userPassword} onChangeText={onChangeUserPassword} type={"password"} characterLimit={25} />
      <LoginButton colorTheme={isDarkMode? 'white':darkColor} textColor={isDarkMode? 'black':'white'} email={userEmail} password={userPassword}/>
      <RegisterButton colorTheme={isDarkMode? darkColor:'white'} textColor={isDarkMode? 'white':'black'} email={userEmail} password={userPassword}/>
      <TouchableOpacity onPress={toggleColorScheme}>
        <Text style={[ isDarkMode? {color: 'white'}: {color: 'black'}]}>Toggle Color Scheme</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
