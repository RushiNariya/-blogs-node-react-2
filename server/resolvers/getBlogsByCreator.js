import { nanoid } from 'nanoid';
const mongoose = require('mongoose');
import Creator from '../Model/Creator';
import Blog from '../Model/Blog';
const { comparePassword, encryptPassword } = require('../utils/bcryptUtils');
const { generateToken } = require('../utils/jwtUtils');
const commonResponse = require('../helper/index');

module.exports = async ({ page, limits, search }, context) => {
  try {
    const contextResult = await context();
    if (contextResult) {
      // console.log(contextResult);
      if (contextResult.role !== 'Author') {
        throw new Error('User is not authorized!');
      }

      let blogCount, blogs;
      const perPage = parseInt(limits);
      const pageNumber = parseInt(page);
      console.log(perPage, pageNumber, search);
      if (search === 'All') {
        blogs = await Blog.find({
          creator: contextResult.creatorId,
        })
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

        blogCount = await Blog.countDocuments({
          creator: contextResult.creatorId,
        });
      } else {
        blogs = await Blog.find({
          creator: contextResult.creatorId,
          stack: search,
        })
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

        blogCount = await Blog.countDocuments({
          creator: contextResult.creatorId,
          stack: search,
        });
      }

      if (!blogs || blogCount === 0) {
        throw new Error('Blogs not Found!');
      }
      console.log(blogs);
      return commonResponse(
        'success',
        { blogs: blogs, totalBlog: blogCount },
        null
      );
    } else {
      throw new Error('please login !!');
    }
  } catch (error) {
    return commonResponse('error', null, error.message);
  }
};
