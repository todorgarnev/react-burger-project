import React, { Component } from 'react';
import styles from './Orders.module.css';

import Order from '../../components/Order/Order';

class Orders extends Component {
  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default Orders;