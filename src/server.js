require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Kết nối Database
    await connectDB();

    // Setup Apollo Server
    await app.setupApollo();

    // Khởi động Express server
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════╗
║     E-COMMERCE API SERVER ĐANG CHẠY       ║
╠════════════════════════════════════════════╣
║ 🌐 REST API:     http://localhost:${PORT}       ║
║ 📚 Swagger:      http://localhost:${PORT}/api-docs ║
║ 🚀 GraphQL:      http://localhost:${PORT}/graphql   ║
╚════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('✗ Lỗi khởi động server:', error.message);
    process.exit(1);
  }
};

startServer();
