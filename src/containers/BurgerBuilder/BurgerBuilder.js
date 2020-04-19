import React, { Component } from 'react';

import { INGREDIENT_PRICES } from '../../constants/constants';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false
  };

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

  render() {
    return (
      <React.Fragment>
        <Modal>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;