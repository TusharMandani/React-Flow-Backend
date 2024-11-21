const { body } = require('express-validator');

const registerValidation = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
];
const forgotPasswordValidation = [
  body('email').isEmail().withMessage('Invalid email format'),
];

module.exports = {
  registerValidation,
  loginValidation,
  forgotPasswordValidation
};
