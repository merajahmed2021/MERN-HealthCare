import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Button, } from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import { createStackNavigator } from '@react-navigation/stack';

import HomeBottombar from './PatientBottomBar';
import NotificationScreen from './Patient/NotificationScreen';
import DoctorProfileScreen from './Patient/DoctorProfileScreen';
import AppointmentScreen from './Patient/AppointmentScreen';
import AppointmentFinalScreen from './Patient/AppointmentFinalScreen';
import CategoryScreen from './Patient/CategoryScreen';
import CategoryDoctorScreen from './Patient/CategoryDoctorScreen';
import BlogScreen from './Patient/BlogScreen';
import BlogDetailScreen from './Patient/BlogDetailScreen';
import AppointmentHistoryScreen from './Patient/AppointmentHistoryScreen';



const HomeStack = createStackNavigator();

const AllPatientHome = ({navigation}) => {
    return (
        <HomeStack.Navigator  initialRouteName="BottomBar"  >
        <HomeStack.Screen name="BottomBar" component={HomeBottombar} 
          options={{
              headerLeft: null,
              headerRight: () => (
                <View style={{flexDirection:"row"}}>
                    <Icon.Button name='notifications-sharp' size={26}  
                      backgroundColor='#694fad'
                      color= 'white'
                      onPress={() => navigation.navigate("Notifications")}
                    ></Icon.Button>
                </View>
                ),
                title: 'Doctor Connect',
                headerStyle: {elevation:0,backgroundColor:'#694fad'},
                headerTitleStyle: {color:'white',fontSize:20,}
              }} 
        />
        <HomeStack.Screen name="DoctorProfile" component={DoctorProfileScreen} 
            options={{
               headerStyle: {elevation:0,backgroundColor:'#694fad'},
               headerTitleStyle: {color:'white',fontSize:20,display:'none'}
             }} 
        />
        <HomeStack.Screen name="Appointment" component={AppointmentScreen} 
            options={{
              title:"Patient's Appointment",
               headerStyle: {elevation:0,backgroundColor:'#694fad'},
               headerTitleStyle: {color:'white',fontSize:20}
             }} 
        />
        <HomeStack.Screen name="Appointmentfinal" component={AppointmentFinalScreen} 
            options={{
              title:"Appointment Successfull",
               headerStyle: {elevation:0,backgroundColor:'#694fad'},
               headerTitleStyle: {color:'white',fontSize:20}
             }} 
        />
        <HomeStack.Screen name="Category" component={CategoryScreen} 
            options={{
               title: 'Choose Category',
               headerStyle: {elevation:0,backgroundColor:'#694fad'},
               headerTitleStyle: {color:'white',fontSize:20}
             }} 
        />
        <HomeStack.Screen name="CategoryDoctor" component={CategoryDoctorScreen} 
            options={{
              title: 'Doctor by Category',
               headerStyle: {elevation:0,backgroundColor:'#694fad'},
               headerTitleStyle: {color:'white',fontSize:20}
             }} 
        />
        <HomeStack.Screen name="Notifications" component={NotificationScreen} 
            options={{
               title: 'Latest Notifications',
               headerStyle: {elevation:0,backgroundColor:'#694fad'},
               headerTitleStyle: {color:'white',fontSize:20}
             }} 
        />
        <HomeStack.Screen name="Blogs" component={BlogScreen} 
            options={{
               title: 'Latest Blogs',
               headerStyle: {elevation:0,backgroundColor:'#694fad'},
               headerTitleStyle: {color:'white',fontSize:20}
             }} 
        />
        <HomeStack.Screen name="BlogDetail" component={BlogDetailScreen} 
            options={{
               title: 'Blog',
               headerStyle: {elevation:0,backgroundColor:'white'},
               headerTitleStyle: {color:'white',fontSize:20,display:'none'}
             }} 
        />
        <HomeStack.Screen name="AppointmentHistory" component={AppointmentHistoryScreen} 
            options={{
               title: 'Appointment History',
               headerStyle: {elevation:0,backgroundColor:'#694fad'},
               headerTitleStyle: {color:'white',fontSize:20}
             }} 
        />
  
      </HomeStack.Navigator>  
    );
};

export default AllPatientHome;
