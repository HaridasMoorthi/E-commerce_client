import { Category, Brand } from '../types';

export const BRANDS: Brand[] = [
  { id: 'b1', name: 'Savile Row Bespoke', slug: 'savile-row', logo: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&auto=format&fit=crop', isLuxe: true },
  { id: 'b2', name: 'Brioni Milano', slug: 'brioni', logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&auto=format&fit=crop', isLuxe: true },
  { id: 'b3', name: 'Ralph Lauren Purple Label', slug: 'ralph-lauren', logo: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=200&auto=format&fit=crop', isLuxe: true },
  { id: 'b4', name: 'Tom Ford Tailoring', slug: 'tom-ford', logo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop', isLuxe: true },
  { id: 'b5', name: 'Loro Piana Atelier', slug: 'loro-piana', logo: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&auto=format&fit=crop', isLuxe: true },
  { id: 'b6', name: 'Zegna Sartoria', slug: 'zegna', logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop' },
  { id: 'b7', name: 'Canali 1934', slug: 'canali', logo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop' },
  { id: 'b8', name: 'Huntsman Savile Row', slug: 'huntsman', logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&auto=format&fit=crop', isLuxe: true }
];

export const CATEGORIES: Category[] = [
  {
    id: 'c-suits',
    name: 'Suits & Tuxedos',
    slug: 'suits-tuxedos',
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80',
    subcategories: [
      {
        id: 'm-cashmere',
        name: 'Cashmere & Wool',
        slug: 'cashmere-wool',
        items: ['Cable-Knit Sweaters', 'Cashmere Crewnecks', 'Merino Wool Cardigans', 'Quarter-Zip Knits']
      },
      {
        id: 'm-outerwear',
        name: 'Overcoats & Trench',
        slug: 'overcoats-trench',
        items: ['Cashmere Overcoats', 'Double-Breasted Trenches', 'Chesterfield Wool Coats', 'Peacoats']
      }
    ]
  },
  {
    id: 'c-shoes',
    name: 'Shoes & Accessories',
    slug: 'shoes-accessories',
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
    subcategories: [
      {
        id: 'm-shoes',
        name: 'Fine Footwear',
        slug: 'fine-footwear',
        items: ['Goodyear Penny Loafers', 'Oxford Formal Shoes', 'Monk Strap Shoes', 'Chelsea Boots']
      }
    ]
  }
];
