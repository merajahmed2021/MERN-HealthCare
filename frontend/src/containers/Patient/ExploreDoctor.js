import React,{useEffect,useState} from 'react';
import { NavLink } from 'react-router-dom';
import {GetDoctorProfile} from '../../actions/patient';

import {
    Col,
    Row,
    Container,
    InputGroup,
    FormControl,
    Form,
  } from "react-bootstrap";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Button from '@material-ui/core/Button';
import { emphasize } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { withStyles } from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
  

const Doctor=[
  {
    id:1,
    name:'Meraj'
  },
  {
    id:1,
    name:'Akhlakh'
  },
  {
    id:1,
    name:'Rehan'
  },
  {
    id:1,
    name:'Anam'
  },
  {
    id:1,
    name:'Akram'
  },

]
  


const StyledBreadcrumb = withStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.grey[100],
      height: theme.spacing(3),
      color: theme.palette.grey[800],
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.grey[300],
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(theme.palette.grey[300], 0.12),
      },
    },
  }))(Chip);




export default function ExploreDoctor() {

  
  const textStyle={
    color: '#02475b',fontSize: '16px',fontWeight: 500,lineHeight: '21px'
  }

  const textStyle2={
    color: '#02475b',fontSize:'12px',fontWeight:500,lineHeight:'16px',whiteSpace: "nowrap",marginTop:-10
  }

  const hosStyle={
    color: '#02475b',fontSize:'14px',fontWeight:500,lineHeight:'16px',whiteSpace: "nowrap",marginTop:0
  }

  const [doctor, setdoctor] = useState([]);

    useEffect(() => {
     GetDoctorProfile().then((data)=>{
       console.log(data);
       setdoctor(data);
     })
    }, [])

    function handleClick(event) {
        event.preventDefault();
        console.info("You clicked a breadcrumb.");
      }
      

    return (
        <div style={{marginTop:70,background:'rgb(243, 242, 239)'}}>
            <Card outlined elevation={6} className="m-2 mt-4" style={{background:'rgb(243, 242, 239)'}}>
              <CardContent className="p-4">
                  <p className='text-center' style={{ color: '#02475b',fontSize: '20px',fontWeight: 500,lineHeight: '25px'}} 
                  >Explore Doctors</p>
                  <div>
                      <Grid container>
                      {
                          doctor.map((row)=>(
                            <Grid item lg={3} xs={12}>
                            <Card  elevation={6} className='m-2 p-3 mt-3' style={{borderRadius:'20px'}}>
                                <Grid container>
                                    <Grid  lg={5} xs={5}>
                                        <img  
                                         src={"http://localhost:5000/images/" + row.image}
                                        // src='https://cdn.pixabay.com/photo/2017/09/01/13/08/guardian-angel-2704181_960_720.jpg'  
                                        style={{width:100,height:100,borderRadius:'100%'}}></img>
                                    </Grid>
                                    <Grid  lg={7} xs={7} >
                                    <div className='p-2'>
                                         <p style={textStyle}>Dr. {row.first_name} {row.last_name}</p>
                                         <p style={hosStyle}>{row.hospital}</p>
                                         <p style={textStyle2}>{row.service}</p>
                                         <p style={textStyle2}>MBBS,MS</p>
                                     </div> 
                                     <div style={{marginTop:-15}}>
                                          <Box component="fieldset" mb={1} borderColor="transparent">
                                            <Rating name="read-only" value='3' readOnly size="small"  />
                                          </Box>
                                        </div>                                          
                                    </Grid>
                                </Grid>
                                <div style={{display:'flex',justifyContent:'space-around'}}>
                                     <NavLink  to={`/doctor_profile/${row._id}`} style={{textDecoration:"none"}}>
                                        <Button variant='contained' color="primary"   style={{borderRadius:20,padding:'5px 10px'}}>Profile</Button>
                                    </NavLink>
                                     <NavLink  to={`/book_appointment/${row._id}`} style={{textDecoration:"none"}}>
                                        <Button variant='contained' color="secondary" style={{borderRadius:20,padding:'5px 10px'}}>Appointments</Button>
                                    </NavLink>
                                </div>
                            </Card>
                        </Grid>
                          ))
                        }

                        {
                          Doctor.map((row)=>(
                            <Grid item lg={3} xs={12}>
                            <Card outlined elevation={6} className='m-2 p-3 mt-3' style={{borderRadius:'20px'}}>
                                <Grid container>
                                    <Grid  lg={5} xs={5}>
                                        <img  src='https://cdn.pixabay.com/photo/2020/03/14/17/05/virus-4931227_960_720.jpg'  
                                        style={{width:100,height:100,borderRadius:'100%'}}></img>
                                    </Grid>
                                    <Grid  lg={7} xs={7} >
                                    <div className='p-2'>
                                         <p style={textStyle}>Dr. Yakub Ahmed</p>
                                         <p style={hosStyle}>City Hospital</p>
                                         <p style={textStyle2}>Cardiologist,Neurologist</p>
                                         <p style={textStyle2}>MBBS,MS</p>
                                     </div> 
                                     <div style={{marginTop:-15}}>
                                          <Box component="fieldset" mb={1} borderColor="transparent">
                                            <Rating name="read-only" value='3' readOnly size="small"  />
                                          </Box>
                                        </div>                                          
                                    </Grid>
                                </Grid>
                                <div style={{display:'flex',justifyContent:'space-around'}}>
                                    <Button variant='contained' color="primary"   style={{borderRadius:20,padding:'5px 10px'}}>Profile</Button>
                                    <Button variant='contained' color="secondary" style={{borderRadius:20,padding:'5px 10px'}}>Appointments</Button>
                                </div>
                            </Card>
                        </Grid>
                          ))
                        }
                      </Grid>
                      <div className='text-center m-4'>
                          <Button variant='contained' color='secondary'>See more</Button>
                      </div>
                  </div>
              </CardContent> 
            </Card>
        </div>
    )
}
