import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withHandlerError/withHandlerError';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/actionCreators';

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.burgerBuilder.ingredients);
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
  const onIngredientAdded = ingredientName => dispatch(actions.addIngredient(ingredientName));
  const onIngredientRemoved = ingredientName => dispatch(actions.removeIngredient(ingredientName));
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetRedirectPath = path => dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    for (const ingredient in ingredients) {
      if (ingredients[ingredient] > 0) {
        return true;
      }
    }
    return false;
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  }

  const burger = ingredients ?
    (<React.Fragment>
      <Burger ingredients={ingredients} />
      <BuildControls
        ingredients={ingredients}
        price={totalPrice}
        purchaseable={updatePurchaseState(ingredients)}
        ordered={purchaseHandler}
        isAuth={isAuthenticated}
        ingredientAdded={onIngredientAdded}
        ingredientRemoved={onIngredientRemoved}
      />
    </React.Fragment>) :
    (error ? <p>Ingredients can't be loaded!</p> : <Spinner />);

  return (
    <React.Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        <OrderSummary
          ingredients={ingredients}
          price={totalPrice}
          purchasedCanceled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
        />
      </Modal>
      {burger}
    </React.Fragment>
  );
}

export default withErrorHandler(BurgerBuilder, axios);