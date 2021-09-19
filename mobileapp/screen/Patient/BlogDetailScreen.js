import React from 'react';
import { View,StyleSheet ,ScrollView,Image,Dimensions} from 'react-native';
import { Button,  Text,  Card,  Caption,  Title,FAB } from "react-native-paper";
import * as Speech from 'expo-speech';

const height=Dimensions.get("window").height;

const CategoryDoctorScreen = ({navigation,route}) => {
    const image=route.params?.image;
    const heading=route.params?.heading;
    const details=route.params?.details+
    'Omega-3 fatty acids from fish and fish oil have been recommended by the American Heart Association for the past 20 years to reduce cardiovascular events in people who already have cardiovascular disease. But the results of studies of omega-3 supplements have been mixed, leaving both doctors and patients still wondering what to do'
    +'Thank you .Your Blogs gets completed.'
    ;

    function speak(){
      var text=heading+"."+details;
      Speech.speak(text);
    }
    return (
      <View style={{backgroundColor:'white',height:height-80}}>
        <ScrollView>
        <Image source={{ uri:image}} style={{width:'100%',height:height/3}}></Image>
         <View style={{backgroundColor:'lightpink'}}>            
            <View style={{margin:20,backgroundColor:'lightpink'}}>
              <Title style={{textAlign:'center'}}>{heading}</Title>
            </View>
            <View style={{margin:20}}>
              <Text>{details}  </Text>
              {/* <Text>{details}  </Text> */}
            </View>
         </View>
        </ScrollView>
         <FAB
           style={styles.fab}
           large
           icon="volume-high"
           onPress={() => speak()}
          //  volume-mute
         />
      </View>
    );
};

export default CategoryDoctorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  fab: {
    position: 'absolute',
    backgroundColor:'#694fad',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
