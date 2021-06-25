import {
  GET_BLOGS,
  USER_LOGIN,
  USER_REGISTRATION,
  REFRESH_STATE,
  USER_LOGOUT,
  GET_BLOG_BY_ID,
  RESET_ERROR,
  SET_ERROR,
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        articles: action.payload,
      };
    case GET_BLOG_BY_ID:
      return {
        ...state,
        article: action.payload,
      };
    case USER_LOGIN:
      return {
        ...state,
        userId: action.payload.id,
        token: action.payload.token,
        role: action.payload.role,
      };
    case USER_REGISTRATION:
      return {
        ...state,
      };
    case REFRESH_STATE:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        role: action.payload.role,
      };
    case USER_LOGOUT:
      localStorage.removeItem('state');
      return {
        ...state,
        article: null,
        userId: null,
        token: null,
        role: null,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: '',
      };
    default:
      return {
        ...state,
      };
  }
};
