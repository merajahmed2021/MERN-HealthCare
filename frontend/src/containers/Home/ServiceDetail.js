import React,{useEffect,useState} from "react";
import { NavLink ,useParams} from 'react-router-dom';
import Servicesjson from './Services.json';
import {GetLatestPost} from "../../actions/posts";

import Footer from "../../components/Footer";
import {
  // Card,
  // Button,
  Col,
  Row,
  Container,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

// import { emphasize } from '@material-ui/core/styles';
// import Chip from '@material-ui/core/Chip';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
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

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const btnStyle = {
    borderRadius: "20px",
    paddingTop: 0,
    paddingBottom: 0,
  };

export default function ServiceDetail() {

  const { name } = useParams();

  const [Service, setService] = useState([]);
  const [latestPost, setlatestPost] = useState([])


  useEffect(() => {
   for(var i=0;i<Servicesjson.length;i++){
     if(Servicesjson[i].name==name){
        setService(Servicesjson[i]);
     }
   }
   GetLatestPost().then((data)=>{
    setlatestPost(data);
  }) 
  }, [])

  const [expanded, setExpanded] = React.useState(0);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  // const classes = useStyles();
  // const theme = useTheme();
  // const [activeStep, setActiveStep] = React.useState(0);
// 
  // const handleNext = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };
// 
  // const handleBack = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };


  
  const textStyle={
    color: '#02475b',fontSize: '16px',fontWeight: 500,lineHeight: '21px'
  }

  const textStyle2={
    color: '#02475b',fontSize:'12px',fontWeight:500,lineHeight:'16px',whiteSpace: "nowrap",marginTop:-10
  }

  const hosStyle={
    color: '#02475b',fontSize:'14px',fontWeight:500,lineHeight:'16px',whiteSpace: "nowrap",marginTop:0
  }


  return (
    <div>
      <Container>
        <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: 50 }}>
          <Link color="inherit" href="/" onClick={handleClick}>
            Home
          </Link>
          <Link
            color="inherit"
            href="/getting-started/installation/"
            onClick={handleClick}
          >
            Services
          </Link>
          <Typography color="textPrimary">Services</Typography>
        </Breadcrumbs>
      </Container>
      <div >
          <Grid container style={{padding:0}}>
              <Grid item lg={9} xs={12}>
                <Card  elevation={6} className='ml-2' style={{margin:'50px 10px',background:'rgb(243, 242, 239)'}}>
                  <div style={{height:400}} >
                  <CardMedia style={{height:'100%'}}  image={Service.img}/>                        

                  </div>
                  <CardContent style={{marginTop:10}}>
                    <div>
                      <h1  style={{ margin:20, paddingBottom: 10 }}>
                           <strong className="text-primary">{name}</strong>
                      </h1>
                    </div>
                      <Divider style={{backgroundColor:'gray',marginTop:30}}/>
                      <Card className='mt-4' variant='outlined' style={{borderRadius:20}}>
                        <CardContent>
                           <p style={{color: '#02475b',fontSize:'16px',lineHeight:'25px'}}>{Service.details}</p> 
                        </CardContent>
                      </Card>
                  </CardContent>
                </Card>
    
                <Card elevation={6} className='ml-2' style={{margin:'50px 10px',background:'rgb(243, 242, 239)'}}>
                  <div>
                     <h1  style={{ margin:20, paddingBottom: 10 }}>
                         <strong className="text-primary">Top</strong> Doctors
                     </h1>
                  <div>
                  <Row>
                      <div style={{display:'flex',overflow:'scroll',overflowY:'hidden'}}>
                          {
                            Doctor.map((row)=>(
                              <Col lg='4' xs='10' md='5' className='mx-3 my-2'>
                                 <Card  elevation={6} className='m-2 p-3 mt-3' style={{borderRadius:'20px'}}>
                                  <Grid container>
                                      <Grid  lg={5} xs={5}>
                                          <img  src='https://cdn.pixabay.com/photo/2017/09/01/13/08/guardian-angel-2704181_960_720.jpg'  
                                          style={{width:'100%',height:130,borderRadius:'100%'}}></img>
                                      </Grid>
                                      <Grid  lg={7} xs={7} >
                                      <div className='p-2'>
                                           <p style={textStyle}>Dr. {row.first_name} {row.last_name}</p>
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
                                       <NavLink  to={`/doctor_profile/${row._id}`} style={{textDecoration:"none"}}>
                                          <Button variant='contained' color="primary"   style={{borderRadius:20,padding:'5px 10px'}}>Profile</Button>
                                      </NavLink>
                                       <NavLink  to={`/book_appointment/${row._id}`} style={{textDecoration:"none"}}>
                                          <Button variant='contained' color="secondary" style={{borderRadius:20,padding:'5px 10px'}}>Appointments</Button>
                                      </NavLink>
                                  </div>
                                </Card>
                              </Col> 
                            ))
                          }
                          <Col lg='4' xs='10' md='5' className='mx-3 my-2'>
                           <Card>
                             <CardActionArea style={{height:'100%'}}>
                               <Button>See More</Button>
                             </CardActionArea>
                           </Card>
                          </Col> 
                        </div>
                      </Row>
                    </div>
                  </div>
                </Card>

                <Card elevation={6} className='ml-2' style={{margin:'50px 10px',background:'rgb(243, 242, 239)'}}>
                    <div>
                      <h1 style={{ margin: 20, paddingBottom: 20 }}>
                         <strong className="text-primary">General</strong> FAQs
                      </h1>
                    </div>
                    {/* {
                      Service.faqs.map((row)=>(
                        <Accordion
                          square
                          expanded={expanded === "panel1"}
                          onChange={handleChange("panel1")}
                        >
                          <AccordionSummary
                            aria-controls="panel1d-content"
                            id="panel1d-header"
                          >
                            <Typography>{row.ques}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                              Suspendisse malesuada lacus ex, sit amet blandit leo
                              lobortis eget. Lorem ipsum dolor sit amet, consectetur
                              adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                              blandit leo lobortis eget.
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      ))
                    } */}
                   
                    <Accordion
                      square
                      expanded={expanded === 1}
                      onChange={handleChange(1)}
                    >
                      <AccordionSummary
                        aria-controls="panel2d-content"
                        id="panel2d-header"
                      >
                        <Typography>Collapsible Group Item #2</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Suspendisse malesuada lacus ex, sit amet blandit leo
                          lobortis eget. Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                          blandit leo lobortis eget.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      square
                      expanded={expanded === "panel3"}
                      onChange={handleChange("panel3")}
                    >
                      <AccordionSummary
                        aria-controls="panel3d-content"
                        id="panel3d-header"
                      >
                        <Typography>Collapsible Group Item #3</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Suspendisse malesuada lacus ex, sit amet blandit leo
                          lobortis eget. Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                          blandit leo lobortis eget.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Card>
                </Grid>
                <Grid item lg={3} xs={12}>
                    <div  style={{marginTop:'50px'}}> </div>
                      {
                        latestPost.map((row,index)=>(
                          <NavLink  to={`/blog_details/${row._id}`} style={{textDecoration:"none"}}>
                          <Card elevation={6} className='m-2  mt-3'  style={{borderRadius:'20px'}} >
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={"http://localhost:5000/images/" + row.image}
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">{row.title}</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">{row.content}</Typography>
                              </CardContent>
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
                </Grid>
              </Grid>
            </div>
                 <Divider style={{background:'gray',marginTop:100}}/>
                 <Footer />
    </div>
  );
}
