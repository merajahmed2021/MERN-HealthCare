import React from 'react';

import * as firebase from "firebase";
import * as Google from 'expo-google-app-auth';

import { View,  StyleSheet, Dimensions } from 'react-native';
import { TextInput,Button,Text,Card ,Caption,Title,Subheading,Checkbox } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';


const height=Dimensions.get('window').height;

const instruction=[
    {
        text:'This app is build for doctor and patient connect.'
    },
    {
        text:'This app is build for doctor and patient connect.'
    },
    {
        text:'This app is build for doctor and patient connect.'
    },
    {
        text:'This app is build for doctor and patient connect.'
    },
    {
        text:'This app is build for doctor and patient connect.'
    },
    {
        text:'This app is build for doctor and patient connect.'
    }
]

const InstructionScreen = ({navigation,route}) => {
  
    const [checked, setChecked] = React.useState(false);  
    const [doctorEmail, setdoctorEmail] = React.useState('');
    // console.log(doctorEmail);
    const [doctorName, setdoctorName] = React.useState('');
  
    function handlesubmit(){
      if(checked==true){
          // navigation.navigate('DoctorRegistertation',{ email: "Meraj"})
          navigation.navigate({
            name: 'DoctorRegistertation',
            params: { email: 'meraj' ,heading:'Instruaction form'},
          });
      }else{
          alert("Please accept our privacy and policy for Registration");
      }
    }

    const getData = async (userid) => {
      // alert(doctorName,doctorEmail);
      try {
        
        await AsyncStorage.setItem('@user',userid);
        navigation.navigate({
          name: 'DoctorRegistertation',
        });

      } catch(e) {
        alert(e);
        // error reading value
      }
    }
    function isUserEqual(googleUser, firebaseUser) {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.user.id) {
              return true;
            }
          }
        }
        return false;
    }

    function onSignIn(googleUser) {
        // console.log('Google Auth Response', googleUser);
        // setdoctorEmail(googleUser.user.uid);
        // setdoctorName(googleUser.user.givenName+" "+googleUser.user.familyName);
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
          unsubscribe();
          if (!isUserEqual(googleUser, firebaseUser)) {
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
                );
      
            firebase.auth().signInWithCredential(credential).then((result)=>{
              getData(result.user.uid);
              firebase.firestore().collection('upcomingdoctors').doc(result.user.uid).collection('profile').add({
                   gmail:result.user.email,
                   privacyaccept:checked,
                   profile_picture:result.additionalUserInfo.profile.picture,
                   locale:result.additionalUserInfo.profile.locale,
                   first_name:result.additionalUserInfo.profile.given_name,
                   last_name:result.additionalUserInfo.profile.family_name
              }).then(()=>{
              
      
               }
              )
            }).catch((error) => {
                 console.log(error);
            });
          } else {
            alert('User already signed-in Firebase.');
          }
        });
    }
    
    

    async function signInWithGoogleAsync() {
      if(checked==true){
            try {
              const result = await Google.logInAsync({
                behavior:'web',
                androidClientId: '18994916563-jo4a9ckafblkkei7kjqf4bbffpdl0h95.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
              });
              if (result.type === 'success') {
                onSignIn(result);
                return result.accessToken;
              } else {
                return { cancelled: true };
              }
            } catch (e) {
              return { error: true };
            }
        }else{
            alert("Please accept our privacy and policy for Registration");
        }
      }
      

    return (
      <View>
          <Card style={{padding:20,height:height}}> 
           <Title style={{textAlign:'center'}}>Privacy and Policies</Title>
           <ScrollView style={{marginTop:30}}>
           {
                instruction.map((row) => (
                    <View style={{marginTop:5}}>
                        <Caption style={{fontSize:16}}>{row.text}</Caption>
                    </View>
                ))
            }

            <View style={{flexDirection:'row',marginTop:20}}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                  color="#694fad"
                />
                <Caption style={{marginTop:8}}>Accept privacy and policy</Caption>
            </View>
            <View>
               <Button icon="gmail" mode="contained" uppercase={false}  style={{marginTop:20,paddingVertical:5,borderRadius:25}}
                  // onPress={handlesubmit} 
                  icon="google"
                onPress={signInWithGoogleAsync}
                  >Join with  Google</Button>
                <Button mode="outlined" uppercase={false}  style={{marginTop:20,paddingVertical:5,borderRadius:25}}
                 onPress={() => navigation.navigate('Login')}
                 >Cancel</Button>
            </View>
           </ScrollView>
          </Card>
      </View>
    );
};

export default InstructionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
