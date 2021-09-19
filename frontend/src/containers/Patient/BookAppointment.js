import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Token} from '../../actions/authactions';


import { useHistory, useParams,Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { PDFDownloadLink,Document, Page,Text  } from "@react-pdf/renderer";
import { PdfDocument } from "./pdfTemplate/Appointment";

import Paper from '@material-ui/core/Paper';
import '../Doctor/style.css';
import {CreateAppointment,GetDoctorProfilebyId,BookAppointment} from '../../actions/patient';
import {GetLatestPost} from "../../actions/posts";

import {GetDoctorSettingbyId} from "../../actions/settings";

import {
    Col,
    Row,
    FormControl,Form,} from "react-bootstrap";
  import Typography from "@material-ui/core/Typography";

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import TextField from '@material-ui/core/TextField';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import Divider from "@material-ui/core/Divider";

import { Alert, AlertTitle } from '@material-ui/lab';


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


function MUIAlert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const textStyle4={
  color: '#02475b',
  fontSize:'20px',
  fontWeight:500,
  lineHeight:'16px',
  whiteSpace: "nowrap",
}

function AppointmentBook({auth}) {

  
  const { isAuthenticated, user,authEmail,authId } = auth;

  // console.log("Appointement User = ",user);
  console.log("Appointement Id = ",authId);
  console.log("Appointement Email = ",authEmail);
  
  const { id } = useParams();
  
  const [doctor, setdoctor] = useState([]);
  const [latestPost, setlatestPost] = useState([])
  const [doctorSettings, setdoctorSettings] = useState([]);
  const [appointmentDetails, setDetails] = useState([]);
  
  
  const [appointsuccess, setAppointsuccessContainer] = useState(false);
  const [paymentsuccess, setPaymentSuccess] = useState(false);
  const [show, setHide] = useState(false)
  
  

  const [openSuccess, setOpenSuccess] = React.useState(false);

  const [openAlert, setOpenAlert] = React.useState(true);
  
  const [errormsg, serErrormsg] = React.useState('');

  const [formData, setFormData] = useState({
    patient_name:'',
    blood_group:'None of these',
    gender:'',
    date_of_birth:'',
    date_of_appointment:'',
    appointment_mode:'Offline',
    appointment_type:'New',
    mobileno:'',
    address:'',
  });

  useEffect(() => {
      GetDoctorProfilebyId(id).then((data)=>{
           setdoctor(data);
      }); 
      GetDoctorSettingbyId(id).then((data)=>{
        console.log("Settings = ",data);
        console.log("Appointmet Booking = ",data.appointment_booking);
        setdoctorSettings(data);
        setOpenAlert(data.appointment_booking);
      })
      GetLatestPost().then((data)=>{
        setlatestPost(data);
      }) 
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
  }, [])

  if(paymentsuccess){
    return <Redirect to='/explore_doctors'/>;
  }

  const { patient_name,blood_group,gender,date_of_birth,date_of_appointment,appointment_type,appointment_mode,mobileno,address} = formData;  
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  

  // const handleClickSuccess = () => {
  //   setOpenSuccess(true);
  // };
 
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const handleCreate=()=>{
   
    if(patient_name.length<3){
      serErrormsg('Please enter valid name');
      setOpenSuccess(true);
    }else if(gender.length<3){
      serErrormsg('Please fill gender category');
      setOpenSuccess(true);
    }else if(date_of_birth==''){
      serErrormsg('Please enter valid date of birth');
      setOpenSuccess(true);
    }else if(date_of_appointment==''){
      serErrormsg('Please enter appointment date');
      setOpenSuccess(true);
    }else if(mobileno.length<10){
      serErrormsg('Please enter valid mobile number');
      setOpenSuccess(true);
    }else if(address.length<4){
      serErrormsg('Please enter valid address');
      setOpenSuccess(true);
    }else if(
      (doctorSettings.appointment_type=='Offline' && appointment_mode=='Online') || 
      (doctorSettings.appointment_type=='Online' && appointment_mode=='Offline')
    ){
      serErrormsg(`${appointment_mode} Mode of appointment not availabe at this moment`);
      setOpenSuccess(true);
    }
    else if(doctorSettings.appointment_booking){
      const doctorId=id;
      const doctor_name=doctor.first_name+" "+doctor.last_name;
      const hospital_name=doctor.hospital;
      const email=authEmail;

      const data={doctorId,doctor_name,hospital_name,date_of_appointment,appointment_type,appointment_mode,
         patient_name,blood_group,gender,date_of_birth,email,mobileno,address}      
      CreateAppointment(data).then((res)=>{
         setDetails(res);
         console.log("Patient Data = ",res);
      }).catch((err)=>{
         console.log(err);
      });
      setAppointsuccessContainer(true);
      setHide(true); 
    } else{
      if(!doctorSettings.appointment_booking){
        serErrormsg(`Appointment Booking Not Allowed at this moment.`);
        setOpenSuccess(true);
      }
    }
  }




  async function displayRazorpay() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `auth-token ${Token()}`,
      },
    }; 

    const result = await axios.post("http://localhost:5000/payment/orders");

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: 'rzp_test_17feF87LUF3Twh',
      amount: '100', //  = INR 1
      name: 'Online Appointment Booking',
      description: 'We work for the welfare of human beings',
      image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
      order_id: order_id, //Pass the `id` obtained in the previous step
      // account_id: "acc_Ef7ArAsdU5t0XL",
      handler: async function (response) {
        const data = {
            doctorId:id,
            email:appointmentDetails.email,
            doctor_name:appointmentDetails.doctor_name,
            hospital_name:appointmentDetails.hospital_name,
            date_of_appointment:appointmentDetails.date_of_appointment,
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
        };

        console.log(data);
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `auth-token ${Token()}`,
          },
        };  
        const result = await axios.post("http://localhost:5000/payment/success", data,config)
        .then((res)=>{
          console.log(res.data);
          setPaymentSuccess(true);
        });
      },
      prefill: {
          name: appointmentDetails.patient_name,
          contact: appointmentDetails.mobileno,
          email: appointmentDetails.email
      },
      notes: {
          address: appointmentDetails.address
      },
      theme: {
          color: 'blue',
          hide_topbar: false
      }
    };
    
    var rzp1 = new window.Razorpay(options);
    rzp1.open();

  }

  

    return (
        <div style={{marginTop:100}}>
          <div >
              <Grid container style={{padding:0}}>
                  <Grid item lg={9} xs={12}>
                  {
                      appointsuccess==false?
                      <Card  elevation={6} className='ml-2' style={{margin:'10px 10px',background:'rgb(243, 242, 239)'}}>
                          <Paper>
                            <Card variant="outlined" className='py-4' style={{background:'darkviolet',color:'white'}}>
                                <h5 className='mx-4'>Book Appointment</h5>
                            </Card>
                            <Card variant="outlined" className='py-3'>
                                <div className='mx-4'>
                                  <h6>Appointment information</h6>
                                  <div className='mt-3'>
                                    {
                                      openAlert?
                                       null
                                      :
                                      <Alert variant="filled" severity="warning" elevation={12}>
                                       <AlertTitle><strong>Appointment Closed</strong></AlertTitle>
                                       <div>
                                         <p>Appointment Booking is closed by doctor at this moment.<strong>SORRY</strong> for your inconvience.</p>
                                       </div>
                                      </Alert>
                                    }
                                    <Card variant='outlined' className='mt-4 p-3'>
                                      <p>New Patient Appointment Fee : Rs {doctorSettings.new_appointmentFee}</p>
                                      <p>Repeat Patient Appointment Fee : Rs {doctorSettings.old_appointmentFee}</p>
                                    </Card>
                                  </div>
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
                                         <Form.Label>Appointment Mode</Form.Label>
                                         <Form.Control as="select" value={appointment_mode} name="appointment_mode" 
                                            onChange={e => onChange(e)}>
                                           <option>Online</option>
                                           <option>Offline</option>
                                         </Form.Control>
                                      </Col>
                                      <Col lg='6' xs={12}>
                                      <Form.Group className='my-4'>
                                        <Form.Label>Appointment Type</Form.Label>
                                        <Form.Control as="select" value={appointment_type} name="appointment_type" 
                                        onChange={e => onChange(e)} defaultValue='None of these'>
                                          <option>New</option>
                                          <option>Repeat</option>
                                        </Form.Control>
                                        </Form.Group>
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
                                  </Row>
                                </div>
                            </Card>
                            <Card elevation={4} variant='outlined' className='pb-5'>
                                <h6 className='mx-3 my-4'>Profile information</h6>
                                <Row className='mx-2'>
                                  <Col lg='4' xs={12}>
                                        <Form.Group controlId="patientId" className="my-4">
                                           <Form.Label>Patient Id</Form.Label>
                                           <Form.Control type="text" placeholder="Patient Id*" 
                                            value={authId} name='patient_id'  
                                            disabled/>
                                         </Form.Group>

                                         <Form.Group controlId="pname" className="my-4">
                                           <Form.Label>Patient Name</Form.Label>
                                           <Form.Control type="text" placeholder="Patient Name*" 
                                         value={patient_name} name='patient_name'  onChange={e => onChange(e)}
                                         required/>
                                         </Form.Group>
                                  </Col>
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
                                  
                                  </Col>
                                  <Col lg='4' xs={12}>           
                                  <Form.Group  className='my-4'>
                                        <Form.Label>Gender</Form.Label>
                                       <div style={{display:'flex',justifyContent:'space-around'}}>
                                         <Form.Check
                                           type="radio"
                                           label="Male"
                                           name="gender"
                                           id="formHorizontalRadios1"
                                           value='Male'
                                           onChange={e => onChange(e)}
                                         />
                                         <Form.Check
                                           type="radio"
                                           label="Female"
                                           name="gender"
                                           id="formHorizontalRadios2"
                                           value='Female'
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
                                            name='email' value={authEmail} onChange={e => onChange(e)} disabled/>
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
                                         {/* <Button variant='contained' color='secondary' onClick={displayRazorpay}>Pay Now</Button> */}
                                      </Col>
                                  </Row>
                                </div>                            
                            </Card>
                            <Card variant='outlined'>
                                <div className='mx-4'>
                                   <Button variant='contained' color='primary' className='my-4 mx-3' 
                                   style={{float:'right'}}
                                  //  onClick={handleClickSuccess}
                                   >Cancel</Button>

                                   <Button variant='contained' color='primary' className='my-4 mx-3' 
                                   style={{float:'right'}}
                                   onClick={handleCreate}>Save</Button>
                                    {/* onClick={handleAppointment}>Save</Button> */}
                                </div>
                            </Card>
                          </Paper>
                        <Snackbar
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                          style={{background:'#f50057',color:'white'}}
                          open={openSuccess}
                          elevation={12}
                          autoHideDuration={6000}
                          onClose={handleCloseSuccess}
                        >
                           <Alert onClose={handleCloseSuccess} severity="danger"  elevation={12}
                           style={{color:'white'}}>{errormsg}</Alert>
                        </Snackbar>
                      </Card>
                      
                  
                  :
               
                        <Card  elevation={6} className='ml-2' style={{margin:'10px 10px',background:'rgb(243, 242, 239)'}}>
                          <Paper style={{background:'darkviolet',color:'white',paddingBottom:80}}>
                            <Card variant="outlined" className='py-4' style={{background:'darkviolet',color:'white',height:'30vh'}}>
                                <h1 className='mx-4 text-center'>Congrats your appointment </h1>
                                <h5 className='mx-4 text-center'>created successfully</h5>
                            </Card>
                            <Card variant="outlined"  style={{marginLeft:10,marginRight:10}}>
                                  <div className='m-4'>
                                     <h5>Appointment Details</h5>
                                  </div>
                                  <Card variant="outlined" >
                                    <Grid container>
                                      <Grid lg={6} xs={12}>
                                        <div className='m-4'>
                                          <h6>Doctor Name : <span className='mx-3' style={{color:'gray'}}>{appointmentDetails.doctor_name}</span></h6>
                                          <h6>Hospital Name : <span className='mx-3' style={{color:'gray'}}>{appointmentDetails.hospital_name}</span></h6>
                                        </div>
                                      </Grid>
                                      <Grid lg={6} xs={12}>
                                        <div className='m-4'>
                                          <h6>Appointment Type : <span className='mx-3' style={{color:'gray'}}>{appointmentDetails.appointment_type}</span></h6>
                                          <h6>Appointment Date : <span className='mx-3' style={{color:'gray'}}>{appointmentDetails.date_of_appointment}</span></h6>
                                        </div>
                                      </Grid>
                                    </Grid>
                                    <Divider/>
                                    <Grid container>
                                      <Grid lg={6} xs={12}>
                                        <h6 className='m-4'>Patient Profile</h6>
                                        <div className='m-4'>
                                          <h6>Patient Id :   <span className='mx-3' style={{color:'gray'}}>{authId}</span></h6>
                                          <h6>Patient Name : <span className='mx-3' style={{color:'gray'}}>{appointmentDetails.patient_name}</span></h6>
                                          <h6>Gender :       <span className='mx-3' style={{color:'gray'}}>{appointmentDetails.gender}</span></h6>
                                          <h6>Blood Group  : <span className='mx-3' style={{color:'gray'}}>{appointmentDetails.blood_group}</span></h6>
                                          <h6>Date of Birth :<span className='mx-3' style={{color:'gray'}}>{appointmentDetails.date_of_birth}</span></h6>
                                        </div>
                                      </Grid>
                                      <Grid lg={6} xs={12}>
                                        <h6 className='m-4'>Contact Information</h6>
                                        <div className='m-4'>
                                          <h6>Email :         <span className='mx-3' style={{color:'gray'}}>{appointmentDetails.email}</span></h6>
                                          <h6>Mobile Number : <span className='mx-3' style={{color:'gray'}}>{appointmentDetails.mobileno}</span></h6>
                                          <h6>Address :       <span className='mx-3' style={{color:'gray'}}>{appointmentDetails.address}</span></h6>
                                        </div>
                                      </Grid>
                                    </Grid>
                                    <Grid container className='m-4'>
                                      <Grid lg={6} xs={12} className='my-4'>
                                      {show &&<PDFDownloadLink
                                         document={<PdfDocument data={appointmentDetails} />}
                                         fileName="Appointment.pdf"
                                         onLoadError={(error) => alert('Error while loading document! ' + error.message)}
                                         style={{
                                           textDecoration: "none",
                                          //  padding: "10px",
                                           color: "white",
                                           backgroundColor: "#f50057",
                                          //  borderRadius:10,
                                           width:'100%',
                                           padding:'10px 20px',
                                           fontSize:'18px',
                                           borderRadius:20
                                         }}
                                       >
                                         {
                                         ({ blob, url, loading, error }) =>(
                                           loading ? "Loading document..." : "Download PDF"
                                         )
                                         }
                                       </PDFDownloadLink>}
                                        {/* <Button variant='contained'  color='secondary'
                                          style={{width:'90%',padding:'10px 20px',fontSize:'18px',borderRadius:20}}
                                        >Download PDF</Button> */}
                                      </Grid>
                                      {
                                        doctorSettings.payment_mode?
                                        <Grid lg={6} xs={12} className='my-4'>
                                           <Button variant='contained'  color='primary' onClick={displayRazorpay}
                                             style={{width:'90%',padding:'10px 20px',fontSize:'18px',borderRadius:20}}
                                           >Pay Rs. 
                                           {
                                            appointmentDetails.appointment_type=='New'?doctorSettings.new_appointmentFee:doctorSettings.old_appointmentFee
                                           }</Button>
                                         </Grid>                                        
                                        :null
                                      }

                                    </Grid>
                                  </Card>
                            </Card>

                          </Paper>
                        </Card>    
                  }

                  </Grid>
                    
                  <Grid item lg={3} xs={12}>
                      <div  style={{margin:'20px 20px'}}>
                          <p style={textStyle4}>Latest Blogs</p>
                      </div>
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
        </div>
    )
}


const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppointmentBook);
