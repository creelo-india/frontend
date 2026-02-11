# E-Commerce Platform Readiness Report  
**Consumer-Facing Storefront (Company Front Face)**

*Generated from Troowe Backend codebase. Covers what is ready for an end-consumer e-commerce experience and what is missing or needs attention.*

---

## 1. Executive Summary

The backend supports **consumer identity**, **browsing catalog structure**, **master product catalog**, and **order placement with stock and permissions**. The main gap for a full storefront is a **public API to list purchasable vendor listings** (price, stock, `vendorProductId`) so the frontend can show “Buy” and pass the correct IDs into checkout. Registration also requires the frontend to obtain a **USER role ID** (e.g. from a public roles endpoint or env).

---

## 2. What Is Ready for the Consumer-Facing Platform

### 2.1 Authentication (Consumer = USER)

| Feature | Status | API / Notes |
|--------|--------|-------------|
| User registration | ✅ Ready | `POST /api/auth/register` – Body: `name`, `email`, `password`, **`roleId`** (see 3.1) |
| User login | ✅ Ready | `POST /api/auth/login` – Body: `email`, `password` – Returns JWT + user info (incl. `role`, permissions) |
| JWT usage | ✅ Ready | Send `Authorization: Bearer <token>` for protected routes |
| Consumer role & permissions | ✅ Ready | Seed gives **USER** role: `PLACE_ORDER`, `VIEW_ORDERS`, `LIST_PRODUCT` |

Consumer = user with role **USER** and `roleId` pointing to the seeded USER role. Permissions are loaded via `roleRelation` and attached to the request (e.g. for `PermissionsGuard`).

---

### 2.2 Catalog Browsing (Public, No Auth)

| Feature | Status | API / Notes |
|--------|--------|-------------|
| Active categories | ✅ Ready | `GET /api/categories` – Flat list of active categories: `id`, `name`, `slug`, `level`, `parentId` |
| Category types (e.g. filters) | ✅ Ready | `GET /api/categories/:categoryId/types` – Returns `[{ id, name }, ...]` for that category |
| Master product catalog | ✅ Ready | `GET /api/catalog/master-products` – Public. Query: `?categoryId=`, `?includeInactive=true` |
| Single master product | ✅ Ready | `GET /api/catalog/master-products/:id` – Public. Includes category, variants, etc. |

**Note:** The backend has two category systems: (1) **Category** – admin-managed hierarchy used by `GET /api/categories` and by vendor/product flows; (2) **MasterCategory** – used only by **MasterProduct**. So `GET /api/catalog/master-products?categoryId=` expects a **MasterCategory** id, not a Category id. For a single storefront tree, the frontend may need to use one tree (e.g. Category) and the backend may need to expose or map MasterCategory for catalog filtering. Master product list is suitable for “browse by category” and product detail pages once category ids are aligned.

---

### 2.3 Orders (Consumer Checkout & History)

| Feature | Status | API / Notes |
|--------|--------|-------------|
| Create order | ✅ Ready | `POST /api/orders` – **Auth:** JWT + permission `PLACE_ORDER`. Body: `{ items: [{ vendorProductId, quantity }, ...] }` |
| List my orders | ✅ Ready | `GET /api/orders` – **Auth:** JWT. Returns orders for the current user |
| Order by ID | ✅ Ready | `GET /api/orders/:id` – **Auth:** JWT. User can only see own orders |
| Order status flow | ✅ Ready | Backend supports: PENDING → CONFIRMED → SHIPPED → DELIVERED; CONFIRMED/SHIPPED can go to CANCELLED |
| Stock & validation | ✅ Ready | On create: stock check, vendor approved, vendor product ACTIVE, master product active; stock decremented in transaction |
| Order status update | ✅ Ready | `PATCH /api/orders/:id/status` – **Auth:** VENDOR (own items) or ADMIN/SUPER_ADMIN. Body: `{ status }` |

Orders are tied to **VendorProduct** (vendor’s listing with price and stock), not the simple **Product** model. So the storefront must send **vendorProductId** in each order item.

---

### 2.4 Infrastructure & Security

| Feature | Status | Notes |
|--------|--------|-------|
| Global API prefix | ✅ Ready | All routes under `/api` |
| Validation | ✅ Ready | Global ValidationPipe (whitelist, transform) |
| CORS | ✅ Ready | Configurable via `CORS_ORIGINS`; dev can allow all |
| Health check | ✅ Ready | `GET /api/health` – Status and timestamp |
| Role-based access | ✅ Ready | Roles: USER, ADMIN, SUPER_ADMIN, VENDOR. Guards: JwtAuthGuard, RolesGuard, PermissionsGuard |
| Permission-based access | ✅ Ready | USER has PLACE_ORDER, VIEW_ORDERS, LIST_PRODUCT (seed) |

---

## 3. Gaps and Recommendations for Full Storefront

### 3.1 Critical: No Public “Purchasable Listings” API

- **Gap:** Checkout expects **vendorProductId** and **quantity**. There is **no public endpoint** that returns a list of **VendorProduct** (price, stock, vendor, link to master product) for the storefront.
- **Current:**  
  - `GET /api/catalog/master-products` – good for catalog browsing (name, category, variants count, etc.) but does **not** expose vendor listings or prices.  
  - Vendor product list is under `GET /api/vendor-products` and is **vendor-only** (JWT + VENDOR).
- **Recommendation:** Add a **public or USER-authenticated** API, e.g.:
  - `GET /api/store/products` or `GET /api/catalog/vendor-listings`  
  - Query: `categoryId`, `masterProductId`, `search`, `page`, `limit`  
  - Response: list of **VendorProduct** (id, price, stock, vendor info, master product summary) where vendor is APPROVED, vendor product status is ACTIVE, and master product is active.  
- **Frontend use:** Use this to drive “Add to cart” (store `vendorProductId` + quantity) and then call `POST /api/orders` with the same IDs.

### 3.2 Registration Requires roleId

- **Gap:** `POST /api/auth/register` requires **roleId**. Consumers must register with the USER role’s UUID.
- **Recommendation:**  
  - Option A: Add a public `GET /api/roles` (or `GET /api/auth/roles`) that returns roles (e.g. id, name) so the frontend can use the USER role id for registration.  
  - Option B: Backend accepts a “default consumer role” (e.g. by name “USER”) and resolves roleId server-side so the client does not send roleId.  
  - Option C: Frontend stores the seeded USER role UUID in env/config (fragile if DB is reseeded).

### 3.3 Two Product Models (Clarity for Frontend)

- **Product (vendor “simple” products):** Used in `/api/vendor/products` (vendor creates, admin approves). Not used in the current **Order** flow.  
- **VendorProduct + MasterProduct:** Used in **Order** items. Vendors create VendorProduct via `/api/vendor-products` linked to a MasterProduct; consumer orders reference **VendorProduct** ids.  
- **Recommendation:** For the **consumer storefront**, use only **MasterProduct** (catalog) and **VendorProduct** (listings with price/stock). Ignore the simple Product model for storefront flows. Implement the public vendor-listings API (3.1) so the storefront never needs to call vendor-only routes.

### 3.4 Optional Enhancements (Later)

- **Refresh token:** Auth controller has no refresh endpoint; only login/register. Add refresh if you need long-lived sessions.
- **Password reset:** For consumer auth, consider forgot-password / reset-password (vendor-auth already has similar flow).
- **Cart:** Backend has no cart entity; frontend can keep cart in state/localStorage and send items to `POST /api/orders` when checking out.
- **Payments:** No payment gateway integration; order creation only records order and updates stock. Add payment when required.
- **Addresses:** Order has no shipping/billing address fields in schema; add if needed for fulfillment and invoices.

---

## 4. Consumer Journey vs Backend Readiness

| Step | Backend status | Notes |
|------|----------------|------|
| Landing / browse categories | ✅ | `GET /api/categories` |
| Browse products in category | ✅ | `GET /api/catalog/master-products?categoryId=` |
| Product detail (catalog) | ✅ | `GET /api/catalog/master-products/:id` |
| See prices & “Add to cart” | ❌ | Need public vendor-listings API (see 3.1) |
| Login / Register | ✅ | Register needs roleId (see 3.2) |
| Checkout (create order) | ✅ | `POST /api/orders` with `vendorProductId` + quantity |
| My orders | ✅ | `GET /api/orders`, `GET /api/orders/:id` |
| Order status updates | ✅ | Vendor/Admin via `PATCH /api/orders/:id/status` |

---

## 5. Quick Reference – Consumer-Relevant Endpoints

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | /api/health | No | Health check |
| GET | /api/categories | No | Active categories |
| GET | /api/categories/:categoryId/types | No | Types for a category |
| GET | /api/catalog/master-products | No | Catalog list (optional ?categoryId=, ?includeInactive=) |
| GET | /api/catalog/master-products/:id | No | Master product detail |
| POST | /api/auth/register | No | Register (body: name, email, password, **roleId**) |
| POST | /api/auth/login | No | Login (body: email, password) |
| POST | /api/orders | JWT + PLACE_ORDER | Create order (body: items: [{ vendorProductId, quantity }]) |
| GET | /api/orders | JWT | List my orders |
| GET | /api/orders/:id | JWT | Get order (own only) |

---

## 6. Summary

- **Ready for e-commerce platform (consumer-facing):** Auth (register/login with USER role), public catalog (categories, types, master products), and full order lifecycle (create, list, get, status updates) with stock and permissions.
- **Blocking for a complete storefront:** A **public (or USER) API that returns purchasable vendor listings** (with price, stock, vendorProductId) so the frontend can build cart and checkout. Optionally, a way for the frontend to get **USER roleId** for registration (e.g. public roles endpoint or server-side default).
- **Recommendation:** Implement the storefront vendor-listings API and a small registration aid (roles endpoint or default USER roleId); then the same backend can serve as the company’s front face for end consumers.
