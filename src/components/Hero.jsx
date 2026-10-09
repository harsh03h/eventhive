import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Users, 
  Flame 
} from 'lucide-react';
import { CITIES, CATEGORIES } from '../data/mockEvents';

export default function Hero() {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCity, 
    setSelectedCity, 
    selectedCategory, 
    setSelectedCategory,
    events,
    setSelectedEvent
  } = useApp();

  const featuredEvent = events.find((e) => e.featured) || events[0];

  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Ambient Glow & Hexagon Grid subtle pattern */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-20 right-1/4 w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines, Pitch & Quick Search */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Announcement */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold badge-glow">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>EventHive 2026: 4,800+ Experiences Now Live</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Unleash The <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">Buzz</span> of Live Experiences.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Discover frontier AI summits, underground music raves, culinary masterclasses, and networking forums. Secure verified digital QR passes with instant calendar sync.
            </p>

            {/* Hero Search Box */}
            <div className="p-2 sm:p-3 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center">
                
                {/* Search Input */}
                <div className="sm:col-span-6 relative flex items-center">
                  <Search className="w-5 h-5 text-amber-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search events, topics, artists..."
                    className="w-full pl-11 pr-4 py-3 bg-slate-950/60 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 border border-slate-800"
                  />
                </div>

                {/* City Dropdown */}
                <div className="sm:col-span-4 relative flex items-center">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full pl-9 pr-8 py-3 bg-slate-950/60 rounded-xl text-sm text-slate-200 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 appearance-none cursor-pointer"
                  >
                    {CITIES.map((city) => (
                      <option key={city} value={city} className="bg-slate-900 text-white">
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Explore Button */}
                <div className="sm:col-span-2">
                  <button
                    onClick={() => {
                      // Smooth scroll down to events grid
                      const el = document.getElementById('events-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    Find
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Category Chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1">
                Trending:
              </span>
              {CATEGORIES.slice(1, 6).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">100% Verified</div>
                  <div className="text-[11px] text-slate-400">Official Pass Protection</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Instant QR Pass</div>
                  <div className="text-[11px] text-slate-400">Scan & Walk In</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">50K+ Community</div>
                  <div className="text-[11px] text-slate-400">Global Attendees</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Event Card Spotlight */}
          {featuredEvent && (
            <div className="lg:col-span-5 relative">
              <div className="relative group rounded-3xl overflow-hidden glass-panel border border-slate-700/60 shadow-2xl transition-all duration-300 hover:border-amber-500/50">
                
                {/* Spotlight Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-400 text-xs font-bold shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
                  Featured Highlight
                </div>

                {/* Format Tag */}
                <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-slate-200 border border-white/10">
                  {featuredEvent.format === 'online' ? '🌐 Virtual Event' : '📍 In-Person'}
                </div>

                {/* Event Cover Image */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src={featuredEvent.coverImage}
                    alt={featuredEvent.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-amber-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredEvent.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {featuredEvent.venue.city}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {featuredEvent.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                    {featuredEvent.subtitle}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                    <div>
                      <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Starting at</span>
                      <div className="text-xl font-black text-amber-400">
                        {Math.min(...featuredEvent.tiers.map((t) => t.price)) === 0
                          ? 'FREE'
                          : `$${Math.min(...featuredEvent.tiers.map((t) => t.price))}`}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedEvent(featuredEvent)}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center gap-1.5"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
