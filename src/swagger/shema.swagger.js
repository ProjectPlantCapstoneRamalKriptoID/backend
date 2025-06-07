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
 *         verified:
 *           type: boolean
 *         createdAt:
 *           type: date-time
 *         updatedAt:
 *           type: date-time
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
