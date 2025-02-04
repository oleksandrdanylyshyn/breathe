import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { getUserData } from "../storage/userData";
import { globalStyles, menuStyles } from "../styles/globalStyles";
import { calculateSecondsSince, formatDuration } from "../utils/dateCalcs";
import { moneySavedSinceEnd } from "../utils/moneyCalcs";
import { squaresData } from "../storage/homeScreenData";

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [showData, setShowData] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [moneySaved, setMoneySaved] = useState(0);

  useEffect(() => {
    getUserData().then((data) => {
      console.log("data", data);
      setUserData(data); // Set user data
    });
  }, []);

  useEffect(() => {
    if (userData && userData.stoppedSmokingDateTime) {
      // Calculate initial seconds since stopped smoking
      const initialSeconds = calculateSecondsSince(
        userData.stoppedSmokingDateTime
      );
      // Calculate money saved since stopped smoking
      const initialMoneySaved = moneySavedSinceEnd(
        initialSeconds,
        userData.cigarettesSmoked,
        userData.cigarettesPerPack,
        userData.pricePerPack
      );

      setMoneySaved(initialMoneySaved);
      setElapsedSeconds(initialSeconds);
      setShowData(true);

      const savingsPerMinute = moneySavedSinceEnd(
        60,
        userData.cigarettesSmoked,
        userData.cigarettesPerPack,
        userData.pricePerPack
      );

      // Set up interval to update saved money every minute
      const intervalMoney = setInterval(() => {
        setMoneySaved((prev) => prev + savingsPerMinute);
      }, 60000);

      // Set up interval to update elapsed seconds every second
      const intervalTime = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(intervalTime);
        clearInterval(intervalMoney);
      };
    }
  }, [userData]);

  const handlePress = (screenName) => {
    navigation.navigate(screenName);
  };
  const { years, months, days, hours, minutes, seconds } =
    formatDuration(elapsedSeconds);

  // function do get the only 4 dates to display
  // FIXME: remove this code from here
  const generatedBoxes = () => {
    if (years > 0) {
      return [
        { value: years, unit: `Year${years > 1 ? "s" : ""}` },
        { value: months, unit: `Month${months > 1 ? "s" : ""}` },
        { value: days, unit: `Day${days > 1 ? "s" : ""}` },
        { value: hours, unit: `Hour${hours > 1 ? "s" : ""}` },
      ];
    } else if (months > 0) {
      return [
        { value: months, unit: `Month${months > 1 ? "s" : ""}` },
        { value: days, unit: `Day${days > 1 ? "s" : ""}` },
        { value: hours, unit: `Hour${hours > 1 ? "s" : ""}` },
        { value: minutes, unit: `Minute${minutes > 1 ? "s" : ""}` },
      ];
    } else {
      return [
        { value: days, unit: `Day${days > 1 ? "s" : ""}` },
        { value: hours, unit: `Hour${hours > 1 ? "s" : ""}` },
        { value: minutes, unit: `Minute${minutes > 1 ? "s" : ""}` },
        { value: seconds, unit: `Second${seconds > 1 ? "s" : ""}` },
      ];
    }
  };

  const boxes = generatedBoxes();

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      {showData ? (
        <View style={globalStyles.container}>
          <View style={styles.containerMoney}>
            <Text style={styles.moneySavedText}>Money saved</Text>
            <Text style={styles.unitText}>{moneySaved.toFixed(2)} €</Text>
          </View>
          <Text style={styles.durationTitle}>FREE SINCE</Text>
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
      // In your HomeScreen component's return statement:
      <View style={menuStyles.container}>
        <View style={menuStyles.grid}>
          {squaresData.map((square, index) => {
            // Customize the Money Saved square
            const isMoneySquare = square.text === "Money Saved";

            return (
              <TouchableOpacity
                key={square.id}
                style={[
                  menuStyles.square,
                  {
                    marginRight: index % 2 === 0 ? "4%" : 0,
                    marginBottom: "4%",
                  },
                ]}
                onPress={() => handlePress(square.screen)}
              >
                {/* Show either dynamic money value or regular text */}
                <Text style={menuStyles.text}>{square.text}</Text>
                <Image source={square.image} style={menuStyles.image} />

                {isMoneySquare && (
                  <Text style={menuStyles.subText}>
                    `${moneySaved.toFixed(2)}€`
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerDuration: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: "10%",
    marginRight: "10%",
  },
  boxDuration: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  boxValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  boxUnit: {
    fontSize: 12,
    color: "gray",
  },
  durationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
    alignSelf: "center",
  },
  containerMoney: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 30,
  },
  unitText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
  },
  moneySavedText: {
    fontSize: 16,
    color: "gray",
  },
});

export default HomeScreen;
