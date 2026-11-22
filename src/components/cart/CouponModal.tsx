import React, { useState } from 'react';
import { X, Tag, CheckCircle2 } from 'lucide-react';
import { COUPONS } from '../../data/coupons';
import { useECommerce } from '../../context/ECommerceContext';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CouponModal: React.FC<CouponModalProps> = ({ isOpen, onClose }) => {
  const { applyCoupon, appliedCoupon } = useECommerce();
  const [customCode, setCustomCode] = useState('');
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isOpen) return null;

  const handleApply = (code: string) => {
    const res = applyCoupon(code);
    if (res.success) {
      setMessage({ text: res.message });
      setTimeout(() => {
        onClose();
        setMessage(null);
      }, 700);
    } else {
      setMessage({ text: res.message, error: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-amber-700" />
            <h3 className="font-bold text-sm text-gray-900">Apply Privilege Voucher</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input box */}
        <div className="p-4 space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
              placeholder="ENTER PROMO CODE"
              className="bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs font-bold uppercase tracking-wider flex-1 focus:outline-none focus:border-gray-900"
            />
            <button
              onClick={() => handleApply(customCode)}
              disabled={!customCode.trim()}
              className="bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded hover:bg-black disabled:bg-gray-300 transition-colors uppercase tracking-wider"
            >
              APPLY
            </button>
          </div>

          {message && (
            <p className={`text-xs font-bold ${message.error ? 'text-red-500' : 'text-emerald-600'}`}>
              {message.text}
            </p>
          )}

          {/* Available Coupons list */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
              Available Privileges
            </span>
            {COUPONS.map((coupon) => {
              const isSelected = appliedCoupon?.code === coupon.code;
              return (
                <div
                  key={coupon.code}
                  className={`border rounded-lg p-3.5 transition-all flex items-center justify-between ${
                    isSelected ? 'border-amber-600 bg-amber-50/50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <span className="font-bold text-xs bg-gray-100 px-2 py-0.5 rounded border border-gray-300 tracking-wider">
                      {coupon.code}
                    </span>
                    <p className="text-xs text-gray-600 mt-1 font-medium">{coupon.description}</p>
                    <span className="text-[10px] text-gray-400">
                      Min. Order: ₹{coupon.minOrderAmount}
                    </span>
                  </div>

                  <button
                    onClick={() => handleApply(coupon.code)}
                    className="text-xs font-bold text-gray-900 hover:text-amber-800 hover:underline px-3 py-1 uppercase tracking-wider"
                  >
                    {isSelected ? 'APPLIED' : 'APPLY'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
