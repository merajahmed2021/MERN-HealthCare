import React,{useState,useEffect} from 'react';

import {db,db2,patientdb} from '../../../config';

import { View, StyleSheet, Dimensions, ScrollView, Image } from "react-native";
import {  TextInput,  Button,  Text,  Card,  Caption,  Title,} from "react-native-paper";
import { RadioButton,IconButton,Colors  } from "react-native-paper";


import DateTimePicker from '@react-native-community/datetimepicker';


const AnnouncementScreen = () => {

    
  const [text, setText] = React.useState('');
  const [details, setdetails] = React.useState('');


      // FOR DATE TIME PICKER
      const [date, setDate] = useState(new Date());
      const [mode, setMode] = useState('date');
      const [show, setShow] = useState(false);
      
      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
  
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
      const showDatepicker = () => {
        showMode('date');
      };
      // const showTimepicker = () => {
        // showMode('time');
      // };
  
  

  function handlesubmit(){
    const appointmentdate =date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    console.log(appointmentdate);
    patientdb.collection('doctors').doc("123456789").collection("notifications").add({
      details:details,
    }).then(()=>{
      alert("Notification Posted");
    }).catch((error)=>{
      console.log(error.message);
    })
  }


    return (
      <View>
          <Card style={{padding:20}}>
             <Text>Write any announcement for patients regarding appointment.</Text>
          </Card>
          <View style={{margin:15}}>
            {/* <TextInput  mode="outlined"   label="Heading" style={{marginTop:20}}
             value={text}   onChangeText={text => setText(text)} /> */}
            <TextInput  mode="outlined"
             label="Details" style={{marginTop:20}}
             value={details}  multiline={true}  numberOfLines={12}  onChangeText={text => setdetails(text)}
            />
                              <View>
                    {/* <Button onPress={showTimepicker} >Show dateTimePicker</Button> */}
                    <Button mode="outlined" onPress={showDatepicker} uppercase={false}>Select Date for appointment</Button>
                  </View>
                  {show && (
                    <DateTimePicker  testID="dateTimePicker"  value={date}  mode={mode}  is24Hour={true}
                      minimumDate={new Date()}  display="default"  onChange={onChange}   style={{width:'90%'}}/>
                  )}

            <Button mode="contained" uppercase={false} 
               style={{marginTop:20}}  onPress={handlesubmit} >Announce now</Button>
          </View>
      </View>
    );
};

export default AnnouncementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
