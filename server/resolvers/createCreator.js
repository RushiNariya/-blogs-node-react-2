import { nanoid } from 'nanoid';
const mongoose = require('mongoose');
import Creator from '../Model/Creator';
import Blog from '../Model/Blog';
const { comparePassword, encryptPassword } = require('../utils/bcryptUtils');
const { generateToken } = require('../utils/jwtUtils');
const commonResponse = require('../helper/index');

module.exports = async ({ input }) => {
  try {
    // console.log(input);
    const { firstName, lastName, email, profession, password, role } = input;

    if(!firstName || !lastName || !email || !profession || !password || !role){
      throw new Error('registration cridentials are required!');
    }

    const checkCreator = await Creator.findOne({ email: email});

    if(checkCreator){
      throw new Error('User with this email already exists!');
    }

    const hashPassword = encryptPassword(password);

    const creator = new Creator({
      firstName: firstName,
      lastName: lastName,
      profession: profession,
      email: email,
      password: hashPassword,
      role: role,
    });
    const newCreator = await creator.save();

    return commonResponse('created', newCreator, null);
    
  } catch (error) {
    return commonResponse('error', null, error.message);
  }
};