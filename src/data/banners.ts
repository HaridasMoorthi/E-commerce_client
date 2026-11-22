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
    title: 'The Royal Festive & Wedding Edit',
    subtitle: 'Curated Designer Ensembles, Silk Sarees & Embroidered Kurtas',
    tag: 'UP TO 60% OFF',
    desktopImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1920&auto=format&fit=crop&q=85',
    mobileImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=85',
    linkText: 'EXPLORE WEDDING STORE',
    ctaCategory: 'Indianwear',
    accentColor: '#111827'
  },
  {
    id: 'hb-2',
    title: 'The Autumn Western Silhouette',
    subtitle: 'From RSVP Atelier & Contemporary Global Labels',
    tag: 'NEW SEASON ARRIVALS',
    desktopImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&auto=format&fit=crop&q=85',
    mobileImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=85',
    linkText: 'SHOP WESTERNWEAR',
    ctaCategory: 'Westernwear',
    accentColor: '#1e1e24'
  },
  {
    id: 'hb-3',
    title: 'Old Money Luxe: Designer Showcase',
    subtitle: 'Exclusive Runway Pieces by Masaba, Ritu Kumar & Tarun Tahiliani',
    tag: 'PREMIUM COUTURE',
    desktopImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&auto=format&fit=crop&q=85',
    mobileImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=85',
    linkText: 'STEP INTO LUXE',
    ctaCategory: 'Luxe',
    accentColor: '#d4af37'
  }
];

export const BANK_OFFERS = [
  'HDFC Bank: Flat ₹500 instant discount on Credit Cards',
  'ICICI Bank: Extra 10% off on orders above ₹2,999',
  'Paytm UPI: Assured ₹100 cashback on first fashion transaction',
  'Free Express Delivery on all prepaid orders today'
];

export const CURATED_MOODBOARDS = [
  {
    id: 'mb-1',
    title: 'Vacation & Resort Chic',
    description: 'Breezy linen co-ords, crochet dresses & straw totes',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    category: 'Westernwear'
  },
  {
    id: 'mb-2',
    title: 'The Modern Royal',
    description: 'Brocade sherwanis, anarkalis & royal jewelry accents',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
    category: 'Indianwear'
  },
  {
    id: 'mb-3',
    title: 'Clean Minimalist Workwear',
    description: 'Sharp blazers, tailored trousers & everyday luxury bags',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&auto=format&fit=crop&q=80',
    category: 'Westernwear'
  }
];
