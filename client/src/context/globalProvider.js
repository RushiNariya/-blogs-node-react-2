import React, { createContext, useReducer } from 'react';
import { getBlogsAction, postBlogsAction, getBlogByIdAction } from './actions';
import { reducer } from './reducer';

const initialState = {
  articles: [],
  article: null,
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
  const postBlog = (payload) => {
    dispatch(postBlogsAction(payload));
  };
  return (
    <GlobalContext.Provider
      value={{
        articles: state.articles,
        article: state.article,
        getBlogs,
        postBlog,
        getBlogById,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
