import React, { useState } from 'react';
import {
  ShoppingBag,
  X,
  MapPin,
  Phone,
  User,
  CreditCard,
  UtensilsCrossed,
  Truck,
  Store,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import { Order } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, subtotal, tax, clearCart, setActiveOrderId, setIsTrackerOpen } = useCart();
  const { user } = useAuth();

  const [orderType, setOrderType] = useState<'dine_in' | 'pickup' | 'delivery'>('pickup');
  const [userName, setUserName] = useState(user?.displayName || '');
  const [userEmail, setUserEmail] = useState(user?.email || '');
  const [userPhone, setUserPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('Table 4');
  const [selectedTipPercent, setSelectedTipPercent] = useState<number>(15);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tipAmount = Number(((subtotal * selectedTipPercent) / 100).toFixed(2));
  const deliveryFee = orderType === 'delivery' ? 3.50 : 0;
  const grandTotal = subtotal + tax + tipAmount + deliveryFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!userName.trim() || !userPhone.trim()) {
      alert('Please fill in your name and phone number.');
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      alert('Please enter your delivery address.');
      return;
    }

    try {
      setIsSubmitting(true);

      const formattedItems = cart.map(c => {
        const customizations = [
          c.selectedMilk && `Milk: ${c.selectedMilk}`,
          c.selectedSweetness && `Sweetness: ${c.selectedSweetness}`,
          c.selectedExtras && c.selectedExtras.length > 0 && `Extras: ${c.selectedExtras.map(e => e.name).join(', ')}`,
          c.specialInstructions && `Note: ${c.specialInstructions}`
        ].filter(Boolean).join(' | ');

        return {
          name: c.item.name,
          quantity: c.quantity,
          price: c.itemTotal,
          customizations: customizations || ''
        };
      });

      // Determine userId if authenticated, otherwise leave undefined
      let userId = user?.id;
      if (!userId) {
        // If guest, try to get userId from localStorage (if guest login was done)
        try {
          const stored = localStorage.getItem('user');
          if (stored) {
            const parsed = JSON.parse(stored);
            userId = parsed?.id || parsed?._id || undefined;
          }
        } catch {}
      }

      const newOrder = {
        userId: userId, // may be undefined
        userName,
        userEmail: userEmail || 'guest@artisancafe.com',
        userPhone,
        orderType,
        deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
        tableNumber: orderType === 'dine_in' ? tableNumber : undefined,
        items: formattedItems,
        subtotal,
        tax,
        tip: tipAmount,
        total: grandTotal,
        paymentMethod,
        status: 'received',
        estimatedMinutes: orderType === 'delivery' ? 35 : 15,
        createdAt: new Date().toISOString()
      };

      const response = await api.post('/orders', newOrder);
      const savedOrder = response.data;
      clearCart();
      setActiveOrderId(savedOrder._id);

      // Store guest email so we can later fetch orders
      if (!user) {
        localStorage.setItem('guest_email', userEmail);
      }

      setIsSubmitting(false);
      onClose();
      setIsTrackerOpen(true);
    } catch (error: any) {
      console.error('Error placing order:', error);
      alert('Failed to place order: ' + (error.message || 'Please try again.'));
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-stone-900 rounded-3xl max-w-xl w-full my-8 overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 max-h-[90vh] flex flex-col"
        >
          <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-950/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-700 text-white shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">Order Checkout</h3>
                <p className="text-xs text-stone-500">Real-time kitchen order submission</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-200/50">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handlePlaceOrder} className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
            {/* Order Type */}
            <div className="space-y-2">
              <label className="block font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Choose Order Method:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'pickup', label: 'Counter Pickup', icon: Store, time: '12-15 Mins' },
                  { id: 'delivery', label: 'Door Delivery', icon: Truck, time: '30-40 Mins' },
                  { id: 'dine_in', label: 'Table Dine-In', icon: UtensilsCrossed, time: '10 Mins' }
                ].map(type => {
                  const Icon = type.icon;
                  const isSelected = orderType === type.id;
                  return (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => setOrderType(type.id as any)}
                      className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 border text-center transition-all ${
                        isSelected
                          ? 'bg-amber-700 text-white border-amber-700 shadow-md'
                          : 'bg-stone-50 dark:bg-stone-800/80 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-bold">{type.label}</span>
                      <span className="text-[10px] opacity-80">{type.time}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customer Info */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Customer Information:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input type="text" required placeholder="e.g. Alex Morgan" value={userName} onChange={e => setUserName(e.target.value)} className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input type="tel" required placeholder="+91 98765 43210" value={userPhone} onChange={e => setUserPhone(e.target.value)} className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                  </div>
                </div>
              </div>
              {orderType === 'delivery' && (
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Delivery Address *</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                    <textarea rows={2} required placeholder="Enter street, area, landmark..." value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                  </div>
                </div>
              )}
              {orderType === 'dine_in' && (
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Table or Booth Number</label>
                  <input type="text" placeholder="e.g. Table 4 / Patio Booth 2" value={tableNumber} onChange={e => setTableNumber(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
              )}
            </div>

            {/* Tip */}
            <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <label className="block font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Add Chef & Barista Tip:</label>
              <div className="flex items-center gap-2">
                {[0, 10, 15, 20].map(pct => (
                  <button type="button" key={pct} onClick={() => setSelectedTipPercent(pct)} className={`flex-1 py-2 rounded-xl font-bold transition-all ${selectedTipPercent === pct ? 'bg-amber-700 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'}`}>
                    {pct === 0 ? 'No Tip' : `${pct}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <label className="block font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Payment Preference:</label>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setPaymentMethod('card')} className={`p-3 rounded-xl flex items-center justify-center gap-2 border font-semibold ${paymentMethod === 'card' ? 'bg-amber-700 text-white border-amber-700' : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700'}`}>
                  <CreditCard className="w-4 h-4" /><span>Credit / Debit Card</span>
                </button>
                <button type="button" onClick={() => setPaymentMethod('cash')} className={`p-3 rounded-xl flex items-center justify-center gap-2 border font-semibold ${paymentMethod === 'cash' ? 'bg-amber-700 text-white border-amber-700' : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700'}`}>
                  <Store className="w-4 h-4" /><span>Pay at Counter / Delivery</span>
                </button>
              </div>
            </div>

            {/* Bill Summary */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-1.5">
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-medium text-stone-800 dark:text-stone-200">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Tax (8%)</span>
                <span className="font-medium text-stone-800 dark:text-stone-200">₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Staff Tip ({selectedTipPercent}%)</span>
                <span className="font-medium text-stone-800 dark:text-stone-200">₹{tipAmount.toFixed(2)}</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200">₹{deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm text-stone-900 dark:text-stone-100 pt-2 border-t border-stone-200 dark:border-stone-700">
                <span>Grand Total Due</span>
                <span className="text-amber-700 dark:text-amber-400 font-serif text-base">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs transition-colors shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 disabled:opacity-50">
              {isSubmitting ? <span>Sending Order to Kitchen...</span> : <><CheckCircle className="w-4 h-4" /><span>Confirm & Place Order (₹{grandTotal.toFixed(2)})</span></>}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};