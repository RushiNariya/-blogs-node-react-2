import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getBlogsAction,
  getBlogByIdAction,
  userLoginAction,
  userRegistrationAction,
  refreshStateAction,
  userLogoutAction,
  setErrorAction,
  resetErrorAction,
} from './actions';
import { reducer } from './reducer';

const initialState = {
  articles: [],
  article: null,
  token: null,
  userId: null,
  role: null,
  error: '',
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getBlogs = (payload) => {
    dispatch(getBlogsAction(payload));
  };
  const getBlogById = (payload) => {
    dispatch(getBlogByIdAction(payload));
  };
  const userLogin = (payload) => {
    dispatch(userLoginAction(payload));
  };
  const userLogout = (payload) => {
    dispatch(userLogoutAction(payload));
  };
  const userRegistration = (payload) => {
    dispatch(userRegistrationAction(payload));
  };
  const errorHandler = (payload) => {
    dispatch(setErrorAction(payload));
  };
  const resetSetErrorHandler = () => {
    dispatch(resetErrorAction());
  };

  function refreshState() {
    const refreshedState = localStorage.getItem('state')
      ? JSON.parse(localStorage.getItem('state'))
      : { token: state.token, userId: state.userId, role: state.role };
    dispatch(refreshStateAction(refreshedState));
  }

  useEffect(() => {
    refreshState();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'state',
      JSON.stringify({ token: state.token, userId: state.userId, role: state.role }),
    );
    // localStorage.setItem('state', JSON.stringify(state.userId));
  }, [state]);
  return (
    <GlobalContext.Provider
      value={{
        articles: state.articles,
        article: state.article,
        token: state.token,
        userId: state.userId,
        error: state.error,
        role: state.role,
        getBlogs,
        getBlogById,
        userLogin,
        userLogout,
        userRegistration,
        resetSetErrorHandler,
        errorHandler,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
