export type Gender = 'women' | 'men' | 'kids' | 'unisex';

export interface Category {
  id: string;
  name: string;
  slug: string;
  gender: Gender | 'luxe' | 'home';
  image: string;
  subcategories: {
    id: string;
    name: string;
    slug: string;
    items?: string[];
  }[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  isLuxe?: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;
  size: string;
  colorName: string;
  colorHex: string;
  mrp: number;
  sellingPrice: number;
  stock: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  brand: string;
  brandId: string;
  gender: Gender;
  category: string;
  subCategory: string;
  mrp: number;
  price: number;
  discountPercentage: number;
  rating: number;
  ratingCount: number;
  isLuxe?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isDealOfTheDay?: boolean;
  images: string[];
  colors: {
    name: string;
    hex: string;
    imageIndex: number;
  }[];
  sizes: string[];
  stockPerSize: Record<string, number>;
  description: string;
  fabricCare: string[];
  specifications: Record<string, string>;
  tags: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderAmount: number;
  maxDiscount?: number;
}

export interface FilterState {
  gender?: Gender | 'all';
  category?: string;
  subCategory?: string;
  brands: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  minDiscount: number;
  isLuxeOnly?: boolean;
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'discount' | 'rating' | 'newest';
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  pincode: string;
  addressLine: string;
  city: string;
  state: string;
  addressType: 'HOME' | 'WORK';
}
