import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle, ThumbsUp, Sparkles, Send, User } from 'lucide-react';
import { motion } from 'motion/react';

interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  favoriteItem?: string;
  verified: boolean;
  helpfulCount: number;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '2 days ago',
    comment: 'The filter coffee here is a revelation! The ambience is perfect for working and the masala chai is excellent.',
    favoriteItem: 'Signature Velvet Flat White',
    verified: true,
    helpfulCount: 24
  },
  {
    id: 'r2',
    author: 'Arjun Reddy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '1 week ago',
    comment: 'Reserved the garden patio for a birthday dinner – the staff was incredibly warm and the food was top-notch!',
    favoriteItem: 'Truffle Smash Burger',
    verified: true,
    helpfulCount: 18
  },
  {
    id: 'r3',
    author: 'Ananya Desai',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Finally a cafe that gets cold brew right! The seating is comfortable and the Wi-Fi is fast. Already recommended to all my friends.',
    favoriteItem: 'Cold Brew Nitro',
    verified: true,
    helpfulCount: 31
  }
];

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newFavorite, setNewFavorite] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) {
      alert('Please enter your name and review details.');
      return;
    }
    const review: Review = {
      id: 'r_' + Date.now(),
      author: newAuthor,
      rating: newRating,
      date: 'Just now',
      comment: newComment,
      favoriteItem: newFavorite || undefined,
      verified: true,
      helpfulCount: 0
    };
    setReviews([review, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      setNewAuthor('');
      setNewComment('');
      setNewFavorite('');
    }, 2000);
  };

  const handleHelpful = (id: string) => {
    setReviews(prev =>
      prev.map(r => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  return (
    <section id="reviews" className="py-24 bg-stone-50 dark:bg-stone-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-semibold tracking-wide uppercase">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              Customer Testimonials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
              Loved by Coffee Enthusiasts & Foodies
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base font-light leading-relaxed">
              Read real feedback from our community of daily regulars, weekend brunchers, and cafe lovers.
            </p>
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700/80 shadow-md flex items-center gap-6">
              <div className="text-center shrink-0 pr-6 border-r border-stone-200 dark:border-stone-700">
                <span className="font-serif text-5xl font-bold text-amber-700 dark:text-amber-400 block">4.9</span>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-stone-500 block mt-1">1,250+ Verified Ratings</span>
              </div>
              <div className="space-y-1.5 flex-1 text-xs">
                <div className="flex items-center justify-between text-stone-600 dark:text-stone-300">
                  <span>Coffee Quality</span>
                  <span className="font-bold text-amber-600">5.0 / 5.0</span>
                </div>
                <div className="flex items-center justify-between text-stone-600 dark:text-stone-300">
                  <span>Ambiance & Seating</span>
                  <span className="font-bold text-amber-600">4.9 / 5.0</span>
                </div>
                <div className="flex items-center justify-between text-stone-600 dark:text-stone-300">
                  <span>Speed of Service</span>
                  <span className="font-bold text-amber-600">4.8 / 5.0</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3.5 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs transition-colors shadow-md flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{showForm ? 'Close Review Form' : 'Write a Review'}</span>
            </button>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {showForm && (
              <motion.form
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleAddReview}
                className="p-6 rounded-3xl bg-white dark:bg-stone-800 border border-amber-500/50 shadow-xl space-y-4 text-xs"
              >
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">Share Your Experience</h3>
                {submitted ? (
                  <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 font-semibold text-center">
                    Thank you! Your review has been posted.
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1 text-stone-700 dark:text-stone-300">Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Priya Sharma"
                          value={newAuthor}
                          onChange={e => setNewAuthor(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-700/60 border border-stone-200 dark:border-stone-600"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1 text-stone-700 dark:text-stone-300">Favorite Item (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. Cold Brew Nitro"
                          value={newFavorite}
                          onChange={e => setNewFavorite(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-700/60 border border-stone-200 dark:border-stone-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 text-stone-700 dark:text-stone-300">Star Rating *</label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewRating(star)}
                            className="p-1 text-amber-400 hover:scale-125 transition-transform"
                          >
                            <Star className={`w-6 h-6 ${star <= newRating ? 'fill-amber-400' : 'text-stone-300 dark:text-stone-600'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 text-stone-700 dark:text-stone-300">Your Review *</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Tell us about the coffee, atmosphere, or food..."
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-700/60 border border-stone-200 dark:border-stone-600"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-amber-700 text-white font-bold text-xs shadow-md"
                    >
                      Submit Review
                    </button>
                  </>
                )}
              </motion.form>
            )}

            {reviews.map(rev => (
              <div
                key={rev.id}
                className="p-6 rounded-3xl bg-white dark:bg-stone-800/90 border border-stone-200/80 dark:border-stone-700/80 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {rev.avatar ? (
                      <img src={rev.avatar} alt={rev.author} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold text-sm">
                        {rev.author.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                        <span>{rev.author}</span>
                        {rev.verified && (
                          <span className="inline-flex items-center text-[10px] text-emerald-600 dark:text-emerald-400 font-normal">
                            <CheckCircle className="w-3 h-3 mr-0.5" /> Verified Customer
                          </span>
                        )}
                      </h4>
                      <span className="text-[11px] text-stone-500">{rev.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-light">
                  "{rev.comment}"
                </p>
                <div className="flex items-center justify-between pt-2 text-[11px] border-t border-stone-100 dark:border-stone-700/60 text-stone-500">
                  {rev.favoriteItem ? (
                    <span>Favorite Item: <strong className="text-amber-700 dark:text-amber-400">{rev.favoriteItem}</strong></span>
                  ) : <span />}
                  <button
                    onClick={() => handleHelpful(rev.id)}
                    className="flex items-center gap-1 hover:text-amber-600 font-medium transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful ({rev.helpfulCount})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};