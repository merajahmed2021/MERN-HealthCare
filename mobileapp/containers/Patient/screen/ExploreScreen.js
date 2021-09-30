import React,{useEffect,useState} from "react";
import { View, StyleSheet, ScrollView ,Share,ActivityIndicator} from "react-native";
import {Card,Searchbar,Text,Button,Avatar,Title,Paragraph,Caption} from "react-native-paper";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Rating, AirbnbRating } from "react-native-ratings";
import axios from "axios";

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
    axios.get(`http://192.168.43.136:5000/api/patient/`)
    .then((res) => {
      setdoctor(res.data);
      setloading(false);
    })
    .catch((err) =>console.log(err));
     
  },[])





  return (
    <View style={{ marginBottom: 50 }}>
      <View style={{backgroundColor: "#694fad",borderBottomRightRadius: 20,borderBottomLeftRadius: 20,paddingBottom: 30}}></View>
      <View style={{ marginTop: -25 }}>
        <Searchbar placeholder="Search for doctors" onChangeText={onChangeSearch} value={searchQuery} 
          style={{marginLeft: 10,marginRight: 10,backgroundColor: "white",elevation: 12, }}
        />
      </View>
    
      <ScrollView>
      {
        loading?
             <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:50}}>
                 <ActivityIndicator size="large" color='#694fad'/>
             </View>
           :
          //  doctor.filter((val)=>{
            // if(searchQuery==" "){
              // return val;
            // }else if(val.name.toLowerCase().includes(searchQuery.toLowerCase())){
                // return val;
            // }
          // })
          doctor.map((row) => (
            <Card  style={{ margin: 5, backgroundColor: "white", borderRadius: 20 }}>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <Card.Content>
                  <Avatar.Image  size={100}  source={{ uri: `http://192.168.43.136:5000/images/${row.image}`}}/>
                </Card.Content>
                <Card.Content>
                  <Title>{row.first_name + row.last_name}</Title>
                  <Paragraph style={{ marginTop: -5 }}>{row.hospital}</Paragraph>
                  {/* <Paragraph style={{ marginTop: -5 }}>{'MBBS, MS'}</Paragraph> */}
                  <Caption>{'Cardiologist'}</Caption>
                  <Caption>{'MBBS, MS'}</Caption>
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
                          id:row._id,
                          name: row.first_name+ row.last_name,
                          work: row.hospital,
                        })
                      }
                    >Appointment</Button>
                  </Col>
                  <Col size={30} style={{ marginTop: 5 }}>
                    <Button  mode="contained"  uppercase={false}  style={styles.detailsbtn}
                      onPress={() =>
                        navigation.navigate("DoctorProfile", {
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
                      Profile
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
