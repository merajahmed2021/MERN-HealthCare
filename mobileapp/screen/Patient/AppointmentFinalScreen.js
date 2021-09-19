import React from 'react';
import { View, StyleSheet ,Image,Dimensions} from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from "expo-media-library";
import {  Chip,  Title,  Searchbar,  Button,  Text, Card, Avatar, Subheading, Paragraph, Caption, List
} from "react-native-paper";
import { Rating, AirbnbRating } from 'react-native-ratings';


const height=Dimensions.get('window').height;


const AppointmentfinalScreen = ({navigation,route}) => {

  const doctorname=route.params?.doctor;
  const hospitalname=route.params?.hospital;
  const patientname=route.params?.patient;
  const mobilenumber=route.params?.mobileno;
  const addressname=route.params?.address;
  const gender=route.params?.gender;
  const category=route.params?.category;
  const datename=route.params?.date;
  const currenttime=route.params?.currenttime;

  const html = `
  <style>
    .header{
      margin-top:10px;
      display:flex;
    }
    .subheading{
      font-size:15px;
      text-align:center;
    }
    .app-icon{
      height:120px;
      width: 120px;
      border-radius:100%;
      margin-bottom:20px;
    }
    h1{
      text-align:center;
      margin-bottom:10px;
    }
    h2{
      text-align:center;
      margin-bottom:10px;
    }
    p{
      font-size:25px;
    }
    .container-box{
      display:flex;
      margin-top:-5px;
    }
    .doctor-container{
      padding:10px 20px 10px 20px;
      border:1px solid gray;
    }
    .patient-container{
      margin-top:20px;
      padding:10px 20px 10px 20px;
      border:1px solid gray;
    }
  </style>
      <div class="header">
         <img src="https://picsum.photos/700"  class="app-icon">
         <div style="margin:5px 15px 15px 15px;">
            <h1>Register From Doctor Connect App</h1>
            <p class="subheading">(An Online Platform for Doctor's Appointment)</p>
         </div>
      </div>
      <div class="doctor-container">
        <div class="container-box">
           <p style="font-weight:bolder;">Doctor Name : </p>
           <p style="margin-left:20px;">${doctorname}</p>
        </div>
        <div class="container-box">
           <p style="font-weight:bolder;">Hospital Name : </p>
           <p style="margin-left:20px;">${hospitalname}</p>
        </div>
      </div>
      <div class="patient-container">
        <h2>Patient Details</h2>
        <div class="container-box">
           <p style="font-weight:bolder;">Patient Name : </p>
           <p style="margin-left:20px;">${patientname}</p>
        </div>
        <div class="container-box">
           <p style="font-weight:bolder;">Mobile Number: </p>
           <p style="margin-left:20px;">${mobilenumber}</p>
        </div>
        <div class="container-box">
           <p style="font-weight:bolder;">Gender : </p>
           <p style="margin-left:20px;">${gender}</p>
        </div>
        <div class="container-box">
           <p style="font-weight:bolder;">Category: </p>
           <p style="margin-left:20px;">${category}</p>
        </div>
        <div class="container-box">
           <p style="font-weight:bolder;">Address: </p>
           <p style="margin-left:20px;">${addressname}</p>
        </div>
        <div class="container-box">
           <p style="font-weight:bolder;">Date of Appointment: </p>
           <p style="margin-left:20px;">${datename}</p>
        </div>
           <div class="container-box">
           <p style="font-weight:bolder;">Time of Registration: </p>
           <p style="margin-left:20px;">${currenttime}</p>
        </div>
      </div>
  `;

  async function execute() {
    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri);
      } else {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          await MediaLibrary.createAssetAsync(uri);
          alert("PDF Downloaded for Appointment in your phone")
        }else{
          Sharing.shareAsync(uri);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function share() {
    const { uri } = await Print.printToFileAsync({ html});
    Sharing.shareAsync(uri);
  }

    return (
      <View style={{backgroundColor:'white',height:height}}>
        <View style={{marginVertical:40}}>
        <Image style={{height:200}}
             source={{uri:'https://image.freepik.com/free-vector/completed-concept-illustration_114360-3449.jpg'}}></Image>
        </View>
        <View style={styles.container}>
        <Title>Dear {route.params?.patient}</Title>
        <Title>your Appointment was Completed.</Title>
        <Text style={{marginVertical:10}}>Your Appointment fee will be submitted in hospital</Text>
        <Text style={{marginVertical:10}}>Please download you appointment slip for proof.</Text>
        <View style={{flexDirection:'row',alignContent:'space-between',marginTop:0}}>
          <View style={{margin:8}}>
            <Button mode="contained" onPress={() => execute()} uppercase={false}>Download PDF</Button>
          </View>
          <View style={{margin:8}}>
            <Button  mode="contained" onPress={() => share()} uppercase={false}>Share PDF</Button>
          </View>
        </View>
        <Text style={{marginVertical:10}}>Please rate the doctor as per your convinence.</Text>
        <View style={{ marginLeft: -20, marginTop: 10 }}>
          <AirbnbRating count={5} defaultRating={3} showRating={false}
            unSelectedColor="lightgray"
            selectedColor="orange"  size={15}
          />
        </View>

        </View>
      </View>
    );
};

export default AppointmentfinalScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
