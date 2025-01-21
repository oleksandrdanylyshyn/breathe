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
    const fetchData = async () => {
      const data = await getUserData();
      setUserData(data);
      if (data && data.stoppedSmokingDate) {
        // Calculate initial seconds since stopped smoking
        const initialSeconds = calculateSecondsSince(data.stoppedSmokingDate);
        setElapsedSeconds(initialSeconds);
        setShowData(true);
      } else {
        setShowData(false);
      }
    };

    fetchData();

    // Set up interval to update elapsed seconds every second
    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      {showData ? (
        <View style={globalStyles.container}>
          <Text>{userData.date}</Text>
          <Text>{userData.cigarettesSmoked} cigarettes smoked</Text>
          <Text>{userData.pricePerPack}€ per pack</Text>
          <Text>{userData.cigarettesPerPack} cigarettes per pack</Text>
          <Text>{userData.stoppedSmokingDate} stopped smoking</Text>
          <Text>{userData.stoppedSmokingTime} stopped smoking</Text>
        </View>
      ) : (
        <Text>No user data found</Text>
      )}
      { showData ? (
        <View style={globalStyles.container}>
          <Text>Non smoker since</Text>
          <Text>{calculateSecondsSince(userData.stoppedSmokingDate)} seconds</Text>
        </View>
      ) : (
        <Text>No user data found</Text>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
