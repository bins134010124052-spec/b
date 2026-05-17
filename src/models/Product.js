const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng cung cấp tên sản phẩm'],
    },
    description: {
      type: String,
      required: [true, 'Vui lòng cung cấp mô tả'],
    },
    price: {
      type: Number,
      required: [true, 'Vui lòng cung cấp giá'],
      min: 0,
    },
    stock: {
      type: Number,
      required: [true, 'Vui lòng cung cấp số lượng tồn kho'],
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Vui lòng chọn danh mục'],
    },
    images: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
