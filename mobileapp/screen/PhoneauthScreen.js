import * as React from 'react';
import {Text,View,StyleSheet,Alert,ActivityIndicator,Platform,Dimensions,Image} from 'react-native';
// import { TextInput,Button,Text,Card ,Caption,Title,Subheading} from 'react-native-paper';
import { Button,TextInput,Title,Subheading} from 'react-native-paper';


import * as FirebaseRecaptcha from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';

// PROVIDE VALID FIREBASE CONFIG HERE
// https://firebase.google.com/docs/web/setup
const FIREBASE_CONFIG: any = {
  apiKey: "AIzaSyCxF3Aen5ut6m9KR9Q_z4nSwayJJLnwlQk",
  authDomain: "doctor-project-38365.firebaseapp.com",
  projectId: "doctor-project-38365",
  storageBucket: "doctor-project-38365.appspot.com",
  messagingSenderId: "18994916563",
  appId: "1:18994916563:web:bc58049ed4b32e0d757826"
};

try {
  if (FIREBASE_CONFIG.apiKey) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
} catch (err) {
  // ignore app already initialized error on snack
}

const height=Dimensions.get('window').height;

export default function PhoneAuthScreen({navigation}) {
  const recaptchaVerifier = React.useRef(null);
  const verificationCodeTextInput = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [verificationId, setVerificationId] = React.useState('');
  const [verifyError, setVerifyError] = React.useState();
  const [verifyInProgress, setVerifyInProgress] = React.useState(false);
  const [verificationCode, setVerificationCode] = React.useState('');
  const [confirmError, setConfirmError] = React.useState();
  const [confirmInProgress, setConfirmInProgress] = React.useState(false);
  const isConfigValid = !!FIREBASE_CONFIG.apiKey;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={FIREBASE_CONFIG}
          // attemptInvisibleVerification={true}
          
        />
        {/* <Text style={styles.title}>Firebase Phone Auth</Text> */}
        {/* <Text style={styles.subtitle}>using expo-firebase-recaptcha</Text> */}
        <View >
           <Image style={{height:height/6}}
           source={{uri:'https://image.freepik.com/free-vector/happy-tiny-people-near-huge-welcome-word-flat-illustration_74855-10808.jpg'}}></Image>
        </View>
        <View style={{height:height/8,justifyContent:'center',alignContent:'center'}}>
           <Title style={{textAlign:'center',color:'#694fad',fontWeight:'bold'}}>Doctor Connect</Title>
          <Subheading style={{textAlign:'center',color:'#694fad',marginTop:5,fontSize:13,fontWeight:'bold'}}>We take care for your health</Subheading>
        </View>
        <Text style={styles.text}>Enter phone number</Text>
        <TextInput
          mode="outlined"
        //   style={styles.textInput}
          autoFocus={isConfigValid}
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          placeholder="+91 999 999 9999"
          editable={!verificationId}
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        />
        <Button
        mode="contained"
        uppercase={false}
        style={{marginTop:20,paddingVertical:5,borderRadius:25}} 
          title={`${verificationId ? 'Resend' : 'Send'} Verification Code`}
          disabled={!phoneNumber}
          onPress={async () => {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            try {
              setVerifyError(undefined);
              setVerifyInProgress(true);
              setVerificationId('');
              const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                // @ts-ignore
                recaptchaVerifier.current
              );
              setVerifyInProgress(false);
              setVerificationId(verificationId);
              verificationCodeTextInput.current?.focus();
            } catch (err) {
              setVerifyError(err);
              setVerifyInProgress(false);
            }
          }}
        >{verificationId ? 'Resend' : 'Send'} Verification Code</Button>
        {verifyError && <Text style={styles.error}>{`Error: ${verifyError.message}`}</Text>}
        {verifyInProgress && <ActivityIndicator style={styles.loader} />}
        {verificationId ? (
          <Text style={styles.success}>A verification code has been sent to your phone</Text>
        ) : (
          undefined
        )}
        <Text style={styles.text}>Enter verification code</Text>
        <TextInput
          mode="outlined"
          ref={verificationCodeTextInput}
        //   style={styles.textInput}
          editable={!!verificationId}
          placeholder="123456"
          onChangeText={(verificationCode) => setVerificationCode(verificationCode)}
        />
        <Button
        mode="contained"
        uppercase={false}
        style={{marginTop:20,paddingVertical:5,borderRadius:25}} 
          title="Confirm Verification Code"
          disabled={!verificationCode}
          onPress={async () => {
            try {
              setConfirmError(undefined);
              setConfirmInProgress(true);
              const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                verificationCode
              );
              const authResult = await firebase.auth().signInWithCredential(credential);
              setConfirmInProgress(false);
              setVerificationId('');
              setVerificationCode('');
              verificationCodeTextInput.current?.clear();
              Alert.alert('Phone authentication successful!');
              navigation.navigate('PatientUser');
            } catch (err) {
              setConfirmError(err);
              setConfirmInProgress(false);
            }
          }}
        >Confirm Verification Code</Button>
        {confirmError && <Text style={styles.error}>{`Error: ${confirmError.message}`}</Text>}
        {confirmInProgress && <ActivityIndicator style={styles.loader} />}
      </View>
      {!isConfigValid && (
        <View style={styles.overlay} pointerEvents="none">
          <Text style={styles.overlayText}>
            To get started, set a valid FIREBASE_CONFIG in App.tsx.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    marginTop: 0,
  },
  title: {
    marginBottom: 2,
    fontSize: 29,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 10,
    opacity: 0.35,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight:'600'
  },
  textInput: {
    marginBottom: 8,
    fontSize: 17,
    fontWeight: 'bold',
  },
  error: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'red',
  },
  success: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'blue',
  },
  loader: {
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFFC0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontWeight: 'bold',
  },
});
