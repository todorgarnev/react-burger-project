import React, { Component } from 'react';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Todor Todorakis',
        address: {
          street: 'Test street',
          zipCode: 2900
        },
        email: 'test@test.com',
        deliveryMethod: 'fastest'
      }
    };

    this.setState({ loading: true });

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => this.setState({ loading: false }));
  }

  render() {
    const form = this.state.loading ?
      <Spinner /> :
      <form>
        <input className={styles.input} type="text" name="name" placeholder="Your name" />
        <input className={styles.input} type="email" name="email" placeholder="Your email" />
        <input className={styles.input} type="text" name="street" placeholder="Your street" />
        <input className={styles.input} type="text" name="zipCode" placeholder="Your zip code" />
        <Button buttonType="success" clicked={this.orderHandler}>ORDER</Button>
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