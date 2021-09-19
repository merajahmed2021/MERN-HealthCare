import React from 'react';
import axios from 'axios';
import {Token} from './authactions';

export const  CreateDoctorSetting=(post_data)=> {
    console.log("Setting actions= ",post_data);
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `auth-token ${Token()}`,
        },
      };
      return axios.post(`http://localhost:5000/api/settings/doctor_settings`,post_data ,config)
      .then((res) => {
        console.log('post seccessfully');
        return res.data;
      })
      .catch((err) =>console.log(err));
};


export const  GetDoctorSetting=()=> {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `auth-token ${Token()}`,
      },
    };
    return axios.get(`http://localhost:5000/api/settings/get_doctor_settings` ,config)
    .then((res) => {
      console.log('post seccessfully');
      return res.data;
    })
    .catch((err) =>console.log(err));
};


export const  GetDoctorSettingbyId=(id)=> {
  console.log("Settings = ",id);
  return axios.get(`http://localhost:5000/api/settings/doctor_settings/${id}`)
  .then((res) => {
     return res.data;
  })
  .catch((err) =>console.log(err));
};



