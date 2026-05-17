const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Vui lòng cung cấp rating'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, 'Vui lòng cung cấp bình luận'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
