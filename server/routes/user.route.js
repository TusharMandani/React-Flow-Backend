const express = require('express');
const { registerUser, loginUser } = require('../controllers/user.controller');
// const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route example

// router.get('/profile', authenticateToken, (req, res) => {
//   res.json({ message: `Welcome, ${req.user.name}` });
// });

module.exports = router;
