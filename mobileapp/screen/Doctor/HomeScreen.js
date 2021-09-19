import React,{useEffect,useState,useContext} from 'react';
import {db,db2,patientdb,storageRef,userauth} from '../../config';
// import * as firebase from "firebase";

import { View,StyleSheet, Image ,ScrollView,ImageBackground,Dimensions,ActivityIndicator} from 'react-native';
import {  Chip,  Title,  Searchbar,  Button,  Text, Card, Avatar, Subheading, Paragraph, Caption, List,Surface
} from "react-native-paper";

import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Fontawesome from 'react-native-vector-icons/FontAwesome';


import * as Speech from 'expo-speech';
import { PieChart, BarChart } from "react-native-chart-kit";
import AsyncStorage from '@react-native-async-storage/async-storage';


const width = Dimensions.get("window").width;

const data = [
  {
    name: "New ",
    population: 10,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  },
  {
    name: "Old ",
    population: 20,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  },
  {
    name: "Today Patients",
    population: 15,
    color: "yellow",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  },
  {
    name: "Week",
    population: 25,
    color: "green",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  },
  // {
    // name: "Dietetics",
    // population: 30,
    // color: "rgb(0, 0, 255)",
    // legendFontColor: "#7F7F7F",
    // legendFontSize: 12,
  // },
];




const HomeScreen = ({ navigation, route }) => {

  const [blogs, setblogs] = React.useState([]);
  const [loading,setloading]=React.useState(true);
  const [doctorname,setdoctorname]=React.useState('');

  // const heading=route.params?.heading;
  // console.log("Name : ",heading);

  const getUserdata=()=>{
    var user = userauth.currentUser;
    var name, email, photoUrl, uid, emailVerified;
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid; 
    }
    setdoctorname(name);
    // console.log(name , uid);
    // alert(email);
  }
  useEffect(()=>{
    getData();
    getUserdata();
    getblogs();
    // alert(route.params?.email)
  },[])


  // for (const item in items) {
    // console.log(item)
  // }
  // Object.entries(items).map(item => {
    // console.log(item)
  // })
  // Object.entries(items).forEach(item => {
    // console.log(item)
  // })
  // for (const item of Object.entries(items)) {
    // console.log(item)
  // }

  function getblogs(){
    let collectionRef= patientdb.collection("upcomingdoctors");
    let documents = collectionRef.get()
    .then(snapshot => {
      // alert(typeof("Snapshot is : ",snapshot));
      console.log(snapshot.size);
      Object.entries(snapshot).map(item => {
        alert(item)
      })
      snapshot.forEach(doc => {
      console.log(typeof("Document is : ",doc));
      alert("Parent Document ID: ", doc.id);
      //  let subCollectionDocs = collectionRef.doc(doc.id).collection("profile").get()
        //  .then(snapshot => {
          //  snapshot.forEach(doc => {
            //  alert("Sub Document ID: ", doc.id);
          //  })
        //  }).catch(err => {
          //  alert("Error getting sub-collection documents", err);
        //  })
     });
   }).catch(err => {
  alert("Error getting documents", err);
 });

    //  var data= patientdb.collection("upcomingdoctors");
    //  data.get().then((querySnapshot) => {
      // querySnapshot.forEach((doc) => {
      //  var subdata= data.doc(doc.id).collection('blogs').get().then((snapshot)=>{
          // snapshot.forEach((doc)=>{
            // alert(doc.id);
          // })
        // })
        // .catch(err => {
          // alert("Error getting sub-collection documents", err);
        // })
      // })
    //  })
    //  .catch(err => {
      // alert("Error getting collection documents", err);
    // })
    //  ;
    //  alert(data);
  }


  // const doctorName = useContext(AuthContext);
  // console.log(doctorName);

  async function getData(){
    let blogs=[];
    patientdb.collection("blogs").limit(3).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
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
      <ScrollView>
        <View  style={styles.header} >
          <View style={{ marginLeft: 20, marginTop: 40 }}>
            <Title style={{ color: "white", fontSize: 30 }}>Welcome</Title>
            <Title style={{ color: "white", fontSize: 25 }}>Dr. {doctorname}</Title>
          </View>
        </View>

        <Surface style={{paddingVertical:10,borderRadius:10,marginHorizontal:30,elevation:20,marginTop:-30}}>
           <Title style={{textAlign:'center' }}>Patient Dashboard</Title>
        </Surface>


        <View style={{ paddingBottom:30,marginTop:30 }}>
        <PieChart
          data={data}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          // chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"5"}
          center={[10, 10]}
          absolute
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
        />
      </View>


        {/* <Card style={{marginHorizontal:10,marginVertical:20,padding:20,borderRadius:25}}>
          <Title style={{textAlign:'center'}}>Dashboard</Title>
          <View style={{marginVertical:10}}>
            <Text style={{marginVertical:5,fontSize:15}}>Number of patient  in this week: 18</Text>
            <Text style={{marginVertical:5,fontSize:15}}>Number of patient in month     : 45</Text>
            <Text style={{marginVertical:5,fontSize:15}}>Today patient's appointment  : 32</Text>
          </View>
        </Card>
         */}
        <View style={{marginTop:10}}>
            <Grid>
              <Col style={{marginLeft:10}}>
                  <Card style={styles.center} onPress={() => navigation.navigate("Allpatient")}>
                    <Fontawesome name='group' style={[styles.iconstyle,{color:'green'}]} />
                    <View>
                      <Subheading style={styles.text}>Patients</Subheading>
                    </View>
                  </Card>
                  <Card style={styles.center} onPress={() => navigation.navigate("DoctorBlog")}>
                   <Fontawesome name='pencil-square-o' style={[styles.iconstyle,{color:'blue'}]} />
                    <View>
                      <Subheading style={styles.text}>Write Blogs</Subheading>
                    </View>
                  </Card>
              </Col>
              <Col style={{marginRight:10}}>
                  <Card style={styles.center} onPress={() => navigation.navigate("DoctorProfile")}>
                    <Fontisto name='doctor'style={[styles.iconstyle,{color:'red'}]}/>
                    <View>
                      <Subheading style={styles.text}>Profile</Subheading>
                    </View>
                  </Card>
                  <Card style={styles.center} onPress={() => navigation.navigate("DoctorSettings")}>
                  <Icon name='ios-settings-outline' style={[styles.iconstyle,{color:'black'}]} />
                    <View>
                      <Subheading style={styles.text}>Settings</Subheading>
                    </View>
                  </Card>
              </Col>
            </Grid>
        </View>

        <View>
          <Grid style={{ marginTop: 10 }}>
            <Col size={70}>
              <Title style={{ marginLeft: 20 }}>Latest Blogs</Title>
            </Col>
            <Col size={30}>
              <Button mode="text" onPress={() => navigation.navigate("DoctorAllBlogs")}>See All</Button>
            </Col>
          </Grid>
          <ScrollView style={{marginTop:30}} >


          {
             loading?
             <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:50,marginBottom:50}}>
                 <ActivityIndicator size="large" color='#694fad'/>
             </View>
           :
               blogs.map((row) => (
                <Card  style={styles.blogcard}   
                onPress={() => navigation.navigate("DoctorBlogsDetails",
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
              blogs.blog.slice(0, 3).map((row) => (
                <Card  style={styles.blogcard}   
                onPress={() => navigation.navigate("DoctorBlogsDetails",
                {
                  image:row.img,
                  heading:row.heading,
                  details:row.details
                }
                )}                 >
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
      </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#694fad",
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    paddingBottom: 60,
  },
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  center: {
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    margin:10,
    // marginLeft: 10,
    height: 150,
  },
  iconstyle:{
    fontSize: 80, 
    // color: '#694fad',
    color: 'pink',
    marginLeft: "auto",  
    marginRight: "auto",
    marginTop:10
  },
  text: {
    color: "#694fad",
    fontSize: 15,
    marginTop: 5,
    marginBottom: 30,
    fontWeight:'bold',
    marginLeft:'auto',
    marginRight:'auto'
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
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  blogbox: {
    height: "100%",
    backgroundColor: "#000000a0",
  }
});
