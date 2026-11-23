import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, WishlistItem, Coupon, FilterState, ShippingAddress, Brand, Category } from '../types';
import { PRODUCTS } from '../data/products';
import { COUPONS } from '../data/coupons';
import { HERO_BANNERS, HeroBanner } from '../data/banners';
import { BRANDS, CATEGORIES } from '../data/categories';
import { apiGetOrders, apiCreateOrder, apiGetProfile, clearAuthTokens } from '../services/backendApi';

export interface StoreContent {
  announcementTicker: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroTag: string;
  heroButtonText: string;
  heroImage: string;
  spotlightTitle: string;
  spotlightSubtitle: string;
  stylesTitle: string;
  stylesSubtitle: string;
  luxeTitle: string;
  luxeSubtitle: string;
  luxeBannerImage: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
}

export const DEFAULT_STORE_CONTENT: StoreContent = {
  announcementTicker: '✦ OLD MONEY LUXURY ATELIER: MULBERRY SILK DRESSES, VELVET GOWNS & SAVILE ROW SUITING • COMPLIMENTARY EXPRESS DELIVERY ✦',
  heroHeadline: 'THE OLD MONEY DRESS EDIT',
  heroSubheadline: 'Hand-Tailored 22-Momme Mulberry Silk Bias Slips, Emerald Velvet Gala Gowns & Pleated Linen Riviera Silhouettes',
  heroTag: 'HAUTE COUTURE EDIT',
  heroButtonText: 'EXPLORE LUXURY DRESSES',
  heroImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1920&auto=format&fit=crop&q=85',
  spotlightTitle: 'IN THE SPOTLIGHT',
  spotlightSubtitle: 'Haute Couture Houses & Private Atelier Guilds',
  stylesTitle: 'STYLES TO CELEBRATE IN',
  stylesSubtitle: 'Curated Wardrobe for Soirées, Galas, Opera & Country Estates',
  luxeTitle: 'THE LUXE COLLECTION',
  luxeSubtitle: 'RSVP Atelier, Tom Ford Haute Couture & Chanel Private Atelier',
  luxeBannerImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1600&auto=format&fit=crop&q=85',
  contactPhone: '1800-267-4444',
  contactEmail: 'concierge@oldmoney.luxury',
  contactAddress: 'A-42 Connaught Place, Block B, New Delhi - 110001'
};

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'customer';
  avatar?: string;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  pincode?: string;
  itemsCount: number;
  items: CartItem[];
  totalAmount: number;
  paymentMode: string;
  status: 'PLACED' | 'CONFIRMED' | 'PACKED' | 'DISPATCHED' | 'DELIVERED';
  awbNumber: string;
  carrier: string;
  date: string;
}

interface ECommerceContextType {
  // Navigation & Views
  currentView: 'home' | 'plp' | 'pdp' | 'admin' | 'login' | 'tracking';
  setCurrentView: (view: 'home' | 'plp' | 'pdp' | 'admin' | 'login' | 'tracking') => void;
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
  loginAsCustomer: (name: string, phone: string, email?: string) => void;
  logout: () => void;
  customerOrders: AdminOrder[];

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
  storeContent: StoreContent;
  updateStoreContent: (updates: Partial<StoreContent>) => void;

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
    customerName: 'Vikramaditya Oberoi',
    phone: '+91 98765 43210',
    email: 'v.oberoi@mayfair.co.in',
    address: 'A-42 Connaught Place, Block B',
    city: 'New Delhi',
    pincode: '110001',
    itemsCount: 2,
    items: [
      {
        product: PRODUCTS[0], // The Ascot Mulberry Silk Bias-Cut Champagne Slip Dress
        selectedSize: 'M',
        selectedColor: 'Champagne Gold',
        quantity: 1
      },
      {
        product: PRODUCTS[3], // Tweed Bouclé Pearl-Buttoned Blazer Dress
        selectedSize: '38 (S)',
        selectedColor: 'Ecru & Gold Tweed',
        quantity: 1
      }
    ],
    totalAmount: 22498,
    paymentMode: 'UPI Instant',
    status: 'DISPATCHED',
    awbNumber: 'OM-948210384',
    carrier: 'Blue Dart Priority Express',
    date: 'Nov 22, 2026'
  },
  {
    id: 'OM-751924',
    customerName: 'Aarav Malhotra',
    phone: '+91 99887 76655',
    email: 'aarav.m@outlook.com',
    address: 'Penthouse 12, Altamount Road',
    city: 'Mumbai',
    pincode: '400026',
    itemsCount: 1,
    items: [
      {
        product: PRODUCTS[1], // Emerald Noir Velvet Backless High-Slit Gala Evening Gown
        selectedSize: 'S',
        selectedColor: 'Emerald Noir',
        quantity: 1
      }
    ],
    totalAmount: 18499,
    paymentMode: 'HDFC Luxury Card',
    status: 'PACKED',
    awbNumber: 'OM-837261942',
    carrier: 'Delhivery Luxury Express',
    date: 'Nov 21, 2026'
  },
  {
    id: 'OM-629401',
    customerName: 'Kabir Singhania',
    phone: '+91 91234 56789',
    email: 'kabir.singhania@heritage.org',
    address: 'Bungalow 7, Jubilee Hills',
    city: 'Hyderabad',
    pincode: '500033',
    itemsCount: 2,
    items: [
      {
        product: PRODUCTS[2], // Portofino Pleated French Linen Belted Riviera Midi Dress
        selectedSize: 'M',
        selectedColor: 'Ivory Cream',
        quantity: 1
      },
      {
        product: PRODUCTS[4], // Chiffon Tiered Floral Silk Soirée Slip Dress
        selectedSize: 'S',
        selectedColor: 'Vintage Rose Floral',
        quantity: 1
      }
    ],
    totalAmount: 21498,
    paymentMode: 'UPI Instant',
    status: 'DELIVERED',
    awbNumber: 'OM-729103845',
    carrier: 'Blue Dart Priority Express',
    date: 'Nov 19, 2026'
  },
  {
    id: 'OM-512039',
    customerName: 'Rohan Varma',
    phone: '+91 98450 12345',
    email: 'rohan.varma@techbangalore.in',
    address: '42/1 100ft Road, Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
    itemsCount: 1,
    items: [
      {
        product: PRODUCTS[5], // Savile Row Double-Breasted Super 150s Wool Tuxedo Suit
        selectedSize: '40R',
        selectedColor: 'Midnight Obsidian',
        quantity: 1
      }
    ],
    totalAmount: 19499,
    paymentMode: 'UPI Instant',
    status: 'CONFIRMED',
    awbNumber: 'OM-581920482',
    carrier: 'Blue Dart Priority Express',
    date: 'Nov 23, 2026'
  },
  {
    id: 'OM-394812',
    customerName: 'Devendra Rao',
    phone: '+91 94440 98765',
    email: 'devendra.rao@chennaiclub.com',
    address: '14 Poes Garden',
    city: 'Chennai',
    pincode: '600086',
    itemsCount: 2,
    items: [
      {
        product: PRODUCTS[7], // Pure Mongolian Cashmere Cable-Knit Polo Sweater
        selectedSize: 'L',
        selectedColor: 'Ivory Cream',
        quantity: 1
      },
      {
        product: PRODUCTS[8], // High-Waisted Double-Pleated Wool Flannel Gurkha Trousers
        selectedSize: '34',
        selectedColor: 'Charcoal Melange Flannel',
        quantity: 1
      }
    ],
    totalAmount: 15998,
    paymentMode: 'Amex Centurion',
    status: 'DELIVERED',
    awbNumber: 'OM-392817459',
    carrier: 'Blue Dart Priority Express',
    date: 'Nov 18, 2026'
  }
];

const ECommerceContext = createContext<ECommerceContextType | undefined>(undefined);

export const ECommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'home' | 'plp' | 'pdp' | 'admin' | 'login' | 'tracking'>('home');
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
    '✦ OLD MONEY SARTORIAL MENSWEAR: SAVILE ROW SUITS, VELVET TUXEDOS & PURE CASHMERE • COMPLIMENTARY EXPRESS DELIVERY ✦'
  );

  // Dynamic Storefront Content (Public Site Texts & Images)
  const [storeContent, setStoreContent] = useState<StoreContent>(() => {
    try {
      const saved = localStorage.getItem('om_store_content');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading stored storeContent:', e);
    }
    return DEFAULT_STORE_CONTENT;
  });

  const updateStoreContent = (updates: Partial<StoreContent>) => {
    setStoreContent((prev) => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem('om_store_content', JSON.stringify(updated));
      } catch (e) {
        console.warn('Error saving storeContent:', e);
      }
      return updated;
    });

    // Also sync hero banner if headline/image was updated
    if (updates.heroHeadline || updates.heroImage || updates.heroSubheadline || updates.heroTag || updates.heroButtonText) {
      setBanners((prev) => {
        if (!prev.length) return prev;
        const newBanners = [...prev];
        newBanners[0] = {
          ...newBanners[0],
          title: updates.heroHeadline ?? newBanners[0].title,
          subtitle: updates.heroSubheadline ?? newBanners[0].subtitle,
          tag: updates.heroTag ?? newBanners[0].tag,
          linkText: updates.heroButtonText ?? newBanners[0].linkText,
          desktopImage: updates.heroImage ?? newBanners[0].desktopImage,
          mobileImage: updates.heroImage ?? newBanners[0].mobileImage
        };
        return newBanners;
      });
    }

    if (updates.announcementTicker) {
      setTickerText(updates.announcementTicker);
    }
  };

  // Dynamic Coupons State
  const [coupons, setCoupons] = useState<Coupon[]>(COUPONS);

  // Dynamic Orders State
  const [adminOrders, setAdminOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    return [
      { product: PRODUCTS[0], selectedSize: '40R', selectedColor: 'Midnight Obsidian', quantity: 1 }
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
  const [activeTrackingId, setActiveTrackingId] = useState('');

  // Auth Helpers
  const loginAsAdmin = () => {
    setCurrentUser({
      id: 'usr-admin-1',
      name: 'Old Money Administrator',
      email: 'admin@oldmoney.luxury',
      role: 'admin'
    });
    setIsAuthModalOpen(false);
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginAsCustomer = (name: string, phone: string = '', email?: string) => {
    const cleanPhone = phone ? phone.replace(/\D/g, '') : '';
    // If name or phone is not provided, try to find existing orders with this phone or email
    const existingOrder = adminOrders.find(o => 
      (cleanPhone && o.phone.replace(/\D/g, '').includes(cleanPhone)) ||
      (email && o.email && o.email.toLowerCase() === email.toLowerCase())
    );
    const resolvedName = name || existingOrder?.customerName || 'Valued Client';
    const resolvedEmail = email || existingOrder?.email || `client.${cleanPhone || 'guest'}@customer.luxury`;
    const resolvedPhone = phone || existingOrder?.phone || '+91 98765 43210';

    setCurrentUser({
      id: 'usr-cust-' + (cleanPhone || (email ? email.replace(/\W/g, '') : Date.now())),
      name: resolvedName,
      phone: resolvedPhone,
      email: resolvedEmail,
      role: 'customer'
    });
    setIsAuthModalOpen(false);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const customerOrders = currentUser?.role === 'customer'
    ? adminOrders.filter(o => {
        const cleanUserPhone = currentUser.phone ? currentUser.phone.replace(/\D/g, '') : '';
        const cleanOrderPhone = o.phone ? o.phone.replace(/\D/g, '') : '';
        const matchPhone = cleanUserPhone.length >= 6 && cleanOrderPhone.includes(cleanUserPhone);
        const matchEmail = currentUser.email && o.email && currentUser.email.toLowerCase() === o.email.toLowerCase();
        const matchName = currentUser.name && o.customerName && currentUser.name.toLowerCase() === o.customerName.toLowerCase();
        return matchPhone || matchEmail || matchName;
      })
    : [];

  const logout = () => {
    clearAuthTokens();
    setCurrentUser(null);
    if (currentView === 'admin' || currentView === 'login') {
      setCurrentView('home');
    }
  };

  // Sync with Django + PostgreSQL on Mount
  useEffect(() => {
    // 1. Restore authenticated session from PostgreSQL via JWT
    const token = localStorage.getItem('om_access_token');
    if (token) {
      apiGetProfile().then((res) => {
        if (res.success && res.data?.user) {
          const u = res.data.user;
          setCurrentUser({
            id: u.id,
            name: u.name,
            phone: u.phone,
            email: u.email,
            role: u.role
          });
        }
      }).catch(err => console.warn('PostgreSQL JWT profile sync notice:', err));
    }

    // 2. Load orders persisted in PostgreSQL
    apiGetOrders().then((res) => {
      if (res.success && res.data && res.data.length > 0) {
        const postgresOrders: AdminOrder[] = res.data.map((o) => ({
          id: o.order_id,
          customerName: o.customer_name,
          phone: o.customer_phone,
          email: o.customer_email,
          address: o.street_address,
          city: o.city,
          pincode: o.pincode,
          itemsCount: o.items ? o.items.length : 1,
          items: o.items || [],
          totalAmount: Number(o.total_amount),
          paymentMode: o.payment_mode,
          status: o.status,
          awbNumber: o.awb_number,
          carrier: o.carrier,
          date: 'Nov 22'
        }));
        setAdminOrders((prev) => {
          const existingIds = new Set(prev.map(p => p.id));
          const newOrders = postgresOrders.filter(po => !existingIds.has(po.id));
          return [...newOrders, ...prev];
        });
      }
    }).catch(err => console.warn('PostgreSQL orders sync notice:', err));
  }, []);

  const openLogin = () => {
    if (currentUser) {
      if (currentUser.role === 'admin') {
        setCurrentView('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      } else {
        setCurrentView('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
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
    setIsTrackingOpen(false);
    if (!currentUser) {
      setCurrentView('login');
    } else {
      setCurrentView('tracking');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      email: currentUser?.email || 'client@customer.com',
      address: shippingAddress.addressLine,
      city: shippingAddress.city,
      pincode: shippingAddress.pincode,
      itemsCount: cart.reduce((sum, i) => sum + i.quantity, 0),
      items: [...cart],
      totalAmount: finalTotal,
      paymentMode: paymentMethod.toUpperCase(),
      status: 'CONFIRMED',
      awbNumber: 'OM-' + Math.floor(100000000 + Math.random() * 900000000),
      carrier: 'Blue Dart Priority Air Express',
      date: 'Just now'
    };
    setAdminOrders((prev) => [newAdminOrder, ...prev]);

    // Persist order to PostgreSQL Database via Django REST API
    apiCreateOrder({
      order_id: newOrderId,
      customer_name: shippingAddress.fullName,
      customer_phone: shippingAddress.phone,
      customer_email: currentUser?.email || 'client@customer.com',
      street_address: shippingAddress.addressLine,
      city: shippingAddress.city,
      pincode: shippingAddress.pincode,
      total_amount: finalTotal,
      payment_mode: paymentMethod.toUpperCase(),
      status: 'CONFIRMED',
      awb_number: newAdminOrder.awbNumber,
      carrier: newAdminOrder.carrier,
      items: cart.map(i => ({
        product: {
          title: i.product.title,
          brand: i.product.brand,
          price: i.product.price,
          images: i.product.images
        },
        selectedSize: i.selectedSize,
        selectedColor: i.selectedColor,
        quantity: i.quantity
      }))
    }).catch(err => console.warn('PostgreSQL order persist notice:', err));

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
        customerOrders,
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
        storeContent,
        updateStoreContent,
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
