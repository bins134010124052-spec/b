const Review = require('../../models/Review');
const Product = require('../../models/Product');

const reviewResolvers = {
  Query: {
    productReviews: async (_, { productId }) => {
      return await Review.find({ product: productId })
        .populate('user', 'name')
        .sort('-createdAt');
    },
  },
  Mutation: {
    createReview: async (_, { productId, rating, comment }, context) => {
      if (!context.user) {
        throw new Error('Chưa xác thực');
      }
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Sản phẩm không tìm thấy');
      }
      const existingReview = await Review.findOne({
        product: productId,
        user: context.user.id,
      });
      if (existingReview) {
        throw new Error('Bạn đã review sản phẩm này rồi');
      }
      const review = await Review.create({
        product: productId,
        user: context.user.id,
        rating,
        comment,
      });
      const reviews = await Review.find({ product: productId });
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

      await Product.findByIdAndUpdate(productId, {
        rating: avgRating,
        numReviews: reviews.length,
      });

      return await Review.findById(review._id).populate('user', 'name');
    },
  },
};

module.exports = reviewResolvers;
