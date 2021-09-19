import React ,{useEffect}from 'react';

import * as firebase from "firebase";
import * as Google from 'expo-google-app-auth';

import { View,  StyleSheet, Dimensions, ScrollView,Image } from 'react-native';
import { TextInput,Button,Text,Card ,Caption,Title,Subheading} from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";
import * as Speech from 'expo-speech';
import { registerAnimation } from 'react-native-animatable';

const height=Dimensions.get('window').height;

const BookmarkScreen = ({ navigation }) => {

  const [email, setemail] = React.useState('');
  const [password,setpassword]=React.useState('');

  const [registration,setregistration]=React.useState('');  
  const [value, setValue] = React.useState('Patient');

  // useEffect(()=>{
  //   Speech.speak("Hello I am here to guid you how to use  this app .Please login to continue with your email and password.Thankyou.",{language:'en',pitch:1,rate:0.9});
  // },[])

  // FOR GOOGLE SIGNIN

  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            // providerData[i].uid === googleUser.getBasicProfile().getId()) {
            providerData[i].uid === googleUser.user.id) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  function onSignIn(googleUser) {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            // googleUser.getAuthResponse().id_token
            googleUser.idToken,
            googleUser.accessToken
            );
  
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then((result)=>{
          // firebase.database().ref("/users/" +result.user.uid).set({
          firebase.firestore().collection('doctor').doc(result.user.uid).collection("profile").add({
               gmail:result.user.email,
               registernumber:Math.floor(Math.random() * 899999 + 100000),
               profile_picture:result.additionalUserInfo.profile.picture,
               locale:result.additionalUserInfo.profile.locale,
               first_name:result.additionalUserInfo.profile.given_name,
               last_name:result.additionalUserInfo.profile.family_name
          }).then((snapshot)=>{
                console.log(snapshot);
                navigation.navigate('PatientUser');
          })
        }).catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
        navigation.navigate('PatientUser');
      }
    });
  }


async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      behavior:'web',
      androidClientId: '18994916563-jo4a9ckafblkkei7kjqf4bbffpdl0h95.apps.googleusercontent.com',
      // iosClientId: YOUR_CLIENT_ID_HERE,
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

  function handlesubmit(){
    // try{
        // if(password.length<6){
          // alert("Password must be greate then 6 characters.")
        // }else{
          // firebase.auth().createUserWithEmailAndPassword(email, password)
          // .then((userCredential) => {
            // var user = userCredential.user;
            // console.log(user);
          // }).then(()=>{
            // console.log(value);
            // if(value=="Patient"){
              // navigation.navigate("PatientUser");
            // }else{
              // navigation.navigate("DoctorUser");
            // }
          // })
          // .catch((error) => {
            // var errorCode = error.code;
            // console.log(errorCode);
          // });
        // }
    // }catch(error){
      // console.log(error.toString());
    // }

    console.log(value);
    if(value=="Patient"){
      navigation.navigate("PatientUser");
    }else{

      firebase.firestore().collection('registerdoctor').doc(registration).collection("profile").add({
        number:registration
      }).then(()=>{
        navigation.navigate("DoctorUser");
       }
      )

      // const usersRef =  firebase.firestore().collection('registerdoctor').doc(registration)
      // usersRef.get().then((docSnapshot) => {
      //     if (docSnapshot.exists) {
      //         navigation.navigate("DoctorUser");
      //     } else {
      //       alert("No such document!");
      //     }
      // });

      // var docRef =  firebase.firestore().collection('registerdoctor').doc(registration);
      // docRef.get().then((doc) => {
      //     if (doc.exists) {
      //       navigation.navigate("DoctorUser");
      //     } else {
      //        alert("No such document!");
      //     }
      // }).catch((error) => {
      //     console.log("Error getting document:", error);
      // });


    }
  }

    return (
      <View style={{backgroundColor:"white"}}>
        <Card style={{padding:20,elevation:10}}>
            <View >
               <Image style={{height:height/5}}
               source={{uri:'https://image.freepik.com/free-vector/happy-tiny-people-near-huge-welcome-word-flat-illustration_74855-10808.jpg'}}></Image>
            </View>
            <View style={{height:height/7,justifyContent:'center',alignContent:'center'}}>
               <Title style={{textAlign:'center',color:'#694fad',fontWeight:'bold'}}>Doctor Connect</Title>
              <Subheading style={{textAlign:'center',color:'#694fad',marginTop:5,fontSize:13,fontWeight:'bold'}}>We take care for your health</Subheading>
            </View>
            <View  style={{height:3*height/5,justifyContent:'center',alignContent:'center'}}>
              <Button mode="contained" uppercase={false} icon="google"   
                style={{marginTop:0,backgroundColor:'blue',paddingVertical:5,borderRadius:25,border:'1px solid green'}} 
                // onPress={() => navigation.navigate('PatientUser')} >Join with  Google</Button>
                onPress={signInWithGoogleAsync} >Join with  Google</Button>
          
              <Button mode="contained" uppercase={false} icon="cellphone-android"   
                style={{marginTop:40,backgroundColor:'red',paddingVertical:5,borderRadius:25,border:'1px solid green'}} 
                onPress={() => navigation.navigate('Phoneauth')} >Join with  Mobile Number</Button>

              <View style={{flexDirection:'row',alignContent:'space-between',justifyContent:'center'}}>
                <Text style={{marginTop:50,textAlign:'center'}}>Are you Doctor?</Text>
              </View>
              <Button mode="contained" uppercase={false}   
                style={{marginTop:20,paddingVertical:5,borderRadius:25,border:'1px solid green'}} 
                onPress={() => navigation.navigate('Signup')} >Join Us</Button>
            </View>
        </Card>
      </View>
    );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
