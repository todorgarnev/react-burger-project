import React, { Component } from 'react';
import styles from './Auth.module.css';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { registerForm } from '../../constants/constants'
import * as actions from '../../store/actions/actionCreators';

class Auth extends Component {
  state = {
    controls: registerForm,
    isSignUp: true
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };

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

    return (
      <div className={styles.auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button buttonType="success">SUBMIT</Button>
        </form>
        <Button buttonType="danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
});

export default connect(null, mapDispatchToProps)(Auth);