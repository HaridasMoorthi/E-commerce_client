import React, { useState } from 'react';
import { MapPin, CheckCircle2, Truck, RefreshCw } from 'lucide-react';

export const PincodeChecker: React.FC = () => {
  const [pincode, setPincode] = useState('110001');
  const [checkedPincode, setCheckedPincode] = useState('110001');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6) {
      setIsLoading(true);
      setTimeout(() => {
        setCheckedPincode(pincode);
        setIsLoading(false);
      }, 400);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-amber-700" />
          <span>Delivery & Service Options</span>
        </div>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter 6-digit Pincode"
          className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs font-semibold flex-1 focus:outline-none focus:border-gray-900"
        />
        <button
          type="submit"
          disabled={pincode.length !== 6 || isLoading}
          className="bg-gray-900 text-white hover:bg-black disabled:bg-gray-300 text-xs font-bold px-4 py-1.5 rounded transition-colors"
        >
          {isLoading ? 'Checking...' : 'CHECK'}
        </button>
      </form>

      {checkedPincode && (
        <div className="space-y-2 pt-2 border-t border-gray-200 text-xs">
          <div className="flex items-start gap-2 text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Standard Delivery by Thursday, 28 Nov</span>
              <p className="text-[11px] text-gray-500">Free delivery for orders above ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-700 text-[11px]">
            <Truck className="w-3.5 h-3.5 text-gray-500" />
            <span>Cash on Delivery (COD) available for Pincode {checkedPincode}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700 text-[11px]">
            <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
            <span>15-Day Hassle-free Returns & Exchanges</span>
          </div>
        </div>
      )}
    </div>
  );
};
