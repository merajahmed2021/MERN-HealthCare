import React, { Component } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ProfileScreen from './Profile/ProfileScreen';
import AnnouncementScreen from './Profile/AnnouncementScreen';

const Tab = createMaterialTopTabNavigator();

const PatientTopBar = () => {
    return (
        <Tab.Navigator
        initialRouteName="Announcement"
        tabBarOptions={{
          activeTintColor: 'white',
          labelStyle: {fontWeight:'bold' },
          style: { backgroundColor: '#694fad' },
        }}
      >
        <Tab.Screen
          name="Announcement"
          component={AnnouncementScreen}
          options={{ tabBarLabel: 'Announcement' }}
        />
        <Tab.Screen
          name="EditProfile"
          component={ProfileScreen}
          options={{ tabBarLabel: 'Edit Profile' }}
        />
      </Tab.Navigator>
    );
};

export default PatientTopBar;
