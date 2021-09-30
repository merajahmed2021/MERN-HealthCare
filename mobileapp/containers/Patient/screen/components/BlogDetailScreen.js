import React,{useEffect,useState} from 'react';
import { View,StyleSheet ,ScrollView,Image,Dimensions} from 'react-native';
import { Button,  Text,  Card,  Caption,  Title,FAB } from "react-native-paper";
import axios from 'axios';

const height=Dimensions.get("window").height;

const CategoryDoctorScreen = ({navigation,route}) => {

  const [blogDetails, setblogDetails] = useState([]);

  // useEffect(()=>{
  //   axios.get(`http://192.168.43.136:5000/api/posts/blogs/${route.params?.id}`)
  //   .then((res) => {
  //     console.log(res.data);
  //     setblogDetails(res.data);
  //   })
  //   .catch((err) =>console.log(err));
  // },[]);


    const image=route.params?.image;
    const title=route.params?.title;
    const content=route.params?.content;
    const description=route.params?.description;

    return (
      <View style={{backgroundColor:'white',height:height-80}}>
        <ScrollView>
        <Image source={{ uri: `http://192.168.43.136:5000/images/${image}`}} style={{width:'100%',height:height/3}}></Image>
         <View style={{backgroundColor:'lightpink'}}>            
            <View style={{margin:20,backgroundColor:'lightpink'}}>
              <Title style={{textAlign:'center'}}>{title}</Title>
            </View>
            <View style={{margin:20}}>
              <Text>{content}  </Text>
              <Text>{description}  </Text>
            </View>
         </View>
        </ScrollView>       
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
