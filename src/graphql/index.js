const { ApolloServer, gql } = require('apollo-server-express');
const { verifyToken } = require('../config/jwt');

// Import Schemas
const userSchema = require('./schemas/user');
const categorySchema = require('./schemas/category');
const productSchema = require('./schemas/product');
const cartSchema = require('./schemas/cart');
const orderSchema = require('./schemas/order');
const reviewSchema = require('./schemas/review');

// Import Resolvers
const userResolvers = require('./resolvers/userResolver');
const categoryResolvers = require('./resolvers/categoryResolver');
const productResolvers = require('./resolvers/productResolver');
const cartResolvers = require('./resolvers/cartResolver');
const orderResolvers = require('./resolvers/orderResolver');
const reviewResolvers = require('./resolvers/reviewResolver');

// Base Type Definitions
const baseTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

// Merge all type definitions
const typeDefs = [
  baseTypeDefs,
  userSchema,
  categorySchema,
  productSchema,
  cartSchema,
  orderSchema,
  reviewSchema,
];

// Merge all resolvers
const resolvers = [userResolvers, categoryResolvers, productResolvers, cartResolvers, orderResolvers, reviewResolvers];

// Create Apollo Server
const createApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization?.substring(7);
      let user = null;

      if (token) {
        try {
          user = verifyToken(token);
        } catch (error) {
          console.log('Token không hợp lệ:', error.message);
        }
      }

      return { user };
    },
    formatError: (error) => {
      return {
        message: error.message,
        extensions: {
          code: error.extensions?.code,
        },
      };
    },
  });

  return server;
};

module.exports = createApolloServer;
