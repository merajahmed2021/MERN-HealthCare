import React from "react";
import Footer from "../../components/Footer";
import {
   Col,
   Row,
   Container,
   InputGroup,
   FormControl,
   Button,
   Form
 } from "react-bootstrap";


const Contact = () => {
  return (
    <div>
      <div
        style={{ paddingTop: "20vh", background: "#ddd",paddingBottom: "15vh",  }}
      >
        <h1 className='text-center' style={{ marginTop: 20, paddingBottom: 80 }}>
          <span className="text-danger">We Always Ready</span> To Help Your
        </h1>
        <div style={{ paddingTop: 50, paddingBottom: 50 }}>
          <form noValidate autoComplete="off">
             <Container>
               <Row>
                  <Col>
                   <Form.Group controlId="formBasicEmail">
                     <Form.Label>Your Name</Form.Label>
                     <Form.Control type="email" placeholder="Name" />
                   </Form.Group>
                  </Col>
                  <Col>
                   <Form.Group controlId="formBasicEmail">
                     <Form.Label>Email address</Form.Label>
                     <Form.Control type="email" placeholder="Email" />
                   </Form.Group>
                  </Col>
                  <Col>
                   <Form.Group controlId="formBasicEmail">
                     <Form.Label>Subject </Form.Label>
                     <Form.Control type="email" placeholder="Subject" />
                   </Form.Group>
                  </Col>
                  <Form.Group controlId="exampleForm.ControlTextarea1" className='mt-5'>
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={5}  placeholder="Write something here..." />
                  </Form.Group>
                  <Button variant="primary" type="submit" style={{marginTop:80,padding:20,borderRadius:50}}>
                     Submit
                   </Button>
               </Row>               
             </Container>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Contact;
