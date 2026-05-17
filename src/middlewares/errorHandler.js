const { ZodError } = require('zod');

const errorHandler = (err, req, res, next) => {
  // Zod Validation Error
  if (err instanceof ZodError) {
    const errors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return res.status(400).json({
      success: false,
      message: 'Lỗi validation',
      errors,
    });
  }

  // JWT Error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Token không hợp lệ',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token đã hết hạn',
    });
  }

  // Mongoose Error
  if (err.name === 'MongooseError' || err.name === 'MongoError') {
    return res.status(400).json({
      success: false,
      message: 'Lỗi cơ sở dữ liệu',
    });
  }

  // Mặc định
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Lỗi server',
  });
};

module.exports = errorHandler;
