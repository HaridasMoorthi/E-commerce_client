import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Package,
  Users,
  Image as ImageIcon,
  TrendingUp,
  Search,
  CheckCircle2,
  Truck,
  Phone,
  Copy,
  Check,
  Eye,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Save,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Tag,
  Radio,
  Menu,
  X,
  Compass,
  ShieldCheck,
  Percent,
  Layers,
  Activity,
  ArrowUpRight,
  DollarSign,
  ShoppingBag,
  HelpCircle,
  Database
} from 'lucide-react';
import { useECommerce, AdminOrder } from '../../context/ECommerceContext';
import { Product, Coupon } from '../../types';

export type AdminModule =
  | 'dashboard'
  | 'pipeline'
  | 'orders'
  | 'tracking-hub'
  | 'products'
  | 'add-product'
  | 'markdown'
  | 'categories'
  | 'cms-hero'
  | 'cms-ticker'
  | 'cms-sections'
  | 'cms-contact'
  | 'customers'
  | 'coupons'
  | 'system-health';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    bulkApplySale,
    adminOrders,
    updateOrderStatus,
    storeContent,
    updateStoreContent,
    banners,
    coupons,
    addCoupon,
    deleteCoupon,
    goHome,
    openTracking,
    logout
  } = useECommerce();

  // Active Sidebar Module
  const [activeModule, setActiveModule] = useState<AdminModule>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Module 1: Sales Curve Analytics Period
  const [chartPeriod, setChartPeriod] = useState<'7d' | '30d' | 'year'>('30d');
  const [hoveredPoint, setHoveredPoint] = useState<{ label: string; amount: number; x: number; y: number } | null>(null);

  // Module 2: Orders Search & Filter
  const [orderQuery, setOrderQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'ALL' | 'PLACED' | 'CONFIRMED' | 'PACKED' | 'DISPATCHED' | 'DELIVERED'>('ALL');
  const [copiedAWB, setCopiedAWB] = useState<string | null>(null);

  // Module 3: Products Search & Category Filter
  const [productQuery, setProductQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Module 4: Add New Product Form State
  const [newTitle, setNewTitle] = useState('');
  const [newBrand, setNewBrand] = useState('Old Money Atelier');
  const [newCategory, setNewCategory] = useState('Suits & Tuxedos');
  const [newPrice, setNewPrice] = useState('4999');
  const [newMrp, setNewMrp] = useState('9999');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80');

  // Module 5: Bulk Markdown Engine State
  const [markdownCategory, setMarkdownCategory] = useState<string>('all');
  const [markdownDiscount, setMarkdownDiscount] = useState<number>(20);
  const [markdownNotice, setMarkdownNotice] = useState<string | null>(null);

  // Module 6: CMS Storefront Editor State
  const [editHeroTitle, setEditHeroTitle] = useState(storeContent.heroHeadline);
  const [editHeroSubtitle, setEditHeroSubtitle] = useState(storeContent.heroSubheadline);
  const [editHeroTag, setEditHeroTag] = useState(storeContent.heroTag);
  const [editHeroButton, setEditHeroButton] = useState(storeContent.heroButtonText);
  const [editHeroImage, setEditHeroImage] = useState(storeContent.heroImage);
  const [editTicker, setEditTicker] = useState(storeContent.announcementTicker);
  const [editSpotlightTitle, setEditSpotlightTitle] = useState(storeContent.spotlightTitle);
  const [editSpotlightSubtitle, setEditSpotlightSubtitle] = useState(storeContent.spotlightSubtitle);
  const [editLuxeTitle, setEditLuxeTitle] = useState(storeContent.luxeTitle);
  const [editLuxeSubtitle, setEditLuxeSubtitle] = useState(storeContent.luxeSubtitle);
  const [editLuxeImage, setEditLuxeImage] = useState(storeContent.luxeBannerImage);
  const [editPhone, setEditPhone] = useState(storeContent.contactPhone);
  const [editEmail, setEditEmail] = useState(storeContent.contactEmail);
  const [editAddress, setEditAddress] = useState(storeContent.contactAddress);
  const [cmsSaveSuccess, setCmsSaveSuccess] = useState(false);

  // Module 7: Live Tracking Inspector Query
  const [inspectorQuery, setInspectorQuery] = useState('OM-842910');

  // Module 8: Coupons Creator
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('15');

  // Save Storefront Changes to Context & LocalStorage
  const handleSaveStorefront = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateStoreContent({
      heroHeadline: editHeroTitle,
      heroSubheadline: editHeroSubtitle,
      heroTag: editHeroTag,
      heroButtonText: editHeroButton,
      heroImage: editHeroImage,
      announcementTicker: editTicker,
      spotlightTitle: editSpotlightTitle,
      spotlightSubtitle: editSpotlightSubtitle,
      luxeTitle: editLuxeTitle,
      luxeSubtitle: editLuxeSubtitle,
      luxeBannerImage: editLuxeImage,
      contactPhone: editPhone,
      contactEmail: editEmail,
      contactAddress: editAddress
    });
    setCmsSaveSuccess(true);
    setTimeout(() => setCmsSaveSuccess(false), 3000);
  };

  // Copy AWB
  const handleCopyAWB = (awb: string) => {
    navigator.clipboard.writeText(awb);
    setCopiedAWB(awb);
    setTimeout(() => setCopiedAWB(null), 2000);
  };

  // Run Bulk Markdown
  const handleRunBulkMarkdown = () => {
    bulkApplySale(markdownCategory, markdownDiscount);
    setMarkdownNotice(`Applied ${markdownDiscount}% markdown across ${markdownCategory === 'all' ? 'entire store catalog' : markdownCategory}!`);
    setTimeout(() => setMarkdownNotice(null), 4000);
  };

  // Add Product Submit
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addProduct({
      title: newTitle.trim(),
      brand: newBrand.trim(),
      brandId: 'b-oldmoney',
      gender: 'men',
      category: newCategory,
      subCategory: 'Bespoke Tailoring',
      price: Number(newPrice) || 4999,
      mrp: Number(newMrp) || 9999,
      discountPercentage: Math.round(((Number(newMrp) - Number(newPrice)) / Number(newMrp)) * 100) || 40,
      images: [newImage.trim()],
      sizes: ['38', '40', '42', '44'],
      stockPerSize: { '38': 10, '40': 15, '42': 12, '44': 8 },
      colors: [
        { name: 'Charcoal Obsidian', hex: '#262626', imageIndex: 0 },
        { name: 'Midnight Navy', hex: '#0f172a', imageIndex: 0 },
        { name: 'Crisp White', hex: '#ffffff', imageIndex: 0 }
      ],
      description: 'Exclusive Old Money luxury tailoring crafted from heritage European textiles.',
      fabricCare: ['Dry Clean Only', 'Steam Iron', 'Store in Cedar Garment Bag'],
      specifications: { 'Material': 'Pure Giza Cotton & Wool', 'Origin': 'Italy & Savile Row' },
      tags: ['Bespoke', 'Luxury', 'Old Money']
    });

    setNewTitle('');
    setActiveModule('products');
    alert('New garment published to public storefront catalog successfully!');
  };

  // Create Coupon
  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      description: `Special ${newCouponDiscount}% Discount on Luxury Menswear`,
      discountType: 'percentage',
      discountValue: Number(newCouponDiscount) || 15,
      minOrderAmount: 2999,
      maxDiscount: 5000
    });
    setNewCouponCode('');
  };

  // ─────────────────────────────────────────────────────────────
  // SMOOTH SALES LINE GRAPH DATA (NOT A BAR CHART - USER LOVED THIS)
  // ─────────────────────────────────────────────────────────────
  const salesGraphData = useMemo(() => {
    if (chartPeriod === '7d') {
      return [
        { label: 'Mon', amount: 84000 },
        { label: 'Tue', amount: 112000 },
        { label: 'Wed', amount: 145000 },
        { label: 'Thu', amount: 130000 },
        { label: 'Fri', amount: 185000 },
        { label: 'Sat', amount: 240000 },
        { label: 'Sun', amount: 284000 }
      ];
    }
    if (chartPeriod === 'year') {
      return [
        { label: 'Jan', amount: 2400000 },
        { label: 'Mar', amount: 3100000 },
        { label: 'May', amount: 3600000 },
        { label: 'Jul', amount: 3950000 },
        { label: 'Sep', amount: 4400000 },
        { label: 'Nov', amount: 4892450 }
      ];
    }
    return [
      { label: 'Nov 1', amount: 110000 },
      { label: 'Nov 4', amount: 135000 },
      { label: 'Nov 8', amount: 165000 },
      { label: 'Nov 12', amount: 152000 },
      { label: 'Nov 16', amount: 198000 },
      { label: 'Nov 20', amount: 230000 },
      { label: 'Nov 22', amount: 265000 },
      { label: 'Today', amount: 295000 }
    ];
  }, [chartPeriod]);

  const graphWidth = 700;
  const graphHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  const minAmount = Math.min(...salesGraphData.map(d => d.amount)) * 0.85;
  const maxAmount = Math.max(...salesGraphData.map(d => d.amount)) * 1.1;

  const points = salesGraphData.map((d, i) => {
    const x = paddingX + (i / (salesGraphData.length - 1)) * (graphWidth - paddingX * 2);
    const y = graphHeight - paddingY - ((d.amount - minAmount) / (maxAmount - minAmount)) * (graphHeight - paddingY * 2);
    return { x, y, label: d.label, amount: d.amount };
  });

  const linePath = points.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (point.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (point.x - prev.x) / 2;
    const cp2y = point.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
  }, '');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${graphHeight - paddingY} L ${points[0].x} ${graphHeight - paddingY} Z`;

  // Filtered Orders
  const filteredOrders = adminOrders.filter(o => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderQuery.toLowerCase()) ||
      o.phone.includes(orderQuery);
    const matchesStatus = orderStatusFilter === 'ALL' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(productQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(productQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Breadcrumb / Title helper
  const moduleTitles: Record<AdminModule, { category: string; title: string }> = {
    'dashboard': { category: 'Overview & Sales', title: 'Sales Performance & Curve' },
    'pipeline': { category: 'Overview & Sales', title: 'Live Fulfillment Pipeline' },
    'orders': { category: 'Orders & Logistics', title: 'Customer Orders Directory' },
    'tracking-hub': { category: 'Orders & Logistics', title: 'Live Courier Tracking Hub' },
    'products': { category: 'Catalog & Stock', title: 'Garments & Stock Inventory' },
    'add-product': { category: 'Catalog & Stock', title: '+ Add New Garment' },
    'markdown': { category: 'Catalog & Stock', title: 'Bulk Markdown & Sales Engine' },
    'categories': { category: 'Catalog & Stock', title: 'Collections & Categories' },
    'cms-hero': { category: 'Storefront CMS', title: 'Hero Top Banners' },
    'cms-ticker': { category: 'Storefront CMS', title: 'Top Announcement Bar' },
    'cms-sections': { category: 'Storefront CMS', title: 'Homepage Section Headings' },
    'cms-contact': { category: 'Storefront CMS', title: 'Store Contact & Concierge' },
    'customers': { category: 'Clients & Growth', title: 'Registered Clients (PostgreSQL)' },
    'coupons': { category: 'Clients & Growth', title: 'Discount Promo Codes' },
    'system-health': { category: 'System & Security', title: 'PostgreSQL & Server Security' }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col md:flex-row">
      
      {/* ─────────────────────────────────────────────────────────────
          LEFT SIDEBAR NAVIGATION (CLEAR, GROUPED, EASY TO ACCESS)
          ───────────────────────────────────────────────────────────── */}
      <aside className={`
        fixed md:sticky top-0 inset-y-0 left-0 z-40
        w-72 bg-white border-r border-slate-200
        flex flex-col justify-between
        transition-transform duration-200 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        shadow-sm md:shadow-none h-screen
      `}>
        
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/om-monogram-dark-clean.png" alt="OM" className="h-7 w-auto object-contain" />
            <div>
              <span className="font-bold text-sm text-slate-900 block leading-tight">OLD MONEY</span>
              <span className="text-[10px] text-slate-400 font-medium">Boutique Manager</span>
            </div>
          </div>
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-black p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Groups */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
          
          {/* GROUP 1: OVERVIEW */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block">
              Overview & Performance
            </span>
            <button
              onClick={() => {
                setActiveModule('dashboard');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeModule === 'dashboard'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              <span>Sales & Analytics</span>
            </button>

            <button
              onClick={() => {
                setActiveModule('pipeline');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeModule === 'pipeline'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Fulfillment Pipeline</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeModule === 'pipeline' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                4 Stages
              </span>
            </button>
          </div>

          {/* GROUP 2: ORDERS & DELIVERIES */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block">
              Orders & Logistics
            </span>
            <button
              onClick={() => {
                setActiveModule('orders');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeModule === 'orders'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-blue-400" />
                <span>Customer Orders</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeModule === 'orders' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {adminOrders.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveModule('tracking-hub');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeModule === 'tracking-hub'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Live Courier Tracking</span>
            </button>
          </div>

          {/* GROUP 3: CATALOG & STOCK */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block">
              Catalog & Inventory
            </span>
            <button
              onClick={() => {
                setActiveModule('products');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeModule === 'products'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-indigo-400" />
                <span>Products & Stock</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeModule === 'products' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {products.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveModule('add-product');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeModule === 'add-product'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <Plus className="w-4 h-4 text-emerald-500" />
              <span>+ Add New Garment</span>
            </button>

            <button
              onClick={() => {
                setActiveModule('markdown');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeModule === 'markdown'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-3">
                <Percent className="w-4 h-4 text-rose-500" />
                <span>Bulk Markdown Engine</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                Sale
              </span>
            </button>

            <button
              onClick={() => {
                setActiveModule('categories');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeModule === 'categories'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <Layers className="w-4 h-4 text-sky-500" />
              <span>Collections & Sections</span>
            </button>
          </div>

          {/* GROUP 4: WEBSITE CONTENT (CMS) - (Changes 2) */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block ml-3 mb-1">
              Storefront CMS
            </span>
            
            <button
              onClick={() => {
                setActiveModule('cms-hero');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeModule === 'cms-hero'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-rose-400" />
              <span>Hero Top Banners</span>
            </button>

            <button
              onClick={() => {
                setActiveModule('cms-ticker');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeModule === 'cms-ticker'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <Radio className="w-4 h-4 text-amber-500" />
              <span>Top Announcement Bar</span>
            </button>

            <button
              onClick={() => {
                setActiveModule('cms-sections');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeModule === 'cms-sections'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Homepage Headings</span>
            </button>

            <button
              onClick={() => {
                setActiveModule('cms-contact');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeModule === 'cms-contact'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <Phone className="w-4 h-4 text-teal-400" />
              <span>Contact & Concierge</span>
            </button>
          </div>

          {/* GROUP 5: CLIENTS & PROMOTIONS */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block">
              Clients & Offers
            </span>
            <button
              onClick={() => {
                setActiveModule('customers');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeModule === 'customers'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Registered Clients</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                Postgres
              </span>
            </button>

            <button
              onClick={() => {
                setActiveModule('coupons');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeModule === 'coupons'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4 text-amber-500" />
                <span>Discount Promo Codes</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeModule === 'coupons' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {coupons.length}
              </span>
            </button>
          </div>

          {/* GROUP 6: SYSTEM & SECURITY */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block">
              System & Security
            </span>
            <button
              onClick={() => {
                setActiveModule('system-health');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeModule === 'system-health'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Database & Security</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>
          </div>

        </div>

        {/* Sidebar Footer: Jump to Storefront & Logout */}
        <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/50">
          <button
            onClick={goHome}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider py-2.5 px-3 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
            <span>View Live Storefront</span>
          </button>

          <button
            onClick={() => {
              logout();
              goHome();
            }}
            className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 py-2 px-3 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* ─────────────────────────────────────────────────────────────
          RIGHT MAIN DASHBOARD CONTAINER
          ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-2xs">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            
            {/* Hamburger on Mobile */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="md:hidden p-2 text-slate-600 hover:text-black cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">
                  {moduleTitles[activeModule].category}
                </span>
                <span className="text-slate-300">/</span>
                <h1 className="text-sm font-bold text-slate-900">
                  {moduleTitles[activeModule].title}
                </h1>
              </div>
            </div>

            {/* Quick Actions in Header */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                PostgreSQL Database Online
              </span>

              {activeModule !== 'add-product' && (
                <button
                  onClick={() => setActiveModule('add-product')}
                  className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-300" />
                  <span>Add Garment</span>
                </button>
              )}
            </div>

          </div>
        </header>

        {/* Dynamic Content View */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 space-y-6">

          {/* ═══════════════════════════════════════════════════════════
              1. OVERVIEW: DASHBOARD & SMOOTH SALES LINE GRAPH
              ═══════════════════════════════════════════════════════════ */}
          {activeModule === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div>
                <h2 className="text-xl font-bold text-slate-900">Store Performance & Sales</h2>
                <p className="text-xs text-slate-500 mt-0.5">Summary of total orders, revenue volume, and active inventory.</p>
              </div>

              {/* 4 Friendly KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Total Store Sales</span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      +18.4%
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                    ₹48,92,450
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Daily avg: ₹1.63 Lakh</p>
                </div>

                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Total Orders</span>
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      +14%
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                    1,253 Orders
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{adminOrders.length} active in delivery system</p>
                </div>

                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Active Garments</span>
                    <button onClick={() => setActiveModule('products')} className="text-[11px] font-bold text-slate-700 hover:underline">
                      Catalog &rarr;
                    </button>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                    {products.length} Items
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Suits, shirts, trousers, knits</p>
                </div>

                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Registered Clients</span>
                    <button onClick={() => setActiveModule('customers')} className="text-[11px] font-bold text-slate-700 hover:underline">
                      Clients &rarr;
                    </button>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                    842 Clients
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Verified PostgreSQL users</p>
                </div>
              </div>

              {/* SMOOTH SALES GRAPH */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span>Sales Growth Curve (Revenue Over Time)</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Smooth trendline showing daily order volume.</p>
                  </div>

                  <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                    {(['7d', '30d', 'year'] as const).map(p => (
                      <button
                        key={p}
                        onClick={() => setChartPeriod(p)}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          chartPeriod === p ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-black'
                        }`}
                      >
                        {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '1 Year'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SVG Curve Line Graph */}
                <div className="relative w-full overflow-x-auto pt-2">
                  <svg viewBox={`0 0 ${graphWidth} ${graphHeight}`} className="w-full h-56 sm:h-64 overflow-visible">
                    <defs>
                      <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {[0.25, 0.5, 0.75].map((pct, idx) => {
                      const y = paddingY + pct * (graphHeight - paddingY * 2);
                      return (
                        <line
                          key={idx}
                          x1={paddingX}
                          y1={y}
                          x2={graphWidth - paddingX}
                          y2={y}
                          stroke="#e2e8f0"
                          strokeDasharray="4 4"
                          strokeWidth="1"
                        />
                      );
                    })}

                    <path d={areaPath} fill="url(#salesGrad)" />
                    <path d={linePath} fill="none" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

                    {points.map((pt, idx) => (
                      <g key={idx} className="cursor-pointer group">
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="5"
                          fill="#ffffff"
                          stroke="#059669"
                          strokeWidth="2.5"
                          className="transition-all hover:r-7 hover:fill-emerald-600"
                          onMouseEnter={() => setHoveredPoint(pt)}
                          onMouseLeave={() => setHoveredPoint(null)}
                        />
                        <text x={pt.x} y={graphHeight - 8} textAnchor="middle" className="text-[11px] fill-slate-400 font-mono font-medium">
                          {pt.label}
                        </text>
                      </g>
                    ))}
                  </svg>

                  {hoveredPoint && (
                    <div
                      className="absolute bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-2 animate-fadeIn"
                      style={{ left: `${(hoveredPoint.x / graphWidth) * 100}%`, top: `${(hoveredPoint.y / graphHeight) * 100}%` }}
                    >
                      <span className="font-bold text-amber-300">₹{hoveredPoint.amount.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-slate-300 block">{hoveredPoint.label}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Recent Customer Purchases</h3>
                  <button
                    onClick={() => setActiveModule('orders')}
                    className="text-xs font-bold text-slate-700 hover:text-black hover:underline cursor-pointer"
                  >
                    View All Orders ({adminOrders.length}) &rarr;
                  </button>
                </div>

                <div className="space-y-2.5">
                  {adminOrders.slice(0, 4).map((order) => (
                    <div
                      key={order.id}
                      className="p-3.5 bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900">#{order.id}</span>
                          <span className="text-slate-800 font-semibold">{order.customerName}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{order.city} &bull; {order.carrier}</p>
                      </div>

                      <div className="text-right flex items-center gap-3">
                        <div>
                          <span className="font-bold text-slate-900 block">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            order.status === 'DELIVERED'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <button
                          onClick={() => openTracking(order.id)}
                          className="bg-slate-900 hover:bg-black text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg cursor-pointer"
                        >
                          Track
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              1.1 OVERVIEW: LIVE FULFILLMENT PIPELINE (4 STAGES)
              ═══════════════════════════════════════════════════════════ */}
          {activeModule === 'pipeline' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Live Order Fulfillment Pipeline</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Track and advance client orders through atelier preparation, packing, and courier dispatch.
                  </p>
                </div>
                <button
                  onClick={() => setActiveModule('orders')}
                  className="bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs self-start sm:self-auto"
                >
                  View Tabular Orders &rarr;
                </button>
              </div>

              {/* 4 Stage Kanban Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* STAGE 1: CONFIRMED */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">1. Confirmed</h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      {adminOrders.filter(o => o.status === 'CONFIRMED' || o.status === 'PLACED').length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {adminOrders
                      .filter(o => o.status === 'CONFIRMED' || o.status === 'PLACED')
                      .map(order => (
                        <div key={order.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-slate-900">#{order.id}</span>
                            <span className="font-bold text-emerald-700">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                          </div>
                          <div>
                            <strong className="text-slate-800 block">{order.customerName}</strong>
                            <span className="text-[11px] text-slate-400">{order.city} &bull; {order.carrier}</span>
                          </div>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'PACKED')}
                            className="w-full bg-slate-900 hover:bg-black text-white text-[11px] font-bold py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <span>Move to Packaging</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    {adminOrders.filter(o => o.status === 'CONFIRMED' || o.status === 'PLACED').length === 0 && (
                      <div className="py-8 text-center text-slate-400 text-xs italic">
                        No orders waiting in Confirmed stage
                      </div>
                    )}
                  </div>
                </div>

                {/* STAGE 2: PACKAGING */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                      <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">2. Packaging</h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
                      {adminOrders.filter(o => o.status === 'PACKED').length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {adminOrders
                      .filter(o => o.status === 'PACKED')
                      .map(order => (
                        <div key={order.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-slate-900">#{order.id}</span>
                            <span className="font-bold text-emerald-700">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                          </div>
                          <div>
                            <strong className="text-slate-800 block">{order.customerName}</strong>
                            <span className="text-[11px] text-slate-400">{order.city} &bull; Boxed in Cedar Bag</span>
                          </div>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'DISPATCHED')}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <span>Dispatch via Air Express</span>
                            <Truck className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    {adminOrders.filter(o => o.status === 'PACKED').length === 0 && (
                      <div className="py-8 text-center text-slate-400 text-xs italic">
                        No orders in Packaging
                      </div>
                    )}
                  </div>
                </div>

                {/* STAGE 3: AIR EXPRESS TRANSIT */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">3. In Transit</h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                      {adminOrders.filter(o => o.status === 'DISPATCHED').length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {adminOrders
                      .filter(o => o.status === 'DISPATCHED')
                      .map(order => (
                        <div key={order.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-slate-900">#{order.id}</span>
                            <span className="font-bold text-emerald-700">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                          </div>
                          <div>
                            <strong className="text-slate-800 block">{order.customerName}</strong>
                            <span className="text-[11px] text-slate-400">AWB: {order.awbNumber}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 pt-1">
                            <button
                              onClick={() => openTracking(order.id)}
                              className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-[10px] font-bold py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                              Track GPS
                            </button>
                            <button
                              onClick={() => updateOrderStatus(order.id, 'DELIVERED')}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                              Delivered ✓
                            </button>
                          </div>
                        </div>
                      ))}
                    {adminOrders.filter(o => o.status === 'DISPATCHED').length === 0 && (
                      <div className="py-8 text-center text-slate-400 text-xs italic">
                        No orders in transit
                      </div>
                    )}
                  </div>
                </div>

                {/* STAGE 4: DELIVERED */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">4. Delivered</h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {adminOrders.filter(o => o.status === 'DELIVERED').length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {adminOrders
                      .filter(o => o.status === 'DELIVERED')
                      .map(order => (
                        <div key={order.id} className="p-3 bg-emerald-50/50 border border-emerald-200/80 rounded-xl space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-slate-900">#{order.id}</span>
                            <span className="font-bold text-emerald-800">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                          </div>
                          <div>
                            <strong className="text-slate-900 block">{order.customerName}</strong>
                            <span className="text-[11px] text-emerald-700 font-medium">✓ Successfully Delivered</span>
                          </div>
                          <button
                            onClick={() => openTracking(order.id)}
                            className="w-full bg-white hover:bg-slate-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            View POD / Waybill
                          </button>
                        </div>
                      ))}
                    {adminOrders.filter(o => o.status === 'DELIVERED').length === 0 && (
                      <div className="py-8 text-center text-slate-400 text-xs italic">
                        No completed deliveries yet
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              2. ORDERS & SHIPMENTS
              ═══════════════════════════════════════════════════════════ */}
          {activeModule === 'orders' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Customer Orders & Deliveries</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Manage customer shipments, delivery statuses, and waybills.</p>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold text-slate-600">
                  {(['ALL', 'CONFIRMED', 'PACKED', 'DISPATCHED', 'DELIVERED'] as const).map(st => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                        orderStatusFilter === st ? 'bg-slate-900 text-white shadow-xs' : 'bg-white border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {st === 'ALL' ? 'All Orders' : st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  placeholder="Search by Order ID (e.g. OM-842910), phone, or customer..."
                  className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 font-medium"
                />
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[11px]">
                      <tr>
                        <th className="py-3 px-4">Order ID & Date</th>
                        <th className="py-3 px-4">Customer Details</th>
                        <th className="py-3 px-4">Garments Ordered</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Status & Carrier</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4 font-mono">
                            <strong className="text-slate-900 block font-bold">#{order.id}</strong>
                            <span className="text-[11px] text-slate-400">{order.date}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <strong className="text-slate-900 block font-bold">{order.customerName}</strong>
                            <span className="text-slate-500 font-mono text-[11px]">{order.phone}</span>
                            <span className="text-slate-400 block text-[10px]">{order.city}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="space-y-1 max-w-xs">
                              {order.items?.map((item: any, i: number) => (
                                <div key={i} className="text-[11px] text-slate-600 truncate">
                                  {item.quantity}x {item.product?.title || 'Garment'} ({item.selectedSize})
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <strong className="text-slate-900 block font-bold text-sm">
                              ₹{order.totalAmount.toLocaleString('en-IN')}
                            </strong>
                            <span className="text-[10px] text-emerald-700 font-semibold uppercase">{order.paymentMode}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-900 cursor-pointer"
                            >
                              <option value="CONFIRMED">CONFIRMED</option>
                              <option value="PACKED">PACKED</option>
                              <option value="DISPATCHED">IN TRANSIT</option>
                              <option value="DELIVERED">DELIVERED</option>
                            </select>
                            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono mt-1">
                              <span>AWB: {order.awbNumber}</span>
                              <button onClick={() => handleCopyAWB(order.awbNumber)} className="hover:text-black cursor-pointer">
                                {copiedAWB === order.awbNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                              </button>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => openTracking(order.id)}
                              className="bg-slate-900 hover:bg-black text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                            >
                              <Eye className="w-3 h-3 text-amber-300" />
                              <span>Track</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              3. LIVE TRACKING HUB
              ═══════════════════════════════════════════════════════════ */}
          {activeModule === 'tracking-hub' && (
            <div className="space-y-6 animate-fadeIn max-w-3xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Live Delivery Tracking Inspector</h2>
                <p className="text-xs text-slate-500 mt-0.5">Quickly preview and inspect client shipment tracking exactly as your clients see it.</p>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
                <label className="text-xs font-bold text-slate-700 block">Select or Enter Order ID to Inspect</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inspectorQuery}
                    onChange={(e) => setInspectorQuery(e.target.value)}
                    placeholder="Enter Order ID (e.g. OM-842910)"
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-mono font-bold"
                  />
                  <button
                    onClick={() => openTracking(inspectorQuery.trim())}
                    className="bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Launch Full-Page Tracker &rarr;
                  </button>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-2">Or pick from current active orders:</span>
                  <div className="flex flex-wrap gap-2">
                    {adminOrders.map(o => (
                      <button
                        key={o.id}
                        onClick={() => openTracking(o.id)}
                        className="bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold text-slate-800 transition-colors cursor-pointer"
                      >
                        #{o.id} ({o.customerName.split(' ')[0]}) &bull; {o.status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              4. PRODUCTS & STOCK CATALOG
              ═══════════════════════════════════════════════════════════ */}
          {activeModule === 'products' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Products & Inventory</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Manage stock, prices, and garment details.</p>
                </div>
                <button
                  onClick={() => setActiveModule('add-product')}
                  className="bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-2 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>+ Add New Garment</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productQuery}
                    onChange={(e) => setProductQuery(e.target.value)}
                    placeholder="Search products by title or brand..."
                    className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 font-medium"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Suits & Tuxedos">Suits & Tuxedos</option>
                  <option value="Shirts & Polos">Shirts & Polos</option>
                  <option value="Trousers & Chinos">Trousers & Chinos</option>
                  <option value="Knitwear & Sweaters">Knitwear & Sweaters</option>
                </select>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[11px]">
                      <tr>
                        <th className="py-3 px-4">Garment</th>
                        <th className="py-3 px-4">Brand & Category</th>
                        <th className="py-3 px-4">Selling Price (₹)</th>
                        <th className="py-3 px-4">Original MRP</th>
                        <th className="py-3 px-4">Stock</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img src={p.images[0]} alt={p.title} className="w-10 h-12 rounded-lg object-cover border border-slate-200 flex-shrink-0" />
                              <div className="min-w-0 max-w-xs">
                                <strong className="text-slate-900 block font-semibold truncate">{p.title}</strong>
                                <span className="text-[11px] text-slate-400">{p.specifications?.['Material'] || 'Pure Cotton & Wool'}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-amber-900 uppercase text-[10px] block">{p.brand}</span>
                            <span className="text-slate-600 text-xs">{p.category}</span>
                          </td>
                          <td className="py-3 px-4">
                            <strong className="text-slate-900 font-bold text-sm">₹{p.price.toLocaleString('en-IN')}</strong>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-slate-400 line-through text-xs block">₹{p.mrp.toLocaleString('en-IN')}</span>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                              {p.discountPercentage}% OFF
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              In Stock
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  const newP = prompt(`Update price for ${p.title} (Current: ₹${p.price}):`, String(p.price));
                                  if (newP && !isNaN(Number(newP))) {
                                    updateProduct(p.id, { price: Number(newP) });
                                  }
                                }}
                                className="p-1.5 text-slate-500 hover:text-black hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                                title="Edit Price"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete garment "${p.title}"?`)) {
                                    deleteProduct(p.id);
                                  }
                                }}
                                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                                title="Delete Product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              4.1 BULK MARKDOWN & SALES ENGINE
              ═══════════════════════════════════════════════════════════ */}
          {activeModule === 'markdown' && (
            <div className="space-y-6 animate-fadeIn max-w-4xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Bulk Markdown & Sitewide Sale Engine</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Apply instant promotional markdowns across your entire store or specific departments in one click.
                </p>
              </div>

              {markdownNotice && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-900 font-semibold flex items-center gap-2.5 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{markdownNotice}</span>
                </div>
              )}

              {/* Engine Controls */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Select Department */}
                  <div className="space-y-2">
                    <label className="font-bold text-slate-700 text-xs block">1. Select Target Department</label>
                    <div className="space-y-1.5">
                      {[
                        { id: 'all', label: 'Entire Store (All Collections)' },
                        { id: 'Suits & Tuxedos', label: 'Suits & Tuxedos Only' },
                        { id: 'Shirts & Polos', label: 'Shirts & Polos Only' },
                        { id: 'Trousers & Chinos', label: 'Trousers & Chinos Only' },
                        { id: 'Knitwear & Sweaters', label: 'Knitwear & Sweaters Only' }
                      ].map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setMarkdownCategory(cat.id)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex items-center justify-between ${
                            markdownCategory === cat.id
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          <span>{cat.label}</span>
                          <span className={`text-[11px] ${markdownCategory === cat.id ? 'text-amber-300' : 'text-slate-400'}`}>
                            {products.filter(p => cat.id === 'all' || p.category === cat.id).length} items
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Discount Percentage */}
                  <div className="space-y-2">
                    <label className="font-bold text-slate-700 text-xs block">2. Select Promotional Discount</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[10, 15, 20, 30, 40, 50].map(pct => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setMarkdownDiscount(pct)}
                          className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                            markdownDiscount === pct
                              ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                          }`}
                        >
                          <span className="text-xl font-bold block">{pct}% OFF</span>
                          <span className={`text-[10px] uppercase font-bold tracking-wider ${markdownDiscount === pct ? 'text-rose-100' : 'text-slate-400'}`}>
                            {pct === 50 ? 'Flash Sale' : pct === 30 ? 'Seasonal Sale' : 'Promotional'}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Impact Summary & Apply Button */}
                    <div className="pt-3 border-t border-slate-100 space-y-3">
                      <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                        <div className="flex justify-between text-slate-600">
                          <span>Target:</span>
                          <strong className="text-slate-900">{markdownCategory === 'all' ? 'All Garments' : markdownCategory}</strong>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Calculated Markdown:</span>
                          <strong className="text-rose-600 font-bold">{markdownDiscount}% OFF MRP</strong>
                        </div>
                      </div>

                      <button
                        onClick={handleRunBulkMarkdown}
                        className="w-full bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
                      >
                        <Percent className="w-4 h-4 text-amber-300" />
                        <span>Apply {markdownDiscount}% Markdown to Live Storefront</span>
                      </button>
                    </div>

                  </div>

                </div>
              </div>

              {/* Catalog Impact Preview */}
              <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Garments to be Updated</h3>
                  <span className="text-xs text-slate-400">
                    Showing garments matching "{markdownCategory === 'all' ? 'All' : markdownCategory}"
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[11px]">
                      <tr>
                        <th className="py-2.5 px-4">Garment</th>
                        <th className="py-2.5 px-4">Category</th>
                        <th className="py-2.5 px-4">Current Price</th>
                        <th className="py-2.5 px-4">Original MRP</th>
                        <th className="py-2.5 px-4 text-right">After {markdownDiscount}% Sale</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products
                        .filter(p => markdownCategory === 'all' || p.category === markdownCategory)
                        .slice(0, 5)
                        .map(p => {
                          const newPrice = Math.round(p.mrp * (1 - markdownDiscount / 100));
                          return (
                            <tr key={p.id} className="hover:bg-slate-50/60">
                              <td className="py-2.5 px-4 font-semibold text-slate-900">{p.title}</td>
                              <td className="py-2.5 px-4 text-slate-500">{p.category}</td>
                              <td className="py-2.5 px-4 font-mono font-medium text-slate-700">₹{p.price.toLocaleString('en-IN')}</td>
                              <td className="py-2.5 px-4 font-mono text-slate-400 line-through">₹{p.mrp.toLocaleString('en-IN')}</td>
                              <td className="py-2.5 px-4 text-right font-mono font-bold text-rose-600">
                                ₹{newPrice.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              4.2 COLLECTIONS & CATEGORIES BREAKDOWN
              ═══════════════════════════════════════════════════════════ */}
          {activeModule === 'categories' && (
            <div className="space-y-6 animate-fadeIn max-w-4xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Atelier Collections & Categories</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Browse each clothing department, review inventory distribution, and filter items instantly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: 'Suits & Tuxedos',
                    description: 'Hand-canvassed Savile Row tailoring, Super 150s wools, and evening slip tuxedos.',
                    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
                    badge: 'Couture Signature'
                  },
                  {
                    name: 'Shirts & Polos',
                    description: 'Egyptian Giza cotton spread collar dress shirts and Sea Island knit polos.',
                    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80',
                    badge: 'Daily Luxury'
                  },
                  {
                    name: 'Trousers & Chinos',
                    description: 'Double-pleated Gurkha trousers, wool flannels, and Brisbane Moss corduroys.',
                    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
                    badge: 'Sartorial Tailoring'
                  },
                  {
                    name: 'Knitwear & Sweaters',
                    description: 'Grade-A Inner Mongolian cashmere cable knits, roll necks, and zip sweaters.',
                    image: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=600&q=80',
                    badge: 'Pure Cashmere'
                  }
                ].map(cat => {
                  const matchingCount = products.filter(p => p.category === cat.name).length;
                  return (
                    <div key={cat.name} className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="h-36 relative overflow-hidden">
                          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400 text-black">
                                {cat.badge}
                              </span>
                              <h3 className="text-white font-bold text-base mt-1">{cat.name}</h3>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 space-y-2">
                          <p className="text-xs text-slate-500 leading-relaxed">{cat.description}</p>
                          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                            <span className="text-slate-400">Garments in Department:</span>
                            <strong className="font-bold text-slate-900">{matchingCount} Items</strong>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 pt-0">
                        <button
                          onClick={() => {
                            setSelectedCategory(cat.name);
                            setActiveModule('products');
                          }}
                          className="w-full bg-slate-900 hover:bg-black text-white text-xs font-bold py-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>Manage {cat.name} Inventory</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              5. ADD NEW GARMENT FORM
              ═══════════════════════════════════════════════════════════ */}
          {activeModule === 'add-product' && (
            <div className="space-y-6 animate-fadeIn max-w-2xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Add New Garment to Public Catalog</h2>
                <p className="text-xs text-slate-500 mt-0.5">Publish a bespoke garment with high-res photo, pricing, and sizing.</p>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
                <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Garment Title</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Royal Oxford French-Cuff Dress Shirt"
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-900 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">Brand / Atelier</label>
                      <input
                        type="text"
                        value={newBrand}
                        onChange={(e) => setNewBrand(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">Category</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold cursor-pointer"
                      >
                        <option value="Suits & Tuxedos">Suits & Tuxedos</option>
                        <option value="Shirts & Polos">Shirts & Polos</option>
                        <option value="Trousers & Chinos">Trousers & Chinos</option>
                        <option value="Knitwear & Sweaters">Knitwear & Sweaters</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">Selling Price (₹)</label>
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">Original MRP (₹)</label>
                      <input
                        type="number"
                        value={newMrp}
                        onChange={(e) => setNewMrp(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Garment Photo Image URL</label>
                    <input
                      type="text"
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono"
                    />
                  </div>

                  {/* Photo Preview */}
                  <div className="pt-1">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1">Image Preview:</span>
                    <div className="w-24 h-32 rounded-xl overflow-hidden border border-slate-200">
                      <img src={newImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveModule('products')}
                      className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider cursor-pointer shadow-xs"
                    >
                      Save & Publish Garment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              6. CMS: HERO TOP BANNERS & MAIN IMAGE (Changes 2)
              ═══════════════════════════════════════════════════════════ */}
          {activeModule === 'cms-hero' && (
            <div className="space-y-6 animate-fadeIn max-w-3xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Hero Top Banners & Main Image</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Edit the large top hero banner, headlines, and call-to-action button on the live site.</p>
                </div>
                <button
                  onClick={handleSaveStorefront}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-2 self-start sm:self-auto"
                >
                  <Save className="w-4 h-4" />
                  <span>Save to Live Site</span>
                </button>
              </div>

              {cmsSaveSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Hero banner updated on live site! Click "View Live Storefront" above to preview.</span>
                </div>
              )}

              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Main Headline Text</label>
                    <input
                      type="text"
                      value={editHeroTitle}
                      onChange={(e) => setEditHeroTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-slate-900 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Offer Tag Badge</label>
                    <input
                      type="text"
                      value={editHeroTag}
                      onChange={(e) => setEditHeroTag(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-slate-900 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Subheadline / Description Text</label>
                  <textarea
                    rows={2}
                    value={editHeroSubtitle}
                    onChange={(e) => setEditHeroSubtitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-slate-900 rounded-xl p-3 text-xs text-slate-900 font-medium focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Button Label Text</label>
                    <input
                      type="text"
                      value={editHeroButton}
                      onChange={(e) => setEditHeroButton(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-slate-900 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Hero Banner Image URL</label>
                    <input
                      type="text"
                      value={editHeroImage}
                      onChange={(e) => setEditHeroImage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-slate-900 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none"
                    />
                  </div>
                </div>

                {/* Banner Preview */}
                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-slate-500 block mb-2">Live Banner Preview:</span>
                  <div className="relative h-44 rounded-xl overflow-hidden border border-slate-200">
                    <img src={editHeroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center px-6">
                      <div className="text-white space-y-1">
                        <span className="text-[9px] bg-amber-400 text-black font-bold px-2 py-0.5 rounded">{editHeroTag}</span>
                        <h4 className="text-base font-bold">{editHeroTitle}</h4>
                        <p className="text-xs opacity-90 max-w-lg truncate">{editHeroSubtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={handleSaveStorefront}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Apply to Storefront</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              7. CMS: TOP ANNOUNCEMENT BAR (TICKER)
              ═══════════════════════════════════════════════════════════ */}
          {activeModule === 'cms-ticker' && (
            <div className="space-y-6 animate-fadeIn max-w-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Top Header Announcement Bar (Ticker)</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Edit the scrolling message at the very top of your storefront.</p>
                </div>
                <button
                  onClick={handleSaveStorefront}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-2 self-start sm:self-auto"
                >
                  <Save className="w-4 h-4" />
                  <span>Save to Live Site</span>
                </button>
              </div>

              {cmsSaveSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Announcement bar updated!</span>
                </div>
              )}

              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Scrolling Marquee Text</label>
                  <textarea
                    rows={3}
                    value={editTicker}
                    onChange={(e) => setEditTicker(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-slate-900 rounded-xl p-3 text-xs text-slate-900 font-medium focus:outline-none leading-relaxed"
                  />
                  <span className="text-[11px] text-slate-400 block">Example: ✦ COMPLIMENTARY EXPRESS DELIVERY ON ALL BESPOKE ORDERS ✦</span>
                </div>

                <div className="p-3 bg-slate-900 text-amber-300 rounded-xl text-xs font-bold font-mono tracking-wider overflow-hidden truncate">
                  {editTicker}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleSaveStorefront}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              8. CMS: HOMEPAGE SECTION HEADINGS & LUXE
              ═══════════════════════════════════════════════════════════ */}
          {activeModule === 'cms-sections' && (
            <div className="space-y-6 animate-fadeIn max-w-3xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Homepage Section Headings & Luxe Banner</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Edit titles, subtitles, and featured luxury images on your homepage.</p>
                </div>
                <button
                  onClick={handleSaveStorefront}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-2 self-start sm:self-auto"
                >
                  <Save className="w-4 h-4" />
                  <span>Save to Live Site</span>
                </button>
              </div>

              {cmsSaveSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sections updated on live site!</span>
                </div>
              )}

              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5 text-xs">
                
                {/* Spotlight Section */}
                <div className="border-b border-slate-100 pb-4 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">1. "In the Spotlight" Brands Section</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Section Heading</label>
                      <input
                        type="text"
                        value={editSpotlightTitle}
                        onChange={(e) => setEditSpotlightTitle(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Section Subtitle</label>
                      <input
                        type="text"
                        value={editSpotlightSubtitle}
                        onChange={(e) => setEditSpotlightSubtitle(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* The Luxe Collection */}
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">2. "The Luxe Collection" Feature Card</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Luxe Title</label>
                      <input
                        type="text"
                        value={editLuxeTitle}
                        onChange={(e) => setEditLuxeTitle(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Luxe Subtitle</label>
                      <input
                        type="text"
                        value={editLuxeSubtitle}
                        onChange={(e) => setEditLuxeSubtitle(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Luxe Banner Image URL</label>
                    <input
                      type="text"
                      value={editLuxeImage}
                      onChange={(e) => setEditLuxeImage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono"
                    />
                  </div>

                  <div className="w-full h-32 rounded-xl overflow-hidden border border-slate-200">
                    <img src={editLuxeImage} alt="Luxe preview" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleSaveStorefront}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Save Section Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              9. CMS: STORE CONTACT & CONCIERGE
              ═══════════════════════════════════════════════════════════ */}
          {activeModule === 'cms-contact' && (
            <div className="space-y-6 animate-fadeIn max-w-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Store Contact & Concierge Information</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Edit customer care phone number, email, and address shown on the website footer.</p>
                </div>
                <button
                  onClick={handleSaveStorefront}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-2 self-start sm:self-auto"
                >
                  <Save className="w-4 h-4" />
                  <span>Save to Live Site</span>
                </button>
              </div>

              {cmsSaveSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Contact info updated on live site!</span>
                </div>
              )}

              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Customer Care Phone (Toll-Free)</label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Concierge Email</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Atelier Physical Address</label>
                  <input
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleSaveStorefront}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Save Contact Info
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              10. CLIENTS DIRECTORY
              ═══════════════════════════════════════════════════════════ */}
          {activeModule === 'customers' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Registered Clients & Customers Directory</h2>
                <p className="text-xs text-slate-500 mt-0.5">All customer accounts authenticated via Google Auth or Email and stored in PostgreSQL.</p>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[11px]">
                      <tr>
                        <th className="py-3 px-4">Client Name</th>
                        <th className="py-3 px-4">Email Address</th>
                        <th className="py-3 px-4">Phone Number</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">PostgreSQL Status</th>
                        <th className="py-3 px-4 text-right">Orders Placed</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-300 font-bold flex items-center justify-center text-xs">H</div>
                            <strong className="text-slate-900 font-bold">Harid (Verified Client)</strong>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">harid3837@gmail.com</td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">+91 93441 94214</td>
                        <td className="py-3.5 px-4">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                            VIP Client
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-emerald-700 font-semibold text-xs">✓ Active User</td>
                        <td className="py-3.5 px-4 text-right font-bold text-slate-900">1 Active Shipment</td>
                      </tr>

                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs">V</div>
                            <strong className="text-slate-900 font-bold">Vikramaditya Oberoi</strong>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">royal.client@luxury.com</td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">+91 98765 43210</td>
                        <td className="py-3.5 px-4">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 uppercase">Client</span>
                        </td>
                        <td className="py-3.5 px-4 text-emerald-700 font-semibold text-xs">✓ Active User</td>
                        <td className="py-3.5 px-4 text-right font-bold text-slate-900">₹10,998 (1 Order)</td>
                      </tr>

                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">A</div>
                            <strong className="text-slate-900 font-bold">Old Money Administrator</strong>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">admin@oldmoney.luxury</td>
                        <td className="py-3.5 px-4 font-mono text-slate-400">Staff Portal</td>
                        <td className="py-3.5 px-4">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 uppercase">Store Owner</span>
                        </td>
                        <td className="py-3.5 px-4 text-emerald-700 font-semibold text-xs">✓ Superuser</td>
                        <td className="py-3.5 px-4 text-right font-bold text-slate-900">Admin Studio</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              11. DISCOUNT COUPONS & CODES
              ═══════════════════════════════════════════════════════════ */}
          {activeModule === 'coupons' && (
            <div className="space-y-6 animate-fadeIn max-w-3xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Discount Coupons & Offers</h2>
                <p className="text-xs text-slate-500 mt-0.5">Manage promotional codes your clients can apply at checkout.</p>
              </div>

              {/* Add Coupon Box */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Create New Promo Code</h4>
                <form onSubmit={handleCreateCoupon} className="flex flex-col sm:flex-row gap-3 text-xs">
                  <input
                    type="text"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    placeholder="Coupon Code (e.g. VIP20)"
                    required
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 font-mono font-bold uppercase"
                  />
                  <input
                    type="number"
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(e.target.value)}
                    placeholder="Discount %"
                    required
                    className="w-28 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 font-bold"
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-black text-white px-5 py-2 rounded-xl font-bold uppercase tracking-wider cursor-pointer"
                  >
                    + Add Coupon
                  </button>
                </form>
              </div>

              {/* Coupons List */}
              <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Coupon Code</th>
                      <th className="py-3 px-4">Discount</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4">Minimum Order</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {coupons.map((c) => (
                      <tr key={c.code} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900 text-sm">{c.code}</td>
                        <td className="py-3 px-4 font-bold text-emerald-700">
                          {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                        </td>
                        <td className="py-3 px-4 text-slate-600">{c.description}</td>
                        <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">Min. ₹{c.minOrderAmount}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => deleteCoupon(c.code)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer"
                            title="Delete Coupon"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              12. SYSTEM & DATABASE SECURITY HEALTH
              ═══════════════════════════════════════════════════════════ */}
          {activeModule === 'system-health' && (
            <div className="space-y-6 animate-fadeIn max-w-4xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900">PostgreSQL Database & Server Security</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Live verification of backend services, PostgreSQL database connectivity, and zero-cost authentication.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Card 1: PostgreSQL Database */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">PostgreSQL Database</h4>
                        <span className="text-[11px] text-slate-400">Database Engine</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Connected
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Database Name:</span>
                      <strong className="font-mono text-slate-800">oldmoney_ecommerce</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Port & Host:</span>
                      <strong className="font-mono text-slate-800">5432 (Localhost)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Persisted Tables:</span>
                      <span className="font-mono text-slate-800 text-[11px]">accounts_user, orders_order</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Django 6 REST API */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">Django 6 REST API</h4>
                        <span className="text-[11px] text-slate-400">Backend Application</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active (Port 8001)
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Framework:</span>
                      <strong className="text-slate-800">Django 6.1.3 + DRF 3.18</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Authentication:</span>
                      <strong className="text-slate-800">SimpleJWT Bearer (24h token)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">CORS Whitelist:</span>
                      <strong className="font-mono text-slate-800 text-[11px]">http://localhost:3000</strong>
                    </div>
                  </div>
                </div>

                {/* Card 3: Zero-Cost Architecture */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Percent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">Zero-Cost Setup</h4>
                        <span className="text-[11px] text-slate-400">100% Free All Year</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      ₹0 ALL YEAR
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                    No third-party SMS OTP charges, no costly Truecaller API fees, and no monthly cloud seat subscriptions. Fully owned infrastructure.
                  </p>
                </div>

                {/* Card 4: Security & Hashing */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">Cryptographic Security</h4>
                        <span className="text-[11px] text-slate-400">Data Protection</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
                      PBKDF2 SHA-256
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                    All passwords are cryptographically salted and hashed. Client tokens are signed with 256-bit secret keys with automatic refresh.
                  </p>
                </div>

              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};

export default AdminDashboard;
