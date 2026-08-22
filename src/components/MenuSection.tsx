import React, { useState, useEffect, useMemo } from 'react';
import {
  Coffee,
  Utensils,
  Cake,
  GlassWater,
  Sparkles,
  Search,
  Plus,
  Check,
  Star,
  Clock,
  Flame,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import api from '../api/client';

export const MenuSection: React.FC = () => {
  const { addToCart } = useCart();

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Customization modal state
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedMilk, setSelectedMilk] = useState<string>('');
  const [selectedSweetness, setSelectedSweetness] = useState<string>('');
  const [selectedExtras, setSelectedExtras] = useState<{ name: string; price: number }[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await api.get('/menu');
        const items = res.data.map((item: any) => ({ ...item, id: item._id }));
        setMenuItems(items);
        setError(null);
      } catch (err) {
        console.error('Menu fetch error:', err);
        setError('Failed to load menu. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (selectedDietary !== 'all') {
        const hasTag = item.tags.some((t) => t.toLowerCase() === selectedDietary.toLowerCase());
        if (!hasTag) return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTag = item.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesTag) return false;
      }
      return true;
    });
  }, [menuItems, selectedCategory, selectedDietary, searchQuery]);

  const openCustomizer = (item: MenuItem) => {
    setCustomizingItem(item);
    setQuantity(1);
    setSelectedMilk(item.customizationOptions?.milk?.[0] || '');
    setSelectedSweetness(item.customizationOptions?.sweetness?.[0] || '');
    setSelectedExtras([]);
    setSpecialInstructions('');
  };

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.customizationOptions) {
      openCustomizer(item);
    } else {
      addToCart(item, 1);
      setAddedAnimationId(item.id);
      setTimeout(() => setAddedAnimationId(null), 1500);
    }
  };

  const handleCustomizerSubmit = () => {
    if (!customizingItem) return;
    addToCart(
      customizingItem,
      quantity,
      selectedMilk,
      selectedSweetness,
      selectedExtras,
      specialInstructions,
    );
    setAddedAnimationId(customizingItem.id);
    setTimeout(() => setAddedAnimationId(null), 1500);
    setCustomizingItem(null);
  };

  const toggleExtra = (extra: { name: string; price: number }) => {
    setSelectedExtras((prev) => {
      const exists = prev.some((e) => e.name === extra.name);
      if (exists) return prev.filter((e) => e.name !== extra.name);
      return [...prev, extra];
    });
  };

  const currentUnitPrice = useMemo(() => {
    if (!customizingItem) return 0;
    const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
    return (customizingItem.price + extrasTotal) * quantity;
  }, [customizingItem, selectedExtras, quantity]);

  return (
    <section id="menu" className="py-24 bg-stone-50 dark:bg-stone-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-semibold tracking-wide uppercase">
            <Utensils className="w-3.5 h-3.5" />
            Culinary Craft
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Exploration of Flavors, Roasts & Delicacies
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg font-light">
            Every dish and beverage is prepared fresh to order using finest organic beans, farm-fresh ingredients, and handcrafted bakery items.
          </p>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="mt-12 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search coffee, burger, croissants, matcha..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 flex items-center gap-1 shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
              </span>
              {[
                { id: 'all', label: 'All Items' },
                { id: 'popular', label: 'Popular' },
                { id: 'chef special', label: "Chef's Special" },
                { id: 'vegetarian', label: 'Vegetarian' },
                { id: 'vegan', label: 'Vegan' },
              ].map((diet) => (
                <button
                  key={diet.id}
                  onClick={() => setSelectedDietary(diet.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all ${
                    selectedDietary === diet.id
                      ? 'bg-amber-700 text-white shadow-sm'
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700'
                  }`}
                >
                  {diet.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 border-b border-stone-200 dark:border-stone-800">
            {[
              { id: 'all', label: 'All Menu', icon: Utensils },
              { id: 'coffee', label: 'Specialty Coffee', icon: Coffee },
              { id: 'fast_food', label: 'Fast Food & Savory', icon: Utensils },
              { id: 'desserts', label: 'Artisanal Desserts', icon: Cake },
              { id: 'beverages', label: 'Fresh Beverages', icon: GlassWater },
              { id: 'specials', label: "Chef's Specials", icon: Sparkles },
            ].map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-700 text-white shadow-md shadow-amber-900/20'
                      : 'bg-white/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200/80 dark:border-stone-700/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-200' : 'text-amber-600 dark:text-amber-400'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MENU ITEMS */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
            <p className="mt-4 text-stone-500">Loading delicious items...</p>
          </div>
        ) : error ? (
          <div className="py-20 text-center text-red-500">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-xl"
            >
              Retry
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="text-lg font-serif font-bold text-stone-700 dark:text-stone-300">No dishes matched your filters</p>
            <p className="text-xs text-stone-500">Try searching for something else or reset your dietary filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDietary('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openCustomizer(item)}
                className="group cursor-pointer bg-white dark:bg-stone-800/90 rounded-3xl overflow-hidden border border-stone-200/80 dark:border-stone-700/80 shadow-sm hover:shadow-xl hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-stone-100 dark:bg-stone-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-stone-900/90 dark:bg-stone-950/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-amber-400 border border-stone-700 shadow-md">
                      ₹{item.price.toFixed(2)}
                    </div>
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[70%]">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/90 text-stone-950 shadow-sm uppercase tracking-wider backdrop-blur-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 font-light leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-4 pt-2 text-[11px] text-stone-500 dark:text-stone-400 border-t border-stone-100 dark:border-stone-700/60">
                      {item.rating && (
                        <div className="flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{item.rating}</span>
                        </div>
                      )}
                      {item.prepTimeMinutes && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{item.prepTimeMinutes} mins</span>
                        </div>
                      )}
                      {item.calories && (
                        <div className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-red-500" />
                          <span>{item.calories} kcal</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button
                    onClick={(e) => handleQuickAdd(item, e)}
                    className={`w-full py-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                      addedAnimationId === item.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-100 dark:bg-stone-700/80 hover:bg-amber-700 hover:text-white dark:hover:bg-amber-600 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    {addedAnimationId === item.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Order!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>{item.customizationOptions ? 'Customize & Order' : 'Add to Order'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CUSTOMIZATION MODAL */}
      <AnimatePresence>
        {customizingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-stone-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-700 flex flex-col max-h-[90vh]"
            >
              {/* Modal header with image */}
              <div className="relative h-48 bg-stone-900 shrink-0">
                <img src={customizingItem.image} alt={customizingItem.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                <button
                  onClick={() => setCustomizingItem(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/80 text-white hover:bg-stone-800"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                    Custom Order
                  </span>
                  <h3 className="font-serif text-2xl font-bold mt-1">{customizingItem.name}</h3>
                  <p className="text-xs text-stone-300 font-light line-clamp-1">{customizingItem.description}</p>
                </div>
              </div>

              {/* Modal body */}
              <div className="p-6 space-y-6 overflow-y-auto flex-1 text-stone-800 dark:text-stone-200">
                {/* Milk */}
                {customizingItem.customizationOptions?.milk && (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Select Milk Type:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {customizingItem.customizationOptions.milk.map((m) => (
                        <button
                          key={m}
                          onClick={() => setSelectedMilk(m)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                            selectedMilk === m
                              ? 'bg-amber-700 text-white border-amber-700 shadow-sm'
                              : 'bg-stone-100 dark:bg-stone-700/60 border border-stone-200 dark:border-stone-600'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sweetness */}
                {customizingItem.customizationOptions?.sweetness && (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Sweetness Level:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {customizingItem.customizationOptions.sweetness.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSweetness(s)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                            selectedSweetness === s
                              ? 'bg-amber-700 text-white border-amber-700 shadow-sm'
                              : 'bg-stone-100 dark:bg-stone-700/60 border border-stone-200 dark:border-stone-600'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Extras */}
                {customizingItem.customizationOptions?.extras && (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Add Extra Toppings & Extras:</label>
                    <div className="space-y-2">
                      {customizingItem.customizationOptions.extras.map((ex) => {
                        const isSelected = selectedExtras.some((e) => e.name === ex.name);
                        return (
                          <button
                            key={ex.name}
                            onClick={() => toggleExtra(ex)}
                            className={`w-full px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all ${
                              isSelected
                                ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-500 text-amber-900 dark:text-amber-200'
                                : 'bg-stone-100 dark:bg-stone-700/60 border-stone-200 dark:border-stone-600'
                            }`}
                          >
                            <span>{ex.name}</span>
                            <span className="font-bold">+₹{ex.price.toFixed(2)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Special instructions */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Special Preparation Requests:</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Extra hot, light ice, dressing on the side..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-700/60 text-xs border border-stone-200 dark:border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-700">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Quantity:</span>
                  <div className="flex items-center gap-3 bg-stone-100 dark:bg-stone-700 p-1.5 rounded-xl">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 flex items-center justify-center font-bold text-sm shadow-sm"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-bold text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 flex items-center justify-center font-bold text-sm shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal footer */}
              <div className="p-6 bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-700 flex items-center justify-between shrink-0">
                <div>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 block">Total Price:</span>
                  <span className="font-serif text-2xl font-bold text-amber-700 dark:text-amber-400">
                    ₹{currentUnitPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCustomizerSubmit}
                  className="px-6 py-3.5 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs transition-colors shadow-lg shadow-amber-900/30 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to My Order</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};