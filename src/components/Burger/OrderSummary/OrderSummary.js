import React from 'react';
import styles from './OrderSummary.module.css';

import Button from '../../UI/Button/Button';

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
      <p><strong>Total price: {props.price.toFixed(2)}$</strong></p>
      <p>Continue to checkout?</p>
      <Button buttonType='danger' clicked={props.purchasedCanceled}>CANCEL</Button>
      <Button buttonType='success' clicked={props.purchaseContinued}>CONTINUE</Button>
    </React.Fragment>
  );
};

export default OrderSummary;