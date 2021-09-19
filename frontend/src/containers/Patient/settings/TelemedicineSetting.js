import React from 'react';
import '../style.css';
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



export default function Telemedicine() {

    return (
        <div>
            {/* <Container> */}
                <Row>
                    <Col lg='6' xs={12} className='my-4'>
                    <Card  elevation={6} className='ml-2' style={{margin:'0px 10px',background:'rgb(243, 242, 239)'}}>
                            <Card variant="outlined" className='py-4' style={{background:'darkviolet',color:'white'}}>
                                <h5 className='mx-4'>Password Reset</h5>
                            </Card>
                          <div>
                            <Card variant="outlined" className='py-3' style={{background:'rgb(243, 242, 239)'}}>
                                <div className='mx-4'>
                                   <Form>
                                      <Form.Group controlId="formBasicEmail" className='my-4'>
                                        <Form.Label>API key</Form.Label>
                                        <Form.Control type="email" placeholder="Enter api key" />
                                        <Form.Text className="text-muted">
                                          We'll never share your email with anyone else.
                                        </Form.Text>
                                      </Form.Group>
                                      <Form.Group controlId="formBasicPassword" className='my-4'>
                                        <Form.Label>API secret</Form.Label>
                                        <Form.Control type="text" placeholder="Enter api secret" />
                                      </Form.Group>
                                   </Form>
                                </div>
                            </Card>
                            <Card variant='outlined' style={{background:'rgb(243, 242, 239)'}}>
                                <div className='mx-4'>
                                   <Button variant='contained' color='primary' className='my-4' 
                                   style={{float:'right'}} >Save</Button>
                                </div>
                            </Card>
                         </div>
                      </Card>
                    </Col>
                    <Col lg='6' xs={12} className='my-4'>
                      <Card elevation={6} className='ml-2' style={{margin:'0px 10px',background:'rgb(243, 242, 239)'}}>
                          <Card variant="outlined" className='py-4' style={{background:'darkviolet',color:'white'}}>
                             <h5 className='mx-4'>Zoom configuration guide</h5>
                          </Card>
                           <ListGroup variant="flush" style={{color:'#525f7f',fontSize:'0.9rem'}}>
                            <ListGroup.Item className="py-3">Step 1 : Sign up or Sign in here : <a href='#'>Zoom market Place portal.</a></ListGroup.Item>
                            <ListGroup.Item className="py-3">Step 2 : Click/Hover on Develop button at the right in navigation bar and click on build app Create app</ListGroup.Item>
                            <ListGroup.Item className="py-3">Step 3 : Choose your app type to JWT</ListGroup.Item>
                            <ListGroup.Item className="py-3">Step 4 : Fill the mandatory information and In the App credentials tag you can see API key and API Secret.</ListGroup.Item>
                            <ListGroup.Item className="py-3">Step 5 : Copy and Paste API key and API secret here and click on save button and you are ready to go.</ListGroup.Item>
                          </ListGroup>
                      </Card>
                    </Col>
                </Row>
            {/* </Container> */}
            
        </div>
    )
}

