import React from 'react';
import styles from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
  <ul className={styles.navigationItems}>
    <NavigationItem link="/" exact>Burger builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    <NavigationItem link="/auth">Authenticate</NavigationItem>
  </ul>
);

export default NavigationItems;