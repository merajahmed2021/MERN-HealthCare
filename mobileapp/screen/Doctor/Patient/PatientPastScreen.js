import React,{useState,useEffect} from 'react';
import {db,db2,patientdb} from '../../../config';

import { View, Text,  StyleSheet,ScrollView,ActivityIndicator } from 'react-native';
import { DataTable ,Title,Card,Button,Checkbox} from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from "expo-media-library";


const AllPatientScreen = () => {
  

  const [patients, setpatients] = React.useState([]);
  const [loading,setloading]=React.useState(true);

  const [checked, setChecked] = React.useState(false);

  const date=new Date();
  const formattedDate =date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()


  useEffect(()=>{
    getData();
  },[])


  async function getData(){
    var patientsarray=[];
    patientdb.collection("patients").doc("Akhlakh Ahmed").collection("History").orderBy("appointmentdate").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           patientsarray.push({
              name:doc.data().name,
              address:doc.data().address,
              category:doc.data().category,
              gender:doc.data().gender,
              appointmentdate:doc.data().appointmentdate,
            })
        });
        setpatients(patientsarray);
        if(loading){
          setloading(false);
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  }



  
  let tabledata=[];
  tabledata.push(
    patients.map((row) => (
      ` 
      <tr>
        <td>${row.name}</td>
        <td>${row.gender}</td>
        <td>${row.category}</td>
        <td>${row.address}</td>
        <td>${row.appointmentdate}</td>
      </tr>
    `
    ))
  )



  const html=`
     <style>
     h1,h3{
       text-align:center;
     }
     table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
    
    tr:nth-child(even) {
      background-color: #dddddd;
    }
     </style>
     <h1>Patient Appointment  Details</h1>
     <h3>Date of appointment on : ${formattedDate}</h3>
     <table style="width:100%">
     <thead>
       <tr>
         <th>Name</th>
         <th>Gender</th>
         <th>Category</th>
         <th>Address</th>
         <th>Date of registration</th>
       </tr>
       </thead>
       <tbody>
           ${tabledata}
       </tbody>
     </table>
      
  `
    // let tutorials = [];
    //  patientdb.collection('patient').onSnapshot((querySnapshot)=>{
    //   const data= querySnapshot.docs.map({
    //        ...doc.data(),
    //       id:doc.id,
    //       name:doc.name
    //     })
    //  })

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
      <View>
          <ScrollView>
            <View>
              <Grid>
                <Col style={{margin:10}}>
                    <Button  mode="contained" uppercase={false}  onPress={() => share()}  >Share PDF</Button>
                </Col>
                <Col style={{margin:10}}>
                    <Button  mode="contained" uppercase={false}  onPress={() => execute()} >Download PDF</Button>
                </Col>
              </Grid>
            </View>

            <DataTable style={{marginTop:20,marginBottom:70}}>
                <ScrollView  horizontal   scrollEventThrottle={1000}  showsHorizontalScrollIndicator={false}>
                  <DataTable.Header>
                  <DataTable.Title style={{paddingVertical:5,paddingRight:10}}>S.No.</DataTable.Title>
                    <DataTable.Title style={{padding:5,width:180,backgroundColor:'white'}}>Name</DataTable.Title>
                    <DataTable.Title style={{width:60,padding:5}}>Category</DataTable.Title>
                    <DataTable.Title style={{width:60,padding:5,backgroundColor:'white'}}>Gender</DataTable.Title>
                    <DataTable.Title numberOfLines={2} style={{width:80,padding:5}}>Appointment Date</DataTable.Title>
                    <DataTable.Title numberOfLines={2} style={{width:80,padding:5,backgroundColor:'white'}}>Registration Time</DataTable.Title>
                    <DataTable.Title style={{padding:5}}>Address</DataTable.Title>
                  </DataTable.Header>
                </ScrollView>

              {
                loading?
                  <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:50}}>
                      <ActivityIndicator size="large" color='#694fad'/>
                  </View>
                :
                  patients.map((row,i) => (
                  <ScrollView key={i}  horizontal  scrollEventThrottle={1000}  showsHorizontalScrollIndicator={false}>
                    <DataTable.Row>
                    <DataTable.Cell style={{paddingRight:30}}>{i+1}</DataTable.Cell>
                      <DataTable.Cell  style={{padding:5,width:180,backgroundColor:'white'}}>{row.name}</DataTable.Cell>
                      <DataTable.Cell  style={{padding:5,width:60}}>{row.category}</DataTable.Cell>
                      <DataTable.Cell  style={{padding:5,width:60,backgroundColor:'white'}}>{row.gender}</DataTable.Cell>
                      <DataTable.Cell  style={{padding:5,width:80}}>{row.appointmentdate}</DataTable.Cell>
                      {/* <DataTable.Cell  style={{padding:5,width:80,backgroundColor:'white'}}>{row.registertime}</DataTable.Cell> */}
                      <DataTable.Cell  style={{padding:5}}>{row.address}</DataTable.Cell>
                      {/* <DataTable.Cell  style={{padding:5}}>{row.mobileno}</DataTable.Cell> */}
                    </DataTable.Row>
                  </ScrollView>
                  ))
              }
              
            </DataTable>
          </ScrollView>
      </View>
    );
};

export default AllPatientScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
