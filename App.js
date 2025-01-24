import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getUserData, clearUserData } from './src/storage/userData';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import StartScreen from './src/screens/StartScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [showStartScreen, setShowStartScreen] = useState(true);

  const handleStartScreenSubmit = () => {
    setShowStartScreen(false);
  };

  useEffect(() => {
    getUserData().then(data => {
      if (data && data.isActive) {
        setShowStartScreen(false);
      } else {
        setShowStartScreen(true);
      }
    });
  }, []);


  // TODO: CHeck this in the future - when I already have data save it appears to briefly show the startscreen.
  return (
    <NavigationContainer>
        <Stack.Navigator>
          {showStartScreen ? (
            <Stack.Screen name="Start" options={{ headerShown: false }}>
              {props => <StartScreen {...props} onSubmit={handleStartScreenSubmit} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}
