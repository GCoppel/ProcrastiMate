import React from "react";
import { View, Text, TextInput } from "react-native";

import LoginStyles from "../styles/LoginStyles";

const TextField = (props) => {
  const { colorTheme, text, onChangeText, type, entryType, characterLimit } = props;
  return (
    <View>
      <TextInput
        style={[LoginStyles.input, {color: colorTheme, borderColor: colorTheme}]}
        keyboardType={entryType? entryType : 'default'}
        onChangeText={(text) => {onChangeText(text)}}
        placeholder={type}
        placeholderTextColor={"grey"}
        value={text}
        secureTextEntry={type=="password"? true : false}
        maxLength={characterLimit}
      />
    </View>
  );
};

export default TextField;
