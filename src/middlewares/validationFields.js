const { validationResult, body, check } = require('express-validator');
const moment = require('moment');

const validationFields = (req, res, next) => {
  const errors = validationResult(req);
  const listErrors = errors.errors.map(error => {
    return {
      statusCode: 400,
      ...error,
      value: 'Bad Request'
    }
  })
  if ( !errors.isEmpty() ) {
    return res.status(400).json({
      ok: false,
      errors: listErrors
    });
  }
  next();
};

const isDate = (value) => {
  if(!value) return false;
  const date = moment(value);
  return date.isValid();
}

const isMongoId = (value) => {
  if(!value) return false;
  return value.match(/^[0-9a-fA-F]{24}$/);
}


const checkEmail = body('email', 'The email is required').isEmail();

const checkPassword = body('password', 'The password must be longer than 6 characters').isLength({ min: 6 });

const checkName = body('name', 'The name is required').isString().not().isEmpty();

const checkMongoId = check('id', 'Id is required and need to be a mongoId').custom(isMongoId);

const checkTitle = body('title', 'Title is required and need to be a string').isString().not().isEmpty();

const checkNotes = body('notes', 'Notes need to be a string').isString().optional();

const checkStart = body('start', 'Start is required and need to be a Date').custom(isDate);

const checkEnd = body('end', 'End is required and need to be a Date').custom(isDate);

module.exports = {
  validationFields,
  checkEmail,
  checkPassword,
  checkName,
  checkMongoId,
  checkTitle,
  checkNotes,
  checkStart,
  checkEnd
};