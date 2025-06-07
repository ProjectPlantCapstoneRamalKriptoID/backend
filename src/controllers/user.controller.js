const User = require('../models/user.model');
const cloudinary = require('cloudinary').v2;

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

    // Update name & email if provided
    if (name) user.name = name;
    if (email) user.email = email;

    // Update in cloudinary
    if (req.files?.profileImages) {
      // Delete old images from Cloudinary
      for (const oldImage of user.profileImages) {
        try {
          await cloudinary.uploader.destroy(oldImage.public_id);
        } catch (err) {
          console.warn(
            `[WARNING] Failed to delete image ${oldImage.public_id} from Cloudinary:`,
            err.message
          );
        }
      }

      // Save new images
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

// Delete photo profile
exports.deletePhotoProfile = async (req, res) => {
  const public_id = req.query.public_id;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Delete in cloudinary
    await cloudinary.uploader.destroy(public_id);

    // Delete in database
    const profileImages = user.profileImages.filter(
      (image) => image.public_id !== public_id
    );

    user.profileImages = profileImages;
    await user.save();

    res.status(200).json({
      message: 'Profile image deleted successfully',
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', err });
  }
};
