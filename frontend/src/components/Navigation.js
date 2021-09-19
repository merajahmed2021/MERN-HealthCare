import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import DoctorNavigation from '../containers/Doctor/Navigation';
import PatientNavigation from '../containers/Patient/Navigation';

import HomeNavbar from './HomeNavbar';
import Navbar from 'react-bootstrap/Navbar';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';


const mystyle={
    fontSize:'20px',
    fontWeight:"bolder",
    padding:"5px",
    textDecoration:'none',
 };

const navStyle={
    boxShadow:'0 8px 6px -6px rgb(0 0 0 / 40%)',
    background:'white',
    color:'black',
    padding:'15px 0px'
} 


const authnavStyle={
  boxShadow:'0 8px 6px -6px rgb(0 0 0 / 40%)',
  background:'darkviolet',
  color:'white',
  padding:'10px 0px'
} 


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width:250,
  },
});





const Navigation = ({auth}) => {

  const { isAuthenticated,authCategory,isCategory} =auth;

  
  console.log("Navigation Category= ",authCategory);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const toggle_Drawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };


  
  const authLinks=(
    <Navbar style={authnavStyle}  expand="lg"  collapseOnSelect expand="lg" fixed="top">
        <Navbar.Brand href="#home" className='mx-4' style={{color:'white'}}>{authCategory=='patient'?"Patient":'Doctor'} Platform</Navbar.Brand>
        <IconButton style={{marginLeft:'auto',marginRight:20}}
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={toggle_Drawer(true)}
          >
          <MenuIcon style={{fontSize:30}}/>
        </IconButton>
        <SwipeableDrawer   open={open}    anchor="left"
          onClose={toggle_Drawer(false)}
          onOpen={ toggle_Drawer(true)}  >
          <div style={{background:'darkviolet',height:'100%',color:'white'}}
            className={clsx(classes.list, {[classes.fullList]: open,})}
            role="presentation"
            onClick={  toggle_Drawer(false)}
            onKeyDown={toggle_Drawer(false)}
          >
            {
              // isCategory?
              authCategory=='patient'?<PatientNavigation/>:<DoctorNavigation/>
              // :null
            }
          </div>
        </SwipeableDrawer>
    </Navbar>
  )
  
  const guestLinks=(
    <HomeNavbar/>
  )

    return (
       <div>
            {isAuthenticated ? authLinks : guestLinks}
       </div>
    );
}
 

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Navigation);

