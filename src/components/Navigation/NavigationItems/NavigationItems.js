import React from 'react';
import styles from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
  <ul className={styles.navigationItems} onClick={props.clicked}>
    <NavigationItem link="/" exact>Burger builder</NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {props.isAuthenticated
      ? <NavigationItem link="/logout">Log out</NavigationItem>
      : <NavigationItem link="/auth">Log in</NavigationItem>}
  </ul>
);

export default NavigationItems;