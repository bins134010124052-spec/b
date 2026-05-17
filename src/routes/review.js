const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const reviewController = require('../controllers/reviewController');

/**
 * @swagger
 * /api/products/{id}/reviews:
 *   post:
 *     summary: Tạo review cho sản phẩm
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comment
 *             properties:
 *               rating:
 *                 type: number
 *                 enum: [1, 2, 3, 4, 5]
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo review thành công
 */
router.post('/:id/reviews', authMiddleware, reviewController.createReview);

/**
 * @swagger
 * /api/products/{id}/reviews:
 *   get:
 *     summary: Lấy danh sách review của sản phẩm
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách review
 */
router.get('/:id/reviews', reviewController.getProductReviews);

module.exports = router;
