import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'The Ascot Mulberry Silk Bias-Cut Champagne Slip Dress',
    slug: 'ascot-mulberry-silk-champagne-slip-dress',
    brand: 'RSVP Atelier',
    brandId: 'b1',
    gender: 'women',
    category: 'Westernwear & Dresses',
    subCategory: 'Evening Slip Dresses',
    mrp: 14999,
    price: 7499,
    discountPercentage: 50,
    rating: 4.9,
    ratingCount: 320,
    isBestseller: true,
    isDealOfTheDay: true,
    isLuxe: true,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=900&auto=format&fit=crop&q=85'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#d4af37', imageIndex: 0 },
      { name: 'Oyster Pearl', hex: '#f4f4f5', imageIndex: 1 }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stockPerSize: { 'XS': 6, 'S': 12, 'M': 16, 'L': 8, 'XL': 4 },
    description: 'An exquisitely structured evening slip dress cut on the bias from pure 22-momme Mulberry silk. Fluid drape, cowl neckline, and French-seamed hems for timeless Old Money soiree elegance.',
    fabricCare: ['100% Pure Mulberry Silk', 'Dry Clean Only', 'Store on padded hanger'],
    specifications: {
      'Silhouette': 'Fluid Bias-Cut Midi',
      'Neckline': 'Delicate Draped Cowl Neck',
      'Lining': 'Self-Lined Bust with Clean Edges',
      'Occasion': 'Evening Gala, Opera & Cocktail Soiree'
    },
    tags: ['Old Money Dress', 'Mulberry Silk', 'Bias Cut', 'Bestseller']
  },
  {
    id: 'prod-2',
    title: 'Emerald Noir Velvet Backless High-Slit Gala Evening Gown',
    slug: 'emerald-noir-velvet-backless-gala-gown',
    brand: 'Tom Ford Haute Couture',
    brandId: 'b4',
    gender: 'women',
    category: 'Westernwear & Dresses',
    subCategory: 'Couture Evening Gowns',
    mrp: 36999,
    price: 18499,
    discountPercentage: 50,
    rating: 4.9,
    ratingCount: 185,
    isBestseller: true,
    isLuxe: true,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=900&auto=format&fit=crop&q=85'
    ],
    colors: [
      { name: 'Emerald Noir', hex: '#064e3b', imageIndex: 0 },
      { name: 'Midnight Onyx', hex: '#0a0a0a', imageIndex: 1 }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stockPerSize: { 'XS': 3, 'S': 8, 'M': 10, 'L': 5 },
    description: 'A showstopping floor-length evening gown cut from lustrous Italian silk velvet. Features an architectural high neckline, sensual open back, and sweeping thigh-high slit.',
    fabricCare: ['Italian Silk Velvet', 'Pure Silk Lining', 'Specialist Dry Clean Only'],
    specifications: {
      'Silhouette': 'Column Gown with High Leg Slit',
      'Back Style': 'Sculptural Open Back',
      'Closure': 'Concealed Hand-Sewn Zipper',
      'Occasion': 'Black-Tie Red Carpet & Grand Ball'
    },
    tags: ['Velvet Gown', 'Emerald Green', 'Old Money Luxury', 'Haute Couture']
  },
  {
    id: 'prod-3',
    title: 'Portofino Pleated French Linen Belted Riviera Midi Dress',
    slug: 'portofino-pleated-french-linen-riviera-dress',
    brand: 'Loro Piana Atelier',
    brandId: 'b5',
    gender: 'women',
    category: 'Westernwear & Dresses',
    subCategory: 'Resort & Riviera Dresses',
    mrp: 19999,
    price: 9999,
    discountPercentage: 50,
    rating: 4.8,
    ratingCount: 210,
    isBestseller: true,
    isDealOfTheDay: true,
    isLuxe: true,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&auto=format&fit=crop&q=85'
    ],
    colors: [
      { name: 'Ivory Cream', hex: '#fdfbf7', imageIndex: 0 },
      { name: 'Capri Riviera Blue', hex: '#0284c7', imageIndex: 1 }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockPerSize: { 'S': 7, 'M': 14, 'L': 12, 'XL': 6 },
    description: 'Masterfully woven from breathable Normandy flax linen with accordion pleated skirt, horn belt buckle, and mother-of-pearl front buttons. Quintessential Mediterranean resort elegance.',
    fabricCare: ['100% French Normandy Linen', 'Dry Clean or Gentle Hand Wash Cold', 'Line dry in shade'],
    specifications: {
      'Length': 'Midi Below Knee',
      'Belt': 'Detachable Self-Fabric Belt with Horn Buckle',
      'Buttons': 'Natural Australian Mother-of-Pearl',
      'Occasion': 'Yacht Club, Garden Luncheon & Summer Estate'
    },
    tags: ['Riviera Linen', 'Ivory Dress', 'Quiet Luxury', 'Summer Old Money']
  },
  {
    id: 'prod-4',
    title: 'Tweed Bouclé Pearl-Buttoned Double-Breasted Blazer Dress',
    slug: 'tweed-boucle-double-breasted-blazer-dress',
    brand: 'Chanel Haute Couture',
    brandId: 'b8',
    gender: 'women',
    category: 'Westernwear & Dresses',
    subCategory: 'Tailored Blazer Dresses',
    mrp: 29999,
    price: 14999,
    discountPercentage: 50,
    rating: 4.9,
    ratingCount: 164,
    isBestseller: true,
    isLuxe: true,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&auto=format&fit=crop&q=85'
    ],
    colors: [
      { name: 'Ecru & Gold Tweed', hex: '#fef3c7', imageIndex: 0 },
      { name: 'Midnight Tweed', hex: '#111827', imageIndex: 1 }
    ],
    sizes: ['36 (XS)', '38 (S)', '40 (M)', '42 (L)'],
    stockPerSize: { '36 (XS)': 4, '38 (S)': 9, '40 (M)': 11, '42 (L)': 5 },
    description: 'Heirloom French bouclé tweed tailored into a structured double-breasted dress. Features signature braided metallic trims, fringed lapels, and luminous baroque pearl buttons.',
    fabricCare: ['100% Virgin Wool & Silk Bouclé', 'Specialist Dry Clean Only'],
    specifications: {
      'Lapel': 'Notched Tweed Lapel with Fringed Edge',
      'Buttons': 'Gold-Rimmed Baroque Pearl Buttons',
      'Lining': 'Pure Silk Crepe de Chine',
      'Occasion': 'High Tea, Boardroom & Autumn Soiree'
    },
    tags: ['Tweed Dress', 'Blazer Dress', 'Chanel Style', 'Old Money Chic']
  },
  {
    id: 'prod-5',
    title: 'Chiffon Tiered Floral Silk Soirée Slip Dress',
    slug: 'chiffon-tiered-floral-silk-soiree-dress',
    brand: 'Zimmermann Atelier',
    brandId: 'b2',
    gender: 'women',
    category: 'Westernwear & Dresses',
    subCategory: 'Evening Slip Dresses',
    mrp: 22999,
    price: 11499,
    discountPercentage: 50,
    rating: 4.7,
    ratingCount: 140,
    isBestseller: false,
    isDealOfTheDay: true,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=900&auto=format&fit=crop&q=85'
    ],
    colors: [
      { name: 'Vintage Rose Floral', hex: '#fb7185', imageIndex: 0 },
      { name: 'Botanical Sage', hex: '#84cc16', imageIndex: 1 }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stockPerSize: { 'XS': 5, 'S': 10, 'M': 12, 'L': 6 },
    description: 'Tiered whisper-weight silk chiffon adorned with archive hand-painted botanical blooms. Features delicate picot edges, skinny rouleau straps, and a romantic ruffled silhouette.',
    fabricCare: ['100% Silk Chiffon', 'Dry Clean Only'],
    specifications: {
      'Silhouette': 'Tiered Ruffle Maxi',
      'Straps': 'Adjustable Rouleau Shoulder Straps',
      'Hem': 'High-Low Cascading Ruffle Hem'
    },
    tags: ['Floral Dress', 'Silk Chiffon', 'Garden Party', 'Romantic Luxury']
  },
  {
    id: 'prod-6',
    title: 'Savile Row Double-Breasted Super 150s Wool Tuxedo Suit',
    slug: 'savile-row-double-breasted-tuxedo-suit',
    brand: 'Savile Row Bespoke',
    brandId: 'b1',
    gender: 'men',
    category: 'Suits & Tuxedos',
    subCategory: 'Tuxedos & Dinner Suits',
    mrp: 38999,
    price: 19499,
    discountPercentage: 50,
    rating: 4.9,
    ratingCount: 240,
    isBestseller: true,
    isLuxe: true,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&auto=format&fit=crop&q=85'
    ],
    colors: [
      { name: 'Midnight Obsidian', hex: '#0a0a0a', imageIndex: 0 },
      { name: 'Imperial Navy', hex: '#0f172a', imageIndex: 1 }
    ],
    sizes: ['38R', '40R', '42R', '44R', '46R'],
    stockPerSize: { '38R': 4, '40R': 8, '42R': 12, '44R': 6, '46R': 2 },
    description: 'Immaculately tailored from pure British Super 150s merino wool with grosgrain silk peak lapels, roped shoulders, and side-tab formal trousers. The pinnacle of black-tie evening refinement.',
    fabricCare: ['100% Super 150s Merino Wool with Silk Facing', 'Specialist Dry Clean Only'],
    specifications: {
      'Lapel': 'Silk Grosgrain Peak Lapel',
      'Button Configuration': 'Six-on-Two Double Breasted',
      'Occasion': 'Black-Tie Gala & Opera'
    },
    tags: ['Savile Row Exclusive', 'Double Breasted', 'Black Tie', 'Old Money Luxe']
  },
  {
    id: 'prod-7',
    title: 'Midnight Navy Silk Velvet Peak-Lapel Dinner Jacket',
    slug: 'midnight-navy-velvet-dinner-jacket',
    brand: 'Tom Ford Tailoring',
    brandId: 'b4',
    gender: 'men',
    category: 'Suits & Tuxedos',
    subCategory: 'Tuxedos & Dinner Suits',
    mrp: 29999,
    price: 14999,
    discountPercentage: 50,
    rating: 4.8,
    ratingCount: 168,
    isBestseller: true,
    isLuxe: true,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&auto=format&fit=crop&q=85'
    ],
    colors: [
      { name: 'Midnight Navy Velvet', hex: '#172554', imageIndex: 0 }
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    stockPerSize: { '38R': 3, '40R': 7, '42R': 10, '44R': 4 },
    description: 'A striking statement dinner jacket crafted from rich Italian cotton velvet. Designed with sweeping black silk satin peak lapels and covered silk buttons.',
    fabricCare: ['100% Italian Cotton Velvet', 'Pure Silk Trim', 'Dry Clean Only'],
    specifications: {
      'Lapel': 'Black Duchesse Satin Peak',
      'Closure': 'Single-Button Covered'
    },
    tags: ['Dinner Jacket', 'Velvet', 'Cocktail Soiree']
  },
  {
    id: 'prod-8',
    title: 'Pure Mongolian Cashmere Cable-Knit Polo Sweater',
    slug: 'pure-cashmere-cable-knit-polo-sweater',
    brand: 'Loro Piana Atelier',
    brandId: 'b5',
    gender: 'unisex',
    category: 'Knitwear & Sweaters',
    subCategory: 'Cashmere & Wool',
    mrp: 18999,
    price: 9499,
    discountPercentage: 50,
    rating: 4.9,
    ratingCount: 312,
    isBestseller: true,
    isDealOfTheDay: true,
    isLuxe: true,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=900&auto=format&fit=crop&q=85'
    ],
    colors: [
      { name: 'Ivory Cream', hex: '#fdfbf7', imageIndex: 0 },
      { name: 'Classic Camel', hex: '#c19a6b', imageIndex: 1 }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockPerSize: { 'S': 5, 'M': 14, 'L': 18, 'XL': 8 },
    description: 'Spun from two-ply Mongolian cashmere with classic rope-cable stitching, mother-of-pearl collar buttons, and ribbed hems.',
    fabricCare: ['100% Grade-A Mongolian Cashmere', 'Hand wash cold or dry clean'],
    specifications: {
      'Collar': 'Spread Polo with Pearl Buttons',
      'Origin': 'Biella, Italy'
    },
    tags: ['Cashmere', 'Old Money Knit', 'Loro Piana']
  },
  {
    id: 'prod-9',
    title: 'High-Waisted Double-Pleated Wool Flannel Gurkha Trousers',
    slug: 'high-waisted-pleated-wool-flannel-trousers',
    brand: 'Ralph Lauren Purple Label',
    brandId: 'b3',
    gender: 'men',
    category: 'Trousers & Chinos',
    subCategory: 'Tailored Trousers',
    mrp: 12999,
    price: 6499,
    discountPercentage: 50,
    rating: 4.8,
    ratingCount: 142,
    isBestseller: true,
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900&auto=format&fit=crop&q=85'
    ],
    colors: [
      { name: 'Charcoal Melange Flannel', hex: '#374151', imageIndex: 0 }
    ],
    sizes: ['30', '32', '34', '36', '38'],
    stockPerSize: { '30': 4, '32': 10, '34': 14, '36': 8, '38': 3 },
    description: 'Heirloom menswear tailoring featuring an extended Gurkha crossover waistband with brass buckles, deep forward double pleats, and 2-inch turn-up cuffs.',
    fabricCare: ['100% Wool Flannel', 'Dry Clean Only'],
    specifications: {
      'Waistband': 'Extended Gurkha Double-Buckle Band',
      'Hem': '2-Inch (5cm) Cuffed Turn-Up'
    },
    tags: ['Gurkha Trousers', 'Wool Flannel', 'High Waist']
  },
  {
    id: 'prod-10',
    title: 'Egyptian Giza Cotton French-Cuff Dress Shirt',
    slug: 'egyptian-giza-cotton-french-cuff-shirt',
    brand: 'Brioni Milano',
    brandId: 'b2',
    gender: 'men',
    category: 'Shirts & Polos',
    subCategory: 'Dress Shirts',
    mrp: 8999,
    price: 4499,
    discountPercentage: 50,
    rating: 4.7,
    ratingCount: 195,
    isBestseller: true,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&auto=format&fit=crop&q=85'
    ],
    colors: [
      { name: 'Crisp Optic White', hex: '#ffffff', imageIndex: 0 }
    ],
    sizes: ['39 (15.5)', '40 (15.75)', '41 (16)', '42 (16.5)'],
    stockPerSize: { '39 (15.5)': 6, '40 (15.75)': 12, '41 (16)': 15, '42 (16.5)': 9 },
    description: 'Woven from long-staple 140/2 Egyptian Giza cotton with a silky poplin hand-feel, semi-spread cutaway collar, and French cuffs.',
    fabricCare: ['100% Egyptian Cotton', 'Machine wash gentle warm'],
    specifications: {
      'Collar': 'Cutaway Spread Collar',
      'Cuff': 'Double French Cuffs'
    },
    tags: ['Dress Shirt', 'French Cuff', 'Giza Cotton']
  },
  {
    id: 'prod-11',
    title: 'Hand-Burnished Goodyear-Welted Leather Penny Loafers',
    slug: 'goodyear-welted-leather-penny-loafers',
    brand: "Church's Shoemakers",
    brandId: 'b9',
    gender: 'men',
    category: 'Shoes & Accessories',
    subCategory: 'Fine Footwear',
    mrp: 24999,
    price: 12499,
    discountPercentage: 50,
    rating: 4.9,
    ratingCount: 215,
    isBestseller: true,
    isLuxe: true,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=900&auto=format&fit=crop&q=85'
    ],
    colors: [
      { name: 'Oxblood Cordovan', hex: '#4a0e17', imageIndex: 0 }
    ],
    sizes: ['7 UK', '8 UK', '9 UK', '10 UK', '11 UK'],
    stockPerSize: { '7 UK': 3, '8 UK': 7, '9 UK': 11, '10 UK': 6, '11 UK': 2 },
    description: 'Full-grain French calf leather constructed with Goodyear welted oak bark tanned leather soles and hand-antiqued patina.',
    fabricCare: ['Full-Grain Calf Leather', 'Polish with natural beeswax'],
    specifications: {
      'Construction': 'Goodyear Welted',
      'Made in': 'Northampton, England'
    },
    tags: ['Penny Loafers', 'Goodyear Welt', 'Dress Shoes']
  }
];
