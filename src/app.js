require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const errorHandler = require('./middlewares/errorHandler');
const { verifyToken } = require('./config/jwt');

// Import routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const reviewRoutes = require('./routes/review');

const app = express();

// ============ Middleware ============

// Security & CORS
app.use(helmet());
app.use(cors());

// Logger
app.use(morgan('dev'));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // giới hạn mỗi IP đến 100 request mỗi windowMs
});
app.use('/api/', limiter);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============ REST API Routes ============
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', reviewRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// ============ Swagger Documentation ============
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// ============ Health Check ============
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server đang hoạt động' });
});

// ============ GraphQL Setup (defer to server.js) ============
app.setupApollo = async () => {
  const createApolloServer = require('./graphql');
  const apolloServer = await createApolloServer();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
  return apolloServer;
};

// ============ 404 Handler ============
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route không tìm thấy',
  });
});

// ============ Error Handler ============
app.use(errorHandler);

module.exports = app;
