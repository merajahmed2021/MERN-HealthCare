import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CategoryDoctorScreen = () => {
    return (
      <View style={styles.container}>
        <Text>No notifications found</Text>
      </View>
    );
};

export default CategoryDoctorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
