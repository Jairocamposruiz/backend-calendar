const boom = require('@hapi/boom');

const { emailAlreadyExists, createNewUser, areCorrectCredentials } = require('../services/authService');
const { generateJwt } = require('../helpers/utilJwt');

const createUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    if ( await emailAlreadyExists(email) ) throw boom.badRequest('The email already exists');
    const newUser = await createNewUser(req.body);

    res.status(201).json({
      ok: true,
      msg: 'New User was created',
      user: newUser,
    });
  } catch ( error ) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await areCorrectCredentials(email, password);
    if ( !user ) throw boom.unauthorized('Password or email is wrong');

    const token = await generateJwt({ name: user.name, id: user.id });

    res.json({
      ok: true,
      msg: 'Login was successful',
      token,
      user
    });
  } catch ( error ) {
    next(error);
  }
};

const renewToken = async (req, res, next) => {
  try {
    const { name , id } = req.tokenPayload;
    const newToken = await generateJwt({name, id});

    res.json({
      ok: true,
      msg: 'The token was successfully renewed',
      token: newToken
    });
  } catch ( error ) {
    next(error);
  }
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};