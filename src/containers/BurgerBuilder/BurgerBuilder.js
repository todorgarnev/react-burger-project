import React, { Component } from 'react';

import { INGREDIENT_PRICES } from '../../constants/constants';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withHandlerError/withHandlerError';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    error: false
  };

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(response => this.setState({ ingredients: response.data }))
      .catch(error => this.setState({ error: true }));
  }


  updatePurchaseState(ingredients) {
    for (const ingredient in ingredients) {
      if (ingredients[ingredient] > 0) {
        this.setState({ purchaseable: true });
        return;
      }
    }
    this.setState({ purchaseable: false });
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: this.state.ingredients[type] + 1
    }
    const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({ totalPrice: newTotalPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: this.state.ingredients[type] > 0 ? this.state.ingredients[type] - 1 : 0
    }
    const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    this.setState({ totalPrice: newTotalPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    const queryParams = [];
    let queryString = '';

    for (const ingredient in this.state.ingredients) {
      queryParams.push(`${encodeURIComponent(ingredient)}=${encodeURIComponent(this.state.ingredients[ingredient])}`);
    }
    queryParams.push(`price=${this.state.totalPrice}`);
    queryString = `?${queryParams.join('&')}`;

    this.props.history.push({
      pathname: '/checkout',
      search: queryString
    });
  }

  render() {
    const burger = this.state.ingredients ?
      (<React.Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
        />
      </React.Fragment>) :
      (this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />);

    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchasedCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);