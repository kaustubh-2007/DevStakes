export const products = [
  {
    id: 1,
    name: 'Organic Red Tomatoes',
    price: 40,
    unit: 'kg',
    farmer: 'Green Valley Farm',
    rating: 4.8,
    category: 'Vegetables',
    image: '/assets/tomatoes.png',
    description: 'Fresh, vine-ripened organic tomatoes packed with flavor. Grown without synthetic pesticides.'
  },
  {
    id: 2,
    name: 'Crisp Orchard Apples',
    price: 120,
    unit: 'kg',
    farmer: 'Sunny Hill Orchards',
    rating: 4.9,
    category: 'Fruits',
    image: '/assets/apples.png',
    description: 'Hand-picked, perfectly crisp apples directly from our orchard.'
  },
  {
    id: 3,
    name: 'Rustic Farm Potatoes',
    price: 30,
    unit: 'kg',
    farmer: 'Earth Roots Co.',
    rating: 4.6,
    category: 'Vegetables',
    image: '/assets/potatoes.png',
    description: 'Freshly harvested organic potatoes, perfect for mashing, roasting, or boiling.'
  },
  {
    id: 4,
    name: 'Golden Sweet Corn',
    price: 25,
    unit: 'kg',
    farmer: 'Sunshine Acres',
    rating: 4.7,
    category: 'Vegetables',
    image: '/assets/corn.png',
    description: 'Freshly harvested organic golden sweet corn perfect for roasting or boiling.'
  },
  {
    id: 5,
    name: 'Organic Golden Wheat',
    price: 55,
    unit: 'kg',
    farmer: 'Amber Waves Farm',
    rating: 4.5,
    category: 'Grains',
    image: '/assets/wheat.png',
    description: 'High quality golden organic wheat stalks harvested with care.'
  },
  {
    id: 6,
    name: 'Ripe Yellow Mangoes',
    price: 150,
    unit: 'kg',
    farmer: 'Tropical Harvest',
    rating: 4.9,
    category: 'Fruits',
    image: '/assets/mango.png',
    description: 'Fresh, sweet, and juicy hand-picked tropical organic yellow mangoes.'
  }
]

export const mockOrders = [
  {
    id: 'ORD-29381',
    date: 'Apr 08, 2026',
    total: 1250.5,
    status: 'Delivered',
    items: 3,
    delivery: 'Delivered on Apr 12',
    cart: [
      { name: 'Organic Red Tomatoes', qty: 2, price: 40 },
      { name: 'Rustic Farm Potatoes', qty: 3, price: 30 }
    ]
  },
  {
    id: 'ORD-29302',
    date: 'Apr 02, 2026',
    total: 600,
    status: 'In Transit',
    items: 1,
    delivery: 'Expected Apr 10',
    cart: [
      { name: 'Ripe Yellow Mangoes', qty: 4, price: 150 }
    ]
  },
  {
    id: 'ORD-29274',
    date: 'Mar 28, 2026',
    total: 860,
    status: 'Delivered',
    items: 2,
    delivery: 'Delivered on Apr 02',
    cart: [
      { name: 'Golden Sweet Corn', qty: 6, price: 25 },
      { name: 'Organic Golden Wheat', qty: 5, price: 55 }
    ]
  }
]

export const heroImage = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop'
