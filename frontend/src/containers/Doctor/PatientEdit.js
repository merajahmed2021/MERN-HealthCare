import React from 'react';
import {
    Col,
    Row,
    Container,
    InputGroup,
    FormControl,Form,
    ListGroup,Card,
  } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function PatientEdit() {
    return (
        <div style={{marginTop:100}} className='mx-4'>
                     <div className='my-2'>
            <Card elevation={4} variant='outlined'>
            <h4 className='my-4 mx-4'>Add Patient</h4>
            <Row className='mx-2'>
            <Col lg='4' xs={12}>
               <Form.Group controlId="formBasicPassword" className='my-4'>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name*" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className='my-4'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name*" />
              </Form.Group>
              <Form.Group controlId="address" className='my-4'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text"  placeholder="Address*" />
              </Form.Group>
            </Col>
            <Col lg='4' xs={12}>
              <Form.Group controlId="formBasicPassword" className='my-4'>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text"  placeholder="Email*" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className='my-4'>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text"  placeholder="Phone Number*" />
              </Form.Group>
              <Form.Group className='my-4'>
                <Form.Label>Blood Group</Form.Label>
                  <Form.Control as="select" >
                    <option>Large select</option>
                    <option>Large select</option>
                    <option>Large select</option>
                    <option>Large select</option>
                    <option>Large select</option>
                    <option>Large select</option>
                    <option>Large select</option>
                    <option>Large select</option>
                  </Form.Control>
                </Form.Group>
            </Col>
            <Col lg='4' xs={12}>
              
                <Form.Group  className='my-4'>
                  <Form.Label>Gender</Form.Label>
                 <div style={{display:'flex',justifyContent:'space-around'}}>
                   <Form.Check
                     type="radio"
                     label="Male"
                     name="category"
                     id="formHorizontalRadios1"
                     value='male'
                    //  onChange={(e)=>setCategory(e.target.value)}
                   />
                   <Form.Check
                     type="radio"
                     label="Female"
                     name="category"
                     id="formHorizontalRadios2"
                     value='female'
                    //  onChange={(e)=>setCategory(e.target.value)}
                   />
                  <Form.Check
                     type="radio"
                     label="Other"
                     name="category"
                     id="formHorizontalRadios2"
                     value='other'
                    //  onChange={(e)=>setCategory(e.target.value)}
                   />
                 </div>
              </Form.Group>
              <Form.Group>
                  <Form.File id="exampleFormControlFile1" label="Upload Profile Image" />
              </Form.Group>
              <TextField
                id="date"
                label="Date of Birth"
                type="date"
                defaultValue="2017-05-24"
                className='my-4'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div>
              </div>
              <Button variant="contained" className='my-4' color="primary" style={{float:'right'}}>Save</Button>
            </Col>
          </Row>
            </Card>

          </div>
        </div>
    )
}
