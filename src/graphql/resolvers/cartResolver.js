const Cart = require('../../models/Cart');
const Product = require('../../models/Product');

const cartResolvers = {
  Query: {
    cart: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Chưa xác thực');
      }
      let cart = await Cart.findOne({ user: context.user.id }).populate('items.product');
      if (!cart) {
        cart = { items: [], totalPrice: 0 };
      }
      return cart;
    },
  },
  Mutation: {
    addToCart: async (_, { productId, quantity }, context) => {
      if (!context.user) {
        throw new Error('Chưa xác thực');
      }
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Sản phẩm không tìm thấy');
      }
      if (product.stock < quantity) {
        throw new Error('Số lượng tồn kho không đủ');
      }

      let cart = await Cart.findOne({ user: context.user.id });
      if (!cart) {
        cart = await Cart.create({
          user: context.user.id,
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

      return await Cart.findById(cart._id).populate('items.product');
    },
    updateCartItem: async (_, { productId, quantity }, context) => {
      if (!context.user) {
        throw new Error('Chưa xác thực');
      }
      const cart = await Cart.findOne({ user: context.user.id });
      if (!cart) {
        throw new Error('Giỏ hàng không tìm thấy');
      }
      const item = cart.items.find((item) => item.product.toString() === productId);
      if (!item) {
        throw new Error('Sản phẩm không có trong giỏ');
      }
      item.quantity = quantity;
      if (item.quantity <= 0) {
        cart.items = cart.items.filter((item) => item.product.toString() !== productId);
      }
      cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      await cart.save();

      return await Cart.findById(cart._id).populate('items.product');
    },
    removeFromCart: async (_, { productId }, context) => {
      if (!context.user) {
        throw new Error('Chưa xác thực');
      }
      const cart = await Cart.findOne({ user: context.user.id });
      if (!cart) {
        throw new Error('Giỏ hàng không tìm thấy');
      }
      cart.items = cart.items.filter((item) => item.product.toString() !== productId);
      cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      await cart.save();

      return await Cart.findById(cart._id).populate('items.product');
    },
    clearCart: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Chưa xác thực');
      }
      const cart = await Cart.findOne({ user: context.user.id });
      if (!cart) {
        throw new Error('Giỏ hàng không tìm thấy');
      }
      cart.items = [];
      cart.totalPrice = 0;
      await cart.save();

      return cart;
    },
  },
};

module.exports = cartResolvers;
