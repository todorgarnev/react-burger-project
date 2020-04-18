import React, { Component } from 'react';

import { INGREDIENT_PRICES } from '../../constants/constants';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  };

  addIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: this.state.ingredients[type] + 1
    }
    const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({ totalPrice: newTotalPrice, ingredients: updatedIngredients });
  }

  removeIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: this.state.ingredients[type] > 0 ? this.state.ingredients[type] - 1 : 0
    }
    const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    this.setState({ totalPrice: newTotalPrice, ingredients: updatedIngredients });
  }

  render() {
    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;