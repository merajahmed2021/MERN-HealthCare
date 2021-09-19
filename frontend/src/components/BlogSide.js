import React from 'react';

import {
    Col,
    Row,
    Container,
    InputGroup,
    FormControl,
    Button,
  } from "react-bootstrap";
  import Divider from "@material-ui/core/Divider";
  
  import List from "@material-ui/core/List";
  import ListItem from "@material-ui/core/ListItem";
  import ListItemIcon from "@material-ui/core/ListItemIcon";
  import ListItemText from "@material-ui/core/ListItemText";
  import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

export default function BlogSide() {
    return (
        <div>
                          <h5>SEARCH</h5>
              <div style={{ marginTop: 50, marginBottom: 50 }}>
                <div>
                  <InputGroup className="mb-3">
                    <FormControl    placeholder="Recipient's username"    />
                    <InputGroup.Append>
                      <Button variant="outline-secondary">Search</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div>
                  <Divider />
                </div>
              </div>
              <div style={{marginTop:50,marginBottom:50}}>
              <h5>CATEGORIES</h5>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem>
                  <ListItemText primary="Covid"  />
                  <ListItemSecondaryAction>15</ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Health"  />
                  <ListItemSecondaryAction>15</ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Fitness"  />
                  <ListItemSecondaryAction>15</ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </List>
              </div>
              <div style={{marginTop:50,marginBottom:50}}>
              <h5>RECENT POSTS</h5>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem>
                  <ListItemIcon className='mx-2'>
                      <img src='https://image.freepik.com/free-vector/spot-light-background_1284-4685.jpg' style={{width:60,height:60}}></img>
                  </ListItemIcon>
                  <ListItemText 
                     primary={<p style={{color: '#02475b',fontSize:'12px',lineHeight:'16px'}}>
                       69 Halsey St, New York, Ny 10002, United States
                     </p>} />
                </ListItem>
                <Divider  component="li"/>
                <ListItem>
                  <ListItemIcon className='mx-2'>
                      <img src='https://image.freepik.com/free-vector/realistic-3d-shapes-floating-background_52683-60497.jpg' style={{width:60,height:60}}></img>
                  </ListItemIcon>
                  <ListItemText 
                   primary={<p style={{color: '#02475b',fontSize:'12px',lineHeight:'16px'}}>
                   69 Halsey St, New York, Ny 10002, United States
                 </p>} />
                  />
                </ListItem>
                <Divider  component="li"/>
                <ListItem>
                  <ListItemIcon className='mx-2'>
                      <img src='https://image.freepik.com/free-vector/3d-effect-abstract-textured-models-background_52683-29878.jpg' style={{width:60,height:60}}></img>
                  </ListItemIcon>
                  <ListItemText 
                     primary={<p style={{color: '#02475b',fontSize:'12px',lineHeight:'16px'}}>
                     69 Halsey St, New York, Ny 10002, United States
                   </p>} />
                  
                </ListItem>
                <Divider  component="li"/>
              </List>
              </div>
        </div>
    )
}
