const bcrypt = require('bcrypt');

const encryptPassword = (password) => bcrypt.hashSync(password, parseInt(10, 10));

const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
  comparePassword,
  encryptPassword,
};
