import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import {Nav,NavDropdown} from 'react-bootstrap';
import Button from '@material-ui/core/Button';

const navStyle={
    boxShadow:'0 8px 6px -6px rgb(0 0 0 / 40%)',
    background:'white',
    // color:'white',
    // background:'darkviolet',
    // color:'white',
    padding:'15px 0px'
} 


const navLinkStyle={
  // background:'darkviolet',
  // color:'white',
  textDecoration:'none',
  color:'black',
} 

export default function HomeNavbar() {
    return (
        <div>
            <Navbar style={navStyle}  expand="lg"  collapseOnSelect expand="lg" fixed="top">
                <Navbar.Brand href="#home" className='mx-4' style={navLinkStyle}>Hospital Platform</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='mx-4'/>
                <Navbar.Collapse id="basic-navbar-nav" >
                  <Nav className="ml-auto" style={{padding:'5px 0px'}}>
                    <NavLink to="/"        >
                         <Nav.Link href="#features" style={navLinkStyle}>Home</Nav.Link>
                    </NavLink>
                    {/* <NavLink to="/about"   > */}
                        {/* <Nav.Link href="#features" style={navLinkStyle}>About Us</Nav.Link> */}
                    {/* </NavLink> */}
                    <NavLink to="/blogs" >
                        <Nav.Link href="#features" style={navLinkStyle}>Blogs</Nav.Link>
                    </NavLink>
                    <NavLink to="/services" >
                        <Nav.Link href="#features" style={navLinkStyle}>Services</Nav.Link>
                    </NavLink>
                  </Nav>
                  <div  style={{marginLeft:'auto',marginRight:50}}>
                    <NavLink to='signup' style={{textDecoration:'none'}}>
                        <Button variant="contained" className=" mr-sm-2" color="secondary"
                          style={{marginLeft:'auto',marginRight:30}}
                        >Signup</Button>
                    </NavLink>
                    <NavLink to='login' style={{textDecoration:'none'}}>
                        <Button variant="contained" className=" mr-sm-2" color="secondary"
                          style={{marginLeft:'auto',marginRight:30}}
                        >Login</Button>
                    </NavLink>
                  </div>
                </Navbar.Collapse>
        </Navbar>
        </div>
    )
}
