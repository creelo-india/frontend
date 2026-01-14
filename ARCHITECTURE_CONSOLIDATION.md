# Architecture Consolidation Guide

## Overview

This project is in a transitional state, containing both **legacy** and **modern** architectural patterns. This document defines the current state, identifies legacy components, and provides migration guidelines for moving forward.

**Important**: No legacy files will be removed. They remain for backward compatibility and gradual migration.

---

## Primary Architecture (Going Forward)

The following directories represent the **modern, scalable architecture** and should be used for all new development:

### 1. `src/app/` - Next.js App Router
- **Purpose**: Next.js 14 App Router structure for pages and routes
- **Usage**: All new pages, layouts, and API routes
- **Pattern**: Server Components by default, Client Components when needed
- **Examples**:
  - `src/app/products/page.tsx` - Product listing page
  - `src/app/api/products/route.ts` - API routes with caching
  - `src/app/(auth)/` - Route groups for authentication

### 2. `src/modules/` - Feature-Based Modules
- **Purpose**: Self-contained feature modules following domain-driven design
- **Structure**: Each module contains its own components, pages, services, types, hooks, and store
- **Usage**: New features should be organized as modules
- **Example**: `src/modules/auth/` - Complete authentication module
  - `components/` - Auth-specific components
  - `pages/` - Auth pages
  - `services/` - Auth API services
  - `types/` - Auth TypeScript types
  - `hooks/` - Auth custom hooks
  - `store/` - Auth Redux slice

### 3. `src/store/` - Redux Toolkit Store
- **Purpose**: Centralized Redux store using Redux Toolkit
- **Usage**: Global state management (auth, products, filters)
- **Structure**:
  - `src/store/index.ts` - Store configuration
  - `src/store/rootReducer.ts` - Root reducer combining all slices
  - `src/store/authSlice.ts` - Auth state slice
  - `src/store/productSlice.ts` - Product state slice
  - `src/store/filterSlice.ts` - Filter state slice
  - `src/store/hooks.ts` - Typed Redux hooks
  - `src/store/StoreProvider.tsx` - Redux Provider wrapper

### 4. `src/lib/` - Core Libraries & Utilities
- **Purpose**: Shared libraries, API clients, and core utilities
- **Usage**: Reusable infrastructure code
- **Files**:
  - `src/lib/api.ts` - Axios instance with token interceptor
  - `src/lib/apiInternal.ts` - Internal API client for Next.js routes
  - `src/lib/fetchCache.ts` - Next.js fetch caching utilities

### 5. `src/components/` - Shared Components
- **Purpose**: Reusable UI components shared across the application
- **Structure**: Organized by feature/domain
- **Categories**:
  - `src/components/product/` - Product-related components
  - `src/components/common/` - Common utilities (AuthGuard, etc.)
  - `src/components/layout/` - Layout components
  - `src/components/ui/` - Base UI components

### 6. `src/design-system/` - Design System
- **Purpose**: Design tokens, variables, and design system documentation
- **Files**:
  - `src/_variables.scss` - SCSS design tokens (colors, spacing, typography)
  - `src/design-system/TROOWE_DESIGN_SYSTEM.md` - Design system documentation
- **Usage**: All components must consume design tokens from `_variables.scss`

---

## Legacy Architecture (Do Not Use for New Code)

The following are **legacy patterns** that should not be used for new development:

### 1. `src/redux/` - Legacy Redux Structure
- **Status**: Legacy - Do not create new reducers/actions here
- **Contains**: Old Redux setup with manual action creators and reducers
- **Files**:
  - `src/redux/store.js` - Old store configuration
  - `src/redux/action.js` - Manual action creators
  - `src/redux/reducer.js` - Manual reducers
  - `src/redux/productSaga.js` - Legacy saga
- **Migration**: Use `src/store/` with Redux Toolkit instead

### 2. `src/App.js` - Legacy React App Entry
- **Status**: Legacy - Not used in Next.js App Router
- **Purpose**: Old React Router setup
- **Migration**: Use Next.js App Router (`src/app/`) instead

### 3. `src/index.js` - Legacy Entry Point
- **Status**: Legacy - Not used in Next.js App Router
- **Purpose**: Old React DOM rendering
- **Migration**: Next.js handles entry points automatically

### 4. Duplicate Slices
- **Status**: Legacy - Consolidate to single source of truth
- **Locations**:
  - `src/store/authSlice.ts` - **Primary** (use this)
  - `src/store/slices/authSlice.ts` - Legacy duplicate
  - `src/store/auth/authSlice.ts` - Legacy duplicate
  - `src/modules/auth/store/authSlice.ts` - **Module-specific** (use for module isolation)
- **Guideline**: Use `src/store/authSlice.ts` for global auth state, or module slices for feature isolation

### 5. Legacy Component Structure
- **Status**: Legacy - Migrate to module-based structure
- **Examples**:
  - `src/components/Login/` - Migrate to `src/modules/auth/components/`
  - `src/components/ProductListingPage/` - Migrate to `src/modules/product/` or `src/components/product/`

---

## Migration Guidelines

### For New Features

1. **Create Module Structure**:
   ```
   src/modules/[feature-name]/
     ├── components/
     ├── pages/
     ├── services/
     ├── types/
     ├── hooks/
     └── store/
   ```

2. **Use Next.js App Router**:
   - Create pages in `src/app/[route]/page.tsx`
   - Use Server Components by default
   - Mark Client Components with `"use client"`

3. **Use Redux Toolkit**:
   - Create slices in `src/store/` for global state
   - Or in `src/modules/[feature]/store/` for module-specific state
   - Use typed hooks from `src/store/hooks.ts`

4. **Consume Design System**:
   - Import from `src/_variables.scss`
   - Use design tokens (colors, spacing, typography)
   - Follow design system patterns

### For Existing Code

1. **Gradual Migration**:
   - Do not remove legacy files immediately
   - Migrate components one at a time
   - Update imports as you migrate

2. **State Management**:
   - Keep using `src/redux/` for existing features until migrated
   - New features use `src/store/` with Redux Toolkit
   - Gradually migrate old reducers to slices

3. **Component Migration**:
   - Move shared components to `src/components/[category]/`
   - Move feature-specific components to `src/modules/[feature]/components/`
   - Update imports incrementally

### Migration Priority

**High Priority**:
1. New features → Use modern architecture
2. New pages → Use `src/app/` App Router
3. New state → Use `src/store/` Redux Toolkit

**Medium Priority**:
1. Refactor existing components to modules
2. Migrate old Redux to Redux Toolkit
3. Consolidate duplicate slices

**Low Priority**:
1. Remove legacy files (only after full migration)
2. Clean up unused imports
3. Update documentation

---

## Architecture Decision Matrix

| Task | Legacy Approach | Modern Approach |
|------|----------------|-----------------|
| **New Page** | `src/components/` + React Router | `src/app/[route]/page.tsx` |
| **New Feature** | `src/components/[feature]/` | `src/modules/[feature]/` |
| **State Management** | `src/redux/` with manual actions | `src/store/` with Redux Toolkit |
| **API Calls** | Direct axios in components | `src/modules/[feature]/services/` |
| **Types** | Inline or scattered | `src/modules/[feature]/types/` |
| **Hooks** | Inline or `src/hooks/` | `src/modules/[feature]/hooks/` |
| **Styling** | Hardcoded values | `src/_variables.scss` tokens |

---

## File Organization Rules

### ✅ DO (Modern Architecture)

- Create new pages in `src/app/`
- Organize features as modules in `src/modules/`
- Use Redux Toolkit slices in `src/store/`
- Create API services in `src/modules/[feature]/services/`
- Use design tokens from `src/_variables.scss`
- Export from module `index.ts` files

### ❌ DON'T (Legacy Patterns)

- Do not create new files in `src/redux/`
- Do not use `src/App.js` or `src/index.js` patterns
- Do not create duplicate slices
- Do not hardcode colors/spacing (use design tokens)
- Do not mix legacy and modern patterns in same feature

---

## Current State Summary

### Modern Structure (Active)
- ✅ Next.js 14 App Router (`src/app/`)
- ✅ Redux Toolkit (`src/store/`)
- ✅ Module-based features (`src/modules/auth/`)
- ✅ Design system integration (`src/_variables.scss`)
- ✅ TypeScript types (`src/types/`, `src/modules/*/types/`)

### Legacy Structure (Maintained)
- ⚠️ Old Redux setup (`src/redux/`)
- ⚠️ React Router components (`src/App.js`)
- ⚠️ Duplicate slices (multiple locations)
- ⚠️ Legacy component organization

### Transition Strategy
- **New code**: Always use modern architecture
- **Existing code**: Maintain until migrated
- **Migration**: Gradual, feature-by-feature
- **Removal**: Only after full migration and testing

---

## Questions & Decisions

### Which auth slice should I use?
- **Global auth state**: `src/store/authSlice.ts`
- **Module-specific auth**: `src/modules/auth/store/authSlice.ts`
- **Avoid**: `src/store/slices/authSlice.ts` or `src/store/auth/authSlice.ts`

### Where do I put a new feature?
- **Small, shared feature**: `src/components/[feature]/`
- **Large, self-contained feature**: `src/modules/[feature]/`
- **Page/route**: `src/app/[route]/page.tsx`

### How do I manage state?
- **Global state**: `src/store/[feature]Slice.ts`
- **Module state**: `src/modules/[feature]/store/[feature]Slice.ts`
- **Local state**: `useState` in component

---

## Conclusion

This project maintains both legacy and modern architectures to support gradual migration. All new development must use the modern architecture patterns defined above. Legacy code remains functional but should not be extended. Migration should occur incrementally, feature by feature, ensuring stability throughout the transition.

**Remember**: No files are removed during this consolidation. Legacy code remains for backward compatibility until fully migrated and tested.
