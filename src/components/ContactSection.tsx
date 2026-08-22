import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, Navigation, CheckCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill out all contact fields.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-stone-100 dark:bg-stone-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-semibold tracking-wide uppercase">
            <MapPin className="w-3.5 h-3.5" />
            Location & Contact
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Visit Us or Get in Touch
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg font-light">
            Located in the heart of Indiranagar. Walk-ins always welcome, or send us a message for event bookings and catering.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-700 shadow-sm space-y-6 text-stone-800 dark:text-stone-200">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">Location Address</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                    #42, 100 Feet Road, Indiranagar,<br />
                    Bengaluru, Karnataka 560038
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-stone-100 dark:border-stone-700 pt-4">
                <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">Opening Hours</h4>
                  <div className="text-xs text-stone-600 dark:text-stone-300 mt-1 space-y-1">
                    <p>Monday – Friday: <strong>7:00 AM – 10:00 PM</strong></p>
                    <p>Saturday – Sunday: <strong>8:00 AM – 11:00 PM</strong></p>
                    <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-[11px] mt-1">
                      ● Breakfast & Fresh Bakery served until 11:30 AM
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-stone-100 dark:border-stone-700 pt-4">
                <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">Direct Contact</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
                    Phone: <strong>+91 98765 43210</strong><br />
                    Email: <strong>hello@artisancafe.com</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 border border-stone-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Interactive Location Map</span>
                </div>
                <span className="text-[10px] bg-stone-800 px-2 py-0.5 rounded-full text-stone-400">Parking Available</span>
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 flex items-center justify-center text-center p-4">
                <img
                  src="/images/gallery-outdoor.jpg"
                  alt="City Map Preview"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4]"
                />
                <div className="relative z-10 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h5 className="font-serif font-bold text-sm text-white">Brew Haven Cafe</h5>
                  <p className="text-[11px] text-stone-300">Indiranagar, Bengaluru</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-bold shadow-md"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-stone-800 rounded-3xl p-8 border border-stone-200 dark:border-stone-700 shadow-xl space-y-6 text-stone-900 dark:text-stone-100">
              <div>
                <h3 className="font-serif text-2xl font-bold">Send Us a Direct Message</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Have a question about our menu, catering requests, or private event bookings? We reply within 2 hours.
                </p>
              </div>
              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-emerald-900 dark:text-emerald-100">Message Received!</h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    Thank you, {name}. Our hospitality team has received your message and will reach out shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-1 text-stone-700 dark:text-stone-300">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priya Sharma"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl bg-stone-50 dark:bg-stone-700/60 border border-stone-200 dark:border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 text-stone-700 dark:text-stone-300">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="priya@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl bg-stone-50 dark:bg-stone-700/60 border border-stone-200 dark:border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-stone-700 dark:text-stone-300">Inquiry Subject</label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-stone-50 dark:bg-stone-700/60 border border-stone-200 dark:border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Private Event Booking">Private Event or Birthday Booking</option>
                      <option value="Corporate Catering">Corporate Catering Request</option>
                      <option value="Feedback">Feedback & Compliments</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-stone-700 dark:text-stone-300">Message *</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Write your message or event details here..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-stone-50 dark:bg-stone-700/60 border border-stone-200 dark:border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-lg shadow-amber-900/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Cafe Team</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};