import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { getUserData } from '../storage/userData';
import { globalStyles } from '../styles/globalStyles';
import { calculateSecondsSince } from '../utils/dateCalcs';

const HomeScreen = () => {
  const [userData, setUserData] = useState(null);
  const [showData, setShowData] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    getUserData().then(data => {
      console.log("data", data);
      setUserData(data); // Set user data
    });
  }, []);

  useEffect(() => {
      if (userData && userData.stoppedSmokingDateTime) {
        // Calculate initial seconds since stopped smoking
        const initialSeconds = calculateSecondsSince(userData.stoppedSmokingDateTime);
        setElapsedSeconds(initialSeconds);
        setShowData(true);
      } else {
        setShowData(false);
      }
    

    // Set up interval to update elapsed seconds every second
    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [userData]);

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      {showData ? (
        <View style={globalStyles.container}>
          <Text>{userData.cigarettesSmoked} cigarettes smoked</Text>
          <Text>{userData.pricePerPack}€ per pack</Text>
          <Text>{userData.cigarettesPerPack} cigarettes per pack</Text>
          <Text>{userData.stoppedSmokingDateTime} stopped smoking</Text>
        </View>
      ) : (
        <Text>No user data found</Text>
      )}
      { showData ? (
        <View style={globalStyles.container}>
          <Text>Non smoker since</Text>
          <Text>{elapsedSeconds} seconds</Text>
        </View>
      ) : (
        <Text>No user data found</Text>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
