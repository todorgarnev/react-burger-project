import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withHandlerError = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);

    const requestInterceptor = axios.interceptors.request.use(req => {
      setError(null);
      return req;
    });
    const responseInterceptor = axios.interceptors.response.use(res => res, err => setError(err));
    const errorConfirmedHandler = () => setError(null);

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      };
    }, [requestInterceptor, responseInterceptor]);

    return (
      <React.Fragment>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error && error.error}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  }
}

export default withHandlerError;