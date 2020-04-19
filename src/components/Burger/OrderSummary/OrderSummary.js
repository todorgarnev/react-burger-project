import React from 'react';
import styles from './OrderSummary.module.css';

const OrderSummary = (props) => {
  const ingredientsSummary = [];
  const ingredients = props.ingredients;

  for (const ingredient in ingredients) {
    ingredientsSummary.push(
      <li key={ingredient}>
        <span className={styles.ingredientName}>{ingredient}</span>: {ingredients[ingredient]}
      </li>
    );
  }

  return (
    <React.Fragment>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientsSummary}
      </ul>
      <p>Continue to checkout?</p>
    </React.Fragment>
  );
};

export default OrderSummary;