const router = require('express').Router();
const user = require('../controllers/user.controller');
const { authentication } = require('../middleware/authentication.middleware');
const { upload } = require('../configs/cloudinary.config');

// Get user profile
/**
 * @swagger
 * /user/profile:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user profile
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/profile', authentication(), (req, res) => {
  user.getProfile(req, res);
});

// Update user profile
/**
 * @swagger
 * /user/profile-update:
 *   put:
 *     tags:
 *       - User
 *     summary: Update user profile
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
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               profileImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "https://res.cloudinary.com/dtrwfozky/image/upload/v1749284477/profileImages/puqdfb3wxqesmd4qcyba.png"
 *     responses:
 *       200:
 *         description: Successfully updated profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid data provided
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
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

module.exports = router;
