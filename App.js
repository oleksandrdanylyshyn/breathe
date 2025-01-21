import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getUserData, clearUserData } from './src/storage/userData';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import StartScreen from './src/screens/StartScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userData, setUserData] = useState(null);
  const [showStartScreen, setShowStartScreen] = useState(true);

  useEffect(() => {
    const userData = getUserData();
    setUserData(userData);
    console.log(userData);
    if (userData && userData.isActive) {
      setShowStartScreen(false);
    } else {
      setShowStartScreen(true);
    }
  }, []);


  return (
    <NavigationContainer>
        <Stack.Navigator>
          {showStartScreen ? (
            <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}
