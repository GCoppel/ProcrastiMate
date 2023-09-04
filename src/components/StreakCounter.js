import React from 'react'
import { View, Text } from 'react-native'

import HomeStyles from '../styles/HomeStyles'

const StreakCounter = (props) => {
    let [COUNTER, setCounter] = React.useState(0);
    return (
        <View style={HomeStyles.streakWrapper}>
            <Text style={HomeStyles.streakCounter}>{props.value}</Text>
            <Text style={HomeStyles.streakSubText}>Weeks</Text>
        </View>
    )
}

export default StreakCounter