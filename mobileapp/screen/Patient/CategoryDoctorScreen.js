import React,{useEffect,useState} from "react";
import {db,db2,patientdb,storageRef} from '../../config';

import { View, StyleSheet, ScrollView ,Share,ActivityIndicator} from "react-native";
import {Card,Searchbar,Text,Button,Avatar,Title,Paragraph,Caption,} from "react-native-paper";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Rating, AirbnbRating } from "react-native-ratings";


const ExploreScreen = ({ navigation, route }) => {

  const handleShare = (name) => {
    // message = 'This messsage is shared from merajbook of facebook clone.';
    return Share.share(
      {
        message:`This messsage is shared from Doctor Connect App,
           Doctor Name: ${name}.
           `,
      },
      {dialogTitle:'Sharing with Doctor Connect App'}
  
    ).then((res) => console.log(res))
    .catch((error) => console.log(error))
    ;
  }

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);



  const [doctor,setdoctor]=React.useState([]);
  const [loading,setloading]=React.useState(true);

  useEffect(()=>{
    getData();
  },[])

  async function getData(){
    let doctors=[];
    patientdb.collection("doctors").where("experincecategory", "==", route.params?.category).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          doctors.push({
            name:doc.data().name,
            experinces:doc.data().experinces,
            experincescategory:doc.data().experincecategory,
            hospital:doc.data().hospital,
            hospitaladdress:doc.data().hospitaladdress,
            qualification:doc.data().qualification,
            about:doc.data().about,
            image:doc.data().image
          })
      });
      setdoctor(doctors);
      if(loading){
        setloading(false);
      }
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });
  }



  return (
    <View style={{ marginBottom: 50 }}>
      <View  style={{
        backgroundColor: "#694fad",borderBottomRightRadius: 20,borderBottomLeftRadius: 20, paddingBottom: 30,
      }} ></View>
      <View style={{ marginTop: -25 }}>
        <Searchbar  onChangeText={onChangeSearch}  value={searchQuery}   placeholder="Search for doctors"
          style={{  marginLeft: 10,  marginRight: 10,  backgroundColor: "white",  elevation: 12}}/>
      </View>

      <ScrollView>






      {
        loading?
             <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:50}}>
                 <ActivityIndicator size="large" color='#694fad'/>
             </View>
           :
           doctor.filter((val)=>{
            if(searchQuery==" "){
              return val;
            }else if(val.name.toLowerCase().includes(searchQuery.toLowerCase())){
                return val;
            }
          }).map((row) => (
            <Card  style={{ margin: 5, backgroundColor: "white", borderRadius: 20 }}>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <Card.Content>
                  <Avatar.Image  size={100}  source={{ uri: row.image}}/>
                </Card.Content>
                <Card.Content>
                  <Title>{row.name}</Title>
                  <Paragraph style={{ marginTop: -5 }}>{row.experincescategory}</Paragraph>
                  <Caption>{row.hospital}</Caption>
                  <View style={{ marginLeft: -20, marginTop: 5 }}>
                    <AirbnbRating  count={5}  defaultRating={3}  showRating={false}  
                    unSelectedColor="lightgray"  selectedColor="orange"  isDisabled={true}  size={15}/>
                  </View>
                </Card.Content>
              </View>
              <Card.Actions>
                <Grid>
                  <Col size={40} style={{ marginTop: 5 }}>
                    <Button  mode="contained"  uppercase={false}  style={styles.appointbtn}
                      onPress={() =>
                        navigation.navigate("Appointment", {
                          name: row.name,
                          work: row.hospital,
                        })
                      }
                    >Appointment</Button>
                  </Col>
                  <Col size={30} style={{ marginTop: 5 }}>
                    <Button  mode="contained"  uppercase={false}  style={styles.detailsbtn}
                      onPress={() =>
                        navigation.navigate("DoctorProfile", {
                          // bgimg: row.statusimg,
                          img: row.image,
                          name: row.name,
                          work: row.experincescategory,
                          workat: row.hospital,
                          study: row.qualification,
                          address: row.hospitaladdress,
                          details: row.about,
                          experinces:row.experinces
                        })
                      }
                    >
                      Details
                    </Button>
                  </Col>
                  <Col size={30} style={{ margin: 5 }}>
                    <Button  mode="contained"  uppercase={false}  style={styles.sharebtn}  
                       onPress={()=>handleShare(row.username)}>Share</Button>
                  </Col>
                </Grid>
              </Card.Actions>
            </Card>
          ))
        } 









        {/* {  
        Post.data.filter((val)=>{
          if(searchQuery==" "){
            return val;
          }else if(val.username.toLowerCase().includes(searchQuery.toLowerCase())){
              return val;
          }
        }).map((row) => (
          <Card  style={{ margin: 10, backgroundColor: "white", borderRadius: 20 }}>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Card.Content>
                <Avatar.Image  size={100}  source={{uri: row.userimg}}/>
              </Card.Content>
              <Card.Content>
                <Title>{row.username}</Title>
                <Paragraph style={{ marginTop: -5 }}>{route.params?.category}</Paragraph>
                <Caption>{row.workat}</Caption>
                <View style={{ marginLeft: -20, marginTop: 5 }}>
                  <AirbnbRating  count={5}  defaultRating={3}  showRating={false}
                    unSelectedColor="lightgray"  selectedColor="orange"  isDisabled={true}  size={15}/>
                </View>
              </Card.Content>
            </View>
            <Card.Actions>
              <Grid>
                <Col size={40} style={{ marginTop: 5 }}>
                  <Button  mode="contained"  uppercase={false}  style={styles.appointbtn}
                    onPress={() =>
                      navigation.navigate("Appointment", {
                        name: row.username,
                        work: row.work,
                      })
                    }
                  >Appointment</Button>
                </Col>
                <Col size={30} style={{ marginTop: 5 }}>
                  <Button  mode="contained"  uppercase={false}  style={styles.detailsbtn}
                    onPress={() =>
                      navigation.navigate("DoctorProfile", {
                        bgimg: row.statusimg,
                        img: row.userimg,
                        name: row.username,
                        work: row.work,
                        workat: row.workat,
                        study: row.study,
                        address: row.address,
                        details: row.message,
                      })
                    }
                  >  Details</Button>
                </Col>
                <Col size={30} style={{ margin: 5 }}>
                  <Button  mode="contained"  uppercase={false}  style={styles.sharebtn}
                    onPress={()=>handleShare(row.username)}>Share</Button>
                </Col>
              </Grid>
            </Card.Actions>
          </Card>
        ))} */}
      </ScrollView>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  appointbtn: {
    borderRadius: 20,
    height: 25,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  detailsbtn: {
    borderRadius: 20,
    height: 25,
    alignContent: "center",
    justifyContent: "center",
    width: "90%",
    marginLeft: "auto",
    backgroundColor: "green",
  },
  sharebtn: {
    borderRadius: 20,
    height: 25,
    alignContent: "center",
    justifyContent: "center",
    width: "90%",
  },
});
