import React,{useState,useEffect} from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import {GetLatestDoctor} from '../../actions/patient';
import {
  GetTotalBlogs,
  GetTotalPatients,
  GetTotalDoctors,
  GetDoctorTotalAppointments
} from '../../actions/dashboard';

import {GetLatestPost
} from "../../actions/posts";

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

import Button from '@material-ui/core/Button';
import {RadialGauge ,BarChart} from 'reaviz';





const Blog=[
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
  ]

  
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
]


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      boxShadow:" rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
    },
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
}));


    
const textStyle={
  color: '#02475b',fontSize: '16px',fontWeight: 500,lineHeight: '21px'
}

const textStyle2={
  color: '#02475b',fontSize:'12px',fontWeight:500,lineHeight:'16px',whiteSpace: "nowrap",marginTop:-10
}

const hosStyle={
  color: '#02475b',fontSize:'14px',fontWeight:500,lineHeight:'16px',whiteSpace: "nowrap",marginTop:0
}




export default function Dashboard() {

  
  const [latestPost, setlatestPost] = useState([])

  const [doctor, setdoctor] = useState([]);

  const [totalBlogs, settotalBlogs] = useState(0);
  const [totalPatients, settotalPatients] = useState(0);
  const [totalDoctors, settotalDoctors] = useState(0);
  const [user_appointments, setUser_appointments] = useState([]);

  useEffect(() => {
   GetLatestPost().then((data)=>{
     setlatestPost(data);
   });
   GetLatestDoctor().then((data)=>{
    console.log(data);
    setdoctor(data);
  }) 
  GetTotalBlogs().then((data)=>{
    console.log("TOTAL BLOGS = ",data);
    settotalBlogs(data);
  })
  GetTotalPatients().then((data)=>{
    console.log("TOTAL BLOGS = ",data);
    settotalPatients(data);
  })
  GetTotalDoctors().then((data)=>{
    console.log("TOTAL BLOGS = ",data);
    settotalDoctors(data);
  })
  GetDoctorTotalAppointments().then((data)=>{
    console.log("TOTAL Appointment = ",data);
    setUser_appointments(data);
  })
  }, [])

  
  
  const classes = useStyles();


  const Dashboardbox=[
    {
      id:1,
      icon:'fas fa-user-md',
      iconcolor:'darkviolet',
      title:'Doctors',
      value:totalDoctors,
      maxVal:totalDoctors+50
    },
    {
        id:2,
        icon:'fas fa-hospital',
        iconcolor:'green',
        title:'Hospitals',
        value:30,
        maxVal:30+100
    },
    {
        id:3,
        icon:'fas fa-wheelchair',
        iconcolor:'red',
        title:'Patients',
        value:totalPatients,
        maxVal:totalPatients+50
    },
    {
        id:4,
        icon:'fas fa-book-open',
        iconcolor:'blue',
        title:'Blogs',
        value:totalBlogs,
        maxVal:totalBlogs+50        
    },
  ]

  


    // console.log("Doctor Dashboard = " ,getCurrentUser());

    return (
        <div style={{marginTop:120,background:'rgb(243, 242, 239)'}}>

           <Grid   container style={{marginTop:'-40px',padding:10}}>
               {
                   Dashboardbox.map((row)=>(
                    <Grid item lg={3} xs={12} > 
                        <Card className="m-3"    elevation={6}>
                          <CardContent style={{display:'flex',justifyContent:'space-around'}}>
                            <div>
                            <ListItem style={{flexDirection:'column'}}>
                                <ListItemAvatar  > 
                                      <i  class={row.icon}  
                                      style={{  fontSize: '8vh',  color: row.iconcolor,  margin: 10,  alignSelf: "center",}}/>
                                </ListItemAvatar>
                                <ListItemText>{row.title}</ListItemText>
                            </ListItem>
                            </div>
                            <div>
                              <div className='mt-1'>
                              <RadialGauge     height={120}     width= {120}     maxValue={row.maxVal}     
                              data={[{ key:row.title, data:row.value }]}   />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                    </Grid>
                   ))
               }
            </Grid> 

            <Grid container className='p-3'>
                <Grid item lg={9} xs={12} > 
                    <Card outlined className="m-2 mt-3"   elevation={6}>
                      <CardContent>
                        <div className="p-4">
                            <p className='text-center' style={{ color: '#02475b',fontSize: '20px',fontWeight: 500,lineHeight: '25px',marginTop:-20}} 
                            >Doctors Specialities</p>
                          <BarChart
                             height={200}
                             width='90%'
                             data={[
                               { key: 'DLP', data: 13 },
                               { key: 'SIEM', data: 2 },
                               { key: 'Endpoint', data: 7 },
                               { key: 'Hello', data: 20 },
                               { key: 'World', data: 1 },
                               { key: 'Opthamology', data: 5 },
                               { key: 'Dentist', data: 3 },
                               { key: 'Cardiologist', data: 8 },
                               { key: 'Neurology', data: 6 },
                               { key: 'Physician', data: 15 },
                               { key: 'Dermatology', data: 2 }
                             ]}
                           />
                        </div>                  
                      </CardContent>       
                    </Card>            
                </Grid>
                <Grid item lg={3} xs={12} > 
                    <Card outlined  className="m-2 mt-3"  elevation={6} style={{marginLeft:20,background:'darkviolet'}}>
                      <CardContent className="p-4">
                            <p className='text-center' 
                               style={{ color: 'white',fontSize: '20px',fontWeight: 500,lineHeight: '25px'}} 
                            >Appointments</p>
                            <div>
                                <Card   elevation={6} className='mt-4'>
                                    <CardContent   style={textStyle}>Total Appointments : 
                                    {user_appointments.past_appointment+user_appointments.upcoming_appointment}</CardContent>
                                </Card>
                                <Card  elevation={6} className='mt-3'>
                                    <CardContent style={textStyle}>Today Appointments : 
                                    {user_appointments.upcoming_appointment}</CardContent>
                                </Card>
                                <Card  elevation={6} className='mt-3'>
                                    <CardContent style={textStyle}>Past Appointments : 
                                    {user_appointments.past_appointment}</CardContent>
                                </Card>
                            </div>
                      </CardContent>       
                    </Card>            
                </Grid>
            </Grid>    
            <Grid container className='p-3' >
               <Grid item lg={6} xs={12} >
                <Card outlined elevation={6} className="m-2 mt-4" >
                    <CardContent className="p-4">
                        <p className='text-center' style={{ color: '#02475b',fontSize: '20px',fontWeight: 500,lineHeight: '25px'}} 
                        >Doctors</p>
                        <div>
                            <Grid container>
                                {
                                    doctor.map((row)=>(
                                        <Grid item lg={6} xs={12}>
                                        <Card outlined elevation={6} className='m-2 p-3 mt-3' style={{borderRadius:'20px'}}>
                                            <Grid container>
                                                <Grid  lg={5} xs={5}>
                                                    <img     src={"http://localhost:5000/images/" + row.image}
                                                    style={{width:100,height:100,borderRadius:'100%'}}></img>
                                                </Grid>
                                                <Grid  lg={7} xs={7} >
                                                <div className='p-2'>
                                                   <p style={textStyle}>Dr. {row.first_name} {row.last_name}</p>
                                                   <p style={hosStyle}>{row.hospital}</p>
                                                   <p style={textStyle2}>{row.service}</p>
                                                   <p style={textStyle2}>MBBS,MS</p>
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
                            </Grid>
                            <div className='text-center m-4'>
                              <NavLink  to={`/explore_doctors`} style={{textDecoration:"none"}}>
                                <Button variant='contained' color='secondary'>See more</Button>
                              </NavLink>
                            </div>
                        </div>
                    </CardContent> 
                </Card>
            </Grid>
               <Grid item lg={6} xs={12} >
                <Card outlined elevation={6} className="m-2 mt-4">
                    <CardContent className="p-4">
                        <p className='text-center'   style={{ color: '#02475b',fontSize: '20px',fontWeight: 500,lineHeight: '25px'}} 
                        >Blogs</p>
                        <div>
                            {
                                latestPost.map((row)=>(
                                  <NavLink to={`/blog_details/${row._id}`} style={{textDecoration:'none'}}>
                                    <Card outlined elevation={6} className='mt-3'>
                                      <CardActionArea>
                                        <Grid container>
                                            <Grid  lg={3} xs={12}>
                                              <CardMedia
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="140"
                                                image={"http://localhost:5000/images/" + row.image}
                                              />  
                                            </Grid>
                                            <Grid  lg={9} xs={12} >
                                              <CardContent >
                                                <div >
                                                   <h2 style={{fontSize: '16px',fontWeight: 500,lineHeight: '21px'}}>{row.title}</h2>
                                                    <p style={{color: '#02475b',fontSize:'12px',lineHeight:'16px',whiteSpace: "nowrap"}}>{row.content}</p> 
                                                    <p style={{marginTop:20,fontSize:'12px'}}>December 14th, 2021 by Admin</p>  
                                                </div>
                                              </CardContent>
                                            </Grid>
                                        </Grid>
                                      </CardActionArea>
                                    </Card>
                                  </NavLink> 
                                ))
                            }
                            <div className='text-center m-4'>
                              <NavLink to="/blogs" style={{textDecoration:'none'}}>
                                 <Button variant='contained' color='secondary'>See more</Button>
                              </NavLink>
                            </div>
                        </div>
                    </CardContent> 
                </Card>
            </Grid>
            </Grid> 
        </div>
    )
}
