import { GET_BLOGS, POST_BLOGS, GET_BLOGS_BY_ID } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        articles: action.payload,
      };
    case GET_BLOGS_BY_ID:
      return {
        article: action.payload,
      };
    case POST_BLOGS:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
