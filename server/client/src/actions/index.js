import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, FETCH_POSTS, FETCH_POST,
        CREATE_POST, DELETE_POST } from './types';

const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "?key=PAPERCLIP1234";

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};


export const fetchPosts = () => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/posts${API_KEY}`);
  console.log('these are the posts:', res)

  dispatch({ type: FETCH_POSTS, payload: res.data });
}



export const createPost = (values, callback) => async dispatch => {
  const res = await axios.post(`${ROOT_URL}/posts${API_KEY}`, values);
  callback();

  dispatch({ type: CREATE_POST, payload: res.data });
}

export const fetchPost = id => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  dispatch({ type: FETCH_POST, payload: res.data });
}

export const deletePost = (id, callback) => async dispatch => {
  const res = await axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
  callback();

  dispatch({ type: DELETE_POST, payload: id });
}
