import React from 'react';
import styles from './Layout.module.css'

const Layout = (props) => (
  <React.Fragment>
    <div>Toolbar, SideDrawer, Backdrop</div>

    <main className={styles.content}>
      {props.children}
    </main>
  </React.Fragment>
);

export default Layout;