import React from "react";
import './style.css';
import {
  Col,
  Row,
  Container,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import Grid from '@material-ui/core/Grid';


export default function Footer() {
  return (
    <div id='footer'>
      <Container>
        <Row>
          <Col xs='12' lg='4'>
             <h5>Hospital World</h5>
              <div style={{marginTop:50,marginBottom:50}}>
              <div>
                  <p>Sed elit quam, iaculis sed semper sit amet udin vitae nibh at magna akal semperFusce.</p>
              </div>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem >
                  {/* <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon> */}
                  <ListItemText primary="Aligarh Muslim University , Aligarh ,Uttar Pradesh" />
                </ListItem>
                <Divider />
                <ListItem>
                  {/* <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon> */}
                  <ListItemText primary="hello@yourdomain.com" />
                </ListItem>
                <ListItem>
                  {/* <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon> */}
                  <ListItemText primary="(0091) 8547 632521" />
                </ListItem>
              </List>
              <Divider />
            </div>
          </Col>
          <Col xs='12' lg='4'>
            <h5>Quick Links</h5>
            <div style={{marginTop:50,marginBottom:50}}>
              <p>Home</p>
              <p>Blogs</p>
              <p>Services</p>
              <p>Login</p>
              <p>SignUp</p>
            </div>
          </Col>
          <Col xs='12' lg='4'>
            <h5>NEWSLETTER</h5>
            <div style={{marginTop:50,marginBottom:50}}>
              <p>  Sign up for our mailing list to get latest updates and offers.</p>
              <div>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Enter email*"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Append>
                    <Button className='bg-danger'>Subscribe</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
              <div>
              <Divider />
              <Grid style={{marginTop:'10vh'}}>
                   <a href="#"><LinkedInIcon   style={{marginLeft:'5%',fontSize:40,color:'white'}}/></a>
                   <a href="#"><FacebookIcon   style={{marginLeft:'5%',fontSize:40,color:'white'}}/></a>
                   <a href="#"><InstagramIcon  style={{marginLeft:'5%',fontSize:40,color:'white'}}/></a>
                   <a href="#"><TwitterIcon    style={{marginLeft:'5%',fontSize:40,color:'white'}}/></a>
                </Grid>
              </div>
            </div>
          </Col>
        </Row>
        <Divider />
        <div className='py-5'>
            <p className='text-center'>@merajahmed.com</p>
        </div>
      </Container>
    </div>
  );
}
