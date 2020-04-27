import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withHandlerError/withHandlerError';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/actionCreators';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    const orders = !this.props.loading ?
      this.props.orders.map(order => <Order ingredients={order.ingredients} price={order.price} key={order.id} />) :
      <Spinner />;
    const noOrders = this.props.orders.length === 0 ? 'No orders' : null;

    return (
      <React.Fragment>
        {orders}
        {noOrders}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: () => dispatch(actions.fetchOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));