import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
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
    ratingCount: 320,
    isBestseller: true,
    isDealOfTheDay: true,
    isLuxe: true,
    isNewArrival: true,
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
      'Trousers': 'Side-Tab Adjustable Formal Trousers',
      'Occasion': 'Black-Tie Gala & Opera'
    },
    tags: ['Savile Row Exclusive', 'Double Breasted', 'Black Tie', 'Old Money Luxe']
  },
  {
    id: 'prod-2',
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
    rating: 4.9,
    ratingCount: 185,
    isBestseller: true,
    isLuxe: true,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&auto=format&fit=crop&q=85'
    ],
    colors: [
      { name: 'Midnight Navy Velvet', hex: '#172554', imageIndex: 0 },
      { name: 'Black Velvet', hex: '#0a0a0a', imageIndex: 1 }
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    stockPerSize: { '38R': 3, '40R': 7, '42R': 10, '44R': 4 },
    description: 'A striking statement dinner jacket crafted from rich Italian cotton velvet. Designed with sweeping black silk satin peak lapels, gauntlet cuffs, and covered silk buttons.',
    fabricCare: ['100% Italian Cotton Velvet', 'Pure Silk Satin Facing', 'Dry Clean Only'],
    specifications: {
      'Lapel': 'Black Duchesse Silk Satin Peak',
      'Closure': 'Single-Button Covered Silk',
      'Lining': 'Full Cupro Bemberg Lining',
      'Occasion': 'Cocktail Soiree & Winter Gala'
    },
    tags: ['Dinner Jacket', 'Velvet', 'Tom Ford', 'Quiet Luxury']
  },
  {
    id: 'prod-3',
    title: 'Pure Mongolian Cashmere Cable-Knit Polo Sweater',
    slug: 'pure-cashmere-cable-knit-polo-sweater',
    brand: 'Loro Piana Atelier',
    brandId: 'b5',
    gender: 'men',
    category: 'Knitwear & Sweaters',
    subCategory: 'Cashmere & Wool',
    mrp: 18999,
    price: 9499,
    discountPercentage: 50,
    rating: 4.8,
    ratingCount: 210,
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
    description: 'Spun from two-ply Grade-A Mongolian cashmere with classic rope-cable stitching, mother-of-pearl collar buttons, and ribbed cuffs. Understated country estate sophistication.',
    fabricCare: ['100% Grade-A Mongolian Cashmere', 'Gentle hand wash cold or dry clean'],
    specifications: {
      'Collar': 'Spread Polo with Pearl Buttons',
      'Gauge': 'Two-Ply Chunky Cable Knit',
      'Origin': 'Biella, Italy',
      'Occasion': 'Country Club, Weekend Retreat'
    },
    tags: ['Cashmere', 'Old Money Knit', 'Loro Piana', 'Quiet Luxury']
  },
  {
    id: 'prod-4',
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
    rating: 4.9,
    ratingCount: 164,
    isBestseller: true,
    isLuxe: true,
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900&auto=format&fit=crop&q=85'
    ],
    colors: [
      { name: 'Charcoal Melange Flannel', hex: '#374151', imageIndex: 0 },
      { name: 'Oatmeal Tweed Flannel', hex: '#d6d3d1', imageIndex: 0 }
    ],
    sizes: ['30', '32', '34', '36', '38'],
    stockPerSize: { '30': 4, '32': 10, '34': 14, '36': 8, '38': 3 },
    description: 'Heirloom menswear tailoring featuring an extended Gurkha crossover waistband with brass side buckles, deep forward double pleats, and 2-inch turn-up cuffed hems.',
    fabricCare: ['100% British Wool Flannel (340gsm)', 'Dry Clean Only'],
    specifications: {
      'Waistband': 'Extended Gurkha Double-Buckle Band',
      'Pleats': 'Deep Forward Double Inward Pleats',
      'Hem': '2-Inch (5cm) Cuffed Turn-Up',
      'Occasion': 'Sartorial Autumn & Winter Tailoring'
    },
    tags: ['Gurkha Trousers', 'Wool Flannel', 'High Waist', 'Old Money Tailoring']
  },
  {
    id: 'prod-5',
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
      { name: 'Crisp Optic White', hex: '#ffffff', imageIndex: 0 },
      { name: 'Sky Blue Herringbone', hex: '#e0f2fe', imageIndex: 0 }
    ],
    sizes: ['39 (15.5)', '40 (15.75)', '41 (16)', '42 (16.5)'],
    stockPerSize: { '39 (15.5)': 6, '40 (15.75)': 12, '41 (16)': 15, '42 (16.5)': 9 },
    description: 'Woven from extra long-staple 140/2 Egyptian Giza cotton with a silky poplin hand-feel, semi-spread cutaway collar, and French double cuffs with mother-of-pearl buttons.',
    fabricCare: ['100% Egyptian Giza Cotton', 'Machine wash gentle warm', 'Warm iron'],
    specifications: {
      'Collar': 'Cutaway Semi-Spread Collar',
      'Cuff': 'French Double Cuffs for Cufflinks',
      'Buttons': 'Australian Mother-of-Pearl',
      'Occasion': 'Formal Business & Black-Tie'
    },
    tags: ['Dress Shirt', 'French Cuff', 'Giza Cotton', 'Brioni']
  },
  {
    id: 'prod-6',
    title: 'Hand-Burnished Goodyear-Welted Leather Penny Loafers',
    slug: 'goodyear-welted-leather-penny-loafers',
    brand: "Huntsman Savile Row",
    brandId: 'b8',
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
      { name: 'Oxblood Cordovan', hex: '#4a0e17', imageIndex: 0 },
      { name: 'Espresso Calf', hex: '#291e17', imageIndex: 0 }
    ],
    sizes: ['7 UK', '8 UK', '9 UK', '10 UK', '11 UK'],
    stockPerSize: { '7 UK': 3, '8 UK': 7, '9 UK': 11, '10 UK': 6, '11 UK': 2 },
    description: 'Full-grain French calf leather constructed with Goodyear welted oak bark tanned leather soles and hand-antiqued patina. The definitive footwear of the old-money aesthetic.',
    fabricCare: ['Full-Grain Calf Leather', 'Polish with natural beeswax'],
    specifications: {
      'Construction': 'Goodyear Welted 360 Degree',
      'Sole': 'Oak Bark Tanned Leather Sole',
      'Made in': 'Northampton, England'
    },
    tags: ['Penny Loafers', 'Goodyear Welt', 'Dress Shoes', 'Northampton']
  },
  {
    id: 'prod-7',
    title: 'Double-Breasted Pure Cashmere Camel Chesterfield Overcoat',
    slug: 'pure-cashmere-camel-chesterfield-overcoat',
    brand: 'Savile Row Bespoke',
    brandId: 'b1',
    gender: 'men',
    category: 'Knitwear & Sweaters',
    subCategory: 'Overcoats & Trench',
    mrp: 42999,
    price: 21499,
    discountPercentage: 50,
    rating: 4.9,
    ratingCount: 178,
    isBestseller: true,
    isLuxe: true,
    images: [
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&auto=format&fit=crop&q=85'
    ],
    colors: [
      { name: 'Camel Melange', hex: '#c19a6b', imageIndex: 0 },
      { name: 'Charcoal Black', hex: '#1c1c1c', imageIndex: 1 }
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    stockPerSize: { '38R': 3, '40R': 6, '42R': 9, '44R': 4 },
    description: 'Hand-tailored from 100% heavy-weight Scottish cashmere. Features a velvet contrast top collar, peak lapels, horn buttons, and deep welt pockets.',
    fabricCare: ['100% Pure Scottish Cashmere', 'Velvet Collar Trim', 'Specialist Dry Clean Only'],
    specifications: {
      'Collar': 'Black Cotton Velvet Chesterfield Collar',
      'Closure': 'Six-on-Two Double Breasted',
      'Length': 'Below Knee Tailored Overcoat'
    },
    tags: ['Chesterfield Coat', 'Cashmere Overcoat', 'Savile Row']
  },
  {
    id: 'prod-8',
    title: 'Italian Silk-Cotton Knit Short-Sleeve Polo Shirt',
    slug: 'italian-silk-cotton-knit-polo-shirt',
    brand: 'Loro Piana Atelier',
    brandId: 'b5',
    gender: 'men',
    category: 'Shirts & Polos',
    subCategory: 'Knitted Polos & Casual',
    mrp: 11999,
    price: 5999,
    discountPercentage: 50,
    rating: 4.8,
    ratingCount: 142,
    isBestseller: false,
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=900&auto=format&fit=crop&q=85'
    ],
    colors: [
      { name: 'Navy Blue Melange', hex: '#1e3a8a', imageIndex: 0 },
      { name: 'Stone Ecru', hex: '#e7e5e4', imageIndex: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockPerSize: { 'S': 6, 'M': 12, 'L': 14, 'XL': 5 },
    description: 'Spun in Biella, Italy from a luxurious 70% Mulberry silk and 30% long-staple cotton blend. Features a ribbed camp collar and buttonless Johnny collar placket.',
    fabricCare: ['70% Silk, 30% Long-Staple Cotton', 'Hand wash cold or dry clean'],
    specifications: {
      'Collar': 'Open Johnny Spread Collar',
      'Knit': 'Fine 18-Gauge Flat Knit',
      'Origin': 'Biella, Italy'
    },
    tags: ['Silk Polo', 'Loro Piana', 'Riviera Style', 'Quiet Luxury']
  }
];
