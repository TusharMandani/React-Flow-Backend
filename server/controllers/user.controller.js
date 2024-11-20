const User = require('../models/user.model');

// Register new user

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Login user
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  

module.exports = { registerUser, loginUser };