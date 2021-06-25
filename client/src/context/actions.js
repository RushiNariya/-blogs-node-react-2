export const GET_BLOGS = 'GET_BLOGS';
export const GET_BLOGS_BY_ID = 'GET_BLOGS_BY_ID';
export const POST_BLOGS = 'POST_BLOGS';

export const getBlogsAction = (payload) => ({
  type: GET_BLOGS,
  payload,
});

export const getBlogByIdAction = (payload) => ({
  type: GET_BLOGS_BY_ID,
  payload,
});

export const postBlogsAction = (payload) => ({
  type: POST_BLOGS,
  payload,
});
