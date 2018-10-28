import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from './types';

// get current profile
export const getCurrentProfile = () => async dispatch => {
  dispatch(setProfileLoading());

  try {
    const res = await axios.get('/api/profile');
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_PROFILE, payload: {} });
  }
};

// create profile
export const createProfile = (profileData, history) => async dispatch => {
  try {
    await axios.post('/api/profile', profileData);
    history.push('/dashboard');
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

// delete account and profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone')) {
    try {
      await axios.delete('/api/profile');
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  }
};

// handle profile loading
export const setProfileLoading = () => {
  return { type: PROFILE_LOADING };
};

// clear profile
export const clearCurrentProfile = () => {
  return { type: CLEAR_CURRENT_PROFILE };
};
