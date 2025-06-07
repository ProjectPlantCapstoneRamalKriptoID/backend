const router = require('express').Router();
const authentication = require('../controllers/authentication.controller');
// const blacklist = require('../middleware/authentication.middleware');
const validation = require('../middleware/validation.middleware');

// Register account for user
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: For register account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *                 required: true
 *               email:
 *                 type: string
 *                 example: user@email.com
 *                 required: true
 *               password:
 *                 type: string
 *                 example: User_123
 *                 required: true
 *     responses:
 *       200:
 *         description: Successful registration!
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Internal Server Error
 */
router.post('/signup', validation, authentication.signup);

// Email verification for user register account
/**
 * @swagger
 * /auth/verify-email/{token}:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: For verify email after register account
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Verify Successfully
 *       404:
 *         description: Verify Failed
 *       500:
 *         description: Internal Server Error
 */
router.get('/verify-email/:uniqueString', authentication.verifyEmail);

// Login account
/**
 * @swagger
 * /auth/signin:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: For login account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@email.com
 *                 required: true
 *               password:
 *                 type: string
 *                 example: User_123
 *                 required: true
 *     responses:
 *       200:
 *         description: Login Successfully!
 *       404:
 *         description: Login Failed
 *       500:
 *         description: Internal Server Error
 */
router.post('/signin', (req, res) => {
  authentication.signin(req, res);
});

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

module.exports = router;
