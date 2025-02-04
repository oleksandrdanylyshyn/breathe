import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getUserData, clearUserData } from "./src/storage/userData";

// Screens
import HomeScreen from "./src/screens/HomeScreen";
import StartScreen from "./src/screens/StartScreen";
// TODO: find a way to show this while it's loading data
import LoadingScreen from "./src/screens/LoadingScreen";
import AchievementsScreen from "./src/screens/AchievementsScreen";
import TempScreen from "./src/screens/TempScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [isLoadingScreen, SetIsLoadingScreen] = useState(false);

  const handleStartScreenSubmit = () => {
    setShowStartScreen(false);
  };

  useEffect(() => {
    getUserData().then((data) => {
      if (data && data.isActive) {
        setShowStartScreen(false);
      } else {
        setShowStartScreen(true);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {showStartScreen ? (
          <Stack.Screen name="Start" options={{ headerShown: false }}>
            {(props) => (
              <StartScreen {...props} onSubmit={handleStartScreenSubmit} />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Achievements"
              component={AchievementsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TempScreen"
              component={TempScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
