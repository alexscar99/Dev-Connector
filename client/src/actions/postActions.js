import axios from 'axios';

import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  POST_LOADING,
  DELETE_POST
} from './types';

// add post
export const addPost = postData => async dispatch => {
  dispatch(clearErrors());
  try {
    const res = await axios.post('/api/posts', postData);

    dispatch({ type: ADD_POST, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

// get all posts
export const getPosts = () => async dispatch => {
  dispatch(setPostLoading());
  try {
    const res = await axios.get('/api/posts');

    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_POSTS, payload: null });
  }
};

// get a singular post
export const getPost = id => async dispatch => {
  dispatch(setPostLoading());
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({ type: GET_POST, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_POST, payload: null });
  }
};

// delete a post
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// add a like to a post
export const addLike = id => async dispatch => {
  try {
    await axios.post(`/api/posts/like/${id}`);
    dispatch(getPosts());
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// remove a like from a post
export const removeLike = id => async dispatch => {
  try {
    await axios.post(`/api/posts/unlike/${id}`);
    dispatch(getPosts());
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// add a comment to a post
export const addComment = (postId, commentData) => async dispatch => {
  dispatch(clearErrors());
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, commentData);

    dispatch({ type: GET_POST, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

// delete a comment from a post
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({ type: GET_POST, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

// handle profile loading
export const setPostLoading = () => {
  return { type: POST_LOADING };
};

// clear errors
export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
