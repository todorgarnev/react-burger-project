import React from 'react';
import styles from './Logo.module.css';

import burgerLogo from '../../assets/images/logo.png';

const Logo = () => (
  <div className={styles.logo}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default Logo;