import React, { useState } from 'react';
import { Coffee, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Heart, Send, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-700 to-amber-500 text-white flex items-center justify-center shadow-md">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-tight">
                  Brew Haven
                </span>
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-medium">
                  Cafe
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 max-w-sm font-light leading-relaxed">
              Crafting single-origin espresso, farm-to-table cuisine, and memorable dining moments in a cozy sunlit sanctuary.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-500 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-500 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-500 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-stone-400">
              <li><button onClick={() => scrollTo('hero')} className="hover:text-amber-400 transition-colors">Home Showcase</button></li>
              <li><button onClick={() => scrollTo('menu')} className="hover:text-amber-400 transition-colors">Menu & Pricing</button></li>
              <li><button onClick={() => scrollTo('about')} className="hover:text-amber-400 transition-colors">Our Story & Craft</button></li>
              <li><button onClick={() => scrollTo('gallery')} className="hover:text-amber-400 transition-colors">Photo Gallery</button></li>
              <li><button onClick={() => scrollTo('reservation')} className="hover:text-amber-400 transition-colors">Table Reservation</button></li>
              <li><button onClick={() => scrollTo('reviews')} className="hover:text-amber-400 transition-colors">Customer Reviews</button></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Opening Hours</h4>
            <div className="space-y-2 text-stone-400">
              <p>Mon – Fri: <span className="text-white font-medium">7:00 AM – 10:00 PM</span></p>
              <p>Sat – Sun: <span className="text-white font-medium">8:00 AM – 11:00 PM</span></p>
              <p className="pt-2 text-stone-500">#42, 100 Feet Road, Indiranagar, Bengaluru</p>
              <p className="text-amber-400 font-medium">+91 98765 43210</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Join Coffee Club</h4>
            <p className="text-stone-400 font-light">
              Subscribe to get secret menu items, seasonal roast updates, and 15% off your first online order.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                Subscribed! Check your inbox soon.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Brew Haven Cafe. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with passion & MongoDB</span>
          </p>
        </div>
      </div>
    </footer>
  );
};