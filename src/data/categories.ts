import { Category, Brand } from '../types';

export const BRANDS: Brand[] = [
  { id: 'b1', name: 'RSVP Atelier', slug: 'rsvp', logo: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=200&auto=format&fit=crop' },
  { id: 'b2', name: 'Twenty Dresses', slug: 'twenty-dresses', logo: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&auto=format&fit=crop' },
  { id: 'b3', name: 'Biba', slug: 'biba', logo: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=200&auto=format&fit=crop' },
  { id: 'b4', name: 'House of Masaba', slug: 'house-of-masaba', logo: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=200&auto=format&fit=crop', isLuxe: true },
  { id: 'b5', name: 'Vero Moda', slug: 'vero-moda', logo: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&auto=format&fit=crop' },
  { id: 'b6', name: 'Gajra Gang', slug: 'gajra-gang', logo: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=200&auto=format&fit=crop' },
  { id: 'b7', name: 'Rareism', slug: 'rareism', logo: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&auto=format&fit=crop' },
  { id: 'b8', name: 'Ritu Kumar', slug: 'ritu-kumar', logo: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&auto=format&fit=crop', isLuxe: true },
  { id: 'b9', name: 'FabIndia', slug: 'fabindia', logo: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&auto=format&fit=crop' },
  { id: 'b10', name: 'House of Pataudi', slug: 'house-of-pataudi', logo: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=200&auto=format&fit=crop' }
];

export const CATEGORIES: Category[] = [
  {
    id: 'c-women',
    name: 'Women',
    slug: 'women',
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    subcategories: [
      {
        id: 'w-indian',
        name: 'Indianwear',
        slug: 'indianwear',
        items: ['Kurtas & Kurtis', 'Kurta Sets & Suits', 'Sarees', 'Lehengas & Blouses', 'Palazzos & Pants', 'Dupattas']
      },
      {
        id: 'w-western',
        name: 'Westernwear',
        slug: 'westernwear',
        items: ['Dresses', 'Tops & Shirts', 'T-Shirts & Jeans', 'Trousers & Skirts', 'Jackets & Blazers', 'Co-ord Sets']
      },
      {
        id: 'w-footwear',
        name: 'Footwear',
        slug: 'footwear',
        items: ['Heels & Pumps', 'Flats & Kolhapuris', 'Sneakers & Casuals', 'Boots & Loafers', 'Juttis & Mojris']
      },
      {
        id: 'w-lingerie',
        name: 'Lingerie & Lounge',
        slug: 'lingerie-lounge',
        items: ['Bras & Bralettes', 'Panties & Briefs', 'Nightwear & Loungewear', 'Shapewear']
      },
      {
        id: 'w-jewellery',
        name: 'Jewellery & Bags',
        slug: 'jewellery-bags',
        items: ['Earrings & Necklaces', 'Handbags & Totes', 'Sling Bags', 'Watches & Sunglasses', 'Fashion Jewellery']
      }
    ]
  },
  {
    id: 'c-men',
    name: 'Men',
    slug: 'men',
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    subcategories: [
      {
        id: 'm-topwear',
        name: 'Topwear',
        slug: 'topwear',
        items: ['Casual Shirts', 'Formal Shirts', 'T-Shirts & Polos', 'Sweatshirts & Hoodies', 'Jackets']
      },
      {
        id: 'm-bottomwear',
        name: 'Bottomwear',
        slug: 'bottomwear',
        items: ['Jeans', 'Trousers & Chinos', 'Shorts & Joggers']
      },
      {
        id: 'm-ethnic',
        name: 'Ethnic Wear',
        slug: 'ethnic-wear',
        items: ['Kurtas', 'Kurta Sets', 'Nehru Jackets', 'Sherwanis']
      },
      {
        id: 'm-footwear',
        name: 'Footwear',
        slug: 'footwear',
        items: ['Sneakers', 'Formal Shoes', 'Casual Shoes', 'Sandals & Slides']
      }
    ]
  },
  {
    id: 'c-kids',
    name: 'Kids',
    slug: 'kids',
    gender: 'kids',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&auto=format&fit=crop&q=80',
    subcategories: [
      {
        id: 'k-girls',
        name: 'Girls Fashion',
        slug: 'girls-fashion',
        items: ['Dresses & Frocks', 'Kurta Sets', 'Tops & Tees', 'Skirts & Shorts']
      },
      {
        id: 'k-boys',
        name: 'Boys Fashion',
        slug: 'boys-fashion',
        items: ['T-Shirts & Shirts', 'Kurta Sets', 'Jeans & Trousers']
      },
      {
        id: 'k-infant',
        name: 'Baby & Toddler',
        slug: 'baby-toddler',
        items: ['Rompers & Onesies', 'Sets & Suits', 'Footwear']
      }
    ]
  },
  {
    id: 'c-luxe',
    name: 'Luxe',
    slug: 'luxe',
    gender: 'luxe',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&auto=format&fit=crop&q=80',
    subcategories: [
      {
        id: 'lux-couture',
        name: 'Designer Couture',
        slug: 'designer-couture',
        items: ['Bridal Lehengas', 'Designer Sarees', 'Luxury Anarkalis', 'Evening Gowns']
      },
      {
        id: 'lux-contemporary',
        name: 'Contemporary Luxe',
        slug: 'contemporary-luxe',
        items: ['Designer Co-ords', 'Resort Wear', 'Runway Dresses']
      },
      {
        id: 'lux-accessories',
        name: 'Luxury Accessories',
        slug: 'luxury-accessories',
        items: ['Designer Clutches', 'Fine Jewellery', 'Statement Heels']
      }
    ]
  },
  {
    id: 'c-home',
    name: 'Home & Living',
    slug: 'home',
    gender: 'home',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&auto=format&fit=crop&q=80',
    subcategories: [
      {
        id: 'h-decor',
        name: 'Home Decor',
        slug: 'home-decor',
        items: ['Vases & Bowls', 'Candles & Diffusers', 'Wall Art', 'Cushion Covers']
      },
      {
        id: 'h-dining',
        name: 'Dining & Kitchen',
        slug: 'dining-kitchen',
        items: ['Dinnerware', 'Serveware', 'Glassware', 'Table Linen']
      }
    ]
  }
];

export const QUICK_CATEGORIES = [
  { name: 'Kurtas & Sets', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300&auto=format&fit=crop&q=80', category: 'Indianwear' },
  { name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&auto=format&fit=crop&q=80', category: 'Westernwear' },
  { name: 'Sarees', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&auto=format&fit=crop&q=80', category: 'Indianwear' },
  { name: 'Tops & Shirts', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&auto=format&fit=crop&q=80', category: 'Westernwear' },
  { name: 'Footwear', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&auto=format&fit=crop&q=80', category: 'Footwear' },
  { name: 'Handbags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=80', category: 'Jewellery & Bags' },
  { name: 'Jewellery', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&auto=format&fit=crop&q=80', category: 'Jewellery & Bags' },
  { name: 'Men Topwear', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&auto=format&fit=crop&q=80', category: 'Topwear' }
];
