const User = require('../models/user.model');
// const path = require('path');
// const fs = require('fs').promises;

// require('dotenv').config();

// Get profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err });
  }
};
