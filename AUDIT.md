# Frontend Audit – Consumer E-Commerce (Troowe/Creelo)

*Cross-checked against E-Commerce Platform Readiness Report and Front Panel Readiness Report.*

---

## 0. Backend Readiness (Implement Ready, Hold Pending)

The frontend is aligned with the **backend report**:

- **Ready (implemented):** We only call endpoints that the report marks as ✅ Ready: `GET /api/categories`, `GET /api/catalog/master-products`, `GET /api/catalog/master-products/:id`, `POST /api/auth/login`, `POST /api/auth/register`, `POST /api/orders`, `GET /api/orders`, `GET /api/orders/:id`. Auth interceptors attach JWT for protected routes.
- **Pending (held):** The report states there is **no public vendor-listings API** yet. The frontend **does not call** `GET /api/catalog/vendor-listings` unless explicitly enabled via **`VITE_VENDOR_LISTINGS_ENABLED` / `REACT_APP_VENDOR_LISTINGS_ENABLED=true`**. Until the backend implements that endpoint, listing and product detail use only master-products (catalog); no prices or Add to cart from API. Cart and checkout UI remain in place for when vendor-listings is ready.
- **Registration roleId:** We use env (`USER_ROLE_ID`); no call to `GET /api/roles` until backend exposes it (optional).

---

## 1. What Exists and Is Functional

| Area | Status | Notes |
|------|--------|-------|
| **Routes** | ✅ | `/`, `/login`, `/product-search` in App.js |
| **Layout** | ✅ | Header, CategoriesNavigation, main with Routes |
| **CategoriesNavigation** | ✅ | Amazon-style flyout; `GET api/categories` via axiosClient; tree from flat API; loading state |
| **Header** | ✅ | Logo, search input, Login/Logout, cart icon with count; token from localStorage |
| **ProductListingPage** | ✅ | SidebarFilter, SortBar, ProductGrid, Pagination, ProductCard – **uses products.json only** |
| **Login** | ⚠️ | Uses `/accounts/verify-email/`, `/accounts/user-sign/` – **not in backend report** |
| **Redux** | ✅ | cartData, productData; actions call `api/cart/`, `api/add-to-cart/`, `api/get-product` – **APIs not in backend report** |
| **API config** | ✅ | config.js (BASE_URL from env), interceptorApi.js (axiosClient); **auth interceptors commented out** |
| **Design** | ✅ | _variables.scss (primary, secondary, fonts); components use it; **must not change** |

---

## 2. Gaps vs Backend Report

### 2.1 Auth

- **Backend:** `POST /api/auth/login` (email, password), `POST /api/auth/register` (name, email, password, **roleId**).
- **Frontend:** Login uses different endpoints; no Register; no use of `/api/auth/*`.
- **Gap:** Align Login with `POST /api/auth/login`. Add Register with roleId from env (report Option C) or future roles API.

### 2.2 Category → Product Listing

- **Backend:** `GET /api/categories` (Category tree), `GET /api/catalog/master-products?categoryId=` (note: report says categoryId is **MasterCategory** id).
- **Frontend:** Category links use `/${slug}` (e.g. `/bathroom`); **no route** for `/:slug` or `/category/:slug`.
- **Gap:** Add route (e.g. `/category/:slug`), wire category links to it, resolve slug to category id and pass to product listing (master-products by category).

### 2.3 Product Listing (Store Front)

- **Backend:** Catalog = `GET /api/catalog/master-products` (no price/stock). Purchasing = **VendorProduct** (vendorProductId); report recommends `GET /api/store/products` or `GET /api/catalog/vendor-listings` for purchasable items (price, stock, vendorProductId).
- **Frontend:** ProductListingPage uses **products.json** only; ProductCard has no vendorProductId, no Add to Cart, no image placeholder.
- **Gap:** Use catalog APIs for browsing; call vendor-listings when available; show price, stock, vendor info; Add to Cart stores **vendorProductId** + quantity. Image placeholder with fixed size when image missing.

### 2.4 Cart & Checkout

- **Backend:** No cart API. Checkout = `POST /api/orders` with **items: [{ vendorProductId, quantity }]**; JWT + PLACE_ORDER.
- **Frontend:** Cart uses `api/cart/`, `api/add-to-cart/` (not in report); no checkout route or page.
- **Gap:** Cart = frontend-only (state/localStorage) with items as `{ vendorProductId, quantity }`. Add Checkout page that calls `POST /api/orders`.

### 2.5 Product Detail

- **Backend:** `GET /api/catalog/master-products/:id`.
- **Frontend:** No product detail route or page.
- **Gap:** Add route (e.g. `/product/:id`) and page using master-products/:id (and vendor-listings when available).

### 2.6 Other

- **Auth interceptors:** Disabled; token not auto-attached. **Enable** so JWT is sent for protected routes.
- **Error/empty states:** CategoriesNavigation has no error UI; ProductListingPage has no loading/error/empty from API.
- **Search:** Header search not wired to product-search or API.
- **Orders:** Backend has `GET /api/orders`; no frontend orders page (optional for full flow).

---

## 3. Backend Endpoints to Use (Source of Truth)

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | /api/health | No | Health |
| GET | /api/categories | No | Active categories |
| GET | /api/categories/:categoryId/types | No | Types for category |
| GET | /api/catalog/master-products | No | Catalog list (?categoryId=, ?includeInactive=) |
| GET | /api/catalog/master-products/:id | No | Master product detail |
| GET | /api/catalog/vendor-listings | No* | Purchasable listings (recommended in report; *when backend adds it) |
| POST | /api/auth/register | No | Register (name, email, password, roleId) |
| POST | /api/auth/login | No | Login (email, password) |
| POST | /api/orders | JWT + PLACE_ORDER | Create order (items: [{ vendorProductId, quantity }]) |
| GET | /api/orders | JWT | List my orders |
| GET | /api/orders/:id | JWT | Get order (own only) |

---

## 4. No Design Changes

- Keep _variables.scss and all existing SCSS (colors, fonts, spacing).
- Keep current layout and component structure; add only missing wiring and pages.

---

## 5. Implementation Order

1. Enable auth interceptors; align Login with `/api/auth/login`; add Register + roleId from env.
2. Add `/category/:slug` route; wire category links to it; listing uses category for master-products (and vendor-listings when available).
3. Product listing: fetch from APIs; loading/error/empty; ProductCard with vendorProductId, Add to Cart, image placeholder.
4. Product detail page and route.
5. Frontend-only cart (vendorProductId); Header reads it; Checkout page and `POST /api/orders`.
6. CategoriesNavigation: React Router Link to `/category/:slug`; error state; mobile tap.
7. Wire search to product-search; final checks.

---

## 6. Implemented (Summary)

- **Auth:** Interceptors enabled in `interceptorApi.js`. Login uses `POST /api/auth/login`. Register page uses `POST /api/auth/register` with `roleId` from `CONFIG.USER_ROLE_ID` (env: `VITE_USER_ROLE_ID` / `REACT_APP_USER_ROLE_ID`). `.env.example` added.
- **Routes:** `/category/:slug`, `/product/:id`, `/checkout` added. Category links in flyout use `<Link to={/category/${slug}}>`.
- **Product listing:** `ProductListingPage` fetches `GET /api/catalog/master-products` and `GET /api/catalog/vendor-listings` (graceful if vendor-listings not yet implemented). Resolves category slug to id when on `/category/:slug`. Loading, error (with Retry), and empty states. Search query from `/product-search?q=` applied client-side.
- **ProductCard:** Fixed-size image container (200px height); placeholder when no image. Shows price, stock, vendor when present. Add to Cart only when `vendorProductId` and stock; uses `CartContext`.
- **Product detail:** `ProductDetailPage` at `/product/:id` uses `GET /api/catalog/master-products/:id` and vendor-listings by `masterProductId`. Add to Cart when vendor listing exists.
- **Cart:** `CartContext` (frontend-only, localStorage) with `{ items: [{ vendorProductId, quantity, name, price }] }`. Header cart dropdown uses context; Checkout link to `/checkout`.
- **Checkout:** `CheckoutPage` shows order summary and calls `POST /api/orders` with `{ items: [{ vendorProductId, quantity }] }`. Login required to place order; JWT sent via interceptors.
- **CategoriesNavigation:** Error state with Retry; mobile tap toggles flyout (`onClick` on trigger). All category links use React Router `Link`.
- **Search:** Header search form submits to `/product-search?q=...`.
