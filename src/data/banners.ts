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
    title: 'THE OLD MONEY DRESS EDIT',
    subtitle: 'Hand-Tailored 22-Momme Mulberry Silk Bias Slips, Emerald Velvet Gala Gowns & Pleated Linen Riviera Silhouettes',
    tag: 'HAUTE COUTURE EDIT',
    desktopImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1920&auto=format&fit=crop&q=85',
    mobileImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=85',
    linkText: 'EXPLORE LUXURY DRESSES',
    ctaCategory: 'Westernwear & Dresses',
    accentColor: '#111827'
  },
  {
    id: 'hb-2',
    title: 'BLACK-TIE GALA & COUTURE EVENING GOWNS',
    subtitle: 'Backless Italian Silk Velvet High-Slit Gowns & Pearl-Trimmed Bouclé Blazer Dresses from RSVP & Tom Ford Atelier',
    tag: 'LIMITED ATELIER PRODUCTION',
    desktopImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1920&auto=format&fit=crop&q=85',
    mobileImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=85',
    linkText: 'SHOP EVENING GOWNS',
    ctaCategory: 'Westernwear & Dresses',
    accentColor: '#064e3b'
  },
  {
    id: 'hb-3',
    title: 'MONACO RIVIERA & RESORT COLLECTION',
    subtitle: 'Accordion-Pleated Normandy Linen Dresses, Tiered Chiffon Florals & Savile Row Bespoke Eveningwear',
    tag: 'NEW SEASON RESORT',
    desktopImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1920&auto=format&fit=crop&q=85',
    mobileImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop&q=85',
    linkText: 'SHOP RIVIERA DRESSES',
    ctaCategory: 'Westernwear & Dresses',
    accentColor: '#1e1e24'
  }
];

export const BANK_OFFERS = [
  'HDFC Bank: Flat ₹1,500 instant discount on Luxury Credit Cards',
  'Amex Sartorial: Extra 15% off on orders above ₹9,999 with code OLDMONEY15',
  'Instant UPI: Assured ₹250 instant cashback on bespoke dresses and menswear',
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
    title: 'Ascot Grand Soirée Silk Slips',
    description: '22-momme pure mulberry silk cut on the bias with liquid drape and champagne gold luster.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
    category: 'Westernwear & Dresses'
  },
  {
    id: 'mb-2',
    title: 'Portofino Riviera Linen Dresses',
    description: 'French Normandy flax linen with accordion pleats, horn buckle belt and mother-of-pearl buttons.',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop&q=80',
    category: 'Westernwear & Dresses'
  },
  {
    id: 'mb-3',
    title: 'Mayfair Emerald Gala Velvet Gowns',
    description: 'Sculptural open back column gowns in lustrous Italian silk velvet with sweeping thigh-high slits.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=80',
    category: 'Westernwear & Dresses'
  }
];

export const CURATED_MOODBOARDS = MOODBOARDS;
