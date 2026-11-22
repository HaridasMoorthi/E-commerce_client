import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Key,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Truck,
  User,
  Phone,
  Sparkles
} from 'lucide-react';
import { useECommerce } from '../context/ECommerceContext';

export const LoginPage: React.FC = () => {
  const {
    currentUser,
    loginAsAdmin,
    loginAsCustomer,
    logout,
    openAdmin,
    goHome
  } = useECommerce();

  const [authRole, setAuthRole] = useState<'admin' | 'customer'>('admin');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Customer state
  const [customerName, setCustomerName] = useState('Priya Sharma');
  const [customerPhone, setCustomerPhone] = useState('9876543210');

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsAdmin();
  };

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsCustomer(customerName, 'client@oldmoney.com');
    goHome();
  };

  // If user is already authenticated
  if (currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fff5f8] via-[#fff9fb] to-white flex items-center justify-center p-4 sm:p-6 font-sans">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-pink-100 p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-pink-50 border border-pink-200 text-[#fc2779] flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-7 h-7 text-[#fc2779]" />
          </div>

          <div>
            <span className="inline-block text-[10px] font-black uppercase tracking-widest text-[#fc2779] bg-pink-50 px-3 py-1 rounded-full border border-pink-200 mb-2">
              {currentUser.role === 'admin' ? 'Authenticated Administrator' : 'Verified Client'}
            </span>
            <h2 className="text-xl font-serif font-black text-gray-900 tracking-wide">
              {currentUser.name}
            </h2>
            <p className="text-xs text-gray-500 font-mono mt-1">{currentUser.email}</p>
          </div>

          <div className="space-y-3 pt-2">
            {currentUser.role === 'admin' && (
              <button
                onClick={openAdmin}
                className="w-full bg-[#fc2779] hover:bg-[#e0206b] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-lg shadow-md hover:shadow-lg shadow-pink-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-white" />
                <span>Go to Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={goHome}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Storefront</span>
            </button>

            <button
              onClick={logout}
              className="w-full text-xs text-rose-600 hover:text-rose-700 font-semibold py-2 transition-colors cursor-pointer"
            >
              Sign Out of Session
            </button>
          </div>

          <div className="pt-4 border-t border-pink-100 flex items-center justify-center gap-2 text-[10px] text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit Hardware Encrypted Terminal</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-sans">
      
      {/* 1. LEFT COLUMN: LUXURY WHITE & ROSE OPERATIONAL SHOWCASE (Desktop 45%) */}
      <div className="lg:w-5/12 bg-gradient-to-br from-[#fff4f7] via-[#fff9fa] to-white text-gray-900 p-8 lg:p-14 flex flex-col justify-between relative overflow-hidden border-r border-pink-100">
        
        {/* Soft Ambient Radiance */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Lockup */}
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/old-money-horizontal-dark.png"
              alt="OLD MONEY - Wear Your Legacy."
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </div>
        </div>

        {/* Narrative & Operations Overview */}
        <div className="relative z-10 py-10 lg:py-0 space-y-8 max-w-lg">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#fc2779] bg-pink-100/90 border border-pink-200 px-3 py-1 rounded-full shadow-xs">
              ENTERPRISE OPERATIONS TERMINAL
            </span>
            <h1 className="text-2xl lg:text-3xl font-serif font-black text-gray-900 mt-4 leading-tight">
              Sartorial Commerce & Operations.
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-3 font-normal leading-relaxed">
              Unified administration portal for real-time couture catalog management, direct price controls, flash sale engines, and express order fulfillment.
            </p>
          </div>

          {/* Operational Highlights in Clean White Cards */}
          <div className="space-y-3.5">
            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-pink-100/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-lg bg-pink-50 border border-pink-200 text-[#fc2779] flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                  Live Catalog & Price Governance
                </h4>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-normal">
                  Publish luxury dresses with 1-click presets and execute immediate in-table price modifications with auto discount calculation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-pink-100/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-lg bg-pink-50 border border-pink-200 text-[#fc2779] flex items-center justify-center flex-shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                  Bulk Sale & Offer Engine
                </h4>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-normal">
                  Launch sitewide flat % discounts across categories with automatic updates to hero banners and storefront pricing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-pink-100/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-lg bg-pink-50 border border-pink-200 text-[#fc2779] flex items-center justify-center flex-shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                  Priority Logistics & AWB Tracking
                </h4>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-normal">
                  Track orders through confirmation, packaging, and Blue Dart luxury air express dispatch.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 pt-6 border-t border-pink-100 flex items-center justify-between text-[11px] text-gray-500">
          <span>© 2026 Old Money Atelier.</span>
          <span className="font-mono text-[10px] text-[#fc2779] font-bold">v2.6.4-PROD</span>
        </div>
      </div>

      {/* 2. RIGHT COLUMN: ENTERPRISE SIGN-IN FORM (Desktop 55% - Crisp White) */}
      <div className="lg:w-7/12 flex flex-col justify-between p-6 sm:p-10 lg:p-16 bg-white min-h-[600px]">
        
        {/* Top Action Bar */}
        <div className="flex items-center justify-between pb-8">
          <button
            onClick={goHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-[#fc2779] transition-colors uppercase tracking-wider group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Storefront</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
              System Live & Encrypted
            </span>
          </div>
        </div>

        {/* Central Sign-In Container */}
        <div className="max-w-md w-full mx-auto my-auto space-y-6">
          
          {/* Header */}
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-pink-50 border border-pink-200 text-[#fc2779] flex items-center justify-center mb-1">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-serif font-black text-gray-900 tracking-tight">
              Enterprise Sign In
            </h2>
            <p className="text-xs text-gray-500">
              Please enter your authorized merchant credentials to access the Old Money Administration Studio.
            </p>
          </div>

          {/* Role Segmented Control Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setAuthRole('admin')}
              className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                authRole === 'admin'
                  ? 'bg-[#fc2779] text-white shadow-sm font-black'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Store Administrator</span>
            </button>
            <button
              onClick={() => setAuthRole('customer')}
              className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                authRole === 'customer'
                  ? 'bg-[#fc2779] text-white shadow-sm font-black'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Client Access</span>
            </button>
          </div>

          {/* Form Content */}
          {authRole === 'admin' ? (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              
              {/* Username Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                  Administrator ID / Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin or admin@oldmoney.com"
                    required
                    className="w-full bg-gray-50 hover:bg-white focus:bg-white border border-gray-300 rounded-lg pl-10 pr-3.5 py-3 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#fc2779] focus:border-transparent transition-all"
                  />
                </div>
                <p className="text-[10px] text-gray-400 font-mono">
                  Standard credentials: <span className="text-[#fc2779] font-bold">admin</span>
                </p>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                    Security Key / Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Default demo password is: admin123')}
                    className="text-[10px] font-semibold text-gray-500 hover:text-[#fc2779] cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Key className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="w-full bg-gray-50 hover:bg-white focus:bg-white border border-gray-300 rounded-lg pl-10 pr-10 py-3 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#fc2779] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
                    title={showPassword ? 'Hide Password' : 'Show Password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 font-mono">
                  Default password: <span className="text-[#fc2779] font-bold">admin123</span>
                </p>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-xs py-1">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-[#fc2779] focus:ring-[#fc2779]"
                  />
                  <span>Keep terminal session authenticated</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#fc2779] hover:bg-[#e0206b] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg shadow-md hover:shadow-lg shadow-pink-200 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <Lock className="w-4 h-4 text-white" />
                  <span>SIGN IN TO ADMIN STUDIO</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Quick Preset Login Pill */}
              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setUsername('admin');
                    setPassword('admin123');
                    loginAsAdmin();
                  }}
                  className="text-[11px] font-bold text-[#fc2779] hover:text-[#e0206b] transition-colors uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Instant 1-Click Merchant Access</span>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleCustomerSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                  Client Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-3.5 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#fc2779]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                  Registered Mobile / Email
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-3.5 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#fc2779]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#fc2779] hover:bg-[#e0206b] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg shadow-md hover:shadow-lg shadow-pink-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>CONTINUE AS VALUED CLIENT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Bottom Trust Indicators */}
        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>256-Bit TLS End-to-End Encryption</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Security Protocol</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Privacy Charter</span>
          </div>
        </div>

      </div>

    </div>
  );
};
