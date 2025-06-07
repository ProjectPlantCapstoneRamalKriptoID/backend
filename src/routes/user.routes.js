const router = require('express').Router();
const user = require('../controllers/user.controller');
const { authentication } = require('../middleware/authentication.middleware');
const { upload } = require('../configs/cloudinary.config');

// Get profile
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

// Update profile
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

// Delete photo profile
/**
 * @swagger
 * /user/photo-delete:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete user profile photo
 *     parameters:
 *       - in: query
 *         name: public_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Use public_id of the photo to delete (e.g., profileImages/abc123)
 *     responses:
 *       200:
 *         description: Successfully deleted profile photo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile image deleted successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/photo-delete', authentication(), (req, res) => {
  user.deletePhotoProfile(req, res);
});

module.exports = router;
