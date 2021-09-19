import React,{useState,useEffect} from 'react';
import { NavLink} from 'react-router-dom';

// import {
//   CreateProfile,
//   GetProfile,
//   CreateProfileEdu,  GetProfileEdu, DeleteEdu
// } from '../../../actions/doctor';

import {CreateDoctorSetting} from "../../../actions/settings";

import Paper from '@material-ui/core/Paper';
import '../style.css';

import {
    Col,
    Row,
    Container,
    InputGroup,
    FormControl,Form,
    ListGroup,
  } from "react-bootstrap";

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
  

import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';




import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import Divider from "@material-ui/core/Divider";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export default function EditProfile() {


  const [openSuccess, setOpenSuccess] = React.useState(false);
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };
  
  

  const [online, setOnline] = React.useState(false);
  const [book_appointment, setBook_appointment] = React.useState(false);

  const handleChangeOnline = (event) => {
    setOnline(event.target.checked);
  };

  const handleChangeAppointment = (event) => {
     setBook_appointment(event.target.checked);
  };

    const [formData, setFormData] = useState({
        new_appointmentFee:'',            
        old_appointmentFee:'',
        appointment_type:'Offline',
        patient_allowed:'5',
    });

    const {new_appointmentFee,old_appointmentFee, appointment_type,patient_allowed} = formData;  
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
   

    const   handleSettings=()=>{
     const payment_mode=online;
     const appointment_booking=book_appointment;
     const settingData={new_appointmentFee,old_appointmentFee, appointment_type,payment_mode,appointment_booking,patient_allowed};
     console.log(settingData);
     CreateDoctorSetting(settingData).then((res)=>{
       console.log(res);
       setOpenSuccess(true);
     });
   }



    return (
        <div>
            <div >
              <Grid container style={{padding:0}}>
                      <Grid item lg={6} xs={12} className='mt-4'>
                        <Card  elevation={6} className='ml-2' style={{margin:'0px 10px',background:'rgb(243, 242, 239)'}}>
                            <Card variant="outlined" className='py-4' style={{background:'darkviolet',color:'white'}}>
                                <h5 className='mx-4'>Account Settings</h5>
                            </Card>
                          <div>
                            <Card variant="outlined" className='py-3' style={{background:'rgb(243, 242, 239)'}}>
                                <div className='mx-4'>
                                   <Form.Group controlId="fname" className="my-4">
                                     <Form.Label>New Patient Appointment Fee</Form.Label>
                                     <Form.Control type="text" placeholder="New Appointment Fee*" 
                                     value={new_appointmentFee}
                                     name='new_appointmentFee'  
                                     onChange={e => onChange(e)}
                                   />
                                   </Form.Group>
                                   <Form.Group controlId="lname" className="my-4">
                                     <Form.Label>Old Patient Appointment Fee</Form.Label>
                                     <Form.Control type="text" placeholder="Repeat Appointment Fee*" 
                                      value={old_appointmentFee}
                                      name='old_appointmentFee' onChange={e => onChange(e)}/>
                                   </Form.Group>
                                   

                                   <Form.Label>Allow Appointment Mode</Form.Label>
                                   <Form.Control as="select" value={appointment_type} name="appointment_type" 
                                      onChange={e => onChange(e)}>
                                     <option>Offline</option>
                                     <option>Online</option>
                                     <option>Allow both mode</option>
                                   </Form.Control>

                                   <Form.Label className='mt-4'>Total Number of Patient allowed for Appointment per day</Form.Label>
                                   <Form.Control as="select" value={patient_allowed} name="patient_allowed" 
                                      onChange={e => onChange(e)}>
                                     <option>5</option>
                                     <option>25</option>
                                     <option>50</option>
                                     <option>75</option>
                                     <option>100</option>
                                     <option>125</option>
                                     <option>150</option>
                                     <option>200</option>
                                   </Form.Control>

                                    <div style={{display:'flex',marginTop:30,justifyContent:'space-between'}}>
                                      <Form.Label>Allow Patient for Online Payment</Form.Label>
                                      <FormGroup style={{marginTop:-8}}>
                                        <FormControlLabel control={<Switch  checked={online}  onChange={handleChangeOnline}/>} 
                                        label={online?'Allow':'Not Allow'} />
                                      </FormGroup>
                                    </div>

                                    <div style={{display:'flex',marginTop:30,justifyContent:'space-between'}}>
                                      <Form.Label>Allow Patient to Book Appointments</Form.Label>
                                      <FormGroup style={{marginTop:-8}}>
                                        <FormControlLabel control={<Switch  checked={book_appointment}  onChange={handleChangeAppointment}/>} 
                                        label={book_appointment?'Allow':'Not Allow'} />
                                      </FormGroup>
                                    </div>
                                </div>
                            </Card>
                            <Card variant='outlined' style={{background:'rgb(243, 242, 239)'}}>
                                <div className='mx-4'>
                                   <Button variant='contained' color='primary' className='my-4' 
                                   style={{float:'right'}} onClick={handleSettings}>Save</Button>
                                </div>
                            </Card>
                         </div>
                      </Card>
                    </Grid>
                    
                    <Grid item lg={6} xs={12} className='mt-4'>
                          <Card elevation={6} className='ml-2' style={{margin:'0px 10px',background:'rgb(243, 242, 239)'}}>
                           <Card variant="outlined" className='py-4' style={{background:'darkviolet',color:'white'}}>
                              <h5 className='mx-4'>Account Setting Guide</h5>
                           </Card>
                           <ListGroup variant="flush" style={{color:'#525f7f',fontSize:'0.9rem'}}>
                            <ListGroup.Item style={{background:'rgb(243, 242, 239)'}} className="py-3">
                              <strong>New Patient Appointment Fee :</strong>      
                              Amount paid by patients if he/she is visiting first time.
                              </ListGroup.Item>
                            <ListGroup.Item style={{background:'rgb(243, 242, 239)'}} className="py-3">
                              <strong>Old Patient Appointment Fee </strong>     
                              : Amount paid by patients if he/she is visiting  after first time.</ListGroup.Item>
                            <ListGroup.Item style={{background:'rgb(243, 242, 239)'}} className="py-3">
                              <strong>Allow Appointment Mode</strong>        
                              :Allow patients to book appointment Online or Offline . If you allow Online mode 
                              then please set Telemedicine credentials.</ListGroup.Item>
                            <ListGroup.Item style={{background:'rgb(243, 242, 239)'}} className="py-3">
                              <strong>Total Number of Patient allowed for Appointment per day</strong>       
                              :It allows how much patients are allowed for particular day for appointments.</ListGroup.Item>
                            <ListGroup.Item style={{background:'rgb(243, 242, 239)'}} className="py-3">
                              <strong> Allow Patient for Online Payment</strong>      
                              :It allow process to pay appointment fee . If its checked then update your payments setting and 
                              fill bank details.</ListGroup.Item>
                            <ListGroup.Item style={{background:'rgb(243, 242, 239)'}} className="py-3">
                              <strong>Allow Patient to Book Appointments </strong> 
                              :If its checked  then  appointment booking is allowed for patients otherwise not allow appointment booking
                               at a particular moment or day.</ListGroup.Item>
                          </ListGroup>
                      </Card>
                        </Grid>
                      </Grid>
                  </div>
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    open={openSuccess}
                    autoHideDuration={6000}
                    onClose={handleCloseSuccess}
                  >
                     <Alert onClose={handleCloseSuccess} severity="success">
                        Account Setting Updated Successfully.
                      </Alert>
                  </Snackbar>
        </div>
    )
}


