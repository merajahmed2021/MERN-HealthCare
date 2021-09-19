import React, { Component } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import  Todaypatient from './Patient/PatientTodayScreen';
import  Upcomingpatient from './Patient/PatientUpcomingScreen';
import  Pastpatient from './Patient/PatientPastScreen';


const Tab = createMaterialTopTabNavigator();

const PatientTopBar = () => {
    return (
        <Tab.Navigator
        initialRouteName="Today"
        tabBarOptions={{
          activeTintColor: 'white',
          labelStyle: {fontWeight:'bold' },
          style: { backgroundColor: '#694fad' },
        }}
      >
        <Tab.Screen
          name="Today"
          component={Todaypatient}
          options={{ tabBarLabel: 'Today' }}
        />
        <Tab.Screen
          name="upcoming"
          component={Upcomingpatient}
          options={{ tabBarLabel: 'Upcoming' }}
        />
        <Tab.Screen
          name="History"
          component={Pastpatient}
          options={{ tabBarLabel: 'History' }}
        />
      </Tab.Navigator>
    );
};

export default PatientTopBar;
