// src/screens/StartScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { saveUserData, getUserData } from '../storage/userData';
import { combineDateAndTime } from '../utils/dateCalcs';

const StartScreen = ({ navigation }) => {
  const [cigarettesSmoked, setCigarettesSmoked] = useState('');
  const [pricePerPack, setPricePerPack] = useState('');
  const [cigarettesPerPack, setCigarettesPerPack] = useState('');
  const [stoppedSmokingDateTime, setStoppedSmokingDateTime] = useState(new Date());

const [tempDate, setTempDate] = useState(new Date());
const [tempTime, setTempTime] = useState(new Date());

  const onDateChange = (event, selectedValue) => {
    if (event.type === 'set') {
      setTempDate(selectedValue || tempDate);
    }
  };

  const onTimeChange = (event, selectedValue) => {
    if (event.type === 'set') {
      setTempTime(selectedValue || tempTime);
    }
  };

  const handleSubmit = () => {
    const userData = {
      date: new Date().toISOString(),
      cigarettesSmoked: parseInt(cigarettesSmoked),
      pricePerPack: parseFloat(pricePerPack),
      cigarettesPerPack: parseInt(cigarettesPerPack),
      stoppedSmokingDateTime: combineDateAndTime(tempDate, tempTime),
      isActive: true,
    };


    saveUserData(userData);
    console.log("Saved userData", userData);
    // Optionally clear the form after submission
    setCigarettesSmoked('');
    setPricePerPack('');
    setCigarettesPerPack('');
    setTempDate(new Date());
    setTempTime(new Date());
  };

  useEffect(() => {
    getUserData().then(data => {
      console.log("Retrieved user data:", data);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
      <Text>Stopped Smoking Date and Time</Text>
      <View style={styles.dateTimePickerContainer}>
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
        <DateTimePicker
          value={tempTime}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      </View>
      <Text>Selected DateTime: {tempDate.toLocaleDateString()}</Text>

      <Button title="Submit" onPress={handleSubmit} />
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Go to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
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
  dateTimePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
});

export default StartScreen;