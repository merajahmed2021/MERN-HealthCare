import React,{useState,useEffect} from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image } from "react-native";
import {  TextInput,  Button,  Text,  Card,  Caption,  Title,} from "react-native-paper";
import { RadioButton,IconButton,Colors  } from "react-native-paper";


import { Col, Row, Grid } from "react-native-easy-grid";
import * as ImagePicker from 'expo-image-picker';

const category = [
  {
    name: "General Medicine",
    value: "General Medicine",
  },
  {
    name: "Anaesthesis",
    value: "Anaesthesis",
  },
  {
    name: "Audiology & Speech Therapy",
    value: "Audiology",
  },
  {
    name: "Critical Care Specialist",
    value: "Critical Care",
  },
  {
    name: "Dental",
    value: "Dental",
  },
  {
    name: "Dermatology",
    value: "Dermatology",
  },
  {
    name: "Dietetics",
    value: "Dietetics",
  },
  {
    name: "Gastroenterology",
    value: "Gastroenterology",
  },
  {
    name: "General & Laparoscopic Surgery",
    value: "Laparoscopic",
  },
  {
    name: "Gynaecology & Obstetrics",
    value: "Gynaecology",
  },
  {
    name: "Others",
    value: "other",
  },
];

const RegistrationformScreen = () => {
  
  //FOR IMAGE UPLOAD 
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  
  
  
  
  
  const [text, setTextname] = React.useState("");

  const [checked, setChecked] = React.useState(" ");
  console.log(checked);

  function radiobtn(value) {
    // console.log(value);
    setChecked(value);
  }
  // const pimage="https://picsum.photos/700";
  // pimage=='https://picsum.photos/700'?image:'https://picsum.photos/700';

  return (
    <ScrollView>
      <Card style={{ margin: 10}}>
        <View style={{flexDirection:'row'}}>
           <Image
             size={150}
             source={{ uri:image}}
             style={{ width: 150, height: 150,borderRadius:100,marginLeft:'auto',marginTop:30}}
           />
            <IconButton
             icon="image"
             color="#694fad"
             size={50}
             style={{border:'1px solid red'}}
             onPress={pickImage}
             style={{marginRight:'auto',marginTop:75,marginLeft:-50}}
           />
           {/* <Caption>Upload image</Caption> */}
        </View>
        {/* <View style={styles.container}> */}
          {/* <Title style={{ color: "white", paddingTop: 10 }}>Profile</Title> */}
        {/* </View> */}
        <View style={{ padding: 10 }}>
          <TextInput
            label="Doctor Name*"
            mode="outlined"
            style={{ marginTop: 30 }}
            value={text}
            onChangeText={(text) => setTextname(text)}
          />
          <TextInput
            label="Qualification*"
            mode="outlined"
            style={{ marginTop: 30 }}
            value={text}
            onChangeText={(text) => setTextname(text)}
          />
          <TextInput
            label="College name you studied*"
            mode="outlined"
            style={{ marginTop: 30 }}
            value={text}
            onChangeText={(text) => setTextname(text)}
          />
          <TextInput
            label="Year of your last qualification*"
            mode="outlined"
            style={{ marginTop: 30 }}
            value={text}
            onChangeText={(text) => setTextname(text)}
          />
          <TextInput
            label="Complete Address*"
            mode="outlined"
            style={{ marginTop: 30 }}
            value={text}
            onChangeText={(text) => setTextname(text)}
          />
          <TextInput
            label="Year of Experiences*"
            mode="outlined"
            style={{ marginTop: 30 }}
            value={text}
            onChangeText={(text) => setTextname(text)}
          />

          <View style={{ marginTop: 20 }}>
            {/* <RadioButton
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
      /> */}

            {category.map((row) => (
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "space-between",
                  marginLeft: 20,
                }}
              >
                <RadioButton
                  value={row.value}
                  color="#694fad"
                  name={row.value}
                  // status={ checked===row.value? 'checked' : 'unchecked' }
                  // status={checked.selected ==true }
                  status={checked === row.value ? "checked" : "unchecked"}
                  // onPress={() => setChecked(!checked)}
                  onPress={() => radiobtn(row.value)}
                />
                <Text style={{ margin: 5 }}>{row.name}</Text>
              </View>
            ))}

          
          </View>

          <View>
              <TextInput  mode="outlined"
                 label="About you" style={{marginTop:20}}
                //  value={details}
                 multiline={true}
                 numberOfLines={6}
                //  onChangeText={text => setdetails(text)}
               />
          </View>

          <View>
            <View style={{ margin: 30 }}>
              <Title style={{ textAlign: "center" }}>Hospital Details</Title>
            </View>
            <TextInput
              label="Working Hospital Name*"
              mode="outlined"
              style={{ marginTop: 30 }}
              value={text}
              onChangeText={(text) => setTextname(text)}
            />
            <TextInput
              label="Hospital Address-State,District,City*"
              mode="outlined"
              style={{ marginTop: 30 }}
              value={text}
              onChangeText={(text) => setTextname(text)}
            />
          </View>

          <View style={{ marginTop: 30, paddingBottom: 30 }}>
            <Button mode="contained">Update Profile</Button>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};

export default RegistrationformScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    backgroundColor: "#694fad",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
});
