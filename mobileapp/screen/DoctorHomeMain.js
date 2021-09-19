import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Button, } from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './Doctor/HomeScreen';

import PatientTopBar from './Doctor/PatientTopbar';

import ProfileScreen from './Doctor/ProfileScreen';
import SettingsScreen from './Doctor/SettingScreen';

import WriteblogScreen from './Doctor/WriteBlogScreen';
import BlogScreen from './Doctor/BlogScreen';
import BlogDetailScreen from './Doctor/BlogDetailScreen';

const HomeStack = createStackNavigator();

const DoctorStackBar = ({navigation}) => {
    return (
        <HomeStack.Navigator  initialRouteName="DoctorHome"  >
        <HomeStack.Screen name="DoctorHome" component={HomeScreen} 
          options={{
                headerLeft: null,
                title: 'Doctor Connect',
                headerStyle: {elevation:0,backgroundColor:'#694fad'},
                headerTitleStyle: {color:'white',fontSize:20,}
              }} 
        />
        <HomeStack.Screen name="Allpatient" component={PatientTopBar} 
            options={{
               title:"Patient List",
               headerStyle: {elevation:0,backgroundColor:'#694fad'},
               headerTitleStyle: {color:'white',fontSize:20}
             }} 
        />
        <HomeStack.Screen name="DoctorBlog" component={WriteblogScreen} 
            options={{
              title:"Write a Blog",
               headerStyle: {elevation:0,backgroundColor:'#694fad'},
               headerTitleStyle: {color:'white',fontSize:20}
             }} 
        />
        <HomeStack.Screen name="DoctorProfile" component={ProfileScreen} 
            options={{
              title:"Profile",
               headerStyle: {elevation:0,backgroundColor:'#694fad'},
               headerTitleStyle: {color:'white',fontSize:20}
             }} 
        />
         <HomeStack.Screen name="DoctorSettings" component={SettingsScreen} 
            options={{
              title:"Settings",
               headerStyle: {elevation:0,backgroundColor:'#694fad'},
               headerTitleStyle: {color:'white',fontSize:20}
             }} 
        />
        <HomeStack.Screen name="DoctorAllBlogs" component={BlogScreen} 
            options={{
              title:"Blogs",
               headerStyle: {elevation:0,backgroundColor:'#694fad'},
               headerTitleStyle: {color:'white',fontSize:20}
             }} 
        />
         <HomeStack.Screen name="DoctorBlogsDetails" component={BlogDetailScreen} 
            options={{
              title:"Write a Blog",
               headerStyle: {elevation:0,backgroundColor:'white'},
               headerTitleStyle: {color:'white',fontSize:20,display:'none'}
             }} 
        />
  
      </HomeStack.Navigator>  
    );
};

export default DoctorStackBar;
