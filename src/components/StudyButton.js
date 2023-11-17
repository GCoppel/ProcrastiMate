import React from "react";
import { Text, TouchableHighlight } from "react-native";
import { AddStudySession } from "../firebase/FirebaseFirestore";
import HomeStyles from "../styles/HomeStyles";
import Animated, { FadeIn, FadeOut, withDelay } from "react-native-reanimated";

<Animated.View
  key={"uniqueKey"}
  entering={FadeIn.duration(400)}
  exiting={FadeOut.duration(400)}
/>;

const StudyButton = (props) => {
  function onStudyButtonPress() {
    //props.incrementer()
    //console.log("study button pressed");
    //AddStudySession(10, "SUPER")
    props.openSessionPage();
  }
  var touchProps = {
    activeOpacity: 1,
    underlayColor: "grey",
    onShowUnderlay: () => (HomeStyles.btnText.color = "white"),
    onPress: onStudyButtonPress,
  };
  return (
    <Animated.View
      key={"uniqueKey"}
      entering={FadeIn.duration(1000)}
    >
      <TouchableHighlight style={HomeStyles.studyButton} {...touchProps}>
        <Text style={HomeStyles.btnText}>Study</Text>
      </TouchableHighlight>
    </Animated.View>
  );
};

export default StudyButton;
