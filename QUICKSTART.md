# ⚡ Quick Start Guide - E-Commerce API

## 🚀 Khởi động trong 5 phút

### 1️⃣ **Cài đặt**

```bash
# Clone hoặc download project
cd ecommerce-api

# Cài dependencies
npm install

# Copy file .env
cp .env.example .env
```

### 2️⃣ **Setup Database**

**Lựa chọn A: MongoDB Local**
```bash
# Cài đặt MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Khởi động MongoDB
mongod
```

**Lựa chọn B: MongoDB Atlas (Cloud)**
```
1. Đăng ký: https://www.mongodb.com/cloud/atlas
2. Tạo database cluster
3. Copy connection string vào MONGODB_URI trong .env
```

### 3️⃣ **Seed Database**

```bash
npm run seed
```

**Output:**
```
✓ Admin User tạo thành công: admin@ecommerce.com
✓ Regular User tạo thành công: user@ecommerce.com
✓ Đã tạo 4 danh mục
✓ Đã tạo 8 sản phẩm
```

### 4️⃣ **Khởi động Server**

```bash
# Development (với auto-reload)
npm run dev

# Hoặc production
npm start
```

**Khi khởi động thành công:**
```
✓ MongoDB kết nối thành công: localhost:27017
🌐 REST API:     http://localhost:5000
📚 Swagger:      http://localhost:5000/api-docs
🚀 GraphQL:      http://localhost:5000/graphql
```

---

## 🧪 Test Ngay

### **REST API - Đăng nhập Admin**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@ecommerce.com",
    "password": "Admin@123456"
  }'
```

**Phản hồi:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Admin User",
    "email": "admin@ecommerce.com",
    "role": "admin"
  }
}
```

### **REST API - Lấy danh sách sản phẩm**

```bash
curl http://localhost:5000/api/products?limit=5
```

### **Swagger UI**

Mở trình duyệt: **http://localhost:5000/api-docs**

![Swagger UI](https://via.placeholder.com/800x400?text=Swagger+UI+Interface)

### **GraphQL Playground**

Mở trình duyệt: **http://localhost:5000/graphql**

**Ví dụ query:**
```graphql
query {
  products(limit: 5) {
    products {
      id
      name
      price
    }
  }
}
```

---

## 📚 Tài liệu Chi tiết

- 📖 [README.md](./README.md) - Đầy đủ tất cả API endpoints
- 📋 [Cấu trúc Project](./README.md#-cấu-trúc-dự-án)
- 🔐 [Authentication](./README.md#-authentication)

---

## 🆘 Vấn đề Thường gặp

### ❌ "MongoDB connection failed"
```
✓ Kiểm tra: MongoDB đang chạy?
✓ Kiểm tra: MONGODB_URI đúng trong .env?
✓ Giải pháp: mongod (nếu local) hoặc kết nối MongoDB Atlas
```

### ❌ "Port 5000 already in use"
```bash
# Đổi port trong .env
PORT=5001

# Hoặc tìm process sử dụng port
lsof -i :5000
kill -9 <PID>
```

### ❌ "npm: command not found"
```bash
# Cài đặt Node.js từ https://nodejs.org/
# Hoặc dùng NVM (Node Version Manager)
```

---

## 💡 Tiếp theo

✅ Xem [README.md](./README.md) để hiểu chi tiết toàn bộ API

✅ Explore các [REST Endpoints](./README.md#-rest-api-endpoints)

✅ Tìm hiểu [GraphQL Queries](./README.md#-graphql-queries--mutations)

✅ Tạo tài khoản user mới và test workflow đặt hàng

---

## 🎯 Tài khoản Test

| Loại | Email | Password |
|------|-------|----------|
| Admin | admin@ecommerce.com | Admin@123456 |
| User | user@ecommerce.com | User@123456 |

---

**Chúc mừng! 🎉 Bạn đã sẵn sàng sử dụng E-Commerce API**
