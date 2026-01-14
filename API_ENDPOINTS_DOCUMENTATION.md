# API Endpoints Documentation

This document lists all API endpoints needed for the Creelo frontend application, along with their request and response DTOs (Data Transfer Objects).

## Base URL
```
Base URL: {NEXT_PUBLIC_API_BASE_URL} (default: http://18.212.69.104/)
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer {token}
```

---

## 1. Authentication Endpoints

### 1.1 Verify Email
**Endpoint:** `POST /accounts/verify-email/`  
**Description:** Verifies if an email exists in the system before proceeding with login.  
**Authentication:** Not required

**Request DTO:**
```typescript
{
  email: string;  // Valid email address
}
```

**Response DTO:**
```typescript
{
  message?: string;  // Success message (optional)
  // Status 200 indicates email exists
}
```

**Error Response:**
```typescript
{
  error?: string;
  message?: string;
  // Status 400/404 indicates email does not exist
}
```

---

### 1.2 User Sign In
**Endpoint:** `POST /accounts/user-sign/`  
**Description:** Authenticates user with email and password.  
**Authentication:** Not required

**Request DTO:**
```typescript
{
  email: string;     // User's email address
  password: string;  // User's password
}
```

**Response DTO:**
```typescript
{
  access_token: string;  // JWT token for authenticated requests
  refresh_token?: string;  // Optional refresh token
  user?: {
    id: number;
    email: string;
    name?: string;
  };
}
```

**Error Response:**
```typescript
{
  error?: string;
  message?: string;
  // Status 401 for invalid credentials
}
```

---

## 2. Product Listing Endpoints

### 2.1 Get Products List
**Endpoint:** `GET /api/get-product`  
**Description:** Retrieves a list of products. Supports query parameters for filtering, sorting, and pagination.  
**Authentication:** Not required

**Query Parameters:**
```typescript
{
  page?: number;           // Page number (default: 1)
  page_size?: number;      // Items per page (default: 20)
  category?: string;       // Filter by category ID or slug
  min_price?: number;      // Minimum price filter
  max_price?: number;      // Maximum price filter
  sort?: string;          // Sort option: 'price-low-high', 'price-high-low', 'popularity', 'relevance'
  search?: string;        // Search query
}
```

**Response DTO:**
```typescript
{
  count: number;           // Total number of products
  next: string | null;     // URL to next page
  previous: string | null; // URL to previous page
  results: ProductDTO[];   // Array of products
}

// ProductDTO
{
  id: number;
  name: string;
  description?: string;
  price: number;
  discount?: number;      // Discount percentage
  availability?: string;
  rating?: number;
  reviews?: number;
  popularity?: number;
  images: ProductImageDTO[];
  category?: {
    id: number;
    name: string;
    level1?: string;
    slug?: string;
  };
  created_at?: string;
  updated_at?: string;
}

// ProductImageDTO
{
  id: number;
  image: string;          // Image URL path (relative to base URL)
  is_primary?: boolean;
  alt_text?: string;
}
```

---

### 2.2 Get Product Details
**Endpoint:** `GET /api/products/{id}/`  
**Description:** Retrieves detailed information about a specific product.  
**Authentication:** Not required

**Path Parameters:**
- `id`: Product ID (number)

**Response DTO:**
```typescript
{
  id: number;
  name: string;
  description: string;
  long_description?: string;
  price: number;
  discount?: number;
  discounted_price?: number;
  availability: string;  // 'in_stock', 'out_of_stock', 'pre_order'
  stock_quantity?: number;
  rating?: number;
  reviews_count?: number;
  popularity?: number;
  sku?: string;
  brand?: {
    id: number;
    name: string;
    logo?: string;
  };
  category: {
    id: number;
    name: string;
    level1?: string;
    level2?: string;
    slug?: string;
  };
  images: ProductImageDTO[];
  specifications?: {
    [key: string]: string | number;
  };
  related_products?: ProductDTO[];
  created_at?: string;
  updated_at?: string;
}
```

**Error Response:**
```typescript
{
  error?: string;
  message?: string;
  // Status 404 if product not found
}
```

---

## 3. Cart Endpoints

### 3.1 Add to Cart / Update Cart Item
**Endpoint:** `POST /api/add-to-cart/`  
**Description:** Adds a product to cart or updates quantity/removes item based on action.  
**Authentication:** Required

**Request DTO:**
```typescript
{
  product_id: number;  // Product ID to add/update/remove
  action: string;      // 'add', 'reduce', 'delete'
  quantity?: number;   // Quantity (required for 'add', optional for 'reduce')
}
```

**Response DTO:**
```typescript
{
  message?: string;    // Success message
  product_id?: number;
  quantity?: number;
}
```

**Error Response:**
```typescript
{
  error?: string;
  message?: string;
  // Status 400 for invalid request
  // Status 401 for unauthorized
  // Status 404 if product not found
}
```

---

### 3.2 Get Cart
**Endpoint:** `GET /api/cart/`  
**Description:** Retrieves the current user's cart with all items.  
**Authentication:** Required

**Response DTO:**
```typescript
{
  id?: number;
  items: CartItemDTO[];
  total_price: number;
  total_items: number;
  created_at?: string;
  updated_at?: string;
}

// CartItemDTO
{
  id: number;              // Cart item ID
  product: number;          // Product ID
  product_name: string;
  product_image?: string;
  price: number;            // Unit price
  quantity: number;
  subtotal: number;        // price * quantity
}
```

**Error Response:**
```typescript
{
  error?: string;
  message?: string;
  // Status 401 for unauthorized
}
```

---

### 3.3 Remove Cart Item
**Endpoint:** `DELETE /api/cart/{item_id}/` or `POST /api/cart/remove/`  
**Description:** Removes a specific item from the cart.  
**Authentication:** Required

**Path Parameters (if using DELETE):**
- `item_id`: Cart item ID (number)

**Request DTO (if using POST):**
```typescript
{
  item_id: number;  // Cart item ID to remove
}
```

**Response DTO:**
```typescript
{
  message: string;  // Success message
}
```

**Error Response:**
```typescript
{
  error?: string;
  message?: string;
  // Status 404 if item not found
}
```

---

### 3.4 Update Cart Item Quantity
**Endpoint:** `PUT /api/cart/{item_id}/` or `PATCH /api/cart/{item_id}/`  
**Description:** Updates the quantity of a specific cart item.  
**Authentication:** Required

**Path Parameters:**
- `item_id`: Cart item ID (number)

**Request DTO:**
```typescript
{
  quantity: number;  // New quantity (must be > 0)
}
```

**Response DTO:**
```typescript
{
  id: number;
  product: number;
  quantity: number;
  price: number;
  subtotal: number;
  message?: string;
}
```

---

### 3.5 Clear Cart
**Endpoint:** `DELETE /api/cart/` or `POST /api/cart/clear/`  
**Description:** Removes all items from the cart.  
**Authentication:** Required

**Response DTO:**
```typescript
{
  message: string;  // Success message
}
```

---

## 4. Checkout Endpoints

### 4.1 Create Checkout / Place Order
**Endpoint:** `POST /api/checkout/`  
**Description:** Creates a checkout session and places an order.  
**Authentication:** Required

**Request DTO:**
```typescript
{
  shipping_address: {
    full_name: string;
    phone: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  billing_address?: {
    full_name: string;
    phone: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  payment_method: string;  // 'cod', 'card', 'upi', 'netbanking'
  payment_details?: {
    card_number?: string;
    card_holder_name?: string;
    expiry_date?: string;
    cvv?: string;
    upi_id?: string;
    bank_name?: string;
  };
  notes?: string;  // Order notes
}
```

**Response DTO:**
```typescript
{
  order_id: string;        // Unique order identifier
  order_number: string;    // Human-readable order number
  status: string;          // 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
  total_amount: number;
  items: OrderItemDTO[];
  shipping_address: AddressDTO;
  billing_address: AddressDTO;
  payment_status: string;  // 'pending', 'paid', 'failed', 'refunded'
  estimated_delivery?: string;  // ISO date string
  created_at: string;
}

// OrderItemDTO
{
  id: number;
  product_id: number;
  product_name: string;
  product_image?: string;
  price: number;
  quantity: number;
  subtotal: number;
}

// AddressDTO
{
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}
```

**Error Response:**
```typescript
{
  error?: string;
  message?: string;
  errors?: {
    [field: string]: string[];
  };
  // Status 400 for validation errors
  // Status 401 for unauthorized
}
```

---

### 4.2 Get Checkout Details
**Endpoint:** `GET /api/checkout/{order_id}/`  
**Description:** Retrieves details of a specific order/checkout.  
**Authentication:** Required

**Path Parameters:**
- `order_id`: Order ID (string)

**Response DTO:**
```typescript
{
  order_id: string;
  order_number: string;
  status: string;
  total_amount: number;
  items: OrderItemDTO[];
  shipping_address: AddressDTO;
  billing_address: AddressDTO;
  payment_status: string;
  payment_method: string;
  tracking_number?: string;
  estimated_delivery?: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
}
```

---

## 5. Orders Endpoints

### 5.1 Get User Orders
**Endpoint:** `GET /api/orders/`  
**Description:** Retrieves list of orders for the authenticated user.  
**Authentication:** Required

**Query Parameters:**
```typescript
{
  page?: number;        // Page number (default: 1)
  page_size?: number;   // Items per page (default: 20)
  status?: string;      // Filter by status: 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
  order_by?: string;    // Sort by: 'created_at', 'total_amount'
}
```

**Response DTO:**
```typescript
{
  count: number;
  next: string | null;
  previous: string | null;
  results: OrderSummaryDTO[];
}

// OrderSummaryDTO
{
  order_id: string;
  order_number: string;
  status: string;
  total_amount: number;
  item_count: number;
  created_at: string;
  estimated_delivery?: string;
  thumbnail_image?: string;  // First product image
}
```

---

### 5.2 Get Order Details
**Endpoint:** `GET /api/orders/{order_id}/`  
**Description:** Retrieves detailed information about a specific order.  
**Authentication:** Required

**Path Parameters:**
- `order_id`: Order ID (string)

**Response DTO:**
```typescript
{
  order_id: string;
  order_number: string;
  status: string;
  total_amount: number;
  subtotal: number;
  shipping_cost: number;
  tax?: number;
  discount?: number;
  items: OrderItemDTO[];
  shipping_address: AddressDTO;
  billing_address: AddressDTO;
  payment_status: string;
  payment_method: string;
  payment_transaction_id?: string;
  tracking_number?: string;
  carrier?: string;
  estimated_delivery?: string;
  delivered_at?: string;
  cancelled_at?: string;
  cancellation_reason?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}
```

**Error Response:**
```typescript
{
  error?: string;
  message?: string;
  // Status 404 if order not found
  // Status 403 if order doesn't belong to user
}
```

---

### 5.3 Cancel Order
**Endpoint:** `POST /api/orders/{order_id}/cancel/`  
**Description:** Cancels a specific order (if allowed based on order status).  
**Authentication:** Required

**Path Parameters:**
- `order_id`: Order ID (string)

**Request DTO:**
```typescript
{
  reason?: string;  // Optional cancellation reason
}
```

**Response DTO:**
```typescript
{
  message: string;
  order_id: string;
  status: string;  // Should be 'cancelled'
}
```

**Error Response:**
```typescript
{
  error?: string;
  message?: string;
  // Status 400 if order cannot be cancelled
  // Status 404 if order not found
}
```

---

## 6. Categories Endpoint

### 6.1 Get Categories
**Endpoint:** `GET /master-config/categories/`  
**Description:** Retrieves the category hierarchy for navigation.  
**Authentication:** Not required

**Response DTO:**
```typescript
CategoryDTO[];

// CategoryDTO
{
  id: number;
  name: string;
  slug?: string;
  link?: string;
  parent?: {
    id: number;
    name: string;
  } | null;
  children?: CategoryDTO[];  // Nested categories
  image?: string;
  description?: string;
}
```

---

## Common Error Response Format

All endpoints may return errors in the following format:

```typescript
{
  error?: string;           // Error type/code
  message?: string;         // Human-readable error message
  errors?: {                // Field-specific validation errors
    [field: string]: string[];
  };
  detail?: string;          // Additional error details
}
```

## HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Notes

1. **Pagination**: All list endpoints should support pagination using `page` and `page_size` query parameters.

2. **Filtering**: Product listing should support filtering by category, price range, and search query.

3. **Sorting**: Product listing should support multiple sort options (price, popularity, relevance).

4. **Image URLs**: Product images are returned as relative paths and should be prefixed with the base URL when displaying.

5. **Token Management**: The access token should be stored in localStorage and included in the Authorization header for authenticated requests.

6. **Cart Operations**: The cart endpoints support multiple actions (add, reduce, delete) through a single endpoint, or separate endpoints can be used for better RESTful design.

