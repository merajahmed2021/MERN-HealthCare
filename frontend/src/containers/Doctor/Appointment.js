import React,{useEffect,useState} from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import Speech from 'react-speech';
import {GetTodayAppointments} from '../../actions/doctor';
import { PDFDownloadLink,Document, Page,Text  } from "@react-pdf/renderer";
import { PdfDocument } from "./pdfTemplate/Appointment";


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

import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable() {
  
  const classes = useStyles();

  const [patient, setpatient] = useState([])
  // console.log(patient);
  const [appointmentDetails, setDetails] = useState([]);
  const [show, setHide] = useState(false)

  useEffect(() => {
    GetTodayAppointments().then((res)=>{
      console.log(res);
      setpatient(res);
      setDetails(res);
      setHide(true); 
    })
  }, [])


  const handleCallnow=(name,address)=>{
    console.log({"Name":name,"Address":address});

  }

  
  const textStyle={
    color: '#02475b',fontSize: '16px',fontWeight: 500,lineHeight: '21px'
  }



  
  return (
    <div style={{marginTop:100,marginLeft:10,marginRight:10}}>
    <TableContainer component={Paper}  style={{boxShadow:" rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"}}>
      <div className='py-4 px-4' style={{display:'flex',justifyContent:'space-between'}}>
         <h1 style={{ color: '#02475b',fontSize: '21px',fontWeight: 500,lineHeight: '26px'}}>Today Upcoming Appointment </h1>
         {show &&<PDFDownloadLink
            document={<PdfDocument data={appointmentDetails} />}
            fileName="Appointment.pdf"
            onLoadError={(error) => alert('Error while loading document! ' + error.message)}
            style={{
              textDecoration: "none",
              padding: "10px",
              color: "white",
              backgroundColor: "#f50057",
              borderRadius:10,
              marginRight:5
             //  border: "1px solid #4a4a4a"
            }}
          >
            {
            ({ blob, url, loading, error }) =>(
              loading ? "Loading document..." : "Download PDF"
            )
            }
          </PDFDownloadLink>}
      </div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{background:'blue',color:'white' ,
        boxShadow:" rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
        }}>
          <TableRow>
            <TableCell style={{color:'white'}} align="center">Serial No.</TableCell>
            <TableCell style={{color:'white'}}>Patient Name</TableCell>
            <TableCell style={{color:'white'}} align="center">Gender</TableCell>
            <TableCell style={{color:'white'}} align="center">Patient Email</TableCell>
            <TableCell style={{color:'white'}} align="center">Mobile Number</TableCell>
            <TableCell style={{color:'white'}} align="center">Blood Group</TableCell>
            <TableCell style={{color:'white'}} align="center">Visit Type</TableCell>
            <TableCell style={{color:'white'}} align="center">Appointment Type</TableCell>
            <TableCell style={{color:'white'}} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          patient.map((row,index) => (
            <TableRow key={row._id}>
               <TableCell align="center">{index+1}</TableCell>
              <TableCell align="left" style={textStyle}>{row.patient_name}</TableCell>
              <TableCell align="center">{row.gender}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.mobileno}</TableCell>
              <TableCell align="center">{row.blood_group}</TableCell>
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
              <TableCell align="center" style={{display:'flex'}}>
                <Tooltip title="View Profile">
                  <NavLink to={`/doctor_patient_profile/${row._id}`}>
                      <IconButton aria-label="filter list">
                        <AccountCircleIcon className='text-success'/>
                      </IconButton>
                  </NavLink>
                </Tooltip>
                <Tooltip title="Call Now">
                  <Speech text={row.patient_name+"from"+row.address} 
                        //  pitch="0.5"
                         rate="0.9"
                        //  volume="0.1"
                        //  lang="en-GB"
                        //  voice="Google UK English Male"
                        // displayText="Call" 
                        // textAsButton={true}
                         voice="Google UK English Female"
                  />
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









{/* <Tooltip title="View Profile"> */}
{/* <NavLink to='/doctor_patient_profile'> */}
    {/* <IconButton aria-label="filter list"> */}
      {/* <AccountCircleIcon className='text-success'/> */}
    {/* </IconButton> */}
{/* </NavLink> */}
{/* </Tooltip> */}
{/* <Tooltip title="Edit"> */}
{/* <NavLink to='/doctor_patient_edit'> */}
  {/* <IconButton aria-label="filter list"> */}
    {/* <EditIcon className='text-primary'/> */}
  {/* </IconButton> */}
{/* </NavLink> */}
{/* </Tooltip> */}