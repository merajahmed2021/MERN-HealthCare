import React ,{useState,useRef,useEffect}from 'react';

import {db,db2,patientdb,storageRef} from '../../config';

import { View,StyleSheet ,Image,ScrollView,TouchableOpacity} from 'react-native';
// import { Icon, View,Body} from 'native-base';
import { Chip ,Title,Caption,List,Card,Avatar} from 'react-native-paper';
import { RadioButton, Text } from 'react-native-paper';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TextInput ,Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';



const AppointmentScreen = ({navigation,route}) => {

  
    const [notifications ,setnotifications]=React.useState([]);
    console.log(notifications);
    const [notificationsdislay ,setnotificationsdisplay]=React.useState(true);
    
    useEffect(()=>{
      var message=[];
      patientdb.collection('doctors').doc("123456789").collection("notifications").limit(1).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            message.push({
              // id:doc.id,
              detail:doc.data().details
            })
        });
        setnotifications(message);
        // if(notificationsdislay){
          // setnotificationsdisplay(false);
        // }
      })
      // .add({
        // details:details,
      // }).then(()=>{
        // alert("Notification Posted");
      // }).catch((error)=>{
        // console.log(error.message);
      // })
    },[])

    const time=new Date();
    const [textname, setTextname] = React.useState('');
    // const [textphone, setTextphone] = React.useState('');
    const [textaddress, setTextaddress] = React.useState('');
    const [textdoctor, setTextdoctor] = React.useState(route.params?.name);
    const [texthospital, setTexthospital] = React.useState(route.params?.work);

    const [value, setValue] = React.useState(' ');
    const [catgoryvalue,categorysetValue] = React.useState(' ');
    
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


    function navigationfxn(doctorname,hospitalname,patientname,patientaddress,patientgender,appointmentcategory,appointmentdate,registerdate){
      navigation.navigate("Appointmentfinal",
      {
         doctor:doctorname,
         hospital:hospitalname,
         patient:patientname,
         address:patientaddress,
         gender:patientgender,
         category:appointmentcategory,
         date:appointmentdate,
         currenttime:registerdate
      });
    }


    function handlesubmit(){
      const appointmentdate =date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
      const registrationdate =time.getDate() + "-" + (time.getMonth() + 1) + "-" + time.getFullYear()
      // console.log(textname ,textphone,textaddress,textdoctor,texthospital,value,catgoryvalue,appointmentdate);
      if(textname.length<4 ){
        alert("Patient name should be valid");
      }
      // else if(textphone.length<10){
        // alert("Mobile Number must be of 10 digits");
      // }
      else{
        var patient= patientdb.collection('patients').doc(textdoctor);
        if(appointmentdate==registrationdate){
          patient.collection("Today").add({
            name:textname,
            address:textaddress,
            doctor:textdoctor,
            hospital:texthospital,
            gender:value,
            category:catgoryvalue,
            date:appointmentdate,
            currenttime:time,
            status:0
          }).then(()=>{
            navigationfxn(textdoctor,texthospital,textname,textaddress,value,catgoryvalue,appointmentdate,time);
          }).catch((error)=>{
            console.log(error.message);
          })
        }else if(appointmentdate>registrationdate){
          patient.collection("Upcoming").add({
            name:textname,
            address:textaddress,
            doctor:textdoctor,
            hospital:texthospital,
            gender:value,
            category:catgoryvalue,
            date:appointmentdate,
            currenttime:time,
            // status:0
          }).then(()=>{
            navigationfxn(textdoctor,texthospital,textname,textaddress,value,catgoryvalue,appointmentdate,time);
          }).catch((error)=>{
            console.log(error.message);
          })
        }else{
          alert("SOrry, your appointment could not proceed!")
        }
      }
    }

    return (
      <ScrollView style={{paddingBottom:50,}}>
          <ScrollView style={{paddingBottom:50}}>
            <View style={{margin:10,marginTop:10}}>
              <Card style={{elevation:10,paddingBottom:30}}>
                <Image  size={150}  source={require("../images/appointment.jpg")} 
                 style={{width:'100%',height:180}}/>
                <View style={styles.container}>
                    <Title style={{color:'white',paddingTop:20}}>Registration Form</Title>
                </View>
                <View>
                  {
                    notifications.map((row)=>(
                      <View style={{marginTop:20}}>
                        <View style={{padding:20,backgroundColor:'lightgreen'}}>
                          <Text style={{textAlign:'center'}}>
                          <Text style={{textAlign:'center',fontWeight:'bold',paddingHorizontal:10}}>Announcement!  </Text>
                            {row.detail}</Text>
                        </View>
                      </View>
                    ))
                  }
                </View>
                <View style={{padding:10}}>
                  <TextInput  label="Doctor*"  mode="outlined"  style={{marginTop:30}}
                    value={textdoctor}  onChangeText={text => setTextdoctor(text)}/>
                  <TextInput  label="Hospital*"  mode="outlined"  style={{marginTop:30}}
                    value={texthospital}  onChangeText={text => setTexthospital(text)}/>
                  <TextInput  label="Patient Name*"  mode="outlined"  value={textname}
                    onChangeText={text => setTextname(text)}     style={{marginTop:30}}/>
                  {/* <TextInput  label="Phone Number*"  mode="outlined"  style={{marginTop:30}}
                    value={textphone}
                    onChangeText={text => setTextphone(text)}
                  /> */}
                  <TextInput  label="Address*"  mode="outlined"  style={{marginTop:30}}
                    value={textaddress}  onChangeText={text => setTextaddress(text)}/>
                  <View style={{marginTop:30,flexDirection:'row',alignContent:'space-between'}}>
                    <Caption style={{marginLeft:10,fontSize:18}}>Gender : </Caption>
                    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value} >
                      <View style={{flexDirection:'row',marginTop:-5}}>
                        <View style={{flexDirection:'row',alignContent:'space-between',marginLeft:10}}>
                          <RadioButton value="Male"   color="#694fad"/>
                          <Text style={{margin:5}}>Male</Text>
                        </View>
                        <View style={{flexDirection:'row',alignContent:'space-between',marginLeft:20}}>
                          <RadioButton value="Female"  color="#694fad"/>
                          <Text style={{margin:5}}>Female</Text>
                        </View>
                      </View>
                    </RadioButton.Group>
                  </View> 
                  <View style={{marginTop:30,flexDirection:'column',alignContent:'space-between'}}>
                    <Caption style={{marginLeft:10,fontSize:18}}>Appointment  Category: </Caption>
                    <RadioButton.Group onValueChange={newValue => categorysetValue(newValue)} value={catgoryvalue}>
                      <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:'row',alignContent:'space-between',margin:20}}>
                          <RadioButton value="First"  color="#694fad"/>
                          <Text style={{margin:5}}>First Visit</Text>
                        </View>
                        <View style={{flexDirection:'row',alignContent:'space-between',margin:20}}>
                          <RadioButton value="Repeat" color="#694fad"/>
                          <Text style={{margin:5}}>Repeat</Text>
                        </View>
                      </View>
                    </RadioButton.Group>
                  </View>
                  <View>
                    {/* <Button onPress={showTimepicker} >Show dateTimePicker</Button> */}
                    <Button mode="outlined" onPress={showDatepicker} uppercase={false}>Select Date for appointment</Button>
                  </View>
                  {show && (
                    <DateTimePicker  testID="dateTimePicker"  value={date}  mode={mode}  is24Hour={true}
                      minimumDate={new Date()}  display="default"  onChange={onChange}   style={{width:'90%'}}/>
                  )}
                  <View style={{marginTop:30}}>
                     <Button  mode="contained"  uppercase={false} style={{borderRadius:30,padding:5}}
                        onPress={handlesubmit}>Book Appointment</Button>
                  </View>
                </View>
              </Card>
            </View>
          </ScrollView>
      </ScrollView>
    );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center',
    paddingBottom:30,
    backgroundColor:'#694fad',
    borderBottomRightRadius:40,
    borderBottomLeftRadius: 40,
  },
});
   // patientdb.collection('patients').doc(textdoctor).collection("Today").add({
            // name:textname,
            // address:textaddress,
            // doctor:textdoctor,
            // hospital:texthospital,
            // gender:value,
            // category:catgoryvalue,
            // date:appointmentdate,
            // currenttime:time
        // }).then(()=>{
            // navigation.navigate("Appointmentfinal",
            // {
              //  doctor:textdoctor,
              //  hospital:texthospital,
              //  patient:textname,
              //  address:textaddress,
              //  gender:value,
              //  category:catgoryvalue,
              //  date:appointmentdate,
              //  currenttime:time
            // });
        // }).catch((error)=>{
          // console.log(error.message);
        // })
// 