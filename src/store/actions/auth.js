import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (authData) => ({
  type: actionTypes.AUTH_SUCCESS,
  authData: authData
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error: error
});

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    const url = isSignUp ?
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkVzHueOkIGwNPnwzdt7l5xdszSkBvq3U' :
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkVzHueOkIGwNPnwzdt7l5xdszSkBvq3U';

    axios.post(url, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.errors));
      });
  }
};