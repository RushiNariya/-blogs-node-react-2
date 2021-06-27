import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Comment{
    creatorId: Creator
    comment: String
  }
  type Blog {
    _id: ID
    creator: Creator
    blogName: String
    stack: Stack
    description: String
    likes: [Creator]
    comments: [Comment]
    image: String
    status: String
  }
  type BlogsPage {
    blogs: [Blog!]!
    totalBlog: Int
  }

  type Creator {
    _id: ID
    firstName: String
    lastName: String
    role: Role
    profession: String
    email: String
    password: String
  }

  input Login{
    email: String
    password: String
  }

  enum Stack {
    Study
    Research
    Adventure
    Medical
    Programming
    Reviews
  }

  enum Role{
    Admin
    User
    Author
    Moderator
  }

  type GetBlogResponse{
    status: String
    data: Blog
    error: String
  }
  type GetAllBlogsResponse{
    status: String
    data: BlogsPage
    error: String
  }
  type GetAllBlogsByCreatorResponse{
    status: String
    data: BlogsPage
    error: String
  }
  type CreateCreatorResponse{
    status: String
    data: Creator
    error: String
  }
  type GetCreatorsResponse{
    status: String
    data: [Creator!]!
    error: String
  }
  type LoginResponseData{
    token: String
    id: String
    role: Role
  }
  type LoginResponse{
    status: String
    data: LoginResponseData
    error: String
  }
  type ToggleLikeResponse{
    status: String
    data: Blog
    error: String
  }
  type addCommentResponse{
    status: String
    data: Blog
    error: String
  }
  type deleteBlogResponse{
    status: String
    data: Blog
    error: String
  }
  type certifyBlog{
    status: String
    data: Blog
    error: String
  }
  type Query {
    getBlog(id: ID): GetBlogResponse
    getBlogs(page: Int, limits: Int, search: String): GetAllBlogsResponse
    getCreators: GetCreatorsResponse
    getBlogsByCreator(page: Int, limits: Int, search: String): GetAllBlogsResponse
  }

  input BlogInput{
    id: ID
    creator: String
    blogName: String
    stack: Stack
    description: String
    status: String
  }

  input CreatorInput{
    userId: ID
    role: Role
    firstName: String
    lastName: String
    profession: String
    email: String
    password: String
  }
  input ToggleLike{
    blogId: String
  }
  input addComment{
    blogId: String
    comment: String
  }
  type Mutation {
    createCreator(input: CreatorInput): CreateCreatorResponse
    createBlog(input: BlogInput): GetBlogResponse
    loginUser(input: Login): LoginResponse
    toggleLike(input: ToggleLike): ToggleLikeResponse
    addComment(input: addComment): addCommentResponse
    deleteBlog(id: ID) : deleteBlogResponse
    certifyBlog(id: ID, status: String): certifyBlog
  }
`);

export default schema;

// creator: [Creator]

// type Creator {
//   firstName: String
//   lastName: String
//   experience: Int
//   profession: String
// }

// creator: [CreatorInput]

// input CreatorInput{
//   firstName: String
//   lastName: String
//   experience: Int
//   profession: String
// }
