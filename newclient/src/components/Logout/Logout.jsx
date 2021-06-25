import React, { useContext, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/globalProvider';

function Logout() {
  const client = useApolloClient();
  const { userLogout } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    client.clearStore();
    userLogout();
    history.replace('/login');
  }, []);

  return <></>;
}

export default Logout;
