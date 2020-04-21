import React, { Component } from 'react';
import styles from './Modal.module.css';

import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className={`${styles.modal} ${this.props.show ? styles.show : ''}`}>
          {this.props.children}
        </div>
      </React.Fragment>
    )
  }
}

export default Modal;