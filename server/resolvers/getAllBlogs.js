import { nanoid } from 'nanoid';
const mongoose = require('mongoose');
import Creator from '../Model/Creator';
import Blog from '../Model/Blog';
const { comparePassword, encryptPassword } = require('../utils/bcryptUtils');
const { generateToken } = require('../utils/jwtUtils');
const commonResponse = require('../helper/index');

module.exports = async ({ page, limits, search }, context) => {
  try {
    let blogCount, blogs;
    let status = 'active';

    const contextResult = await context();

    if(contextResult){
      if(contextResult.role === 'Moderator'){
        status = 'pending';
        console.log('moderator');
      }
    }

    const perPage = parseInt(limits);
    const pageNumber = parseInt(page);
    // console.log(search);
    if (search === 'All') {
      blogs = await Blog.find({ status: status})
        .sort({
          blogName: 1,
        })
        .skip((pageNumber - 1) * perPage)
        .limit(perPage)
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
      blogCount = await Blog.countDocuments({ status: status });
    } else {
      blogs = await Blog.find({ stack: search, status: status })
        .sort({
          blogName: 1,
        })
        .skip((pageNumber - 1) * perPage)
        .limit(perPage)
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
      blogCount = await Blog.countDocuments({ stack: search, status: status });
    }
    // console.log(blogCount);
    if (!blogs || blogCount === 0) {
      throw new Error('Blogs not Found!');
    }
    // console.log(perPage, pageNumber);
    // console.log(blogCount);
    return commonResponse('success', { blogs, totalBlog: blogCount }, null);
  } catch (error) {
    return commonResponse('error', null, error.message);
  }
};
