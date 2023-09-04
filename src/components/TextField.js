import React from "react";
import { View, Text, TextInput } from "react-native";

import LoginStyles from "../styles/LoginStyles";

const TextField = (props) => {
  const { text, onChangeText, type } = props;
  return (
    <View>
      <TextInput
        style={LoginStyles.input}
        onChangeText={(text) => {onChangeText(text)}}
        placeholder={type}
        value={text}
        maxLength={25}
      />
    </View>
  );
};

export default TextField;
