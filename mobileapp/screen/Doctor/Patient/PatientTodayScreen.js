import React,{useState,useEffect} from 'react';
import {db,db2,patientdb,userauth} from '../../../config';

import { View, Text,  StyleSheet,ScrollView,ActivityIndicator } from 'react-native';
import { DataTable ,Title,Card,Button,Checkbox} from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from "expo-media-library";

const AllPatientScreen = () => {
  
  const [patients, setpatients] = React.useState([]);
  const [loading,setloading]=React.useState(true);


  function addtoHistory(textname,textaddress,textdoctor,texthospital,value,catgoryvalue,appointmentdate){
    patientdb.collection('patients').doc("Akhlakh Ahmed").collection("History").add({
          name:textname,
          address:textaddress,
          doctor:textdoctor,
          hospital:texthospital,
          gender:value,
          category:catgoryvalue,
          appointmentdate:appointmentdate,
      })
      .catch((error)=>{
        console.log(error.message);
      })
  }

  useEffect(()=>{
    getData();
  },[])

  const date=new Date();
  const formattedDate =date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
  
  async function getData(){
    var patientsarray=[];
    var todaypatient= patientdb.collection("patients").doc("Akhlakh Ahmed").collection("Today");
    todaypatient.orderBy("currenttime").get().then((querySnapshot) => {
      alert(querySnapshot.size);
        querySnapshot.forEach((doc) => {
          // alert(doc.id);
           patientsarray.push({
              id:doc.id,
              name:doc.data().name,
              address:doc.data().address,
              category:doc.data().category,
              gender:doc.data().gender,
              appointmentdate:doc.data().date,
              registertime:doc.data().currenttime,
              status:doc.data().status
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

  const [checked, setChecked] = React.useState(false);

 const  changestatus=(id,key)=>{
    setChecked(!checked);
    console.log(id);
    var patientstatus=patientdb.collection("patients").doc("Akhlakh Ahmed");
    patientstatus.collection("Today").doc(id).get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data().name);
          addtoHistory(
            doc.data().name,
            doc.data().address,
            doc.data().doctor,
            doc.data().hospital,
            doc.data().gender,
            doc.data().category,
            doc.data().date,
          );
      } else {
          console.log("No such document!");
      }
    })
    // .then(()=>{
        // patientstatus.collection("Today").doc(id).delete().then(() => {
          // console.log("Document successfully deleted!");
        // }).catch((error) => {
            // console.error("Error removing document: ", error);
        // });
    // })
    .catch((error) => {
        console.log("Error getting document:", error);
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
                    <DataTable.Title style={{padding:5,paddingRight:20}}>S.No.</DataTable.Title>
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
                    <DataTable.Row >
                    <DataTable.Cell>{i+1}</DataTable.Cell>
                      <DataTable.Cell  style={{padding:5}} >
                      <Checkbox   status={checked ? 'checked' : 'unchecked'}
                            // onPress={() => {setChecked(!checked);}}
                            onPress={() => changestatus(row.id,i)}                            
                            />
                      </DataTable.Cell>
                      <DataTable.Cell  style={{padding:5,width:180,backgroundColor:'white'}}>{row.name}</DataTable.Cell>
                      <DataTable.Cell  style={{padding:5,width:60}}>{row.category}</DataTable.Cell>
                      <DataTable.Cell  style={{padding:5,width:60,backgroundColor:'white'}}>{row.gender}</DataTable.Cell>
                      <DataTable.Cell  style={{padding:5,width:80}}>{row.appointmentdate}</DataTable.Cell>
                      {/* <DataTable.Cell  style={{padding:5,width:80,backgroundColor:'white'}}>{row.registertime}</DataTable.Cell> */}
                      <DataTable.Cell  style={{padding:5}}>{row.address}</DataTable.Cell>
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

  // patientdb.collection("patients").where("date", "==",formattedDate).orderBy("currenttime").get().then((querySnapshot) => {


  // patientstatus.collection("Today").doc(id).delete().then(() => {
    //   console.log("Document successfully deleted!");
    // }).catch((error) => {
    //     console.error("Error removing document: ", error);
    // });
    // patientstatus.collection("Today").doc(id).get().then((querySnapshot) => {
    //      console.log(querySnapshot);
    // });


// 
    // {
      // items.map((item)=>{
        //  <RenderItem key={item.id} item={item} onPress={() => changestatus(row.id)}    />   
      // })
    // }
    // const  changestatus=(id)=>{
      // var patientstatus=patientdb.collection("patients").doc("undergoing");
          // patientstatus.collection("Today").doc(id).delete().then(() => {
            // console.log("Document successfully deleted!");
          // }).catch((error) => {
              // console.error("Error removing document: ", error);
          // });     
    // }
      