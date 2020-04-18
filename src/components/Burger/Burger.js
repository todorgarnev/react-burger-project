import React from 'react';
import styles from './Burger.module.css'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
  const ingredientsArray = [];
  const allIngredients = props.ingredients;

  for (const ingredient in allIngredients) {
    for (let i = 0; i < allIngredients[ingredient]; i++) {
      ingredientsArray.push(<BurgerIngredient key={ingredient + i} type={ingredient} />)
    }
  }

  return (
    <div className={styles.burgerContainer}>
      <BurgerIngredient type="bread-top" />
      {ingredientsArray.length > 0 ? ingredientsArray : 'Please start adding ingredients!'}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;