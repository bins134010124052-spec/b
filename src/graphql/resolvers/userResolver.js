const User = require('../../models/User');
const { generateToken, verifyToken } = require('../../config/jwt');

const userResolvers = {
  Query: {
    me: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Chưa xác thực');
      }
      return await User.findById(context.user.id);
    },
    users: async (_, __, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Chỉ admin mới có quyền truy cập');
      }
      return await User.find().select('-password');
    },
  },
  Mutation: {
    register: async (_, { name, email, password }) => {
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new Error('Email đã được sử dụng');
      }
      const user = await User.create({ name, email, password });
      const token = generateToken(user._id, user.role);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        throw new Error('Email hoặc mật khẩu không đúng');
      }
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        throw new Error('Email hoặc mật khẩu không đúng');
      }
      const token = generateToken(user._id, user.role);
      return { token, user };
    },
    updateProfile: async (_, { name, profilePicture }, context) => {
      if (!context.user) {
        throw new Error('Chưa xác thực');
      }
      const user = await User.findByIdAndUpdate(
        context.user.id,
        { name, profilePicture },
        { new: true, runValidators: true }
      );
      return user;
    },
  },
};

module.exports = userResolvers;
