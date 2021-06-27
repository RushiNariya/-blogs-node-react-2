/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-render-return */
import React, { useContext } from 'react';
import { GlobalContext } from '../context/globalProvider';
import Error from '../components/Error/Error';

// eslint-disable-next-line max-len
const Authorization = (allowedRoles) => (WrappedComponent) => function WithAuthorization() {
  const { role } = useContext(GlobalContext);
  console.log('inside hoc');
  if (allowedRoles.includes(role)) {
    console.log('inside hoc if');
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent />;
  }
  return <h1>No page for you!</h1>;
};

export default Authorization;
