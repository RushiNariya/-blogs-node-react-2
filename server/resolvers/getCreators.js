import { nanoid } from 'nanoid';
const mongoose = require('mongoose');
import Creator from '../Model/Creator';
import Blog from '../Model/Blog';
const { comparePassword, encryptPassword } = require('../utils/bcryptUtils');
const { generateToken } = require('../utils/jwtUtils');
const commonResponse = require('../helper/index');

module.exports = async (_, context) => {
  try {
    const contextResult = await context();
    if (contextResult) {

      if (contextResult.role !== 'Admin') {
        throw new Error('User is not authorized!');
      }

      const creators = await Creator.find({ role: 'Author'});

      if(!creators){
        throw new Error('no authors found');
      }
      return commonResponse('success', creators, null);
    } else {
      throw new Error('please login !!');
    }
  } catch (error) {
    return commonResponse('error', null, error.message);
  }
};