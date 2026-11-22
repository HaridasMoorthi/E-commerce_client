# OLD MONEY | Wear Your Legacy — Luxury E-Commerce Platform

A production-grade luxury lifestyle and couture e-commerce platform reverse-engineered from and elevating the features, design patterns, and conversion flows of premium fashion portals (Nykaa Fashion / Nykaa Luxe).

---

## 🚀 Live Preview & Quick Start

```bash
# Install dependencies
npm install

# Start development server on http://localhost:3000/
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 👑 Enterprise Merchant & Admin Studio

Access to the store administration suite is gated through a dedicated enterprise authentication terminal:
1. Click **Account** / **Sign In** in the navigation header.
2. Sign in with store administrator credentials:
   - **Username / Admin ID**: `admin` (or `admin@oldmoney.com`)
   - **Password**: `admin123`
3. Click **`SIGN IN TO ADMIN STUDIO`** to enter the master dashboard.

### Core Admin Capabilities:
- **Dresses & Catalog Management**:
  - Add dresses and couture garments with 1-click curated presets.
  - Set MRP, selling price, and automatic discount calculation.
  - Multi-image gallery, size inventory matrices (`XS` through `XXL`), and color swatches.
  - In-table direct price editing with instant storefront reflection.
- **Bulk Sale & Discount Engine**:
  - Launch sitewide or category-specific flat discount percentages (e.g. 30%, 40%, 50%, 60% OFF).
  - Automatically recalculates selling prices across all catalog items in real time.
- **Brand Partner Management**:
  - Onboard designer houses and ateliers.
  - Tag brands with `Luxe Label` badges and manage catalog garment counts.
- **Sections & Taxonomy**:
  - Create and reorder categories and subcategories.
- **Hero Banners & Promotional Marquee**:
  - Dynamic editing of carousel slides (titles, subtitles, image URLs, CTA links).
- **Orders & Logistics Tracking**:
  - Real-time shipment milestone updates (`CONFIRMED`, `PACKED`, `DISPATCHED`, `DELIVERED`).
  - Automatic AWB tracking number generation and Blue Dart air express carrier assignment.
- **Promo Coupon Engine**:
  - Issue custom percentage or flat discount promo codes with minimum cart thresholds.

---

## 📁 Clean Enterprise Project Structure

```
d:\FreeLancer\E-Commerce clinet\
├── docs/
│   └── ARCHITECTURE_BLUEPRINT.md        # Technical specification & blueprint
├── public/
│   ├── favicon.png                      # Favicon mark
│   ├── old-money-horizontal-dark.png    # Primary dark brand lockup
│   ├── old-money-horizontal-light.png   # Light brand lockup
│   ├── old-money-horizontal-gold.png    # Metallic gold brand lockup
│   ├── om-monogram-dark-clean.png       # Dark monogram icon
│   └── om-monogram-light-clean.png      # Light monogram icon
├── src/
│   ├── components/
│   │   ├── admin/                       # AdminDashboard, metrics, presets
│   │   ├── card/                        # ProductCard (3:4 ratio, quick add size)
│   │   ├── cart/                        # CartDrawer, CouponModal
│   │   ├── checkout/                    # CheckoutModal, OrderSuccessModal
│   │   ├── home/                        # HeroSlider, FlashDeals, LuxeSection, BrandsCarousel, CuratedEdits, CategoryShowcase
│   │   ├── layout/                      # Header, Footer, MegaMenu
│   │   ├── pdp/                         # ProductDetail, SizeGuideModal
│   │   ├── plp/                         # ProductGrid, FilterSidebar, SortDropdown
│   │   ├── search/                      # SearchModal with live search & recents
│   │   ├── tracking/                    # OrderTrackingModal with live AWB milestones
│   │   └── wishlist/                    # WishlistDrawer
│   ├── pages/
│   │   ├── HomePage.tsx                 # Storefront homepage view
│   │   ├── CatalogPage.tsx              # PLP catalog & filter view
│   │   └── LoginPage.tsx                # Dedicated Enterprise Login Terminal (White & Pink theme)
│   ├── context/
│   │   └── ECommerceContext.tsx         # Global application state management
│   ├── data/
│   │   ├── banners.ts                   # Hero carousel banners & curated moodboards
│   │   ├── categories.ts                # Full taxonomy & official brand partners
│   │   ├── coupons.ts                   # Active discount coupons
│   │   └── products.ts                  # Mock database of couture & lifestyle items
│   ├── types/
│   │   └── index.ts                     # TypeScript domain models
│   ├── App.tsx                          # Application shell & view router
│   ├── main.tsx                         # React 18 DOM entry point
│   └── index.css                        # Tailwind CSS layers & typography
├── index.html                           # HTML5 entry with Playfair Display & Inter fonts
├── package.json                         # Dependencies & npm scripts
├── tsconfig.json                        # Strict TypeScript configuration
├── vite.config.ts                       # Vite bundler configuration
└── README.md                            # Project overview & documentation
```

---

## 🎨 Design System & Signature Aesthetic

- **Primary Signature Pink**: `#fc2779` (Nykaa Fashion signature accent for badges, CTAs, discount highlights).
- **Luxury Neutrals**: Crisp `#ffffff` backgrounds, `#fafafa` canvas, `#111827` high-contrast accents.
- **Typography**:
  - `Playfair Display` for couture editorial headlines, banners, and brand lockups.
  - `Inter` for clean, tabular numbers, sizes, prices, and specifications.

---

## 📜 License & Ownership
Created for **Old Money Atelier** · All Rights Reserved © 2026.
