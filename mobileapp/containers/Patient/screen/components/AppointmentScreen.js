import React ,{useState,useRef,useEffect}from 'react';
import { View,StyleSheet ,Image,ScrollView,TouchableOpacity} from 'react-native';
import { Chip ,Title,Caption,List,Card,Avatar,RadioButton, Text,TextInput ,Button,Menu,Provider} from 'react-native-paper';
import { Col, Row, Grid } from 'react-native-easy-grid';
import DateTimePicker from '@react-native-community/datetimepicker';


const category=[
  {
    name:'A+',
  },
  {
    name:'A-',
  },
  {
    name:'B+',
  },
  {
    name:'B-',
  },
  {
    name:'O+',
  },
  {
    name:'O-',
  },
  {
    name:'AB+',
  },
  {
    name:'AB-',
  },
]


const AppointmentScreen = ({navigation,route}) => {

  const [notifications ,setnotifications]=React.useState([]);
  console.log(notifications);
  const [notificationsdislay ,setnotificationsdisplay]=React.useState(true);


  const [textname, setTextname] = React.useState('');
  const [textPatientId, setTextpatientId] = React.useState('');


  const [textdoctor, setTextdoctor] = React.useState(route.params?.name);
  const [texthospital, setTexthospital] = React.useState(route.params?.work);
  const [gender, setGender] = React.useState(' ');
  
  const [textEmail,    setTextEmail] =    React.useState('');
  const [textAddress,  setTextaddress] =  React.useState('');
  const [textMobileNo, setTextMobileNo] = React.useState('');

  const [appointment_mode, setAppointment_mode] = React.useState(' ');
  const [modeVisible, setmodeVisible] = React.useState(false);
  function selectAppointment_mode(value){
    setAppointment_mode(value);
    setmodeVisible(false);
  }

  const [appointment_type, setAppointment_type] = React.useState(' ');
  const [typeVisible, settypeVisible] = React.useState(false);
  function selectAppointment_type(value){
    setAppointment_type(value);
    settypeVisible(false);
  }

  const [blood_group, setBlood_group] = React.useState(' ');
  const [bloodVisible, setbloodVisible] = React.useState(false);
  function selectBlood(value){
    setBlood_group(value);
    setbloodVisible(false);
  }



    function convertDate(getdata){
      return getdata.getDate() + "-" + (getdata.getMonth() + 1) + "-" + getdata.getFullYear()
    }   
    // FOR DATE TIME PICKER
    const [appointment_date, setappointment_Date] = useState(new Date());
    const [showAppointment, setShowAppointment] = useState(false);
    const onChangeAppointmentDate = (event, selectedDate) => {
      const currentDate = selectedDate || appointment_date;
      setShowAppointment(Platform.OS === 'ios');
      setappointment_Date(currentDate);
    };

    const [dateDOB, setdateDOB] = useState(new Date());
    const [showDOB, setShowDOB] = useState(false);
    const onChangeDOBDate = (event, selectedDate) => {
      const currentDate = selectedDate || dateDOB;
      setShowDOB(Platform.OS === 'ios');
      setdateDOB(currentDate);
    };
    
   
  


    function handlesubmit(){
      var data={
        patient_id:textPatientId,
        patient_name:textname,
        doctor_name:textdoctor,
        hospital_name:texthospital,
        appointment_mode:appointment_mode,
        appointment_type:appointment_type,
        blood_group:blood_group,
        gender:gender,
        email:textEmail,
        address:textAddress,
        mobileno:textMobileNo,
        date_of_appointment:convertDate(appointment_date),
        date_of_birth:convertDate(dateDOB)
      }
      console.log("APPOINTMENT DATA : = ",data);

      navigation.navigate("Appointmentfinal",{appointment_data:data});
    }





    return (
      <Provider>
      <ScrollView style={{paddingBottom:50,}}>
          <ScrollView style={{paddingBottom:50}}>
            <View style={{margin:10,marginTop:10}}>
              <Card style={{elevation:10,paddingBottom:30}}>
                <View>
                  <View style={{padding:20}}>
                    <Title style={{paddingTop:10}}>Appointment information</Title>
                    <View style={{marginVertical:10}}>
                      <Text >New Patient Appointment Fee : Rs 500</Text>
                      <Text >Repeat Patient Appointment Fee : Rs 150</Text>
                    </View>
                    </View>
                  </View>
                <View>
                  {
                    notifications.map((row)=>(
                      <View style={{marginTop:20}}>
                        <View style={{padding:20,backgroundColor:'lightgreen'}}>
                          <Text style={{textAlign:'center'}}>
                          <Text style={{textAlign:'center',fontWeight:'bold',paddingHorizontal:10}}>Announcement!</Text>{row.detail}</Text>
                        </View>
                      </View>
                    ))
                  }
                </View>
               
                <View style={styles.container}>
                    <Title style={{color:'white',paddingTop:20}}>Registration Form</Title>
                </View>

                <View style={{padding:10}}>

                    <Card mode="outlined" style={{paddingVertical:20,paddingHorizontal:10}}>
                          <Text style={{fontWeight:'bold'}}>Basic Information</Text>
                          <View>
                              <TextInput  label="Doctor Name*"  mode="outlined"  style={{marginTop:30}}
                               value={textdoctor}  onChangeText={text => setTextdoctor(text)}/>
                              <TextInput  label="Hospital Name*"  mode="outlined"  style={{marginTop:30}}
                               value={texthospital}  onChangeText={text => setTexthospital(text)}/>
                             
                              <View style={{marginVertical:20}}>
                                 <Menu  visible={typeVisible}  onDismiss={()=>settypeVisible(false)}
                                   anchor={<Button onPress={()=>settypeVisible(true)} uppercase={false}  mode="outlined">
                                     Appointment Type { " : " +appointment_type}</Button>}>
                                       <Menu.Item onPress={() => { selectAppointment_type('New')}} title="New" />
                                       <Menu.Item onPress={() => { selectAppointment_type('Repeat')}} title="Repeat" />
                                 </Menu>
                              </View>
    
                              <View style={{marginVertical:20}}>
                                <Menu  visible={modeVisible}  onDismiss={()=>setmodeVisible(false)} 
                                  anchor={<Button onPress={()=>setmodeVisible(true)} uppercase={false}  mode="outlined">
                                    Appointment Mode  { " : " +appointment_mode}</Button>}>
                                    <Menu.Item onPress={() => { selectAppointment_mode('Online')}} title="Online" />
                                    <Menu.Item onPress={() => { selectAppointment_mode('Offile')}} title="Offline" />
                                </Menu>
                              </View>
                              
                              <View style={{marginVertical:10}}>
                                <Button mode="outlined" onPress={()=>setShowAppointment(true)} uppercase={false}>Date of Appointment : {convertDate(appointment_date)}</Button>
                              </View>
                              {showAppointment && (
                                <DateTimePicker  testID="dateTimePicker"  value={appointment_date}  mode={'date'}  is24Hour={true}
                                  minimumDate={new Date()}  display="default"  onChange={onChangeAppointmentDate}   style={{width:'90%'}}/>
                              )}
                          </View>
                    </Card>

                    <Card mode="outlined" style={{marginTop:10,paddingVertical:20,paddingHorizontal:10}}>
                      <Text style={{fontWeight:'bold'}}>Profile Information</Text>
                      <View>
                          <TextInput  label="Patient Id*"  mode="outlined"  style={{marginTop:30}}
                           value={textPatientId}  onChangeText={text => setTextpatientId(text)}/>
                          
                          <TextInput  label="Patient Name*"  mode="outlined"  style={{marginTop:30}}
                           value={textname}  onChangeText={text => setTextname(text)}/>
                         
                          <View style={{marginVertical:20}}>
                          <Menu  visible={bloodVisible}  onDismiss={()=>setbloodVisible(false)}
                            anchor={<Button onPress={()=>setbloodVisible(true)} uppercase={false}  mode="outlined">Blood Group : {blood_group}</Button>}>
                            {
                              category.map((row) => (
                                <Menu.Item onPress={() => { selectBlood(row.name)}} title={row.name} />
                              ))
                            }
                          </Menu>
                        </View>
                          
                          <View style={{marginTop:30,flexDirection:'row',alignContent:'space-between'}}>
                             <Caption style={{marginLeft:10,fontSize:18}}>Gender : </Caption>
                             <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={gender} >
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
                      
                          <View style={{marginVertical:10}}>
                            <Button mode="outlined" onPress={()=>setShowDOB(true)} uppercase={false}>Date of Birth : {convertDate(dateDOB)}</Button>
                          </View>
                            {showDOB && (
                                 <DateTimePicker  testID="dateTimePicker"  value={dateDOB}  mode={'date'}  is24Hour={true}
                                display="default"  onChange={onChangeDOBDate}   style={{width:'90%'}}/>
                            )}
                      </View>
                    </Card>


                    <Card mode="outlined" style={{marginTop:10,paddingVertical:20,paddingHorizontal:10}}>
                        <Text style={{fontWeight:'bold'}}>Contact Information</Text>
                        <View>
                           <TextInput  label="Email*"  mode="outlined"  style={{marginTop:30}}
                              onChangeText={text => setTextEmail(text)} value={textEmail}/>
                           
                           <TextInput  label="Address*"  mode="outlined"  style={{marginTop:30}}
                               onChangeText={text => setTextaddress(text)} value={textAddress}/>
                           
                           <TextInput  label="Mobile Number*"  mode="outlined"  value={textMobileNo}
                             onChangeText={text => setTextMobileNo(text)}     style={{marginTop:30}}/>
                        </View>
                    </Card>

                    <View style={{marginTop:30}}>
                        <Button  mode="contained"  uppercase={false} style={{borderRadius:30,padding:5}}
                        onPress={handlesubmit}>Book Appointment</Button>
                    </View>
                </View>
              </Card>
            </View>
          </ScrollView>
      </ScrollView>
      </Provider>
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

   