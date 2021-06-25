const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
import Creator from '../Model/Creator';

const generateToken = (payload) => {
  const userInfo = {
    id: payload.id,
    email: payload.email,
    role: payload.role
    // password: payload.password,
  };
  // console.log(userInfo);
  const token = jwt.sign(userInfo, 'rushinariya', {
    algorithm: 'HS256',
    expiresIn: '4h',
  });
  return token;
};

const ensureToken = async (req) => {
  const bearerHeader = req.headers.authorization || null;
  // console.log(bearerHeader);
  if (bearerHeader) {
    const token = bearerHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, 'rushinariya');
      // console.log('--------------------');
      // console.log(decoded);

      const user = await Creator.findOne({ email: decoded.email });

      if (user) {
        return { creatorId: user._id, role: user.role, };
      } else {
        throw new Error('user not exists!');
      }
    } catch (error) {
      throw new Error('Error occured!!');
    }
  } else {
    return null;
  }
};

module.exports = { generateToken, ensureToken };
