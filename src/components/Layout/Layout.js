import React from 'react';
import './Layout.css'

const layout = props => (
  <React.Fragment>
    <div>Toolbar, SideDrawer, Backdrop</div>

    <main className="content">
      {props.children}
    </main>
  </React.Fragment>
);

export default layout;