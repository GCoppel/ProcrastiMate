import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text>Hello!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default Settings;
