import React from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity ,Linking,Platform,Dimensions} from 'react-native';
import { Chip, Title, Caption, List, Button,Card,Text ,Avatar,Paragraph,IconButton,Surface, Subheading,Divider} from 'react-native-paper';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const height=Dimensions.get('window').height;

const DoctorProfileScreen = ({ navigation, route }) => {

   const dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
 };


    return (
      <ScrollView >
          {/* <View style={{ backgroundColor: '#694fad',paddingBottom:50,paddingTop:10}}>
              <Card style={{padding:10,paddingTop:20,paddingBottom:20,elevation:1}}>
                <Grid>
                    <Col style={{alignContent:'center',justifyContent:'center'}}>
                      <Avatar.Image size={100}  source={{ uri:route.params?.img }} 
                        style={{marginLeft:'auto',marginRight:'auto'}}
                      />                  
                    </Col>
                    <Col style={{alignContent:'center',justifyContent:'center'}}>
                      <Title>{route.params?.name}</Title>
                      <Paragraph>{route.params?.work}</Paragraph>
                      <Caption>{route.params?.workat}</Caption>
                    </Col>
                </Grid>
              </Card>
          </View> */}
          <Card style={{elevation:15,borderBottomLeftRadius:50,borderBottomRightRadius:50}}>
            <View style={{height:height/6,backgroundColor:'#694fad'}}></View>
            <View style={{paddingHorizontal:30,backgroundColor:'white',borderBottomLeftRadius:50,borderBottomRightRadius:50}}>
              <Surface style={{height:110,width:110,borderRadius:100,alignContent:'center',
              justifyContent:'center',marginTop:-50}}>
                <Avatar.Image size={100}  source={{ uri:route.params?.img }} 
                   style={{marginLeft:'auto',marginRight:'auto'}}
                 />
              </Surface>
              <Grid style={{height:height/5,marginTop:30,flexDirection:'row'}}>
                <Col>
                    <Title>{route.params?.name}</Title>
                    <Paragraph>{route.params?.work}</Paragraph>
                    <Caption>{route.params?.workat}</Caption>
                </Col>
                <Col>
                  <View style={{ flexDirection: 'row'}}>
                    <Icon name='ios-thumbs-up-sharp' style={{ fontSize: 20, color: '#694fad',marginLeft:40 }} />
                    <Text style={{ padding: 3 }}>Feedback</Text>
                  </View>
                  <View style={{ marginLeft:20, marginTop: 10 }}>
                    <AirbnbRating count={5} defaultRating={3} showRating={false}
                      unSelectedColor="lightgray"
                      selectedColor="orange" isDisabled={true} size={15}
                    />
                  </View>
                </Col>
            </Grid>
            </View>
          </Card>



        <View style={{ backgroundColor: 'white', paddingTop: 50, 
        borderTopLeftRadius: 50, borderTopRightRadius: 50, marginTop: 30,elevation:15 }}>
          <View style={{ paddingBottom: 30 }}>
            {/* <Card style={{ margin: 10,elevation:10,padding:20}}>
              <Grid>
                <Col size={60}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name='md-wallet-sharp' style={{ fontSize: 20, color: '#694fad' }} />
                    <Text style={{ padding: 3 }}>Consultancy Fees</Text>
                  </View>
                  <View>
                    <Caption style={{ fontSize: 15 }}>Rs 500</Caption>
                  </View>
                </Col>
                <Col size={40}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name='ribbon-sharp' style={{ fontSize: 20, color: '#694fad' }} />
                    <Text style={{ padding: 3 }}>Experiences</Text>
                  </View>
                  <View>
                    <Caption style={{ fontSize: 15 }}>{route.params?.experinces} years</Caption>
                  </View>
                </Col>
              </Grid>
              <Grid>
                <Col size={60} style={{ paddingTop: 20 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name='calendar' style={{ fontSize: 20, color: '#694fad' }} />
                    <Text style={{ margin: 5 }}>Availability</Text>
                  </View>
                  <View>
                    <Caption style={{ fontSize: 15 }}>9:00 am to 6:00 pm</Caption>
                    <Caption style={{ fontSize: 15 }}>(Monday to Saturday)</Caption>
                  </View>
                </Col>
                <Col size={40} style={{ paddingTop: 20 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name='ios-thumbs-up-sharp' style={{ fontSize: 20, color: '#694fad' }} />
                    <Text style={{ padding: 3 }}>Feedback</Text>
                  </View>
                  <View style={{ marginLeft: -20, marginTop: 10 }}>
                    <AirbnbRating count={5} defaultRating={3} showRating={false}
                      unSelectedColor="lightgray"
                      selectedColor="orange" isDisabled={true} size={15}
                    />
                  </View>
                </Col>
              </Grid>
            </Card> */}
            <Card style={{ margin: 10, marginTop: 10,padding:20,elevation:10}}>
              <Title><Fontisto name='doctor' style={{ fontSize: 20, color: '#694fad' }} />  About Doctor</Title>
              <Caption style={{fontSize:15}}>{route.params?.details}</Caption>
            </Card>
            <Card style={{ margin:10, marginTop: 10,padding:10,elevation:10 }}>
              <View style={{padding:15}}>
                <Title>
                   <Icon name='calendar' style={{ fontSize: 20, color: '#694fad' }} /> Details
                </Title>
              </View>
              <Divider/>
                <View style={{marginVertical:20}}>
                <Grid>
                    <Col size={60} style={{marginLeft:20}}>
                      <View style={{ flexDirection: 'row' }}>
                        <Icon name='md-wallet-sharp' style={{ fontSize: 20, color: '#694fad' }} />
                        <Text style={{ padding: 3 }}>Consultancy Fees</Text>
                      </View>
                      <View>
                        <Caption style={{ fontSize: 15 }}>Rs 500</Caption>
                      </View>
                    </Col>
                    <Col size={40}>
                      <View style={{ flexDirection: 'row' }}>
                        <Icon name='ribbon-sharp' style={{ fontSize: 20, color: '#694fad' }} />
                        <Text style={{ padding: 3 }}>Experiences</Text>
                      </View>
                      <View>
                        <Caption style={{ fontSize: 15 }}>{route.params?.experinces} years</Caption>
                      </View>
                    </Col>
                  </Grid>
              </View>
              <Divider style={{backgroundColor:'blue'}}/>

              <Title style={{marginTop:20,marginLeft:20}}>
                <MaterialCommunityIcons name='hospital-building' style={{ fontSize: 20, color: '#694fad' }} />  Hospital</Title>
                 <Divider style={{marginTop:20}}/>
                 <Grid>
                   <Col size={80}>
                   <List.Item 
                      titleNumberOfLines={1}
                      // descriptionNumberOfLines={2}
                      // description={route.params?.address}
                      // title={route.params?.workat}
                      title={
                      <View>
                          <Subheading>{route.params?.workat}
                            {/* <MaterialCommunityIcons name='hospital-building' style={{ fontSize: 20, color: '#694fad' }} />  {route.params?.workat} */}
                          </Subheading>
                      </View>}
                      description={
                      <View>
                        <View size={60} style={{ paddingTop:5 }}>
                          <Caption>{route.params?.address}</Caption>
                          <View>
                            <Caption>9:00 am to 6:00 pm</Caption>
                            <Caption>(Monday to Saturday)</Caption>
                          </View>
                        </View>
                        {/* <Divider style={{width:"100%",marginTop:20,color:'red',backgroundColor:'blue'}}/> */}
                      </View>
                      }
                    />                   
                   </Col>
                   <Col size={20}>
                   <IconButton  icon="phone"  color="#694fad"  size={30}
                    onPress={()=>{dialCall(1234567891)}}
                  />
                   </Col>
                 </Grid>
              
            </Card>
          </View>
          <View style={{ paddingBottom: 30, margin: 20 }}>
            <Button mode="contained" uppercase={false} style={{ borderRadius: 30, padding: 5 }}
              onPress={() => navigation.navigate('Appointment',
                {
                  name: route.params?.name,
                  work: route.params?.work
                }
              )}
            >
              Make an Appointment
             </Button>
          </View>
          {/* <View style={{margin:20}}> */}
            {/* <Title>Reviews</Title>   */}
          {/* </View>  */}
        </View>  
      </ScrollView>
    );
};

export default DoctorProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
