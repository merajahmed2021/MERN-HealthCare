import React,{useState,useEffect} from 'react';
import {db,db2,patientdb,storageRef,userauth} from '../../config';

import { View, StyleSheet ,ScrollView,Image,ImageBackground,ActivityIndicator} from 'react-native';
import { TextInput,Button,Text,Card ,Caption,Title,List,Subheading} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const DoctorBlogScreen = ({navigation}) => {

  const [text, setText] = React.useState('');
  const [details, setdetails] = React.useState('');

  const [image, setImage] = useState(null);
  const [imageurl, setImageurl] = useState(null);
  const [progress, setprogress] = useState(0);
  // console.log(image);

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

    // console.log(result);

    if (!result.cancelled) {
      // setImage(result.uri)
      uploadImage(result.uri,Math.random()).then(()=>{
          console.log("Image uploaded");
       })
       .catch((error)=>{
           console.log(error)
      })
    }
  };

  const uploadImage=async (uri,imageName)=>{
      const response=await fetch(uri);
      const blob=await response.blob();
      var ref= storageRef.child('images/' + imageName);
  
      return ref.put(blob).on('state_changed', 
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setprogress(progress);
        console.log('Upload is ' + progress + '% done');
       
        },
        (error) => alert(error), /* this is where you would put an error callback! */
        () => {
          storageRef.child(`images/${imageName}`)
          // storageRef.ref('images/').child(image.imageName)
          .getDownloadURL().then((url)=>{
              // console.log(url);
              setImage(url)
          });
        }

      )
     
  }
  function handlesubmit(){
    patientdb.collection('upcomingdoctors').doc(userauth.currentUser.uid).collection("blogs").add({
      heading:text,
      details:details,
      image:image
    }).then(()=>{
      alert("Blogs Posted");
    }).catch((error)=>{
      console.log(error.message);
    })



    // storageRef.child('images/').listAll()
    //   .then((res) => {
    //     res.items.forEach((itemRef) => {
    //       itemRef.getDownloadURL().then(url => {
    //         console.log(url)
    //       })
    //     });
    //   }).catch((error) => {
    //     console.log(error);
    //   });

  }


  const [blogs, setblogs] = React.useState([]);
  const [loading,setloading]=React.useState(true);

  useEffect(()=>{
    getData();
  },[])

  async function getData(){
    let blogs=[];
    patientdb.collection('upcomingdoctors').doc(userauth.currentUser.uid).collection("blogs").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          blogs.push({
              heading:doc.data().heading,
              details:doc.data().details,
              blogimage:doc.data().image
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
    // console.log(doc.id, " => ", doc.data());


    return (
      <ScrollView>
        <Card style={{margin:10,padding:20}}>
            <Title style={{textAlign:'center'}}>Write a blog</Title>
            <TextInput  mode="outlined"   label="Heading" style={{marginTop:20}}
             value={text}   onChangeText={text => setText(text)} />
            <TextInput  mode="outlined"
             label="Details" style={{marginTop:20}}
             value={details}  multiline={true}  numberOfLines={12}  onChangeText={text => setdetails(text)}
           />
           <View>
             {
               progress>0 && progress<100?
               <View style={{marginVertical:20}}>
                  <Subheading style={{textAlign:'center'}}>{progress} % completed</Subheading>
                  <ActivityIndicator size="large" color='#694fad' style={{marginTop:5}}/>
               </View>
               :
               null
             }
              <Button mode="outlined" uppercase={false}   style={{marginTop:20}} onPress={pickImage}
                >Upload Image</Button>
              <Button mode="contained" uppercase={false} 
               style={{marginTop:20}}   onPress={handlesubmit} >Post now</Button>
           </View>
        </Card>

        <View style={{margin:10}}>
          <Title style={{textAlign:"center"}}>Blogs posted by you</Title>
        </View>

        <ScrollView>
          {
             loading?
             <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:50}}>
                 <ActivityIndicator size="large" color='#694fad'/>
             </View>
           :
               blogs.map((row) => (
                <Card  style={styles.blogcard}   
                onPress={() => navigation.navigate("DoctorBlogsDetails",
                {  image:row.blogimage,  heading:row.heading,  details:row.details}
                )}  >
                <ImageBackground source={{uri:row.blogimage}} style={styles.image}>
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
        </ScrollView>

        {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
       
      </ScrollView>
    );
};

export default DoctorBlogScreen;

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
