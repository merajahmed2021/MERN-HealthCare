import React from "react";
import { Route, Switch } from "react-router-dom";

// import Login from '../components/Auth/Login';
import About from '../containers/Home/About';
import Contact from '../containers/Home/Contact';
import Blogs from '../containers/Home/Blogs';
import Services from '../containers/Home/Services'; 
import ServiceDetails from '../containers/Home/ServiceDetail';
import BlogDetails from '../containers/Home/BlogDetails';

import Navigation from '../components/Navigation';
import Error from '../components/Error';
// Auth Route
import Login from '../containers/Auth/Login';
import Signup from '../containers/Auth/Signup';

// Doctor Route
import DoctorHome from '../containers/Doctor/Dashboard';
import PatientsList from '../containers/Doctor/Patients';
import AppointmentList from '../containers/Doctor/Appointment';
import DoctorSetting from '../containers/Doctor/Settings';
import DoctorEditProfile from '../containers/Doctor/EditProfile';
import DoctorBlogs from '../containers/Doctor/Blogs';
import DPatientProfile from '../containers/Doctor/PatientProfile';
import DPatientEdit from '../containers/Doctor/PatientEdit';

// Patient Route
import PatientHome from '../containers/Patient/Dashboard';
import AppointmentHistory from '../containers/Patient/AppointmentHistory';
import BookAppointment from '../containers/Patient/BookAppointment';
import ExploreDoctor from '../containers/Patient/ExploreDoctor';
import SearchHospital from '../containers/Patient/SearchHospital';
// import PatientBlogs from './containers/Patient/Blogs';
import DoctorProfile from '../containers/Patient/DoctorProfile';
import PatientSettings from '../containers/Patient/Settings';

import PrivateRoute from './PrivateRoute';

const Routes = () => {
    return (
      <section>
        <Switch>
            <Route path="/signup"       component={Signup} exact/>
             <Route path="/login"        component={Login} exact/>
             <Route path="/about"        component={About}/>
             <Route path="/contact"      component={Contact}/>
             <Route path="/blogs"        component={Blogs}/>
             <Route path="/services"     component={Services}/>
             <Route path="/details/:name"      component={ServiceDetails}/>
             <Route path="/blog_details/:id"    component={BlogDetails}/>

             {/* Paitent Route */}
             <PrivateRoute exact path="/patient_home" component={PatientHome}/>
             <PrivateRoute exact path="/book_appointment/:id"  component={BookAppointment}/>
             <PrivateRoute exact path="/appointment_history"  component={AppointmentHistory}/>
             <PrivateRoute exact path="/explore_doctors"  component={ExploreDoctor}/>
             <PrivateRoute exact path="/search_hospitals"  component={SearchHospital}/>
             <PrivateRoute exact path="/doctor_profile/:id"  component={DoctorProfile}/>
             <PrivateRoute exact path="/patient_settings"  component={PatientSettings}/>
            
            {/* Doctor Route */}
             <PrivateRoute exact path="/doctor_home"  component={DoctorHome}/>
             <PrivateRoute exact path="/appointments"  component={AppointmentList}/>
             <PrivateRoute exact path="/patients_list"  component={PatientsList}/>
             <PrivateRoute exact path="/doctor_settings"  component={DoctorSetting}/>
             <PrivateRoute exact path="/doctor_edit_profile"  component={DoctorEditProfile}/>
             <PrivateRoute exact path="/doctor_blogs"  component={DoctorBlogs}/>
             <PrivateRoute exact path="/doctor_patient_profile/:id"  component={DPatientProfile}/>
             <PrivateRoute exact path="/doctor_patient_edit"  component={DPatientEdit}/>
             <Route component={Error}/>
        </Switch>
      </section>
    );
  };
  
  export default Routes;
  