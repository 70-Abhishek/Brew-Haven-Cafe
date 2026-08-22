import React, { useEffect, useState } from 'react';
import {
  Clock,
  X,
  CheckCircle2,
  ChefHat,
  Truck,
  ShoppingBag,
  Play,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../api/client';
import { Order, OrderStatus } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const OrderTrackerModal: React.FC = () => {
  const { activeOrderId, setActiveOrderId, isTrackerOpen, setIsTrackerOpen } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeOrderId) {
      setOrder(null);
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/orders/${activeOrderId}`);
        setOrder({ ...res.data, id: res.data._id });
      } catch (error) {
        console.error('Order fetch error:', error);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    const interval = setInterval(fetchOrder, 3000);
    return () => clearInterval(interval);
  }, [activeOrderId]);

  const advanceOrderStatus = async () => {
    if (!activeOrderId || !order) return;
    const stages: OrderStatus[] = ['received', 'preparing', 'ready', 'out_for_delivery', 'delivered'];
    const currentIndex = stages.indexOf(order.status as OrderStatus);
    if (currentIndex < stages.length - 1) {
      const nextStatus = stages[currentIndex + 1];
      try {
        await api.put(`/orders/${activeOrderId}/status`, { status: nextStatus });
      } catch (error) {
        console.error('Status update error:', error);
      }
    }
  };

  if (!isTrackerOpen) return null;

  const STATUS_STAGES = [
    { id: 'received', title: 'Order Received', desc: 'Sent directly to kitchen display', icon: ShoppingBag },
    { id: 'preparing', title: 'Kitchen Preparing', desc: 'Chefs & baristas crafting your items', icon: ChefHat },
    { id: 'ready', title: order?.orderType === 'delivery' ? 'Out for Delivery' : 'Ready at Counter', desc: order?.orderType === 'delivery' ? 'Rider heading to your location' : 'Ready for pickup or served to table', icon: Truck },
    { id: 'delivered', title: 'Order Complete', desc: 'Bon appétit! Enjoy your artisan meal', icon: CheckCircle2 }
  ];

  const getStageIndex = (status: string) => {
    if (status === 'received') return 0;
    if (status === 'preparing') return 1;
    if (status === 'ready' || status === 'out_for_delivery') return 2;
    if (status === 'delivered' || status === 'completed') return 3;
    return 0;
  };

  const currentStageIndex = order ? getStageIndex(order.status) : 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 flex flex-col max-h-[90vh]"
        >
          <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-600 text-white shadow-md">
                <Clock className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Real-Time Tracker
                </span>
                <h3 className="font-serif text-xl font-bold mt-1">Order #{activeOrderId?.slice(0, 8)}</h3>
              </div>
            </div>
            <button onClick={() => setIsTrackerOpen(false)} className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
            {loading ? (
              <div className="py-12 text-center text-stone-500">Loading order status...</div>
            ) : !order ? (
              <div className="py-12 text-center space-y-3">
                <p className="font-serif font-bold text-base text-stone-700 dark:text-stone-300">No Active Order Found</p>
                <p className="text-stone-500">Place an order from the menu to track kitchen progress.</p>
              </div>
            ) : (
              <>
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 flex items-center justify-between">
                  <div>
                    <span className="text-stone-500 dark:text-amber-300 block text-[11px]">Estimated Prep Time</span>
                    <span className="font-serif text-2xl font-bold text-amber-900 dark:text-amber-200">{order.estimatedMinutes} Mins</span>
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-amber-600 text-white font-bold text-xs uppercase tracking-wider">{order.status.replace(/_/g, ' ')}</span>
                </div>

                <div className="space-y-6 relative pl-4 border-l-2 border-stone-200 dark:border-stone-800 my-4">
                  {STATUS_STAGES.map((stage, idx) => {
                    const isPassed = currentStageIndex >= idx;
                    const isCurrent = currentStageIndex === idx;
                    const Icon = stage.icon;
                    return (
                      <div key={stage.id} className="relative pl-6">
                        <div className={`absolute -left-[25px] top-0.5 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${isCurrent ? 'bg-amber-600 text-white border-amber-400 ring-4 ring-amber-500/20' : isPassed ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-300 dark:border-stone-700'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className={`font-bold text-sm ${isCurrent ? 'text-amber-700 dark:text-amber-400' : 'text-stone-800 dark:text-stone-200'}`}>{stage.title}</h4>
                          <p className="text-stone-500 dark:text-stone-400 font-light mt-0.5">{stage.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
                  <h4 className="font-bold uppercase tracking-wider text-stone-500">Ordered Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-stone-50 dark:bg-stone-800/60 p-2.5 rounded-xl">
                        <div>
                          <span className="font-bold text-stone-800 dark:text-stone-200">{item.quantity}x {item.name}</span>
                          {item.customizations && <p className="text-[10px] text-stone-500">{item.customizations}</p>}
                        </div>
                        <span className="font-bold text-amber-700 dark:text-amber-400">₹{item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 flex justify-between font-bold text-sm text-stone-900 dark:text-stone-100">
                    <span>Total Amount Paid:</span>
                    <span className="text-amber-700 dark:text-amber-400 font-serif text-base">₹{order.total.toFixed(2)}</span>
                  </div>
                </div>

                {currentStageIndex < STATUS_STAGES.length - 1 && (
                  <button onClick={advanceOrderStatus} className="w-full py-3 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950/80 text-amber-800 dark:text-amber-200 font-semibold border border-amber-300 dark:border-amber-800 flex items-center justify-center gap-2 transition-colors mt-4">
                    <Play className="w-4 h-4 text-amber-600" />
                    <span>Simulate Kitchen Progress (Advance Status)</span>
                  </button>
                )}
              </>
            )}
          </div>

          <div className="p-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 text-center">
            <button onClick={() => setIsTrackerOpen(false)} className="px-6 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold text-xs">Close Tracker</button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};