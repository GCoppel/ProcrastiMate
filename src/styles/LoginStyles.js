import React from "react";
import { StyleSheet } from "react-native";

const LoginStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  logoImg: {
    resizeMode: 'contain',
    height: "35%",
  },
  welcome: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 3,
    paddingHorizontal: 10,
    width: 200,
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    paddingVertical: 5,
    width: 120,
    borderRadius: 5,
    marginVertical: 5,
    borderWidth: 1,
  },
  loginButton: {
    backgroundColor: 'black',
  },
  registerButton: {
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default LoginStyles;
