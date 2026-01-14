# API Endpoints Summary

Quick reference for all API endpoints needed for the Creelo frontend application.

## Base URL
```
{NEXT_PUBLIC_API_BASE_URL} (default: http://18.212.69.104/)
```

---

## 1. Authentication

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/accounts/verify-email/` | No | Verify if email exists |
| POST | `/accounts/user-sign/` | No | User login/sign in |

---

## 2. Product Listing

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/get-product` | No | Get list of products (with filters, sorting, pagination) |
| GET | `/api/products/{id}/` | No | Get product details by ID |

**Query Parameters for GET `/api/get-product`:**
- `page`, `page_size`, `category`, `min_price`, `max_price`, `sort`, `search`

---

## 3. Cart

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/add-to-cart/` | Yes | Add/update/remove cart item (action: 'add', 'reduce', 'delete') |
| GET | `/api/cart/` | Yes | Get user's cart |
| DELETE | `/api/cart/{item_id}/` | Yes | Remove specific cart item |
| PUT/PATCH | `/api/cart/{item_id}/` | Yes | Update cart item quantity |
| DELETE | `/api/cart/` | Yes | Clear entire cart |

---

## 4. Checkout

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/checkout/` | Yes | Create checkout and place order |
| GET | `/api/checkout/{order_id}/` | Yes | Get checkout/order details |

---

## 5. Orders

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/orders/` | Yes | Get user's order list (with pagination, filters) |
| GET | `/api/orders/{order_id}/` | Yes | Get specific order details |
| POST | `/api/orders/{order_id}/cancel/` | Yes | Cancel an order |

**Query Parameters for GET `/api/orders/`:**
- `page`, `page_size`, `status`, `order_by`

---

## 6. Categories

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/master-config/categories/` | No | Get category hierarchy |

---

## Request/Response DTOs

See `API_ENDPOINTS_DOCUMENTATION.md` for detailed request and response DTOs for each endpoint.

---

## Authentication Header

For authenticated endpoints, include:
```
Authorization: Bearer {token}
```

Token is stored in `localStorage.getItem('token')` after successful login.

