const User = require('../models/User');
const { encryptPassword, isSamePassword } = require('../helpers/utilEncrypt');

const emailAlreadyExists = async (email) => {
  const user = await User.findOne({ email });
  return !!user;
};

const createNewUser = async (userDto) => {
  const user = new User(userDto);
  user.password = encryptPassword(userDto.password);
  return await user.save();
};

const areCorrectCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if ( !user ) return null;

  const hash = user.password;
  if ( isSamePassword(password, hash) ) {
    return user;
  } else {
    return null;
  }
};

module.exports = {
  emailAlreadyExists,
  createNewUser,
  areCorrectCredentials,
};