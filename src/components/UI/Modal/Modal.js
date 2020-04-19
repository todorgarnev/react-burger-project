import React from 'react';
import styles from './Modal.module.css';

import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => (
  <React.Fragment>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div className={`${styles.modal} ${props.show ? styles.show : ''}`}>
      {props.children}
    </div>
  </React.Fragment>
);

export default Modal;