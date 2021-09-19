import React,{useState,useEffect} from 'react';
import { View,  StyleSheet, Dimensions,ScrollView,Image ,ActivityIndicator} from 'react-native';
import { TextInput,Button,Text,Card ,Caption,Title,Subheading} from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";

import {db,db2,patientdb,storageRef} from '../../config';
import * as ImagePicker from 'expo-image-picker';


const category=[
    {
      name:'General Medicine',
      value:'General Medicine',
    },
    {
      name:'Anaesthesis',
      value:'Anaesthesis',
    },
    {
      name:'Audiology & Speech Therapy',
      value:'Audiology',
    },
    {
      name:'Critical Care Specialist',
      value:'Critical Care',
    },
    {
      name:'Dental',
      value:'Dental',
    },
    {
      name:'Dermatology',
      value:'Dermatology',
    },
    {
      name:'Dietetics',
      value:'Dietetics',
    },
    {
      name:'Gastroenterology',
      value:'Gastroenterology',
    },
    {
      name:'General & Laparoscopic Surgery',
      value:'Laparoscopic',
    },
    {
      name:'Gynaecology & Obstetrics',
      value:'Gynaecology',
    },
    {
      name:'Others',
      value:'other',
    }
]

const RegistrationformScreen = ({navigation}) => {

  const [image, setImage] = useState(null);
  const [progress, setprogress] = useState(0);

  const [textname, setTextname] = React.useState('');
  const [qualification, setqualification] = React.useState('');
  const [experinces, setexperinces] = React.useState('');
  const [about, setabout] = React.useState('');
  const [hospital, sethospital] = React.useState('');
  const [hospitaladdress, sethospitaladdress] = React.useState('');

  const [checked, setChecked] = React.useState(' ');
  console.log(checked);
 
  function radiobtn(value){
    // console.log(value);
    setChecked(value);
  }



  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri)
      // uploadImage(result.uri,Math.random()).then(()=>{
          // alert("Image uploaded");
      //  })
      //  .catch((error)=>{
          //  console.log(error)
      // })
    }
  };


  uploadImage=async (uri,imageName)=>{
    const response=await fetch(uri);
    const blob=await response.blob();
    var ref= storageRef.child('doctorprofile/' + imageName);
    return ref.put(blob).on('state_changed', 
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setprogress(progress);
      // console.log('Upload is ' + progress + '% done');
      snapshot.ref.getDownloadURL().then(url => {
        // console.log(' * new url', url)
        setImage(url)
      })
    },
    )
    // .then(snapshot => {
      // snapshot.ref.getDownloadURL().then(url => {
        // console.log(' * new url', url)
      // })
    // })
     
  }


  function handlesubmit(){
    uploadImage(image,Math.random()).then(()=>{
      patientdb.collection('doctors').doc("123456789").collection("Profile").add({
       name:textname,
       experinces:experinces,
       experincecategory:checked,
       qualification:qualification,
       about:about,
       hospital:hospital,
       hospitaladdress:hospitaladdress,
       image:image
      }).then(()=>{
        alert("Doctor Registered");
      }).catch((error)=>{
        console.log(error.message);
      })
 })
 .catch((error)=>{
     console.log(error)
 })
  }


    return (
      <ScrollView>
            <Card style={{margin:10}}>
            <Image   
             source={{uri:'https://image.freepik.com/free-vector/medical-record-online-doctor-concept_106788-2358.jpg'}}
              // source={require("../images/appointment.jpg")} 
                 style={{width:180,height:180,marginTop:10,marginLeft:'auto',marginRight:'auto'}}/>
                <View style={styles.container}>
                    <Title style={{color:'white',paddingTop:20}}>Doctor Registration</Title>
                </View>
                <View style={{padding:10}}>
                  <TextInput  label="Doctor Name*"  mode="outlined"  style={{marginTop:30}}
                    value={textname}
                    onChangeText={text => setTextname(text)}
                  />
                  <TextInput  label="Qualification*"  mode="outlined"  style={{marginTop:30}}
                    value={qualification}
                    onChangeText={text => setqualification(text)}
                  />
                  {/* <TextInput  label="College name you studied*"  mode="outlined"  style={{marginTop:30}}
                    value={text}
                    onChangeText={text => setTextname(text)}
                  />
                  <TextInput  label="Year of your last qualification*"  mode="outlined"  style={{marginTop:30}}
                    value={text}
                    onChangeText={text => setTextname(text)}
                  />
                  <TextInput  label="Complete Address*"  mode="outlined"  style={{marginTop:30}}
                    value={text}
                    onChangeText={text => setTextname(text)}
                  /> */}
                  <TextInput  label="Year of Experiences*"  mode="outlined"  style={{marginTop:30}}
                    value={experinces}
                    onChangeText={text => setexperinces(text)}
                  />

                <View style={{marginTop:20}}>
                  <View style={{marginVertical:30}}>
                    <Title>Category of Experiences</Title>
                  </View>
                 {
                   category.map((row) => (
                     <View style={{flexDirection:'row',alignContent:'space-between',marginLeft:20}}>
                       <RadioButton value={row.value}  color="#694fad" name={row.value}
                         // status={ checked===row.value? 'checked' : 'unchecked' }
                         // status={checked.selected ==true }
                         status={ checked === row.value ? 'checked' : 'unchecked' }
           
                         // onPress={() => setChecked(!checked)}
                         onPress={() => radiobtn(row.value)}
                       />
                       <Text style={{margin:5}}>{row.name}</Text>
                     </View>
                   ))
                 }
                </View>
                  <View>
                      <TextInput  mode="outlined"
                         label="About you" style={{marginTop:20}}
                         value={about}
                         multiline={true}
                         numberOfLines={10}
                         onChangeText={text => setabout(text)}
                       />
                  </View>
                  <View>
                    <View style={{margin:30}}>
                      <Title style={{textAlign:'center'}}>Hospital Details</Title>
                    </View>
                    <TextInput  label="Working Hospital Name*"  mode="outlined"  style={{marginTop:30}}
                      value={hospital}
                      onChangeText={text => sethospital(text)}
                    />
                    <TextInput  label="Hospital Address-State,District,City*"  mode="outlined"  style={{marginTop:30}}
                      value={hospitaladdress}
                      onChangeText={text => sethospitaladdress(text)}
                    />
                  </View>
                  
                  <View style={{marginTop:30,paddingBottom:30}}>
                  <Button mode="outlined" style={{marginVertical:  20}} uppercase={false}
                       onPress={pickImage}                    
                    >Upload Profile Image</Button>


             {
               progress>0 && progress<100?
               <View style={{marginVertical:20}}>
                  <Subheading style={{textAlign:'center'}}>{progress} % completed</Subheading>
                  <ActivityIndicator size="large" color='#694fad' style={{marginTop:5}}/>
               </View>
               :
               null
             }

                    <Button mode="contained"
                     onPress={handlesubmit}
                        // onPress={() => navigation.navigate('DoctorRegistertationfinal')}                    
                    >Register</Button>
                    <Button mode="outlined" uppercase={false}  style={{marginTop:20}}
                        onPress={() => navigation.navigate('Login')}
                    >Cancel</Button>

                  </View>
                </View>

            </Card>
      </ScrollView>
    );
};

export default RegistrationformScreen;

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
