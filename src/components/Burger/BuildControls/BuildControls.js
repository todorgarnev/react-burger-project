import React from 'react';
import styles from './BuildControls.module.css';

import { controls } from '../../../constants/constants';
import BuildControl from './BuildControl/BuildControl';

const BuildControls = (props) => (
  <div className={styles.buildControls}>
    <p>Current price: <strong>{props.price.toFixed(2)}$</strong></p>
    {controls.map(control => (
      <BuildControl
        key={control.label}
        label={control.label}
        disabled={props.ingredients[control.type] === 0 ? true : false}
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
      />
    ))}
    <button className={styles.orderButton} disabled={!props.purchaseable}>ORDER NOW</button>
  </div>
);

export default BuildControls;