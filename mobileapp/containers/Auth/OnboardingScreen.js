import React from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import { Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const width=Dimensions.get('window').width;


export default function OnboardingScreen({navigation}) {
  return (
    <View style={styles.container}>
     <Onboarding
    onSkip={() =>navigation.navigate('Login')}
    onDone={() =>navigation.navigate('Login')}
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image source={require('./images/onboarding1.jpg')} style={{width:width,height:250}} />,
        title: 'Doctor Connect',
        subtitle: 'A platform to connect Patient and Doctor',
      },
      {
        backgroundColor: '#fff',
        image: <Image source={require('./images/onboarding2.jpg')} style={{width:width,height:250}} />,
        title: 'Why to wait?',
        subtitle: 'Make online appointment at your fingertip',
      },
      {
        backgroundColor: '#fff',
        image: <Image source={require('./images/onboarding3.jpg')} style={{width:width,height:250}} />,
        title: 'Manage your patient',
        subtitle: "Easy to manage patient individually",
      },
    ]}
  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

