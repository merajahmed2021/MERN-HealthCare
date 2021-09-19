import React from 'react';
import Footer from '../../components/Footer';
import './style.css';
import landingGif from './Webimages/home.gif';
import d1 from './Webimages/d1.png';
import d2 from './Webimages/d3.png';
import d3 from './Webimages/d4.png';
import d4 from './Webimages/d8.png';
import d5 from './Webimages/d14.png';
import d6 from './Webimages/d13.png';
// import d1 from './Webimages/d1.png';


import p1 from './Webimages/p3.png';
import p2 from './Webimages/p4.png';

import {
  Col,
  Carousel,
  Row,
  Container,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
// import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Rating from '@material-ui/lab/Rating';
// import Box from '@material-ui/core/Box';

import {Button, Grid ,Dialog ,DialogActions,DialogContent, DialogTitle} from '@material-ui/core';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';



import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import { borderRadius } from '@material-ui/system';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';

let protect=[
  {
    icon:'https://www.1mg.com/images/confidential.svg',
    heading:'100% Confidential',
    text:'All advice & consultations are completely confidential. You can also delete chats whenever you want.'
  },
  {
    icon:'https://www.1mg.com/images/certified.svg',
    heading:'Certified Doctors',
    text:'We offer quality healthcare through our network of certified and experienced doctors.'
  },
  {
    icon:'https://www.1mg.com/images/convenience.svg',
    heading:'Convenience',
    text:'Forget the hassle of long queues and rush hour. Seek expert opinion anytime, anywhere.'
  },
  {
    icon:'https://www.1mg.com/images/costEffective.svg',
    heading:'Cost Effective',
    text:'We provide medical assistance on non urgent queries for free. Fee starting at ₹50 for faster response to queries.'
  }
]

let doctors=[
  {
     id: 1,
     title:'Dashboard',
     text1:'View total number of Patients, Doctors,Blogs,Hospital with the help of graph. Analyse doctor specialities available on our platform.',
     img:d1
  },
  {
    id: 1,
     title:'View Upcoming Appointments',
     text1:'Get the list of all appointments booked on a daily basis. Doctor can call patients by clicking button then voice button.',
     img:d2
   },
   {
    id: 1,
     title:'Add Checkup',
     text1:'Add symptoms,prescription,diagonisis on every appointments. View and delete details of patients.',
     img:d3
  },
  {
    id: 1,
    title:'Create Blogs',
    text1:'Doctors can create blogs.He/She also delete and update blogs posted by him/her.Read all blogs availabe on our platform.',
    img:d4
  },
  {
    id: 1,
    title:'Manage Accounts',
    text1:'Doctor can manage accounts.He/She allow booking appointments,Online Payment.Write appointment fee.Set details of Telemedecine and Reset Password.',
    img:d5
  },
  {
    id: 1,
    title:'View Online Payments',
    text1:'Doctor can view all payments done by patients along with Payment Id ,Order Id,Date of appointment,User Email etc .',
    img:d6
  },
]

let customer=[
  {
    name:'Dr. Meraj Ahmed',
    status:'Doctor',
    text:'Type in your concern and attach prescription, lab reports if any. Help doctor understand your case better.'
  },
  {
    name:'Dr. Akhlakh Ahmed',
    status:'Doctor',
    text:'Type in your concern and attach prescription, lab reports if any. Help doctor understand your case better.'
  },
  {
    name:'Rehan Akram',
    status:'Patient',
    text:'A doctor is auto-assigned to you that best matches your concern. You will get a diagnosis and treatment for your condition.'
  },
  {
    name:'Adeeb Akhter',
    status:'Patient',
    text:'A doctor is auto-assigned to you that best matches your concern. You will get a diagnosis and treatment for your condition.'
  },
]


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Home(props) {
  const classes = useStyles();


  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <Toolbar id="back-to-top-anchor" />
      <div style={{ paddingBottom: 50}}>
        <Container>
          <Row>
            <Col xs='12' lg='6' style={{marginTop:30}}>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>
                <div>
                  <h3 className='text-center' style={{color:'darkviolet'}}>Make Your Online Appointment</h3>
                  <h5 className='mt-3 text-center text-secondary'>Skip the struggle of booking appointments.Consult a doctor at your ease</h5>
                </div>
              </div>
            </Col>
            <Col  xs='12' lg='6' style={{marginTop:30,height:'420px'}}>
                <img src={landingGif} style={{height:'100%',width:'100%'}}></img>
            </Col>
          </Row>
        </Container>
       

        <div>
          <Container
            style={{ marginTop: 20, opacity: 10, position: "relative" }}
          >
            <Row
              style={{
                boxShadow: "0px 0px 20px rgb(128 128 128 / 20%)",
                borderRadius: "18px",
                background: "white",
              }}
            >
              <Col>
                <div style={{ height: "100%", borderRight: "1px solid blue" }}>
                  <Row>
                    <Col className="text-center">
                      <i
                        class="fas fa-diagnoses"
                        style={{
                          fontSize: 35,
                          color: "blue",
                          margin: 20,
                          alignSelf: "center",
                        }}
                      ></i>
                    </Col>
                    <Col className="text-center">
                      <h5 style={{ fontSize: "14px", margin: 20 }}>Diagnose</h5>
                      <p style={{ fontSize: "12px", marginTop: -15 }}>
                        Examination & Diagnosis
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col>
                <div style={{ height: "100%", borderRight: "1px solid blue" }}>
                  <Row>
                    <Col className="text-center">
                      <i
                        class="fas fa-lungs-virus"
                        style={{
                          fontSize: 35,
                          color: "blue",
                          margin: 20,
                          alignSelf: "center",
                        }}
                      ></i>
                    </Col>
                    <Col className="text-center">
                      <h5 style={{ fontSize: "14px", margin: 20 }}>
                        Treatment
                      </h5>
                      <p style={{ fontSize: "12px", marginTop: -15 }}>
                        Treatment of the disease
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col>
                <div style={{ height: "100%" }}>
                  <Row>
                    <Col className="text-center">
                      <i
                        class="fas fa-wheelchair"
                        style={{
                          fontSize: 35,
                          color: "blue",
                          margin: 20,
                          alignSelf: "center",
                        }}
                      ></i>
                    </Col>
                    <Col className="text-center">
                      <h5 style={{ fontSize: "14px", margin: 20 }}>
                        Care Healthy
                      </h5>
                      <p style={{ fontSize: "12px", marginTop: -15 }}>
                        Care and recuperation
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div> 

      <div style={{marginTop:50}}>
        <Container>
          <Row>
            {
              protect.map((row)=>(
                <Col xs='12' lg='3' className='text-center'>
                <div>
                  <div>
                    <img src={row.icon}></img>
                  </div>
                    <div className='my-3'>
                      <h4>{row.heading}</h4>
                      <div>
                        <p>{row.text}</p>
                      </div>
                    </div>  
                </div>
              </Col>  
              ))
            }
          </Row>
        </Container>
      </div>
   
      <div style={{marginTop:100,background:'darkviolet',padding:'50px 10px'}}>
        <div style={{color:'white'}}>
          <h1 className='text-center'>How our platform help Doctors?</h1>
        </div>
        <Container style={{marginTop:50}}>
            <Carousel style={{width:'100%'}}>
              {
                doctors.map((row)=>(
                  <Carousel.Item style={{width:'100%'}}>
                  <Row>
                    <Col xs='12' lg='6'>
                       <img  className="d-block w-100"  src={row.img}  alt="First slide"  style={{ width:'100%'  }}/>
                    </Col>
                    <Col xs='12' lg='6'>
                    <div className='p-4 m-4' style={{color:'white'}}>
                      <h3 className='text-center'>{row.title}</h3>
                      <div style={{paddingRight:10,textAlign:'center'}}>
                         <p>{row.text1}</p>
                      </div>
                    </div>
                    </Col>
                  </Row>
                </Carousel.Item>
                ))
              }
            </Carousel> 
        </Container>
      </div>

      <div style={{background:'#f2f5f8',paddingBottom:50}}>
      <div style={{paddingTop:80,marginBottom:80}}>
            <h1 className='text-center'>How our platform works for patients?</h1>
          </div>
       <Container className='mt-4'>
          <Timeline align="alternate">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" variant="outlined" style={{height:80,width:80,textAlign:'center'}}>
                  <i class='fas fa-home'
                    style={{fontSize: 50,color: "darkviolet",alignSelf: "center",marginLeft:8}}/>
                </TimelineDot>
                <TimelineConnector style={{height:50}}/>
              </TimelineSeparator>
              <TimelineContent style={{width:'20vh'}}>
                  <Typography>Create Account / Login</Typography>
                  <Typography style={{fontSize:'14px',color:'gray'}}>If you are new then create account to view Dashboard otherwise login to book 
                    appointments.
                  </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary" variant="outlined" style={{height:80,width:80}}>
              <i class='fas fa-user-md'
                    style={{fontSize: 50,color: "darkviolet",alignSelf: "center",marginLeft:13  }}/>
              </TimelineDot>
              <TimelineConnector style={{height:50}}/>
            </TimelineSeparator>
            <TimelineContent>
                <Typography>Explore Doctors</Typography>
                <Typography style={{fontSize:'14px',color:'gray'}}>Doctors based on category and then make appointments.</Typography>
            </TimelineContent>
          </TimelineItem>
            <TimelineItem>
            <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined" style={{height:80,width:80}}>
            <i  class='fas fa-book-open'
                style={{fontSize: 50,color: "darkviolet",alignSelf: "center",marginLeft:8}}/>
            </TimelineDot>
            <TimelineConnector style={{height:50}} />
            </TimelineSeparator>
            <TimelineContent>
                <Typography>Make Appointments</Typography>
                <Typography style={{fontSize:'14px',color:'gray'}}>Book appointments to doctors if doctor allowed for booking .
                   Pay online payments.</Typography>
            </TimelineContent>
          </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="secondary" variant="outlined" style={{height:80,width:80}}>
                <i  class='fas fa-hospital'
                   style={{fontSize: 50,color: "darkviolet",alignSelf: "center",marginLeft:12  }}/>
                </TimelineDot>
                <TimelineConnector style={{height:50}} />
              </TimelineSeparator>
              <TimelineContent>
                  <Typography>Search Hospitals</Typography>
                  <Typography style={{fontSize:'14px',color:'gray'}}>Search Hospitals according hospital's name and view it on Google Map.</Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" variant="outlined" style={{height:80,width:80}}>
                <i    class='fas fa-calendar-alt'
                        style={{fontSize: 50,color: "darkviolet",alignSelf: "center",marginLeft:12  }}/>
                </TimelineDot>
                <TimelineConnector style={{height:50}} />
              </TimelineSeparator>
              <TimelineContent>
              <Typography>Appointments</Typography>
                  <Typography style={{fontSize:'14px',color:'gray'}}>View all upcoming appointments and its live status. Also view all 
                    appointments history.
                  </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="secondary" variant="outlined" style={{height:80,width:80}}>
                  <i  class='fas fa-user-cog'
                      style={{fontSize: 50,color: "darkviolet",alignSelf: "center",marginLeft:8  }}/>
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                   <Typography>Manage Accounts</Typography>
                    <Typography style={{fontSize:'14px',color:'gray'}}>Change your passwords ,View All Payments History and join Telemedicine.</Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
       </Container>
      </div>

      <div style={{paddingBottom:80}}>
        <Container>
          <div style={{paddingTop:80,marginBottom:80}}>
            <h1 className='text-center'>Our Happy Customers</h1>
          </div>
          <div>
            <Carousel style={{width:'100%'}}>
              {
                customer.map((row)=>(
                  <Carousel.Item  style={{width:'100%'}}>
                    <div>
                      <Row>
                        <Col xs='12' lg='3'></Col>
                        <Col xs='12' lg='6' className='text-center' >
                        <div className='mb-4 text-center'>
                          <img src={d1} style={{borderRadius:'100%',height:150,width:150,zIndex:10,border:'10px solid white'}}></img>
                        </div>
                          <Card className='p-4' variant='outlined' 
                          style={{marginTop:-90,zIndex:-1,background:'darkviolet',color:'white',borderRadius:20}}>
                          <div className='text-center' style={{marginTop:70}}>
                            <h6 className='mt-2'>{row.name}</h6>
                            <h6 className='mt-2 text-default'>{row.status}</h6>
                            <q>{row.text}</q>
                            <Box component="fieldset" className='mt-4' mb={1} borderColor="transparent">
                              <Rating name="read-only" value='3' readOnly size="small"  />
                            </Box>
                          </div>
                          </Card>                        
                        </Col>
                        <Col xs='12' lg='3'></Col>
                      </Row>
                    </div>
                </Carousel.Item>
                ))
              }
            </Carousel> 
          </div>
        </Container>
      </div>

      <Footer/>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

    </React.Fragment>
  );
}


