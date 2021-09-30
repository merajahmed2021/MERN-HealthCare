import React ,{createContext,useState}from 'react';
import { View,  StyleSheet, Dimensions,Image } from 'react-native';
import { TextInput,Button,Text,Card ,Caption,Title,Subheading} from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";

const height=Dimensions.get('window').height;



const DoctorLoginScreen = ({ navigation, route }) => {

  const [text, setText] = React.useState('');
  const [doctorEmail, setdoctorEmail] = React.useState('');
  const [doctorName, setdoctorName] = React.useState('');
  const [doctoruid, setdoctoruid] = React.useState('');


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
                 label="Email"
                 value={text}
                 style={{marginVertical:10}}
                 onChangeText={text => setText(text)}
              />
               <TextInput mode="outlined"
                 label="Password"
                 value={text}
                 style={{marginVertical:10}}
                 onChangeText={text => setText(text)}
              />
              {/* <Button mode="contained" uppercase={false}  icon="google"
                 style={{marginTop:40,paddingVertical:5,borderRadius:25}}
                onPress={() => {
                  navigation.navigate('DoctorUser', {
                    screen: 'DoctorHome',
                  });
                }}
              >Join with  Google</Button> */}

              {/* <View style={{flexDirection:'row',alignContent:'space-between',justifyContent:'center'}}>
                <Text style={{marginTop:30,textAlign:'center'}}>Don't have account?</Text>
              </View>
         */}
        
              <Button mode="contained" uppercase={false} 
                  style={{marginTop:10,paddingVertical:5,borderRadius:25,marginVertical:10}}
                  onPress={() => navigation.navigate('login')}
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
