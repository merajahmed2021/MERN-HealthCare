import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import Footer from '../../components/Footer';

import {  Col,  Row,  Container,  InputGroup,  FormControl,  Form,} from "react-bootstrap";

import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {userlogin} from '../../actions/authactions';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';


function Login({ auth, userlogin}) {
  
  const [open, setOpen] = React.useState(false);

  const { isAuthenticated, user,authCategory} = auth;
  
  console.log("LOGIN USER = ",user);
  
  const [formData, setFormData] = useState({
    email: '',
    password:'',
    category:''
  });
  
  const {email,password,category } = formData;
  
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit=()=>{
    console.log(email,password,category);    
    const userData={email,password,category};
    userlogin(userData);
    if(!isAuthenticated){
      console.log("SOme Thing Wrong");
      setOpen(true);
    }
  
 }

//  console.log("Auth Redux User = " ,user)

  if(isAuthenticated){
    if (authCategory=='patient'){
      return <Redirect to='/patient_home' />;
    }
    else if(authCategory=='doctor'){
      return <Redirect to='/doctor_home' />;
    }
  }


  // const handleClick = () => {
    // setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  return (
    <div style={{height:'100vh',overflow:'hidden'}}>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:100}}>
      <Container>
          <Row>
              <Col lg='7' xs='12'></Col>
              <Col lg='5' xs='12'>
                <div className='text-center mt-4'>
                  <h1>Welcome Back!</h1>
                  <p>Glad to see you here again</p>
                </div>
                  <div>
                      <Form>
                        <Form.Group controlId="formBasicEmail" className='my-4'>
                          <Form.Label>Email address</Form.Label>
                          <Form.Control type="email" placeholder="Enter email" 
                           value={email}  name='email' onChange={e => onChange(e)} />
                          <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                          </Form.Text>
                        </Form.Group>
                      
                        <Form.Group controlId="formBasicPassword" className='my-4'>
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" 
                            value={password} name='password'   onChange={e => onChange(e)} />
                        </Form.Group>

                        <Form.Group as={Row} className='my-3'>
                         <Form.Label  row sm={2}>
                         Choose your category
                         </Form.Label>
                         <div style={{display:'flex',justifyContent:'space-around'}}>
                           <Form.Check
                             type="radio"
                             label="Patient"
                             name="category"
                             id="formHorizontalRadios1"
                             value='patient'
                             onChange={e => onChange(e)}
                           />
                           <Form.Check
                             type="radio"
                             label="Doctor"
                             name="category"
                             id="formHorizontalRadios2"
                             value='doctor'
                             onChange={e => onChange(e)}
                           />
                         </div>
                       </Form.Group>

                        <Button variant="contained" color="primary" onClick={handleSubmit} className='my-4'>
                          Submit
                        </Button>
                      </Form>
                  </div>
              </Col>
          </Row>
          <Snackbar
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Something Went Wrong . Try Again ."
        action={<IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>}
        horizontal="left"
      >
        
      </Snackbar>
      </Container>
      </div>
     
    </div>
  );
}


const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { userlogin })(Login);
