import React,{useEffect,useState} from 'react';
import { View,StyleSheet,ScrollView,ImageBackground,ActivityIndicator } from 'react-native';
import {Card,List} from "react-native-paper";
import axios from 'axios';
const BlogScreen = ({navigation}) => {



  const [blogs, setblogs] = React.useState([]);
  const [loading,setloading]=React.useState(true);

  useEffect(()=>{
    axios.get(`http://192.168.43.136:5000/api/posts`)
    .then((res) => {
         setblogs(res.data);
         setloading(false);    
    })
  },[])

    return (
      <View >
        <ScrollView style={{marginBottom:5}}>
        {
             loading?
             <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:50}}>
                 <ActivityIndicator size="large" color='#694fad'/>
             </View>
           :
               blogs.map((row) => (
                <Card  style={styles.blogcard}   onPress={() => navigation.navigate("BlogDetail",{
                  id:row._id,image:row.image,title:row.title,content:row.content,description:row.description})}  >
                <ImageBackground source={{uri: `http://192.168.43.136:5000/images/${row.image}`}} style={styles.image}>
                  <View style={styles.blogbox}>
                    <List.Item style={{elevation:3,marginTop:50}}
                      titleStyle={{color:'white',fontSize:20,fontWeight:'bold'}}
                      descriptionStyle={{color:'white'}}  titleNumberOfLines={1}  descriptionNumberOfLines={2}  
                      title={row.title}
                      description={row.content}
                    />
                  </View>
                </ImageBackground>
              </Card>
              ))
        } 
        </ScrollView>
      </View>
    );
};

export default BlogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    height: 150,
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 20,
  },
  blogcard:{
    marginTop: 10,
    marginBottom:0,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  blogbox: {
    height: "100%",
    backgroundColor: "#000000a0",
  }
});
