# 📊 E-Commerce API - Tóm tắt

## Tổng quan
Một API thương mại điện tử bằng Node.js + Express + MongoDB, hỗ trợ REST và GraphQL.

## Chức năng chính
- Đăng ký / đăng nhập / profile
- Quản lý sản phẩm, danh mục (CRUD admin)
- Giỏ hàng: thêm, sửa, xóa, xóa sạch
- Đơn hàng: tạo, xem, cập nhật trạng thái (admin)
- Review sản phẩm và tính rating
- Swagger tại `/api-docs`, GraphQL tại `/graphql`

## Công nghệ chính
- Node.js, Express
- MongoDB, Mongoose
- JWT, bcryptjs
- Apollo Server
- Zod, Helmet, CORS, Morgan

## API chính
- `POST /api/auth/register`, `POST /api/auth/login`
- `GET /api/auth/profile`, `PUT /api/auth/profile`
- `GET /api/categories`, `POST /api/categories`, `PUT /api/categories/:id`, `DELETE /api/categories/:id`
- `GET /api/products`, `GET /api/products/:id`, `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`
- `GET /api/cart`, `POST /api/cart/add`, `PUT /api/cart/update`, `DELETE /api/cart/remove/:id`, `DELETE /api/cart/clear`
- `POST /api/orders`, `GET /api/orders`, `GET /api/orders/:id`, `PUT /api/orders/:id/status`
- `POST /api/products/:id/reviews`, `GET /api/products/:id/reviews`

## Quick commands
```bash
npm install
npm run seed
npm run dev
npm start
```

## Sample accounts
- Admin: `admin@ecommerce.com` / `Admin@123456`
- User: `user@ecommerce.com` / `User@123456`

**Hoàn thành: REST + GraphQL, bảo mật JWT, validation Zod, Swagger, seeding dữ liệu.**
