import React from 'react';
import styles from './BuildControls.module.css';

import { controls } from '../../../constants/constants';
import BuildControl from './BuildControl/BuildControl';

const BuildControls = (props) => (
  <div className={styles.buildControls}>
    {controls.map(control => <BuildControl key={control.label} label={control.label} />)}
  </div>
);

export default BuildControls;