import React ,{useEffect}from 'react';
import axios from 'axios';
import { View,  StyleSheet, Dimensions, ScrollView,Image } from 'react-native';
import { TextInput,Button,Text,Card ,Caption,Title,Subheading} from 'react-native-paper';

const height=Dimensions.get('window').height;

const LoginScreen = ({ navigation }) => {

  const [email, setemail] = React.useState('');
  const [password,setpassword]=React.useState('');

  function handlesubmit(){
    var data={
      email:email,
      password:password,
      category:'patient'
    }
    console.log(data);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios.post('http://192.168.43.136:5000/api/user/login',data,config)
    .then((res) => {
      console.log('Login seccessfully');
      console.log(res.data);
      navigation.navigate('BottomScreen');
    })
    .catch((err) => {console.log(err);});
  }

    return (
      <ScrollView style={{backgroundColor:"white"}}>
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
              <TextInput mode="outlined"
                 label="Email"
                 value={email}
                 style={{marginVertical:10}}
                 onChangeText={text => setemail(text)}
              />
               <TextInput mode="outlined"
                 label="Password"
                 value={password}
                 style={{marginVertical:10}}
                 onChangeText={text => setpassword(text)}
              />
              <Button mode="contained" uppercase={false} 
                  style={{marginTop:10,paddingVertical:5,borderRadius:25,marginVertical:10}}
                  onPress={handlesubmit}>Login</Button>
           
            <View style={{flexDirection:'row',alignContent:'space-between',justifyContent:'center'}}>
               <Text style={{marginTop:10,textAlign:'center'}}>Don't have account?</Text>
            </View>
            <Button mode="contained" uppercase={false}   
                style={{marginTop:20,paddingVertical:5,borderRadius:25,backgroundColor:'red'}} 
                onPress={() => navigation.navigate('Signup')} >Join Us</Button>
            </View>
        </Card>
      </ScrollView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
