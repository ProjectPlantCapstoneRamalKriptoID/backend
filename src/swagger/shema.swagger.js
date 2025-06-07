/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - verified
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         profileImages:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               filename:
 *                 type: string
 *               public_id:
 *                 type: string
 *         verified:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Verification:
 *       type: object
 *       required:
 *         - id
 *         - userId
 *         - uniqueString
 *         - expiredAt
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         uniqueString:
 *           type: string
 *         expiredAt:
 *           type: date-time
 *         createdAt:
 *           type: date-time
 *         updatedAt:
 *           type: date-time
 */
