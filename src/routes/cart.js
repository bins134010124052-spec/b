const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const cartController = require('../controllers/cartController');

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Lấy giỏ hàng của user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Giỏ hàng
 */
router.get('/', authMiddleware, cartController.getCart);

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Thêm sản phẩm vào giỏ hàng
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Thêm vào giỏ thành công
 */
router.post('/add', authMiddleware, cartController.addToCart);

/**
 * @swagger
 * /api/cart/update:
 *   put:
 *     summary: Cập nhật số lượng sản phẩm trong giỏ
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cập nhật giỏ thành công
 */
router.put('/update', authMiddleware, cartController.updateCart);

/**
 * @swagger
 * /api/cart/remove/{productId}:
 *   delete:
 *     summary: Xóa sản phẩm khỏi giỏ
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa khỏi giỏ thành công
 */
router.delete('/remove/:productId', authMiddleware, cartController.removeFromCart);

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: Làm rỗng giỏ hàng
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Giỏ hàng đã được làm rỗng
 */
router.delete('/clear', authMiddleware, cartController.clearCart);

module.exports = router;
