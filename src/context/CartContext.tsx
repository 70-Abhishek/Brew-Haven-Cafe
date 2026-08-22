import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, Order } from '../types';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (
    item: MenuItem,
    quantity?: number,
    selectedMilk?: string,
    selectedSweetness?: string,
    selectedExtras?: { name: string; price: number }[],
    specialInstructions?: string
  ) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  tax: number;
  totalItemCount: number;
  
  // Order Tracking State
  activeOrderId: string | null;
  setActiveOrderId: (id: string | null) => void;
  isTrackerOpen: boolean;
  setIsTrackerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('artisan_cafe_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(() => {
    return localStorage.getItem('artisan_cafe_active_order_id') || null;
  });
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('artisan_cafe_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (activeOrderId) {
      localStorage.setItem('artisan_cafe_active_order_id', activeOrderId);
    } else {
      localStorage.removeItem('artisan_cafe_active_order_id');
    }
  }, [activeOrderId]);

  const addToCart = (
    item: MenuItem,
    quantity = 1,
    selectedMilk?: string,
    selectedSweetness?: string,
    selectedExtras: { name: string; price: number }[] = [],
    specialInstructions = ''
  ) => {
    const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
    const unitPrice = item.price + extrasTotal;
    
    // Unique cart item identifier based on item id and customizations
    const cartId = `${item.id}_${selectedMilk || ''}_${selectedSweetness || ''}_${selectedExtras.map(e => e.name).sort().join('_')}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(c => c.cartId === cartId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          itemTotal: newQty * unitPrice,
          specialInstructions: specialInstructions || updated[existingIndex].specialInstructions
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            cartId,
            item,
            quantity,
            selectedMilk,
            selectedSweetness,
            selectedExtras,
            itemTotal: quantity * unitPrice,
            specialInstructions
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(c => c.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(prev =>
      prev.map(c => {
        if (c.cartId === cartId) {
          const unitPrice = c.itemTotal / c.quantity;
          return {
            ...c,
            quantity,
            itemTotal: unitPrice * quantity
          };
        }
        return c;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((sum, c) => sum + c.itemTotal, 0);
  const tax = Number((subtotal * 0.08).toFixed(2));
  const totalItemCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        tax,
        totalItemCount,
        activeOrderId,
        setActiveOrderId,
        isTrackerOpen,
        setIsTrackerOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
