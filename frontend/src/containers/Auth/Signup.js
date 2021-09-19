import React,{useState} from 'react';
import Footer from '../../components/Footer';

import { NavLink } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import { useHistory } from "react-router-dom";

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

import {register} from '../../actions/authactions';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';


function Signup({ auth, register }) {

  const { isAuthenticated, user, token } = auth;

  let history = useHistory();

  const [repeatpassword, setRepeatpassword] = useState('');
  // const [Category, setCategory] = useState(null);

  
  const [formData, setFormData] = useState({
    email: '',
    password:'',
    category:''
  });

  const {email,password,category } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

   const handleSubmit=()=>{
      const userData={email,password,category};
      console.log(userData);
      register(userData);
      // Register(userData);
   }

   console.log("Auth Redux User = " ,user)

   if (isAuthenticated)
   return <Redirect to='/login' />;

  return (
    <div style={{marginTop:150}}>
      <Container>
          <Row>
              <Col lg='7' xs='12'></Col>
              <Col lg='5' xs='12'>
                <div className='text-center'>
                  <h2>Welcome Back!</h2>
                  <p>Glad to see you here again</p>
                </div>
                  <div>
                        <Form.Group controlId="formBasicEmail" className='my-2'>
                          <Form.Label>Email address</Form.Label>
                          <Form.Control type="email" placeholder="Enter email" 
                             value={email}  name='email'      onChange={e => onChange(e)}/>
                          <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                          </Form.Text>
                        </Form.Group>
                      
                        <Form.Group controlId="formBasicPassword" className='my-2'>
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" 
                          value={password} name='password'      onChange={e => onChange(e)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword2" className='my-2'>
                          <Form.Label>Repeat Password</Form.Label>
                          <Form.Control type="password" placeholder="Repeat Password" 
                          value={repeatpassword}    onChange={(e)=>setRepeatpassword(e.target.value)}/>
                        </Form.Group>

                        <Form.Group  className='my-2'>
                         <Form.Label>Choose your category</Form.Label>
                         <div style={{display:'flex',justifyContent:'space-around'}}>
                           <Form.Check
                             type="radio"
                             label="Patient"
                             name="category"
                             id="formHorizontalRadios1"
                             value='patient'
                             onChange={e => onChange(e)}
                            //  onChange={(e)=>setCategory(e.target.value)}
                           />
                           <Form.Check
                             type="radio"
                             label="Doctor"
                             name="category"
                             id="formHorizontalRadios2"
                             value='doctor'
                             onChange={e => onChange(e)}
                            //  onChange={(e)=>setCategory(e.target.value)}
                           />
                         </div>
                       </Form.Group>

                        <Button variant="contained" color="primary" onClick={handleSubmit} className='my-4'>
                          Submit
                        </Button>
                  </div>
              </Col>
          </Row>
      </Container>
      <Divider style={{background:'gray',marginTop:100}}/>
      <Footer/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  // isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register})(Signup);
