// src/screens/StartScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { saveUserData, getUserData } from '../storage/userData';
import { combineDateAndTime } from '../utils/dateCalcs';
import { globalStyles } from '../styles/globalStyles';

const StartScreen = (props) => {
  const [cigarettesSmoked, setCigarettesSmoked] = useState('');
  const [pricePerPack, setPricePerPack] = useState('');
  const [cigarettesPerPack, setCigarettesPerPack] = useState('');

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

    props.onSubmit();
  };

  useEffect(() => {
    getUserData().then(data => {
      console.log("Retrieved user data:", data);
    });
  }, []);

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
        <View style={styles.logoContainer}>
            <Image source={require('../assets/breathe-logo.png')} style={styles.logo} />
        </View>
        <View style={styles.container}>
      <Text style={styles.title}>Let's get started!</Text>
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
      <Text style={styles.dateTimePickerTitle}>When did you stop smoking?</Text>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.buttonText}>Start now!</Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '-10%',
    padding: "2%",

  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-10%',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    width: '70%',
    padding: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  logo: {
    width: 300,
    height: 300,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 15,
    borderRadius: 20,
    width: '70%',
    alignSelf: 'center',
  },
  dateTimePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  dateTimePickerTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default StartScreen;