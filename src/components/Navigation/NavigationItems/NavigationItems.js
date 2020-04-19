import React from 'react';
import styles from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
  <ul className={styles.navigationItems}>
    <NavigationItem link="/" active>Burger builder</NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
);

export default NavigationItems;