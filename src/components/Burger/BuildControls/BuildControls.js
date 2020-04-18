import React from 'react';
import styles from './BuildControls.module.css';

import { controls } from '../../../constants/constants';
import BuildControl from './BuildControl/BuildControl';

const BuildControls = (props) => (
  <div className={styles.buildControls}>
    {controls.map(control => (
      <BuildControl
        key={control.label}
        label={control.label}
        disabled={props.ingredients[control.type] === 0 ? true : false}
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
      />
    ))}
  </div>
);

export default BuildControls;