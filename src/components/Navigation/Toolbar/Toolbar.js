import React from 'react';
import styles from './Toolbar.module.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => (
  <header className={styles.toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <Logo height="80%" />
    <nav className={styles.desktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;