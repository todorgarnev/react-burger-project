import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/actionCreators';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }


  render() {
    const routes = this.props.isAuthenticated
      ? (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" render={(props) => <Checkout {...props} />} />
          <Route path="/orders" render={() => <Orders />} />
          <Route path="/auth" render={() => <Auth />} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      )
      : (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/auth" render={() => <Auth />} />
          <Redirect to="/" />
        </Switch>
      );

    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>
            {routes}
          </Suspense>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignUp: () => dispatch(actions.authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
