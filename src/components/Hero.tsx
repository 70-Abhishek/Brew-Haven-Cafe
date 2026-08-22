import React, { useState, useEffect } from 'react';
import {
  Coffee,
  Calendar,
  ShoppingBag,
  Star,
  Clock,
  MapPin,
  ChevronRight,
  Sparkles,
  Award,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const HERO_CAROUSEL = [
  {
    image: '/images/hero-interior.jpg',
    title: 'Where Every Sip & Bite Tells an Artisanal Story',
    subtitle: 'Hand-pulled single-origin espresso, freshly baked French butter croissants, and organic farm-to-table cuisine in a cozy sunlit sanctuary.'
  },
  {
    image: '/images/hero-patio.jpg',
    title: 'Experience Rooftop Sunset Dining & Garden Patio Vibe',
    subtitle: 'Unwind in our open-air garden terrace or rooftop lounge with signature craft infusions and chef-special small plates.'
  },
  {
    image: '/images/hero-coffee.jpg',
    title: 'Master Baristas & Precision Micro-Roasted Coffee',
    subtitle: 'Ethically sourced 100% Arabica coffee beans micro-roasted weekly and extracted with La Marzocco precision.'
  }
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_CAROUSEL.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative bg-stone-900 text-stone-100 overflow-hidden min-h-[calc(100svh-9rem)] lg:min-h-[78vh] flex items-center">
      
      {/* CAROUSEL BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img 
              src={HERO_CAROUSEL[currentSlide].image} 
              alt="Brew Haven Cafe Showcase"
              className="w-full h-full object-cover object-center filter brightness-[0.4]"
            />
          </motion.div>
        </AnimatePresence>

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/50 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6 lg:space-y-8">
            
            {/* BADGES */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Artisan Roastery & Bakery</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Open Today: 7:00 AM – 10:00 PM</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-stone-800/80 text-amber-400 border border-stone-700 text-xs font-semibold backdrop-blur-md">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4.9 / 5.0 (1,250+ Reviews)</span>
              </span>
            </div>

            {/* SLIDE HEADLINE */}
            <div className="space-y-4">
              <motion.h1 
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-serif text-4xl sm:text-5xl lg:text-[4.4rem] font-bold tracking-tight text-white leading-[1.08] max-w-4xl"
              >
                {HERO_CAROUSEL[currentSlide].title}
              </motion.h1>
              <motion.p 
                key={`sub-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-stone-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed"
              >
                {HERO_CAROUSEL[currentSlide].subtitle}
              </motion.p>
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollTo('reservation')}
                className="w-full sm:w-auto px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm shadow-xl shadow-amber-900/40 hover:shadow-amber-900/60 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Table Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo('menu')}
                className="w-full sm:w-auto px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-stone-100 font-semibold text-sm border border-stone-700 backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <Coffee className="w-4 h-4 text-amber-400" />
                <span>Explore Menu & Prices</span>
              </button>
              <button
                onClick={() => scrollTo('menu')}
                className="w-full sm:w-auto px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-sm border border-amber-500/30 backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>Order Online</span>
              </button>
            </div>

            {/* QUICK HIGHLIGHTS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-stone-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-stone-800/80 flex items-center justify-center text-amber-400 border border-stone-700">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Organic Beans</h4>
                  <p className="text-[11px] text-stone-400">Micro-roasted weekly</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-stone-800/80 flex items-center justify-center text-amber-400 border border-stone-700">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Fresh Pastries</h4>
                  <p className="text-[11px] text-stone-400">Baked daily at 6 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-stone-800/80 flex items-center justify-center text-amber-400 border border-stone-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Fast Service</h4>
                  <p className="text-[11px] text-stone-400">Avg 10 min prep</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-stone-800/80 flex items-center justify-center text-amber-400 border border-stone-700">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Garden Patio</h4>
                  <p className="text-[11px] text-stone-400">Rooftop & indoor</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE FLOATING FEATURE CARD */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-stone-900/80 backdrop-blur-xl border border-stone-800 rounded-3xl p-6 shadow-2xl space-y-6 relative">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Today's Special Recommendation</span>
                </div>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  Chef Pick
                </span>
              </div>

              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden h-44">
                  <img 
                    src="/images/gallery-latte.jpg" 
                    alt="Salted Caramel Latte" 
                    className="w-full h-full object-cover"
                  />
                  {/* PRICE TAG WITH ₹ */}
                  <div className="absolute top-3 right-3 bg-stone-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-400">
                    ₹5.40
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Artisan Salted Caramel Latte</h3>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                    Double shot espresso, oat milk, slow-simmered caramel sauce, and Himalayan pink salt crystal sprinkle.
                  </p>
                </div>
              </div>

              <button
                onClick={() => scrollTo('menu')}
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Order Chef Special Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* CAROUSEL INDICATOR DOTS */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        {HERO_CAROUSEL.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === idx ? 'w-8 bg-amber-500' : 'w-2 bg-stone-600 hover:bg-stone-400'
            }`}
          />
        ))}
      </div>

    </section>
  );
};