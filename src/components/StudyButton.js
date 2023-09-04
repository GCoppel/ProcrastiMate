import React from 'react'
import { Text, TouchableHighlight } from 'react-native'

import HomeStyles from '../styles/HomeStyles'

const StudyButton = (props) => {
    function onStudyButtonPress() {
        props.incrementer()
    }
    var touchProps = {
        activeOpacity: 1,
        underlayColor: 'black',
        onShowUnderlay: () => HomeStyles.btnText.color = 'white',
        onPress: onStudyButtonPress
    }
    return (
        <TouchableHighlight style={HomeStyles.studyButtonWrapper}{...touchProps}>
            <Text style={HomeStyles.btnText}>Study</Text>
        </TouchableHighlight>
    )
}

export default StudyButton