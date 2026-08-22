import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { SocketProvider } from './context/SocketContext';

// Layout Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Main Sections
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { ReservationSection } from './components/ReservationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';

// Modals & Drawers
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AuthModal } from './components/AuthModal';
import { MyReservationsModal } from './components/MyReservationsModal';

// New Pages
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './pages/UserProfile';

// ──────────────────────────────────────────────────────────────
// Main Layout – contains all the sections and modals
// ──────────────────────────────────────────────────────────────
function MainLayout() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMyReservationsOpen, setIsMyReservationsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const scrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans selection:bg-amber-500 selection:text-white transition-colors duration-300">
      
      {/* NAVBAR */}
      <Navbar
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenMyReservationsModal={() => setIsMyReservationsOpen(true)}
      />

      {/* MAIN SECTIONS */}
      <main>
        <Hero />
        <MenuSection />
        <AboutUs />
        <GallerySection />
        <ReservationSection
          onOpenMyReservations={() => setIsMyReservationsOpen(true)}
        />
        <ReviewsSection />
        <ContactSection />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* GLOBAL DRAWERS & MODALS */}
      <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      <OrderTrackerModal />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <MyReservationsModal
        isOpen={isMyReservationsOpen}
        onClose={() => setIsMyReservationsOpen(false)}
        onOpenNewBooking={scrollToReservation}
      />

    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// App – wraps everything with Providers and Router
// ──────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <SocketProvider>
            <BrowserRouter>
              <Routes>
                {/* Main site – contains all sections */}
                <Route path="/" element={<MainLayout />} />
                
                {/* Admin Dashboard – requires admin role (protected by backend) */}
                <Route path="/admin" element={<AdminDashboard />} />
                
                {/* User Profile & Order History – requires authentication */}
                <Route path="/profile" element={<UserProfile />} />
              </Routes>
            </BrowserRouter>
          </SocketProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}