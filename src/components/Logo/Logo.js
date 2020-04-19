import React from 'react';
import styles from './Logo.module.css';

import burgerLogo from '../../assets/images/logo.png';

const Logo = (props) => (
  <div className={styles.logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default Logo;