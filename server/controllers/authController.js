// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone, role_id } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Validate role_id exists
    const role = await Role.findById(role_id);
    if (!role) {
      return res.status(400).json({ message: 'Role not found' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone,
      role_id: role._id,
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: role.role_name }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: parseInt(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: 'User registered successfully', user: { id: user._id, email, role: role.role_name } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).populate('role_id');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role_id.role_name }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: parseInt(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: 'Login successful', user: { id: user._id, email, role: user.role_id.role_name } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};

const verifyEmail = async (req, res) => {
  try {
    const { email, email_otp } = req.body;
    const user = await User.findOne({ email, email_otp });
    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.email_verified = true;
    user.email_otp = null;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add to authController.js
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('role_id');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ id: user._id, email: user.email, role: user.role_id.role_name });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { register, login, logout, verifyEmail, getMe };

