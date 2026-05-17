# 🪟 E-Commerce API - Windows Setup Guide

Hướng dẫn chi tiết cài đặt và chạy dự án trên Windows.

---

## 📋 Điều kiện tiên quyết

### 1. **Node.js & npm**

#### Cách 1: Tải từ nodejs.org (Khuyên dùng)
1. Truy cập: https://nodejs.org/
2. Download: **LTS version** (≥ v18)
3. Chạy installer và làm theo hướng dẫn
4. Đánh dấu: "Add to PATH"

#### Cách 2: Sử dụng Chocolatey (nếu có)
```powershell
choco install nodejs
```

#### Kiểm tra cài đặt
```powershell
node --version    # v18.x.x
npm --version     # 8.x.x hoặc cao hơn
```

### 2. **MongoDB**

#### Cách 1: MongoDB Community (Local)
1. Tải: https://www.mongodb.com/try/download/community
2. Chọn **Windows x64**
3. Chạy installer
4. Chọn "Install MongoDB as a Service"
5. MongoDB sẽ tự khởi động

#### Cách 2: MongoDB Atlas (Cloud) - Khuyên dùng
1. Đăng ký: https://www.mongodb.com/cloud/atlas
2. Tạo cluster miễn phí
3. Lấy connection string
4. Thêm vào `.env`: `MONGODB_URI=<connection_string>`

#### Kiểm tra MongoDB (Local)
```powershell
# Mở PowerShell / Command Prompt
mongosh

# Hoặc
mongo
```

### 3. **Code Editor** (Optional)
- **VS Code** (Khuyên dùng): https://code.visualstudio.com/
- **WebStorm**: https://www.jetbrains.com/webstorm/
- **Sublime Text**: https://www.sublimetext.com/

---

## 🚀 Installation Steps

### Bước 1: Clone/Extract Project

**Nếu có Git:**
```powershell
git clone <repo-url>
cd ecommerce-api
```

**Nếu không có Git:**
- Download ZIP từ GitHub
- Extract vào thư mục
- Mở PowerShell/CMD trong thư mục đó

### Bước 2: Cài đặt Dependencies

```powershell
# Mở PowerShell / Command Prompt
# Navigate vào project folder
cd d:\code\AssigmentB

# Cài npm packages
npm install

# Chờ khoảng 1-2 phút...
```

**Output khi thành công:**
```
added 200 packages in 45s
```

### Bước 3: Tạo File .env

```powershell
# Copy .env.example thành .env
Copy-Item .env.example .env

# Hoặc mở File Explorer:
# - Right-click .env.example
# - Copy → Paste → Rename thành .env
```

**Nội dung .env:**
```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
PORT=5000
ADMIN_EMAIL=admin@ecommerce.com
ADMIN_PASSWORD=Admin@123456
```

### Bước 4: Chạy Database Seeding

```powershell
npm run seed
```

**Output:**
```
✓ Admin User tạo thành công: admin@ecommerce.com
✓ Regular User tạo thành công: user@ecommerce.com
✓ Đã tạo 4 danh mục
✓ Đã tạo 8 sản phẩm
```

### Bước 5: Khởi động Server

```powershell
# Development mode (với auto-reload)
npm run dev

# Hoặc production
npm start
```

**Khi thành công:**
```
✓ MongoDB kết nối thành công: localhost:27017
✓ GraphQL mounted on /graphql

╔════════════════════════════════════════════╗
║     E-COMMERCE API SERVER ĐANG CHẠY       ║
╠════════════════════════════════════════════╣
║ 🌐 REST API:     http://localhost:5000       ║
║ 📚 Swagger:      http://localhost:5000/api-docs ║
║ 🚀 GraphQL:      http://localhost:5000/graphql   ║
╚════════════════════════════════════════════╝
```

---

## 🧪 Test Server

### 1. **Health Check**
```powershell
# Mở PowerShell tab mới
curl http://localhost:5000/health
```

### 2. **Mở Swagger UI**
- Trình duyệt: http://localhost:5000/api-docs

### 3. **Mở GraphQL**
- Trình duyệt: http://localhost:5000/graphql

### 4. **Test Login**
```powershell
$body = @{
    email = "admin@ecommerce.com"
    password = "Admin@123456"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"
```

---

## 🛠️ Troubleshooting Windows

### ❌ "npm: The term 'npm' is not recognized"

**Giải pháp:**
1. Cài đặt lại Node.js
2. Thêm vào PATH:
   - Tìm: `C:\Program Files\nodejs`
   - Thêm vào system PATH
3. Restart PowerShell/CMD

**Hoặc:**
```powershell
$env:PATH += ";C:\Program Files\nodejs"
npm --version
```

### ❌ "MongoDB connection failed"

**Kiểm tra MongoDB Local:**
```powershell
# Kiểm tra service
Get-Service MongoDB

# Khởi động nếu dừng
Start-Service MongoDB

# Hoặc kiểm tra process
Get-Process mongod
```

**Nếu không cài local:**
```env
# Sử dụng MongoDB Atlas
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce
```

### ❌ "Port 5000 already in use"

```powershell
# Tìm process sử dụng port 5000
netstat -ano | findstr :5000

# Output: PID xxx
# Tắt process
taskkill /PID xxx /F

# Hoặc đổi port trong .env
# PORT=5001
```

### ❌ "Cannot find module 'express'"

```powershell
# Cài lại dependencies
rm -r node_modules
rm package-lock.json
npm install
```

### ❌ "ENOENT: no such file or directory, open '.env'"

```powershell
# Tạo file .env
Copy-Item .env.example .env

# Hoặc bằng tay:
# 1. Mở VS Code
# 2. File → New File
# 3. Paste nội dung từ .env.example
# 4. Save as .env
```

### ❌ "Error: Cannot find module './models/User'"

```powershell
# Xóa node_modules và cài lại
Remove-Item -Recurse node_modules
npm install
```

---

## 🔧 Các Lệnh Hữu ích

### PowerShell Commands

```powershell
# Kiểm tra phiên bản
node --version
npm --version

# Cài package
npm install <package-name>

# Cài package dev
npm install --save-dev <package-name>

# Chạy script từ package.json
npm run dev
npm run seed

# Cập nhật npm
npm install -g npm@latest

# Xóa npm cache
npm cache clean --force

# Kiểm tra disk space
Get-ChildItem . -Recurse | Measure-Object -Sum Length
```

### MongoDB Commands

```powershell
# Kết nối MongoDB (nếu local)
mongosh

# Hoặc
mongo

# Chọn database
use ecommerce

# Xem collections
show collections

# Xem documents
db.users.find()

# Xóa database
db.dropDatabase()
```

---

## 🗄️ MongoDB Setup Chi tiết (Windows)

### Local MongoDB

**1. Download & Cài đặt**
- https://www.mongodb.com/try/download/community
- Chọn Windows x64
- Chạy installer (`.msi`)

**2. Khởi động MongoDB Service**
```powershell
# Mở Services (services.msc)
# Tìm "MongoDB Server"
# Start hoặc Restart

# Hoặc từ PowerShell (Admin)
Start-Service MongoDB
```

**3. Kết nối**
```powershell
mongosh
# Hoặc
mongo
```

### MongoDB Atlas (Khuyên dùng)

**1. Tạo Account**
- Đăng ký: https://account.mongodb.com/account/register
- Verify email

**2. Tạo Project & Cluster**
- Create New Organization
- Build a New Cluster
- Chọn **M0 Free Tier**
- Chọn provider & region

**3. Lấy Connection String**
- Connect → Drivers
- Chọn Node.js
- Copy connection string

**4. Cập nhật .env**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
```

---

## 🎯 Workflow Hàng Ngày

### **Khởi động dự án**

```powershell
# Terminal 1: Khởi động server
cd d:\code\AssigmentB
npm run dev

# Terminal 2 (mới): Test API
$token = (curl http://localhost:5000/api/auth/login | ConvertFrom-Json).token
$headers = @{"Authorization"="Bearer $token"}
curl http://localhost:5000/api/auth/profile -Headers $headers
```

### **Phát triển tính năng**

```powershell
# 1. Mở VS Code
code .

# 2. Edit file
# - Nodemon sẽ auto-reload

# 3. Test thay đổi
# - Swagger UI: http://localhost:5000/api-docs
# - GraphQL: http://localhost:5000/graphql

# 4. Commit code (nếu dùng Git)
git add .
git commit -m "Add feature"
git push
```

### **Debug Issues**

```powershell
# 1. Kiểm tra dependencies
npm list

# 2. Kiểm tra MongoDB
mongosh

# 3. Xem logs trong terminal
# Nodemon sẽ in errors

# 4. Sử dụng Swagger UI để test
http://localhost:5000/api-docs
```

---

## 📊 Performance Tips

### **Tối ưu hóa**

```powershell
# Sử dụng production mode nếu production
NODE_ENV=production

# Giảm memory usage
npm run start

# Kiểm tra performance
Get-Process node
```

### **Database**

```powershell
# Xem kích thước database
mongosh
db.stats()

# Tối ưu index
db.collection('products').createIndex({name: 'text'})
```

---

## 🆘 Support Resources

### **Tài liệu chính thức**
- Node.js: https://nodejs.org/docs/
- Express: https://expressjs.com/
- MongoDB: https://docs.mongodb.com/
- Apollo: https://www.apollographql.com/docs/

### **Forum & Community**
- Stack Overflow: https://stackoverflow.com/
- MongoDB Community: https://www.mongodb.com/community/forums/
- Node.js: https://nodejs.org/en/get-involved/

### **IDE Support**
- VS Code Extensions:
  - REST Client
  - MongoDB for VS Code
  - Prettier
  - ESLint

---

## ✅ Deployment Checklist

Trước khi deploy lên production:

- [ ] Update `NODE_ENV=production`
- [ ] Tạo mạnh `JWT_SECRET`
- [ ] Setup MongoDB Atlas (hoặc managed database)
- [ ] Test tất cả endpoints
- [ ] Configure CORS (whitelist domains)
- [ ] Enable HTTPS
- [ ] Setup monitoring
- [ ] Backup database

---

## 🎯 Next Steps

1. ✅ Hoàn thành setup
2. 📖 Đọc README.md
3. 🧪 Test API qua Swagger
4. 💻 Mở VS Code và explore code
5. 🚀 Bắt đầu phát triển features

---

**Chúc mừng! Bạn đã cài đặt thành công trên Windows! 🎉**

*Nếu gặp vấn đề, kiểm tra phần Troubleshooting hoặc đọc QUICKSTART.md*
