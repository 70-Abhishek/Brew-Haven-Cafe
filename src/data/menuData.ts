import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // COFFEE
  {
    id: 'm1',
    name: 'Signature Velvet Flat White',
    category: 'coffee',
    description: 'Double ristretto shot of our Ethiopian Yirgacheffe roasted bean with micro-foamed silky whole milk.',
    price: 4.80,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80',
    tags: ['Popular', 'Organic'],
    calories: 140,
    prepTimeMinutes: 4,
    rating: 4.9,
    customizationOptions: {
      milk: ['Whole Milk', 'Oat Milk', 'Almond Milk', 'Coconut Milk'],
      sweetness: ['Unsweetened', 'Light Honey', 'Vanilla Bean', 'Caramel'],
      extras: [
        { name: 'Extra Espresso Shot', price: 1.00 },
        { name: 'Whipped Cream', price: 0.50 }
      ]
    }
  },
  {
    id: 'm2',
    name: 'Artisan Salted Caramel Latte',
    category: 'coffee',
    description: 'Rich espresso, steamed oat milk, handcrafted slow-simmered caramel sauce, and a pinch of Himalayan pink salt.',
    price: 5.40,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    tags: ['Chef Special', 'Popular'],
    calories: 220,
    prepTimeMinutes: 5,
    rating: 4.95,
    customizationOptions: {
      milk: ['Oat Milk', 'Whole Milk', 'Almond Milk'],
      sweetness: ['Standard', 'Less Sweet', 'Extra Sweet'],
      extras: [{ name: 'Extra Espresso Shot', price: 1.00 }]
    }
  },
  {
    id: 'm3',
    name: 'Cold Brew Nitro Cascade',
    category: 'coffee',
    description: '18-hour steep dark roast infused with nitrogen for a velvety texture, naturally sweet undertones, and cascading crema.',
    price: 5.20,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    tags: ['Cold', 'Zero Sugar'],
    calories: 10,
    prepTimeMinutes: 2,
    rating: 4.8,
    customizationOptions: {
      sweetness: ['Unsweetened', 'Vanilla Cold Foam', 'Sweet Cream'],
      extras: [{ name: 'Vanilla Cold Foam', price: 1.20 }]
    }
  },
  {
    id: 'm4',
    name: 'Matcha Espresso Fusion',
    category: 'coffee',
    description: 'Layered Uji ceremonial grade matcha green tea, creamy oat milk, topped with a fresh ristretto espresso float.',
    price: 5.90,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    tags: ['Special', 'Superfood'],
    calories: 180,
    prepTimeMinutes: 5,
    rating: 4.85,
    customizationOptions: {
      milk: ['Oat Milk', 'Almond Milk', 'Soy Milk'],
      sweetness: ['Light Agave', 'Standard', 'Unsweetened']
    }
  },

  // FAST FOOD & SAVORY
  {
    id: 'm5',
    name: 'Truffle & Aged Cheddar Smash Burger',
    category: 'fast_food',
    description: 'Double grass-fed beef patties, black truffle aioli, 12-month aged sharp cheddar, caramelized onions on toasted brioche.',
    price: 13.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    tags: ['Popular', 'Chef Special'],
    calories: 780,
    prepTimeMinutes: 12,
    rating: 4.92,
    customizationOptions: {
      extras: [
        { name: 'Crispy Bacon Strips', price: 2.00 },
        { name: 'Extra Cheese', price: 1.50 },
        { name: 'Side Truffle Fries', price: 3.50 }
      ]
    }
  },
  {
    id: 'm6',
    name: 'Avocado & Burrata Toast Supreme',
    category: 'fast_food',
    description: 'Sourdough slice, smashed avocado, fresh Italian burrata ball, heirloom cherry tomatoes, pomegranate seeds, balsamic glaze.',
    price: 11.50,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    tags: ['Vegetarian', 'Healthy'],
    calories: 420,
    prepTimeMinutes: 8,
    rating: 4.88,
    customizationOptions: {
      extras: [
        { name: 'Poached Egg', price: 1.50 },
        { name: 'Smoked Salmon Slice', price: 3.50 }
      ]
    }
  },
  {
    id: 'm7',
    name: 'Gourmet Crispy Chicken Panini',
    category: 'fast_food',
    description: 'Buttermilk fried chicken breast, melted provolone, avocado smash, sun-dried tomato pesto on pressed ciabatta.',
    price: 12.40,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    tags: ['Hot Pressed', 'Spicy Option'],
    calories: 650,
    prepTimeMinutes: 10,
    rating: 4.82,
    customizationOptions: {
      extras: [
        { name: 'Jalapeño Kick', price: 0.75 },
        { name: 'Extra Pesto', price: 0.75 }
      ]
    }
  },
  {
    id: 'm8',
    name: 'Artisan Club Sandwich & Garlic Herb Fries',
    category: 'fast_food',
    description: 'Triple decker toasted sourdough with smoked turkey, honey bacon, crisp romaine lettuce, farm tomatoes, basil aioli.',
    price: 12.80,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    tags: ['Classic', 'Hearty'],
    calories: 710,
    prepTimeMinutes: 10,
    rating: 4.79
  },

  // DESSERTS
  {
    id: 'm9',
    name: 'Espresso Injected Tiramisu',
    category: 'desserts',
    description: 'House-baked ladyfingers soaked in dark roasted espresso and Kahlua, layered with cloud-like mascarpone and cocoa powder.',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    tags: ['Chef Special', 'Vegetarian'],
    calories: 390,
    prepTimeMinutes: 3,
    rating: 4.96
  },
  {
    id: 'm10',
    name: 'Warm Pistachio & Dark Chocolate Croissant',
    category: 'desserts',
    description: 'Flaky 81-layer French butter croissant stuffed with rich pistachio praline cream and dusted with Belgian dark chocolate shavings.',
    price: 5.80,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    tags: ['Freshly Baked', 'Popular'],
    calories: 340,
    prepTimeMinutes: 2,
    rating: 4.91
  },
  {
    id: 'm11',
    name: 'Baked Berry Vanilla Bean Cheesecake',
    category: 'desserts',
    description: 'New York style slow-baked cheesecake topped with wild strawberry compote, fresh blueberries, and mint leaf.',
    price: 7.20,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    tags: ['Vegetarian', 'Smooth'],
    calories: 450,
    prepTimeMinutes: 3,
    rating: 4.87
  },

  // BEVERAGES
  {
    id: 'm12',
    name: 'Hibiscus Dragonfruit Sparkler',
    category: 'beverages',
    description: 'Steeped organic hibiscus blossom tea, red dragonfruit puree, fresh lime juice, sparkle soda water, served over crushed ice.',
    price: 4.90,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    tags: ['Refreshing', 'Vegan'],
    calories: 110,
    prepTimeMinutes: 3,
    rating: 4.88,
    customizationOptions: {
      sweetness: ['Standard', 'Low Sugar', 'Extra Honey']
    }
  },
  {
    id: 'm13',
    name: 'Fresh Cold-Pressed Immunity Citrus Juice',
    category: 'beverages',
    description: 'Valencia orange, pink grapefruit, yellow ginger, turmeric root, and raw blossom honey pressed fresh daily.',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
    tags: ['Raw', 'Immunity Boost', 'Vegan'],
    calories: 130,
    prepTimeMinutes: 2,
    rating: 4.84
  },

  // SPECIALS
  {
    id: 'm14',
    name: 'Smoked Salmon & Caviar Eggs Benedict',
    category: 'specials',
    description: 'Poached organic free-range eggs on toasted brioche, Norwegian smoked salmon, citrus hollandaise, topped with black caviar.',
    price: 16.50,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    tags: ['Luxury', 'Breakfast Special'],
    calories: 580,
    prepTimeMinutes: 12,
    rating: 4.98
  },
  {
    id: 'm15',
    name: 'Artisan Tasting Platter for Two',
    category: 'specials',
    description: 'Selection of artisanal cheeses, cured prosciutto, sourdough toast, fig jam, roasted nuts, seasonal fruits, and double dip.',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80',
    tags: ['Sharing', 'Evening Special'],
    calories: 920,
    prepTimeMinutes: 10,
    rating: 4.94
  }
];
