import React, { Component } from 'react';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { contactForm } from '../../../constants/constants';

class ContactData extends Component {
  state = {
    orderFrom: contactForm,
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

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderFrom,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderFrom: updatedOrderForm });
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
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
        <Button buttonType="success">ORDER</Button>
      </form>;

    return (
      <div className={styles.contactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;