import React ,{useEffect,useState,Component} from 'react'
// import './style.css';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Card,Container,InputGroup,FormControl} from "react-bootstrap";
import {Chip,TextField } from '@material-ui/core';

import { MapContainer, TileLayer, Marker, Popup,useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import markerImg from './images/marker-icon-2x.png';
import markerImg2 from './images/marker-icon.png';
import markerShadow from './images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerImg,
  iconUrl: markerImg2,
  shadowUrl:markerShadow
});


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

const mapStyles = {
  width: '100%',
  height: '100%'
};

const chipStyle={
   background:'white',
   fontWeight:'bolder',
   padding:10
}



export default function HospitalsContainer() {


  const [coordinates, setcoordinates] = useState({
    latitude:28.7041,
    longitude:77.1025
  })


  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }


  console.log(coordinates);

    return (
      <div style={{background:'rgb(243, 242, 239)',marginTop:80,width:'100%',overflow:'hidden'}}>
        <div className="my-4">
          <Container>
            <form>
            <InputGroup className="mb-3" style={{height:50}}>
               <FormControl style={{borderBottomLeftRadius:50,borderTopLeftRadius:50}}
                 placeholder="Search your hospital here..."
               />
               <InputGroup.Append >
                 <InputGroup.Text style={{padding:15,borderBottomRightRadius:50,borderTopRightRadius:50,
                  background:'blue',color:'white',fontWeight:'bolder'}}>Search</InputGroup.Text>
               </InputGroup.Append>
             </InputGroup>
            </form>
          </Container>
          <Container  style={{overflow:'scroll',display:'flex',overflowY:'hidden',marginTop:20,marginBottom:20}}>
            {
              hospital.map((row)=>(
                <Chip label={row.name} variant="outlined"    color="primary" className="my-3 mx-4" 
                onClick={()=>setcoordinates({latitude:row.latitude,longitude:row.longitude})}
                style={chipStyle}/>
              ))
            }
        
          </Container>
        </div>
        <Container style={{overflow:'hidden',height:'70vh'}}>
         <div>
           <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={13} scrollWheelZoom={false} style={{height:'70vh'}}>
             <TileLayer
               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             />
              <LocationMarker />
             {/* <Marker position={[coordinates.latitude,coordinates.longitude]}>
               <Popup>
                 A pretty CSS3 popup. <br /> Easily customizable.
               </Popup>
             </Marker> */}
           </MapContainer>
         </div>
        </Container>
      </div>

    );
}
