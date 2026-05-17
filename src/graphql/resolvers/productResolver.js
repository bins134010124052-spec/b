const Product = require('../../models/Product');

const productResolvers = {
  Query: {
    products: async (_, { category, minPrice, maxPrice, search, page = 1, limit = 10 }) => {
      let filter = {};

      if (category) {
        filter.category = category;
      }

      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = minPrice;
        if (maxPrice) filter.price.$lte = maxPrice;
      }

      const skip = (page - 1) * limit;
      const products = await Product.find(filter)
        .populate('category')
        .skip(skip)
        .limit(limit);
      const total = await Product.countDocuments(filter);

      return {
        products,
        total,
        page,
        pages: Math.ceil(total / limit),
      };
    },
    product: async (_, { id }) => {
      return await Product.findById(id).populate('category');
    },
  },
  Mutation: {
    createProduct: async (_, { name, description, price, stock, category, images }, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Chỉ admin mới có quyền truy cập');
      }
      const product = await Product.create({
        name,
        description,
        price,
        stock,
        category,
        images,
      });
      return await product.populate('category');
    },
    updateProduct: async (_, { id, name, description, price, stock, images }, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Chỉ admin mới có quyền truy cập');
      }
      const product = await Product.findByIdAndUpdate(
        id,
        { name, description, price, stock, images },
        { new: true, runValidators: true }
      ).populate('category');
      return product;
    },
    deleteProduct: async (_, { id }, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Chỉ admin mới có quyền truy cập');
      }
      const result = await Product.findByIdAndDelete(id);
      return !!result;
    },
  },
};

module.exports = productResolvers;
