import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

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

  useEffect(() => {
    props.onInitIngredients();
  }, []);

  const updatePurchaseState = (ingredients) => {
    for (const ingredient in ingredients) {
      if (ingredients[ingredient] > 0) {
        return true;
      }
    }
    return false;
  }

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  }

  const burger = props.ingredients ?
    (<React.Fragment>
      <Burger ingredients={props.ingredients} />
      <BuildControls
        ingredients={props.ingredients}
        price={props.totalPrice}
        purchaseable={updatePurchaseState(props.ingredients)}
        ordered={purchaseHandler}
        isAuth={props.isAuthenticated}
        ingredientAdded={props.onIngredientAdded}
        ingredientRemoved={props.onIngredientRemoved}
      />
    </React.Fragment>) :
    (props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />);

  return (
    <React.Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        <OrderSummary
          ingredients={props.ingredients}
          price={props.totalPrice}
          purchasedCanceled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
        />
      </Modal>
      {burger}
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  error: state.error,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
  onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));