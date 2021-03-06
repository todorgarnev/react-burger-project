import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withHandlerError/withHandlerError';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/actionCreators';

export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }


  updatePurchaseState(ingredients) {
    for (const ingredient in ingredients) {
      if (ingredients[ingredient] > 0) {
        return true;
      }
    }
    return false;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true })
    } else {
      this.props.onSetRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render() {
    const burger = this.props.ingredients ?
      (<React.Fragment>
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
          purchaseable={this.updatePurchaseState(this.props.ingredients)}
          ordered={this.purchaseHandler}
          isAuth={this.props.isAuthenticated}
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
        />
      </React.Fragment>) :
      (this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />);

    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.props.ingredients}
            price={this.props.totalPrice}
            purchasedCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
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