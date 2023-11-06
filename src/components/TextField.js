import React from "react";
import { View, Text, TextInput } from "react-native";

import LoginStyles from "../styles/LoginStyles";

const TextField = (props) => {
  const { text, onChangeText, type, entryType, characterLimit } = props;
  return (
    <View>
      <TextInput
        style={LoginStyles.input}
        keyboardType={entryType? entryType : 'default'}
        onChangeText={(text) => {onChangeText(text)}}
        placeholder={type}
        value={text}
        secureTextEntry={type=="password"? true : false}
        maxLength={characterLimit}
      />
    </View>
  );
};

export default TextField;
