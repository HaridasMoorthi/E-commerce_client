import React, { createContext, useContext, useState } from 'react';
import { Product, CartItem, WishlistItem, Coupon, FilterState, ShippingAddress, Brand, Category } from '../types';
import { PRODUCTS } from '../data/products';
import { COUPONS } from '../data/coupons';
import { HERO_BANNERS, HeroBanner } from '../data/banners';
import { BRANDS, CATEGORIES } from '../data/categories';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  avatar?: string;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  itemsCount: number;
  totalAmount: number;
  paymentMode: string;
  status: 'PLACED' | 'CONFIRMED' | 'PACKED' | 'DISPATCHED' | 'DELIVERED';
  awbNumber: string;
  carrier: string;
  date: string;
}

interface ECommerceContextType {
  // Navigation & Views
  currentView: 'home' | 'plp' | 'pdp' | 'admin' | 'login';
  setCurrentView: (view: 'home' | 'plp' | 'pdp' | 'admin' | 'login') => void;
  selectedProduct: Product | null;
  openProduct: (product: Product) => void;
  openCategory: (category: string, gender?: string) => void;
  goHome: () => void;
  openAdmin: () => void;
  openLogin: () => void;

  // Auth & Account
  currentUser: AdminUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  loginAsAdmin: () => void;
  loginAsCustomer: (name: string, email: string) => void;
  logout: () => void;

  // Products (Dynamic & Admin Managed)
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'slug' | 'rating' | 'ratingCount'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  bulkApplySale: (targetCategory: string, discountPercent: number) => void;

  // Brands Management (Admin Managed)
  brands: Brand[];
  addBrand: (brand: Omit<Brand, 'id' | 'slug'>) => void;
  deleteBrand: (id: string) => void;

  // Categories & Sections Management (Admin Managed)
  categories: Category[];
  addCategory: (cat: Category) => void;
  addSubcategory: (catId: string, subName: string) => void;

  // Banners & Announcement Ticker (Admin Managed)
  banners: HeroBanner[];
  updateBanner: (id: string, updates: Partial<HeroBanner>) => void;
  tickerText: string;
  setTickerText: (text: string) => void;

  // Orders Management (Admin & Customer)
  adminOrders: AdminOrder[];
  updateOrderStatus: (orderId: string, status: AdminOrder['status'], awb?: string) => void;

  // Cart / Bag
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  moveToWishlist: (index: number) => void;

  // Wishlist
  wishlist: WishlistItem[];
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupons & Pricing
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  cartTotals: {
    totalMrp: number;
    productDiscount: number;
    couponDiscount: number;
    shippingFee: number;
    finalTotal: number;
    freeShippingThreshold: number;
    amountNeededForFreeShipping: number;
  };

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  performSearch: (query: string) => void;

  // Filters & PLP
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredProducts: Product[];

  // Checkout & Orders
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderSuccessOpen: boolean;
  setIsOrderSuccessOpen: (open: boolean) => void;
  lastOrderDetails: any | null;
  placeOrder: (shippingAddress: ShippingAddress, paymentMethod: string) => void;

  // Order Tracking
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  activeTrackingId: string;
  openTracking: (orderId?: string) => void;
}

const initialFilters: FilterState = {
  gender: 'all',
  brands: [],
  sizes: [],
  colors: [],
  priceRange: [0, 50000],
  minDiscount: 0,
  sortBy: 'relevance'
};

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'OM-842910',
    customerName: 'Priya Sharma',
    phone: '+91 98765 43210',
    address: 'A-42 Connaught Place, Block B',
    city: 'New Delhi',
    itemsCount: 2,
    totalAmount: 4144,
    paymentMode: 'UPI',
    status: 'DISPATCHED',
    awbNumber: 'OM-948210384',
    carrier: 'Blue Dart Priority Express',
    date: 'Nov 22, 2026'
  },
  {
    id: 'OM-751924',
    customerName: 'Aarav Malhotra',
    phone: '+91 99887 76655',
    address: 'Penthouse 12, Altamount Road',
    city: 'Mumbai',
    itemsCount: 1,
    totalAmount: 24500,
    paymentMode: 'CARD',
    status: 'PACKED',
    awbNumber: 'OM-837261942',
    carrier: 'Delhivery Luxury',
    date: 'Nov 21, 2026'
  },
  {
    id: 'OM-629401',
    customerName: 'Kavita Singhania',
    phone: '+91 91234 56789',
    address: 'Bungalow 7, Jubilee Hills',
    city: 'Hyderabad',
    itemsCount: 3,
    totalAmount: 5890,
    paymentMode: 'COD',
    status: 'DELIVERED',
    awbNumber: 'OM-729103845',
    carrier: 'Blue Dart Express',
    date: 'Nov 19, 2026'
  }
];

const ECommerceContext = createContext<ECommerceContextType | undefined>(undefined);

export const ECommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'home' | 'plp' | 'pdp' | 'admin' | 'login'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Dynamic Products, Brands, Categories State
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [brands, setBrands] = useState<Brand[]>(BRANDS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);

  // Dynamic Banners & Ticker State
  const [banners, setBanners] = useState<HeroBanner[]>(HERO_BANNERS);
  const [tickerText, setTickerText] = useState(
    'OLD MONEY: COMPLIMENTARY EXPRESS DELIVERY & EXTRA 15% OFF ON HERITAGE COUTURE'
  );

  // Dynamic Coupons State
  const [coupons, setCoupons] = useState<Coupon[]>(COUPONS);

  // Dynamic Orders State
  const [adminOrders, setAdminOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    return [
      { product: PRODUCTS[0], selectedSize: 'M', selectedColor: 'Emerald Green', quantity: 1 }
    ];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    return [
      { product: PRODUCTS[1], addedAt: new Date().toISOString() }
    ];
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(COUPONS[0]);

  // Filters
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Checkout
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState<any | null>(null);

  // Order Tracking
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [activeTrackingId, setActiveTrackingId] = useState('OM-842910');

  // Auth Helpers
  const loginAsAdmin = () => {
    setCurrentUser({
      id: 'usr-admin-1',
      name: 'Old Money Administrator',
      email: 'admin@oldmoney.com',
      role: 'admin'
    });
    setIsAuthModalOpen(false);
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginAsCustomer = (name: string, email: string) => {
    setCurrentUser({
      id: 'usr-cust-' + Date.now(),
      name: name || 'Valued Client',
      email: email || 'client@example.com',
      role: 'customer'
    });
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
    if (currentView === 'admin' || currentView === 'login') {
      setCurrentView('home');
    }
  };

  const openLogin = () => {
    setCurrentView('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation Helpers
  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCategory = (category: string, gender?: string) => {
    setFilters({
      ...initialFilters,
      category: category,
      gender: (gender as any) || 'all'
    });
    setCurrentView('plp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAdmin = () => {
    if (!currentUser || currentUser.role !== 'admin') {
      setCurrentView('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const performSearch = (query: string) => {
    setSearchQuery(query);
    setFilters({ ...initialFilters });
    setIsSearchOpen(false);
    setCurrentView('plp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openTracking = (orderId?: string) => {
    if (orderId) {
      setActiveTrackingId(orderId);
    }
    setIsTrackingOpen(true);
  };

  // ADMIN ACTIONS - PRODUCTS
  const addProduct = (newProdData: Omit<Product, 'id' | 'slug' | 'rating' | 'ratingCount'>) => {
    const newId = 'prod-' + Date.now();
    const slug = newProdData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProduct: Product = {
      ...newProdData,
      id: newId,
      slug,
      rating: 4.9,
      ratingCount: 1
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          if (updates.price !== undefined || updates.mrp !== undefined) {
            const mrp = updates.mrp ?? p.mrp;
            const price = updates.price ?? p.price;
            updated.discountPercentage = mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;
          }
          return updated;
        }
        return p;
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const bulkApplySale = (targetCategory: string, discountPercent: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        const matchesCategory =
          targetCategory === 'all' ||
          p.category.toLowerCase() === targetCategory.toLowerCase() ||
          p.subCategory.toLowerCase() === targetCategory.toLowerCase() ||
          (targetCategory === 'dresses' && (p.category.toLowerCase().includes('dress') || p.subCategory.toLowerCase().includes('dress')));

        if (matchesCategory) {
          const newPrice = Math.round(p.mrp * (1 - discountPercent / 100));
          return {
            ...p,
            price: newPrice,
            discountPercentage: discountPercent,
            isDealOfTheDay: true
          };
        }
        return p;
      })
    );

    const label = targetCategory === 'all' ? 'ALL COLLECTIONS' : targetCategory.toUpperCase();
    setTickerText(`SPECIAL PRIVILEGE OFFER: FLAT ${discountPercent}% OFF ON ${label} — APPLIED IN CART!`);
  };

  // ADMIN ACTIONS - BRANDS
  const addBrand = (newBrand: Omit<Brand, 'id' | 'slug'>) => {
    const slug = newBrand.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setBrands((prev) => [...prev, { ...newBrand, id: 'b-' + Date.now(), slug }]);
  };

  const deleteBrand = (id: string) => {
    setBrands((prev) => prev.filter((b) => b.id !== id));
  };

  // ADMIN ACTIONS - CATEGORIES
  const addCategory = (cat: Category) => {
    setCategories((prev) => [...prev, cat]);
  };

  const addSubcategory = (catId: string, subName: string) => {
    if (!subName.trim()) return;
    const newSub = {
      id: 'sub-' + Date.now(),
      name: subName.trim(),
      slug: subName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
    setCategories((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, subcategories: [...c.subcategories, newSub] } : c))
    );
  };

  // ADMIN ACTIONS - BANNERS & ORDERS
  const updateBanner = (id: string, updates: Partial<HeroBanner>) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const updateOrderStatus = (orderId: string, status: AdminOrder['status'], awb?: string) => {
    setAdminOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status, awbNumber: awb || o.awbNumber } : o))
    );
  };

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prev) => [newCoupon, ...prev]);
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
  };

  // Cart Logic
  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const moveToWishlist = (index: number) => {
    const item = cart[index];
    if (item) {
      toggleWishlist(item.product);
      removeFromCart(index);
    }
  };

  // Wishlist Logic
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.product.id === product.id);
      if (exists) {
        return prev.filter((item) => item.product.id !== product.id);
      } else {
        return [{ product, addedAt: new Date().toISOString() }, ...prev];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.product.id === productId);
  };

  // Coupons
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try OLDMONEY15 or FESTIVE500' };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Cart Calculations
  const FREE_SHIPPING_THRESHOLD = 999;
  const totalMrp = cart.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0);
  const cartSellingSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const productDiscount = totalMrp - cartSellingSubtotal;

  let couponDiscount = 0;
  if (appliedCoupon && cartSellingSubtotal >= appliedCoupon.minOrderAmount) {
    if (appliedCoupon.discountType === 'percentage') {
      const calculated = (cartSellingSubtotal * appliedCoupon.discountValue) / 100;
      couponDiscount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
    } else {
      couponDiscount = appliedCoupon.discountValue;
    }
  }

  const shippingFee = cartSellingSubtotal >= FREE_SHIPPING_THRESHOLD || cart.length === 0 ? 0 : 99;
  const finalTotal = Math.max(0, cartSellingSubtotal - couponDiscount + shippingFee);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSellingSubtotal);

  // Filtered Products using stateful products
  const filteredProducts = products.filter((product) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchSub = product.subCategory.toLowerCase().includes(q);
      const matchTags = product.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchBrand && !matchCategory && !matchSub && !matchTags) return false;
    }

    if (filters.gender && filters.gender !== 'all') {
      if (product.gender !== filters.gender && product.gender !== 'unisex') return false;
    }

    if (filters.category && filters.category !== 'All') {
      if (product.category.toLowerCase() !== filters.category.toLowerCase()) return false;
    }

    if (filters.subCategory) {
      if (product.subCategory.toLowerCase() !== filters.subCategory.toLowerCase()) return false;
    }

    if (filters.brands.length > 0) {
      if (!filters.brands.includes(product.brand)) return false;
    }

    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;

    if (product.discountPercentage < filters.minDiscount) return false;

    if (filters.isLuxeOnly && !product.isLuxe) return false;

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.price - b.price;
    if (filters.sortBy === 'price-desc') return b.price - a.price;
    if (filters.sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    return b.ratingCount - a.ratingCount;
  });

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchQuery('');
  };

  const placeOrder = (shippingAddress: ShippingAddress, paymentMethod: string) => {
    const newOrderId = 'OM-' + Math.floor(100000 + Math.random() * 900000);
    const orderData = {
      orderId: newOrderId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: [...cart],
      totalPaid: finalTotal,
      address: shippingAddress,
      paymentMethod,
      estimatedDelivery: '3-4 business days'
    };

    // Add to admin order management list
    const newAdminOrder: AdminOrder = {
      id: newOrderId,
      customerName: shippingAddress.fullName,
      phone: shippingAddress.phone,
      address: shippingAddress.addressLine,
      city: shippingAddress.city,
      itemsCount: cart.reduce((sum, i) => sum + i.quantity, 0),
      totalAmount: finalTotal,
      paymentMode: paymentMethod.toUpperCase(),
      status: 'CONFIRMED',
      awbNumber: 'OM-' + Math.floor(100000000 + Math.random() * 900000000),
      carrier: 'Blue Dart Priority Air Express',
      date: 'Just now'
    };
    setAdminOrders((prev) => [newAdminOrder, ...prev]);

    setActiveTrackingId(newOrderId);
    setLastOrderDetails(orderData);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
  };

  return (
    <ECommerceContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProduct,
        openProduct,
        openCategory,
        goHome,
        openAdmin,
        openLogin,
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin',
        isAuthModalOpen,
        setIsAuthModalOpen,
        loginAsAdmin,
        loginAsCustomer,
        logout,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        bulkApplySale,
        brands,
        addBrand,
        deleteBrand,
        categories,
        addCategory,
        addSubcategory,
        banners,
        updateBanner,
        tickerText,
        setTickerText,
        adminOrders,
        updateOrderStatus,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        moveToWishlist,
        wishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        toggleWishlist,
        isInWishlist,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addCoupon,
        deleteCoupon,
        cartTotals: {
          totalMrp,
          productDiscount,
          couponDiscount,
          shippingFee,
          finalTotal,
          freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
          amountNeededForFreeShipping
        },
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        performSearch,
        filters,
        setFilters,
        resetFilters,
        filteredProducts,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        lastOrderDetails,
        placeOrder,
        isTrackingOpen,
        setIsTrackingOpen,
        activeTrackingId,
        openTracking
      }}
    >
      {children}
    </ECommerceContext.Provider>
  );
};

export const useECommerce = () => {
  const context = useContext(ECommerceContext);
  if (!context) throw new Error('useECommerce must be used within an ECommerceProvider');
  return context;
};
