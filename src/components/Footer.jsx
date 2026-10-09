import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Hexagon, ArrowRight, ShieldCheck, Heart, Sparkles, Mail } from 'lucide-react';

export default function Footer() {
  const { setSelectedCategory, setActiveTab, addToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    addToast('Welcome to the Hive! You’re subscribed to exclusive early drops. 🐝', 'success');
    setEmail('');
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 mt-20 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand info (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-md shadow-amber-500/20">
                <Hexagon className="w-5 h-5 text-slate-950 fill-slate-950" />
              </div>
              <span className="text-xl font-extrabold text-white">EventHive</span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              The premier platform for discovering, booking, and managing live experiences. From frontier AI summits to underground festivals, experience the hive.
            </p>

            {/* Newsletter signup */}
            <form onSubmit={handleSubscribe} className="pt-2">
              <span className="text-xs font-bold text-slate-300 block mb-2">
                Subscribe for early access presales
              </span>
              <div className="flex gap-2 max-w-sm">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors"
                >
                  Join
                </button>
              </div>
            </form>
          </div>

          {/* Column 2: Discover */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Discover</h4>
            <ul className="space-y-2">
              {['Technology', 'Music', 'Food & Drinks', 'Gaming', 'Business'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat);
                      setActiveTab('discover');
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: For Organizers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Organizers</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('organizer')} className="hover:text-amber-400 transition-colors">
                  Organizer Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('organizer')} className="hover:text-amber-400 transition-colors">
                  QR Gate Check-in
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('organizer')} className="hover:text-amber-400 transition-colors">
                  Attendee Analytics
                </button>
              </li>
              <li><span className="hover:text-amber-400 cursor-pointer">Pricing & Payouts</span></li>
              <li><span className="hover:text-amber-400 cursor-pointer">API & Webhooks</span></li>
            </ul>
          </div>

          {/* Column 4: Trust & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Trust & Security</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Guaranteed Passes</span>
              </li>
              <li><span className="hover:text-amber-400 cursor-pointer">Refund Policies</span></li>
              <li><span className="hover:text-amber-400 cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-amber-400 cursor-pointer">Privacy Framework</span></li>
              <li><span className="hover:text-amber-400 cursor-pointer">24/7 Concierge Support</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-slate-400">
              EventHive Network & QR Gate Scanners Operational
            </span>
          </div>

          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} EventHive Technologies Inc. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
