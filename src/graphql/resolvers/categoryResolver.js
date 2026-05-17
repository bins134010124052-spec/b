const Category = require('../../models/Category');

const categoryResolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
  },
  Mutation: {
    createCategory: async (_, { name, description, image }, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Chỉ admin mới có quyền truy cập');
      }
      const category = await Category.create({ name, description, image });
      return category;
    },
    updateCategory: async (_, { id, name, description, image }, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Chỉ admin mới có quyền truy cập');
      }
      const category = await Category.findByIdAndUpdate(
        id,
        { name, description, image },
        { new: true, runValidators: true }
      );
      return category;
    },
    deleteCategory: async (_, { id }, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Chỉ admin mới có quyền truy cập');
      }
      const result = await Category.findByIdAndDelete(id);
      return !!result;
    },
  },
};

module.exports = categoryResolvers;
