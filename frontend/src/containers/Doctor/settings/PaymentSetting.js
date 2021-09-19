import React,{useState,useEffect} from 'react';
import { NavLink} from 'react-router-dom';
import {GetDoctorSetting} from "../../../actions/settings";
import {CreateDoctorBank,GetDoctorPayment} from "../../../actions/payment";



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

  import Typography from "@material-ui/core/Typography";

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Fab from "@material-ui/core/Fab";
import Collapse from "@material-ui/core/Collapse";
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";

// import Skeleton from '@material-ui/lab/Skeleton';
// import Stack from    '@material-ui/lab/Stack';

import Skeleton from '@material-ui/lab/Skeleton';



import Snackbar from '@material-ui/core/Snackbar';
// import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
// import Divider from "@material-ui/core/Divider";



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});




function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function EditProfile() {
  
  const classes = useStyles();
  
  const [education, seteducation] = useState([]);
  console.log(education);
  
  const [loading, setLoading] = React.useState(true);
  const [online, setOnline] = React.useState(false);
  const [payment, setPayment] = React.useState([]);

  console.log("PAYMENT MODE = ",online);


  useEffect(() => {
    GetDoctorSetting().then((data)=>{
      setLoading(false);
      seteducation(data);
      setOnline(data.payment_mode);
    });
    GetDoctorPayment().then((data)=>{
      console.log("PAYMENT = ",data);
      setPayment(data);
    })
  }, [])
  


  
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };
  

    const [formData, setFormData] = useState({
      beneficiary_name:'' ,
      accountno:'',
      re_account:'',
      ifsc_code:'',
    });
    const {beneficiary_name,accountno,re_account,ifsc_code} = formData;  
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
      
    // const [image ,setimage]=useState(null);
    // const handleImageChange = (e) => {
    //   setimage(e.target.files[0])
    // };
  
  

    const   handleCreate=()=>{
    const accountdata={beneficiary_name,accountno,ifsc_code};
    console.log(accountdata);
    CreateDoctorBank(accountdata).then(()=>{
      setOpenSuccess(true);
    });
   }







  const [openForm, setopenForm] = React.useState(false);  
  const handleChangeForm = () => {
    setopenForm((prev) => !prev);
  };


    return (
        <div>
            <div style={{marginTop:-20}}>
              <Grid container>
                {
                  loading?
                    <Grid container>
                     <Grid lg='4' xs={12}>
                       <Skeleton variant="rect" width={400} height={300} style={{marginTop:20}} />
                     </Grid>
                     <Grid lg='4' xs={12}>
                       <Skeleton variant="rect" width={400} height={300} style={{marginTop:20}} />
                     </Grid>
                     <Grid lg='4' xs={12}>
                       <Skeleton variant="rect" width={400} height={300} style={{marginTop:20}} />
                     </Grid>
                  </Grid>
                  :
                  <div style={{width:'100%'}}>
                    {
                        openForm && online?
                        <div style={{width:'100%'}}>
                           <Card  elevation={6} className='ml-2 my-4' style={{background:'rgb(243, 242, 239)',width:'100%'}}>
                            <Card variant="outlined" className='py-4' style={{background:'darkviolet',color:'white'}}>
                                <h5 className='mx-4'>Bank Details</h5>
                            </Card>
                          <div>
                            <Card variant="outlined" className='py-3' style={{background:'rgb(243, 242, 239)'}}>
                            <div className='mx-4'>
                                  <Row>
                                      <Col  lg='6' xs={12}>
                                         <Form.Group controlId="fname" className="my-4">
                                           <Form.Label>Beneficiary Name</Form.Label>
                                           <Form.Control type="text" placeholder="Beneficiary Name*" 
                                           value={beneficiary_name}
                                           name='beneficiary_name'  
                                           onChange={e => onChange(e)}
                                         />
                                         </Form.Group>
                                         <Form.Group controlId="lname" className="my-4">
                                           <Form.Label>Branch IFSC Code</Form.Label>
                                           <Form.Control type="text" placeholder="Branch IFSC Code*" 
                                            value={ifsc_code}
                                            name='ifsc_code' onChange={e => onChange(e)}/>
                                         </Form.Group>
                                      </Col>
                                      <Col lg='6' xs={12}>
                                         <Form.Group controlId="bdetails" className="my-4">
                                           <Form.Label>Account Number</Form.Label>
                                           <Form.Control type="text" placeholder="Account Number*" 
                                           name='accountno' value={accountno} 
                                           onChange={e => onChange(e)}/>
                                         </Form.Group>
                                         <Form.Group controlId="bdetails" className="my-4">
                                           <Form.Label>Re-enter Account Number</Form.Label>
                                           <Form.Control type="text" placeholder="Re-enter Account Number*" 
                                           name='re_account' value={re_account} 
                                           onChange={e => onChange(e)}/>
                                         </Form.Group>
                                      </Col>
                                  </Row>
                                  <Row>
                                      <Col lg='6' xs={12}>
                                        <Button className='my-3' variant='contained' color='secondary'>Upload Aadhar Card</Button>
                                      </Col>
                                      <Col lg='6' xs={12}>
                                        <Button className='my-3' variant='contained' color='secondary'>Upload PAN Card</Button>
                                      </Col>
                                  </Row>
                                  <div style={{display:'flex',justifyContent:'space-around'}}>
                                  </div>
                                </div>                                 
                            </Card>
                            <Card variant='outlined' style={{background:'rgb(243, 242, 239)'}}>
                                <div className='mx-4'>
                                   <Button variant='contained' color='primary' className='my-4' 
                                   style={{float:'right'}} onClick={handleCreate}>Save</Button>
                                </div>
                            </Card>
                         </div>
                      </Card>                 
                        </div>
                        :
                        null
                    }
                    {
                        online?
                        <div style={{width:'100%',marginTop:50}}>
                             <TableContainer component={Paper}  style={{boxShadow:" rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"}}>
                             <div className='py-4 px-4'>
                                <h1 style={{ color: 'darkviolet',fontSize: '21px',fontWeight: 500,lineHeight: '26px'}}>Payment List</h1>
                             </div>
                             <Table className={classes.table} aria-label="simple table">
                               <TableHead style={{background:'darkviolet',color:'white' ,
                               boxShadow:" rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
                               }}>
                                 <TableRow>
                                   <TableCell style={{color:'white'}} align="center">Serial No.</TableCell>
                                   <TableCell style={{color:'white'}} align="center">Email</TableCell>
                                   <TableCell style={{color:'white'}} align="center">Date of Appointment</TableCell>
                                   <TableCell style={{color:'white'}} align="center">Date of Payment</TableCell>
                                   <TableCell style={{color:'white'}} align="center">Order Id</TableCell>
                                   <TableCell style={{color:'white'}} align="center">Payment Id</TableCell>
                                 </TableRow>
                               </TableHead>
                               <TableBody>
                                 {
                                 payment.map((row,index) => (
                                   <TableRow key={row._id}>
                                     <TableCell align="center">{index+1}</TableCell>
                                     <TableCell align="center">{row.email}</TableCell>
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
                        :
                        <div style={{height:'50vh',display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
                          <div style={{width:'100%'}}>
                            <h3 style={{textAlign:'center'}}>Please allow Online Payment Mode from Account Settings.</h3>
                          </div>
                        </div>
                    }
                  </div>
                }
              </Grid>{/* CONTAINER GRID FINISHED */}
            </div>
            {
                online?
                <Tooltip title="Add Bank Details">
                    <Fab
                      color="primary"
                      aria-label="add"
                      style={{
                        margin: 0,
                        top: "auto",
                        right: 20,
                        bottom: 20,
                        left: "auto",
                        position: "fixed",
                      }}
                      onClick={handleChangeForm}
                    >
                      {openForm == false ? <AddIcon /> : <ClearIcon />}
                    </Fab>
                </Tooltip>
                :
                null
            }
           

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
                 Bank Details Updated Successfully.
               </Alert>
           </Snackbar>
        </div>
    )
}


