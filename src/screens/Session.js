import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/core";

const Session = () => {
  const [userEmail, onChangeUserEmail] = React.useState('admin@test.com');
  const [userPassword, onChangeUserPassword] = React.useState('password');
  navigation = useNavigation();
  const onEndPress = () => {
    navigation.replace("Navigator")
  }
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.endSessionButton}
        onPress={onEndPress}
      >
        <Text style={styles.endSessionButtonText}>End Session</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  endSessionButton: {
    padding: 10,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 10
  },
  endSessionButtonText: {
    fontWeight: '800'
  }
})

export default Session;
