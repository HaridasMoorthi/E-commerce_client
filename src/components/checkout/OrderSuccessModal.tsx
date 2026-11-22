import React from 'react';
import { CheckCircle2, Truck, ArrowRight, Sparkles } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';

export const OrderSuccessModal: React.FC = () => {
  const { isOrderSuccessOpen, setIsOrderSuccessOpen, lastOrderDetails, goHome, openTracking } = useECommerce();

  if (!isOrderSuccessOpen || !lastOrderDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 p-6 text-center space-y-6">
        
        {/* Animated Checkmark */}
        <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Order Authorized & Confirmed
          </span>
          <h2 className="text-2xl font-serif font-bold text-gray-900">
            Thank you for choosing OLD MONEY.
          </h2>
          <p className="text-xs text-gray-500 font-serif italic">
            "Wear Your Legacy."
          </p>
          <p className="text-xs text-gray-500">
            Order Reference: <strong className="text-gray-900 font-mono">{lastOrderDetails.orderId}</strong>
          </p>
        </div>

        {/* Order Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-left text-xs space-y-2">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Estimated Delivery:</span>
            <span className="font-bold text-gray-900">{lastOrderDetails.estimatedDelivery}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Shipping To:</span>
            <span className="font-bold text-gray-900">{lastOrderDetails.address.fullName}, {lastOrderDetails.address.city}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Payment Mode:</span>
            <span className="font-bold text-emerald-600">{lastOrderDetails.paymentMethod}</span>
          </div>
          <div className="flex justify-between pt-1 font-bold text-sm text-gray-900">
            <span>Total Amount Paid:</span>
            <span className="text-amber-800">₹{lastOrderDetails.totalPaid.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              setIsOrderSuccessOpen(false);
              openTracking(lastOrderDetails.orderId);
            }}
            className="flex-1 bg-gray-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded shadow transition-colors flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4 text-amber-300" />
            <span>TRACK THIS SHIPMENT</span>
          </button>

          <button
            onClick={() => {
              setIsOrderSuccessOpen(false);
              goHome();
            }}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs uppercase tracking-wider py-3.5 rounded transition-colors flex items-center justify-center gap-2"
          >
            <span>CONTINUE SHOPPING</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
