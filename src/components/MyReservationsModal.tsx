import React, { useEffect, useState } from 'react';
import { Calendar, X, Clock, Users, MapPin, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import { Reservation } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface MyReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenNewBooking: () => void;
}

export const MyReservationsModal: React.FC<MyReservationsModalProps> = ({
  isOpen,
  onClose,
  onOpenNewBooking
}) => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch reservations – uses email from user, or falls back to stored guest email
  useEffect(() => {
    if (!isOpen) return;

    const fetchReservations = async () => {
      try {
        setLoading(true);
        
        // Get email: from user object, or from localStorage (for guests who made a booking)
        const userEmail = user?.email || localStorage.getItem('guest_email') || '';
        
        if (!userEmail) {
          // No email available – show empty state (or prompt to login)
          setReservations([]);
          setLoading(false);
          return;
        }

        const res = await api.get('/reservations', { params: { email: userEmail } });
        const list = res.data.map((item: any) => ({ ...item, id: item._id }));
        setReservations(list);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
    const interval = setInterval(fetchReservations, 5000);
    return () => clearInterval(interval);
  }, [isOpen, user?.email]);

  // Cancel a reservation
  const handleCancelReservation = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this table booking?')) return;
    try {
      await api.delete('/reservations/' + id);
      setReservations(prev => prev.filter(r => r.id !== id));
    } catch (err: any) {
      alert('Failed to cancel: ' + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-stone-900 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 flex flex-col max-h-[85vh]"
        >
          {/* HEADER */}
          <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-600 text-white shadow-md">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Your Bookings
                </span>
                <h3 className="font-serif text-xl font-bold mt-1">My Table Reservations</h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* LIST */}
          <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
            {loading ? (
              <div className="py-12 text-center text-stone-500">Loading reservations...</div>
            ) : reservations.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
                  <Calendar className="w-6 h-6" />
                </div>
                <p className="font-serif font-bold text-base text-stone-700 dark:text-stone-300">No Reservations Found</p>
                <p className="text-stone-500 max-w-xs mx-auto">You haven't reserved a table yet. Book a table for brunch, afternoon coffee, or dinner!</p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenNewBooking();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-700 text-white font-bold text-xs"
                >
                  Reserve a Table Now
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {reservations.map(res => (
                  <div
                    key={res.id}
                    className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-stone-200 dark:border-stone-700/60 pb-3">
                      <div>
                        <span className="font-bold text-sm text-stone-900 dark:text-stone-100 block">
                          {res.seatingArea}
                        </span>
                        <span className="text-[11px] text-stone-500">Reserved for {res.userName}</span>
                      </div>

                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] uppercase border border-emerald-500/30">
                        {res.status || 'Confirmed'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-stone-600 dark:text-stone-300 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        <span>Date: <strong>{res.date}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Time: <strong>{res.time}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-amber-600" />
                        <span>Guests: <strong>{res.guests} Persons</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        <span>Phone: <strong>{res.userPhone}</strong></span>
                      </div>
                    </div>

                    {res.specialRequest && (
                      <p className="text-[11px] italic text-stone-500 dark:text-stone-400 bg-white dark:bg-stone-900 p-2 rounded-xl">
                        "{res.specialRequest}"
                      </p>
                    )}

                    <div className="pt-1 flex justify-end">
                      {res.id && (
                        <button
                          onClick={() => handleCancelReservation(res.id!)}
                          className="text-stone-400 hover:text-red-500 transition-colors flex items-center gap-1 text-[11px] font-semibold"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Cancel Booking</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="p-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <button
              onClick={() => {
                onClose();
                onOpenNewBooking();
              }}
              className="px-4 py-2 rounded-xl bg-amber-700 text-white font-bold text-xs"
            >
              + New Reservation
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-xs"
            >
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};