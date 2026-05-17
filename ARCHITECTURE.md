# 🏗️ E-Commerce API - Kiến Trúc & Thiết Kế

## 📋 Mục lục
1. [Tổng quan kiến trúc](#tổng-quan-kiến-trúc)
2. [Lớp ứng dụng](#lớp-ứng-dụng)
3. [Data Flow](#data-flow)
4. [Mô hình dữ liệu](#mô-hình-dữ-liệu)
5. [Design Patterns](#design-patterns)
6. [Best Practices](#best-practices)

---

## 🎯 Tổng quan kiến trúc

Dự án sử dụng **3-Tier Architecture** với REST API và GraphQL:

```
┌─────────────────────────────────────────┐
│          CLIENT LAYER                   │
│  (Web Browser / Mobile App / Desktop)   │
└────────┬────────────────────┬───────────┘
         │                    │
    REST API            GraphQL API
    (HTTP)            (WebSocket)
         │                    │
┌────────▼────────────────────▼───────────┐
│        MIDDLEWARE LAYER                 │
│  Auth │ Validation │ Error Handling     │
└────────┬─────────────────────────────────┘
         │
┌────────▼─────────────────────────────────┐
│       BUSINESS LOGIC LAYER              │
│  Controllers │ Resolvers │ Services     │
└────────┬─────────────────────────────────┘
         │
┌────────▼─────────────────────────────────┐
│         DATA LAYER                       │
│  Models (Mongoose) │ Database (MongoDB)  │
└─────────────────────────────────────────┘
```

---

## 🔀 Lớp ứng dụng

### **1. Client Layer**
- Web Browser (REST API + Swagger UI)
- Mobile App (REST API)
- Desktop App (GraphQL)

### **2. API Layer**

#### **REST API**
- **Điểm cuối:** `/api/*`
- **Format:** JSON
- **Xác thực:** Bearer JWT Token
- **Tài liệu:** Swagger/OpenAPI

#### **GraphQL API**
- **Điểm cuối:** `/graphql`
- **Query Language:** GraphQL
- **Xác thực:** JWT in Authorization header
- **IDE:** Apollo Sandbox / GraphiQL

### **3. Middleware Layer**

#### **Security Middlewares**
```javascript
// helmet - Security headers
// cors - Cross-origin requests
// rate-limit - Rate limiting
// morgan - HTTP logging
```

#### **Authentication**
```javascript
authMiddleware → Kiểm tra JWT token
adminMiddleware → Kiểm tra role admin
```

#### **Validation**
```javascript
Zod schemas → Kiểm tra input data
ZodError handler → Format error response
```

#### **Error Handling**
```javascript
errorHandler → Xử lý lỗi toàn cục
Format → JSON response chuẩn
```

### **4. Business Logic Layer**

#### **Controllers** (REST)
```javascript
authController
├── register()
├── login()
├── getProfile()
├── updateProfile()
└── getAllUsers()

productController
├── getProducts()
├── getProductById()
├── createProduct()
├── updateProduct()
└── deleteProduct()

cartController
├── getCart()
├── addToCart()
├── updateCart()
├── removeFromCart()
└── clearCart()

// ... orderController, categoryController, reviewController
```

#### **Resolvers** (GraphQL)
```javascript
userResolvers
├── Query: me, users
└── Mutation: register, login, updateProfile

productResolvers
├── Query: products, product
└── Mutation: createProduct, updateProduct, deleteProduct

// ... categoryResolvers, cartResolvers, orderResolvers, reviewResolvers
```

### **5. Data Access Layer**

#### **Mongoose Models**
```javascript
User → id, name, email, password (hashed), role
Product → id, name, price, stock, category, images, rating
Category → id, name, description, image
Cart → user, items[], totalPrice
Order → user, items[], status, shippingAddress, phone
Review → product, user, rating, comment
```

#### **Database Queries**
```javascript
Product.find(filter).populate('category')
Order.findByIdAndUpdate(id, {status}, {new: true})
// Mongoose handles indexes, validation, etc.
```

---

## 📊 Data Flow

### **Scenario: Đặt hàng**

```
1. CLIENT REQUEST
   POST /api/orders
   {shippingAddress, phone}
   Authorization: Bearer TOKEN

2. MIDDLEWARE
   ├── authMiddleware → Check JWT
   └── errorHandler (ready)

3. CONTROLLER
   ├── orderController.createOrder()
   ├── Validate input (Zod)
   ├── Check cart exists
   └── Create order document

4. DATABASE
   ├── Find cart with items
   ├── Create order
   ├── Update product stock (-quantity)
   └── Clear cart

5. RESPONSE
   {
     success: true,
     order: {id, items, totalPrice, status}
   }

6. CLIENT
   Display order confirmation
```

### **GraphQL Flow (Equivalent)**

```
1. CLIENT QUERY/MUTATION
   mutation {
     createOrder(shippingAddress, phone) {
       id, totalPrice, status
     }
   }

2. APOLLO SERVER
   ├── Parse GraphQL query
   ├── Resolve auth context
   └── Check @auth directive

3. RESOLVER
   ├── orderResolvers.Mutation.createOrder()
   ├── Business logic
   └── Database operations

4. RESPONSE
   {
     data: {
       createOrder: {...}
     }
   }
```

---

## 📈 Mô hình dữ liệu

### **Entity Relationship Diagram**

```
┌─────────────────────┐
│       USER          │
├─────────────────────┤
│ - id (PK)           │
│ - name              │
│ - email (UNIQUE)    │
│ - password (hashed) │
│ - role (admin/user) │
│ - createdAt         │
└──────────┬──────────┘
           │
    ┌──────┴──────┬───────────┬────────────┐
    │             │           │            │
    ▼             ▼           ▼            ▼
┌────────┐   ┌──────────┐┌────────┐  ┌────────┐
│ CART   │   │  ORDER   ││ REVIEW │  │   ?    │
│ (1:1)  │   │ (1:N)    ││ (1:N)  │  │        │
└────────┘   └──────────┘└────────┘  └────────┘
    │             │           │
    ▼             ▼           ▼
┌─────────────────────────────────┐
│       PRODUCT                   │
├─────────────────────────────────┤
│ - id (PK)                       │
│ - name                          │
│ - price                         │
│ - stock                         │
│ - category (FK)                 │
│ - images []                     │
│ - rating                        │
│ - numReviews                    │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────┐
│    CATEGORY         │
├─────────────────────┤
│ - id (PK)           │
│ - name (UNIQUE)     │
│ - description       │
│ - image             │
└─────────────────────┘
```

### **Schema Definition**

```javascript
// User Model
{
  _id: ObjectId,
  name: String (required),
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['user', 'admin']),
  profilePicture: String,
  createdAt: Date,
  updatedAt: Date
}

// Product Model
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  price: Number (required, min: 0),
  stock: Number (required, min: 0),
  category: ObjectId (ref: 'Category'),
  images: [String],
  rating: Number (default: 0, min: 0, max: 5),
  numReviews: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}

// Cart Model
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', unique),
  items: [{
    product: ObjectId (ref: 'Product'),
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  createdAt: Date,
  updatedAt: Date
}

// Order Model
{
  _id: ObjectId,
  user: ObjectId (ref: 'User'),
  items: [{
    product: ObjectId (ref: 'Product'),
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  status: String (enum: ['pending', 'processing', 'shipped', 'delivered']),
  shippingAddress: String,
  phone: String,
  createdAt: Date,
  updatedAt: Date
}

// Review Model
{
  _id: ObjectId,
  product: ObjectId (ref: 'Product'),
  user: ObjectId (ref: 'User'),
  rating: Number (min: 1, max: 5),
  comment: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Design Patterns

### **1. MVC Pattern** (REST API)

```
Route → Controller → Model → Database
         ↓
     Middleware
         ↓
      View (JSON)
```

**Ví dụ:**
```javascript
// routes/product.js
router.get('/:id', productController.getProductById);

// controllers/productController.js
exports.getProductById = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.json({success: true, product});
};

// models/Product.js
const productSchema = new mongoose.Schema({...});
```

### **2. Resolver Pattern** (GraphQL)

```
GraphQL Query → Resolver → Database
                   ↓
              Type Definitions
                   ↓
               Response
```

**Ví dụ:**
```javascript
// schemas/product.js
type Query {
  product(id: ID!): Product
}

// resolvers/productResolver.js
Query: {
  product: async (_, {id}) => {
    return await Product.findById(id);
  }
}
```

### **3. Middleware Pattern**

```
Request → Auth → Validation → Rate Limit → Controller
                                   ↓
                           Error Handler
```

### **4. Decorator Pattern** (GraphQL Directives)

```graphql
@auth    # Kiểm tra xác thực
@admin   # Kiểm tra quyền admin
```

### **5. Factory Pattern** (Token Generation)

```javascript
// config/jwt.js
const generateToken = (id, role) => {
  return jwt.sign({id, role}, JWT_SECRET, {expiresIn: JWT_EXPIRE});
};
```

### **6. Singleton Pattern** (Database Connection)

```javascript
// config/database.js
const connectDB = async () => {
  // Kết nối một lần
  return await mongoose.connect(MONGODB_URI);
};
```

---

## ✅ Best Practices

### **1. Validation**
```javascript
// Zod validation cho REST
const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

// GraphQL validation tương tự
```

### **2. Error Handling**
```javascript
// Global error handler
app.use(errorHandler);

// Kiểu: {success, message, errors, timestamp}
```

### **3. Authentication**
```javascript
// JWT with expiration
const token = generateToken(user._id, user.role);

// Middleware kiểm tra
authMiddleware → verifyToken() → req.user
```

### **4. Authorization**
```javascript
// Role-based access control
adminMiddleware → Check req.user.role === 'admin'

// GraphQL directives
@admin → Check context.user.role
```

### **5. Separation of Concerns**
- Controllers: Business logic
- Models: Data schema
- Routes: API endpoints
- Middlewares: Cross-cutting concerns
- Utils: Helper functions

### **6. Security**
```javascript
// Password hashing
await bcrypt.hash(password, 10)

// JWT with secret
jwt.sign({id, role}, JWT_SECRET)

// Helmet for security headers
app.use(helmet())

// Rate limiting
rateLimit({windowMs: 15*60*1000, max: 100})
```

### **7. Logging**
```javascript
// Morgan HTTP logger
app.use(morgan('dev'))

// Errors logged with timestamp
```

### **8. API Versioning** (Optional)
```javascript
// Có thể mở rộng: /api/v1/products
app.use('/api/v1', routes);
```

---

## 🔄 Request/Response Cycle

### **REST Endpoint**

```
1. REQUEST
   GET /api/products?page=1&limit=10
   Authorization: Bearer TOKEN

2. ROUTING
   routes/product.js → productController.getProducts

3. MIDDLEWARE
   - authMiddleware (check token)
   - errorHandler (ready)

4. VALIDATION
   - Query parameters validation
   - Filter construction

5. DATABASE
   - Product.find(filter)
     .populate('category')
     .skip(0)
     .limit(10)

6. RESPONSE
   {
     success: true,
     count: 10,
     total: 150,
     page: 1,
     pages: 15,
     products: [...]
   }
```

### **GraphQL Query**

```
1. REQUEST
   POST /graphql
   query {
     products(page: 1, limit: 10) {
       products {name, price}
     }
   }
   Authorization: Bearer TOKEN

2. PARSING
   - Parse GraphQL query
   - Extract variables

3. AUTHORIZATION
   - Check context.user
   - Verify directives (@auth, @admin)

4. RESOLUTION
   - productResolvers.Query.products()
   - Database query

5. RESPONSE
   {
     data: {
       products: {
         products: [...]
       }
     }
   }
```

---

## 📊 Performance Considerations

### **Indexes**
```javascript
// MongoDB indexes cho tốc độ truy vấn
userSchema.index({email: 1})     // Email lookup
productSchema.index({category: 1}) // Filter by category
reviewSchema.index({product: 1})  // Get reviews
```

### **Pagination**
```javascript
// Giới hạn kết quả trả về
skip = (page - 1) * limit
limit = 10 (default)
```

### **Lazy Loading** (Populate)
```javascript
// Chỉ load related data khi cần
Product.findById(id).populate('category')
```

### **Caching** (Future Enhancement)
```javascript
// Redis để cache hot data
// Invalidate cache khi update
```

---

## 🚀 Deployment Checklist

- [ ] Đặt `NODE_ENV=production`
- [ ] Tạo `JWT_SECRET` mạnh, ngẫu nhiên
- [ ] Bật HTTPS
- [ ] Configure CORS (whitelist domains)
- [ ] Setup MongoDB Atlas (cloud database)
- [ ] Enable rate limiting
- [ ] Setup error logging (Sentry, etc.)
- [ ] Monitor performance
- [ ] Backup database regularly

---

**🎯 Kiến trúc này đảm bảo:** Scalability, Maintainability, Security, Performance
