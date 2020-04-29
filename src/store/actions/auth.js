import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: token,
  userId: userId
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
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch(err => dispatch(authFail(err.response.data.error)));
  }
};