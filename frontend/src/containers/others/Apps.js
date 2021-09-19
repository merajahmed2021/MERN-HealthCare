import React, { Component,useEffect,useState } from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

// Home Route
import Home from './containers/Home/Home';
import Routes from './hocs/Routes';

import About from './containers/Home/About';
import Contact from './containers/Home/Contact';
import Blogs from './containers/Home/Blogs';
import Services from './containers/Home/Services'; 
import ServiceDetails from './containers/Home/ServiceDetail';
import BlogDetails from './containers/Home/BlogDetails';

import Navigation from './components/Navigation';
import Error from './components/Error';
// Auth Route
import Login from './containers/Auth/Login';
import Signup from './containers/Auth/Signup';

// Doctor Route
import DoctorHome from './containers/Doctor/Dashboard';
import PatientsList from './containers/Doctor/Patients';
import AppointmentList from './containers/Doctor/Appointment';
import DoctorSetting from './containers/Doctor/Settings';
import DoctorEditProfile from './containers/Doctor/EditProfile';
import DoctorBlogs from './containers/Doctor/Blogs';
import DPatientProfile from './containers/Doctor/PatientProfile';
import DPatientEdit from './containers/Doctor/PatientEdit';

// Patient Route
import PatientHome from './containers/Patient/Dashboard';
import AppointmentHistory from './containers/Patient/AppointmentHistory';
import BookAppointment from './containers/Patient/BookAppointment';
import ExploreDoctor from './containers/Patient/ExploreDoctor';
import SearchHospital from './containers/Patient/SearchHospital';
// import PatientBlogs from './containers/Patient/Blogs';
import DoctorProfile from './containers/Patient/DoctorProfile';
// import PBlogDetails from './containers/Patient/BlogDetails';

import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from './actions/authactions';
import Layout from './hocs/Layout';
import PrivateRoute from './hocs/PrivateRoute';


const App = () =>{


  useEffect(() => {
    store.dispatch(loadUser());
  }, [])


    return (      
      //  <BrowserRouter>
      //   <div>
      //     <Navigation />
      //       <Switch>
      <Provider store={store}>
    <Router>
      <Layout >
             <Route path="/"             component={Home} exact/>
             <Route component={Routes} />
             {/* <Route path="/signup"       component={Signup} exact/>
             <Route path="/login"        component={Login} exact/>
             <Route path="/about"        component={About}/>
             <Route path="/contact"      component={Contact}/>
             <Route path="/blogs"        component={Blogs}/>
             <Route path="/services"     component={Services}/>
             <Route path="/details/:name"      component={ServiceDetails}/>
             <Route path="/blog_details/:id"    component={BlogDetails}/> */}

             {/* Paitent Route */}
             {/* <Route path="/patient_home" component={PatientHome}/>
             <Route path="/book_appointment/:id"  component={BookAppointment}/>
             <Route path="/appointment_history"  component={AppointmentHistory}/>
             <Route path="/explore_doctors"  component={ExploreDoctor}/>
             <Route path="/search_hospitals"  component={SearchHospital}/>
             <Route path="/doctor_profile/:id"  component={DoctorProfile}/> */}
            
            {/* Doctor Route */}
             {/* <Route path="/doctor_home"  component={DoctorHome}/>
             <Route path="/appointments"  component={AppointmentList}/>
             <Route path="/patients_list"  component={PatientsList}/>
             <Route path="/doctor_settings"  component={DoctorSetting}/>
             <Route path="/doctor_edit_profile"  component={DoctorEditProfile}/>
             <Route path="/doctor_blogs"  component={DoctorBlogs}/>
             <Route path="/doctor_patient_profile/:id"  component={DPatientProfile}/>
             <Route path="/doctor_patient_edit"  component={DPatientEdit}/>
             <Route component={Error}/> */}
            </Layout>
      </Router>
    </Provider>
       
    );
}
 
export default App;