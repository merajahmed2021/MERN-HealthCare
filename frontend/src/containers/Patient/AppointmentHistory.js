import React,{useEffect,useState} from 'react';
// import './style.css';
import { NavLink } from 'react-router-dom';
import {
  Col,
  Row,
} from "react-bootstrap";

import {GetAppointmentHistory,
  GetAppointmentPending,DeleteAppointmentPending,GetAppointmentStatus

} from '../../actions/patient';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Divider from "@material-ui/core/Divider";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';



const useStyles = makeStyles((theme) => ({
  table: {
    // minWidth: 650,
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function BasicTable() {
  
  const classes = useStyles();

  const [history, sethistory] = useState([])
  const [pending, setpending] = useState([])
  // console.log(patient);

  useEffect(() => {
    GetAppointmentStatus();
    GetAppointmentPending().then((res)=>{
      console.log("Pending Appointments: ",res);
      setpending(res);
    })
    GetAppointmentHistory().then((res)=>{
      console.log(res);
      sethistory(res);
    })
  }, [])

  
  const textStyle={
    color: '#02475b',fontSize: '16px',fontWeight: 500,lineHeight: '21px'
  }


  // OPEN MODAL FOR DELETING PENDING DETAILS
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);};
  const handleClose = () => {setOpen(false);};
  const DeletePending=(id)=>{
    DeleteAppointmentPending(id);
    console.log('Appointment Deleted Successfully\n',id);
    setOpen(false);
  }
  const handleDeleteAppointment=()=>{
    handleClickOpen();
  }

  // GET STATUS FOR PENDING APPOINTMENTS
  const [getstatus, setgetstatus] = useState([]);
  const [statusdisplay, setStatusDisplay] = useState({
    id:'',
    display:false
  });

  const GetStatus=(id)=>{
    if(statusdisplay.display==false){
      GetAppointmentStatus(id).then((data)=>{
        console.log("Status = " ,data);
          setgetstatus(data);
          setStatusDisplay({
           id:id,
           display:true
          });
      })
    }else if(statusdisplay.display==true){
      setStatusDisplay({
        id:'',
        display:false
       });
    }
     
  }


  // OPEN MODAL FOR DELETING APPOINTMENT HISTORY
  const [openmodal, setOpenmodal] = React.useState(false);
  const handleClickOpenmodal = () => {
    setOpenmodal(true);};
  const handleClosemodal = () => {setOpenmodal(false);};
  const DeleteAppointment=(id)=>{
    // DeleteAppointmentHistory(id);
    console.log('Appointment Deleted Successfully\n',id);
    setOpenmodal(false);
  }
  const OpenDeleteAppointment=()=>{
    handleClickOpenmodal();
  }
  
  return (
    <div style={{marginTop:100,marginLeft:10,marginRight:10,marginBottom:50,}}>

    <TableContainer component={Paper}  style={{boxShadow:" rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"}}>
      <div className='py-4 px-4' style={{background:'rgb(243, 242, 239)'}}>
         <h1 style={{ color: '#02475b',fontSize: '21px',fontWeight: 500,lineHeight: '26px'}}>Upcoming Appointments</h1>
      </div>
      <div style={{background:'rgb(243, 242, 239)'}}>
        <Row className='mx-2' >
          {
            pending.map((row,index)=>(
              <Col lg="4" xs='12' key={index} >
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{'Are you sure want to delete with following details??'}</DialogTitle>
                  <DialogContent dividers>
                    <DialogContentText id="alert-dialog-description">
                     <div style={{width:'100%'}}>
                       <div className='my-4'>
                         <p><strong>Patient Name: </strong>{row.patient_name}</p>
                         <p><strong>Doctor Name: </strong>{row.doctor_name}</p>
                         <p><strong>Hospital Name: </strong>{row.hospital_name}</p>
                         <p><strong>Date of Appointment: </strong>{row.date_of_appointment}</p>
                         <p><strong>Booking Time: </strong>{row.time}</p>
                         <p><strong>Appointment Type: </strong>{row.appointment_type}</p>
                       </div>
                     </div>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary" variant='contained'>Cancel</Button>
                    <Button onClick={()=>DeletePending(row._id)} color="secondary" variant='contained' >Delete</Button>
                  </DialogActions>
                </Dialog>
              <Card className="my-3" variant="outlined" style={{boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px'}}>
                <CardContent style={{display:'flex',justifyContent:'space-around'}}>
                  <div>
                    <div>
                        {/* <Typography   component="h1" gutterBottom>Dr. {row.doctor_name}</Typography> */}
                        {/* <Typography  color="textSecondary" component="p">{row.hospital_name}</Typography> */}
                        <List>
                        <ListItem >
                          <ListItemText primary={`Dr.${row.doctor_name}`}  secondary={`${row.hospital_name}`} style={{marginTop:-10}}/>
                        </ListItem>
                        <ListItem>
                          <ListItemText primary='Appointment Date' secondary={row.date_of_appointment} style={{marginTop:-10}}/>
                        </ListItem>
                        </List>
                    </div>
                    <div  style={{display:'flex',justifyContent:'center'}}>
                    <Button variant='contained'  className='mx-3' onClick={()=>GetStatus(row._id)}
                     style={{borderRadius:20,fontSize:'12px',width:'90%',background:'green',color:"white"}}>Status</Button>
                    </div>
                  </div>
                  <div>
                    <div >
                      {
                        (statusdisplay.id==row._id)?
                          statusdisplay.display==false?
                         null
                          :
                          <div>
                            <h3>Current Status</h3>
                            <h4>{getstatus.status} / {getstatus.total}</h4>
                          </div>
                        :
                        <List>
                        <ListItem>
                          <ListItemText primary="Appointment Type" style={{marginTop:-10}} secondary={row.appointment_type} />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Visit Type" style={{marginTop:-10}}  secondary={row.appointment_type} />
                        </ListItem>
                      </List>

                      }
                   
                    <Button variant='contained' color='secondary' className='mx-3' onClick={()=>handleDeleteAppointment(row._id)}
                     style={{borderRadius:20,fontSize:'12px',width:'90%'}}>Delete</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Col>  
            ))
          }
        </Row>
      </div>
      <div className='py-4 px-4' style={{background:'rgb(243, 242, 239)'}} >
      <Divider style={{marginTop:10,marginBottom:50,color:'white'}}/>
       <h1 style={{ color: '#02475b',fontSize: '21px',fontWeight: 500,lineHeight: '26px'}}>Appointments History</h1>
      </div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{background:'blue',color:'white' ,
        boxShadow:" rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
        }}>
          <TableRow>
            <TableCell style={{color:'white'}} align="center">Serial No.</TableCell>
            <TableCell style={{color:'white'}} >Doctor Name</TableCell>
            <TableCell style={{color:'white'}} align="center">Hospital Name</TableCell>
            <TableCell style={{color:'white'}} align="center">Appointment Date</TableCell>
            <TableCell style={{color:'white'}} align="center">Booking Date</TableCell>
            <TableCell style={{color:'white'}} align="center">Visit Type</TableCell>
            <TableCell style={{color:'white'}} align="center">Appointment Type</TableCell>
            <TableCell style={{color:'white'}} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          history.map((row,index) => (
            <TableRow >
                <Dialog fullScreen
                  open={openmodal}
                  onClose={handleClosemodal}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  
                >
                <AppBar className={classes.appBar}>
                  <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClosemodal} aria-label="close">
                      <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>{row.patient_name}</Typography>
                  </Toolbar>
                </AppBar>
                  <DialogContent dividers style={{background:'rgb(243, 242, 239)'}}>
                    <Card className='p-3' elevation={6} style={{borderRadius:20}}>
                       <DialogContentText id="alert-dialog-description">
                        <div style={{width:'100%'}}>
                          <div className='my-4'>
                            <p><strong>Patient Name: </strong>{row.patient_name}</p>
                            <p><strong>Doctor Name: </strong>{row.doctor_name}</p>
                            <p><strong>Hospital Name: </strong>{row.hospital_name}</p>
                            <p><strong>Date of Appointment: </strong>{row.date_of_appointment}</p>
                            <p><strong>Booking Time: </strong>{row.time}</p>
                            <p><strong>Appointment Type: </strong>{row.appointment_type}</p>
                          </div>
                        </div>
                       </DialogContentText>
                    </Card>
                    <div>
                    {
                      row.checkup.map((data)=>(
                        <Row className='mt-4'>
                          <Col  lg='4' xs={12}>
                            <Card  variant="outlined" className='mt-4' style={{borderRadius:20}}>
                              <CardContent>
                                <h6 style={textStyle} className='text-center'>Symptoms</h6>
                                <div className='p-2'>
                                    <p style={{color: '#02475b'}} className='mt-3'>{data.symptoms}</p> 
                                </div>
                              </CardContent>
                            </Card>
                          </Col>
                          <Col  lg='4' xs={12}>
                            <Card  variant="outlined" className='mt-4' style={{borderRadius:20}}>
                              <CardContent>
                                <h6 style={textStyle} className='text-center'>Diagnosis</h6>
                                <div className='p-2'>
                                 <p style={{color: '#02475b'}} className='mt-3'>{data.diagnosis}</p> 
                                </div>
                              </CardContent>
                            </Card>
                          </Col>
                          <Col  lg='4' xs={12}>
                            <Card  variant="outlined" className='mt-4' style={{borderRadius:20}}>
                              <CardContent>
                                <h6 style={textStyle} className='text-center'>Prescription</h6>
                                <div className='p-2'>
                                    <p style={{color: '#02475b'}} className='mt-3'>{data.prescription}</p> 
                                </div>
                              </CardContent>
                            </Card>
                          </Col>
                        </Row>
                      ))
                    }
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClosemodal} color="primary" variant='contained'>Cancel</Button>
                    <Button onClick={()=>DeleteAppointment(row._id)} color="secondary" variant='contained' >Delete</Button>
                  </DialogActions>
                </Dialog>


               <TableCell align="center" >{index+1}</TableCell>
              <TableCell align="left" style={textStyle}>Dr. {row.doctor_name}</TableCell>
              <TableCell align="center">{row.hospital_name}</TableCell>
              <TableCell align="center">{row.date_of_appointment}</TableCell>
              <TableCell align="center">{row.time}</TableCell>
              <TableCell align="center" >{
                row.appointment_type=='Offline'?
                <div style={{padding:'5px 10px',borderRadius:'20px',color:'red',fontWeight:500,
                boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',width:'100%',textAlign:'center',float:'right'}}>New</div>
                :
                <div style={{padding:'5px 10px',borderRadius:'20px',
                boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',width:'100%',textAlign:'center',float:'right'}}>Repeat</div>
                }
              </TableCell>
              <TableCell align="center" >{
                row.appointment_type=='Offline'?
                <span style={{background:'green',padding:'5px 10px',borderRadius:'20px',
                boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',color:'white'}}>{row.appointment_type}</span>
                :
                <span style={{background:'red',padding:'5px 10px',borderRadius:'20px',
                boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',color:'white'}}>{row.appointment_type}</span>
                }
              </TableCell>
              <TableCell align="center">
                <Tooltip title="View Details">
                  <IconButton aria-label="filter list" onClick={()=>OpenDeleteAppointment(row._id)}>
                     <DashboardIcon className='text-success'/>
                  </IconButton>
                </Tooltip>              
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}








