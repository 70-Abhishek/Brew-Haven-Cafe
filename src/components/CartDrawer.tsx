import React from 'react';
import {
  ShoppingBag,
  X,
  Trash2,
  ArrowRight,
  Plus,
  Minus,
  Sparkles,
  Receipt
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    tax,
    totalItemCount
  } = useCart();

  const grandTotal = subtotal + tax;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col justify-between text-stone-900 dark:text-stone-100"
            >
              <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold">Your Order Cart</h3>
                    <p className="text-xs text-stone-500">{totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} selected</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="p-12 text-center space-y-4 my-auto">
                  <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-lg font-bold">Your cart is empty</h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Add some handcrafted coffee, burgers, or fresh pastries from our menu!
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-3 rounded-xl bg-amber-700 text-white text-xs font-semibold shadow-md"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="p-6 space-y-4 overflow-y-auto flex-1 divide-y divide-stone-100 dark:divide-stone-800">
                  {cart.map(item => (
                    <div key={item.cartId} className="pt-4 first:pt-0 flex items-start gap-4">
                      <img
                        src={item.item.image}
                        alt={item.item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-200 dark:border-stone-800"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold font-serif">{item.item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-stone-400 hover:text-red-500 transition-colors p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400 space-y-0.5">
                          {item.selectedMilk && <p>Milk: {item.selectedMilk}</p>}
                          {item.selectedSweetness && <p>Sweetness: {item.selectedSweetness}</p>}
                          {item.selectedExtras && item.selectedExtras.length > 0 && (
                            <p>Extras: {item.selectedExtras.map(e => e.name).join(', ')}</p>
                          )}
                          {item.specialInstructions && (
                            <p className="italic text-stone-400">"{item.specialInstructions}"</p>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 p-1 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              className="w-5 h-5 rounded bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 flex items-center justify-center font-bold text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center text-xs font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                              className="w-5 h-5 rounded bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 flex items-center justify-center font-bold text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-bold text-xs text-amber-700 dark:text-amber-400">
                            ₹{item.itemTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <div className="p-6 bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 space-y-4">
                  <div className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
                    <div className="flex justify-between">
                      <span>Items Subtotal</span>
                      <span className="font-semibold text-stone-800 dark:text-stone-200">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Tax (8%)</span>
                      <span className="font-semibold text-stone-800 dark:text-stone-200">₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-stone-900 dark:text-stone-100 pt-2 border-t border-stone-200 dark:border-stone-800">
                      <span>Grand Total</span>
                      <span className="text-amber-700 dark:text-amber-400 font-serif text-lg">₹{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onOpenCheckout();
                    }}
                    className="w-full py-4 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs transition-colors shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 group"
                  >
                    <Receipt className="w-4 h-4" />
                    <span>Proceed to Order Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};