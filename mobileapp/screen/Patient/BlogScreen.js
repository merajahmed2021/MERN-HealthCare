import React,{useEffect,useState} from 'react';

import {db,db2,patientdb,storageRef} from '../../config';

import { View,StyleSheet,ScrollView,ImageBackground,ActivityIndicator } from 'react-native';
import {Card,List} from "react-native-paper";

const BlogScreen = ({navigation}) => {



  const [blogs, setblogs] = React.useState([]);
  const [loading,setloading]=React.useState(true);

  useEffect(()=>{
    getData();
  },[])

  async function getData(){
    let blogs=[];
    patientdb.collection("blogs").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            blogs.push({
              heading:doc.data().heading,
              details:doc.data().details,
              image:doc.data().image
            })
        });
        setblogs(blogs);
        if(loading){
          setloading(false);
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  }





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
                <Card  style={styles.blogcard}   
                onPress={() => navigation.navigate("BlogDetail",
                {  image:row.image,  heading:row.heading,  details:row.details}
                )}  >
                <ImageBackground source={{uri:row.image}} style={styles.image}>
                  <View style={styles.blogbox}>
                    <List.Item style={{elevation:3,marginTop:50}}
                      titleStyle={{color:'white',fontSize:20,fontWeight:'bold'}}
                      descriptionStyle={{color:'white'}}  titleNumberOfLines={1}  descriptionNumberOfLines={2}  
                      title={row.heading}
                      description={row.details}
                    />
                  </View>
                </ImageBackground>
              </Card>
              ))
        } 


          {/* {
            blogs.blog.map((row) => (
              <Card  style={styles.blogcard}    onPress={() => navigation.navigate("BlogDetail",
              {
                image:row.img,
                heading:row.heading,
                details:row.details
              }
              )}  >
              <ImageBackground source={{uri:row.img}} style={styles.image}>
                <View style={styles.blogbox}>
                  <List.Item style={{elevation:3,marginTop:50}}
                    titleStyle={{color:'white',fontSize:20,fontWeight:'bold'}}
                    descriptionStyle={{color:'white'}}
                    titleNumberOfLines={1}
                    descriptionNumberOfLines={2}
                    title={row.heading}
                    description={row.details}
                  />
                </View>
              </ImageBackground>
            </Card>
            ))
          } */}
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
