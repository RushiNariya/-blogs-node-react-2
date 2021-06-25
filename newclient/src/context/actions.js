export const GET_BLOGS = 'GET_BLOGS';
export const GET_BLOG_BY_ID = 'GET_BLOG_BY_ID';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REGISTRATION = 'USER_REGISTRATION';
export const REFRESH_STATE = 'REFRESH_STATE';
export const SET_ERROR = 'SET_ERROR';
export const RESET_ERROR = 'RESET_ERROR';

export const getBlogsAction = (payload) => ({
  type: GET_BLOGS,
  payload,
});

export const getBlogByIdAction = (payload) => ({
  type: GET_BLOG_BY_ID,
  payload,
});

export const userLoginAction = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const userLogoutAction = (payload) => ({
  type: USER_LOGOUT,
  payload,
});

export const userRegistrationAction = (payload) => ({
  type: USER_REGISTRATION,
  payload,
});

export const refreshStateAction = (payload) => ({
  type: REFRESH_STATE,
  payload,
});

export const setErrorAction = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const resetErrorAction = () => ({
  type: SET_ERROR,
});
