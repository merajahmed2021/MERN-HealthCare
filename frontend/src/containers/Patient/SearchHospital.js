import React ,{useEffect,useState,Component} from 'react'

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Card,Container,InputGroup,FormControl} from "react-bootstrap";
import {Chip,TextField } from '@material-ui/core';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const chipStyle={
   background:'white',
   fontWeight:'bolder',
   padding:10
}

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

export class MapContainer extends Component {
  render() {
    return (
      <div style={{background:'rgb(243, 242, 239)',marginTop:80}}>
        <div className="my-4">
          {/* <h2 className="text-center">Hospital on our website</h2> */}
          <Container>
            <form>
            <InputGroup className="mb-3" style={{height:50}}>
               <FormControl style={{borderBottomLeftRadius:50,borderTopLeftRadius:50}}
                 placeholder="Search your hospital here..."
                //  onChange={(event)=> setSearchQuery(event.target.value)}
                //  value={searchQuery} 
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
              style={chipStyle}/>
            ))
          }
          </Container>
        </div>
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
      />
      </div>

    );
  }
}
 
export default GoogleApiWrapper({
  apiKey:'AIzaSyAcG-aF83Mqh5L8QQwdEd6C-lJjVyTkYLI'
})(MapContainer)