import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/actionCreators';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignUp();
  }, []);

  const routes = props.isAuthenticated
    ? (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route
          path="/checkout"
          render={() => (
            <Suspense fallback={<div>Loading..</div>}>
              <Checkout {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/orders"
          render={() => (
            <Suspense fallback={<div>Loading..</div>}>
              <Orders />
            </Suspense>
          )}
        />
        <Route
          path="/auth"
          render={() => (
            <Suspense fallback={<div>Loading..</div>}>
              <Auth />
            </Suspense>
          )}
        />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    )
    : (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route
          path="/auth"
          render={() => (
            <Suspense fallback={<div>Loading..</div>}>
              <Auth />
            </Suspense>
          )}
        />
        <Redirect to="/" />
      </Switch>
    );

  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignUp: () => dispatch(actions.authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
