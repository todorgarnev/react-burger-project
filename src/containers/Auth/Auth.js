import React, { useState, useEffect } from 'react';
import styles from './Auth.module.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { registerForm } from '../../constants/constants'
import Spinner from '../../components/UI/Spinner/Spinner';
import { LOGIN_ERROR_MESSAGES } from '../../constants/constants';
import { updateObject, checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/actionCreators';

const Auth = (props) => {
  const [controls, setControls] = useState(registerForm);
  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    if (!props.building && props.authRedirectPath !== '/') {
      props.onSetAuthRedirectPath();
    }
  }, []);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, controls[controlName].validation),
        touched: true
      })
    });

    setControls(updatedControls);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignUp);
  }

  const switchAuthModeHandler = () => setIsSignUp(!isSignUp);

  const formElementsArray = [];

  for (const key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    });
  }

  const form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)} />
  ));

  const errorMessage = props.error
    ? <span className={styles.error}>{LOGIN_ERROR_MESSAGES[props.error.message]}</span>
    : null;

  const signUpLayout = props.loading
    ? <Spinner />
    : (<div className={styles.auth}>
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button buttonType="success">{isSignUp ? 'REGISTER' : 'LOG IN'}</Button>
      </form>
      <Button buttonType="danger" clicked={switchAuthModeHandler}>
        SWITCH TO {isSignUp ? 'LOG IN' : 'REGISTER'}
      </Button>
    </div>);

  const redirect = props.isAuthenticated ? <Redirect to={props.authRedirectPath} /> : signUpLayout;

  return redirect;
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  building: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);