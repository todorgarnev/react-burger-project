import React from 'react';
import styles from './CheckoutSummary.module.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
  return (
    <div className={styles.checkoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div className={styles.burger}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button buttonType='danger' clicked>CANCEL</Button>
      <Button buttonType='success' clicked>CONTINUE</Button>
    </div>
  );
};

export default CheckoutSummary;