import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Percent,
  Megaphone,
  Tag,
  Truck,
  PlusCircle,
  Eye,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  Search,
  Filter,
  ArrowLeft,
  LogOut,
  Sparkles,
  Layers,
  Building2,
  Check,
  ChevronRight,
  Package,
  Calendar,
  Clock,
  X
} from 'lucide-react';
import { useECommerce, AdminOrder } from '../../context/ECommerceContext';
import { Product, Brand, Category } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    bulkApplySale,
    brands,
    addBrand,
    deleteBrand,
    categories,
    addSubcategory,
    banners,
    updateBanner,
    tickerText,
    setTickerText,
    coupons,
    addCoupon,
    deleteCoupon,
    adminOrders,
    updateOrderStatus,
    goHome,
    openProduct,
    currentUser,
    logout
  } = useECommerce();

  // Navigation Sidebar Module
  const [activeModule, setActiveModule] = useState<
    'overview' | 'dresses' | 'brands' | 'sections' | 'bulk-sale' | 'banners' | 'orders' | 'coupons'
  >('overview');

  // Filter & Search in Catalog Table
  const [catalogSearch, setCatalogSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Add Dress Modal State
  const [isAddDressOpen, setIsAddDressOpen] = useState(false);
  const [newDress, setNewDress] = useState({
    title: '',
    brand: 'RSVP Atelier',
    brandId: 'b1',
    gender: 'women' as const,
    category: 'Westernwear',
    subCategory: 'Dresses',
    mrp: 4499,
    price: 2249,
    discountPercentage: 50,
    isBestseller: true,
    isDealOfTheDay: true,
    isLuxe: false,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Emerald Noir', hex: '#005f40', imageIndex: 0 },
      { name: 'Champagne Gold', hex: '#d4af37', imageIndex: 1 }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stockPerSize: { 'XS': 6, 'S': 12, 'M': 18, 'L': 10, 'XL': 4 },
    description: 'An exquisitely structured evening slip dress cut on the bias from pure lustrous silk.',
    fabricCare: ['100% Mulberry Silk', 'Dry clean only'],
    specifications: {
      'Silhouette': 'Bias Cut Slip Midi',
      'Occasion': 'Evening Gala & Soiree',
      'Fit': 'Fluid Tailored Fit'
    },
    tags: ['Old Money Exclusive', 'Silk Dress', 'Bestseller']
  });

  // Add Brand State
  const [isAddBrandOpen, setIsAddBrandOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandLogo, setNewBrandLogo] = useState('https://images.unsplash.com/photo-1544441893-675973e31985?w=200&auto=format&fit=crop');
  const [newBrandLuxe, setNewBrandLuxe] = useState(false);

  // Bulk Sale State
  const [bulkCategory, setBulkCategory] = useState<'dresses' | 'westernwear' | 'indianwear' | 'all'>('dresses');
  const [bulkDiscount, setBulkDiscount] = useState<number>(50);
  const [bulkSuccessMsg, setBulkSuccessMsg] = useState('');

  // Individual Quick Edit Discount
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // In-table Direct Price Edit
  const [inlineEditingId, setInlineEditingId] = useState<string | null>(null);
  const [inlinePriceInput, setInlinePriceInput] = useState<number>(0);
  const [newSubInput, setNewSubInput] = useState<{ [catId: string]: string }>({});

  const startInlineEdit = (product: Product) => {
    setInlineEditingId(product.id);
    setInlinePriceInput(product.price);
  };

  const saveInlinePrice = (product: Product) => {
    if (inlinePriceInput <= 0) return;
    const newDiscount = Math.round(((product.mrp - inlinePriceInput) / product.mrp) * 100);
    updateProduct(product.id, {
      price: inlinePriceInput,
      discountPercentage: Math.max(0, newDiscount)
    });
    setInlineEditingId(null);
  };

  // Curated Luxury Dress Presets for Instant 1-Click Publishing
  const dressPresets = [
    {
      title: 'Mulberry Silk Bias-Cut Slip Evening Midi Dress',
      brand: 'RSVP Atelier',
      category: 'Westernwear',
      subCategory: 'Dresses',
      mrp: 4999,
      price: 2499,
      images: [
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&auto=format&fit=crop&q=80'
      ],
      description: 'Cut on the true bias from lustrous pure silk charmeuse with delicate French seams.',
      fabricCare: ['100% Mulberry Silk', 'Dry clean only'],
      isBestseller: true,
      isDealOfTheDay: true,
      isLuxe: false
    },
    {
      title: 'Hand-Embroidered Zardozi Raw Silk Festive Anarkali',
      brand: 'Tarun Tahiliani',
      category: 'Indianwear',
      subCategory: 'Anarkali Suits',
      mrp: 14999,
      price: 7499,
      images: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&auto=format&fit=crop&q=80'
      ],
      description: 'Heirloom ensemble adorned with intricate micro-pearls and hand-beaten gold wire work.',
      fabricCare: ['Pure Chanderi Silk & Chiffon Dupatta', 'Specialist Dry Clean'],
      isBestseller: true,
      isDealOfTheDay: false,
      isLuxe: true
    },
    {
      title: 'Double-Breasted Cashmere Blend Tuxedo Dress',
      brand: 'RSVP Atelier',
      category: 'Westernwear',
      subCategory: 'Blazers & Dresses',
      mrp: 8999,
      price: 4499,
      images: [
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80'
      ],
      description: 'Structured sartorial tailoring featuring satin peak lapels and covered vintage buttons.',
      fabricCare: ['Cashmere Wool Blend', 'Eco Dry Clean'],
      isBestseller: false,
      isDealOfTheDay: true,
      isLuxe: true
    },
    {
      title: 'Tiered Pleated Lamé Gold Gala Gown',
      brand: 'Ritu Kumar',
      category: 'Westernwear',
      subCategory: 'Gowns',
      mrp: 11999,
      price: 5999,
      images: [
        'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&auto=format&fit=crop&q=80'
      ],
      description: 'Sunburst pleated metallic lamé that captures ambient evening chandelier light.',
      fabricCare: ['Metallic Lamé & Viscose Crepe', 'Dry Clean Only'],
      isBestseller: true,
      isDealOfTheDay: true,
      isLuxe: true
    }
  ];

  // New Coupon Form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponVal, setNewCouponVal] = useState(20);
  const [newCouponMin, setNewCouponMin] = useState(1499);

  // Helper for adding dress
  const handleAddDressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDress.title.trim()) return;

    const discount = Math.round(((newDress.mrp - newDress.price) / newDress.mrp) * 100);
    addProduct({
      ...newDress,
      discountPercentage: discount
    });
    setIsAddDressOpen(false);
    alert(`Success: "${newDress.title}" has been published to the storefront!`);
  };

  // Helper for adding brand
  const handleAddBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    addBrand({
      name: newBrandName.trim(),
      logo: newBrandLogo,
      isLuxe: newBrandLuxe
    });
    setNewBrandName('');
    setIsAddBrandOpen(false);
    alert(`Brand "${newBrandName}" added to the platform directory.`);
  };

  // Bulk Sale Apply
  const handleApplyBulkSale = () => {
    bulkApplySale(bulkCategory, bulkDiscount);
    setBulkSuccessMsg(
      `✓ Applied Flat ${bulkDiscount}% OFF to ${bulkCategory.toUpperCase()}! Selling prices and top announcement marquee updated.`
    );
    setTimeout(() => setBulkSuccessMsg(''), 5000);
  };

  // Filtered Products for Catalog Table
  const filteredCatalog = products.filter((p) => {
    if (categoryFilter !== 'all') {
      if (categoryFilter === 'dresses') {
        const isDress = p.subCategory.toLowerCase().includes('dress') || p.category.toLowerCase().includes('dress');
        if (!isDress) return false;
      } else if (p.category.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false;
      }
    }
    if (catalogSearch.trim()) {
      const q = catalogSearch.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    }
    return true;
  });

  const totalDresses = products.filter(
    (p) => p.subCategory.toLowerCase().includes('dress') || p.category.toLowerCase().includes('dress')
  ).length;

  const totalDeals = products.filter((p) => p.isDealOfTheDay || p.discountPercentage >= 50).length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 flex">
      
      {/* 1. ENTERPRISE SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#111827] text-gray-300 flex-shrink-0 flex flex-col justify-between hidden md:flex border-r border-gray-800">
        <div>
          {/* Brand Mark in Sidebar */}
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/om-monogram-light-clean.png" alt="OM" className="h-7 w-auto object-contain" />
              <div>
                <span className="font-serif font-black tracking-widest text-sm uppercase text-white block">
                  OLD MONEY
                </span>
                <span className="text-[9px] tracking-[0.2em] font-serif italic text-amber-300 block">
                  Enterprise Studio
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveModule('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors ${
                activeModule === 'overview'
                  ? 'bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Studio Overview</span>
            </button>

            <button
              onClick={() => setActiveModule('dresses')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors ${
                activeModule === 'dresses'
                  ? 'bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Dresses & Products ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveModule('bulk-sale')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors ${
                activeModule === 'bulk-sale'
                  ? 'bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <Percent className="w-4 h-4 text-amber-300" />
              <span>Bulk Sale & Offer Engine</span>
            </button>

            <button
              onClick={() => setActiveModule('brands')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors ${
                activeModule === 'brands'
                  ? 'bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Brand Partners ({brands.length})</span>
            </button>

            <button
              onClick={() => setActiveModule('sections')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors ${
                activeModule === 'sections'
                  ? 'bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Sections & Taxonomy</span>
            </button>

            <button
              onClick={() => setActiveModule('banners')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors ${
                activeModule === 'banners'
                  ? 'bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <Megaphone className="w-4 h-4" />
              <span>Hero Banners & Ticker</span>
            </button>

            <button
              onClick={() => setActiveModule('orders')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors ${
                activeModule === 'orders'
                  ? 'bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Orders & Fulfillment ({adminOrders.length})</span>
            </button>

            <button
              onClick={() => setActiveModule('coupons')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors ${
                activeModule === 'coupons'
                  ? 'bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Promo Coupons ({coupons.length})</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800 space-y-3">
          <button
            onClick={goHome}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors uppercase tracking-wider"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>View Live Storefront</span>
          </button>

          <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
            <span className="truncate">{currentUser?.email}</span>
            <button onClick={logout} className="text-red-400 hover:text-red-300" title="Sign Out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN ADMIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={goHome}
              className="md:hidden flex items-center gap-1 text-xs text-gray-500 font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Store</span>
            </button>
            <h1 className="text-base font-bold text-gray-900 uppercase tracking-wider">
              {activeModule === 'overview' && 'Studio Overview & Metrics'}
              {activeModule === 'dresses' && 'Dresses & Product Catalog'}
              {activeModule === 'bulk-sale' && 'Bulk Sale & Discount Engine'}
              {activeModule === 'brands' && 'Brand Partner Management'}
              {activeModule === 'sections' && 'Store Sections & Taxonomy'}
              {activeModule === 'banners' && 'Hero Banners & Marquee Ticker'}
              {activeModule === 'orders' && 'Orders & Shipment Milestones'}
              {activeModule === 'coupons' && 'Promotional Discount Coupons'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddDressOpen(true)}
              className="bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>+ Add Dress</span>
            </button>
          </div>
        </header>

        {/* Mobile / Tablet Horizontal Module Navigation Strip */}
        <div className="md:hidden bg-[#111827] text-gray-300 px-4 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2 border-b border-gray-800">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'dresses', label: `Dresses (${products.length})` },
            { id: 'bulk-sale', label: 'Bulk Sale %' },
            { id: 'brands', label: `Brands (${brands.length})` },
            { id: 'sections', label: 'Sections' },
            { id: 'banners', label: 'Banners' },
            { id: 'orders', label: `Orders (${adminOrders.length})` },
            { id: 'coupons', label: 'Coupons' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveModule(tab.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                activeModule === tab.id
                  ? 'bg-amber-400 text-black'
                  : 'bg-gray-800 text-gray-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* MODULE: OVERVIEW */}
          {activeModule === 'overview' && (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Total Dresses</span>
                  <div className="flex items-baseline justify-between mt-2">
                    <h3 className="text-2xl font-black text-gray-900">{totalDresses} Styles</h3>
                    <span className="text-xs text-emerald-600 font-bold">In Stock</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">On Sale / Promoted</span>
                  <div className="flex items-baseline justify-between mt-2">
                    <h3 className="text-2xl font-black text-amber-800">{totalDeals} Items</h3>
                    <span className="text-xs text-gray-400 font-semibold">50%+ Off</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Brand Partners</span>
                  <div className="flex items-baseline justify-between mt-2">
                    <h3 className="text-2xl font-black text-gray-900">{brands.length} Brands</h3>
                    <span className="text-xs text-amber-600 font-bold">Verified</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Customer Orders</span>
                  <div className="flex items-baseline justify-between mt-2">
                    <h3 className="text-2xl font-black text-emerald-700">{adminOrders.length} Total</h3>
                    <span className="text-xs text-gray-400 font-semibold">Active</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  onClick={() => setIsAddDressOpen(true)}
                  className="bg-white p-5 rounded-xl border border-gray-200 hover:border-gray-900 cursor-pointer shadow-sm transition-all flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-900 flex-shrink-0">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-gray-900">Add New Dress</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">Publish a new garment with price, MRP, sizes & photos.</p>
                  </div>
                </div>

                <div
                  onClick={() => setActiveModule('bulk-sale')}
                  className="bg-white p-5 rounded-xl border border-gray-200 hover:border-amber-600 cursor-pointer shadow-sm transition-all flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 flex-shrink-0">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-gray-900">Launch Bulk Sale</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">Apply flat discount across all dresses or categories.</p>
                  </div>
                </div>

                <div
                  onClick={() => setActiveModule('banners')}
                  className="bg-white p-5 rounded-xl border border-gray-200 hover:border-amber-600 cursor-pointer shadow-sm transition-all flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-gray-900">Edit Hero Banners</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">Update campaign headlines, sale tags, and top ticker.</p>
                  </div>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                    Recent Customer Orders
                  </h3>
                  <button
                    onClick={() => setActiveModule('orders')}
                    className="text-xs font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-gray-100 text-xs">
                  {adminOrders.slice(0, 3).map((o) => (
                    <div key={o.id} className="py-3 flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-gray-900">{o.id}</span>
                        <span className="text-gray-500 ml-2">&bull; {o.customerName} ({o.city})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-900">₹{o.totalAmount.toLocaleString('en-IN')}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          o.status === 'DELIVERED'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-800'
                        }`}>
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODULE: DRESSES & PRODUCTS */}
          {activeModule === 'dresses' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              
              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-72">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={catalogSearch}
                      onChange={(e) => setCatalogSearch(e.target.value)}
                      placeholder="Search dress by title or brand..."
                      className="w-full bg-gray-50 border border-gray-300 rounded pl-9 pr-3 py-2 text-xs font-medium focus:outline-none focus:border-gray-900"
                    />
                  </div>

                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs font-semibold text-gray-700"
                  >
                    <option value="all">All Categories</option>
                    <option value="dresses">Only Dresses</option>
                    <option value="Westernwear">Westernwear</option>
                    <option value="Indianwear">Indianwear</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Jewellery & Bags">Jewellery & Bags</option>
                  </select>
                </div>

                <button
                  onClick={() => setIsAddDressOpen(true)}
                  className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4 text-amber-300" />
                  <span>+ Add New Dress</span>
                </button>
              </div>

              {/* Product Table */}
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-50 text-gray-700 uppercase font-bold border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3">Dress / Product</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">MRP (₹)</th>
                      <th className="px-4 py-3">Sale Price (₹)</th>
                      <th className="px-4 py-3">Discount</th>
                      <th className="px-4 py-3">Flags</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredCatalog.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="w-12 aspect-[3/4] object-cover rounded bg-gray-100 flex-shrink-0"
                            />
                            <div className="min-w-0 max-w-xs">
                              <span className="text-[10px] font-bold uppercase text-gray-400 block truncate">
                                {product.brand}
                              </span>
                              <h4 className="font-semibold text-gray-900 truncate" title={product.title}>
                                {product.title}
                              </h4>
                              <span className="text-[10px] text-gray-400">
                                Sizes: {product.sizes.join(', ')}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-medium">
                            {product.subCategory}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-gray-400 line-through">
                          ₹{product.mrp.toLocaleString('en-IN')}
                        </td>

                        <td className="px-4 py-3 font-bold text-gray-900">
                          {inlineEditingId === product.id ? (
                            <div className="flex items-center gap-1.5">
                              <span className="text-gray-500 font-mono text-xs">₹</span>
                              <input
                                type="number"
                                value={inlinePriceInput}
                                onChange={(e) => setInlinePriceInput(Number(e.target.value))}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') saveInlinePrice(product);
                                  if (e.key === 'Escape') setInlineEditingId(null);
                                }}
                                className="w-20 bg-white border-2 border-gray-900 rounded px-2 py-0.5 font-bold text-xs focus:outline-none"
                                autoFocus
                              />
                              <button
                                onClick={() => saveInlinePrice(product)}
                                className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 shadow-sm"
                                title="Save Price"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setInlineEditingId(null)}
                                className="p-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                                title="Cancel"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 group/price">
                              <span>₹{product.price.toLocaleString('en-IN')}</span>
                              <button
                                onClick={() => startInlineEdit(product)}
                                className="opacity-0 group-hover/price:opacity-100 p-1 text-gray-400 hover:text-black hover:bg-gray-100 rounded transition-opacity"
                                title="Quick Edit Price"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </td>

                        <td className="px-4 py-3">
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {product.discountPercentage}% OFF
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {product.isDealOfTheDay && (
                              <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                                Deal
                              </span>
                            )}
                            {product.isBestseller && (
                              <span className="text-[9px] font-bold bg-gray-100 text-gray-900 border border-gray-300 px-1.5 py-0.5 rounded">
                                Bestseller
                              </span>
                            )}
                            {product.isLuxe && (
                              <span className="text-[9px] font-bold bg-gray-900 text-amber-300 px-1.5 py-0.5 rounded">
                                Luxe
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded"
                              title="Edit Price & Discount"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openProduct(product)}
                              className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded"
                              title="View on Storefront"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete "${product.title}"?`)) {
                                  deleteProduct(product.id);
                                }
                              }}
                              className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE: BULK SALE & OFFER ENGINE */}
          {activeModule === 'bulk-sale' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div className="max-w-2xl space-y-2">
                <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider">
                  Bulk Offer & Discount Engine
                </h3>
                <p className="text-xs text-gray-500">
                  Select a category (e.g. All Dresses) and apply a flat discount percentage in 1 click. Selling prices recalculate immediately and the top announcement marquee updates sitewide.
                </p>
              </div>

              {bulkSuccessMsg && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-4 rounded-lg flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                  <span>{bulkSuccessMsg}</span>
                </div>
              )}

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-5 max-w-xl">
                <div>
                  <label className="text-xs font-bold text-gray-800 uppercase block mb-1.5">
                    1. Select Target Group
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'dresses', label: 'All Dresses & Gowns' },
                      { id: 'westernwear', label: 'All Westernwear' },
                      { id: 'indianwear', label: 'All Indianwear & Kurtas' },
                      { id: 'all', label: 'Entire Storewide Catalog' }
                    ].map((target) => (
                      <button
                        key={target.id}
                        type="button"
                        onClick={() => setBulkCategory(target.id as any)}
                        className={`p-3 rounded-lg border text-xs font-bold text-left transition-all ${
                          bulkCategory === target.id
                            ? 'border-gray-900 bg-white text-gray-900 shadow-sm ring-2 ring-gray-900/10'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {target.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-gray-800 uppercase">
                      2. Set Discount Percentage
                    </label>
                    <span className="text-sm font-black text-amber-800">
                      {bulkDiscount}% OFF
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="5"
                    value={bulkDiscount}
                    onChange={(e) => setBulkDiscount(Number(e.target.value))}
                    className="w-full accent-gray-900 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>10%</span>
                    <span>30%</span>
                    <span>50%</span>
                    <span>70%</span>
                    <span>80%</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 text-xs space-y-2">
                  <span className="font-bold text-gray-700 block">Offer Campaign Preview:</span>
                  <p className="text-gray-600">
                    Target: <strong className="text-gray-900">{bulkCategory.toUpperCase()}</strong>
                  </p>
                  <p className="text-gray-600">
                    Discount: <strong className="text-amber-800">{bulkDiscount}% OFF</strong>
                  </p>
                  <p className="text-gray-600">
                    Ticker Text:
                    <span className="block mt-1 bg-gray-100 p-2 rounded text-[11px] font-mono font-semibold">
                      SPECIAL PRIVILEGE OFFER: FLAT {bulkDiscount}% OFF ON {bulkCategory === 'all' ? 'ALL COLLECTIONS' : bulkCategory.toUpperCase()} — APPLIED IN CART!
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleApplyBulkSale}
                  className="w-full bg-gray-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-yellow-200" />
                  <span>APPLY BULK {bulkDiscount}% SALE TO {bulkCategory.toUpperCase()}</span>
                </button>
              </div>
            </div>
          )}

          {/* MODULE: BRAND PARTNERS */}
          {activeModule === 'brands' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider">
                    Official Brand Partners ({brands.length})
                  </h3>
                  <p className="text-xs text-gray-500">
                    Manage the fashion houses, luxury couture labels, and designers hosted on your platform.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddBrandOpen(true)}
                  className="bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add New Brand</span>
                </button>
              </div>

              {/* Brands Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {brands.map((brand) => {
                  const brandCount = products.filter(
                    (p) => p.brand.toLowerCase() === brand.name.toLowerCase()
                  ).length;

                  return (
                    <div
                      key={brand.id}
                      className="border border-gray-200 rounded-lg p-5 bg-white flex flex-col items-center text-center justify-between shadow-sm relative group hover:shadow-md transition-shadow"
                    >
                      <button
                        onClick={() => deleteBrand(brand.id)}
                        className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete Brand"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 mb-3 border border-gray-200 shadow-inner">
                        <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
                      </div>

                      <h4 className="font-bold text-xs uppercase text-gray-900 line-clamp-1">{brand.name}</h4>
                      
                      <div className="mt-2 space-y-1">
                        {brand.isLuxe ? (
                          <span className="inline-block text-[9px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            Luxe Atelier
                          </span>
                        ) : (
                          <span className="inline-block text-[9px] font-semibold text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
                            Verified Partner
                          </span>
                        )}
                        <span className="text-[10px] text-gray-400 font-medium block">
                          {brandCount} {brandCount === 1 ? 'Garment' : 'Garments'} in Catalog
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Quick Add Brand Card */}
                <button
                  type="button"
                  onClick={() => setIsAddBrandOpen(true)}
                  className="border-2 border-dashed border-gray-300 hover:border-gray-900 rounded-lg p-5 flex flex-col items-center justify-center text-center transition-colors group cursor-pointer min-h-[170px]"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-gray-900 group-hover:text-white flex items-center justify-center text-gray-500 mb-2 transition-colors">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700 group-hover:text-black">
                    + Onboard Brand
                  </span>
                  <span className="text-[10px] text-gray-400 mt-0.5">Add partner fashion house</span>
                </button>
              </div>
            </div>
          )}

          {/* MODULE: SECTIONS & TAXONOMY */}
          {activeModule === 'sections' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div>
                <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider">
                  Storefront Sections & Category Tree
                </h3>
                <p className="text-xs text-gray-500">
                  Control the hierarchical mega-menu subcategories and demographic verticals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((cat) => (
                  <div key={cat.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50/50 space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <div>
                        <span className="font-serif font-bold text-sm uppercase text-gray-900 block">{cat.name}</span>
                        <span className="text-[10px] text-gray-500 font-medium">
                          {products.filter(p => p.category.toLowerCase() === cat.name.toLowerCase() || p.gender === cat.gender).length} styles active
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-gray-600 bg-gray-200/70 px-2 py-0.5 rounded">
                        {cat.gender}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-gray-500 uppercase block">Subcategories:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.subcategories.map((sub) => (
                          <span
                            key={sub.id}
                            className="bg-white border border-gray-300 rounded px-2.5 py-1 text-xs font-medium text-gray-700 shadow-2xs"
                          >
                            {sub.name}
                          </span>
                        ))}
                      </div>

                      {/* Add Subcategory Form */}
                      <div className="pt-2 flex gap-1.5">
                        <input
                          type="text"
                          value={newSubInput[cat.id] || ''}
                          onChange={(e) => setNewSubInput({ ...newSubInput, [cat.id]: e.target.value })}
                          placeholder="Add subcategory (e.g. Cocktail Dresses)..."
                          className="bg-white border border-gray-300 rounded px-2.5 py-1 text-xs flex-1 focus:outline-none focus:border-gray-900"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const val = newSubInput[cat.id];
                            if (val && val.trim()) {
                              addSubcategory(cat.id, val.trim());
                              setNewSubInput({ ...newSubInput, [cat.id]: '' });
                            }
                          }}
                          className="bg-gray-900 text-white text-[11px] font-bold px-3 py-1 rounded hover:bg-black uppercase"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE: BANNERS & TICKER */}
          {activeModule === 'banners' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-8">
              {/* Ticker Editor */}
              <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 space-y-3">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-amber-600" />
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900">
                    Top Header Marquee Announcement Banner
                  </h4>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tickerText}
                    onChange={(e) => setTickerText(e.target.value)}
                    className="bg-white border border-gray-300 rounded px-3 py-2 text-xs font-semibold flex-1 focus:outline-none focus:border-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => alert('Top announcement banner updated live!')}
                    className="bg-gray-900 text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>
              </div>

              {/* Carousel Slides */}
              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900">
                  Homepage Hero Carousel Slides ({banners.length})
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {banners.map((b, idx) => (
                    <div key={b.id} className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 flex flex-col justify-between">
                      <div className="relative aspect-[16/9] bg-gray-200">
                        <img src={b.desktopImage} alt={b.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          Slide {idx + 1}
                        </span>
                      </div>

                      <div className="p-4 space-y-3">
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase block">Sale Tag</label>
                          <input
                            type="text"
                            value={b.tag}
                            onChange={(e) => updateBanner(b.id, { tag: e.target.value })}
                            className="w-full bg-white border border-gray-300 rounded px-2.5 py-1 text-xs font-bold text-amber-800"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase block">Campaign Title</label>
                          <input
                            type="text"
                            value={b.title}
                            onChange={(e) => updateBanner(b.id, { title: e.target.value })}
                            className="w-full bg-white border border-gray-300 rounded px-2.5 py-1 text-xs font-serif font-bold text-gray-900"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase block">Subtitle</label>
                          <input
                            type="text"
                            value={b.subtitle}
                            onChange={(e) => updateBanner(b.id, { subtitle: e.target.value })}
                            className="w-full bg-white border border-gray-300 rounded px-2.5 py-1 text-xs text-gray-600"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase block">Button Text</label>
                          <input
                            type="text"
                            value={b.linkText}
                            onChange={(e) => updateBanner(b.id, { linkText: e.target.value })}
                            className="w-full bg-white border border-gray-300 rounded px-2.5 py-1 text-xs font-bold uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODULE: ORDERS & SHIPMENTS */}
          {activeModule === 'orders' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div>
                <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider">
                  Live Customer Orders & Milestones
                </h3>
                <p className="text-xs text-gray-500">
                  Update order status here. Changes reflect immediately in the customer's live tracking timeline!
                </p>
              </div>

              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-50 text-gray-700 uppercase font-bold border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3">Order ID & Date</th>
                      <th className="px-4 py-3">Client & City</th>
                      <th className="px-4 py-3">Total Amount</th>
                      <th className="px-4 py-3">Carrier / AWB</th>
                      <th className="px-4 py-3">Current Milestone</th>
                      <th className="px-4 py-3 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {adminOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50/70">
                        <td className="px-4 py-3">
                          <span className="font-mono font-bold text-gray-900 block">{order.id}</span>
                          <span className="text-[10px] text-gray-400">{order.date}</span>
                        </td>

                        <td className="px-4 py-3">
                          <span className="font-semibold text-gray-900 block">{order.customerName}</span>
                          <span className="text-[10px] text-gray-500">{order.city} ({order.phone})</span>
                        </td>

                        <td className="px-4 py-3 font-bold text-gray-900">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </td>

                        <td className="px-4 py-3">
                          <span className="text-gray-700 block">{order.carrier}</span>
                          <span className="font-mono text-[10px] text-gray-400">{order.awbNumber}</span>
                        </td>

                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            order.status === 'DELIVERED'
                              ? 'bg-emerald-50 text-emerald-700'
                              : order.status === 'DISPATCHED'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-right">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                            className="bg-white border border-gray-300 rounded px-2.5 py-1 text-xs font-semibold text-gray-700 cursor-pointer"
                          >
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="PACKED">PACKED</option>
                            <option value="DISPATCHED">DISPATCHED</option>
                            <option value="DELIVERED">DELIVERED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE: COUPONS */}
          {activeModule === 'coupons' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 max-w-xl space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900">
                  Create New Promotional Discount Coupon
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Coupon Code</label>
                    <input
                      type="text"
                      value={newCouponCode}
                      onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                      placeholder="e.g. VIP50"
                      className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs font-bold uppercase"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Discount (%)</label>
                    <input
                      type="number"
                      value={newCouponVal}
                      onChange={(e) => setNewCouponVal(Number(e.target.value))}
                      className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Min Order (₹)</label>
                    <input
                      type="number"
                      value={newCouponMin}
                      onChange={(e) => setNewCouponMin(Number(e.target.value))}
                      className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs font-bold"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!newCouponCode.trim()) return;
                    addCoupon({
                      code: newCouponCode.trim(),
                      description: `Flat ${newCouponVal}% OFF on orders above ₹${newCouponMin}`,
                      discountType: 'percentage',
                      discountValue: newCouponVal,
                      minOrderAmount: newCouponMin,
                      maxDiscount: 1000
                    });
                    setNewCouponCode('');
                    alert(`Coupon ${newCouponCode} created successfully!`);
                  }}
                  className="bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded"
                >
                  Create Coupon
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {coupons.map((c) => (
                  <div key={c.code} className="border border-gray-200 rounded-lg p-4 bg-white flex items-center justify-between shadow-sm">
                    <div>
                      <span className="font-mono font-bold text-xs bg-gray-100 px-2 py-0.5 rounded border border-gray-300">
                        {c.code}
                      </span>
                      <p className="text-xs text-gray-700 mt-1 font-semibold">{c.description}</p>
                      <span className="text-[10px] text-gray-400">Min. Cart: ₹{c.minOrderAmount}</span>
                    </div>
                    <button
                      onClick={() => deleteCoupon(c.code)}
                      className="text-gray-400 hover:text-red-500 p-1"
                      title="Delete Coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* MODAL: ADD NEW DRESS */}
      {isAddDressOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200 max-h-[90vh] flex flex-col">
            <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-gray-900" />
                <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider">
                  Add New Dress / Garment
                </h3>
              </div>
              <button onClick={() => setIsAddDressOpen(false)} className="text-gray-400 hover:text-gray-700">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddDressSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              
              {/* Quick Preset Templates */}
              <div className="bg-amber-50/60 p-3 rounded-lg border border-amber-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>Quick-Fill Luxury Garment Presets:</span>
                  </span>
                  <span className="text-[10px] text-gray-500">Click to autofill fields</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {dressPresets.map((preset, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => {
                        setNewDress({
                          ...newDress,
                          title: preset.title,
                          brand: preset.brand,
                          category: preset.category,
                          subCategory: preset.subCategory,
                          mrp: preset.mrp,
                          price: preset.price,
                          discountPercentage: Math.round(((preset.mrp - preset.price) / preset.mrp) * 100),
                          images: preset.images,
                          description: preset.description,
                          fabricCare: preset.fabricCare,
                          isBestseller: preset.isBestseller,
                          isDealOfTheDay: preset.isDealOfTheDay,
                          isLuxe: preset.isLuxe
                        });
                      }}
                      className="text-left bg-white border border-gray-200 hover:border-gray-900 p-2 rounded transition-colors group flex items-center gap-2"
                    >
                      <img src={preset.images[0]} alt="" className="w-8 h-10 object-cover rounded flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold text-gray-900 block truncate group-hover:underline">
                          {preset.title}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          ₹{preset.price.toLocaleString('en-IN')} ({preset.brand})
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 uppercase block mb-1">Dress Title</label>
                <input
                  type="text"
                  required
                  value={newDress.title}
                  onChange={(e) => setNewDress({ ...newDress, title: e.target.value })}
                  placeholder="e.g. Pure Mulberry Silk Pleated Cocktail Dress"
                  className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 uppercase block mb-1">Brand Name</label>
                  <select
                    value={newDress.brand}
                    onChange={(e) => {
                      const sel = brands.find((b) => b.name === e.target.value);
                      setNewDress({ ...newDress, brand: e.target.value, brandId: sel?.id || 'b1' });
                    }}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 font-medium"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 uppercase block mb-1">Category</label>
                  <select
                    value={newDress.category}
                    onChange={(e) => setNewDress({ ...newDress, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 font-medium"
                  >
                    <option value="Westernwear">Westernwear (Dresses & Blazers)</option>
                    <option value="Indianwear">Indianwear (Kurtas & Sarees)</option>
                    <option value="Luxe">Luxe Atelier</option>
                    <option value="Topwear">Men Topwear</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-gray-700 uppercase block mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    value={newDress.mrp}
                    onChange={(e) => setNewDress({ ...newDress, mrp: Number(e.target.value) })}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 uppercase block mb-1">Sale Price (₹)</label>
                  <input
                    type="number"
                    value={newDress.price}
                    onChange={(e) => setNewDress({ ...newDress, price: Number(e.target.value) })}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 font-bold text-amber-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 uppercase block mb-1">Discount %</label>
                  <div className="bg-gray-100 rounded px-3 py-2 font-bold text-emerald-600">
                    {Math.round(((newDress.mrp - newDress.price) / newDress.mrp) * 100)}% OFF
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 uppercase block mb-1">Image URL (Portrait 3:4)</label>
                <input
                  type="url"
                  value={newDress.images[0]}
                  onChange={(e) => setNewDress({ ...newDress, images: [e.target.value, newDress.images[1] || e.target.value] })}
                  className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 uppercase block mb-1">Description & Fabric</label>
                <textarea
                  rows={2}
                  value={newDress.description}
                  onChange={(e) => setNewDress({ ...newDress, description: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-800">
                  <input
                    type="checkbox"
                    checked={newDress.isDealOfTheDay}
                    onChange={(e) => setNewDress({ ...newDress, isDealOfTheDay: e.target.checked })}
                    className="accent-gray-900 w-4 h-4"
                  />
                  <span>Feature in Flash Sale</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-800">
                  <input
                    type="checkbox"
                    checked={newDress.isBestseller}
                    onChange={(e) => setNewDress({ ...newDress, isBestseller: e.target.checked })}
                    className="accent-gray-900 w-4 h-4"
                  />
                  <span>Mark as Bestseller</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-800">
                  <input
                    type="checkbox"
                    checked={newDress.isLuxe}
                    onChange={(e) => setNewDress({ ...newDress, isLuxe: e.target.checked })}
                    className="accent-amber-600 w-4 h-4"
                  />
                  <span>Old Money Luxe Label</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddDressOpen(false)}
                  className="bg-gray-100 text-gray-700 font-bold px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gray-900 hover:bg-black text-white font-bold px-6 py-2 rounded"
                >
                  PUBLISH DRESS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW BRAND */}
      {isAddBrandOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase">
              Add Partner Brand to Platform
            </h3>

            <form onSubmit={handleAddBrandSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 uppercase block mb-1">Brand Name</label>
                <input
                  type="text"
                  required
                  value={newBrandName}
                  onChange={(e) => setNewBrandName(e.target.value)}
                  placeholder="e.g. Loro Piana"
                  className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 uppercase block mb-1">Logo URL</label>
                <input
                  type="url"
                  value={newBrandLogo}
                  onChange={(e) => setNewBrandLogo(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 font-mono text-[11px]"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-800">
                <input
                  type="checkbox"
                  checked={newBrandLuxe}
                  onChange={(e) => setNewBrandLuxe(e.target.checked)}
                  className="accent-amber-600 w-4 h-4"
                />
                <span>Classify as Old Money Luxe Brand</span>
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddBrandOpen(false)}
                  className="bg-gray-100 px-4 py-2 rounded text-xs font-bold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gray-900 text-white px-5 py-2 rounded text-xs font-bold"
                >
                  SAVE BRAND
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK EDIT INDIVIDUAL DISCOUNT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase">
              Quick Edit Offer: {editingProduct.title}
            </h3>

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase block mb-1">Selling Price (₹)</label>
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setEditingProduct({ ...editingProduct, price: val });
                }}
                className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm font-bold text-amber-800"
              />
            </div>

            <div className="flex gap-2">
              {[30, 40, 50, 60, 70].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => {
                    const newP = Math.round(editingProduct.mrp * (1 - pct / 100));
                    setEditingProduct({ ...editingProduct, price: newP });
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-800 text-xs font-bold py-1.5 rounded transition-colors"
                >
                  {pct}% Off
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="bg-gray-100 px-4 py-2 rounded text-xs font-bold text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateProduct(editingProduct.id, {
                    price: editingProduct.price,
                    isDealOfTheDay: true
                  });
                  setEditingProduct(null);
                }}
                className="bg-gray-900 text-white px-5 py-2 rounded text-xs font-bold"
              >
                SAVE OFFER
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
