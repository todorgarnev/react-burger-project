import { put } from 'redux-saga/effects'

import * as actions from '../actions/actionCreators';
import axios from '../../axios-orders';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());

  try {
    const response = yield axios.post(`/orders.json?auth=${action.token}`, action.orderData);
    yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData))
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;

  yield put(actions.fetchOrdersStart());

  try {
    const response = yield axios.get(`/orders.json${queryParams}`);
    const fetchedOrders = [];

    for (const key in response.data) {
      fetchedOrders.push({
        ...response.data[key],
        id: key
      });
    }

    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error))
  }
}