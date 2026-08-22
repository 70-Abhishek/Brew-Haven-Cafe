import React, { useState } from 'react';
import { 
  Coffee, 
  ShoppingBag, 
  Clock, 
  Calendar, 
  User as UserIcon, 
  Sun, 
  Moon, 
  Menu as MenuIcon, 
  X, 
  Sparkles,
  LogOut,
  MapPin
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenAuthModal: () => void;
  onOpenMyReservationsModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuthModal, onOpenMyReservationsModal }) => {
  const { totalItemCount, setIsCartOpen, activeOrderId, setIsTrackerOpen } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-stone-50/90 dark:bg-stone-900/90 border-b border-stone-200/80 dark:border-stone-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* LOGO */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-700 to-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-900/20 group-hover:scale-105 transition-transform duration-200">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 block leading-tight">
                Brew Haven
              </span>
              <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-medium">
                Cafe
              </span>
            </div>
          </div>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-700 dark:text-stone-300">
            <button onClick={() => scrollTo('hero')} className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
              Home
            </button>
            <button onClick={() => scrollTo('menu')} className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <span>Menu</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-semibold">
                Fresh
              </span>
            </button>
            <button onClick={() => scrollTo('about')} className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
              About Us
            </button>
            <button onClick={() => scrollTo('gallery')} className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
              Gallery
            </button>
            <button onClick={() => scrollTo('reservation')} className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
              Reservations
            </button>
            <button onClick={() => scrollTo('reviews')} className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
              Reviews
            </button>
            <button onClick={() => scrollTo('contact')} className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
              Contact
            </button>
          </nav>

          {/* ACTION BUTTONS & USER CONTROLS */}
          <div className="flex items-center gap-3">
            
            {/* DARK MODE TOGGLE */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-stone-600" />}
            </button>

            {/* LIVE ORDER TRACKER BADGE BUTTON */}
            {activeOrderId && (
              <button
                onClick={() => setIsTrackerOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-900 transition-all border border-amber-300 dark:border-amber-800 animate-pulse"
              >
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-semibold">Track Order</span>
              </button>
            )}

            {/* SHOPPING CART BUTTON */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-amber-700 text-white hover:bg-amber-800 transition-all shadow-md shadow-amber-900/20 flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-stone-50 dark:border-stone-900 shadow-sm">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* MY RESERVATIONS QUICK BUTTON */}
            <button
              onClick={onOpenMyReservationsModal}
              title="My Bookings"
              className="hidden md:flex p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors items-center gap-1.5 text-xs font-semibold"
            >
              <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Bookings</span>
            </button>

            {/* AUTH / USER PROFILE */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors border border-stone-200 dark:border-stone-700"
                >
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold">
                      {user?.displayName?.charAt(0) || 'U'}
                    </div>
                  )}
                  <span className="hidden sm:inline text-xs font-semibold max-w-[90px] truncate">
                    {user?.displayName?.split(' ')[0] || 'Account'}
                  </span>
                </button>

                {/* USER DROPDOWN */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-xl py-2 z-50 text-stone-800 dark:text-stone-200">
                    <div className="px-4 py-2 border-b border-stone-100 dark:border-stone-700">
                      <p className="text-xs font-semibold">{user?.displayName}</p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">{user?.email}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenMyReservationsModal();
                      }}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-stone-50 dark:hover:bg-stone-700/50 flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-amber-600" />
                      <span>My Table Bookings</span>
                    </button>

                    {activeOrderId && (
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setIsTrackerOpen(true);
                        }}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-stone-50 dark:hover:bg-stone-700/50 flex items-center gap-2 text-amber-600 font-medium"
                      >
                        <Clock className="w-4 h-4" />
                        <span>Track Active Order</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 flex items-center gap-2 border-t border-stone-100 dark:border-stone-700 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors text-xs font-semibold shadow-sm"
              >
                <UserIcon className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}

            {/* MOBILE MENU TRIGGER */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-6 py-6 space-y-4">
          <button 
            onClick={() => scrollTo('hero')} 
            className="block w-full text-left py-2 font-medium text-stone-800 dark:text-stone-200 border-b border-stone-100 dark:border-stone-800"
          >
            Home
          </button>
          <button 
            onClick={() => scrollTo('menu')} 
            className="block w-full text-left py-2 font-medium text-stone-800 dark:text-stone-200 border-b border-stone-100 dark:border-stone-800"
          >
            Explore Menu
          </button>
          <button 
            onClick={() => scrollTo('about')} 
            className="block w-full text-left py-2 font-medium text-stone-800 dark:text-stone-200 border-b border-stone-100 dark:border-stone-800"
          >
            About Us
          </button>
          <button 
            onClick={() => scrollTo('gallery')} 
            className="block w-full text-left py-2 font-medium text-stone-800 dark:text-stone-200 border-b border-stone-100 dark:border-stone-800"
          >
            Photo Gallery
          </button>
          <button 
            onClick={() => scrollTo('reservation')} 
            className="block w-full text-left py-2 font-medium text-stone-800 dark:text-stone-200 border-b border-stone-100 dark:border-stone-800"
          >
            Book a Table
          </button>
          <button 
            onClick={() => scrollTo('reviews')} 
            className="block w-full text-left py-2 font-medium text-stone-800 dark:text-stone-200 border-b border-stone-100 dark:border-stone-800"
          >
            Customer Reviews
          </button>
          <button 
            onClick={() => scrollTo('contact')} 
            className="block w-full text-left py-2 font-medium text-stone-800 dark:text-stone-200"
          >
            Contact & Location
          </button>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyReservationsModal();
              }}
              className="w-full py-3 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>View My Bookings</span>
            </button>
            {activeOrderId && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsTrackerOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-amber-700 text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" />
                <span>Track Active Order</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
