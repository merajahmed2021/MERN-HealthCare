import React from 'react';
// import {logout} from '../../actions/auth';
import {logout} from '../../actions/authactions';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
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

const list = [
  {
    id: 1,
    name: "Dashboard",
    icon: "fas fa-home",
    url: "/patient_home",
  },
  {
    id: 2,
    name: "Doctors",
    icon: "fas fa-user-md",
    url: "/explore_doctors",
  },
  {
    id: 2,
    name: "Hospitals",
    icon: "fas fa-hospital",
    url: "/search_hospitals",
  },
  {
    id: 3,
    name: "Blogs",
    icon: "fas fa-book-open",
    url: "/blogs",
  },
  {
    id: 3,
    name: "Appointments",
    icon: "fas fa-calendar-alt",
    url: "/appointment_history",
  },
  {
    id: 4,
    name: "Settings",
    icon: "fas fa-user-cog",
    url: "/patient_settings",
  },
];

const listStyle={
  textDecoration:'none',
}

function Navigation({logout}) {

  
  const textStyle={
    color: 'white',fontSize: '16px',fontWeight: 500,lineHeight: '21px'
  }

  const handlelogout=()=>{
    console.log(localStorage.getItem('token'));
    logout();
  }

  return (
    <div style={{marginTop:150,}}>
        <React.Fragment>
              <List>
               {list.map((text, index) => (
                 <NavLink to={text.url} style={listStyle}>
                  <ListItem button style={textStyle}>
                      <i
                        class={text.icon}
                        style={{
                          fontSize: 25,
                          color: "white",
                          margin: 10,
                          alignSelf: "center",
                        }}
                      />
                    <ListItemText primary={text.name} />
                  </ListItem>
                 </NavLink>
                ))}
                  <NavLink to='/login' style={listStyle}>
                  <ListItem button onClick={handlelogout} style={textStyle}>
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
