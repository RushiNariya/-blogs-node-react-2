// const mongoose = require('mongoose');
import Creator from '../Model/Creator';
import Blog from '../Model/Blog';
const commonResponse = require('../helper/index');
// const { comparePassword, encryptPassword } = require('./utils/bcryptUtils');
// const { generateToken } = require('./utils/jwtUtils');

module.exports = async ({ id }, context) => {
  try {
    // console.log(id);
    const contextResult = await context();
    if (contextResult) {
      if (!contextResult.role) {
        throw new Error('User is not authorized!');
      }
      // console.log(contextResult);
      const blog = await Blog.findById(id)
        .populate({
          path: 'creator',
          select: 'firstName lastName profession email',
        })
        .populate({
          path: 'comments',
          populate: {
            path: 'creatorId',
            select: 'firstName lastName profession email',
          },
        });

      if (!blog) {
        throw new Error('Blog not found!');
      }
      // console.log(blog);
      // return blog._doc;
      return commonResponse('success', blog._doc, null);
    } else {
      throw new Error('please login !!');
    }
  } catch (error) {
    return commonResponse('error', null, error.message);
    // console.log(error);
  }
};
