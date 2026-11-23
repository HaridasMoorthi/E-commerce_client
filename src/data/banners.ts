export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  desktopImage: string;
  mobileImage: string;
  linkText: string;
  ctaCategory?: string;
  accentColor: string;
}

export const HERO_BANNERS: HeroBanner[] = [
  {
    id: 'hb-1',
    title: 'THE SARTORIAL GENTLEMAN EDIT',
    subtitle: 'Hand-Tailored Savile Row Super 150s Wool Tuxedos, Double-Breasted Dinner Suits & Velvet Jackets',
    tag: 'LIMITED ATELIER PRODUCTION',
    desktopImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1920&auto=format&fit=crop&q=85',
    mobileImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=85',
    linkText: 'EXPLORE BESPOKE SUITS',
    ctaCategory: 'Suits & Tuxedos',
    accentColor: '#111827'
  },
  {
    id: 'hb-2',
    title: 'OLD MONEY CASHMERE & SARTORIAL KNITS',
    subtitle: 'Grade-A Mongolian Cashmere Cable Knits, Spread-Collar Polos & Egyptian Giza Cotton Shirts',
    tag: 'NEW SEASON BESPOKE',
    desktopImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1920&auto=format&fit=crop&q=85',
    mobileImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=85',
    linkText: 'SHOP CASHMERE & POLOS',
    ctaCategory: 'Knitwear & Sweaters',
    accentColor: '#1e1e24'
  },
  {
    id: 'hb-3',
    title: 'BLACK-TIE GALA & SOIRÉE TUXEDOS',
    subtitle: 'Silk Grosgrain Peak Lapel Dinner Suits & Hand-Burnished Goodyear Welted Leather Loafers',
    tag: 'HAUTE COUTURE EDIT',
    desktopImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&auto=format&fit=crop&q=85',
    mobileImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=85',
    linkText: 'SHOP DINNER SUITS',
    ctaCategory: 'Suits & Tuxedos',
    accentColor: '#064e3b'
  }
];

export const BANK_OFFERS = [
  'HDFC Bank: Flat ₹1,500 instant discount on Luxury Credit Cards',
  'Amex Sartorial: Extra 15% off on orders above ₹9,999 with code OLDMONEY15',
  'Instant UPI: Assured ₹250 instant cashback on bespoke menswear',
  'Complimentary Signature White-Glove Courier Delivery on all orders'
];

export interface Moodboard {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

export const MOODBOARDS: Moodboard[] = [
  {
    id: 'mb-1',
    title: 'Mayfair Black-Tie Evening',
    description: 'Double-breasted barathea wool tuxedo with Grosgrain silk lapels and patent dress shoes.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80',
    category: 'Suits & Tuxedos'
  },
  {
    id: 'mb-2',
    title: 'Lake Como Riviera Tailoring',
    description: 'Unlined linen-silk sport coats paired with crisp spread-collar shirts and driving loafers.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
    category: 'Suits & Tuxedos'
  },
  {
    id: 'mb-3',
    title: 'Scottish Estate Cashmere & Tweed',
    description: 'Heavy gauge cable-knit cashmere overcoats and Vitale Barberis wool flannel trousers.',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80',
    category: 'Knitwear & Sweaters'
  }
];

export const CURATED_MOODBOARDS = MOODBOARDS;
