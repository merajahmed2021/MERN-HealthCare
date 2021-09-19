import React from 'react';
import { NavLink } from 'react-router-dom';
import {logout} from '../../actions/authactions';
import { connect } from 'react-redux';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import DashboardIcon from '@material-ui/icons/Dashboard';
import { Row } from 'react-bootstrap';

const list = [
  {
    id: 1,
    name: "Dashboard",
    icon: "fas fa-home",
    url: "/doctor_home",
  },
  {
    id: 2,
    name: "Appointments",
    icon: "fas fa-users",
    url: "/appointments",
  },
  {
    id: 3,
    name: "Patients",
    icon: "fas fa-wheelchair",
    url: "/patients_list",
  },
  {
    id: 4,
    name: "Blogs",
    icon: "fas fa-edit",
    url: "/doctor_blogs",
  },
  {
    id: 5,
    name: "Settings",
    icon: "fas fa-user-cog",
    url: "/doctor_settings",
  },
  {
    id: 6,
    name: "Edit Profile",
    icon: "fas fa-user-edit",
    url: "/doctor_edit_profile",
  },
];

const listStyle={
  textDecoration:'none',
  color:'white'
}

function Navigation({logout}) {
  
  const handlelogout=()=>{
    console.log(localStorage.getItem('token'));
    logout();
  }

  return (
    <div style={{marginTop:150}}>
        <React.Fragment>
              <List>
               {list.map((text, index) => (
                 <NavLink to={text.url}  style={listStyle}>
                  <ListItem button >
                    <ListItemIcon>
                    <i
                        class={text.icon}
                        style={{
                          fontSize: 25,
                          color: "white",
                          margin: 10,
                          alignSelf: "center",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={text.name} />
                  </ListItem>
                 </NavLink>
                ))}
                <NavLink to='/login' style={listStyle}>
                  <ListItem button onClick={handlelogout}>
                  <i
                        class='	fas fa-power-off'
                        style={{
                          fontSize: 25,
                          color: "white",
                          margin: 10,
                          alignSelf: "center",
                        }}
                      />
                    <ListItemText primary='Logout' />
                  </ListItem>
                </NavLink>
              </List>
        </React.Fragment>
    </div>
  );
}


export default connect(null, { logout })(Navigation);
