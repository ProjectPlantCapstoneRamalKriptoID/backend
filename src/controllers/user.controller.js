const User = require('../models/user.model');

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

// Update profile
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body || {};

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update name & email jika disediakan
    if (name) user.name = name;
    if (email) user.email = email;

    // Update profileImages dari Cloudinary
    if (req.files?.profileImages) {
      user.profileImages = req.files.profileImages.map((file) => ({
        url: file.path,
        filename: file.filename,
        public_id: file.public_id || file.filename,
      }));
    }

    await user.save();
    res.status(200).json({
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err });
  }
};
