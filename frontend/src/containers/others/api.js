import React from 'react';
import axios from 'axios';



export const   getCurrentUser =(category)=> {
    // console.log("Current User Category: ",category);
    const user =JSON.parse(localStorage.getItem('user'));
  return user;
};



export const  Register=(userData)=> {
    const config = {
        headers: {
            'content-type': 'application/json',
        },
      };
     axios.post('http://localhost:5000/api/user/register',userData,config)
     .then((res) => {
       console.log('Register seccessfully');
     })
     .catch((err) =>console.log(err));
};


export  const UserLogin=(userData)=> {
    const config = {
        headers: {
            'content-type': 'application/json',
        },
      };
    return axios.post('http://localhost:5000/api/user/login',userData,config)
     .then((res) => {
       console.log('Login seccessfully');
       console.log(res.data);
       localStorage.setItem("user", JSON.stringify(res.data));
       return res.data;
     })
     .catch((err) =>console.log(err));
};
