// Kiểm tra ObjectId hợp lệ
const isValidObjectId = (id) => {
  return /^[0-9a-f]{24}$/.test(id);
};

// Format response success
const successResponse = (data, message = 'Success', code = 200) => {
  return {
    success: true,
    message,
    code,
    data,
    timestamp: new Date().toISOString(),
  };
};

// Format response error
const errorResponse = (message = 'Error', code = 400, errors = null) => {
  return {
    success: false,
    message,
    code,
    errors,
    timestamp: new Date().toISOString(),
  };
};

// Tính toán phân trang
const calculatePagination = (page = 1, limit = 10) => {
  const pageNum = Math.max(1, parseInt(page) || 1);
  const limitNum = Math.max(1, parseInt(limit) || 10);
  const skip = (pageNum - 1) * limitNum;
  return { page: pageNum, limit: limitNum, skip };
};

// Format tiền tệ
const formatCurrency = (amount, currency = 'VND') => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

module.exports = {
  isValidObjectId,
  successResponse,
  errorResponse,
  calculatePagination,
  formatCurrency,
};
