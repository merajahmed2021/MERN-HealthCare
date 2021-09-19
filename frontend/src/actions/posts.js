import React from 'react';
import axios from 'axios';
import {Token} from './authactions';



export const  GetPost=()=> {
  return axios.get(`http://localhost:5000/api/posts`)
  .then((res) => {
     return res.data;
  })
  .catch((err) =>console.log(err));
};


export const  GetLatestPost=()=> {
  return axios.get(`http://localhost:5000/api/posts/latest`)
  .then((res) => {
     return res.data;
  })
  .catch((err) =>console.log(err));
};


export const  GetUserPost=()=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.get(`http://localhost:5000/api/posts/user`,config)
  .then((res) => {
     return res.data;
  })
  .catch((err) =>console.log(err));
};


export const  CreatePost=(post_data)=> {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `auth-token ${Token()}`,
      },
    };
    axios.post('http://localhost:5000/api/posts/create',post_data ,config)
    .then((res) => {
      console.log('post seccessfully');
    })
    .catch((err) =>console.log(err));
};

export const  DeletePost=(id)=> {
  return axios.delete(`http://localhost:5000/api/posts/delete/${id}`)
  .then((res) => {
    console.log("Deleted Successfully")
  })
  .catch((err) =>console.log(err));
};

export const  UpdatePost=(id,data)=> {
  const config = {
    headers: {
        'content-type': 'multipart/form-data',
    },
  };
  axios.put(`http://localhost:5000/api/posts/update/${id}`,data ,config)
  .then((res) => {
    console.log("Updated Successfully")
  })
  .catch((err) =>console.log(err));
};


export const  GetPostbyId=(id)=> {
  return  axios.get(`http://localhost:5000/api/posts/blogs/${id}`)
   .then((res) => {
    //  console.log(res.data);
     return res.data;
   })
   .catch((err) =>console.log(err));
};