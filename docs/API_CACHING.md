# API Response Caching Implementation

## Overview

This document describes the API response caching implementation using Next.js fetch `revalidate` option.

## Architecture

### Next.js API Routes

API routes are created in `src/app/api/` that act as proxies to external APIs with caching:

- **`/api/products`** - Products endpoint with 1-hour revalidation
- **`/api/auth/login`** - Authentication endpoint (no cache)

### Caching Strategy

#### Products API (`/api/products`)
- **Revalidation**: 3600 seconds (1 hour)
- **Cache Control**: `public, s-maxage=3600, stale-while-revalidate=86400`
- **Cache Tags**: `["products"]` for on-demand revalidation

#### Authentication API (`/api/auth/login`)
- **Cache**: `no-store` (no caching for security)
- **Reason**: User-specific and security-sensitive data

## Usage

### From Client Components (Redux Sagas)

The sagas call Next.js API routes which handle caching:

```typescript
// In productSaga.ts
const response = yield call(api.get, "/api/products");
```

The Next.js API route (`/api/products`) handles:
1. Checking cache
2. Fetching from external API if cache expired
3. Returning cached or fresh data

### From Server Components

Use the utility functions in `src/lib/fetchCache.ts`:

```typescript
import { fetchProducts } from "@/lib/fetchCache";

// In Server Component
const response = await fetchProducts();
const products = await response.json();
```

## Cache Configuration

### Revalidation Options

- **`revalidate: 3600`** - Revalidate every hour
- **`revalidate: 0`** - Always fetch fresh data
- **`revalidate: false`** - Cache indefinitely

### Cache Tags

Use tags for on-demand revalidation:

```typescript
fetchWithCache("/api/products", {
  revalidate: 3600,
  tags: ["products"],
});
```

Revalidate on-demand:
```typescript
import { revalidateTag } from "next/cache";
revalidateTag("products");
```

## Benefits

1. **Performance**: Reduced API calls to external service
2. **Cost**: Lower API usage costs
3. **User Experience**: Faster page loads with cached data
4. **Scalability**: Reduced load on external API

## Cache Invalidation

### Time-based (Automatic)
- Products cache automatically revalidates after 1 hour

### On-demand (Manual)
```typescript
import { revalidatePath, revalidateTag } from "next/cache";

// Revalidate specific path
revalidatePath("/products");

// Revalidate by tag
revalidateTag("products");
```

## Best Practices

1. **Static/Public Data**: Use longer revalidation times (3600+ seconds)
2. **User-specific Data**: Use `cache: "no-store"`
3. **Real-time Data**: Use shorter revalidation or `revalidate: 0`
4. **Sensitive Data**: Always use `cache: "no-store"`
