import { nanoid } from 'nanoid';
const mongoose = require('mongoose');
import Creator from '../Model/Creator';
import Blog from '../Model/Blog';
const { comparePassword, encryptPassword } = require('../utils/bcryptUtils');
const { generateToken } = require('../utils/jwtUtils');
const commonResponse = require('../helper/index');

module.exports = async ({ input }) => {
  try {
    const { email, password } = input;

    if(!email || !password){
      throw new Error('login cridentials are required!');
    }

    const user = await Creator.findOne({ email: email });
    if (!user) {
      throw new Error('user not found!');
    }
    const checkPassword = comparePassword(password, user.password);
    if (!checkPassword) {
      throw new Error('Incorrect password!');
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
      // password: user.password,
    });

    // const result = { token: token};
    return commonResponse('success', {token: token, id: user._id, role: user.role }, null);
  } catch (error) {
    return commonResponse('error', null, error.message);
  }
};