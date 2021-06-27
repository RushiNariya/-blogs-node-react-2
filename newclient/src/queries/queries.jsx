import { gql } from '@apollo/client';

const getBlogsQuery = gql`
  query ($page: Int, $limits: Int, $search: String) {
    getBlogs(page: $page, limits: $limits, search: $search) {
      status
      data {
        blogs {
          _id
          creator {
            _id
            firstName
            lastName
          }
          blogName
          stack
          image
          description
          likes {
            _id
          }
          comments {
            creatorId {
              firstName
              lastName
            }
            comment
          }
        }
        totalBlog
      }
      error
    }
  }
`;

const getBlogsByCreatorQuery = gql`
  query ($page: Int, $limits: Int, $search: String) {
    getBlogsByCreator(page: $page, limits: $limits, search: $search) {
      status
      data {
        blogs {
          _id
          creator {
            _id
            firstName
            lastName
          }
          blogName
          stack
          status
          image
          description
          likes {
            _id
          }
          comments {
            creatorId {
              firstName
              lastName
            }
            comment
          }
        }
        totalBlog
      }
      error
    }
  }
`;

const getBlogQuery = gql`
  query ($id: ID) {
    getBlog(id: $id) {
      status
      data {
        blogName
        stack
        image
        description
        likes {
          _id
        }
        comments {
          creatorId {
            firstName
            lastName
          }
          comment
        }
        creator {
          firstName
          lastName
          profession
          email
        }
      }
      error
    }
  }
`;

const loginUserMutation = gql`
  mutation ($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
      status
      data {
        token
        role
        id
      }
      error
    }
  }
`;

const toggleLikeMutation = gql`
  mutation ($blogId: String!) {
    toggleLike(input: { blogId: $blogId }) {
      status
      data {
        _id
        likes {
          _id
        }
      }
      error
    }
  }
`;

const addCommentMutation = gql`
  mutation ($blogId: String!, $comment: String!) {
    addComment(input: { blogId: $blogId, comment: $comment }) {
      status
      data {
        _id
        creator {
          firstName
          lastName
          role
        }
        blogName
        stack
        image
        likes {
          _id
        }
        comments {
          creatorId {
            firstName
            lastName
          }
          comment
        }
      }
    }
  }
`;

const registerUserMutation = gql`
  mutation (
    $userId: ID!
    $firstName: String!
    $lastName: String!
    $profession: String!
    $email: String!
    $password: String!
    $role: Role!
  ) {
    createCreator(
      input: {
        userId: $userId
        firstName: $firstName
        lastName: $lastName
        profession: $profession
        email: $email
        password: $password
        role: $role
      }
    ) {
      status
      data {
        firstName
        lastName
        email
        role
      }
      error
    }
  }
`;

const addBlogMutation = gql`
  mutation (
    $blogName: String!
    $stack: Stack!
    $description: String!
    $status: String!
  ) {
    createBlog(
      input: {
        blogName: $blogName
        stack: $stack
        description: $description
        status: $status
      }
    ) {
      status
      data {
        _id
        creator {
          firstName
          role
        }
        blogName
        image
      }
      error
    }
  }
`;

const deleteBlogMutation = gql`
  mutation ($id: ID) {
    deleteBlog(id: $id) {
      status
      error
      data {
        _id
        creator {
          firstName
        }
        description
        likes {
          _id
        }
        comments {
          creatorId {
            firstName
            lastName
          }
          comment
        }
        status
      }
    }
  }
`;
const certifyBlogMutation = gql`
  mutation ($id: ID, $status: String!) {
    certifyBlog(id: $id, status: $status) {
      status
      error
      data {
        _id
        creator {
          firstName
        }
        description
        likes {
          _id
        }
        comments {
          creatorId {
            firstName
            lastName
          }
          comment
        }
        status
      }
    }
  }
`;

export {
  getBlogsQuery,
  getBlogQuery,
  loginUserMutation,
  registerUserMutation,
  addBlogMutation,
  toggleLikeMutation,
  addCommentMutation,
  getBlogsByCreatorQuery,
  deleteBlogMutation,
  certifyBlogMutation,
};
