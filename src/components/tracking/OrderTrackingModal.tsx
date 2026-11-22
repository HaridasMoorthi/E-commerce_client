import React, { useState } from 'react';
import { X, Search, CheckCircle2, PackageCheck, Truck, Clock, MapPin, ShieldCheck, Phone, ArrowRight } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';

export const OrderTrackingModal: React.FC = () => {
  const { isTrackingOpen, setIsTrackingOpen, activeTrackingId, lastOrderDetails } = useECommerce();
  const [searchId, setSearchId] = useState(activeTrackingId || 'OM-842910');
  const [currentOrder, setCurrentOrder] = useState<string>(activeTrackingId || 'OM-842910');

  if (!isTrackingOpen) return null;

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      setCurrentOrder(searchId.trim().toUpperCase());
    }
  };

  const milestones = [
    {
      title: 'Order Placed & Verified',
      date: 'Today, 10:24 AM',
      description: 'Your order was securely placed and payment was authorized.',
      completed: true,
      current: false,
      icon: CheckCircle2
    },
    {
      title: 'Quality Checked & Packed',
      date: 'Today, 01:15 PM',
      description: 'Items inspected by our master tailors and sealed in luxury Old Money garment packaging.',
      completed: true,
      current: false,
      icon: PackageCheck
    },
    {
      title: 'Dispatched from Heritage Hub',
      date: 'Today, 04:30 PM',
      description: 'Handed over to Old Money Priority Express (AWB: OM-948210384).',
      completed: true,
      current: true,
      icon: Truck
    },
    {
      title: 'Out for Delivery',
      date: 'Estimated Thursday, 02:00 PM',
      description: 'Courier representative will reach your designated address.',
      completed: false,
      current: false,
      icon: Clock
    },
    {
      title: 'Delivered & Handed Over',
      date: 'Pending Delivery',
      description: 'Signature verification required upon arrival.',
      completed: false,
      current: false,
      icon: MapPin
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <img src="/om-monogram-dark-clean.png" alt="Old Money" className="h-6 w-auto object-contain" />
            <div>
              <h2 className="font-bold text-sm sm:text-base text-gray-900 uppercase tracking-wider">
                Live Shipment Tracking
              </h2>
              <p className="text-[11px] text-gray-500">
                Track your curated Old Money ensembles in real-time
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search / Lookup input */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <form onSubmit={handleTrackSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                placeholder="Enter Order ID (e.g. OM-842910)"
                className="w-full bg-white border border-gray-300 rounded pl-9 pr-3 py-2 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-gray-900"
              />
            </div>
            <button
              type="submit"
              className="bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded transition-colors"
            >
              TRACK
            </button>
          </form>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Order Status Banner */}
          <div className="bg-[#1e1e24] text-white p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                  IN TRANSIT
                </span>
                <span className="text-xs text-gray-400">Order #{currentOrder}</span>
              </div>
              <h3 className="text-base font-serif font-bold text-white mt-1">
                Estimated Delivery: Thursday, 28th Nov
              </h3>
              <p className="text-[11px] text-gray-300">
                Carrier: <strong className="text-white">Blue Dart Priority Air Express</strong> &bull; AWB: <span className="font-mono text-amber-200">OM-948210384</span>
              </p>
            </div>

            <div className="text-right sm:border-l sm:border-gray-700 sm:pl-4">
              <span className="text-[11px] text-gray-400 block">Shipping To</span>
              <span className="text-xs font-bold text-white block">
                {lastOrderDetails ? `${lastOrderDetails.address.fullName}, ${lastOrderDetails.address.city}` : 'Priya Sharma, New Delhi'}
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
              Shipment Milestones
            </h4>

            <div className="relative pl-6 space-y-6 border-l-2 border-gray-200 ml-3">
              {milestones.map((m, idx) => {
                const IconComponent = m.icon;
                return (
                  <div key={idx} className="relative group">
                    {/* Circle icon on the line */}
                    <div
                      className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                        m.completed
                          ? 'bg-gray-900 border-gray-900 text-white'
                          : m.current
                          ? 'bg-amber-500 border-amber-600 text-white animate-pulse'
                          : 'bg-white border-gray-300 text-gray-300'
                      }`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>

                    {/* Step details */}
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold ${
                            m.completed ? 'text-gray-900' : m.current ? 'text-amber-800' : 'text-gray-400'
                          }`}
                        >
                          {m.title}
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium">
                          {m.date}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {m.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer Service / Help */}
          <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-gray-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Need help or delivery rescheduling?</span>
            </div>
            <a
              href="tel:18002674444"
              className="font-bold text-gray-900 hover:text-black flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-gray-700" />
              <span>Call Concierge</span>
            </a>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
          <button
            onClick={() => setIsTrackingOpen(false)}
            className="bg-gray-900 text-white text-xs font-bold uppercase tracking-wider px-6 py-2 rounded hover:bg-black transition-colors"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
};
