module.exports = (app) => {
  const router = require('express').Router();
  const user = require('../controllers/user.controller');
  const { authentication } = require('../middleware/authentication.middleware');

  // Get user profile
  router.get('/profile', authentication(), (req, res) => {
    user.getProfile(req, res);
  });

  //   // Update user profile
  //   router.put(
  //     '/profile',
  //     authenticationMiddleware,
  //     userController.updateProfile
  //   );

  //   // Delete user account
  //   router.delete(
  //     '/profile',
  //     authenticationMiddleware,
  //     userController.deleteAccount
  //   );

  app.use('/user', router);
};
