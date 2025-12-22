# Next.js Migration Guide

## Overview

This document outlines the migration from Create React App to Next.js 14 with App Router.

## Migration Summary

### ✅ Completed Steps

1. **Project Setup**

   - Updated `package.json` with Next.js 14 dependencies
   - Removed `react-router-dom` (replaced with Next.js file-based routing)
   - Removed `react-scripts` (replaced with Next.js scripts)
   - Added Next.js scripts: `dev`, `build`, `start`, `lint`

2. **Configuration Files**

   - Created `next.config.js` with SCSS support
   - Created `.env.local` for environment variables (API base URL)
   - Updated `.gitignore` for Next.js build artifacts

3. **App Directory Structure**

   - Created `/app` directory with App Router structure
   - Created root `layout.js` with Redux Provider
   - Created pages:
     - `/app/page.js` (home page - replaces `/`)
     - `/app/login/page.js` (login page - replaces `/login`)
     - `/app/product-search/page.js` (product listing - replaces `/product-search`)

4. **Components Migration**

   - All interactive components marked with `"use client"` directive
   - Components remain in `/src/components` (preserved structure)
   - Updated imports to work with Next.js

5. **Styling**

   - Created `app/globals.scss` combining `index.scss` and `App.scss`
   - All component-level SCSS modules preserved
   - Global styles imported in root layout

6. **Assets**

   - Moved assets from `src/assets` to `/public`
   - Updated image imports to use `/` prefix (Next.js public folder convention)

7. **API Configuration**

   - Updated `src/api/config.js` to use `process.env.NEXT_PUBLIC_API_BASE_URL`
   - Environment variable set in `.env.local`

8. **Redux Store**

   - Redux Provider moved to `components/Providers.jsx` (client component)
   - Root layout imports Providers component
   - Store configuration unchanged

9. **Navigation**
   - Replaced `react-router-dom` `useNavigate` with Next.js `useRouter` from `next/navigation`
   - Replaced `Link` from `react-router-dom` with Next.js `Link` from `next/link` (where applicable)
   - Login page updated to use `router.push()` instead of `navigate()`

## File Changes

### New Files Created

- `app/layout.js` - Root layout with metadata
- `app/page.js` - Home page
- `app/login/page.js` - Login page
- `app/product-search/page.js` - Product listing page
- `app/globals.scss` - Global styles
- `next.config.js` - Next.js configuration
- `components/Providers.jsx` - Redux Provider wrapper
- `.env.local` - Environment variables

### Files Modified

- `package.json` - Updated dependencies and scripts
- `src/api/config.js` - Uses environment variables
- `src/components/BannerCarousel/BannerCarousel.js` - Updated asset paths, added "use client"
- All interactive components - Added "use client" directive
- `.gitignore` - Added Next.js specific ignores

### Files to Remove (Optional Cleanup)

- `src/App.js` - No longer needed (replaced by app directory)
- `src/index.js` - No longer needed (Next.js handles entry)
- `public/index.html` - No longer needed (Next.js generates HTML)
- `src/reportWebVitals.js` - Optional (can be removed if not needed)

## Routing Changes

### Before (React Router)

```jsx
<Route path="/" element={<Main />} />
<Route path="/login" element={<Login />} />
<Route path="/product-search" element={<ProductListingPage />} />
```

### After (Next.js App Router)

- `/` → `app/page.js`
- `/login` → `app/login/page.js`
- `/product-search` → `app/product-search/page.js`

## Environment Variables

Create `.env.local` file:

```
NEXT_PUBLIC_API_BASE_URL=http://18.212.69.104/
```

## Running the Application

### Development

```bash
npm run dev
```

Server runs on `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## Manual Steps Required

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Verify Environment Variables**

   - Ensure `.env.local` exists with `NEXT_PUBLIC_API_BASE_URL`

3. **Test All Routes**

   - Home page (`/`)
   - Login page (`/login`)
   - Product search (`/product-search`)

4. **Check for Any Remaining Issues**
   - Review console for warnings/errors
   - Test all interactive features
   - Verify API calls work correctly

## Known Considerations

1. **Client Components**: All components using hooks, event handlers, or browser APIs are marked with `"use client"`

2. **Server Components**: Pages can be server components by default, but most are client components due to Redux/state management needs

3. **Image Optimization**: Consider using Next.js `Image` component for better performance (optional enhancement)

4. **API Routes**: If you need API routes, create them in `app/api/` directory

5. **Static Assets**: All assets in `/public` are served from root path (`/asset-name`)

## Troubleshooting

### Common Issues

1. **Module Not Found**: Check import paths - Next.js uses different resolution
2. **"use client" Errors**: Ensure all interactive components have the directive
3. **Environment Variables**: Must be prefixed with `NEXT_PUBLIC_` for client-side access
4. **SCSS Imports**: Verify `next.config.js` has correct `sassOptions`

## Next Steps (Optional Enhancements)

1. Implement Next.js Image component for optimized images
2. Add API routes in `app/api/` if needed
3. Implement Server Components where possible for better performance
4. Add loading states and error boundaries
5. Optimize bundle size with dynamic imports
6. Add metadata for SEO
