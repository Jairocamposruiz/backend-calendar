const boom = require('@hapi/boom');

const { isValidJwt } = require('../helpers/utilJwt');


const validateJwt = (req, res, next) => {
  try {
    const token = req.header('x-token');
    if(!token) throw boom.unauthorized('Token is required');

    const payload = isValidJwt(token);
    if(!payload) throw boom.unauthorized('Token is not valid');

    req.tokenPayload = payload;

    next();
  } catch ( error ) {
    next(error);
  }


}

module.exports = {
  validateJwt
}