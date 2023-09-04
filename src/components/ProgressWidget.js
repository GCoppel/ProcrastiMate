import React from 'react'
import { View, Text } from 'react-native'

import HomeStyles from '../styles/HomeStyles'

import ProgressIcon from './ProgressIcon'

const ProgressWidget = () => {
    return (
        <View style={HomeStyles.progressWidget}>
            <ProgressIcon />
            <Text>Progress</Text>
        </View>
    )
}

export default ProgressWidget