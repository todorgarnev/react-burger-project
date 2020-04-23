import React, { Component } from 'react';
import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withHandlerError/withHandlerError';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];

        for (const key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }

        this.setState(({ loading: false, orders: fetchedOrders }));
      })
      .catch(err => this.setState(({ loading: false })))
  }

  render() {
    const orders = this.state.orders.length > 0 ?
      this.state.orders.map(order => <Order ingredients={order.ingredients} price={order.price} key={order.id} />) :
      <Spinner />

    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);