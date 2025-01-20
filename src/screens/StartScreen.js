// src/screens/StartScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { saveUserData, getUserData } from '../storage/userData';    

const StartScreen = () => {
  const [cigarettesSmoked, setCigarettesSmoked] = useState('');
  const [pricePerPack, setPricePerPack] = useState('');
  const [cigarettesPerPack, setCigarettesPerPack] = useState('');
  const [stoppedSmokingDate, setStoppedSmokingDate] = useState('');

  const handleSubmit = () => {
    const userData = {
      date: new Date().toISOString(),
      cigarettesSmoked: parseInt(cigarettesSmoked),
      pricePerPack: parseFloat(pricePerPack),
      cigarettesPerPack: parseInt(cigarettesPerPack),
      stoppedSmokingDate: stoppedSmokingDate || null,
    };

    saveUserData(userData);
    // Optionally clear the form after submission
    setCigarettesSmoked('');
    setPricePerPack('');
    setCigarettesPerPack('');
    setStoppedSmokingDate('');
    console.log("User data saved:", userData);
  };

  useEffect(() => {
    getUserData().then(data => {
      console.log("Retrieved user data:", data);
    });
  }, []);

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
        <View style={globalStyles.container}>
      <Text style={styles.title}>Smoking Data Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Cigarettes Smoked"
        keyboardType="numeric"
        value={cigarettesSmoked}
        onChangeText={setCigarettesSmoked}
      />
      <TextInput
        style={styles.input}
        placeholder="Price per Pack"
        keyboardType="numeric"
        value={pricePerPack}
        onChangeText={setPricePerPack}
      />
      <TextInput
        style={styles.input}
        placeholder="Cigarettes per Pack"
        keyboardType="numeric"
        value={cigarettesPerPack}
        onChangeText={setCigarettesPerPack}
      />
      <TextInput
        style={styles.input}
        placeholder="Stopped Smoking Date (YYYY-MM-DD)"
        value={stoppedSmokingDate}
        onChangeText={setStoppedSmokingDate}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
});

export default StartScreen;