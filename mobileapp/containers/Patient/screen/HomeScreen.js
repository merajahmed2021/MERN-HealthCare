import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { View,StyleSheet,ScrollView,TouchableOpacity,Dimensions,ImageBackground,Share,ActivityIndicator} from "react-native";
import { Chip, Title, Searchbar, Button, Text, Card, Avatar, Subheading, Paragraph, Caption,Surface, List,TextInput }from "react-native-paper";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Rating, AirbnbRating } from "react-native-ratings";
import { PieChart, BarChart } from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/Ionicons';

const data = [
  {
    name: "General Medicine",
    population: 10,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  },
  {
    name: "Anaesthesis",
    population: 20,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  },
  {
    name: "Dental",
    population: 15,
    color: "yellow",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  },
  {
    name: "Dermatology",
    population: 25,
    color: "green",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  },
  {
    name: "Dietetics",
    population: 30,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  },
];

const width = Dimensions.get("window").width;

const image = { uri: "https://picsum.photos/700" };

const HomeScreen = ({ navigation, route }) => {
// const HomeScreen = () => {


  const handleShare = (name) => {
    return Share.share(
      {
        message:`This messsage is shared from Doctor Connect App,
        Doctor Name: ${name}.`,         
      },
      {dialogTitle:'Message from merajbook app'}
  
    ).then((res) => console.log(res))
    .catch((error) => console.log(error))
    ;
  }

  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);


  const [blogs, setblogs] = React.useState([]);
  const [doctor,setdoctor]=React.useState([]);
  const [loading,setloading]=React.useState(true);

  useEffect(()=>{
    axios.get(`http://192.168.43.136:5000/api/posts/latest`)
    .then((res) => {
         setblogs(res.data);
         setloading(false);    
    })
    .catch((err) =>console.log(err));
    axios.get(`http://192.168.43.136:5000/api/patient/`)
    .then((res) => {
      console.log(res.data);
      setdoctor(res.data);
      //  return res.data;
    })
    .catch((err) =>console.log(err));
  },[])



  return (
    <ScrollView>
      <View  style={styles.header} >
        <View style={{ marginLeft: 20, marginTop: 40 }}>
          <Title style={{ color: "white", fontSize: 30 }}>Find Your Desired</Title>
          <Title style={{ color: "white", fontSize: 25 }}>Doctor</Title>
        </View>
      </View>
      <View style={{ marginTop: -30 }}>
        <Card  onPress={() => navigation.navigate("Explore")}
         style={{margin:10,elevation:18,paddingHorizontal:5,paddingVertical:3,borderRadius:10}}>
           <View style={{flexDirection:'row'}}>
           <Icon style={{marginTop:10}} name="ios-search" size={30} color="gray"/>
            <TextInput style={{backgroundColor:'white',flex: 1,height:50,color:'black',fontSize:20}}
             label="Search for doctors"
             underlineColorAndroid="white"
             disabled={true}    
             textStyle={{color:'red'}}
             onPress={() => navigation.navigate("Explore")}      
             />
           </View>             
        </Card>
       
      </View>

      <View>
        <Grid style={{ marginTop: 50 }}>
          <Col size={70}>
            <Title style={{ marginLeft: 20 }}>Choose Category</Title>
          </Col>
          <Col size={30}>
            <Button  mode="text"  onPress={() => navigation.navigate("Category")}>See All</Button>
          </Col>
        </Grid>

        <Grid style={{ marginTop: 20, marginBottom: 30 }}>
          <Col>
            <TouchableOpacity   onPress={() => navigation.navigate("CategoryDoctor",{
              category:"Dietetics"})}  style={{ marginTop: 10 }}>
              <Card style={styles.center}>
                <Avatar.Image  size={60}  
                source={require("./images/service-7.png")} 
                style={styles.categoryimg1}/>
                <View>
                  <Subheading style={styles.specialisttext}>Dietetics</Subheading>
                </View>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate("CategoryDoctor",
             {category:"General Medicine"})} >
              <Card style={styles.center2}>
                <Avatar.Image  size={60}  source={require("./images/service-10.png")}  style={styles.categoryimg1}/>
                <View>
                  <Subheading  style={styles.categoryheading1}>General</Subheading>
                  <Subheading  style={styles.categoryheading2}>Medicine</Subheading>
                </View>
              </Card>
            </TouchableOpacity>
          </Col>
          <Col>
            <TouchableOpacity   onPress={() => navigation.navigate("CategoryDoctor",
             {category:"Anaesthesia"})}   style={{ marginTop: 10 }}>
              <Card style={styles.center}>
                <Avatar.Image  size={60}  source={require("./images/service-2.png")}  style={styles.categoryimg1}/>
                <View>
                  <Subheading style={styles.specialisttext}>Anaesthesia</Subheading>
                </View>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate("CategoryDoctor",
             {category:"Audio and Speech Therpy"})} >
              <Card style={styles.center2}>
                <Avatar.Image  size={60}  source={require("./images/service-3.png")}  style={styles.categoryimg1}/>
                <View>
                  <Subheading  style={styles.categoryheading1}>Audio &</Subheading>
                  <Subheading style={styles.categoryheading2}>Speech Therpy</Subheading>
                </View>
              </Card>
            </TouchableOpacity>
          </Col>
          <Col>
            <TouchableOpacity   onPress={() => navigation.navigate("CategoryDoctor",{  category:"Dental"})}  style={{ marginTop: 10 }}>
              <Card style={styles.center}>
                <Avatar.Image  size={60}  source={require("./images/service-5.png")}  style={styles.categoryimg1}/>
                <View>
                  <Subheading style={styles.specialisttext}>Dental</Subheading>
                </View>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate("CategoryDoctor",
            {category:"Critical care Specialist"})} >
              <Card style={styles.center2}>
                <Avatar.Image  size={50}  source={require("./images/service-4.png")}  style={styles.categoryimg1}/>
                <View>
                  <Subheading style={styles.categoryheading1}>Critical care</Subheading>
                  <Subheading style={styles.categoryheading2}>Specialist</Subheading>
                </View>
              </Card>
            </TouchableOpacity>
          </Col>
        </Grid>
      </View>

      <View style={{ paddingBottom: 50 }}>
        <Title style={{ marginLeft: 20, marginBottom: 10 }}>Doctors in each category</Title>
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

      {
          loading?
          <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:50}}>
              <ActivityIndicator size="large" color='#694fad'/>
          </View>
        :
      <View>
        <Grid style={{ marginTop: 10 }}>
          <Col size={70}>
            <Title style={{ marginLeft: 20 }}>Top Doctors</Title>
          </Col>
          <Col size={30}>
            <Button mode="text" onPress={() => navigation.navigate("Explore")}>  See All</Button>
          </Col>
        </Grid>

        <ScrollView  style={{ paddingTop: 20, paddingBottom: 20 }}  horizontal  scrollEventThrottle={1000}
          showsHorizontalScrollIndicator={false}>
          {doctor.map((row) => (
            <Card  style={{ margin: 5, backgroundColor: "white", borderRadius: 20 }}>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <Card.Content>
                  <Avatar.Image  size={100}  source={{ uri: `http://192.168.43.136:5000/images/${row.image}`}}/>
                </Card.Content>
                <Card.Content>
                  <Title>{row.first_name +  row.last_name}</Title>
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
                        navigation.navigate("Appointment", {  name: row.name,  work: row.hospital,})
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
          ))}

        </ScrollView>
    
        <View>
          <Grid style={{ marginTop: 10 }}>
            <Col size={70}>
              <Title style={{ marginLeft: 20 }}>Latest Blogs</Title>
            </Col>
            <Col size={30}>
              <Button mode="text" onPress={() => navigation.navigate("Blogs")}>See All</Button>
            </Col>
          </Grid>
          <ScrollView style={{marginTop:30}}>
            {
               blogs.map((row) => (
                <Card  style={styles.blogcard}   
                onPress={() => navigation.navigate("BlogDetail",
                {  id:row._id,image:row.image,title:row.title,content:row.content,description:row.description}
                )}  >
                <ImageBackground source={{uri:  `http://192.168.43.136:5000/images/${row.image}`}} 
                style={styles.image}>
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
        </View>
    }
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#694fad",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingBottom: 60,
  },
  center: {
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    marginLeft: 10,
    height: 100,
  },
  categoryimg1:{
    backgroundColor: "white",  
    marginLeft: "auto",  
    marginRight: "auto",
  },
  center2: {
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    marginLeft: 10,
    marginTop: 20,
    height: 120,
  },
  categoryheading1:{
    fontSize: 10,
    marginTop: 5,
    marginLeft: "auto",
    marginRight: "auto",
    color:'#694fad',
    fontWeight:'bold'
  },
  categoryheading2:{
    fontSize: 10,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    color:'#694fad',
    fontWeight:'bold'
  },
  specialistbox: {
    margin: 10,
    backgroundColor: "lightpink",
    borderRadius: 20,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  specialistimg: {
    backgroundColor: "white",
    height: 80,
    width: 80,
    borderRadius: 100,
    marginTop: 20,
  },
  specialisttext: {
    color: "#694fad",
    fontSize: 10,
    marginTop: 5,
    marginBottom: 30,
    fontWeight:'bold',
    marginLeft:'auto',
    marginRight:'auto'
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
    width: "95%",
    marginLeft: "auto",
    backgroundColor: "green",
  },
  sharebtn: {
    borderRadius: 20,
    height: 25,
    alignContent: "center",
    justifyContent: "center",
    width: "95%",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    height: 150,
    width:'100%',
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
