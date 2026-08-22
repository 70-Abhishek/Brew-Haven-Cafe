import React, { useState } from 'react';
import { Camera, Sparkles, X, Eye, Maximize2 } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/galleryData';
import { GalleryImage } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  const filteredImages = GALLERY_IMAGES.filter(img => {
    if (activeCategory === 'all') return true;
    return img.category === activeCategory;
  });

  return (
    <section id="gallery" className="py-24 bg-stone-100 dark:bg-stone-900/40 text-stone-900 dark:text-stone-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-semibold tracking-wide uppercase">
            <Camera className="w-3.5 h-3.5" />
            Visual Atmosphere
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            A Glimpse into Our Artisan World
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg font-light">
            Explore our sunlit dining spaces, master barista coffee art, garden terrace, and daily freshly baked delicacies.
          </p>
        </div>

        {/* CATEGORY TABS */}
        <div className="mt-10 flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'interior', label: 'Cafe Interior' },
            { id: 'coffee', label: 'Barista & Coffee' },
            { id: 'food', label: 'Artisanal Food' },
            { id: 'vibe', label: 'Garden & Patio Vibe' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-semibold shrink-0 transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-700 text-white shadow-md shadow-amber-900/20'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* GALLERY GRID */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group cursor-pointer relative h-72 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-stone-200/80 dark:border-stone-800"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg font-bold mt-1 leading-snug">{item.title}</h3>
                <p className="text-xs text-stone-300 line-clamp-2 mt-1 font-light">{item.caption}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-300">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>View High-Res Photo</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl text-white"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-stone-900/80 text-white hover:bg-stone-800"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-8 h-[60vh] bg-stone-950">
                  <img
                    src={activeImage.imageUrl}
                    alt={activeImage.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="lg:col-span-4 p-8 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                    {activeImage.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold">{activeImage.title}</h3>
                  <p className="text-stone-300 text-xs leading-relaxed font-light">{activeImage.caption}</p>
                  
                  <div className="pt-4 border-t border-stone-800 text-[11px] text-stone-400">
                    Shot on location at Brew Haven Cafe, Downtown District.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
