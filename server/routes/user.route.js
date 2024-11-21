const express = require('express');
const { registerUser, loginUser, forgotPassword } = require('../controllers/user.controller');
const { registerValidation, loginValidation, forgotPasswordValidation } = require('../validations/user.validation');
const handleValidationErrors = require('../middleware/userValidation.middleware');
const authenticateToken = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes

router.post('/register', registerValidation, handleValidationErrors,registerUser);
router.post('/login',loginValidation, handleValidationErrors, loginUser);
router.post('/forgot-password',forgotPasswordValidation, handleValidationErrors, forgotPassword);

// Protected route example

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.role}` });
});

module.exports = router;
  