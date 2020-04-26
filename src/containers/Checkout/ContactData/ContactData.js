import React, { Component } from 'react';
import styles from './ContactData.module.css';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { contactForm } from '../../../constants/constants';

class ContactData extends Component {
  state = {
    orderFrom: contactForm,
    formIsValid: false,
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    let order = {};

    for (const formElementIdentifier in this.state.orderFrom) {
      formData[formElementIdentifier] = this.state.orderFrom[formElementIdentifier].value;
    }

    order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };

    this.setState({ loading: true });

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => this.setState({ loading: false }));
  }

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

  inputChangedHandler = (event, inputIdentifier) => {
    let formIsValid = true;
    const updatedOrderForm = {
      ...this.state.orderFrom,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    for (const inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderFrom: updatedOrderForm, formIsValid: formIsValid });
  }

  render() {
    const formElementsArray = [];

    for (const key in this.state.orderFrom) {
      formElementsArray.push({
        id: key,
        config: this.state.orderFrom[key]
      });
    }

    const form = this.state.loading ?
      <Spinner /> :
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
        <Button buttonType="success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>;

    return (
      <div className={styles.contactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.ingredients,
  price: state.totalPrice
});

export default connect(mapStateToProps)(ContactData);