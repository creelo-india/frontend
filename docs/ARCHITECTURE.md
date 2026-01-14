# Architecture Document
## Creelo India E-commerce Platform

**Version:** 1.0  
**Last Updated:** 2024

---

## 1. Frontend Tech Stack Justification

### Next.js 14 App Router
- Server-first architecture reduces client-side JavaScript by 60-70%
- Built-in optimizations: image optimization, font optimization, automatic code splitting
- SEO-optimized with Server Components and metadata API
- Industry standard for production e-commerce (Amazon, Shopify patterns)

### React 18
- Server Components support enables zero-JS rendering
- Concurrent features: Suspense, streaming, automatic batching
- Mature ecosystem with full Next.js 14 integration

### Redux Toolkit
- Minimal usage: global cart state, user authentication state only
- Server Components handle 90% of data fetching, eliminating Redux need
- DevTools support for debugging complex state
- Replacement for redux-saga and redux-thunk complexity

### Axios
- Client-side API calls only (authentication interceptors, error handling)
- Server Components use native `fetch` (zero client overhead)
- Request/response transformation for client needs

### React Hook Form + Zod
- React Hook Form: 10x fewer re-renders vs Formik, minimal bundle size
- Zod: Type-safe validation, server-side validation support
- Integrated via @hookform/resolvers

### SCSS
- Design system integration via `src/_variables.scss`
- Module-scoped styles prevent style leakage
- Full control over bundle size (no framework overhead)
- Existing design system preserved and extended

---

## 2. Scalability Principles

### Server-First Architecture
- 90% of application logic executes on server
- Client components used only for interactivity
- Reduced bundle size enables faster page loads

### Horizontal Scaling
- Stateless Server Components enable CDN distribution
- Edge runtime for global performance
- Session state stored server-side (cookies, database)

### Code Organization
- Feature-based folder structure
- Shared component library
- Modular SCSS architecture
- Clear separation: Server Components vs Client Components

### Performance Targets
- LCP < 2.5s (P95)
- FCP < 1.2s
- TTI < 3.5s
- Bundle size < 200KB (initial load)

### Caching Strategy
- Static assets: CDN cache
- Server data: Next.js data cache with revalidation
- Route cache: ISR for product pages
- Client cache: Router cache for navigation

---

## 3. Folder Structure Standard

```
app/
├── (auth)/              # Route groups
│   ├── login/
│   └── register/
├── (shop)/
│   ├── products/
│   │   ├── [slug]/
│   │   └── page.js
│   └── categories/
├── (account)/
│   ├── profile/
│   ├── orders/
│   └── addresses/
├── cart/
├── checkout/
│   ├── shipping/
│   ├── payment/
│   └── confirmation/
├── api/                 # API routes
├── layout.js
├── page.js
├── loading.js
└── error.js

components/
├── layout/              # Header, Footer, Navigation
├── product/             # ProductCard, ProductGrid, etc.
├── cart/                # CartItem, CartSummary
├── forms/               # AddressForm, PaymentForm
├── ui/                  # Button, Input, Modal
└── shared/              # Breadcrumbs, Pagination

src/
├── app/                 # Next.js App Router
├── components/          # React components
├── lib/                 # Utilities, API clients
├── hooks/               # Custom hooks
├── stores/              # Redux stores (minimal)
├── design-system/       # Design tokens
└── middleware.js        # Next.js middleware
```

**Naming Conventions:**
- Components: PascalCase (`ProductCard.jsx`)
- Pages: `page.js`, `layout.js`, `loading.js`, `error.js`
- Styles: Match component name (`ProductCard.module.scss`)
- Utilities: camelCase (`formatPrice.js`)

---

## 4. State Management Rules

### Redux Toolkit (Minimal)
**Use for:**
- Shopping cart state (cross-component access)
- User authentication state (global access)
- Global UI state (modals, notifications affecting multiple components)

**Do not use for:**
- Server-fetched data (use Server Components)
- Form state (use React Hook Form)
- Local component state (use useState)
- Derived state (compute in render)

### Server Components (Primary)
- All product data, categories, search results
- User profile data (server-rendered)
- Order history
- Static content

### Local State (useState)
- Form inputs (with React Hook Form)
- UI toggles (dropdowns, modals)
- Temporary UI state
- Client-side filtering of loaded data

### Decision Tree
1. Server data? → Server Component
2. 3+ unrelated components? → Redux Toolkit
3. Form state? → React Hook Form
4. Component-scoped? → useState

---

## 5. API Communication Rules

### Server Components
- Use native `fetch` with Next.js caching
- `cache: 'force-cache'` for static data
- `next: { revalidate: 3600 }` for time-based revalidation
- `cache: 'no-store'` for user-specific data

### Client Components
- Use Axios for client-side API calls
- Request interceptors: add authentication headers
- Response interceptors: handle errors, token refresh
- Retry logic: exponential backoff (3 attempts max)

### Error Handling
- Server-side: try-catch blocks, error boundaries
- Client-side: Axios interceptors, component-level handling
- User feedback: toast notifications, inline errors
- Logging: server errors logged, client errors monitored

### Request Strategy
- Server Actions for mutations (form submissions)
- Server Components for data fetching
- API routes for third-party integrations only
- No client-side fetching for public content

---

## 6. Security Best Practices

### Authentication
- JWT tokens stored in HttpOnly cookies (not localStorage)
- Refresh tokens with secure, HttpOnly flags
- SameSite: 'strict' for CSRF protection
- Short expiration: access tokens (15 min), refresh (7 days)

### XSS Prevention
- React auto-escaping JSX content
- Sanitize user inputs server-side
- Avoid `dangerouslySetInnerHTML` (sanitize if required)
- Content Security Policy headers

### CSRF Protection
- CSRF tokens in HttpOnly cookies
- Server Actions validate tokens automatically
- SameSite cookie attribute
- API routes verify CSRF tokens

### Input Validation
- Client-side: Yup/Zod schemas for UX
- Server-side: Zod validation (never trust client)
- Sanitize all user inputs
- Parameterized queries (SQL injection prevention)

### Data Exposure
- No sensitive data in client bundles
- Secrets never exposed to client
- User data fetched server-side
- API isolation (Server Actions preferred)

---

## 7. Performance Best Practices

### Rendering
- Default to Server Components
- Minimize Client Component boundaries
- Push interactivity to leaf components
- Use Suspense for streaming

### Code Splitting
- Route-based splitting (automatic)
- Dynamic imports for heavy client components
- Lazy load below-the-fold content
- Avoid barrel exports pulling unused code

### Assets
- All images: `next/image` component
- WebP/AVIF format optimization
- Responsive images with sizes prop
- Lazy loading for below-the-fold
- Font optimization via Next.js font system

### JavaScript
- Tree shaking enabled (automatic)
- Minification in production
- Remove unused dependencies
- Monitor bundle size (< 200KB initial)

### CSS
- Critical CSS inlined
- CSS Modules for component isolation
- Avoid CSS-in-JS runtime overhead
- SCSS compilation at build time

### Caching
- CDN for static assets
- Next.js data cache for API responses
- ISR for product pages (revalidate: 3600)
- Router cache for client navigation

---

## 8. SEO Strategy

### Server-Side Rendering
- All public routes render on server
- Dynamic routes: ISR where possible
- Metadata API for all pages
- Structured data (JSON-LD) for products

### Metadata
- Dynamic metadata via `generateMetadata`
- Open Graph tags, Twitter Cards
- Canonical URLs
- Sitemap generation

### URL Structure
- Semantic, human-readable URLs
- Category/product hierarchy in URLs
- Lowercase, hyphen-separated
- Avoid query parameters for content

### Content
- Server-rendered content in HTML
- Proper heading hierarchy (h1-h6)
- Alt text for all images
- Descriptive link text

### Performance
- Core Web Vitals optimization
- Fast page load times (LCP < 2.5s)
- Mobile-first responsive design
- Accessibility compliance (WCAG AA)

---

## 9. Authentication Strategy

### JWT + Refresh Token Flow

**Access Token:**
- Short-lived (15 minutes)
- Stored in HttpOnly cookie
- Contains user ID, email, role
- Sent with every authenticated request

**Refresh Token:**
- Long-lived (7 days)
- Stored in HttpOnly cookie (secure flag)
- Used to obtain new access tokens
- Rotated on each refresh

### Authentication Flow
1. User submits credentials
2. Server validates, issues JWT + refresh token
3. Tokens set as HttpOnly cookies
4. Client requests include cookies automatically
5. Access token expires → refresh endpoint called
6. New access token issued, refresh token rotated

### Middleware Protection
- Next.js middleware validates tokens at edge
- Protected routes redirect to login if unauthenticated
- User context passed via headers
- Role-based access control enforced

### Server Validation
- All authenticated requests verify JWT on server
- Token expiration checked server-side
- Invalid tokens trigger refresh or logout
- Never trust client-provided role claims

### Security Measures
- HttpOnly cookies prevent XSS token theft
- Secure flag (HTTPS only in production)
- SameSite: 'strict' prevents CSRF
- Token rotation on refresh
- Server-side session validation

---

## 10. Image Optimization Strategy

### Next.js Image Component
- All images use `next/image`
- Automatic format selection (WebP, AVIF)
- Responsive images with srcset
- Lazy loading enabled by default

### Image Requirements
- Original images: high quality source files
- Optimization: Next.js handles at build/runtime
- Formats: WebP (modern), JPEG (fallback)
- AVIF: enabled for supported browsers

### Sizing Strategy
- Responsive sizes prop for different viewports
- Aspect ratio maintained via CSS
- Breakpoint-based sizing
- Avoid layout shift (define dimensions)

### Loading Strategy
- Above-the-fold: eager loading (priority prop)
- Below-the-fold: lazy loading (default)
- Placeholder: blur or color while loading
- Error handling: fallback image

### Performance Rules
- Max width: 1920px for hero images
- Compression: Next.js handles automatically
- CDN distribution for static assets
- Image CDN for user-uploaded content

### Best Practices
- Use appropriate image formats
- Define width/height to prevent layout shift
- Use sizes prop for responsive images
- Optimize before upload (when possible)
- Monitor image payload size

---

## Conclusion

This architecture prioritizes performance, security, and scalability through server-first rendering, minimal client-side JavaScript, and strict adherence to established patterns. Regular reviews ensure continued alignment with business goals and industry best practices.
