import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Sparkles,
  CheckCircle,
  Phone,
  Mail,
  User,
  Heart,
  ChevronRight,
  Armchair
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import { Reservation } from '../types';
import { motion } from 'motion/react';

interface ReservationSectionProps {
  onOpenMyReservations: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ onOpenMyReservations }) => {
  const { user, loginAsGuest } = useAuth();

  const [userName, setUserName] = useState(user?.displayName || '');
  const [userEmail, setUserEmail] = useState(user?.email || '');
  const [userPhone, setUserPhone] = useState('');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('18:30');
  const [guests, setGuests] = useState<number>(2);
  const [seatingArea, setSeatingArea] = useState<Reservation['seatingArea']>('Sunlit Garden Patio');
  const [specialRequest, setSpecialRequest] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<Reservation | null>(null);

  const SEATING_ZONES = [
    {
      id: 'Sunlit Garden Patio',
      name: 'Sunlit Garden Patio',
      desc: 'Outdoor lush greenery, fairy lights & breezy courtyard vibe',
      image: '/images/gallery-interior.jpg'
    },
    {
      id: 'Indoor Cozy Booth',
      name: 'Indoor Cozy Booth',
      desc: 'Warm oak leather booths with quiet ambient acoustics',
      image: '/images/hero-interior.jpg'
    },
    {
      id: 'Skyview Rooftop',
      name: 'Skyview Rooftop',
      desc: 'Panoramic skyline views, sunset cocktails & elevated seating',
      image: '/images/hero-patio.jpg'
    },
    {
      id: 'Private Lounge',
      name: 'Private Lounge',
      desc: 'Exclusive booth for birthdays, anniversaries & corporate meetings',
      image: '/images/gallery-outdoor.jpg'
    }
  ];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim() || !userPhone.trim()) {
      alert('Please fill in all required contact details.');
      return;
    }

    try {
      setIsSubmitting(true);

      // If user is not logged in, create a guest account automatically
      if (!user) {
        try {
          await loginAsGuest(userName.trim(), userEmail.trim());
        } catch (err) {
          console.error('Guest login failed:', err);
          // Continue anyway – the reservation will be saved with the email
        }
      }

      // Determine userId – use the current user's id if available,
      // otherwise try to retrieve it from localStorage (for guests)
      let userIdToSend = user?.id;
      if (!userIdToSend) {
        try {
          const stored = localStorage.getItem('user');
          if (stored) {
            const parsed = JSON.parse(stored);
            userIdToSend = parsed?.id || parsed?._id || undefined;
          }
        } catch {}
      }

      const reservationData = {
        userId: userIdToSend,
        userName,
        userEmail,
        userPhone,
        date,
        time,
        guests,
        seatingArea,
        specialRequest,
        status: 'confirmed' as const,
      };

      const response = await api.post('/reservations', reservationData);
      const saved: Reservation = {
        ...reservationData,
        id: response.data._id,
        createdAt: response.data.createdAt || new Date().toISOString(),
      };

      // Store guest email for MyReservationsModal to use if user is still not authenticated
      if (!user) {
        localStorage.setItem('guest_email', userEmail);
      }

      setBookingSuccess(saved);
      setIsSubmitting(false);
    } catch (error: any) {
      console.error('Error saving reservation:', error);
      alert('Failed to complete booking: ' + (error.message || 'Please try again.'));
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reservation" className="py-24 sm:py-28 bg-stone-900 text-stone-100 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-600/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold tracking-wide uppercase border border-amber-500/30">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            Table Reservation System
          </span>
          <div className="flex items-center justify-center gap-3">
            <span className="hidden sm:block h-px w-12 bg-amber-500/60" />
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs uppercase tracking-[0.24em] text-amber-300">Made for memorable moments</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:block h-px w-12 bg-amber-500/60" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Reserve Your Ideal Table & Dining Zone
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-light max-w-2xl mx-auto">
            Plan your morning coffee, romantic dinner, or weekend brunch. Instant confirmation saved to our system.
          </p>
        </div>

        {bookingSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 max-w-xl mx-auto bg-stone-800/90 rounded-3xl p-8 border border-amber-500/40 shadow-2xl space-y-6 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
                Reservation Confirmed!
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">We Look Forward to Welcoming You</h3>
              <p className="text-xs text-stone-300">
                Booking ID: <span className="font-mono text-amber-300">{bookingSuccess.id?.slice(0, 8)}</span>
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-700 text-xs text-left space-y-2 text-stone-300">
              <div className="flex justify-between">
                <span>Reserved For:</span>
                <span className="font-bold text-white">{bookingSuccess.userName}</span>
              </div>
              <div className="flex justify-between">
                <span>Date & Time:</span>
                <span className="font-bold text-amber-400">{bookingSuccess.date} at {bookingSuccess.time}</span>
              </div>
              <div className="flex justify-between">
                <span>Guests & Area:</span>
                <span className="font-bold text-white">{bookingSuccess.guests} Guests ({bookingSuccess.seatingArea})</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => setBookingSuccess(null)}
                className="w-full sm:w-1/2 py-3 rounded-xl bg-stone-700 hover:bg-stone-600 text-white font-semibold text-xs"
              >
                Book Another Table
              </button>
              <button
                onClick={onOpenMyReservations}
                className="w-full sm:w-1/2 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-lg"
              >
                View All My Bookings
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="mt-12 bg-stone-800/80 backdrop-blur-xl rounded-3xl p-5 sm:p-10 border border-stone-700/90 shadow-2xl shadow-black/20 space-y-8">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-700 pb-3">
                <Armchair className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif text-lg font-bold text-white"><span className="text-amber-400">01</span> Select Your Atmosphere</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SEATING_ZONES.map(zone => {
                  const isSelected = seatingArea === zone.id;
                  return (
                    <div
                      key={zone.id}
                      onClick={() => setSeatingArea(zone.id as any)}
                      className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-200 ${
                        isSelected
                          ? 'border-amber-500 bg-stone-900 ring-2 ring-amber-500/30'
                          : 'border-stone-700/80 bg-stone-900/50 hover:border-amber-500/60 hover:-translate-y-1'
                      }`}
                    >
                      <div className="relative h-28">
                        <img src={zone.image} alt={zone.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-amber-500 text-stone-950 p-1 rounded-full shadow-md">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div className="p-3 space-y-1">
                        <h4 className="font-bold text-xs text-white">{zone.name}</h4>
                        <p className="text-[10px] text-stone-400 line-clamp-2">{zone.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 border-b border-stone-700 pb-3">
                <Calendar className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif text-lg font-bold text-white"><span className="text-amber-400">02</span> Date, Time & Guests</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Reservation Date *</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Time Slot *</label>
                  <select
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="08:00">08:00 AM (Morning Coffee)</option>
                    <option value="10:00">10:00 AM (Brunch)</option>
                    <option value="12:30">12:30 PM (Lunch)</option>
                    <option value="15:00">03:00 PM (Afternoon Tea)</option>
                    <option value="18:30">06:30 PM (Sunset Dinner)</option>
                    <option value="20:00">08:00 PM (Late Dinner)</option>
                    <option value="21:30">09:30 PM (Night Drinks)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Number of Guests *</label>
                  <select
                    value={guests}
                    onChange={e => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(g => (
                      <option key={g} value={g}>{g} {g === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 border-b border-stone-700 pb-3">
                <User className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif text-lg font-bold text-white"><span className="text-amber-400">03</span> Your Details & Notes</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Smith"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="jordan@example.com"
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={userPhone}
                    onChange={e => setUserPhone(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div className="text-xs">
                <label className="block text-stone-300 font-semibold mb-1">Special Occasion or Seating Requests (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Celebrating anniversary, window seat preferred, need high chair..."
                  value={specialRequest}
                  onChange={e => setSpecialRequest(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-stone-400">No booking fee required. You will receive an instant confirmation.</p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-xl shadow-amber-900/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Saving Reservation...</span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Table Reservation</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};