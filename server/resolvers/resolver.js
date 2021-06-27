import { nanoid } from 'nanoid';
const mongoose = require('mongoose');
import Creator from '../Model/Creator';
import Blog from '../Model/Blog';
const { comparePassword, encryptPassword } = require('../utils/bcryptUtils');
const { generateToken } = require('../utils/jwtUtils');
const commonResponse = require('../helper/index');
const getBlogById = require('./getBlogById');
const getAllBLogs = require('./getAllBlogs');
const createNewBlog = require('./createBlog');
const getAllBlogsByCreator = require('./getBlogsByCreator');
const createNewCreator = require('./createCreator');
const getAllCreators = require('./getCreators');
const loginCurrentUser = require('./loginUser');
const toggleLikes = require('./toggleLike');
const addComments = require('./addComment');
const deleteBlogById = require('./deleteBlog');
const certifyBlogByModerator = require('./certifyBlogByModerator');

const resolvers = {
  getBlog: getBlogById,
  getBlogs: getAllBLogs,
  createBlog: createNewBlog,
  getBlogsByCreator: getAllBlogsByCreator,
  createCreator: createNewCreator,
  getCreators: getAllCreators,
  loginUser: loginCurrentUser,
  toggleLike: toggleLikes,
  addComment: addComments,
  deleteBlog: deleteBlogById,
  certifyBlog: certifyBlogByModerator,
};

export default resolvers;

// async ({ id }, context) => {
//   try {
//     const contextResult = await context();
//     if (contextResult) {
//       const blog = await Blog.findById(id).populate({
//         path: 'creator',
//         select: 'firstName lastName profession email',
//       }).populate({
//         path: 'comments',
//         populate:{
//           path: 'creatorId',
//           select: 'firstName lastName profession email',
//         }
//       });
//       // return blog._doc;
//       return commonResponse('success', blog._doc, null);
//     } else {
//       throw new Error('please login !!');
//     }
//   } catch (error) {
//     return commonResponse('error', null, error.message);
//     // console.log(error);
//   }
// }

// async ({ page, limits, search }) => {
//   try {
//     let blogCount, blogs;
//     const perPage = parseInt(limits);
//     const pageNumber = parseInt(page);
//     // console.log(search);
//     if(search === 'All'){
//       blogs = await Blog.find({}).sort({
//         blogName: 1
//       }).skip((pageNumber-1)*perPage).limit(perPage).populate({
//         path: 'creator',
//         select: 'firstName lastName profession email',
//       }).populate({
//         path: 'comments',
//         populate:{
//           path: 'creatorId',
//           select: 'firstName lastName profession email',
//         }
//       });
//       blogCount = await Blog.countDocuments({});
//     }
//     else{
//       blogs = await Blog.find({ stack: search }).sort({
//         blogName: 1
//       }).skip((pageNumber-1)*perPage).limit(perPage).populate({
//         path: 'creator',
//         select: 'firstName lastName profession email',
//       }).populate({
//         path: 'comments',
//         populate:{
//           path: 'creatorId',
//           select: 'firstName lastName profession email',
//         }
//       });
//       blogCount = await Blog.countDocuments({ stack: search });
//     }
//     // console.log(perPage, pageNumber);
//     // console.log(blogCount);
//     return commonResponse('success', {blogs, totalBlog: blogCount}, null);
//   } catch (error) {
//     return commonResponse('error', null, error.message);
//   }
// }

// async ({ input }, context) => {
//   try {
//     const contextResult = await context();
//     if (contextResult) {
//       console.log(contextResult);
//       const { blogName, stack, description, creator } = input;
//       const blog = new Blog({
//         creator: contextResult.creatorId,
//         blogName: blogName,
//         stack: stack,
//         likes: [],
//         comments:[],
//         description: description,
//       });
//       const newBlog = await blog.save();
//       return commonResponse('created', newBlog, null);
//     } else {
//       throw new Error('please login !!');
//     }
//   } catch (error) {
//     return commonResponse('error', null, error.message);
//   }
// }

// async ({ id }, context) => {
//   try {
//     const contextResult = await context();
//     if (contextResult) {
//       const result = await Blog.find({ creator: id }).populate({
//         path: 'creator',
//         select: 'firstName lastName profession email password',
//       });
//       // return result;
//       return commonResponse('success', result, null);
//     } else {
//       throw new Error('please login !!');
//     }
//   } catch (error) {
//     return commonResponse('error', null, error.message);
//   }
// }

// async ({ input }) => {
//   try {
//     console.log(input);
//     const { firstName, lastName, email, profession, password } = input;

//     const hashPassword = encryptPassword(password);

//     const creator = new Creator({
//       firstName: firstName,
//       lastName: lastName,
//       profession: profession,
//       email: email,
//       password: hashPassword,
//     });
//     const newCreator = await creator.save();
//     return commonResponse('created', newCreator, null);
//   } catch (error) {
//     return commonResponse('error', null, error.message);
//   }

// async (_, context) => {
//   try {
//     const contextResult = await context();
//     if (contextResult) {
//       const creators = await Creator.find({});
//       return commonResponse('success', creators, null);
//     } else {
//       throw new Error('please login !!');
//     }
//   } catch (error) {
//     return commonResponse('error', null, error.message);
//   }
// }

// async ({ input }) => {
//   try {
//     const { email, password } = input;
//     const user = await Creator.findOne({ email: email });
//     if (!user) {
//       throw new Error('user not fonnd');
//     }
//     const checkPassword = comparePassword(password, user.password);
//     if (!checkPassword) {
//       throw new Error('wrong password found');
//     }

//     const token = generateToken({
//       id: user._id,
//       email: user.email,
//       password: user.password,
//     });

//     // const result = { token: token};
//     return commonResponse('success', {token: token, id: user._id}, null);
//   } catch (error) {
//     return commonResponse('error', null, error.message);
//   }
// }

// async ({ input }, context) => {
//   try {
//     const contextResult = await context();
//     if (contextResult) {
//       const creatorId = contextResult.creatorId;
//       const { blogId } = input;
//       const creator = await Creator.findOne({ _id: creatorId });
//       if (!creator) {
//         throw new Error('user not found');
//       }
//       const blog = await Blog.findById(blogId);
//       if (!blog) {
//         throw new Error('blog not found');
//       }
//       // console.log("creatorId:", creatorId);
//       // console.log("like Id:", blog.likes[0]._id);
//       if (blog && blog.likes.find((like) => like._id.toString() === creatorId.toString())) {
//         // console.log("matching");
//         blog.likes = blog.likes.filter((like) => like._id.toString() !== creatorId.toString());
//       } else {
//         // console.log("not matching");
//         blog.likes.push(creatorId);
//       }
//       const updatedBlog = await blog.save();
//       return commonResponse('success', updatedBlog, null);
//     } else {
//       throw new Error('please login !!');
//     }
//   } catch (error) {
//     return commonResponse('error', null, error.message);
//   }
// }

// async ({ input }, context) => {
//   try {
//     const contextResult = await context();
//     if (contextResult) {
//       const creatorId = contextResult.creatorId;
//       const { blogId, comment } = input;
//       const creator = await Creator.findOne({ _id: creatorId });
//       if (!creator) {
//         throw new Error('user not found');
//       }
//       const blog = await Blog.findById(blogId);
//       if (!blog) {
//         throw new Error('blog not found');
//       }
//       blog.comments.push({
//         creatorId: creatorId,
//         comment: comment,
//       });
//       const updatedBlog = await blog.save();
//       const result = await Blog.findById(blogId).populate({
//         path: 'comments',
//         populate:{
//           path: 'creatorId',
//           select: 'firstName lastName profession email',
//         }
//       });
//       console.log(updatedBlog);
//       return commonResponse('success', result, null);
//     } else {
//       throw new Error('please login !!');
//     }
//   } catch (error) {
//     return commonResponse('error', null, error.message);
//   }
// }
