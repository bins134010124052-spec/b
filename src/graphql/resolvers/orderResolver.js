const Order = require('../../models/Order');
const Cart = require('../../models/Cart');
const Product = require('../../models/Product');

const orderResolvers = {
  Query: {
    orders: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Chưa xác thực');
      }
      return await Order.find({ user: context.user.id }).populate('items.product');
    },
    order: async (_, { id }, context) => {
      if (!context.user) {
        throw new Error('Chưa xác thực');
      }
      const order = await Order.findById(id).populate('items.product');
      if (!order) {
        throw new Error('Đơn hàng không tìm thấy');
      }
      if (order.user.toString() !== context.user.id && context.user.role !== 'admin') {
        throw new Error('Không có quyền truy cập');
      }
      return order;
    },
  },
  Mutation: {
    createOrder: async (_, { shippingAddress, phone }, context) => {
      if (!context.user) {
        throw new Error('Chưa xác thực');
      }
      const cart = await Cart.findOne({ user: context.user.id });
      if (!cart || cart.items.length === 0) {
        throw new Error('Giỏ hàng trống');
      }
      const order = await Order.create({
        user: context.user.id,
        items: cart.items,
        totalPrice: cart.totalPrice,
        shippingAddress,
        phone,
      });
      for (const item of cart.items) {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { stock: -item.quantity } },
          { new: true }
        );
      }
      cart.items = [];
      cart.totalPrice = 0;
      await cart.save();

      return await Order.findById(order._id).populate('items.product');
    },
    updateOrderStatus: async (_, { id, status }, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Chỉ admin mới có quyền truy cập');
      }
      const validStatuses = ['pending', 'processing', 'shipped', 'delivered'];
      if (!validStatuses.includes(status)) {
        throw new Error('Trạng thái không hợp lệ');
      }
      const order = await Order.findByIdAndUpdate(id, { status }, { new: true }).populate(
        'items.product'
      );
      return order;
    },
  },
};

module.exports = orderResolvers;
