import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const AchievementsScreen = () => {
    return (
        <SafeAreaView style={globalStyles.mainContainer}>
            <Text>This is the achievements screen!</Text>
        </SafeAreaView>
    )
}

export default AchievementsScreen;