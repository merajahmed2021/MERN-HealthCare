import React ,{createContext,useState}from 'react';
// import {db,db2} from '../config';
// import * as firebase from "firebase";
// import {AuthContext} from './AuthProvider';

import { View,  StyleSheet, Dimensions,Image } from 'react-native';
import { TextInput,Button,Text,Card ,Caption,Title,Subheading} from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";

import * as firebase from "firebase";
import * as Google from 'expo-google-app-auth';


const height=Dimensions.get('window').height;

// export const AuthContext = createContext();


const DoctorLoginScreen = ({ navigation, route }) => {

  const [text, setText] = React.useState('');
  const [doctorEmail, setdoctorEmail] = React.useState('');
  const [doctorName, setdoctorName] = React.useState('');
  const [doctoruid, setdoctoruid] = React.useState('');

  // const {register} = useContext(AuthContext);




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
    // setdoctorEmail(googleUser.user.email);
    // setdoctorName(googleUser.user.givenName+" "+googleUser.user.familyName)
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      if (!isUserEqual(googleUser, firebaseUser)) {
        // console.log('Google Auth Response', firebaseUser);
        alert("Your profile is not created");
        // var credential = firebase.auth.GoogleAuthProvider.credential(googleUser.idToken,googleUser.accessToken );
        // firebase.auth().signInWithCredential(credential).then((result)=>{
          // firebase.firestore().collection('doctor').doc(result.user.uid).collection("profile").add({
              //  gmail:result.user.email,
              //  registernumber:Math.floor(Math.random() * 899999 + 100000),
              //  profile_picture:result.additionalUserInfo.profile.picture,
              //  locale:result.additionalUserInfo.profile.locale,
              //  first_name:result.additionalUserInfo.profile.given_name,
              //  last_name:result.additionalUserInfo.profile.family_name
          // }).then((snapshot)=>{
                // console.log(snapshot);
                // navigation.navigate('DoctorUser', {
                  // screen: 'DoctorHome',
                  // params: { heading: doctorName},
                // });
          // })
        // }).catch((error) => {
          //  console.log(error);
        // });
      } else {
        // alert('User already signed-in Firebase.');
        navigation.navigate('DoctorUser', {
          screen: 'DoctorHome',
        //   params: { heading: doctorName,email:doctorEmail},
        });
        // navigation.navigate('DoctorHome');
      }
    });
  }


  async function signInWithGoogleAsync() {
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
  }
  
  



    return (
      // <AuthContext.Provider  value={'Meraj Ahmed'}>
      <View style={{backgroundColor:'blue'}}>
        <Card 
          style={{padding:20,elevation:10,height:height}}>
          <View >
             <Image style={{height:height/5}}
             source={{uri:"https://image.freepik.com/free-vector/flat-design-colorful-characters-welcoming_23-2148271988.jpg"}}></Image>
          </View>
          <View style={{height:height/6,justifyContent:'center',alignContent:'center'}}>
              <Title style={{textAlign:'center',color:'#694fad',fontWeight:'bold'}}>Doctor Connect</Title>
              <Subheading style={{textAlign:'center',color:'#694fad',marginTop:5,fontSize:13,fontWeight:'bold'}}>We serve for society</Subheading>
          </View>
          <View style={{height:3*height/5-50,justifyContent:'center',alignContent:'center'}}>
              <TextInput mode="outlined"
                 label="Registration Number"
                 value={text}
                 onChangeText={text => setText(text)}
              />
              <Button mode="contained" uppercase={false}  icon="google"
                 style={{marginTop:40,paddingVertical:5,borderRadius:25}}
                // onPress={signInWithGoogleAsync} 
                onPress={() => {
                  navigation.navigate('DoctorUser', {
                    screen: 'DoctorHome',
                  });
                }}
              >Join with  Google</Button>

              <View style={{flexDirection:'row',alignContent:'space-between',justifyContent:'center'}}>
                <Text style={{marginTop:30,textAlign:'center'}}>Don't have account?</Text>
              </View>
        
        
              <Button mode="outlined" uppercase={false} 
                  style={{marginTop:10,paddingVertical:5,borderRadius:25}}
                  onPress={() => navigation.navigate('DoctorInstruction')}
              >Create account</Button>
          </View>

        </Card>

      </View>
      // {/* </AuthContext.Provider> */}
    );
};

export default DoctorLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
