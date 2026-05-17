# 🛒 E-Commerce API - Ngắn gọn

REST + GraphQL API cho thương mại điện tử.

## Chức năng chính
- Đăng ký, đăng nhập, profile
- Quản lý sản phẩm, danh mục (admin)
- Giỏ hàng: thêm, sửa, xóa, xóa sạch
- Đơn hàng: tạo, xem, cập nhật trạng thái
- Review sản phẩm và rating
- Swagger: `/api-docs`
- GraphQL: `/graphql`

## Cài đặt nhanh
```bash
npm install
cp .env.example .env
npm run seed
npm run dev
```

## Cấu hình .env
```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key_change_in_production
JWT_EXPIRE=7d
PORT=5000
ADMIN_EMAIL=admin@ecommerce.com
ADMIN_PASSWORD=Admin@123456
```

## Endpoints chính
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `PUT /api/auth/profile`
- `GET /api/users` (admin)
- `GET /api/categories`
- `POST /api/categories` (admin)
- `PUT /api/categories/:id` (admin)
- `DELETE /api/categories/:id` (admin)
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)
- `GET /api/cart`
- `POST /api/cart/add`
- `PUT /api/cart/update`
- `DELETE /api/cart/remove/:id`
- `DELETE /api/cart/clear`
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`
- `PUT /api/orders/:id/status` (admin)
- `POST /api/products/:id/reviews`
- `GET /api/products/:id/reviews`

## Tài khoản mẫu
- Admin: `admin@ecommerce.com` / `Admin@123456`
- User: `user@ecommerce.com` / `User@123456`

## Lưu ý nhanh
- GraphQL: `/graphql`
- Swagger: `/api-docs`
- Header auth: `Authorization: Bearer <TOKEN>`

**Hoàn thành: REST + GraphQL, JWT, Zod, Swagger, seeding.**
