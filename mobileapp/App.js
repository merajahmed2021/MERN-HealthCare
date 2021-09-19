import { StatusBar } from 'expo-status-bar';
import React ,{useEffect,useState}from 'react';

import {db,db2} from './config';

import { StyleSheet, Text, View,Button, } from 'react-native';

import 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnboardingScreen from './screen/OnboardingScreen';
import SignupScreen from './screen/LoginDoctorScreen';
import LoginScreen from './screen/LoginScreen';
import Phoneauth from './screen/PhoneauthScreen';

import PatientScreen from './screen/PatientHomeMain';

import DoctorScreen from './screen/DoctorHomeMain';
import InstructionScreen from './screen/InstructionScreen';
import RegistrationformScreen from './screen/RegisterFormScreen';
import RegistrationfinalScreen from './screen/RegisterationFinalScreen';
import PhoneAuthScreen from './screen/PhoneauthScreen';
 
const Stack = createStackNavigator();



function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Onboarding" headerMode="none">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Phoneauth" component={PhoneAuthScreen} />
        <Stack.Screen name="PatientUser" component={PatientScreen} />
        <Stack.Screen name="DoctorUser" component={DoctorScreen} />
        <Stack.Screen name="DoctorInstruction" component={InstructionScreen} />
        <Stack.Screen name="DoctorRegistertation" component={RegistrationformScreen} />
        <Stack.Screen name="DoctorRegistertationfinal" component={RegistrationfinalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;