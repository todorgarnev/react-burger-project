import { updateObject } from '../utility/utility';
import * as actionTypes from '../actions/actionTypes';

// Setting the token in the store for course purposes only
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authStart = (state, action) => updateObject(state, { error: null, loading: true });
const authSuccess = (state, action) => updateObject(state, { token: action.idToken, userId: action.userId, error: null, loading: false });
const authFail = (state, action) => updateObject(state, { error: action.error, loading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    default: return state;
  }
};

export default reducer;