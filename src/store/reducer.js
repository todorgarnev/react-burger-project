import * as ActionTypes from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    bacon: 0,
    meat: 0
  },
  totalPrice: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT:
      debugger;
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        }
      };
    case ActionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        }
      };
    default:
      return state;
  }
};

export default reducer;