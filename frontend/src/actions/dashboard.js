import React from 'react';
import axios from 'axios';
import {Token} from './authactions';




export const  GetDoctorTotalAppointments=()=> {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `auth-token ${Token()}`,
      },
    };
    return axios.get(`http://localhost:5000/api/dashboard/doctor_total_patients`,config)
    .then((res) => {
       return res.data;
    })
    .catch((err) =>console.log(err));
  };

export const  GetUserTotalAppointments=()=> {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `auth-token ${Token()}`,
      },
    };
    return axios.get(`http://localhost:5000/api/dashboard/user_total_appointments`,config)
    .then((res) => {
       return res.data;
    })
    .catch((err) =>console.log(err));
  };

export const  GetTotalBlogs=()=> {
    return axios.get(`http://localhost:5000/api/dashboard/total_blogs`)
    .then((res) => {
       return res.data;
    })
    .catch((err) =>console.log(err));
};

export const  GetTotalPatients=()=> {
    return axios.get(`http://localhost:5000/api/dashboard/total_patients`)
    .then((res) => {
       return res.data;
    })
    .catch((err) =>console.log(err));
};
  
export const  GetTotalDoctors=()=> {
    return axios.get(`http://localhost:5000/api/dashboard/total_doctors`)
    .then((res) => {
       return res.data;
    })
    .catch((err) =>console.log(err));
};
  

  