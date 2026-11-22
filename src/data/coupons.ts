import { Coupon } from '../types';

export const COUPONS: Coupon[] = [
  {
    code: 'OLDMONEY15',
    description: 'Get Flat 15% OFF on your very first order',
    discountType: 'percentage',
    discountValue: 15,
    minOrderAmount: 999,
    maxDiscount: 500
  },
  {
    code: 'FESTIVE500',
    description: 'Flat ₹500 OFF on orders above ₹2,499',
    discountType: 'flat',
    discountValue: 500,
    minOrderAmount: 2499
  },
  {
    code: 'LUXE1000',
    description: 'Special ₹1,000 OFF on Luxe Designer Collections',
    discountType: 'flat',
    discountValue: 1000,
    minOrderAmount: 4999
  },
  {
    code: 'FREESHIP',
    description: 'Free standard shipping on any fashion order',
    discountType: 'flat',
    discountValue: 99,
    minOrderAmount: 499
  }
];
