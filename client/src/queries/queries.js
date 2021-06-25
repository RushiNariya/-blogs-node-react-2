import { gql } from '@apollo/client';

const getBlogsQuery = gql`
  {
    getBlogs {
      id
      blogName
      language
      stack
      description
      creator {
        firstName
        lastName
        experience
        profession
      }
    }
  }
`;

const addBlogMutation = gql`
  mutation (
    $blogName: String!
    $stack: Stack!
    $language: String!
    $firstName: String!
    $lastName: String!
    $experience: Int!
    $profession: String!
    $description: String!
  ) {
    createBlog(
      input: {
        blogName: $blogName
        stack: $stack
        language: $language
        description: $description
        creator: {
          firstName: $firstName
          lastName: $lastName
          experience: $experience
          profession: $profession
        }
      }
    ) {
      blogName
      id
    }
  }
`;

const getBlogQuery = gql`
  query ($id: ID) {
    getBlog(id: $id) {
      blogName
      language
      stack
      description
      id
      creator {
        firstName
        lastName
        profession
        experience
      }
    }
  }
`;

export { getBlogsQuery, addBlogMutation, getBlogQuery };
