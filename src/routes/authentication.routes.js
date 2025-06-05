module.exports = (app) => {
  const router = require('express').Router();
  const authentication = require('../controllers/authentication.controller');
  // const blacklist = require('../middleware/authentication.middleware');
  const validation = require('../middleware/validation.middleware');

  // Register account for user
  router.post('/signup', validation, authentication.register);

  // Email verification for user register account
  // router.get('/verify-email/:uniqueString', authentication.verifyEmail);

  // // Login account
  // router.post('/signin', (req, res) => {
  //   authentication.login(req, res);
  // });

  // // Google Auth
  // router.get('/google', authentication.googleAuthRedirect);
  // router.get('/google/callback', authentication.googleAuthCallback);

  // // Password reset
  // router.post('/request-reset-password', authentication.resetPassword);

  // // Verification email for password rest
  // router.post('/reset-password', authentication.verifyResetPassword);

  // // Logout account
  // router.post('/logout', (req, res) => {
  //   const token = req.header('auth-token');

  //   if (!token) return res.status(401).json({ error: 'Token not found' });

  //   blacklist.push(token);
  //   res.status(200).json({ message: 'Logout successful' });
  // });

  app.use('/auth', router);
};
