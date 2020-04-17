import React from 'react';
import './Burger.css'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = props => {
  return (
    <div className="burger-container">
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      <BurgerIngredient type="cheese"></BurgerIngredient>
      <BurgerIngredient type="meat"></BurgerIngredient>
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
  );
};

export default burger;