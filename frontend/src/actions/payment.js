import React from 'react';
import axios from 'axios';
import {Token} from './authactions';

export const  GetUserPayment=()=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.get(`http://localhost:5000/payment/all_payments`,config)
  .then((res) => {
      console.log(res.data);
     return res.data;
  })
  .catch((err) =>console.log(err));
};


export const  CreateDoctorBank=(post_data)=> {
  console.log("Setting actions= ",post_data);
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `auth-token ${Token()}`,
      },
    };
    return axios.post(`http://localhost:5000/payment/doctor_account`,post_data ,config)
    .then((res) => {
      console.log('post seccessfully');
      return res.data;
    })
    .catch((err) =>console.log(err));
};


export const  GetDoctorPayment=()=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.get(`http://localhost:5000/payment/doctor_payments`,config)
  .then((res) => {
      console.log(res.data);
     return res.data;
  })
  .catch((err) =>console.log(err));
};

// export const  DeletePost=(id)=> {
//   return axios.delete(`http://localhost:5000/api/posts/delete/${id}`)
//   .then((res) => {
//     console.log("Deleted Successfully")
//   })
//   .catch((err) =>console.log(err));
// };


