import React, { Component } from 'react';
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

class Auth extends Component {
  state = {
    controls: registerForm,
    isSignUp: true
  };

  componentDidMount() {
    if (!this.props.building && this.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    });

    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => ({
      isSignUp: !prevState.isSignUp
    }));
  };

  render() {
    const formElementsArray = [];

    for (const key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
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
        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
    ));

    const errorMessage = this.props.error
      ? <span className={styles.error}>{LOGIN_ERROR_MESSAGES[this.props.error.message]}</span>
      : null;

    const signUpLayout = this.props.loading
      ? <Spinner />
      : (<div className={styles.auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button buttonType="success">SUBMIT</Button>
        </form>
        <Button buttonType="danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </div>);

    const redirect = this.props.isAuthenticated ? <Redirect to={this.props.authRedirectPath} /> : signUpLayout;

    return redirect;
  }
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