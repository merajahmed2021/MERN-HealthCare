import React from 'react';
import { View, Text, Button, StyleSheet ,ScrollView} from 'react-native';
import { List,Card ,Avatar,Paragraph} from 'react-native-paper';

const BookmarkScreen = ({navigation}) => {
    return (
      <ScrollView>
        <View>
          <Card
              style={{padding:10}}>
              <View style={{flexDirection:'row'}}>
                 <Card.Content>
                   <Avatar.Image size={60} source={{uri:'https://picsum.photos/700'}}
                    style={{ backgroundColor: 'white', marginLeft: 'auto', marginRight: 'auto' }} />
                 </Card.Content>
                 <Card.Content style={{justifyContent:'center',alignItems:'center'}}>
                   <Paragraph>Meraj Ahmed</Paragraph>
                 </Card.Content>
              </View>               
          </Card>
        </View>
       
        <View style={{marginTop:10}}>
          <List.Item style={{elevation:3,backgroundColor:'white'}}
            title="Appointment History"   onPress={() => navigation.navigate("AppointmentHistory")}
            description="See you past and present appointment"
            left={props => <List.Icon {...props} icon="card-text-outline" color="#694fad" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item style={{elevation:3,backgroundColor:'white'}}
            title="Health Blogs"    onPress={() => navigation.navigate("Blogs")}
            description="Articles and blogs regarding health and fitness"
            left={props => <List.Icon {...props} icon="ballot" color="#694fad" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item style={{elevation:3,backgroundColor:'white'}}
            title="About Doctor Connect"
            description="Company details about Doctor Connect"
            left={props => <List.Icon {...props} icon="information" color="#694fad" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item style={{elevation:3,backgroundColor:'white'}}
            title="Help and Support"
            description="Let us know your query or suggestions"
            left={props => <List.Icon {...props} icon="email"  color="#694fad" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item style={{elevation:3,backgroundColor:'white'}}
            title="Share Doctor Connect App"
            description="Share App with your friends and family"
            left={props => <List.Icon {...props} icon="share-variant" color="#694fad" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
           <List.Item style={{elevation:3,backgroundColor:'white'}}
            title="Logout"
            onPress={() => navigation.navigate("Login")}
            left={props => <List.Icon {...props} icon="logout" color="#694fad" />}
          />
        </View>
      </ScrollView>
    );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
