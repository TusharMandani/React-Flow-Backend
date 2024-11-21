const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fs = require('fs');
const mjml = require('mjml');
const nodemailer = require('nodemailer');
const path = require('path');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Register new user

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const user = new User({ firstName, lastName, email, password, role });
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
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Generate a password reset token
    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const resetLink = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

    const mjmlFilePath = path.join(__dirname, '../templates/reset-password.mjml');
    const mjmlTemplate = fs.readFileSync(mjmlFilePath, 'utf-8');
    const { html } = mjml(mjmlTemplate.replace('{{resetLink}}', resetLink));

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Send email
    const mailOptions = {
      from: `"Your App" <${EMAIL_USER}>`,
      to: email,
      subject: 'Reset Your Password',
      html,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset link sent to your email' });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports = { registerUser, loginUser, forgotPassword };