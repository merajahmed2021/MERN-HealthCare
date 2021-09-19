import React from 'react';
import { View,StyleSheet ,ScrollView,Image,Dimensions} from 'react-native';
import { Button,  Text,  Card,  Caption,  Title,} from "react-native-paper";

const height=Dimensions.get("window").height;


const CategoryDoctorScreen = ({navigation,route}) => {
    const image=route.params?.image;
    alert(image);
    const heading=route.params?.heading;
    const details=route.params?.details;

    return (
      <ScrollView style={{backgroundColor:'white'}}>
         <Image source={{ uri:image}} style={{width:'100%',height:height/3}}></Image>
         <View style={{margin:20}}>
           <Title style={{textAlign:'center'}}>{heading}</Title>
         </View>
         <View style={{margin:20}}>
           <Text>{details}</Text>
         </View>
      </ScrollView>
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
