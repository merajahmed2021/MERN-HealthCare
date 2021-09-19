import React from 'react';
import axios from 'axios';
import {Token} from './authactions';


export const  GetDoctorProfile=()=> {
  return axios.get(`http://localhost:5000/api/patient/`)
  .then((res) => {
    console.log(res.data);
     return res.data;
  })
  .catch((err) =>console.log(err));
};

export const  GetLatestDoctor=()=> {
  return axios.get(`http://localhost:5000/api/patient/`)
  .then((res) => {
    console.log(res.data);
     return res.data;
  })
  .catch((err) =>console.log(err));
};

export const  GetDoctorProfilebyId=(id)=> {
  return axios.get(`http://localhost:5000/api/patient/doctor_profile/${id}`)
  .then((res) => {
    // console.log(res.data);
     return res.data;
  })
  .catch((err) =>console.log(err));
};

export const  GetDoctorEducationbyId=(id)=> {
  return axios.get(`http://localhost:5000/api/patient/doctor_education/${id}`)
  .then((res) => {
    // console.log(res.data);
     return res.data;
  })
  .catch((err) =>console.log(err));
};

export const  CreateAppointment=(userData)=> {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `auth-token ${Token()}`,
      },
    };
    return axios.post('http://localhost:5000/api/patient/create_appointment',userData,config)
     .then((res) => {
       console.log('Appointment Created Successfully with data = ',res.data);
       return res.data;
      })
     .catch((err) =>console.log(err));
};

export const  GetAppointmentPending=()=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.get(`http://localhost:5000/api/patient/appointment_pending`,config)
  .then((res) => {
    console.log(res.data);
     return res.data;
  })
  .catch((err) =>console.log(err));
};

//Delete Aoointment Pending
export const  DeleteAppointmentPending=(id)=> {
  return axios.delete(`http://localhost:5000/api/patient/delete_appointment/${id}`)
  .then((res) => {
    console.log("Deleted Successfully")
  })
  .catch((err) =>console.log(err));
};

export const  GetAppointmentStatus=(id)=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return  axios.get(`http://localhost:5000/api/patient/appointment_status/${id}`,config)
   .then((res) => {
     return res.data;
   })
   .catch((err) =>console.log(err));
};

export const  GetAppointmentHistory=()=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.get(`http://localhost:5000/api/patient/appointment_history`,config)
  .then((res) => {
    console.log(res.data);
     return res.data;
  })
  .catch((err) =>console.log(err));
};


