// src/screens/StartScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { saveUserData, getUserData } from "../storage/userData";
import { combineDateAndTime } from "../utils/dateCalcs";
import { globalStyles } from "../styles/globalStyles";

const StartScreen = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [cigarettesSmoked, setCigarettesSmoked] = useState("15");
  const [pricePerPack, setPricePerPack] = useState("5");
  const [cigarettesPerPack, setCigarettesPerPack] = useState("20");
  const [tempDate, setTempDate] = useState(new Date());
  const [tempTime, setTempTime] = useState(new Date());

  const steps = [
    {
      title: "Daily Cigarettes",
      question: "How many cigarettes do you smoke per day?",
      input: (
        <TextInput
          style={styles.input}
          placeholder="Cigarettes Smoked"
          keyboardType="numeric"
          value={cigarettesSmoked}
          onChangeText={setCigarettesSmoked}
        />
      ),
    },
    {
      title: "Pack Information",
      question: "How many cigarettes are in a pack?",
      input: (
        <TextInput
          style={styles.input}
          placeholder="Cigarettes per Pack"
          keyboardType="numeric"
          value={cigarettesPerPack}
          onChangeText={setCigarettesPerPack}
        />
      ),
    },
    {
      title: "Pack Price",
      question: "What's the price of one pack?",
      input: (
        <TextInput
          style={styles.input}
          placeholder="Price per Pack"
          keyboardType="numeric"
          value={pricePerPack}
          onChangeText={setPricePerPack}
        />
      ),
    },
    {
      title: "Quit Date",
      question: "When did you stop smoking?",
      input: (
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
      ),
    },
  ];

  const onDateChange = (event, selectedValue) => {
    if (event.type === "set") {
      setTempDate(selectedValue || tempDate);
    }
  };

  const onTimeChange = (event, selectedValue) => {
    if (event.type === "set") {
      setTempTime(selectedValue || tempTime);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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
    props.onSubmit();
  };

  useEffect(() => {
    getUserData().then((data) => {
      console.log("Retrieved user data:", data);
    });
  }, []);

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/breathe-logo.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>{steps[currentStep].title}</Text>
        <Text style={styles.question}>{steps[currentStep].question}</Text>

        <View style={styles.inputContainer}>{steps[currentStep].input}</View>

        <View style={styles.buttonGroup}>
          {currentStep > 0 && (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleBack}
            >
              <Text style={styles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
            <Text style={styles.primaryButtonText}>
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index <= currentStep ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "0%",
    padding: "2%",
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  stepTitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 5,
  },
  question: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#444",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-10%",
  },
  inputContainer: {
    minHeight: 120,
    justifyContent: "center",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 25,
    paddingLeft: 20,
    borderRadius: 25,
    width: "80%",
    alignSelf: "center",
    fontSize: 16,
  },
  dateTimePickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 15,
  },
  primaryButton: {
    backgroundColor: "#D81B60",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 35,
    minWidth: 120,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 35,
    minWidth: 120,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    gap: 8,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activeDot: {
    backgroundColor: "#D81B60",
  },
  inactiveDot: {
    backgroundColor: "#ddd",
  },
  logo: {
    width: 250,
    height: 250,
  },
});

export default StartScreen;
