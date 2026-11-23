import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  CheckCircle2,
  PackageCheck,
  Truck,
  Clock,
  MapPin,
  ShieldCheck,
  Phone,
  Copy,
  Check,
  ShoppingBag,
  Lock,
  Package,
  Calendar,
  ChevronRight,
  ExternalLink,
  CreditCard,
  Sparkles
} from 'lucide-react';
import { useECommerce, AdminOrder } from '../context/ECommerceContext';
import { apiTrackOrder } from '../services/backendApi';

export const TrackingPage: React.FC = () => {
  const {
    activeTrackingId,
    lastOrderDetails,
    adminOrders,
    currentUser,
    customerOrders,
    openLogin,
    goHome,
    openAdmin,
    loginAsCustomer,
    loginAsAdmin
  } = useECommerce();

  // Search input and currently selected order ID
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  const [copiedAWB, setCopiedAWB] = useState<boolean>(false);
  const [remoteOrder, setRemoteOrder] = useState<AdminOrder | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'mine'>('all');

  // Compute available orders list
  const availableOrders = useMemo(() => {
    // If last order details exist, synthesize it as an order
    const synthesizedLastOrder: AdminOrder | null = lastOrderDetails ? {
      id: lastOrderDetails.orderId,
      customerName: lastOrderDetails.address.fullName,
      phone: lastOrderDetails.address.phone,
      email: lastOrderDetails.address.email || 'customer@oldmoney.luxury',
      address: lastOrderDetails.address.street,
      city: lastOrderDetails.address.city,
      pincode: lastOrderDetails.address.pincode,
      itemsCount: lastOrderDetails.items.length,
      items: lastOrderDetails.items.map((i: any) => ({
        product: i.product,
        selectedSize: i.selectedSize,
        selectedColor: i.selectedColor,
        quantity: i.quantity
      })),
      totalAmount: lastOrderDetails.totalPaid,
      paymentMode: lastOrderDetails.paymentMethod,
      status: 'CONFIRMED',
      awbNumber: 'OM-948210384',
      carrier: 'Blue Dart Priority Air Express',
      date: 'Today'
    } : null;

    let baseList = [...adminOrders];
    if (synthesizedLastOrder && !baseList.some(o => o.id === synthesizedLastOrder.id)) {
      baseList = [synthesizedLastOrder, ...baseList];
    }

    if (currentUser?.role === 'customer' && customerOrders.length > 0) {
      customerOrders.forEach(co => {
        if (!baseList.some(o => o.id === co.id)) {
          baseList.push(co);
        }
      });
    }

    return baseList;
  }, [adminOrders, lastOrderDetails, customerOrders, currentUser]);

  // Filter orders by search query
  const filteredOrders = useMemo(() => {
    let list = availableOrders;
    if (currentUser?.role === 'customer' && activeTab === 'mine' && customerOrders.length > 0) {
      list = list.filter(o =>
        customerOrders.some(co => co.id === o.id) ||
        (currentUser.email && o.email?.toLowerCase() === currentUser.email.toLowerCase()) ||
        (currentUser.phone && o.phone.includes(currentUser.phone))
      );
    }

    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;

    const digitsOnly = q.replace(/\D/g, '');
    return list.filter(o => {
      const matchId = o.id.toLowerCase().includes(q);
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchCity = o.city.toLowerCase().includes(q);
      const matchAWB = o.awbNumber?.toLowerCase().includes(q);
      const matchPhone = digitsOnly.length >= 4 && o.phone.replace(/\D/g, '').includes(digitsOnly);
      return matchId || matchName || matchCity || matchAWB || matchPhone;
    });
  }, [availableOrders, searchQuery, activeTab, currentUser, customerOrders]);

  // Set default selection
  useEffect(() => {
    if (activeTrackingId) {
      setSelectedOrderId(activeTrackingId);
    } else if (!selectedOrderId && filteredOrders.length > 0) {
      setSelectedOrderId(filteredOrders[0].id);
    }
  }, [activeTrackingId, filteredOrders, selectedOrderId]);

  // Query remote PostgreSQL backend if order isn't in local list
  useEffect(() => {
    if (selectedOrderId) {
      const localFound = availableOrders.find(o => o.id.toLowerCase() === selectedOrderId.toLowerCase());
      if (!localFound) {
        apiTrackOrder(selectedOrderId.trim())
          .then(res => {
            if (res.success && res.data) {
              setRemoteOrder({
                id: res.data.order_id,
                customerName: res.data.customer_name,
                phone: res.data.customer_phone,
                email: res.data.customer_email,
                address: res.data.street_address,
                city: res.data.city,
                pincode: res.data.pincode,
                itemsCount: (res.data.items || []).length,
                items: res.data.items || [],
                totalAmount: Number(res.data.total_amount),
                paymentMode: res.data.payment_mode,
                status: res.data.status,
                awbNumber: res.data.awb_number,
                carrier: res.data.carrier,
                date: 'Recent'
              });
            } else {
              setRemoteOrder(null);
            }
          })
          .catch(() => setRemoteOrder(null));
      } else {
        setRemoteOrder(null);
      }
    }
  }, [selectedOrderId, availableOrders]);

  // Active matched order
  const activeOrder: AdminOrder | null = useMemo(() => {
    if (!selectedOrderId) return filteredOrders[0] || null;
    const local = availableOrders.find(o => o.id.toLowerCase() === selectedOrderId.toLowerCase());
    return local || remoteOrder || filteredOrders[0] || null;
  }, [selectedOrderId, availableOrders, remoteOrder, filteredOrders]);

  const handleCopyAWB = (awb: string) => {
    navigator.clipboard.writeText(awb);
    setCopiedAWB(true);
    setTimeout(() => setCopiedAWB(false), 2000);
  };

  const getGarmentBadge = (title: string = '', category: string = '') => {
    const t = title.toLowerCase();
    const c = category.toLowerCase();
    if (t.includes('tuxedo') || (t.includes('suit') && !t.includes('swim'))) {
      return { label: 'SUPER 150s BESPOKE SUIT', color: 'bg-slate-100 text-slate-900 border-slate-300' };
    }
    if (t.includes('dinner jacket') || t.includes('velvet')) {
      return { label: 'SILK VELVET DINNER JACKET', color: 'bg-indigo-50 text-indigo-900 border-indigo-200' };
    }
    if (t.includes('chesterfield') || t.includes('overcoat')) {
      return { label: 'CASHMERE CHESTERFIELD', color: 'bg-amber-50 text-amber-900 border-amber-200' };
    }
    if (t.includes('shirt') && !t.includes('polo')) {
      return { label: 'EGYPTIAN GIZA SHIRT', color: 'bg-blue-50 text-blue-900 border-blue-200' };
    }
    if (t.includes('trouser') || t.includes('gurkha') || t.includes('flannel')) {
      return { label: 'GURKHA FLANNEL TROUSERS', color: 'bg-stone-100 text-stone-800 border-stone-300' };
    }
    if (t.includes('cashmere') || t.includes('sweater')) {
      return { label: 'MONGOLIAN CASHMERE KNIT', color: 'bg-amber-50 text-amber-800 border-amber-200' };
    }
    if (t.includes('loafer') || t.includes('shoe')) {
      return { label: 'GOODYEAR WELTED LEATHER', color: 'bg-rose-50 text-rose-900 border-rose-200' };
    }
    if (t.includes('polo')) {
      return { label: 'SILK-COTTON KNIT POLO', color: 'bg-sky-50 text-sky-900 border-sky-200' };
    }
    return { label: 'BESPOKE MENSWEAR', color: 'bg-slate-50 text-slate-700 border-slate-200' };
  };

  const getStatusInfo = (status: string = 'DISPATCHED') => {
    switch (status) {
      case 'DELIVERED':
        return {
          label: 'Delivered',
          badgeText: 'DELIVERED',
          color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
          step: 5
        };
      case 'DISPATCHED':
        return {
          label: 'In Transit',
          badgeText: 'IN TRANSIT (AIR EXPRESS)',
          color: 'bg-amber-50 text-amber-900 border-amber-200',
          dot: 'bg-amber-500 animate-pulse',
          step: 3
        };
      case 'PACKED':
        return {
          label: 'Atelier Packaging',
          badgeText: 'QUALITY CHECKED & PACKED',
          color: 'bg-purple-50 text-purple-900 border-purple-200',
          dot: 'bg-purple-500',
          step: 2
        };
      case 'CONFIRMED':
      case 'PLACED':
      default:
        return {
          label: 'Confirmed',
          badgeText: 'ORDER CONFIRMED',
          color: 'bg-blue-50 text-blue-900 border-blue-200',
          dot: 'bg-blue-500',
          step: 1
        };
    }
  };

  const statusInfo = getStatusInfo(activeOrder?.status);

  const milestones = [
    {
      title: 'Order Placed & Verified',
      date: 'Nov 22, 10:24 AM',
      description: `Payment authorized securely via ${activeOrder?.paymentMode || 'UPI Instant'}. Order logged in atelier queue.`,
      step: 1
    },
    {
      title: 'Atelier Quality Inspection & Dust Bag Packing',
      date: 'Nov 22, 01:15 PM',
      description: 'Hand-inspected by master tailors and enclosed in breathable Old Money signature garment bags.',
      step: 2
    },
    {
      title: 'Dispatched from Heritage Logistics Hub',
      date: 'Nov 22, 04:30 PM',
      description: `Entrusted to ${activeOrder?.carrier || 'Blue Dart Priority Air Express'}. Waybill: ${activeOrder?.awbNumber || 'OM-948210384'}.`,
      step: 3
    },
    {
      title: 'Out for Priority Delivery',
      date: statusInfo.step >= 5 ? 'Nov 23, 11:20 AM' : 'Estimated Tomorrow, 02:00 PM',
      description: 'Dispatched with authorized courier representative to your delivery residence.',
      step: 4
    },
    {
      title: 'Signature Delivery & Garment Handover',
      date: statusInfo.step >= 5 ? 'Nov 23, 01:45 PM' : 'Pending Handover',
      description: 'Contactless signature verification required upon garment handover.',
      step: 5
    }
  ];

  // GATEWAY GUARD: ONLY LOGGED IN CLIENTS & ADMINS CAN VIEW THE LIVE TRACKER
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans pb-20">
        {/* Top Breadcrumb */}
        <div className="bg-white/95 backdrop-blur-md border-b border-stone-200/80 sticky top-18 z-30 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <button
              onClick={goHome}
              className="inline-flex items-center gap-1.5 text-xs text-stone-700 hover:text-black font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Storefront</span>
            </button>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">
              Live Shipment Tracking
            </span>
          </div>
        </div>

        {/* Private Client & Store Security Gateway */}
        <div className="max-w-xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20">
          <div className="bg-white border border-stone-200/90 rounded-2xl p-8 sm:p-12 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center mx-auto text-stone-800 shadow-xs">
              <Lock className="w-8 h-8 text-stone-700" />
            </div>

            <div className="space-y-2">
              <span className="inline-block text-[10px] font-bold tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase">
                Client Privacy &amp; Order Security
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 tracking-tight">
                Sign In to View Shipment Tracker
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-md mx-auto">
                For confidential atelier delivery tracking, milestone inspections, and live GPS waybills, please sign in with your verified client or store administrator account.
              </p>
            </div>

            {/* Direct Sign In Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={openLogin}
                className="w-full bg-stone-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sign In with Google or Email</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* 1-Click Fast Access Buttons for immediate testing */}
              <div className="pt-4 border-t border-stone-100 space-y-2">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  1-Click Quick Demo Sign In
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => loginAsCustomer('Harid (Verified Client)', '+91 98765 43210', 'harid3837@gmail.com')}
                    className="p-2.5 rounded-lg border border-stone-200 hover:border-stone-900 bg-stone-50 hover:bg-stone-100 font-semibold text-stone-800 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Client: Harid</span>
                  </button>
                  <button
                    onClick={loginAsAdmin}
                    className="p-2.5 rounded-lg border border-stone-200 hover:border-stone-900 bg-stone-50 hover:bg-stone-100 font-semibold text-stone-800 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Store Admin</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-stone-400">
              Orders and tracking waybills are isolated to verified authenticated sessions.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans pb-20">
      
      {/* Refined Top Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-stone-200/80 sticky top-18 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs text-stone-500">
            <button
              onClick={goHome}
              className="inline-flex items-center gap-1.5 text-stone-700 hover:text-black font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Storefront</span>
            </button>
            <span className="text-stone-300">/</span>
            <span className="text-stone-900 font-bold uppercase tracking-wider text-[11px]">
              Live Shipment Tracking
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              REAL-TIME GPS DISPATCH
            </span>
            {currentUser?.role === 'admin' && (
              <button
                onClick={openAdmin}
                className="text-xs bg-stone-900 text-amber-300 font-semibold px-3 py-1 rounded-lg hover:bg-black transition-colors cursor-pointer"
              >
                Admin Studio &rarr;
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Header Hero Section: Elegant Luxury Typography */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <img
                  src="/om-monogram-dark-clean.png"
                  alt="Old Money"
                  className="h-6 w-auto object-contain"
                />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-stone-500">
                  Concierge Logistics &amp; Milestones
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-stone-900 tracking-tight">
                Live Shipment Tracking
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-1.5 max-w-2xl leading-relaxed">
                Monitor real-time air waybill dispatch, milestone inspection stages, and direct carrier handover for all your curated Old Money bespoke suits, dinner tuxedos, and tailored menswear.
              </p>
            </div>

            {/* User Session Status */}
            {currentUser ? (
              <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 text-xs flex items-center gap-3.5 shrink-0">
                <div className="w-10 h-10 rounded-full bg-stone-900 text-amber-200 font-bold flex items-center justify-center text-sm shadow-xs">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-stone-900 truncate max-w-[180px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 bg-stone-200/70 text-stone-700 rounded">
                      {currentUser.role}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 truncate block max-w-[180px] font-mono mt-0.5">
                    {currentUser.email || currentUser.phone}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={openLogin}
                  className="bg-stone-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-amber-300" />
                  <span>Sign In (1-Click Google / Email)</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MASTER-DETAIL SPLIT LAYOUT: ORDER SELECTOR LIST (LEFT) + DETAILED TRACKING DOSSIER (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: ORDER SELECTION & ATELIER PIPELINE LIST (5 Cols) */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Order Selector Card */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs space-y-4">
              
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <h2 className="font-serif text-lg text-stone-900 font-normal">
                    Atelier Deliveries
                  </h2>
                  <p className="text-[11px] text-stone-500">
                    Select any order to track separately
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                  {filteredOrders.length} {filteredOrders.length === 1 ? 'Order' : 'Orders'}
                </span>
              </div>

              {/* Instant Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Order ID, recipient, or city..."
                  className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-stone-900 rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-medium text-stone-800 placeholder-stone-400 focus:outline-none transition-colors"
                />
              </div>

              {/* Client / All Tabs (if logged in as customer or admin) */}
              {currentUser?.role === 'customer' && customerOrders.length > 0 && (
                <div className="flex rounded-lg bg-stone-100 p-0.5 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('mine')}
                    className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                      activeTab === 'mine' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    My Orders ({customerOrders.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                      activeTab === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    All Atelier ({availableOrders.length})
                  </button>
                </div>
              )}

              {/* ORDER SELECTION LIST */}
              <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-8 text-stone-400 text-xs space-y-1">
                    <p className="font-semibold text-stone-600">No matching orders found</p>
                    <p>Try searching with another Order ID or clear the search.</p>
                  </div>
                ) : (
                  filteredOrders.map((order) => {
                    const isSelected = activeOrder?.id === order.id;
                    const st = getStatusInfo(order.status);
                    const firstItem = order.items?.[0];
                    const secondItem = order.items?.[1];

                    return (
                      <div
                        key={order.id}
                        onClick={() => setSelectedOrderId(order.id)}
                        className={`group relative p-4 rounded-xl border transition-all cursor-pointer text-left ${
                          isSelected
                            ? 'bg-amber-50/40 border-stone-900 ring-1 ring-stone-900 shadow-sm'
                            : 'bg-white border-stone-200/90 hover:border-stone-400 hover:bg-stone-50/50'
                        }`}
                      >
                        {/* Selected Indicator Pill */}
                        {isSelected && (
                          <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold text-stone-900 uppercase tracking-widest bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300/60">
                            <span>Viewing</span>
                          </div>
                        )}

                        {/* Top: ID + Status */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="font-mono text-xs font-bold text-stone-900">
                            #{order.id}
                          </span>
                          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${st.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`}></span>
                            <span>{st.label}</span>
                          </span>
                        </div>

                        {/* Recipient & City */}
                        <div className="text-xs font-semibold text-stone-800">
                          {order.customerName}
                          <span className="text-stone-400 font-normal"> &bull; {order.city}</span>
                        </div>

                        {/* Garment Thumbnails & Preview */}
                        <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-stone-100">
                          <div className="flex -space-x-2 shrink-0">
                            {firstItem && (
                              <img
                                src={firstItem.product?.images?.[0] || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&auto=format&fit=crop&q=80'}
                                alt="Garment"
                                className="w-8 h-10 object-cover rounded border border-white shadow-2xs"
                              />
                            )}
                            {secondItem && (
                              <img
                                src={secondItem.product?.images?.[0] || 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=200&auto=format&fit=crop&q=80'}
                                alt="Garment"
                                className="w-8 h-10 object-cover rounded border border-white shadow-2xs"
                              />
                            )}
                          </div>
                          
                          <div className="min-w-0 flex-1 text-[11px] text-stone-600 truncate">
                            {firstItem?.product?.title || 'Luxury Atelier Garment'}
                            {order.items?.length > 1 && (
                              <span className="text-stone-400 font-medium"> +{order.items.length - 1} more</span>
                            )}
                          </div>
                        </div>

                        {/* Bottom: Date & Total Price */}
                        <div className="flex items-center justify-between text-xs pt-2 mt-2 border-t border-stone-100 text-stone-500 font-medium">
                          <span>{order.date || 'Nov 2026'}</span>
                          <span className="font-bold text-stone-900">
                            ₹{order.totalAmount?.toLocaleString('en-IN')}
                          </span>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

            </div>

            {/* Quick Helper Note */}
            <div className="bg-stone-100/70 border border-stone-200/70 rounded-xl p-3.5 text-[11px] text-stone-600 flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Every order is tracked separately with its unique live Air Waybill and master tailoring verification.
              </span>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: LIVE SHIPMENT TRACKING DOSSIER (7 Cols) */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {activeOrder ? (
              <>
                {/* 1. ORDER HERO & LOGISTICS DETAILS CARD */}
                <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs space-y-5">
                  
                  {/* Status Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${statusInfo.color}`}>
                          {statusInfo.badgeText}
                        </span>
                        <span className="font-mono text-sm font-bold text-stone-900">
                          #{activeOrder.id}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 pt-0.5">
                        Placed on <strong className="text-stone-800">{activeOrder.date || 'Nov 22, 2026'}</strong> via{' '}
                        <strong className="text-stone-800">{activeOrder.paymentMode || 'UPI Instant'}</strong>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
                        Total Order Value
                      </span>
                      <span className="font-serif text-xl sm:text-2xl font-normal text-stone-900">
                        ₹{activeOrder.totalAmount?.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* 2-Column Courier & Recipient Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                    
                    {/* Carrier & AWB */}
                    <div className="space-y-1.5 bg-stone-50/70 p-3.5 rounded-xl border border-stone-200/70">
                      <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold block">
                        Courier Carrier &amp; Air Waybill
                      </span>
                      <div className="text-sm font-bold text-stone-900">
                        {activeOrder.carrier || 'Blue Dart Priority Air Express'}
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="font-mono text-xs font-semibold bg-white px-2.5 py-1 rounded border border-stone-200 text-stone-800 shadow-2xs">
                          {activeOrder.awbNumber || 'OM-948210384'}
                        </span>
                        <button
                          onClick={() => handleCopyAWB(activeOrder.awbNumber || 'OM-948210384')}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-600 hover:text-black bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded transition-colors cursor-pointer"
                          title="Copy Air Waybill"
                        >
                          {copiedAWB ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Recipient & Destination */}
                    <div className="space-y-1.5 bg-stone-50/70 p-3.5 rounded-xl border border-stone-200/70">
                      <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold block">
                        Recipient &amp; Delivery Destination
                      </span>
                      <div className="text-sm font-bold text-stone-900">
                        {activeOrder.customerName}
                      </div>
                      <div className="text-stone-600 text-[11px]">
                        {activeOrder.phone}
                      </div>
                      <div className="text-stone-500 text-[11px] leading-relaxed pt-0.5">
                        {activeOrder.address}, {activeOrder.city} {activeOrder.pincode ? `- ${activeOrder.pincode}` : ''}
                      </div>
                    </div>

                  </div>

                </div>

                {/* 2. SHIPMENT PROGRESS MILESTONES (ELEGANT TIMELINE) */}
                <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <h3 className="font-serif text-base text-stone-900 font-normal">
                      Shipment Milestones
                    </h3>
                    <span className="text-[11px] font-semibold text-stone-500">
                      Step {statusInfo.step} of 5 Completed
                    </span>
                  </div>

                  {/* Stepper Steps */}
                  <div className="relative pl-6 space-y-7 border-l-2 border-stone-200 ml-3">
                    {milestones.map((m) => {
                      const isPast = m.step < statusInfo.step;
                      const isCurrent = m.step === statusInfo.step;
                      const isFuture = m.step > statusInfo.step;

                      return (
                        <div key={m.step} className="relative group">
                          {/* Dot / Icon Indicator */}
                          <div
                            className={`absolute -left-[31px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                              isPast
                                ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs'
                                : isCurrent
                                ? 'bg-amber-500 border-amber-600 text-white animate-pulse'
                                : 'bg-white border-stone-300 text-stone-300'
                            }`}
                          >
                            {isPast ? (
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            ) : isCurrent ? (
                              <span className="w-2 h-2 rounded-full bg-white"></span>
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-stone-300"></span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span
                                className={`text-xs font-bold ${
                                  isCurrent
                                    ? 'text-amber-900'
                                    : isPast
                                    ? 'text-stone-900'
                                    : 'text-stone-400'
                                }`}
                              >
                                {m.title}
                              </span>
                              <span className="text-[11px] text-stone-400 font-mono">
                                {m.date}
                              </span>
                            </div>
                            <p className="text-xs text-stone-500 leading-relaxed max-w-xl">
                              {m.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. ENSEMBLE LINE ITEMS (SHOWCASING OLD MONEY DRESSES & SUITING) */}
                <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <h3 className="font-serif text-base text-stone-900 font-normal flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-stone-700" />
                      <span>Garments in this Shipment ({activeOrder.items?.length || 1})</span>
                    </h3>
                    <span className="text-xs text-stone-500">
                      Total: <strong className="text-stone-900">₹{activeOrder.totalAmount?.toLocaleString('en-IN')}</strong>
                    </span>
                  </div>

                  <div className="space-y-3">
                    {activeOrder.items?.map((item: any, idx: number) => {
                      const badge = getGarmentBadge(item.product?.title, item.product?.category);
                      const garmentImg = item.product?.images?.[0] || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=85';

                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-4 p-3.5 rounded-xl border border-stone-200/80 bg-stone-50/40 hover:bg-stone-50 transition-all"
                        >
                          {/* Image */}
                          <div className="relative w-16 h-22 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200 shadow-2xs">
                            <img
                              src={garmentImg}
                              alt={item.product?.title || 'Luxury Garment'}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                                {item.product?.brand || 'RSVP ATELIER'}
                              </span>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${badge.color}`}>
                                {badge.label}
                              </span>
                            </div>

                            <h4 className="font-semibold text-sm text-stone-900 truncate">
                              {item.product?.title || 'The Ascot Mulberry Silk Bias-Cut Champagne Slip Dress'}
                            </h4>

                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
                              <span>Size: <strong className="text-stone-800 font-semibold">{item.selectedSize || 'M'}</strong></span>
                              <span>&bull;</span>
                              <span>Color: <strong className="text-stone-800 font-semibold">{item.selectedColor || 'Champagne Gold'}</strong></span>
                              <span>&bull;</span>
                              <span>Qty: <strong className="text-stone-800 font-semibold">{item.quantity || 1}</strong></span>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right flex-shrink-0">
                            <div className="font-serif text-sm font-semibold text-stone-900">
                              ₹{((item.product?.price || 7499) * (item.quantity || 1)).toLocaleString('en-IN')}
                            </div>
                            <span className="text-[10px] text-emerald-700 font-semibold block pt-0.5">
                              Included in Order
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. CONCIERGE ASSISTANCE & TAILORING LINE */}
                <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 block text-xs">
                        Need Custom Fitting, Alterations or Delivery Rescheduling?
                      </span>
                      <span className="text-stone-500 text-[11px]">
                        Direct priority line to our master tailoring concierge.
                      </span>
                    </div>
                  </div>

                  <a
                    href="tel:18002674444"
                    className="font-bold text-stone-900 flex items-center gap-2 bg-stone-100 hover:bg-stone-200 px-4 py-2.5 rounded-xl transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-2xs"
                  >
                    <Phone className="w-4 h-4 text-stone-700" />
                    <span>Call Concierge: 1800-267-4444</span>
                  </a>
                </div>

              </>
            ) : (
              <div className="bg-white border border-stone-200/90 rounded-2xl p-12 text-center shadow-xs space-y-4">
                <Package className="w-10 h-10 text-stone-300 mx-auto" />
                <h3 className="font-serif text-lg text-stone-900 font-normal">
                  No Order Selected
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Please select an order from the list on the left to inspect its live courier timeline and line items.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
