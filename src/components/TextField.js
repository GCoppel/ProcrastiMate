import React from "react";
import { View, Text, TextInput } from "react-native";

import LoginStyles from "../styles/LoginStyles";

const TextField = (props) => {
  const { text, onChangeText, type, entryType } = props;
  return (
    <View>
      <TextInput
        style={LoginStyles.input}
        keyboardType={entryType=="number-pad"? 'number-pad' : 'default'}
        onChangeText={(text) => {onChangeText(text)}}
        placeholder={type}
        value={text}
        maxLength={entryType=="default"? 25 : 1}
      />
    </View>
  );
};

export default TextField;
