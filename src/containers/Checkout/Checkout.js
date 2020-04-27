import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    const summary = (this.props.ingredients && !this.props.purchased) ?
      (<React.Fragment>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          component={ContactData}
        />
      </React.Fragment>) :
      <Redirect to='/' />;

    return summary;
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  purchased: state.order.purchased
});

export default connect(mapStateToProps)(Checkout);