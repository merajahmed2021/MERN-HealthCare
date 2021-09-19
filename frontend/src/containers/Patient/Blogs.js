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
  
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';


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
  







export default function Blogs() {

  
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


      

    return (
        <div style={{marginTop:80,background:'rgb(243, 242, 239)'}}>
            <Card elevation={6} className="m-2 mt-4" style={{background:'rgb(243, 242, 239)'}}>
              <CardContent className="p-4">
                  <p className='text-center' style={{ color: '#02475b',fontSize: '20px',fontWeight: 500,lineHeight: '25px'}} 
                  >Explore Blogs</p>
                  <div>
                      <Grid container>
                      {
                          doctor.map((row)=>(
                              <Grid item lg={4} xs={12}>
                                <NavLink  to={`/patients/blogs/${row._id}`} style={{textDecoration:"none"}}>
                                <Card  elevation={6} className='m-2  mt-3' style={{borderRadius:'20px'}}>
                                   <CardActionArea>
                                      <CardMedia  component="img"  alt="Contemplative Reptile"  height="150"
                                        image="https://cdn.pixabay.com/photo/2021/07/16/09/54/travel-6470467_960_720.jpg"
                                      />
                                      <CardContent>
                                        <div className='mt-4 p-3'>
                                           <h2 style={{fontSize: '18px',fontWeight: 500,lineHeight: '21px'}}>{'Hello world'}</h2>
                                           <div style={{height:85,overflow:'hidden'}}>
                                               <p style={{color: '#02475b',fontSize:'16px',lineHeight:'21px'}}>
                                               Most times, ideacide happens without us even realizing it. A possible off-the-wall idea or solution appears like a blip and disappears without us even realizing. As a result, some of our best stuff is suppressed before even getting out into the world.   
                                               Most times, ideacide happens without us even realizing it. A possible off-the-wall idea or solution appears like a blip and disappears without us even realizing. As a result, some of our best stuff is suppressed before even getting out into the world.   
                                               Most times, ideacide happens without us even realizing it. A possible off-the-wall idea or solution appears like a blip and disappears without us even realizing. As a result, some of our best stuff is suppressed before even getting out into the world.   
                                               </p> 
                                           </div> 
                                            <p style={{marginTop:20,fontSize:'12px'}}>December 14th, 2021 by Admin</p>  
                                        </div>
                                      </CardContent>
                                    </CardActionArea>
                                </Card>
                            </NavLink>
                            </Grid>
                          ))
                        }

                        {
                          Doctor.map((row)=>(
                            <Grid item lg={4} xs={12}>
                                <NavLink  to={`/book_appointment/${row._id}`} style={{textDecoration:"none"}}>
                                <Card  elevation={6} className='m-2  mt-3' style={{borderRadius:'20px'}}>
                                    <CardActionArea>
                                      <CardMedia  component="img"  alt="Contemplative Reptile"  height="150"
                                        image="https://cdn.pixabay.com/photo/2021/07/18/17/11/rufous-6476117_960_720.jpg"
                                      />
                                      <CardContent>
                                        <div className='mt-4 p-3'>
                                           <h2 style={{fontSize: '18px',fontWeight: 500,lineHeight: '21px'}}>{'Hello world'}</h2>
                                           <div style={{height:85,overflow:'hidden'}}>
                                               <p style={{color: '#02475b',fontSize:'16px',lineHeight:'21px'}}>
                                               Most times, ideacide happens without us even realizing it. A possible off-the-wall idea or solution appears like a blip and disappears without us even realizing. As a result, some of our best stuff is suppressed before even getting out into the world.   
                                               Most times, ideacide happens without us even realizing it. A possible off-the-wall idea or solution appears like a blip and disappears without us even realizing. As a result, some of our best stuff is suppressed before even getting out into the world.   
                                               Most times, ideacide happens without us even realizing it. A possible off-the-wall idea or solution appears like a blip and disappears without us even realizing. As a result, some of our best stuff is suppressed before even getting out into the world.   
                                               </p> 
                                           </div> 
                                            <p style={{marginTop:20,fontSize:'12px'}}>December 14th, 2021 by Admin</p>  
                                        </div>
                                      </CardContent>
                                    </CardActionArea>
                                </Card>
                                </NavLink>
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
