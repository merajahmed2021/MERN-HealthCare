import React from 'react';
import { View,  StyleSheet, Dimensions } from 'react-native';
import { TextInput,Button,Text,Card ,Caption,Title,Subheading,Checkbox } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const height=Dimensions.get('window').height;

const instruction=[
    {
        text:'This app is build for doctor and patient appointment'
    },
    {
        text:'This app is build for doctor and patient appointment'
    },
    {
        text:'This app is build for doctor and patient appointment'
    },
    {
        text:'This app is build for doctor and patient appointment'
    },
    {
        text:'This app is build for doctor and patient appointment'
    },
    {
        text:'This app is build for doctor and patient appointment'
    }
]

const InstructionScreen = ({navigation}) => {
  
    const [checked, setChecked] = React.useState(false);  

    function handlesubmit(){
      if(checked==true){
          navigation.navigate('DoctorRegistertation')
      }else{
          alert("Please accept our privacy and policy for Registration");
      }
    }

    return (
      <View>
          <Card style={{padding:20,height:height}}> 
           <Title style={{textAlign:'center'}}>Instruction for Doctor</Title>
           <Title style={{textAlign:'center'}}>Registration</Title>
           <ScrollView style={{marginTop:30}}>
           {
                instruction.map((row) => (
                    <View style={{marginTop:5,flexDirection:'row'}}>
                        <Icon name="ios-checkmark" size={20} style={{marginTop:2,marginRight:10}}></Icon>
                        <Text>{row.text}</Text>
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
            {/* {checked==false? */}
                {/* // <Caption style={{marginTop:8,color:'red'}}>Please click on checkbox to accept privacy and policy</Caption>             */}
            {/* // :null}  */}
            <View>
               <Button icon="gmail" mode="contained" uppercase={false}  style={{marginTop:20}}
                  onPress={handlesubmit}
                  >Register with Gmail</Button>
                <Button mode="outlined" uppercase={false}  style={{marginTop:20}}
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
