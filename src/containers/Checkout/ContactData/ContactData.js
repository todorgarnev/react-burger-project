import React, { Component } from 'react';
import styles from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: ''
    }
  }

  render() {
    return (
      <div className={styles.contactData}>
        <h4>Enter your contact data</h4>
        <form>
          <input className={styles.input} type="text" name="name" placeholder="Your name" />
          <input className={styles.input} type="email" name="email" placeholder="Your email" />
          <input className={styles.input} type="text" name="street" placeholder="Your street" />
          <input className={styles.input} type="text" name="zipCode" placeholder="Your zip code" />
          <Button buttonType="success">ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;