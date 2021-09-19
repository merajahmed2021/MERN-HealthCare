import React,{useEffect,useState} from 'react';
import './style.css';

import { NavLink } from 'react-router-dom';
// import {GetDoctorProfile} from '../../actions/patient';
import { useHistory, useParams } from 'react-router-dom';
import {GetDoctorProfilebyId,GetDoctorEducationbyId} from '../../actions/patient';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';


// import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';
// import WorkIcon from '@material-ui/icons/Work';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import Divider from '@material-ui/core/Divider';
// import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import LanguageIcon from '@material-ui/icons/Language';
import RoomIcon from '@material-ui/icons/Room';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import WorkIcon from '@material-ui/icons/Work';

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
  




const textStyle={
  color: '#02475b',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '21px'
}

const textStyle2={
  color: '#02475b',
  fontSize:'12px',
  fontWeight:500,
  lineHeight:'16px',
  whiteSpace: "nowrap",
  marginTop:-10
}

const hosStyle={
  color: '#02475b',
  fontSize:'14px',
  fontWeight:500,
  lineHeight:'16px',
  whiteSpace: "nowrap",
  marginTop:0
}

const textStyle3={
  color: '#02475b',
  fontSize: '25px',
  fontWeight: 500,
  lineHeight: '26px'
}

const textStyle4={
  color: '#02475b',
  fontSize:'20px',
  fontWeight:500,
  lineHeight:'16px',
  whiteSpace: "nowrap",
}

export default function Blogs() {

  
    


  const { id } = useParams();
  
  const [doctor, setdoctor] = useState([]);
  const [education, setEducation] = useState([]);
  const [experiences, setExperiences] = useState([]);
 
  console.log("Education = ",education);


  useEffect(() => {
   GetDoctorProfilebyId(id).then((data)=>{
       setdoctor(data);
   });
   GetDoctorEducationbyId(id).then((data)=>{
    setEducation(data[0].educations);
    setExperiences(data[0].experiences)
   }); 
  }, [])

      

    return (
        <div style={{marginTop:70,background:'rgb(243, 242, 239)'}}>
            {/* <Card outlined elevation={6} className="m-2 mt-4" > */}
              {/* <CardContent className="p-4"> */}
                  <div >
                      <Grid container style={{padding:0}}>
                      <Grid item lg={9} xs={12}>
                        <Card  elevation={6} className='ml-2' 
                        style={{margin:'50px 10px',background:'rgb(243, 242, 239)',borderRadius:'50px'}}>
                            <Card variant='outlined' >
                              <Grid container style={{background:'darkviolet'}}>
                                <Grid lg={4} xs={12}>
                                  <div style={{height:'44vh',width:'42vh',background:'white',
                                  borderTopRightRadius:'100%',borderBottomRightRadius:'100%',
                                     display:'flex',justifyContent:'center',alignItems:'center'}}>
                                       <div>
                                       <Paper elevation={10} style={{width:'30vh',height:'30vh',borderRadius:'100%'}}>
                                       <img    src={"http://localhost:5000/images/" + doctor.image}
                                        style={{width:'30vh',height:'30vh',borderRadius:'100%'}}></img>
                                       </Paper>
                                       </div>
                                  </div>
                                </Grid>
                                <Grid lg={8} xs={12}>
                                   <div className='p-3' style={{background:'darkviolet',color:'white'}}>
                                      <div >
                                          <div>
                                            <h4 className='mt-2'>Dr. {doctor.first_name} {doctor.last_name}</h4>
                                            <h6>{doctor.service}</h6>
                                          </div>
                                          <div style={{display:'flex',justifyContent:'space-between'}}>
                                            <h6 className='mt-1'>Experiences : {doctor.year_of_experiences} Years</h6>
                                            <NavLink  to={`/book_appointment/${doctor._id}`} style={{textDecoration:"none"}}>
                                                <Button variant='contained' color="secondary" size="small"
                                                style={{borderRadius:20,padding:'5px 10px',float:'right',marginLeft:20}}>Appointments</Button>
                                            </NavLink>
                                          </div>
                                      </div>
                                   <Grid container>
                                     <Grid lg={6} xs={12}>
                                        <List component="nav" aria-label="main mailbox folders" id='profile-header'>
                                            <ListItem >
                                              <ListItemIcon>
                                              <i class='fas fa-hospital' style={{fontSize:'2rem',color:'white'}}></i>
                                              </ListItemIcon>
                                              <ListItemText primary="Hospital" secondary={doctor.hospital} />
                                            </ListItem>
                                            <ListItem id='profile-header-list'>
                                              <ListItemIcon>
                                              <i class='fas fa-graduation-cap' style={{fontSize:'2rem',color:'white'}}></i>
                                              </ListItemIcon>
                                              <ListItemText primary="Education" secondary='MBBS,MS' />
                                            </ListItem>
                                        </List> 
                                     </Grid>
                                     <Grid lg={6} xs={12}>
                                        <List component="nav" aria-label="main mailbox folders" id='profile-header'>
                                            <ListItem >
                                              <ListItemIcon >
                                                <RoomIcon  />
                                              </ListItemIcon>
                                              <ListItemText primary="City" secondary={doctor.city}/>
                                            </ListItem>
                                            <ListItem id='profile-header-list'>
                                              <ListItemIcon>
                                                <LanguageIcon />
                                              </ListItemIcon>
                                              <ListItemText primary="Languages" secondary='Hindi , English' />
                                            </ListItem>
                                        </List> 
                                     </Grid>
                                   </Grid>
                                   </div> 
                                </Grid>
                              </Grid>
                            </Card>


                          {/* <Divider style={{backgroundColor:'gray',marginTop:20}}/> */}
                          <CardContent style={{marginTop:10}}>
                              <Divider style={{backgroundColor:'gray',marginTop:20}}/>
                            <Card className='mt-4' variant='outlined' style={{borderRadius:20}}>
                                <CardContent>
                                   <p style={textStyle4}>About</p>
                                   <p style={{color: '#02475b',fontSize:'16px',lineHeight:'21px'}}>
                                     {doctor.basic_details}
                                      {/* Most times, ideacide happens without us even realizing it. A possible off-the-wall idea or solution appears like a blip and disappears without us even realizing. As a result, some of our best stuff is suppressed before even getting out into the world.    */}
                                      {/* Most times, ideacide happens without us even realizing it. A possible off-the-wall idea or solution appears like a blip and disappears without us even realizing. As a result, some of our best stuff is suppressed before even getting out into the world.    */}
                                   </p> 
                                </CardContent>
                            </Card>
                            <Divider style={{backgroundColor:'gray',marginTop:30}}/>
                            <Card className='mt-4' variant='outlined' style={{borderRadius:20}}>
                                <CardContent>
                                   <p style={textStyle4} className='m-3'><WorkIcon /> Experiences</p>
                                   <List component="nav"  id='experience-list'>
                                     {
                                       experiences.map((row)=>(
                                        <ListItem  divider>
                                          <ListItemIcon >
                                            <WorkIcon />
                                          </ListItemIcon>
                                         <ListItemText primary={row.type} secondary={row.detail} />
                                         <ListItemSecondaryAction>{row.time_duration}</ListItemSecondaryAction>
                                        </ListItem>
                                       ))
                                     }
                                   </List>
                                </CardContent>
                            </Card>
                            <Divider style={{backgroundColor:'gray',marginTop:30}}/>
                            <Card className='mt-4' variant='outlined' style={{borderRadius:20}}>
                                <CardContent>
                                   <p style={textStyle4} className='m-3'>
                                     <i class='fas fa-graduation-cap' style={{fontSize:'2rem',color:'darkviolet'}}></i>
                                     <span style={{marginTop:-50,marginLeft:10}}>Education</span>
                                    </p>
                                   <List component="nav"  id='experience-list'>
                                     {
                                       education.map((row)=>(
                                        <ListItem  divider>
                                          <ListItemIcon >
                                              <i class='fas fa-graduation-cap' style={{fontSize:'2rem',color:'darkviolet'}}></i>
                                          </ListItemIcon>
                                          <ListItemText primary={row.degree} secondary={row.university}/>
                                          <ListItemSecondaryAction>{row.year}</ListItemSecondaryAction>
                                        </ListItem> 
                                       ))
                                     }
                                   </List>
                                </CardContent>
                            </Card>
                            <Divider style={{backgroundColor:'gray',marginTop:30}}/>
                            <Card className='mt-4' variant='outlined' style={{borderRadius:20}}>
                                <CardContent>
                                   <p style={textStyle4}>Availability</p>
                                   <List component="nav"  aria-label="mailbox folders">
                                     <ListItem  divider>
                                       <ListItemText primary="Inbox" secondary="Rs 500"/>
                                     </ListItem>
                                     <ListItem  divider>
                                       <ListItemText primary="Drafts" secondary="Rs 500"/>
                                     </ListItem>
                                   </List> 
                                </CardContent>
                            </Card>
                            <div>
                            <NavLink  to={`/book_appointment/${doctor._id}`} style={{textDecoration:"none"}}>
                                <Button variant='contained' color="secondary" style={{borderRadius:20,padding:'5px 10px',float:'right',margin:20}}>Appointments</Button>
                            </NavLink>
                            </div>
                          </CardContent>
                        </Card>
                      </Grid>
                    
                        <Grid item lg={3} xs={12}>
                            <div  style={{margin:'50px 20px'}}>
                            <p style={textStyle4}>Appointments</p>
                            </div>
                        {
                          Doctor.map((row)=>(
                                <NavLink  to={`/book_appointment/${row._id}`} style={{textDecoration:"none"}}>
                               <Card outlined elevation={6} className='m-2 p-3 mt-3' style={{borderRadius:'20px'}}>
                                <Grid container>
                                    <Grid  lg={5} xs={5}>
                                        <img  src='https://image.freepik.com/free-photo/female-doctor-holding-out-hand-isolated-white_186202-5046.jpg'  
                                        style={{width:'100%',height:100,borderRadius:'100%'}}></img>
                                       
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
                                </NavLink>
                          ))
                        }
                        <div className='text-center m-4'>
                        <NavLink  to={`/explore_doctors`} style={{textDecoration:"none"}}>
                          <Button variant='contained' color='secondary'>See more</Button>
                        </NavLink>
                        </div>
                        </Grid>
                      </Grid>
                  </div>
              {/* </CardContent>  */}
            {/* // </Card> */}
        </div>
    )
}
