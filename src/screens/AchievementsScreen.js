import React, { useMemo, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import convertGoalsToSeconds from "../utils/convertGoalsToSeconds";
import { globalStyles } from "../styles/globalStyles";
import { getUserData } from "../storage/userData";
import { calculateSecondsSince } from "../utils/dateCalcs";

const AchievementsScreen = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const allGoals = useMemo(() => convertGoalsToSeconds(), []);

  useEffect(() => {
    getUserData()
      .then((data) => {
        setUserData(data || { stoppedSmokingDateTime: new Date() }); // Fallback
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, []);

  // Handle null/undefined case gracefully
  const secondsSinceStopped = calculateSecondsSince(
    userData?.stoppedSmokingDateTime || new Date()
  );

  const renderItem = ({ item }) => {
    const isUnlocked = secondsSinceStopped >= item.requiredSeconds;
    return (
      <SafeAreaView style={globalStyles.mainContainer}>
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: isUnlocked ? "#4CAF50" : "#BDBDBD" }, // Green for unlocked, gray for locked
          ]}
        />
        <View style={styles.goalTextContainer}>
          <Text style={[styles.achievement, isUnlocked && styles.unlockedText]}>
            {item.achievement}
          </Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <View style={globalStyles.mainContainer}>
      <FlatList
        data={allGoals}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.category}-${item.goal}-${index}`}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    margin: 0,
  },
  goalContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statusIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  goalTextContainer: {
    flex: 1,
  },
  achievement: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#424242", // Default gray for locked
  },
  unlockedText: {
    color: "#000000", // Black for unlocked
  },
  description: {
    fontSize: 14,
    color: "#757575", // Lighter gray for description
  },
});

export default AchievementsScreen;
