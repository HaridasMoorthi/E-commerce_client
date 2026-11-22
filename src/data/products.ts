import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Floral Embroidered Anarkali Kurta with Dupatta & Pants Set',
    slug: 'floral-embroidered-anarkali-kurta-set',
    brand: 'Biba',
    brandId: 'b3',
    gender: 'women',
    category: 'Indianwear',
    subCategory: 'Kurta Sets & Suits',
    mrp: 4999,
    price: 2499,
    discountPercentage: 50,
    rating: 4.6,
    ratingCount: 382,
    isBestseller: true,
    isDealOfTheDay: true,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Emerald Green', hex: '#005f40', imageIndex: 0 },
      { name: 'Ruby Wine', hex: '#6b1129', imageIndex: 1 }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stockPerSize: { 'XS': 3, 'S': 8, 'M': 12, 'L': 6, 'XL': 2, 'XXL': 0 },
    description: 'Grace every festive evening in this meticulously embroidered Anarkali Kurta Set. Woven from breathable pure chanderi silk with delicate zari detailing, paired with matching cigarette trousers and an ethereal organza dupatta.',
    fabricCare: ['Pure Chanderi Silk Blend with Organza Dupatta', 'Dry Clean Only', 'Steam iron at low heat'],
    specifications: {
      'Sleeve Length': 'Three-Quarter Sleeves',
      'Neckline': 'Sweetheart Neck',
      'Fit': 'Anarkali Flared Fit',
      'Weave Type': 'Machine Weave with Hand Zari Work',
      'Occasion': 'Festive & Wedding Reception'
    },
    tags: ['Festive', 'Silk', 'Best Seller', 'Biba Signature']
  },
  {
    id: 'prod-2',
    title: 'Emerald Green Satin Pleated Slip Midi Party Dress',
    slug: 'emerald-green-satin-slip-midi-dress',
    brand: 'RSVP Atelier',
    brandId: 'b1',
    gender: 'women',
    category: 'Westernwear',
    subCategory: 'Dresses',
    mrp: 3290,
    price: 1645,
    discountPercentage: 50,
    rating: 4.4,
    ratingCount: 198,
    isBestseller: true,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Emerald Green', hex: '#0d5c3a', imageIndex: 0 },
      { name: 'Midnight Black', hex: '#111827', imageIndex: 1 }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stockPerSize: { 'XS': 4, 'S': 9, 'M': 15, 'L': 5, 'XL': 1 },
    description: 'Turn heads at dinner parties and cocktail soirees in RSVP’s lustrous satin slip dress. Tailored with a graceful cowl drape, adjustable spaghetti straps, and a side leg slit for an effortless hourglass silhouette.',
    fabricCare: ['100% Premium Poly-Satin', 'Hand wash cold or gentle machine wash', 'Do not bleach'],
    specifications: {
      'Length': 'Midi (Below Knee)',
      'Sleeve': 'Sleeveless / Adjustable Straps',
      'Neckline': 'Cowl Neck',
      'Fit': 'Regular Slim Slip',
      'Occasion': 'Cocktail, Evening & Party'
    },
    tags: ['RSVP Exclusive', 'Satin', 'Cocktail Chic']
  },
  {
    id: 'prod-3',
    title: 'Botanical Foil Print Raw Silk Festive Lehenga Choli Set',
    slug: 'botanical-foil-print-silk-lehenga-set',
    brand: 'House of Masaba',
    brandId: 'b4',
    gender: 'women',
    category: 'Indianwear',
    subCategory: 'Lehengas & Blouses',
    mrp: 35000,
    price: 24500,
    discountPercentage: 30,
    rating: 4.9,
    ratingCount: 64,
    isLuxe: true,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Mustard Gold', hex: '#d4af37', imageIndex: 0 },
      { name: 'Rani Pink', hex: '#e11d48', imageIndex: 1 }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockPerSize: { 'S': 2, 'M': 4, 'L': 2, 'XL': 0 },
    description: 'An iconic runway creation by House of Masaba. Features signature botanical foil motifs embossed on pure raw silk, matched with a structured sweetheart-neck blouse and a hand-tasseled dupatta.',
    fabricCare: ['Pure Raw Silk with Crepe Lining', 'Strictly Professional Dry Clean Only'],
    specifications: {
      'Flared Hem': '4.5 Meters Gher',
      'Closure': 'Concealed Side Zipper with Handcrafted Latkans',
      'Pattern': 'Signature Masaba Foil Print',
      'Occasion': 'Wedding, Sangeet & Reception'
    },
    tags: ['Old Money Luxe', 'Designer Couture', 'Runway', 'Masaba Original']
  },
  {
    id: 'prod-4',
    title: 'Double-Breasted Tailored Houndstooth Blazer',
    slug: 'double-breasted-houndstooth-blazer',
    brand: 'Vero Moda',
    brandId: 'b5',
    gender: 'women',
    category: 'Westernwear',
    subCategory: 'Jackets & Blazers',
    mrp: 4499,
    price: 2249,
    discountPercentage: 50,
    rating: 4.3,
    ratingCount: 112,
    images: [
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Black & White Houndstooth', hex: '#374151', imageIndex: 0 }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stockPerSize: { 'XS': 5, 'S': 7, 'M': 10, 'L': 4 },
    description: 'Power dressing redefined. Structured shoulders, peaked lapels, and tortoise-shell buttons make this double-breasted houndstooth blazer a desk-to-dinner powerhouse.',
    fabricCare: ['Viscose Poly Tweed Blend', 'Dry clean recommended'],
    specifications: {
      'Sleeve': 'Full Sleeve with Buttoned Cuffs',
      'Closure': 'Double-Breasted Tortoise Buttons',
      'Fit': 'Structured Regular Fit',
      'Pockets': 'Dual Flap Pockets'
    },
    tags: ['Workwear', 'Power Suit', 'Autumn Edit']
  },
  {
    id: 'prod-5',
    title: 'Men Handloom Embroidered Cotton Silk Kurta Set',
    slug: 'men-handloom-embroidered-cotton-silk-kurta-set',
    brand: 'House of Pataudi',
    brandId: 'b10',
    gender: 'men',
    category: 'Topwear',
    subCategory: 'Ethnic Wear',
    mrp: 3999,
    price: 1999,
    discountPercentage: 50,
    rating: 4.5,
    ratingCount: 220,
    isDealOfTheDay: true,
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Ivory Cream', hex: '#fdfbf7', imageIndex: 0 },
      { name: 'Royal Navy', hex: '#1e3a8a', imageIndex: 1 }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockPerSize: { 'S': 4, 'M': 14, 'L': 12, 'XL': 8, 'XXL': 3 },
    description: 'Infused with royal Nawabi heritage, this pristine cotton-silk kurta features subtle thread embroidery on the mandarin collar and placket, accompanied by matching churidar pyjamas.',
    fabricCare: ['Cotton Silk Blend', 'Dry clean or delicate cold hand wash'],
    specifications: {
      'Collar': 'Mandarin Band Collar',
      'Length': 'Knee Length',
      'Sleeve': 'Full Sleeves with Cuffs',
      'Bottom': 'Drawstring Churidar Included'
    },
    tags: ['Pataudi Heritage', 'Festive Kurta', 'Men Fashion']
  },
  {
    id: 'prod-6',
    title: 'Textured Croc-Embossed Vegan Leather Tote Bag',
    slug: 'croc-embossed-vegan-leather-tote',
    brand: 'Twenty Dresses',
    brandId: 'b2',
    gender: 'women',
    category: 'Jewellery & Bags',
    subCategory: 'Handbags & Totes',
    mrp: 2790,
    price: 1395,
    discountPercentage: 50,
    rating: 4.2,
    ratingCount: 145,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=900&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Cognac Tan', hex: '#92400e', imageIndex: 0 },
      { name: 'Classic Black', hex: '#000000', imageIndex: 1 }
    ],
    sizes: ['One Size'],
    stockPerSize: { 'One Size': 18 },
    description: 'Spacious and sophisticated, this croc-embossed tote easily accommodates a 13-inch laptop, planner, cosmetic pouch, and daily essentials with a secure top zip closure.',
    fabricCare: ['PETA-Approved Cruelty-Free Vegan Leather', 'Wipe clean with a damp cloth'],
    specifications: {
      'Compartments': '1 Main Compartment + 2 Slip Pockets + 1 Zipper Pocket',
      'Handle': 'Dual Flat Shoulder Straps (Drop 25cm)',
      'Hardware': 'Gold-Tone Polished Metal Hardware'
    },
    tags: ['Vegan Leather', 'Work Tote', 'Everyday Luxury']
  },
  {
    id: 'prod-7',
    title: 'Kundan & Freshwater Pearl Chandelier Jhumka Earrings',
    slug: 'kundan-freshwater-pearl-jhumka-earrings',
    brand: 'Gajra Gang',
    brandId: 'b6',
    gender: 'women',
    category: 'Jewellery & Bags',
    subCategory: 'Earrings & Necklaces',
    mrp: 1999,
    price: 899,
    discountPercentage: 55,
    rating: 4.7,
    ratingCount: 310,
    isBestseller: true,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Gold & Ivory', hex: '#eab308', imageIndex: 0 }
    ],
    sizes: ['Free Size'],
    stockPerSize: { 'Free Size': 25 },
    description: 'Statement handcrafted jhumkas adorned with luminous faux Kundan stones, emerald-hued enameling, and delicate hanging freshwater pearl drops.',
    fabricCare: ['Brass Base with 22K Gold Micro-Plating', 'Store in airtight box away from perfumes'],
    specifications: {
      'Closure': 'Post and Back with Cushion',
      'Weight': 'Lightweight Hollow Alloy (32g pair)',
      'Dimensions': '8cm Length x 3.5cm Width'
    },
    tags: ['Gajra Gang', 'Jhumkas', 'Kundan', 'Bridal Jewelry']
  },
  {
    id: 'prod-8',
    title: 'Strap Chunky Platform Block Heel Sandals',
    slug: 'strap-chunky-platform-block-heels',
    brand: 'Twenty Dresses',
    brandId: 'b2',
    gender: 'women',
    category: 'Footwear',
    subCategory: 'Heels & Pumps',
    mrp: 2999,
    price: 1499,
    discountPercentage: 50,
    rating: 4.4,
    ratingCount: 88,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Nude Beige', hex: '#d1b89d', imageIndex: 0 },
      { name: 'Pitch Black', hex: '#18181b', imageIndex: 1 }
    ],
    sizes: ['36 (UK 3)', '37 (UK 4)', '38 (UK 5)', '39 (UK 6)', '40 (UK 7)'],
    stockPerSize: { '36 (UK 3)': 2, '37 (UK 4)': 6, '38 (UK 5)': 8, '39 (UK 6)': 4, '40 (UK 7)': 1 },
    description: 'Stay poised without sacrificing comfort. Features cushioned memory-foam footbeds, adjustable ankle buckle straps, and a stable 3.5-inch block heel supported by a 1-inch front platform.',
    fabricCare: ['Premium Faux Leather Upper with Anti-Slip Resin Sole'],
    specifications: {
      'Heel Height': '3.5 Inches (9 cm)',
      'Toe Shape': 'Open Square Toe',
      'Fastening': 'Ankle Strap with Golden Buckle'
    },
    tags: ['Block Heels', 'Comfort Footwear', 'Party Ready']
  },
  {
    id: 'prod-9',
    title: 'Tarun Tahiliani Hand-Embroidered Zardozi Raw Silk Festive Anarkali',
    slug: 'tarun-tahiliani-zardozi-silk-anarkali',
    brand: 'Tarun Tahiliani',
    brandId: 'b7',
    gender: 'women',
    category: 'Indianwear',
    subCategory: 'Anarkali Suits',
    mrp: 18999,
    price: 12999,
    discountPercentage: 32,
    rating: 4.9,
    ratingCount: 142,
    isLuxe: true,
    isBestseller: true,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Ivory Cream', hex: '#fdfbf7', imageIndex: 0 },
      { name: 'Ruby Vermillion', hex: '#991b1b', imageIndex: 1 }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockPerSize: { 'S': 3, 'M': 5, 'L': 4, 'XL': 1 },
    description: 'An ethereal heirloom ensemble adorned with intricate zardozi wirework, hand-cut micro-pearls, and a flowing scalloped organza dupatta.',
    fabricCare: ['Pure Chanderi Silk with Chiffon Dupatta', 'Dry Clean Only'],
    specifications: {
      'Silhouette': 'Floor-Length Flared Anarkali',
      'Neckline': 'Keyhole Mandarine Collar',
      'Occasion': 'Royal Wedding & Gala Reception'
    },
    tags: ['Tarun Tahiliani', 'Old Money Luxe', 'Haute Couture']
  },
  {
    id: 'prod-10',
    title: 'Mulberry Silk Bias-Cut Evening Gala Slip Midi Dress',
    slug: 'mulberry-silk-bias-cut-evening-slip-dress',
    brand: 'RSVP Atelier',
    brandId: 'b1',
    gender: 'women',
    category: 'Westernwear',
    subCategory: 'Dresses',
    mrp: 8999,
    price: 4499,
    discountPercentage: 50,
    rating: 4.8,
    ratingCount: 96,
    isLuxe: true,
    isDealOfTheDay: true,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#d4af37', imageIndex: 0 },
      { name: 'Noir Silk', hex: '#111827', imageIndex: 1 }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stockPerSize: { 'XS': 2, 'S': 6, 'M': 8, 'L': 4, 'XL': 2 },
    description: 'Cut on the true bias from lustrous 100% pure Mulberry silk charmeuse with French seams and an elegant draped cowl back.',
    fabricCare: ['100% Mulberry Silk', 'Specialist Dry Clean Only'],
    specifications: {
      'Silhouette': 'Bias Cut Slip Midi',
      'Fit': 'Fluid Body-Skimming Fit',
      'Occasion': 'Evening Soiree & Cocktail Gala'
    },
    tags: ['Mulberry Silk', 'Old Money Luxe', 'RSVP Atelier']
  },
  {
    id: 'prod-11',
    title: 'Banarasi Pure Katan Silk Zari Brocade Royal Bridal Saree',
    slug: 'banarasi-pure-katan-silk-zari-brocade-saree',
    brand: 'Sabyasachi Heritage',
    brandId: 'b8',
    gender: 'women',
    category: 'Indianwear',
    subCategory: 'Sarees',
    mrp: 45000,
    price: 31500,
    discountPercentage: 30,
    rating: 5.0,
    ratingCount: 78,
    isLuxe: true,
    isBestseller: true,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Royal Crimson', hex: '#881337', imageIndex: 0 },
      { name: 'Heritage Rani Pink', hex: '#be185d', imageIndex: 1 }
    ],
    sizes: ['Free Size (5.5m + 0.8m Blouse)'],
    stockPerSize: { 'Free Size (5.5m + 0.8m Blouse)': 3 },
    description: 'Woven over 45 days on traditional pit looms in Varanasi. Features pure silver-gilt zari jaal across pure mulberry katan silk with a regal meenakari pallu.',
    fabricCare: ['Pure Katan Silk with Real Zari', 'Specialist Dry Clean Only', 'Store in Muslin Cloth'],
    specifications: {
      'Weave': 'Handwoven Kadwa Technique',
      'Blouse Piece': 'Included (0.8 Meters Brocade Silk)',
      'Occasion': 'Bridal & Grand Wedding Gala'
    },
    tags: ['Sabyasachi Heritage', 'Handloom', 'Pure Katan Silk', 'Old Money Luxe']
  }
];
