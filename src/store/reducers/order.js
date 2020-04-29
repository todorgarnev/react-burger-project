import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const updatePurchasedValue = (state, action, purchasedValue) => updateObject(state, { purchased: purchasedValue });
const fetchOrdersSuccess = (state, action) => updateObject(state, { orders: action.orders, purchased: false });

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });

  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: return updatePurchasedValue(state, action, false);
    case actionTypes.PURCHASE_BURGER_START: return updatePurchasedValue(state, action, true);
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL: return updatePurchasedValue(state, action, false);
    case actionTypes.FETCH_ORDERS_START: return updatePurchasedValue(state, action, true);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL: return updatePurchasedValue(state, action, false);
    default: return state;
  }
}

export default reducer;