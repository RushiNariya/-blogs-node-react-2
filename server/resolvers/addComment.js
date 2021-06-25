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
      const creatorId = contextResult.creatorId;
      const creatorRole = contextResult.role;
      const { blogId, comment } = input;
      const creator = await Creator.findOne({ _id: creatorId, role: creatorRole });
      if (!creator) {
        throw new Error('user not found');
      }
      const blog = await Blog.findById(blogId);
      if (!blog) {
        throw new Error('blog not found');
      }
      blog.comments.push({
        creatorId: creatorId,
        comment: comment,
      });
      const updatedBlog = await blog.save();
      const result = await Blog.findById(blogId).populate({
        path: 'comments',
        populate:{
          path: 'creatorId',
          select: 'firstName lastName profession email',
        }
      });
      console.log(updatedBlog);
      return commonResponse('success', result, null);
    } else {
      throw new Error('please login !!');
    }
  } catch (error) {
    return commonResponse('error', null, error.message);
  }
};