import { nanoid } from 'nanoid';
const mongoose = require('mongoose');
import Creator from '../Model/Creator';
import Blog from '../Model/Blog';
const { comparePassword, encryptPassword } = require('../utils/bcryptUtils');
const { generateToken } = require('../utils/jwtUtils');
const commonResponse = require('../helper/index');

module.exports = async ({ input }, context) => {
  try {
    const contextResult = await context();
    if (contextResult) {
      console.log(contextResult);
      if (contextResult.role !== 'Author') {
        throw new Error('User is not authorized!');
      }
      const { blogName, stack, description, creator } = input;
      const blog = new Blog({
        creator: contextResult.creatorId,
        blogName: blogName,
        stack: stack,
        likes: [],
        comments: [],
        description: description,
      });
      const newBlog = await blog.save();
      return commonResponse('created', newBlog, null);
    } else {
      throw new Error('please login !!');
    }
  } catch (error) {
    return commonResponse('error', null, error.message);
  }
};
