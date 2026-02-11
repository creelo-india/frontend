# Backend Endpoints Required for Full Production E-Commerce Platform

**Project:** Troowe / Creelo  
**Purpose:** Single source of truth for backend API requirements to run the consumer-facing storefront in production.  
**Frontend alignment:** Current storefront calls are documented; any new endpoint must match this contract or the frontend will need updates.

---

## 1. Summary

| Priority | Count | Description |
|----------|--------|-------------|
| **Required (already exist)** | 11 | Must remain available; frontend depends on them |
| **Critical (missing)** | 1 | Blocking for “Add to cart” and checkout with real prices |
| **Recommended** | 1–2 | Registration UX (roles or default USER role) |
| **Optional (production-ready)** | 6+ | Payments, addresses, refresh token, password reset, search, etc. |

---

## 2. Required Endpoints (Must Exist)

These endpoints are used by the frontend today. They **must** be present and stable for the storefront to work.

### 2.1 Health & Infrastructure

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/health` | No | Health check (e.g. status, timestamp). Used for monitoring/uptime. |

---

### 2.2 Authentication

| Method | Path | Auth | Request body | Response / Notes |
|--------|------|------|---------------|-------------------|
| POST | `/api/auth/login` | No | `{ email, password }` | JWT (e.g. `access_token` or `token`) + optional user/role info. Frontend stores token and sends `Authorization: Bearer <token>`. |
| POST | `/api/auth/register` | No | `{ name, email, password, roleId }` | Success (e.g. 201) and optionally user/token. **roleId** must be the UUID of the seeded **USER** role (see § 3.2). |

---

### 2.3 Catalog (Public)

| Method | Path | Auth | Query params | Purpose |
|--------|------|------|--------------|---------|
| GET | `/api/categories` | No | — | Flat list of active categories: `id`, `name`, `slug`, `level`, `parentId`. Used for nav and category listing. |
| GET | `/api/categories/:categoryId/types` | No | — | Types for a category: `[{ id, name }, ...]`. Optional for filters. |
| GET | `/api/catalog/master-products` | No | `categoryId`, `includeInactive` | List of master products for browsing. Response: array or `{ data: [] }`. **Note:** `categoryId` is documented as **MasterCategory** id; if backend uses Category id elsewhere, alignment or mapping may be needed. |
| GET | `/api/catalog/master-products/:id` | No | — | Single master product (name, image/category, etc.). Used for product detail page. |

---

### 2.4 Orders (Protected)

| Method | Path | Auth | Request / Response |
|--------|------|------|--------------------|
| POST | `/api/orders` | JWT + `PLACE_ORDER` | **Body:** `{ items: [{ vendorProductId, quantity }, ...] }`. Creates order; validates stock, vendor approval, active vendor product and master product; decrements stock. |
| GET | `/api/orders` | JWT | List orders for the current user. |
| GET | `/api/orders/:id` | JWT | Single order (own only). |
| PATCH | `/api/orders/:id/status` | JWT (VENDOR / ADMIN / SUPER_ADMIN) | **Body:** `{ status }`. For vendor/admin order lifecycle (e.g. CONFIRMED, SHIPPED, DELIVERED, CANCELLED). |

---

## 3. Critical Missing Endpoint (Blocking for Production)

### 3.1 Purchasable vendor listings

Without this, the storefront **cannot** show prices or “Add to cart” from real data; checkout would have no valid `vendorProductId` to send.

| Method | Path | Auth | Query params | Response |
|--------|------|------|---------------|----------|
| GET | `/api/catalog/vendor-listings` **or** `/api/store/products` | No (or USER) | `categoryId`, `masterProductId`, `search`, `page`, `limit` | List of **purchasable** vendor listings. Each item must include at least: **id** (vendorProductId), **price**, **stock**, **masterProductId** (or link to master product), and enough for display (e.g. name, image, vendor name). Only APPROVED vendors, ACTIVE vendor product, and active master product. |

**Frontend usage:**  
- Listing page: `?categoryId=...` and optionally `?search=...`, `?page=...`, `?limit=...`.  
- Product detail: `?masterProductId=...` to show offers for one master product.  

**Suggested response shape (per item):**

- `id` — VendorProduct id (used as `vendorProductId` in cart and `POST /api/orders`).
- `price`, `stock`
- `masterProductId` and/or nested `masterProduct` (id, name, imageUrl/image)
- `vendor` or `vendorName` (for display)

---

## 4. Recommended (Registration UX)

### 4.1 Resolving USER roleId for registration

`POST /api/auth/register` requires **roleId**. Frontend currently can use env (`VITE_USER_ROLE_ID` / `REACT_APP_USER_ROLE_ID`). For a better and more robust setup, backend should do one of:

| Option | Endpoint / behavior | Benefit |
|--------|---------------------|---------|
| A | **GET /api/roles** or **GET /api/auth/roles** (public) — returns e.g. `[{ id, name }, ...]` | Frontend picks USER role by name, no env. |
| B | **No new endpoint:** register accepts e.g. `role: "USER"` or omits role; backend sets default consumer role server-side | Simpler client; no roleId/roles API needed. |

Implementing **one** of (A) or (B) is recommended for production so registration does not depend on a hardcoded UUID.

---

## 5. Optional Endpoints (Full Production / Scale)

Use when you need long-lived sessions, self-service recovery, payments, or fulfillment.

### 5.1 Auth

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/auth/refresh` | Refresh token in body or cookie | Issue new access token; support long-lived sessions without re-login. |
| POST | `/api/auth/forgot-password` | No | Body: `{ email }`. Send reset link or token. |
| POST | `/api/auth/reset-password` | No | Body: `{ token, newPassword }` (or similar). Complete password reset. |

### 5.2 Search

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/catalog/master-products` | No | Support **`search`** or **`q`** query param for server-side search (frontend can send `?q=...` from header search). |
| GET | `/api/catalog/vendor-listings` | No | Support **`search`** (or **`q`**) for server-side search on purchasable listings. |

If not implemented, frontend can continue with client-side filtering on already-fetched list/category data.

### 5.3 Orders & Fulfillment

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| (Existing) | GET/POST/PATCH orders | — | Extend order payload to include **shipping address**, **billing address**, or **delivery instructions** when backend schema supports it. |
| GET | e.g. `/api/orders/:id/tracking` | JWT | Optional: tracking info or status history for “My orders” and notifications. |

### 5.4 Payments

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | e.g. `/api/orders/:id/payment-intent` or `/api/payments/create` | JWT | Create payment intent (Stripe/Razorpay/etc.) for an order. |
| GET/POST | e.g. `/api/payments/webhook` | Webhook secret | Handle gateway callbacks and update order/payment status. |

Design depends on chosen gateway; not required for “create order + stock” flow.

### 5.5 User profile (optional)

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/users/me` or `/api/auth/me` | JWT | Return current user (id, email, name, role). Useful for header and account pages. |
| PATCH | `/api/users/me` | JWT | Update name, email, or password. |

---

## 6. Quick Checklist (Backend Team)

- [ ] **Health:** `GET /api/health` exists and is stable.
- [ ] **Auth:** `POST /api/auth/login` and `POST /api/auth/register` (with `roleId`) exist; JWT is returned and accepted on protected routes.
- [ ] **Catalog:** `GET /api/categories`, `GET /api/catalog/master-products`, `GET /api/catalog/master-products/:id` exist and return the expected shapes.
- [ ] **Orders:** `POST /api/orders` (body: `items: [{ vendorProductId, quantity }]`), `GET /api/orders`, `GET /api/orders/:id` work with JWT and PLACE_ORDER where required.
- [ ] **Critical:** Implement **GET /api/catalog/vendor-listings** (or `/api/store/products`) with at least `id`, `price`, `stock`, `masterProductId`/master product summary, and vendor info; filter by APPROVED/ACTIVE/active master.
- [ ] **Recommended:** Either **GET /api/roles** (or `/api/auth/roles**) or server-side default USER role for registration.
- [ ] **Optional (as needed):** Refresh token, forgot/reset password, search params on catalog/vendor-listings, addresses on orders, payment endpoints, user profile.

---

## 7. Reference: What the Frontend Sends Today

| Frontend call | Backend endpoint (expected) |
|---------------|-----------------------------|
| Categories nav | `GET api/categories` |
| Category listing | `GET api/catalog/master-products?categoryId=...` (and vendor-listings when implemented) |
| Product search page | `GET api/catalog/master-products` (+ optional `?categoryId=`, `?q=...` when supported); `GET api/catalog/vendor-listings` with same params |
| Product detail | `GET api/catalog/master-products/:id`, `GET api/catalog/vendor-listings?masterProductId=:id` |
| Login | `POST api/auth/login` with `{ email, password }` |
| Register | `POST api/auth/register` with `{ name, email, password, roleId }` (roleId from env or future roles API) |
| Checkout | `POST api/orders` with `{ items: [{ vendorProductId, quantity }] }`; `Authorization: Bearer <token>` |

All requests use the same base URL (env); auth token is attached by the frontend interceptors for protected routes.
