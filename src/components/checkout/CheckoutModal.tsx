import React, { useState } from 'react';
import { X, MapPin, CreditCard, Smartphone, ShieldCheck } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';
import { ShippingAddress } from '../../types';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cartTotals, placeOrder } = useECommerce();

  const [step, setStep] = useState<'address' | 'payment'>('address');
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Priya Sharma',
    phone: '9876543210',
    pincode: '110001',
    addressLine: 'A-42, Connaught Place, Block B',
    city: 'New Delhi',
    state: 'Delhi',
    addressType: 'HOME'
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('priya@okhdfcbank');

  if (!isCheckoutOpen) return null;

  const handlePincodeChange = (pincode: string) => {
    const clean = pincode.replace(/\D/g, '');
    setAddress((prev) => ({
      ...prev,
      pincode: clean,
      city: clean.startsWith('11') ? 'New Delhi' : clean.startsWith('40') ? 'Mumbai' : clean.startsWith('56') ? 'Bengaluru' : prev.city,
      state: clean.startsWith('11') ? 'Delhi' : clean.startsWith('40') ? 'Maharashtra' : clean.startsWith('56') ? 'Karnataka' : prev.state
    }));
  };

  const handleCompleteOrder = () => {
    placeOrder(address, paymentMethod.toUpperCase());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden border border-gray-200 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <img src="/old-money-horizontal-dark.png" alt="OLD MONEY" className="h-8 w-auto object-contain" />
            <div>
              <span className="text-xs text-gray-400 font-semibold ml-1">| Express Checkout</span>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Tab */}
        <div className="flex border-b border-gray-200 text-xs font-bold uppercase tracking-wider bg-gray-50">
          <div
            className={`flex-1 py-3 px-4 text-center border-b-2 flex items-center justify-center gap-2 ${
              step === 'address' ? 'border-gray-900 text-gray-900 bg-white' : 'border-transparent text-gray-500'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>1. Delivery Address</span>
          </div>
          <div
            className={`flex-1 py-3 px-4 text-center border-b-2 flex items-center justify-center gap-2 ${
              step === 'payment' ? 'border-gray-900 text-gray-900 bg-white' : 'border-transparent text-gray-500'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>2. Payment Mode</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* STEP 1: Address */}
          {step === 'address' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs font-medium focus:outline-none focus:border-gray-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs font-medium focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Pincode (Auto-Detects City/State)</label>
                <input
                  type="text"
                  maxLength={6}
                  value={address.pincode}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs font-bold focus:outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Flat, House no., Building, Street</label>
                <input
                  type="text"
                  value={address.addressLine}
                  onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs font-medium focus:outline-none focus:border-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase block mb-1">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase block mb-1">State</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setStep('payment')}
                  className="w-full bg-gray-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded transition-colors"
                >
                  DELIVER TO THIS ADDRESS
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Payment */}
          {step === 'payment' && (
            <div className="space-y-4">
              <div className="space-y-3">
                {/* UPI Option */}
                <label className={`border rounded-lg p-3.5 flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'upi' ? 'border-gray-900 bg-gray-50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="accent-gray-900 mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 uppercase">UPI (Instant Fast-Lane)</span>
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-gray-500">Google Pay, PhonePe, Paytm, BHIM</p>
                    {paymentMethod === 'upi' && (
                      <div className="mt-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="username@bank"
                          className="bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs font-semibold w-full focus:outline-none focus:border-gray-900"
                        />
                      </div>
                    )}
                  </div>
                </label>

                {/* Cards Option */}
                <label className={`border rounded-lg p-3.5 flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-gray-900 bg-gray-50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-gray-900 mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 uppercase">Credit / Debit Card</span>
                      <CreditCard className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-[11px] text-gray-500">Visa, MasterCard, RuPay, Amex</p>
                  </div>
                </label>

                {/* COD Option */}
                <label className={`border rounded-lg p-3.5 flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-gray-900 bg-gray-50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-gray-900 mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 uppercase">Cash on Delivery (COD)</span>
                      <ShieldCheck className="w-4 h-4 text-gray-600" />
                    </div>
                    <p className="text-[11px] text-gray-500">Pay upon delivery via cash or instant UPI scan</p>
                  </div>
                </label>
              </div>

              {/* Order Amount Summary */}
              <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-200 text-xs space-y-1">
                <div className="flex justify-between font-bold text-gray-900 text-sm">
                  <span>Payable Amount:</span>
                  <span className="text-amber-700">₹{cartTotals.finalTotal.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[10px] text-gray-400">Includes all taxes and free priority packaging</p>
              </div>

              {/* CTAs */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep('address')}
                  className="w-1/3 bg-gray-100 text-gray-700 font-bold text-xs uppercase py-3 rounded hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleCompleteOrder}
                  className="flex-1 bg-gray-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded shadow-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>CONFIRM ORDER (₹{cartTotals.finalTotal.toLocaleString('en-IN')})</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
