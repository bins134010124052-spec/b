require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

const seedDatabase = async () => {
  try {
    // Kết nối MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('📚 Đang xóa dữ liệu cũ...');

    // Xóa dữ liệu cũ
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});

    console.log('✓ Dữ liệu cũ đã được xóa');

    // Tạo Admin User
    console.log('👤 Đang tạo Admin User...');
    const adminUser = await User.create({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@ecommerce.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123456',
      role: 'admin',
    });
    console.log('✓ Admin User tạo thành công:', adminUser.email);

    // Tạo Regular User
    const regularUser = await User.create({
      name: 'Nguyễn Văn A',
      email: 'user@ecommerce.com',
      password: 'User@123456',
      role: 'user',
    });
    console.log('✓ Regular User tạo thành công:', regularUser.email);

    // Tạo Categories
    console.log('📂 Đang tạo Categories...');
    const categories = await Category.insertMany([
      {
        name: 'Điện thoại',
        description: 'Các loại điện thoại di động mới nhất',
        image: 'https://via.placeholder.com/200?text=Dien+thoai',
      },
      {
        name: 'Laptop',
        description: 'Máy tính xách tay chất lượng cao',
        image: 'https://via.placeholder.com/200?text=Laptop',
      },
      {
        name: 'Tablet',
        description: 'Các thiết bị bảng điều khiển công nghệ',
        image: 'https://via.placeholder.com/200?text=Tablet',
      },
      {
        name: 'Phụ kiện',
        description: 'Phụ kiện công nghệ đa dạng',
        image: 'https://via.placeholder.com/200?text=Phu+kien',
      },
    ]);
    console.log('✓ Đã tạo', categories.length, 'danh mục');

    // Tạo Products
    console.log('📦 Đang tạo Products...');
    const products = await Product.insertMany([
      {
        name: 'iPhone 15 Pro Max',
        description: 'Điện thoại cao cấp nhất từ Apple với camera 48MP và chip A17 Pro',
        price: 29999000,
        stock: 50,
        category: categories[0]._id,
        images: ['https://via.placeholder.com/400?text=iPhone+15'],
        rating: 4.5,
        numReviews: 0,
      },
      {
        name: 'Samsung Galaxy S24',
        description: 'Flagship từ Samsung với màn hình Dynamic AMOLED 2X',
        price: 24999000,
        stock: 45,
        category: categories[0]._id,
        images: ['https://via.placeholder.com/400?text=Galaxy+S24'],
        rating: 4.3,
        numReviews: 0,
      },
      {
        name: 'MacBook Pro 16"',
        description: 'Laptop cao cấp với chip M3 Max, lý tưởng cho designer',
        price: 49999000,
        stock: 30,
        category: categories[1]._id,
        images: ['https://via.placeholder.com/400?text=MacBook+Pro'],
        rating: 4.8,
        numReviews: 0,
      },
      {
        name: 'Dell XPS 15',
        description: 'Laptop Windows mạnh mẽ với card đồ họa RTX 4060',
        price: 39999000,
        stock: 25,
        category: categories[1]._id,
        images: ['https://via.placeholder.com/400?text=Dell+XPS'],
        rating: 4.4,
        numReviews: 0,
      },
      {
        name: 'iPad Pro 12.9"',
        description: 'Tablet cao cấp với chip M2, màn hình XDR',
        price: 18999000,
        stock: 40,
        category: categories[2]._id,
        images: ['https://via.placeholder.com/400?text=iPad+Pro'],
        rating: 4.6,
        numReviews: 0,
      },
      {
        name: 'Samsung Galaxy Tab S9',
        description: 'Tablet Android với màn hình AMOLED 120Hz',
        price: 13999000,
        stock: 35,
        category: categories[2]._id,
        images: ['https://via.placeholder.com/400?text=Galaxy+Tab'],
        rating: 4.2,
        numReviews: 0,
      },
      {
        name: 'AirPods Pro',
        description: 'Tai nghe wireless với khả năng khử tiếng ồn tích cực',
        price: 5490000,
        stock: 100,
        category: categories[3]._id,
        images: ['https://via.placeholder.com/400?text=AirPods+Pro'],
        rating: 4.7,
        numReviews: 0,
      },
      {
        name: 'USB-C Hub 7-in-1',
        description: 'Hub đa năng cho MacBook và laptop Type-C',
        price: 1290000,
        stock: 150,
        category: categories[3]._id,
        images: ['https://via.placeholder.com/400?text=USB+Hub'],
        rating: 4.1,
        numReviews: 0,
      },
    ]);
    console.log('✓ Đã tạo', products.length, 'sản phẩm');

    console.log(`
╔═══════════════════════════════════════════════════╗
║          SEEDING DATABASE THÀNH CÔNG             ║
╠═══════════════════════════════════════════════════╣
║ 👤 Users:        ${String(2).padStart(2, ' ')} người dùng                      ║
║ 📂 Categories:   ${String(categories.length).padStart(2, ' ')} danh mục                 ║
║ 📦 Products:     ${String(products.length).padStart(2, ' ')} sản phẩm                  ║
╠═══════════════════════════════════════════════════╣
║ 🔐 Tài khoản Admin:                               ║
║    Email:    admin@ecommerce.com                 ║
║    Password: Admin@123456                        ║
║                                                   ║
║ 👥 Tài khoản User:                                ║
║    Email:    user@ecommerce.com                  ║
║    Password: User@123456                         ║
╚═══════════════════════════════════════════════════╝
    `);

    process.exit(0);
  } catch (error) {
    console.error('✗ Lỗi seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
