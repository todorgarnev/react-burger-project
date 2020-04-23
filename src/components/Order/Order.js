import React from 'react';
import styles from './Order.module.css';

const Order = (props) => {
  const ingredients = [];

  for (const ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientsOutput = ingredients.map((ingredient, i) => (
    <span className={styles.ingredient} key={i}>
      {ingredient.name} ({ingredient.amount})
    </span>
  ));

  return (
    <div className={styles.order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>Price: <strong>{Number(props.price).toFixed(2)}$</strong></p>
    </div>
  );
};

export default Order;