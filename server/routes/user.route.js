const express = require('express');
const { registerUser, loginUser } = require('../controllers/user.controller');
const { registerValidation, loginValidation } = require('../validations/user.validation');
const handleValidationErrors = require('../middleware/userValidation.middleware');
const authenticateToken = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes

router.post('/register', registerValidation, handleValidationErrors,registerUser);
router.post('/login',loginValidation, handleValidationErrors, loginUser);

// Protected route example

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.name}` });
});

module.exports = router;
