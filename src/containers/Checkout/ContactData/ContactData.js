import React, { useState } from 'react';
import styles from './ContactData.module.css';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withHandlerError/withHandlerError';
import { contactForm } from '../../../constants/constants';
import { updateObject, checkValidity } from '../../../shared/utility';
import * as actions from '../../../store/actions/actionCreators';

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState(contactForm);
  const [isFormValid, setIsFormValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    let order = {};

    for (const formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData,
      userId: props.userId
    };

    props.onOrderBurger(order, props.token);
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
      touched: true
    });
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement
    });
    let formIsValid = true;

    for (const inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setIsFormValid(formIsValid)
  }

  const formElementsArray = [];

  for (const key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    });
  }

  const form = props.loading ?
    <Spinner /> :
    <form onSubmit={orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => inputChangedHandler(event, formElement.id)} />
      ))}
      <Button buttonType="success" disabled={!isFormValid}>ORDER</Button>
    </form>;

  return (
    <div className={styles.contactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  );
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));