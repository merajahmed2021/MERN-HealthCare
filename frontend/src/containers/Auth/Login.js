import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import Footer from '../../components/Footer';

import {
  Col,
  Row,
  Container,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";

import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";


import {userlogin} from '../../actions/authactions';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';


function Login({ auth, userlogin}) {

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


  return (
    <div style={{height:'100vh',overflow:'hidden',
    // background:'darkviolet'
    // background:" linear-gradient(90deg, rgba(99,8,138,1) 8%, rgba(129,15,189,0.773546918767507) 41%, rgba(146,72,204,0.4066001400560224) 73%)"

    }}>
      <div style={{
        // background:'darkviolet',
      // height:'100vh',color:'white',
      display:'flex',justifyContent:'center',alignItems:'center',marginTop:100}}>
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
      </Container>
      </div>
      {/* <Divider style={{background:'gray',marginTop:100}}/> */}
      {/* <Footer/> */}
    </div>
  );
}


const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { userlogin })(Login);
