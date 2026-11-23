import { Category, Brand } from '../types';

export const BRANDS: Brand[] = [
  { id: 'b1', name: 'RSVP Atelier', slug: 'rsvp-atelier', logo: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&auto=format&fit=crop', isLuxe: true },
  { id: 'b2', name: 'Tom Ford Haute Couture', slug: 'tom-ford', logo: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=200&auto=format&fit=crop', isLuxe: true },
  { id: 'b3', name: 'Loro Piana Atelier', slug: 'loro-piana', logo: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&auto=format&fit=crop', isLuxe: true },
  { id: 'b4', name: 'Chanel Haute Couture', slug: 'chanel', logo: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&auto=format&fit=crop', isLuxe: true },
  { id: 'b5', name: 'Zimmermann Atelier', slug: 'zimmermann', logo: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200&auto=format&fit=crop', isLuxe: true },
  { id: 'b6', name: 'Savile Row Bespoke', slug: 'savile-row', logo: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&auto=format&fit=crop', isLuxe: true },
  { id: 'b7', name: 'Brioni Milano', slug: 'brioni', logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&auto=format&fit=crop', isLuxe: true },
  { id: 'b8', name: 'Ralph Lauren Purple Label', slug: 'ralph-lauren', logo: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=200&auto=format&fit=crop', isLuxe: true }
];

export const CATEGORIES: Category[] = [
  {
    id: 'c-dresses',
    name: 'Westernwear & Dresses',
    slug: 'westernwear-dresses',
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=85',
    subcategories: [
      {
        id: 'w-slip-dresses',
        name: 'Evening Slip Dresses',
        slug: 'evening-slip-dresses',
        items: ['Mulberry Silk Bias Slips', 'Champagne Cowl Neck Dresses', 'Velvet Cocktail Slips', 'Silk Charmeuse Gowns']
      },
      {
        id: 'w-gowns',
        name: 'Couture Evening Gowns',
        slug: 'couture-evening-gowns',
        items: ['Emerald Velvet Gowns', 'Backless Gala Dresses', 'Red Carpet Column Gowns', 'High-Slit Soiree Gowns']
      },
      {
        id: 'w-resort-dresses',
        name: 'Resort & Riviera Dresses',
        slug: 'resort-riviera-dresses',
        items: ['Pleated French Linen Dresses', 'Horn-Belted Midi Dresses', 'Capri Summer Silhouettes', 'Italian Cotton Sun Dresses']
      },
      {
        id: 'w-blazer-dresses',
        name: 'Tailored Blazer Dresses',
        slug: 'tailored-blazer-dresses',
        items: ['Bouclé Tweed Dresses', 'Double-Breasted Pearl Dresses', 'Structured Tuxedo Dresses', 'Monochrome Houndstooth']
      }
    ]
  },
  {
    id: 'c-suits',
    name: 'Suits & Tuxedos',
    slug: 'suits-tuxedos',
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop&q=80',
    subcategories: [
      {
        id: 'm-tuxedos',
        name: 'Tuxedos & Dinner Suits',
        slug: 'tuxedos',
        items: ['Black-Tie Tuxedos', 'Velvet Dinner Jackets', 'Double-Breasted Tuxedos', 'Silk Lapel Suits', 'Tuxedo Trousers']
      },
      {
        id: 'm-suits',
        name: 'Bespoke Suits',
        slug: 'suits',
        items: ['Three-Piece Suits', 'Double-Breasted Suits', 'Classic Two-Piece', 'Wool Flannel Suits', 'Linen Summer Suits']
      },
      {
        id: 'm-blazers',
        name: 'Blazers & Sport Coats',
        slug: 'blazers',
        items: ['Navy Club Blazers', 'Tweed Sport Coats', 'Cashmere Blend Blazers', 'Peak Lapel Jackets']
      }
    ]
  },
  {
    id: 'c-shirts',
    name: 'Shirts & Polos',
    slug: 'shirts-polos',
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=80',
    subcategories: [
      {
        id: 'm-formal-shirts',
        name: 'Dress Shirts',
        slug: 'formal-shirts',
        items: ['Egyptian Oxford Shirts', 'French Cuff Dress Shirts', 'Spread Collar Shirts', 'Tuxedo Bib Shirts']
      },
      {
        id: 'm-polos',
        name: 'Knitted Polos & Casual',
        slug: 'polos',
        items: ['Silk-Cotton Polos', 'Pique Knit Polos', 'Camp Collar Linen Shirts', 'Cashmere Knit Shirts']
      }
    ]
  },
  {
    id: 'c-trousers',
    name: 'Trousers & Chinos',
    slug: 'trousers-chinos',
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop&q=80',
    subcategories: [
      {
        id: 'm-tailored-trousers',
        name: 'Tailored Trousers',
        slug: 'tailored-trousers',
        items: ['High-Waist Gurkha Trousers', 'Pleated Wool Flannels', 'Side-Tab Dress Pants', 'Italian Cotton Chinos']
      }
    ]
  },
  {
    id: 'c-knitwear',
    name: 'Knitwear & Sweaters',
    slug: 'knitwear-sweaters',
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop&q=80',
    subcategories: [
      {
        id: 'm-cashmere',
        name: 'Cashmere & Wool',
        slug: 'cashmere-wool',
        items: ['Cable-Knit Sweaters', 'Cashmere Crewnecks', 'Merino Wool Cardigans', 'Quarter-Zip Knits']
      }
    ]
  }
];
