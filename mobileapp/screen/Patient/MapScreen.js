import React,{useState,useEffect,createRef} from 'react';
import {db,db2,patientdb,storageRef} from '../../config';

import MapView,{Marker,Callout} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions ,  TextInput,ScrollView,FlatList } from 'react-native';
import { Searchbar,Chip } from 'react-native-paper';

let hospital=[
  {
     id: 1,
     name:"JNMC AMU",
     city:"Aligarh, India",
     latitude:27.918769885128434,
     longitude:78.08572976877473
  },
  {
    id: 2,
    name:"Nanavati Super Speciality Hospital",
    city:"Mumbai,India	",
    latitude:19.096137286692937,
    longitude:72.840333273477   
   },
   {
    id: 3,
    name:"Sanjay Gandhi Hospital",
    city:"Karnataka,India",
    latitude:12.927017844396211,
    longitude:77.59258184885422 
  },
  {
    id: 4,
    name:"Sahara Hospital",
    city:"Lucknow, India",
    latitude:26.850063376614624,
    longitude:81.0234269815643
  },
  {
    id: 5,
    name:"Ahmed Hospital",
    city:"Chhenai,India",
    latitude:13.0827,
    longitude:80.2707
  },
]

export default function App() {

  const mapRef = React.createRef();

  const [region, setRegion] = useState({
    latitude:26.883884738281317, 
    longitude:83.97859553991628,
  });

  const {latitude,longitude}=region;
 
  function handlesubmit(latitude,longitude){
    setRegion({
      latitude: latitude,
      longitude: longitude,
    })
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009
    })
  }


  const [hospitallist, sethospitallist] = React.useState([]);
  const [loading,setloading]=React.useState(true);
  console.log(hospitallist);
  useEffect(()=>{
    getData();
  },[])

  function getData(){
    var hospitalarray=[];
    var hospitals= patientdb.collection('hospitals');
    hospitals.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           hospitalarray.push({
              id:doc.id,
              name:doc.data().hospital,
              latitude:doc.data().latitude,
              longitude:doc.data().longitude
            })
        });
        sethospitallist(hospitalarray);
        if(loading){
          setloading(false);
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  }



  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  // console.log(searchQuery);  

  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
          region={region}
          ref={mapRef}
          //  onRegionChangeComplete={handlesubmit(latitude,longitude)}
          //  onUserLocationChange={event => console.log(event.nativeEvent)}
      >
        {
          hospitallist.map((row) => (
              <Marker draggable
                key={row.id}
                coordinate={{ latitude:latitude, longitude:longitude }}
                image={require('../images/map_marker.png')}
                title={row.name}
                description={row.name}
                onDragEnd={e => {
                  console.log('dragEnd', e.nativeEvent.coordinate);
                }}
                // onDragEnd={(e) => setRegion({ x: e.nativeEvent.coordinate })}
              > 
              </Marker> 
          ))
        }
   
  </MapView>
      <View  style={styles.searchBox}>
        <Searchbar  placeholder="Search for hospitals" 
          onChangeText={onChangeSearch}
          value={searchQuery} 
            style={{borderRadius:20,backgroundColor:'#E4E6EB', overflow:'hidden',}}
           />
      </View>

      <ScrollView
       horizontal   scrollEventThrottle={1000}   showsHorizontalScrollIndicator={false}
        style={styles.chipBox}>
          {
            hospitallist.filter((val)=>{
              if(searchQuery==" "){
                return val;
              }else if(val.name.toLowerCase().includes(searchQuery.toLowerCase())){
                  return val;
              }
            }).map((row) => (
              <Chip icon="hospital-building" mode='outlined' selectedColor="white" textStyle={{color:'white'}}   
              style={styles.chipstyle} onPress={()=>handlesubmit(row.latitude,row.longitude)}>{row.name}</Chip>
              ))
          }
      
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchBox: {
    position:'absolute', 
    backgroundColor: 'transparent',
    width: '90%',
    marginTop:30,
    alignSelf:'center',
    overflow:'hidden',
    borderRadius: 20,
    shadowColor: '#ccc',
    // shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  chipBox:{
    position:'absolute',
    marginTop:100
    // marginTop:Dimensions.get('window').height-200
  },
  chipstyle:{
    marginLeft:10,
    padding:8,
    borderRadius:40,
    // color:'red',
    backgroundColor:'#694fad'
  }

});