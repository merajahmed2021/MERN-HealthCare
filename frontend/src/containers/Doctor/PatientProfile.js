import React,{useState,useEffect} from 'react';
import './style.css';
import { useHistory, useParams } from 'react-router-dom';

import {GetPatientbyId,CreateCheckup,GetCheckupHistory,Checkup_delete,
CreateAppointmentHistory
} from '../../actions/doctor';

import {
    Col,
    Row,
    Container,
    InputGroup,
    FormControl,Form,
    ListGroup,Card,
  } from "react-bootstrap";

  import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Collapse from '@material-ui/core/Collapse';
import Divider from "@material-ui/core/Divider";


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

export default function Telemedicine() {


  const boxStyle={
    boxShadow: "0px 2px 4px rgb(0 0 0 / 20%)",
    cursor:'pointer',
    borderRadius: '5px',
    marginBottom:18
  }

  const textStyle={
    color: '#02475b',fontSize: '16px',fontWeight: 500,lineHeight: '21px'
  }

    const classes = useStyles();
    const date=new Date();
    // console.log(date);
    const { id } = useParams();

    const [patient, setpatient] = useState([]);
    const [appointments, setappointments] = useState([]);
    // console.log(patient);
    
    const [patientId, setpatientId] = useState(null);

    useEffect(() => {
        GetPatientbyId(id).then((data)=>{
          console.log("PATIENT PROFILE = ",data);  
          setpatient(data);
          console.log(data._userId); 
          const id=data._userId;
          GetCheckupHistory(id).then((res)=>{
            console.log('Patient History = ',res);
            setappointments(res);
          })
        })  
      
    }, [])


    const [formData, setFormData] = useState({
      symptoms:'',
      diagnosis:'',
      prescription:''
    });
  
    const {symptoms,diagnosis,prescription}=formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleCheckup=()=>{
      const appointmentId=patient._id;
      console.log(appointmentId,symptoms,diagnosis,prescription);
      const data={appointmentId,symptoms,diagnosis,prescription};
      CreateCheckup(data);
    }

    const handleDelete=(id)=>{
      console.log('Delete ID=',id);
      Checkup_delete(id).then(()=>{
        console.log('Deleted successfully');
      });
    }

    const handleHistory=(id)=>{
       CreateAppointmentHistory(id).then((res)=>{
         console.log("History Created Successfully");
         console.log(res);
       });
    }
    
  const [checked, setChecked] = React.useState(false);
  const handleChangeCollapse = () => {
    setChecked((prev) => !prev);
  };

 

    return (
        <div className='mx-3' style={{marginTop:80}}>
                <Row>
                    <Col lg='4' xs={12} className='my-4'>
                        <Card style={{ width: '100%' }}   
                       style={{boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',borderRadius:20}}>
                          <Card.Header className='text-bolder py-3 '>
                              <div className='text-center'>
                                  <img src='https://image.freepik.com/free-vector/spot-light-background_1284-4685.jpg' 
                                      style={{height:100,width:100,borderRadius:'100%'}}></img>
                                  <div className='my-4'>
                                      <h3>{patient.patient_name}</h3>
                                      <p style={textStyle}>{patient.email}</p>
                                  </div>
                              </div>
                          </Card.Header>
                          <List className={classes.root}>
                            <ListItem>
                              <ListItemIcon><ImageIcon /></ListItemIcon>
                              <ListItemText primary="Patient Id" secondary={patient._id}/>
                            </ListItem>
                            <ListItem>
                              <ListItemIcon><ImageIcon /></ListItemIcon>
                              <ListItemText primary="Gender" />
                              <ListItemSecondaryAction>{patient.gender}</ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                              <ListItemIcon><ImageIcon /></ListItemIcon>
                              <ListItemText primary="Blood Group" />
                              <ListItemSecondaryAction>{patient.blood_group}</ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                              <ListItemIcon><ImageIcon /></ListItemIcon>
                              <ListItemText primary="Birth Date" />
                              <ListItemSecondaryAction>{patient.date_of_birth}</ListItemSecondaryAction>
                            </ListItem>
                          </List>
                          <Card.Header className='py-3  text-center'>
                                    <h6 style={textStyle}>Other Info</h6>
                          </Card.Header>
                          <List className={classes.root}>
                            <ListItem>
                              <ListItemIcon><ImageIcon /></ListItemIcon>
                              <ListItemText primary="Mobile Number" secondary={patient.mobileno}/>
                            </ListItem>
                            <ListItem>
                              <ListItemIcon><ImageIcon /></ListItemIcon>
                              <ListItemText primary="Address" secondary={patient.address}/>
                            </ListItem>
                          </List>
                        </Card>
                    </Col>
                    <Col lg='8' xs={12} className='my-4'>
                         <Card className='p-4'   
                         style={boxStyle,{background:'rgba(0,0,0,.03)'}}
                         >
                          <div className='mx-2'>
                              <h4 style={{color: '#02475b',fontSize: '21px',fontWeight: 500,lineHeight: '31px'}}>Add New Checkup</h4>
                          </div>
                          <Divider className='my-2' style={{color:'red',background:'darkgray'}}/>
                          <div style={{marginRight:'auto'}} className='p-2'>
                              <h6 style={textStyle}>Booking Date : {patient.time}</h6>
                              <h6 style={textStyle}>Date of Appointment : {patient.date_of_appointment}</h6>
                              <h6 style={textStyle}>Appointment type : {patient.appointment_type}</h6>
                          </div>
                          <Divider className='my-2' style={{color:'red',background:'darkgray'}}/>
                          <Row>
                            <Col lg='4' xs={12}>
                               <Form.Group controlId="formBasicPassword" className='my-4'>
                                <Form.Label style={textStyle}>Symptoms</Form.Label>
                                <Form.Control type="text" as="textarea" rows={5} placeholder="Enter Symptoms*" 
                                 name="symptoms" value={symptoms}  onChange={e => onChange(e)}
                                />
                              </Form.Group>
                            </Col>
                            <Col lg='4' xs={12}>
                              <Form.Group controlId="formBasicPassword" className='my-4'>
                                <Form.Label style={textStyle}>Diagnosis</Form.Label>
                                <Form.Control type="text"  as="textarea" rows={5} placeholder="Enter Diagnosis*" 
                                  name="diagnosis" value={diagnosis}  onChange={e => onChange(e)}
                                />
                              </Form.Group>
                            </Col>
                            <Col lg='4' xs={12}>
                              <Form.Group controlId="formBasicPassword" className='my-4'>
                                <Form.Label style={textStyle}>Prescription</Form.Label>
                                <Form.Control type="text"  as="textarea" rows={5} placeholder="Enter Prescription*" 
                                 name="prescription" value={prescription}  onChange={e => onChange(e)}
                                />
                              </Form.Group>
                              <div style={{display:'flex'}}>
                              <Button variant="contained" className='my-4 mx-2' color="secondary" style={{float:'right'}}
                               onClick={()=>handleHistory(patient._id)}>Completed</Button>
                              <Button variant="contained" className='my-4' color="primary" style={{float:'right'}}
                               onClick={handleCheckup}>Submit</Button>
                              </div>
                            </Col>
                          </Row>
                        </Card>
                        <div style={{display:'flex',justifyContent:'space-between',marginTop:50}}>
                            <h4 style={{color: '#02475b',fontSize: '21px',fontWeight: 500,lineHeight: '31px'}}>Checkup History</h4>
                            <Button variant='outlined' color='secondary' onClick={handleChangeCollapse}
                            style={{borderRadius:'20px'}}>View Details</Button>
                        </div>
                        {
                          appointments.map((row)=>(
                            <Card className='p-3 my-4'  style={boxStyle}>
                            <div style={{display:'flex'}}>
                               <div style={{marginRight:'auto'}} className='p-2'>
                                   <h6 style={textStyle}>Booking Date : {row.time}</h6>
                                   <h6 style={textStyle}>Date of Appointment : {row.date_of_appointment}</h6>
                                   <h6 style={textStyle}>Appointment type : {row.appointment_type}</h6>
                               </div>
                               <div style={{marginLeft:'auto'}}>
                                  <IconButton aria-label="filter list" className=' mx-2'
                                    onClick={()=>handleDelete(row._id)}>
                                    <DeleteIcon />
                                  </IconButton>
                               </div>
                            </div>
                               {
                                 row.checkup.map((row)=>(
                                   <Collapse in={checked} key={row._id}>
                                     <Divider style={{marginTop:5,color:'red',background:'darkgray'}}/>
                                   <Row > 
                                <Col lg='4' xs={12}>
                                    <Card className='mt-3' style={boxStyle}>
                                    <Card.Header className='py-3  text-center'>
                                    <h6 style={textStyle}>Symptoms</h6>
                                      </Card.Header>
                                       <div className='p-2'>
                                           <p style={{color: '#02475b'}} className='mt-3'>{row.symptoms}</p> 
                                       </div>
                                    </Card>
                                </Col>
                                <Col lg='4' xs={12}>
                                   <Card className='mt-3' style={boxStyle}>
                                    <Card.Header className='py-3  text-center'>
                                    <h6 style={textStyle}>Diagnosis</h6>
                                      </Card.Header>
                                       <div className='p-2'>
                                           <p style={{color: '#02475b'}} className='mt-3'>{row.diagnosis}</p> 
                                       </div>
                                    </Card>
                                </Col>
                                <Col lg='4' xs={12}>
                                   <Card className='mt-3'  style={boxStyle}>
                                    <Card.Header className='py-3  text-center'>
                                    <h6 style={textStyle}>Prescription</h6>
                                      </Card.Header>
                                       <div className='p-2'>
                                           <p style={{color: '#02475b'}} className='mt-3'>{row.prescription}</p> 
                                       </div>
                                    </Card>
                                </Col>
                            </Row>
                            </Collapse>
                              ))
                            }
                          </Card>
                          ))
                        }

                    </Col>
                </Row>
        </div>
    )
}
