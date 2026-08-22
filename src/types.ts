export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'fast_food' | 'desserts' | 'beverages' | 'specials';
  description: string;
  price: number;
  image: string;
  tags: string[]; // e.g., ['Vegetarian', 'Popular', 'Gluten-Free', 'Chef Special', 'Spicy']
  calories?: number;
  prepTimeMinutes?: number;
  rating?: number;
  customizationOptions?: {
    milk?: string[];
    sweetness?: string[];
    extras?: { name: string; price: number }[];
  };
}

export interface CartItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  selectedMilk?: string;
  selectedSweetness?: string;
  selectedExtras?: { name: string; price: number }[];
  itemTotal: number;
  specialInstructions?: string;
}

export interface Reservation {
  id?: string;
  userId?: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'Indoor Cozy Booth' | 'Sunlit Garden Patio' | 'Skyview Rooftop' | 'Private Lounge';
  specialRequest?: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export type OrderStatus = 'received' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'completed';

export interface Order {
  id?: string;
  userId?: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  orderType: 'dine_in' | 'pickup' | 'delivery';
  deliveryAddress?: string;
  tableNumber?: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    customizations?: string;
  }[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'online';
  status: OrderStatus;
  estimatedMinutes: number;
  createdAt: string;
}

export interface Review {
  id?: string;
  userId?: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  favoriteDish?: string;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'all' | 'interior' | 'coffee' | 'food' | 'vibe';
  imageUrl: string;
  caption: string;
}
