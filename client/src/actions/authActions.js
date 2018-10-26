import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// register user
export const registerUser = (userData, history) => async dispatch => {
  try {
    await axios.post('/api/users/register', userData);
    history.push('/login');
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

// login user
export const loginUser = userData => async dispatch => {
  try {
    const res = await axios.post('/api/users/login', userData);

    // set token to local storage and then set it to auth header
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);

    // decode token to get user data and then set current user
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

// set currently logged in user
export const setCurrentUser = decoded => {
  return { type: SET_CURRENT_USER, payload: decoded };
};

// log user out
export const logoutUser = () => dispatch => {
  // remove token from local storage and remove auth header for future requests
  localStorage.removeItem('jwtToken');
  setAuthToken(false);

  // set current user to empty obj which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
