# Troowe.com Design System & UX Guidelines

## Brand Identity

**Platform:** Multi-category e-commerce (Home, Bathroom, Heating, Tiles, Kitchens, etc.)  
**Brand Values:** Versatile, Trustworthy, Premium  
**Inspiration:** Amazon, Wayfair, Screwfix (with unique Troowe identity)

---

## Color Palette

### Primary Colors

**Option 1 - Trustworthy Blue (Recommended)**

- `#1E8CFF` - Primary brand color
  - Usage: CTAs, navigation highlights, key actions, links, brand elements
  - Best for: Trust-building, professional feel

**Option 2 - Premium Green**

- `#2A7F4F` - Alternative primary
  - Usage: Same as blue option
  - Best for: Eco-friendly, premium positioning

### Secondary Color

- `#FF7A00` - Orange accent
  - Usage: Offers, promotions, sale badges, urgent CTAs, discount tags
  - Creates urgency and draws attention

### Accent Colors

- `#FBDD00` - Yellow
  - Usage: Ratings, stars, highlights, positive indicators
- `#E84545` - Red
  - Usage: Warnings, errors, clearance tags, out-of-stock
- `#6C757D` - Grey
  - Usage: Secondary text, disabled states, borders

### Neutral Palette

- `#FFFFFF` - Pure white
  - Usage: Backgrounds, cards, negative space
- `#F8F9FA` - Light grey
  - Usage: Section backgrounds, subtle dividers
- `#E0E0E0` - Medium grey
  - Usage: Borders, dividers, inactive states
- `#1A1A1A` - Near black
  - Usage: Primary text, headings, dark backgrounds

---

## Typography

### Font Families

**Primary:** 'Inter', 'Segoe UI', system-ui, sans-serif

- Clean, modern, highly readable
- Excellent for UI and body text

**Headings:** 'Poppins', 'Inter', sans-serif

- Bold, confident, premium feel
- Use for category names, product titles

### Font Scale

- **H1:** 2.5rem (40px) - Hero sections, main page titles
- **H2:** 2rem (32px) - Section headers, category pages
- **H3:** 1.5rem (24px) - Subsection headers
- **H4:** 1.25rem (20px) - Card titles, product names
- **Body:** 1rem (16px) - Default text
- **Small:** 0.875rem (14px) - Secondary text, labels
- **Tiny:** 0.75rem (12px) - Badges, tags

### Font Weights

- **Light:** 300
- **Regular:** 400
- **Medium:** 500
- **Semibold:** 600
- **Bold:** 700
- **Extra Bold:** 800

---

## Spacing System

### Base Unit: 8px

All spacing should use multiples of 8px for consistency.

- **XS:** 4px (0.25rem)
- **SM:** 8px (0.5rem)
- **MD:** 16px (1rem)
- **LG:** 24px (1.5rem)
- **XL:** 32px (2rem)
- **XXL:** 48px (3rem)
- **XXXL:** 64px (4rem)

### Component Spacing

- **Card padding:** 16px (1rem)
- **Section padding:** 32px (2rem)
- **Container max-width:** 1280px
- **Grid gap:** 24px (1.5rem)

---

## Grid System

### Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px
- **Large Desktop:** > 1440px

### Grid Columns

- **Mobile:** 1-2 columns
- **Tablet:** 2-3 columns
- **Desktop:** 3-4 columns
- **Large Desktop:** 4-5 columns

---

## Component Guidelines

### Buttons

#### Primary Button

- Background: `#1E8CFF` (or `#2A7F4F`)
- Text: `#FFFFFF`
- Padding: 12px 24px
- Border-radius: 8px
- Font-weight: 600
- Hover: Darken by 10%, add subtle shadow
- Active: Darken by 15%

#### Secondary Button

- Background: Transparent
- Border: 2px solid `#1E8CFF`
- Text: `#1E8CFF`
- Hover: Background `#1E8CFF`, text `#FFFFFF`

#### CTA Button (Urgent Actions)

- Background: `#FF7A00`
- Text: `#FFFFFF`
- Hover: `#E66A00`
- Use for: "Add to Cart", "Buy Now", "Checkout"

#### Ghost Button

- Background: Transparent
- Text: `#1A1A1A`
- Border: 1px solid `#E0E0E0`
- Hover: Background `#F8F9FA`

### Product Cards

#### Structure

- Border: 1px solid `#E0E0E0`
- Border-radius: 12px
- Background: `#FFFFFF`
- Padding: 16px
- Hover: Shadow elevation, border color `#1E8CFF`

#### Image

- Aspect ratio: 1:1 or 4:3
- Border-radius: 8px
- Object-fit: cover

#### Price Display

- Current price: `#1A1A1A`, bold, 1.25rem
- Original price: `#6C757D`, strikethrough, 0.875rem
- Discount badge: `#FF7A00` background, `#FFFFFF` text

#### Rating Stars

- Active: `#FBDD00`
- Inactive: `#E0E0E0`

### Navigation

#### Header

- Background: `#1A1A1A`
- Height: 64px (desktop), 56px (mobile)
- Sticky: Yes, z-index: 1000

#### Mega Menu

- Background: `#FFFFFF`
- Border: 1px solid `#E0E0E0`
- Shadow: 0 8px 24px rgba(0, 0, 0, 0.12)
- Active category: White tab with `#1A1A1A` text

#### Navigation Links

- Default: `#FFFFFF` (on dark), `#1A1A1A` (on light)
- Hover: `#1E8CFF`
- Active: `#1E8CFF`, underline

### Forms

#### Input Fields

- Border: 1px solid `#E0E0E0`
- Border-radius: 8px
- Padding: 12px 16px
- Focus: Border `#1E8CFF`, shadow outline
- Error: Border `#E84545`

#### Labels

- Color: `#1A1A1A`
- Font-weight: 500
- Font-size: 0.875rem

### Badges & Tags

#### Sale Badge

- Background: `#FF7A00`
- Text: `#FFFFFF`
- Font-weight: 700
- Padding: 4px 8px
- Border-radius: 4px

#### New Badge

- Background: `#1E8CFF`
- Text: `#FFFFFF`

#### Out of Stock

- Background: `#E84545`
- Text: `#FFFFFF`

---

## UX Improvements

### 1. Header & Mega-Menu Navigation

#### Improvements

- **Visual Hierarchy:** Clear distinction between main categories and subcategories
- **Hover States:** Smooth transitions, clear feedback
- **Active States:** White tab indicator for active category
- **Mobile:** Hamburger menu with slide-out navigation
- **Search Integration:** Prominent search bar in header
- **User Account:** Quick access to account, cart, wishlist

#### Color Application

- Header background: `#1A1A1A`
- Active category tab: White background, `#1A1A1A` text
- Hover state: `#1E8CFF` underline
- Mega-menu background: `#FFFFFF`
- Promo banner: `#FF7A00` accent

### 2. Product Listing Page

#### Improvements

- **Filter Sidebar:** Collapsible, clear categories, price range slider
- **Sort Options:** Dropdown with clear labels
- **Product Grid:** Responsive, consistent card sizes
- **Quick View:** Hover overlay with quick actions
- **Breadcrumbs:** Clear navigation path
- **Results Count:** "Showing X of Y products"
- **Pagination:** Clear page numbers, prev/next buttons

#### Color Application

- Filter sidebar: `#F8F9FA` background
- Active filter: `#1E8CFF` background, white text
- Product card hover: `#1E8CFF` border
- Price: `#1A1A1A` (current), `#6C757D` (original)
- Sale badge: `#FF7A00`

### 3. Product Detail Page

#### Improvements

- **Image Gallery:** Thumbnail navigation, zoom on hover
- **Product Info Hierarchy:** Title → Price → Rating → Description → Specs
- **CTA Placement:** Sticky "Add to Cart" button
- **Quantity Selector:** Clear +/- controls
- **Related Products:** Horizontal scroll carousel
- **Reviews Section:** Star ratings, filterable reviews
- **Trust Indicators:** Free shipping, returns, secure payment badges

#### Color Application

- Primary CTA: `#FF7A00` (Add to Cart)
- Secondary CTA: `#1E8CFF` (Buy Now)
- Price: Large, bold, `#1A1A1A`
- Rating stars: `#FBDD00`
- Trust badges: `#2A7F4F` (green option) or `#1E8CFF`

### 4. Cart & Checkout Flow

#### Improvements

- **Cart Summary:** Sticky sidebar with totals
- **Progress Indicator:** Clear checkout steps
- **Form Validation:** Real-time error messages
- **Payment Methods:** Visual icons for payment options
- **Order Summary:** Expandable item list
- **Trust Signals:** Security badges, return policy links
- **Guest Checkout:** Clear option for non-registered users

#### Color Application

- Primary CTA: `#FF7A00` (Proceed to Checkout)
- Secondary actions: `#1E8CFF`
- Error messages: `#E84545`
- Success states: `#2A7F4F` (green) or `#1E8CFF`
- Progress indicator: `#1E8CFF` (active), `#E0E0E0` (inactive)

### 5. Mobile-First Responsive Design

#### Improvements

- **Touch Targets:** Minimum 44x44px
- **Bottom Navigation:** Sticky cart/checkout button
- **Swipe Gestures:** Product image carousel
- **Collapsible Sections:** Filters, categories
- **Simplified Forms:** Single column, large inputs
- **Quick Actions:** Floating action buttons

### 6. Design System Components

#### Spacing

- Consistent 8px grid system
- Generous whitespace for readability
- Clear visual hierarchy through spacing

#### Shadows

- **Card:** 0 2px 8px rgba(0, 0, 0, 0.08)
- **Dropdown:** 0 8px 24px rgba(0, 0, 0, 0.12)
- **Button hover:** 0 4px 12px rgba(30, 140, 255, 0.3)

#### Border Radius

- **Buttons:** 8px
- **Cards:** 12px
- **Inputs:** 8px
- **Badges:** 4px

---

## Accessibility (WCAG 2.1 AA Compliance)

### Color Contrast

- Text on `#1A1A1A`: Minimum 4.5:1
- Text on `#1E8CFF`: White text meets AA standards
- Text on `#FF7A00`: White text meets AA standards

### Interactive Elements

- Focus indicators: 2px solid `#1E8CFF` outline
- Keyboard navigation: Full support
- Screen reader: Proper ARIA labels

### Text Sizing

- Minimum body text: 16px
- Scalable text: Use rem units
- Line height: 1.5 for body, 1.2 for headings

---

## Implementation Priority

### Phase 1: Foundation

1. Update color variables
2. Apply to header/navigation
3. Update typography

### Phase 2: Product Pages

1. Product listing page redesign
2. Product card improvements
3. Filter/sort enhancements

### Phase 3: Conversion Optimization

1. Product detail page
2. Cart improvements
3. Checkout flow

### Phase 4: Polish

1. Animations and transitions
2. Mobile optimizations
3. Performance tuning

---

## Example Color Usage

### Navigation

```scss
.header {
  background: #1a1a1a;
  color: #ffffff;
}

.nav-item-active {
  background: #ffffff;
  color: #1a1a1a;
}

.nav-item-hover {
  color: #1e8cff;
}
```

### Product Card

```scss
.product-card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;

  &:hover {
    border-color: #1e8cff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
}

.price-current {
  color: #1a1a1a;
  font-weight: 700;
}

.price-original {
  color: #6c757d;
  text-decoration: line-through;
}

.badge-sale {
  background: #ff7a00;
  color: #ffffff;
}
```

### Buttons

```scss
.btn-primary {
  background: #1e8cff;
  color: #ffffff;

  &:hover {
    background: #1a7ae6;
  }
}

.btn-cta {
  background: #ff7a00;
  color: #ffffff;

  &:hover {
    background: #e66a00;
  }
}
```

---

## Next Steps

1. Review and approve color scheme (Blue vs Green primary)
2. Implement design system variables
3. Update existing components
4. Create component library
5. Test accessibility compliance
6. Gather user feedback
7. Iterate and refine
