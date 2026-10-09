import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  MapPin, 
  Heart, 
  ArrowRight, 
  Flame, 
  Globe, 
  Clock, 
  Tag 
} from 'lucide-react';

export default function EventCard({ event, compact = false }) {
  const { 
    setSelectedEvent, 
    savedEventIds, 
    toggleSaveEvent, 
    openCheckout 
  } = useApp();

  const isSaved = savedEventIds.includes(event.id);

  // Minimum tier price
  const prices = event.tiers.map((t) => t.price);
  const minPrice = Math.min(...prices);
  
  // Total remaining across tiers
  const totalRemaining = event.tiers.reduce((acc, t) => acc + (t.remaining || 0), 0);
  const isLowStock = totalRemaining < 30;

  // Format date nicely
  const eventDateObj = new Date(event.date);
  const monthName = eventDateObj.toLocaleString('en-US', { month: 'short' });
  const dayNum = eventDateObj.getDate();

  if (compact) {
    return (
      <div 
        onClick={() => setSelectedEvent(event)}
        className="group relative rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-4 transition-all duration-300 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between cursor-pointer shadow-lg"
      >
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Thumbnail */}
          <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={event.coverImage}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold text-amber-400">
              {monthName} {dayNum}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 font-semibold text-[11px]">
                {event.category}
              </span>
              <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                <MapPin className="w-3 h-3 text-slate-500" />
                {event.venue.city}
              </span>
            </div>

            <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
              {event.title}
            </h3>

            <p className="text-xs text-slate-400 line-clamp-1">
              {event.subtitle}
            </p>
          </div>
        </div>

        {/* Right Action */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
          <div className="text-right">
            <span className="text-[10px] uppercase text-slate-400 font-bold block">From</span>
            <span className="text-lg font-black text-amber-400">
              {minPrice === 0 ? 'FREE' : `$${minPrice}`}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openCheckout(event, event.tiers[0]);
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            Book
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => setSelectedEvent(event)}
      className="group relative flex flex-col rounded-3xl overflow-hidden bg-slate-900/80 hover:bg-slate-900/95 border border-slate-800/90 hover:border-amber-500/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer"
    >
      {/* Image Container with Floating Badges */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-950">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          {/* Category Tag */}
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/85 backdrop-blur-md text-amber-300 border border-white/10 shadow-md">
            {event.category}
          </span>

          {/* Bookmark Button */}
          <button
            onClick={(e) => toggleSaveEvent(event.id, e)}
            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
              isSaved
                ? 'bg-rose-500/20 border-rose-500 text-rose-500 shadow-lg shadow-rose-500/20'
                : 'bg-black/60 border-white/15 text-slate-300 hover:text-white hover:bg-black/80'
            }`}
            title={isSaved ? 'Remove from wishlist' : 'Save event'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Low Stock or Format Indicator */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[11px] font-semibold text-slate-200 border border-white/10">
            {event.format === 'online' ? (
              <>
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                Online Live
              </>
            ) : (
              <>
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {event.venue.city}
              </>
            )}
          </div>

          {isLowStock && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/85 text-white text-[11px] font-bold shadow-md">
              <Flame className="w-3 h-3 fill-white" />
              Limited Seats
            </div>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Date & Time */}
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{event.date}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-normal truncate max-w-[150px]">
              {event.time.split('-')[0]}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>

          {/* Subtitle / Snippet */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {event.subtitle}
          </p>
        </div>

        {/* Card Footer: Organizer snippet + Pricing & CTA */}
        <div className="pt-3 border-t border-slate-800/80 space-y-3">
          {/* Organizer Avatar */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <img
              src={event.organizer.avatar}
              alt={event.organizer.name}
              className="w-5 h-5 rounded-full object-cover ring-1 ring-amber-500/40"
            />
            <span className="truncate">{event.organizer.name}</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Tickets from
              </span>
              <span className="text-xl font-extrabold text-white">
                {minPrice === 0 ? (
                  <span className="text-emerald-400">FREE</span>
                ) : (
                  <>
                    <span className="text-amber-400">${minPrice}</span>
                    <span className="text-xs font-normal text-slate-500"> / pass</span>
                  </>
                )}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedEvent(event);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              Get Tickets
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
