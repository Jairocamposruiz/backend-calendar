const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');

const config = require('../config');

const secret = config.app.secretJwt;

const generateJwt = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, {
        expiresIn: '2h',
      }, (error, token) => {
        if ( error ) reject(new Error('The token could not be generated'));
        resolve(token);
      },
    );
  });
};

const isValidJwt = (token) => {
  try {
    const payload = jwt.verify(token, secret);
    if ( !payload ) return null;
    return payload;
  } catch ( error ) {
    throw boom.unauthorized('Token is not valid');
  }
};

module.exports = {
  generateJwt,
  isValidJwt,
};