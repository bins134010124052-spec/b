const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { addToCartSchema } = require('../utils/validationSchemas');

// @desc    Lấy giỏ hàng của user
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: { items: [], totalPrice: 0 },
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Thêm sản phẩm vào giỏ
// @route   POST /api/cart/add
// @access  Private
exports.addToCart = async (req, res, next) => {
  try {
    const validated = addToCartSchema.parse(req.body);
    const { productId, quantity } = validated;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Sản phẩm không tìm thấy',
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Số lượng tồn kho không đủ',
      });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [{ product: productId, quantity, price: product.price }],
        totalPrice: product.price * quantity,
      });
    } else {
      const existingItem = cart.items.find((item) => item.product.toString() === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity, price: product.price });
      }

      cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: 'Thêm vào giỏ thành công',
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cập nhật số lượng sản phẩm trong giỏ
// @route   PUT /api/cart/update
// @access  Private
exports.updateCart = async (req, res, next) => {
  try {
    const validated = addToCartSchema.parse(req.body);
    const { productId, quantity } = validated;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Giỏ hàng không tìm thấy',
      });
    }

    const item = cart.items.find((item) => item.product.toString() === productId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Sản phẩm không có trong giỏ',
      });
    }

    item.quantity = quantity;

    if (item.quantity <= 0) {
      cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    }

    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cập nhật giỏ thành công',
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Xóa sản phẩm khỏi giỏ
// @route   DELETE /api/cart/remove/:productId
// @access  Private
exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Giỏ hàng không tìm thấy',
      });
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Xóa khỏi giỏ thành công',
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Làm rỗng giỏ hàng
// @route   DELETE /api/cart/clear
// @access  Private
exports.clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Giỏ hàng không tìm thấy',
      });
    }

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Giỏ hàng đã được làm rỗng',
      cart,
    });
  } catch (error) {
    next(error);
  }
};
