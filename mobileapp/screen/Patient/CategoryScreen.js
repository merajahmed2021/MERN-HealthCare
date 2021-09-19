import React from 'react';
import { View,   StyleSheet ,TouchableOpacity,ScrollView} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph,Text,List} from 'react-native-paper';

const Category=[
    {
        name:'General Medicine',
        image:require('../images/service-10.png')
    },
    {
        name:'Anaesthesis',
        image:require('../images/service-2.png')
    },
    {
        name:'Audiology & Speech Therapy',
        image:require('../images/service-3.png')
    },
    {
        name:'Critical Care Specialist',
        image:require('../images/service-4.png')
    },
    {
        name:'Dental',
        image:require('../images/service-5.png')
    },
    {
        name:'Dermatology',
        image:require('../images/service-6.png')
    },
    {
        name:'Dietetics',
        image:require('../images/service-7.png')
    },
    {
        name:'Gastroenterology',
        image:require('../images/service-8.png')
    },
    {
        name:'General & Laparoscopic Surgery',
        image:require('../images/service-9.png')
    },
    {
        name:'Gynaecology & Obstetrics',
        image:require('../images/service-1.png')
    }
]

const CategoryScreen = ({navigation}) => {
    return (
      <ScrollView>
        <View>
            {
              Category.map((row) => (
                <Card onPress={() => navigation.navigate("CategoryDoctor",
                {
                  category:row.name
                }
                )} 
                    style={{marginLeft:10,padding:10,marginRight:10,marginTop:5}}>
                    <View style={{flexDirection:'row'}}>
                       <Card.Content>
                         <Avatar.Image size={60} source={row.image}
                          style={{ backgroundColor: 'white', marginLeft: 'auto', marginRight: 'auto' }} />
                       </Card.Content>
                       <Card.Content style={{justifyContent:'center',alignItems:'center'}}>
                         <Paragraph>{row.name}</Paragraph>
                       </Card.Content>
                    </View>               
                </Card>
              ))
            }
        </View>
      </ScrollView>
    );
};
export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
