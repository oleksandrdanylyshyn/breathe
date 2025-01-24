import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { getUserData } from '../storage/userData';
import { globalStyles } from '../styles/globalStyles';
import { calculateSecondsSince, formatDuration } from '../utils/dateCalcs';

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

  const { years, months, days, hours, minutes, seconds } = formatDuration(elapsedSeconds);

  // function do get the only 4 dates to display
  const generatedBoxes = () => {
    if (years > 0)  {
      return [
        { value: years, unit: `Year${years > 1 ? 's' : ''}` },
        { value: months, unit: `Month${months > 1 ? 's' : ''}` },
        { value: days, unit: `Day${days > 1 ? 's' : ''}` },
        { value: hours, unit: `Hour${hours > 1 ? 's' : ''}` },
      ];
    } else if (months > 0) {
      return [
        { value: months, unit: `Month${months > 1 ? 's' : ''}` },
        { value: days, unit: `Day${days > 1 ? 's' : ''}` },
        { value: hours, unit: `Hour${hours > 1 ? 's' : ''}` },
        { value: minutes, unit: `Minute${minutes > 1 ? 's' : ''}` },
      ];
    } else {
      return [
        { value: days, unit: `Day${days > 1 ? 's' : ''}` },
        { value: hours, unit: `Hour${hours > 1 ? 's' : ''}` },
        { value: minutes, unit: `Minute${minutes > 1 ? 's' : ''}` },
        { value: seconds, unit: `Second${seconds > 1 ? 's' : ''}` },
      ];
    }
  };

  const boxes = generatedBoxes();

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
        <Text style={styles.durationTitle}>FREE SINCE</Text>
        {/*// TODO: Make a way to only show 4 blocks - the 4 higuer that have values. 
        // If non smoker for less than 1 month - day hour minute second
        // If non smoker for over 1 month - month day hour minute
        // If non smoker for over 1 year - year month day hour*/}
        
      <View style={styles.containerDuration}>
        {boxes.map((box, index) => (
          <View key={index} style={styles.boxDuration}>
            <Text style={styles.boxValue}>{box.value}</Text>
            <Text style={styles.boxUnit}>{box.unit}</Text>
          </View>
        ))}
      </View>
      </View>
      ) : (
        <Text>No user data found</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerDuration: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: "10%",
    marginRight: "10%",
  },
  boxDuration: {
    width: "20%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: 'white',
  },
  boxUnit: {
    fontSize: 12,
    color: "gray",
  },
  durationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
    alignSelf: "center"
  }
});

export default HomeScreen;
