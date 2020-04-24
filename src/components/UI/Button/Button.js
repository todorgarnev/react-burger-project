import React from 'react';
import styles from './Button.module.css';

const Button = (props) => (
  <button
    disabled={props.disabled}
    className={`${styles.button} ${styles[props.buttonType]}`}
    onClick={props.clicked}>
    {props.children}
  </button>
);

export default Button;