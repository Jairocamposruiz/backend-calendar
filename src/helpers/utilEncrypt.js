const bcrypt = require('bcryptjs');

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const isSamePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  encryptPassword,
  isSamePassword,
};