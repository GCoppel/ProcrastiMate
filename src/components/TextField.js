import React from "react";
import { View, Text, TextInput } from "react-native";

import LoginStyles from "../styles/LoginStyles";

const TextField = (props) => {
  const { text, onChangeText, type, entryType } = props;
  return (
    <View>
      <TextInput
        style={LoginStyles.input}
        keyboardType={entryType? entryType : 'default'}
        onChangeText={(text) => {onChangeText(text)}}
        placeholder={type}
        value={text}
        secureTextEntry={type=="password"? true : false}
        maxLength={entryType=="number-pad"? 1 : 25}
      />
    </View>
  );
};

export default TextField;
