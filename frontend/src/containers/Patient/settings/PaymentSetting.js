import React,{useEffect,useState} from 'react';
import '../style.css';
import { NavLink } from 'react-router-dom';
import Speech from 'react-speech';

import {GetUserPayment} from '../../../actions/payment';

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


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable() {
  
  const classes = useStyles();

  const [payment, setPayment] = useState([])
  // console.log(patient);

  useEffect(() => {
    GetUserPayment().then((res)=>{
      console.log(res);
      setPayment(res);
    })
  }, [])



  
  const textStyle={
    color: '#02475b',fontSize: '16px',fontWeight: 500,lineHeight: '21px'
  }



  
  return (
    <div style={{marginLeft:10,marginRight:10,background:'rgb(243, 242, 239)',marginBottom:100}}>
    <TableContainer component={Paper}  style={{boxShadow:" rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"}}>
      <div className='py-4 px-4' >
         <h1 style={{ color: 'darkviolet',fontSize: '21px',fontWeight: 500,lineHeight: '26px'}}>
           Payments List</h1>
      </div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{background:'darkviolet',color:'white' ,
        boxShadow:" rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
        }}>
          <TableRow>
            <TableCell style={{color:'white'}} align="center">Serial No.</TableCell>
            <TableCell style={{color:'white'}} align="center">Doctor Name</TableCell>
            <TableCell style={{color:'white'}} align="center">Hospital Name</TableCell>
            <TableCell style={{color:'white'}} align="center">Date of Appointment</TableCell>
            <TableCell style={{color:'white'}} align="center">Payment Time</TableCell>
            <TableCell style={{color:'white'}} align="center">Order Id</TableCell>
            <TableCell style={{color:'white'}} align="center">Payment Id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          payment.map((row,index) => (
            <TableRow key={row._id}>
               <TableCell align="center">{index+1}</TableCell>
              <TableCell align="center">Dr. {row.doctor_name}</TableCell>
              <TableCell align="center">{row.hospital_name}</TableCell>
              <TableCell align="center">{row.date_of_appointment}</TableCell>
              <TableCell align="center">{row.time}</TableCell>
              <TableCell align="center">{row.orderId}</TableCell>
              <TableCell align="center">{row.paymentId}</TableCell>
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