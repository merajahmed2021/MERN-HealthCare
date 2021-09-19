import React from 'react';
import axios from 'axios';
import {Token} from './authactions';


//GET TODAY APPOINTMENTS 
export const  GetTodayAppointments=()=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return  axios.get('http://localhost:5000/api/doctor/today_appointments',config)
   .then((res) => {
     console.log(res.data);
     return res.data;
   })
   .catch((err) =>console.log(err));
};

// GET PATIENT BY APPOINTMENT ID
export const  GetPatientbyId=(id)=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return  axios.get(`http://localhost:5000/api/doctor/appointments/${id}`,config)
   .then((res) => {
    //  console.log(res.data);
     return res.data;
   })
   .catch((err) =>console.log(err));
};

// /CREATE CHECKUP FOR PATIENT
export const  CreateCheckup=(userData)=> { 
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `auth-token ${Token()}`,
      },
    };
    axios.post('http://localhost:5000/api/doctor/create_checkup',userData,config)
    .then((res) => {
      console.log('Register seccessfully');
    })
    .catch((err) =>console.log(err));
};

// GET PATIENT BY APPOINTMENT ID
export const  GetCheckupHistory=(id)=> {

  console.log('Doctor.js (PATIENT ID)=',id);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return  axios.get(`http://localhost:5000/api/doctor/checkup_history/${id}`,config)
   .then((res) => {
    //  console.log(res.data);
     return res.data;
   })
   .catch((err) =>console.log(err));
};

//DELETE CHECKUP
export const  Checkup_delete=(id)=> {
  return axios.get(`http://localhost:5000/api/doctor/checkup_delete/${id}`)
  .then((res) => {
    console.log("Deleted Successfully")
  })
  .catch((err) =>console.log(err));
};

export const  CreateAppointmentHistory=(id)=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return  axios.get(`http://localhost:5000/api/doctor/appointments_change_status/${id}`,config)
   .then((res) => {
    //  console.log(res.data);
     return res.data;
   })
   .catch((err) =>console.log(err));
};




//CREATE DOCTOR PROFILE 
export const  CreateProfile=(userData)=> {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `auth-token ${Token()}`,
      },
      };
     axios.post('http://localhost:5000/api/doctor/create',userData,config)
     .then((res) => {
       console.log('Register seccessfully');
     })
     .catch((err) =>console.log(err));
};

//CREATE DOCTOR PROFILE EDUCATION
export const  CreateProfileEdu=(userData)=> { 
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `auth-token ${Token()}`,
      },
    };
    axios.post('http://localhost:5000/api/doctor/create/education',userData,config)
    .then((res) => {
      console.log('Register seccessfully');
    })
    .catch((err) =>console.log(err));
  };

export const CreateProfileExp=(userData)=>{
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  axios.post('http://localhost:5000/api/doctor/create/experiences',userData,config)
  .then((res) => {
    console.log('Create seccessfully');
  })
  .catch((err) =>console.log(err));
}

//GET DOCTOR PROFILE 
export const  GetProfile=()=> {
  return  axios.post('http://localhost:5000/api/doctor/')
   .then((res) => {
     console.log('Register seccessfully');
     return res.data;
   })
   .catch((err) =>console.log(err));
};

//GET DOCTOR PROFILE EDUCATION
export const  GetProfileEdu=()=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return  axios.get('http://localhost:5000/api/doctor/education',config)
   .then((res) => {
     return res.data;
   })
   .catch((err) =>console.log(err));
};

//GET DOCTOR PROFILE EDUCATION
export const  GetProfileExp=()=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return  axios.get('http://localhost:5000/api/doctor/experiences',config)
   .then((res) => {
     return res.data;
   })
   .catch((err) =>console.log(err));
};

//DELETE DOCTOR EDUCATION
export const  DeleteEdu=(id)=> {
  return axios.delete(`http://localhost:5000/api/doctor/delete/${id}`)
  .then((res) => {
    console.log("Deleted Successfully")
  })
  .catch((err) =>console.log(err));
};


//GET APPOINTMENTS 
// export const  GetAppointments=()=> {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `auth-token ${Token()}`,
//     },
//   };
//   return  axios.get('http://localhost:5000/api/doctor/appointments',config)
//    .then((res) => {
//      console.log(res.data);
//      return res.data;
//    })
//    .catch((err) =>console.log(err));
// };
