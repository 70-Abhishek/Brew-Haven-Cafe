import React, { useState } from 'react';
import { User, X, LogIn, Sparkles, ShieldCheck, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginWithGoogle, loginAsGuest, user } = useAuth();
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [activeTab, setActiveTab] = useState<'google' | 'guest'>('guest');

  if (!isOpen) return null;

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      alert('Please enter your name.');
      return;
    }
    loginAsGuest(guestName.trim(), guestEmail.trim());
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100"
        >
          <div className="p-6 bg-stone-900 text-white relative flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                Welcome to Brew Haven Cafe
              </span>
              <h3 className="font-serif text-xl font-bold mt-1">Sign In / Guest Access</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 text-xs">
            <div className="grid grid-cols-2 gap-2 bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => setActiveTab('guest')}
                className={`py-2.5 rounded-xl font-bold transition-all ${
                  activeTab === 'guest'
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                Quick Guest Access
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('google')}
                className={`py-2.5 rounded-xl font-bold transition-all ${
                  activeTab === 'google'
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                Google Auth
              </button>
            </div>

            {activeTab === 'guest' ? (
              <form onSubmit={handleGuestSubmit} className="space-y-4">
                <p className="text-stone-500 dark:text-stone-400">
                  Enter your name to easily manage your online orders and table bookings without creating a full password account.
                </p>
                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Your Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={guestName}
                      onChange={e => setGuestName(e.target.value)}
                      className="w-full pl-9 pr-3 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Email Address (Optional)</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="email"
                      placeholder="priya@example.com"
                      value={guestEmail}
                      onChange={e => setGuestEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Continue as Guest</span>
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-center py-4">
                <p className="text-stone-500 dark:text-stone-400">
                  Sign in securely using your Google account.
                </p>
                <button
                  type="button"
                  onClick={async () => {
                    await loginWithGoogle();
                    onClose();
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 font-bold text-xs border border-stone-300 dark:border-stone-700 shadow-md hover:bg-stone-50 dark:hover:bg-stone-700 transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Sign In with Google</span>
                </button>
              </div>
            )}
          </div>

          <div className="p-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 text-center text-[11px] text-stone-500">
            Secured by JWT & Encrypted Sessions
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};