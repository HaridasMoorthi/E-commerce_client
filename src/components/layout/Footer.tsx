import React from 'react';
import { ShieldCheck, RefreshCw, Truck, CreditCard, Mail, Phone, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';

export const Footer: React.FC = () => {
  const { openCategory, openTracking, currentUser, openLogin, storeContent } = useECommerce();

  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      {/* 4 Value Proposition Pillars */}
      <div className="border-b border-gray-100 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-900">100% Authentic</h5>
              <p className="text-[11px] text-gray-500">Handcrafted & certified luxury</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 flex-shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-900">15-Day Easy Returns</h5>
              <p className="text-[11px] text-gray-500">Doorstep exchange service</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-900">Free Express Delivery</h5>
              <p className="text-[11px] text-gray-500">On all orders above ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 flex-shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-900">Encrypted Payments</h5>
              <p className="text-[11px] text-gray-500">256-Bit SSL Secured Checkout</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Story & Newsletter */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/old-money-horizontal-dark.png"
                alt="OLD MONEY - Wear Your Legacy."
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-gray-600 leading-relaxed max-w-sm">
              OLD MONEY represents quintessential sartorial elegance, timeless heritage couture, and quietly luxurious craftsmanship for discerning connoisseurs.
            </p>
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-900 block mb-2">
                Join the Old Money Private Guild
              </span>
              <div className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs flex-1 focus:outline-none focus:border-gray-900"
                />
                <button className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded transition-colors uppercase tracking-wider">
                  JOIN
                </button>
              </div>
            </div>
          </div>

          {/* Menswear Collections */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-900">Menswear Atelier</h5>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><button onClick={() => openCategory('Suits & Tuxedos', 'men')} className="hover:text-black cursor-pointer">Suits & Tuxedos</button></li>
              <li><button onClick={() => openCategory('Shirts & Polos', 'men')} className="hover:text-black cursor-pointer">Shirts & Polos</button></li>
              <li><button onClick={() => openCategory('Trousers & Chinos', 'men')} className="hover:text-black cursor-pointer">Trousers & Chinos</button></li>
              <li><button onClick={() => openCategory('Knitwear & Sweaters', 'men')} className="hover:text-black cursor-pointer">Knitwear & Sweaters</button></li>
              <li><button onClick={() => openCategory('Suits & Tuxedos', 'men')} className="hover:text-amber-800 font-semibold cursor-pointer">Sartorial Bespoke</button></li>
            </ul>
          </div>

          {/* Customer Care & Live Tracking */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-900">Concierge & Orders</h5>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <button
                  onClick={() => openTracking()}
                  className="text-amber-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Live Order Tracking</span>
                </button>
              </li>
              <li className="hover:text-black cursor-pointer">Shipping & Dispatch Timelines</li>
              <li className="hover:text-black cursor-pointer">Return & Exchange Guidelines</li>
              <li className="hover:text-black cursor-pointer">Authenticity Guarantee</li>
              <li className="hover:text-black cursor-pointer">Privacy & Terms of Service</li>
              <li className="hover:text-black cursor-pointer">Contact Private Client Advisor</li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-900">Direct Contact</h5>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-900" />
                <span>{storeContent?.contactPhone || '+91 1800-267-4444 (Toll Free)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-900" />
                <span>{storeContent?.contactEmail || 'concierge@oldmoney.luxury'}</span>
              </div>
            </div>
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-900 block mb-2">Connect</span>
              <div className="flex items-center gap-3 text-gray-700">
                <Instagram className="w-5 h-5 hover:text-black cursor-pointer" />
                <Facebook className="w-5 h-5 hover:text-black cursor-pointer" />
                <Twitter className="w-5 h-5 hover:text-black cursor-pointer" />
                <Youtube className="w-5 h-5 hover:text-black cursor-pointer" />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 OLD MONEY. Wear Your Legacy. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-[11px] font-semibold text-gray-600">
            <span>Visa</span>
            <span>MasterCard</span>
            <span>American Express</span>
            <span>UPI Instant</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
