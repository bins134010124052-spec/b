const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(1, 'Vui lòng cung cấp mật khẩu'),
});

const updateProfileSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').optional(),
  profilePicture: z.string().optional(),
});

const categorySchema = z.object({
  name: z.string().min(1, 'Tên danh mục không được trống'),
  description: z.string().optional(),
  image: z.string().optional(),
});

const productSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm không được trống'),
  description: z.string().min(1, 'Mô tả không được trống'),
  price: z.number().positive('Giá phải lớn hơn 0'),
  stock: z.number().min(0, 'Tồn kho không được âm'),
  category: z.string().min(1, 'Danh mục không được trống'),
  images: z.array(z.string()).optional(),
});

const addToCartSchema = z.object({
  productId: z.string().min(1, 'ID sản phẩm không được trống'),
  quantity: z.number().int().positive('Số lượng phải lớn hơn 0'),
});

const createOrderSchema = z.object({
  shippingAddress: z.string().min(5, 'Địa chỉ giao hàng không hợp lệ'),
  phone: z.string().regex(/^[0-9\+\-\s\(\)]+$/, 'Số điện thoại không hợp lệ'),
});

const reviewSchema = z.object({
  rating: z.number().int().min(1, 'Rating tối thiểu là 1').max(5, 'Rating tối đa là 5'),
  comment: z.string().min(1, 'Bình luận không được trống'),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  categorySchema,
  productSchema,
  addToCartSchema,
  createOrderSchema,
  reviewSchema,
};
