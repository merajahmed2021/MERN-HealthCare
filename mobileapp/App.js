import { StatusBar } from 'expo-status-bar';
import React ,{useEffect,useState}from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnboardingScreen from './containers/Auth/OnboardingScreen';
import LoginScreen from './containers/Auth/LoginScreen';
import SignupScreen from './containers/Auth/SignupScreen';
import PatientTab from './containers/Patient/PatientHomeMain';

 
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Onboarding" headerMode="none">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="BottomScreen" component={PatientTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;