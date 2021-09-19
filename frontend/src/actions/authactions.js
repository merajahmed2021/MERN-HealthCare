import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
  } from './types';


  // CHECK TOKEN & LOAD USER

export const loadUser = () => (dispatch) => {
    dispatch({ type: USER_LOADING });  
};
  
// REGISTER USER
export const userlogin = (userData) => (dispatch) => {
    console.log("Actions = " , userData)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios.post('http://localhost:5000/api/user/login',userData,config)
    .then((res) => {
      console.log('Login seccessfully');
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
        console.log(err);
        dispatch({
            type: LOGIN_FAIL,
        });
      });
};

// REGISTER USER
export const register = (userData) => (dispatch) => {
    console.log("Actions = " , userData)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios.post('http://localhost:5000/api/user/register',userData,config)
    .then((res) => {
      console.log('Register seccessfully');
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
        dispatch({
          type: REGISTER_FAIL,
        });
      });
};

// LOGOUT USER
export const logout = () => (dispatch) => {
    console.log('LOGOUT ACTION CALL NOW');
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("Category");
    dispatch({
      type: LOGOUT_SUCCESS,
    });
};

export const Token = () => {
    return  localStorage.getItem('token');
};

  
  
