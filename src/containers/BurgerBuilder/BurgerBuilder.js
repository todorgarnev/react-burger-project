import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withHandlerError/withHandlerError';
import axios from '../../axios-orders';
import * as ActionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    error: false
  };

  componentDidMount() {
    // axios.get('/ingredients.json')
    //   .then(response => this.setState({ ingredients: response.data }))
    //   .catch(error => this.setState({ error: true }));
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
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
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
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
        />
      </React.Fragment>) :
      (this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />);

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
  ingredients: state.ingredients,
  totalPrice: state.totalPrice
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: (ingredientName) => dispatch({ type: ActionTypes.ADD_INGREDIENT, ingredientName: ingredientName }),
  onIngredientRemoved: (ingredientName) => dispatch({ type: ActionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));