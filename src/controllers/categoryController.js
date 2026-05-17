const Category = require('../models/Category');
const { categorySchema } = require('../utils/validationSchemas');

// @desc    Lấy tất cả danh mục
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Tạo danh mục mới
// @route   POST /api/categories
// @access  Private/Admin
exports.createCategory = async (req, res, next) => {
  try {
    const validated = categorySchema.parse(req.body);
    const category = await Category.create(validated);

    res.status(201).json({
      success: true,
      message: 'Danh mục tạo thành công',
      category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cập nhật danh mục
// @route   PUT /api/categories/:id
// @access  Private/Admin
exports.updateCategory = async (req, res, next) => {
  try {
    const validated = categorySchema.parse(req.body);
    const category = await Category.findByIdAndUpdate(req.params.id, validated, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Danh mục không tìm thấy',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Danh mục cập nhật thành công',
      category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Xóa danh mục
// @route   DELETE /api/categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Danh mục không tìm thấy',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Danh mục xóa thành công',
    });
  } catch (error) {
    next(error);
  }
};
