import React,{useState,useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import '../Doctor/style.css';
import {CreateAppointment,GetDoctorProfilebyId} from '../../actions/patient';
import {getCurrentUser} from '../../actions/auth';

import {
    Col,
    Row,
    Container,
    InputGroup,
    FormControl,Form,
    ListGroup,
  } from "react-bootstrap";

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';


export default function AppointmentBook() {

  const { id } = useParams();
  
  const [doctor, setdoctor] = useState([]);
 

  useEffect(() => {
   GetDoctorProfilebyId(id).then((data)=>{
       setdoctor(data);
   }); 
  }, [])

  const [formData, setFormData] = useState({
    patient_name:'',
    blood_group:'None of these',
    gender:'',
    date_of_birth:'',
    date_of_appointment:'',
    appointment_type:'Offline',
    mobileno:'',
    address:'',
  });


  const {
    patient_name,blood_group,gender,date_of_birth,date_of_appointment,appointment_type,mobileno,address} = formData;  
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  
  const handleCreate=()=>{
    const doctorId=id;
    const doctor_name=doctor.first_name+" "+doctor.last_name;
    const hospital_name=doctor.hospital;
    // const patient_id=getCurrentUser().id;
    const email=getCurrentUser().email;
    console.log(doctorId,doctor_name,hospital_name,patient_name,blood_group,gender,date_of_birth,date_of_appointment,appointment_type,email,mobileno,address)
    const data={doctorId,doctor_name,hospital_name,patient_name,blood_group,gender,date_of_birth,date_of_appointment,appointment_type,email,mobileno,address}
     CreateAppointment(data);
  }

    return (
        <div style={{marginTop:100}}>
            <Container>
                <Row>
                    <Col lg='12' xs={12} className='my-4'>
                        <Paper>
                            <Card variant="outlined" className='py-3'>
                                <h5 className='mx-4'>Book Appointment</h5>
                            </Card>
                            <Card variant="outlined" className='py-3'>
                                <div className='mx-4'>
                                  <h6>Basic information</h6>
                                  <Row>
                                      <Col  lg='6' xs={12}>
                                         <Form.Group controlId="dname" className="my-4">
                                           <Form.Label>Doctor Name</Form.Label>
                                           <Form.Control type="text" placeholder="Doctor name*" 
                                           name='doctor_name' 
                                           value={doctor.first_name+" "+doctor.last_name} 
                                            disabled/>
                                         </Form.Group>
                                         <Form.Group controlId="hname" className="my-4">
                                           <Form.Label>Hospital Name</Form.Label>
                                           <Form.Control type="text" placeholder="Hospital name*" 
                                          value={doctor.hospital} name='hospital_name'
                                          disabled/>
                                         </Form.Group>
                                      </Col>
                                      <Col lg='6' xs={12}>
                                         <Form.Group controlId="patientId" className="my-4">
                                           <Form.Label>Patient Id</Form.Label>
                                           <Form.Control type="text" placeholder="Patient Id*" 
                                            value={getCurrentUser().id} name='patient_id'  
                                            disabled/>
                                         </Form.Group>

                                         <Form.Group controlId="pname" className="my-4">
                                           <Form.Label>Patient Name</Form.Label>
                                           <Form.Control type="text" placeholder="Patient Name*" 
                                         value={patient_name} name='patient_name'  onChange={e => onChange(e)}
                                         required/>
                                         </Form.Group>
                                       
                                      </Col>
                                  </Row>
                                </div>
                            </Card>

                            <Card elevation={4} variant='outlined' className='pb-5'>
                                <h6 className='mx-3 my-4'>Other information</h6>
                                <Row className='mx-2'>
                                  <Col lg='4' xs={12}>
                                      <Form.Group className='my-4'>
                                        <Form.Label>Blood Group</Form.Label>
                                        <Form.Control as="select" name="blood_group" value={blood_group} 
                                          onChange={e => onChange(e)}>
                                          <option>None</option>
                                          <option>A+</option>
                                          <option>A-</option>
                                          <option>B+</option>
                                          <option>B-</option>
                                          <option>O+</option>
                                          <option>O-</option>
                                          <option>AB+</option>
                                          <option>AB-</option>
                                        </Form.Control>
                                      </Form.Group>
                                         
                                      <Form.Group  className='my-4'>
                                        <Form.Label>Gender</Form.Label>
                                       <div style={{display:'flex',justifyContent:'space-around'}}>
                                         <Form.Check
                                           type="radio"
                                           label="Male"
                                           name="gender"
                                           id="formHorizontalRadios1"
                                           value='male'
                                           onChange={e => onChange(e)}
                                         />
                                         <Form.Check
                                           type="radio"
                                           label="Female"
                                           name="gender"
                                           id="formHorizontalRadios2"
                                           value='female'
                                           onChange={e => onChange(e)}
                                         />
                                        <Form.Check
                                           type="radio"
                                           label="Other"
                                           name="gender"
                                           id="formHorizontalRadios3"
                                           value='other'
                                           onChange={e => onChange(e)}
                                         />
                                       </div>
                                    </Form.Group>
                                  </Col>
                                  <Col lg='4' xs={12}>
                                    <div>
                                    <TextField
                                     fullWidth
                                      id="date"
                                      label="Date of Birth*"
                                      type="date"
                                      defaultValue="2017-05-24"
                                      className='my-4'
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      value={date_of_birth}
                                      name='date_of_birth'
                                      onChange={e => onChange(e)}
                                    />
                                    </div>
                                    <div>
                                    <TextField
                                     fullWidth
                                      id="date"
                                      label="Date of Appointment*"
                                      type="date"
                                      defaultValue="2017-05-24"
                                      className='my-4'
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      name='date_of_appointment'
                                      value={date_of_appointment}
                                      onChange={e => onChange(e)}
                                    />
                                    </div>
                                  </Col>
                                  <Col lg='4' xs={12}>           
                                    <Form.Group className='my-4'>
                                        <Form.Label>Appointment Type</Form.Label>
                                        <Form.Control as="select" value={appointment_type} name="appointment_type" 
                                        onChange={e => onChange(e)} defaultValue='None of these'>
                                          <option>Offline</option>
                                          <option>Online</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                    <Form.Label>Upload Profile Image</Form.Label>
                                        <Form.File id="exampleFormControlFile1"  />
                                    </Form.Group>
                                  </Col>
                                  </Row>
                                  </Card>
                                  <Card variant="outlined" className='py-3'>
                                      <div className='mx-4'>
                                      <h6 >Contact information</h6>
                                      <Row>
                                      <Col lg='6' xs={12}>
                                         <Form.Group controlId="email" className='my-4'>
                                           <Form.Label>Email</Form.Label>
                                           <Form.Control type="text" placeholder="Email*" 
                                            name='email' value={getCurrentUser().email} onChange={e => onChange(e)} disabled/>
                                         </Form.Group>
                                         <Form.Group controlId="mobileno" className='my-4'>
                                           <Form.Label>Mobile Number</Form.Label>
                                           <Form.Control type="text" placeholder="Mobile Number*" 
                                             name='mobileno' value={mobileno}   onChange={e => onChange(e)}/>
                                         </Form.Group>
                                      </Col>
                                      <Col lg='6' xs={12}>
                                         <Form.Group controlId="address" className='my-4'>
                                           <Form.Label>Address</Form.Label>
                                           <Form.Control type="text" placeholder="Address*" 
                                             name='address' value={address}  onChange={e => onChange(e)}/>
                                         </Form.Group>
                                      </Col>
                                  </Row>
                                </div>                            
                            </Card>
                            <Card variant='outlined'>
                                <div className='mx-4'>
                                   <Button variant='contained' color='primary' className='my-4 mx-3' style={{float:'right'}}>Cancel</Button>
                                   <Button variant='contained' color='primary' className='my-4 mx-3' style={{float:'right'}}
                                   onClick={handleCreate}>Save</Button>
                                </div>
                            </Card>
                        </Paper>
                    </Col>
                   
                </Row>
            </Container>
        </div>
    )
}

