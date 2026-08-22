import React from 'react';
import { 
  Coffee, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Award,
  Leaf,
  Sun,
  Smile
} from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-stone-100 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Our Story & Values
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Crafting Moments of Warmth, Flavor & Gathering Since 2018
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg font-light leading-relaxed">
            Founded with a simple belief: that exceptional coffee, real wholesome food, and genuine hospitality can transform your everyday routine into a mindful ritual.
          </p>
        </div>

        {/* STORY GRID WITH IMAGES */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLLAGE */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-lg h-64 border border-stone-200 dark:border-stone-800">
                <img 
                  src="/images/hero-coffee.jpg"
                  alt="Barista Craft" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="bg-amber-700 text-white rounded-3xl p-6 shadow-xl space-y-2">
                <h4 className="font-serif text-3xl font-bold">100%</h4>
                <p className="text-xs font-medium text-amber-100">Organic & Ethically Sourced Single-Origin Beans</p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 shadow-xl space-y-2 border border-stone-800">
                <h4 className="font-serif text-3xl font-bold text-amber-400">6:00 AM</h4>
                <p className="text-xs font-medium text-stone-300">Daily Fresh Bakery Oven Timings</p>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg h-64 border border-stone-200 dark:border-stone-800">
                <img 
                  src="/images/gallery-interior.jpg"
                  alt="Garden Patio Dining" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* RIGHT STORY NARRATIVE */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                The Artisan Philosophy
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                At Brew Haven Cafe, we reject mass production in favor of intentional craft. Every single morning, our bakers laminate fresh French butter croissants, our chefs prep farm-fresh local produce, and our master baristas calibrate espresso grind sizes to weather humidity changes.
              </p>
              <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                Whether you need a quiet sunlit corner with high-speed Wi-Fi to finish your project, a breezy garden patio for a weekend brunch date, or a cozy rooftop booth under evening fairy lights, our space is designed to be your home away from home.
              </p>
            </div>

            {/* 4 KEY PILLARS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 shadow-sm flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100">Farm-to-Table Fresh</h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Sourced directly from local organic farms weekly.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 shadow-sm flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 shrink-0">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100">Master Barista Craft</h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Certified baristas passionate about brew profiles.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 shadow-sm flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 shrink-0">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100">Multi-Zone Ambiance</h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Garden terrace, quiet study booths, & rooftop.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 shadow-sm flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100">Zero-Waste Goal</h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Compostable packaging & sustainable recycling.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
