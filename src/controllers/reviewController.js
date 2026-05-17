const Review = require('../models/Review');
const Product = require('../models/Product');
const { reviewSchema } = require('../utils/validationSchemas');

// @desc    Tạo review cho sản phẩm
// @route   POST /api/products/:id/reviews
// @access  Private
exports.createReview = async (req, res, next) => {
  try {
    const validated = reviewSchema.parse(req.body);
    const { rating, comment } = validated;
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Sản phẩm không tìm thấy',
      });
    }

    // Kiểm tra xem user đã review sản phẩm này chưa
    const existingReview = await Review.findOne({
      product: productId,
      user: req.user.id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'Bạn đã review sản phẩm này rồi',
      });
    }

    const review = await Review.create({
      product: productId,
      user: req.user.id,
      rating,
      comment,
    });

    // Cập nhật rating trung bình của sản phẩm
    const reviews = await Review.find({ product: productId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      rating: avgRating,
      numReviews: reviews.length,
    });

    res.status(201).json({
      success: true,
      message: 'Tạo review thành công',
      review,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Lấy danh sách review của sản phẩm
// @route   GET /api/products/:id/reviews
// @access  Public
exports.getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.id })
      .populate('user', 'name')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};
