import React from 'react';
import styles from './SideDrawer.module.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => (
  <React.Fragment>
    <Backdrop show={props.open} clicked={props.closed} />
    <div className={`${styles.sideDrawer} ${props.open ? styles.open : styles.close}`}>
      <Logo height="11%" />
      <nav className={styles.nav}>
        <NavigationItems />
      </nav>
    </div>
  </React.Fragment>
);

export default SideDrawer;