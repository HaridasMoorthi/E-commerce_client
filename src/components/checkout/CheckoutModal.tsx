import React, { useState } from 'react';
import { X, MapPin, CreditCard, Smartphone, ShieldCheck, AlertCircle, ShoppingBag, Check } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';
import { ShippingAddress } from '../../types';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartTotals, placeOrder } = useECommerce();

  const [step, setStep] = useState<'address' | 'payment'>('address');
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Vikramaditya Oberoi',
    phone: '9876543210',
    pincode: '110001',
    addressLine: 'A-42, Connaught Place, Block B',
    city: 'New Delhi',
    state: 'Delhi',
    addressType: 'HOME'
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('vikram@okhdfcbank');
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const handlePincodeChange = (pincode: string) => {
    const clean = pincode.replace(/\D/g, '').slice(0, 6);
    setAddress((prev) => ({
      ...prev,
      pincode: clean,
      city: clean.startsWith('11') ? 'New Delhi' : clean.startsWith('40') ? 'Mumbai' : clean.startsWith('56') ? 'Bengaluru' : clean.startsWith('50') ? 'Hyderabad' : clean.startsWith('70') ? 'Kolkata' : prev.city,
      state: clean.startsWith('11') ? 'Delhi' : clean.startsWith('40') ? 'Maharashtra' : clean.startsWith('56') ? 'Karnataka' : clean.startsWith('50') ? 'Telangana' : clean.startsWith('70') ? 'West Bengal' : prev.state
    }));
  };

  const handlePhoneChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 10);
    setAddress((prev) => ({ ...prev, phone: clean }));
    if (validationError && clean.length === 10) {
      setValidationError(null);
    }
  };

  const validateAndProceedToPayment = () => {
    if (!address.fullName.trim() || address.fullName.trim().length < 2) {
      setValidationError('Please enter a valid full name for the delivery order.');
      return;
    }

    const cleanPhone = address.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      setValidationError('A valid 10-digit mobile phone number is strictly required for delivery tracking and courier SMS updates.');
      return;
    }

    if (!address.pincode || address.pincode.length !== 6) {
      setValidationError('Please enter a valid 6-digit postal pincode.');
      return;
    }

    if (!address.addressLine.trim() || address.addressLine.trim().length < 5) {
      setValidationError('Please provide complete house, building, and street address.');
      return;
    }

    if (!address.city.trim()) {
      setValidationError('Please specify the destination city.');
      return;
    }

    setValidationError(null);
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    placeOrder(address, paymentMethod.toUpperCase());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200 max-h-[92vh] flex flex-col font-sans">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <img src="/old-money-horizontal-dark.png" alt="OLD MONEY" className="h-8 w-auto object-contain" />
            <div className="hidden sm:block">
              <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase ml-1">
                | Express Concierge Checkout
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Tab */}
        <div className="flex border-b border-gray-200 text-xs font-bold uppercase tracking-wider bg-gray-50">
          <button
            onClick={() => setStep('address')}
            className={`flex-1 py-3 px-4 text-center border-b-2 flex items-center justify-center gap-2 transition-colors ${
              step === 'address' ? 'border-gray-900 text-gray-900 bg-white font-black' : 'border-transparent text-gray-500'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>1. Delivery & Contact Details</span>
          </button>
          <button
            onClick={validateAndProceedToPayment}
            className={`flex-1 py-3 px-4 text-center border-b-2 flex items-center justify-center gap-2 transition-colors ${
              step === 'payment' ? 'border-gray-900 text-gray-900 bg-white font-black' : 'border-transparent text-gray-500'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>2. Payment & Confirm</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Ordered Dresses Preview Section */}
          <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-200">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-amber-700" />
                <span>Garments in Order ({cart.reduce((s, i) => s + i.quantity, 0)} Items)</span>
              </span>
              <span className="text-xs font-bold text-gray-900">
                ₹{cartTotals.finalTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
              {cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${idx}`}
                  className="flex items-center gap-2.5 bg-white p-2 rounded-lg border border-gray-200/80 flex-shrink-0 min-w-[220px] max-w-[260px]"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-12 h-14 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-gray-900 truncate">
                      {item.product.title}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Size: <span className="font-bold text-gray-800">{item.selectedSize}</span> | Qty: <span className="font-bold text-gray-800">{item.quantity}</span>
                    </p>
                    <p className="text-[11px] font-bold text-amber-900 mt-0.5">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Validation Error Toast */}
          {validationError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 px-3.5 py-2.5 rounded-lg text-xs flex items-start gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{validationError}</span>
            </div>
          )}

          {/* STEP 1: Address & Mandatory Phone Number */}
          {step === 'address' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 uppercase block mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    placeholder="Recipient's Name"
                    className="w-full bg-gray-50 hover:bg-white focus:bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 uppercase block mb-1">
                    Phone Number <span className="text-rose-500 font-black">* Mandatory</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="w-full bg-gray-50 hover:bg-white focus:bg-white border border-gray-300 rounded-lg pl-12 pr-3.5 py-2.5 text-xs font-bold tracking-wider focus:outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">
                    Used for OTP verification, AWB dispatch SMS, and delivery handoff.
                  </p>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 uppercase block mb-1">
                  Pincode <span className="text-rose-500">*</span> (Auto-detects location)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={address.pincode}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  placeholder="e.g. 110001"
                  className="w-full bg-gray-50 hover:bg-white focus:bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-xs font-bold tracking-widest focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 uppercase block mb-1">
                  Flat, Suite, Building, Street Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={address.addressLine}
                  onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                  placeholder="e.g. Apartment 402, Royal Residency, Altamount Road"
                  className="w-full bg-gray-50 hover:bg-white focus:bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 uppercase block mb-1">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 uppercase block mb-1">
                    State <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={validateAndProceedToPayment}
                  className="w-full bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>DELIVER TO THIS ADDRESS</span>
                  <Check className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Payment Mode */}
          {step === 'payment' && (
            <div className="space-y-4">
              <div className="space-y-3">
                {/* UPI Option */}
                <label className={`border rounded-xl p-3.5 flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'upi' ? 'border-gray-900 bg-gray-50 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="accent-gray-900 mt-1 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                        UPI Instant Checkout (Recommended)
                      </span>
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">Google Pay, PhonePe, Paytm, CRED & UPI Apps</p>
                    {paymentMethod === 'upi' && (
                      <div className="mt-2.5">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@bankupi"
                          className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs font-semibold w-full focus:outline-none focus:border-gray-900"
                        />
                      </div>
                    )}
                  </div>
                </label>

                {/* Cards Option */}
                <label className={`border rounded-xl p-3.5 flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-gray-900 bg-gray-50 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-gray-900 mt-1 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                        Credit / Debit Card
                      </span>
                      <CreditCard className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">Visa, MasterCard, American Express, RuPay</p>
                  </div>
                </label>

                {/* COD Option */}
                <label className={`border rounded-xl p-3.5 flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-gray-900 bg-gray-50 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-gray-900 mt-1 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                        Cash on Delivery (COD)
                      </span>
                      <ShieldCheck className="w-4 h-4 text-gray-600" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">Pay upon delivery via cash or UPI scan at doorstep</p>
                  </div>
                </label>
              </div>

              {/* Delivery Details Summary Card */}
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-xs space-y-1">
                <div className="flex items-center justify-between text-gray-700">
                  <span className="text-[11px] font-bold uppercase text-gray-500">Shipping To:</span>
                  <button
                    onClick={() => setStep('address')}
                    className="text-[11px] font-bold text-gray-900 underline cursor-pointer"
                  >
                    Change
                  </button>
                </div>
                <p className="font-bold text-gray-900">{address.fullName} &bull; +91 {address.phone}</p>
                <p className="text-gray-600 text-[11px]">{address.addressLine}, {address.city} - {address.pincode}</p>
              </div>

              {/* Order Amount Summary */}
              <div className="bg-zinc-900 text-white p-4 rounded-xl shadow-sm text-xs space-y-1.5">
                <div className="flex justify-between items-baseline font-bold text-sm">
                  <span className="uppercase tracking-wider">Total Payable:</span>
                  <span className="text-amber-300 text-lg">₹{cartTotals.finalTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>Shipping & Luxury Garment Insurance</span>
                  <span className="text-emerald-400 font-bold uppercase">Complimentary</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('address')}
                  className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs uppercase py-3.5 rounded-lg transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  className="flex-1 bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-500/30"
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
