const { Router } = require('express');

const { createUser, loginUser, renewToken } = require('../controllers/authController');
const { validationFields, checkEmail, checkPassword, checkName } = require('../middlewares/validationFields');
const { validateJwt } = require('../middlewares/validateJwt');


const router = Router();

router.post(
  '/new',
  [
    checkPassword,
    checkName,
    checkEmail,
    validationFields,
  ],
  createUser,
);

router.post(
  '/',
  [
    checkEmail,
    checkPassword,
    validationFields,
  ],
  loginUser,
);

router.get(
  '/renew',
  [
    validateJwt
  ],
  renewToken,
);

module.exports = router;