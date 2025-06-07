module.exports = (app) => {
  const router = require('express').Router();
  const user = require('../controllers/user.controller');
  const { authentication } = require('../middleware/authentication.middleware');
  const { upload } = require('../configs/cloudinary.config');

  // Get user profile
  router.get('/profile', authentication(), (req, res) => {
    user.getProfile(req, res);
  });

  // Update user profile
  router.put(
    '/profile-update',
    authentication(),
    upload.fields([{ name: 'profileImages', maxCount: 1 }]),
    (req, res) => {
      user.updateProfile(req, res);
    }
  );

  //   // Delete user account
  //   router.delete(
  //     '/profile',
  //     authenticationMiddleware,
  //     userController.deleteAccount
  //   );

  app.use('/user', router);
};
