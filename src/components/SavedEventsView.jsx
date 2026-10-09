import React from 'react';
import { useApp } from '../context/AppContext';
import { Bookmark, Sparkles, Heart } from 'lucide-react';
import EventCard from './EventCard';

export default function SavedEventsView() {
  const { events, savedEventIds, setActiveTab } = useApp();

  const savedEvents = events.filter((e) => savedEventIds.includes(e.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-4 h-4 fill-rose-400" />
            <span>Wishlist & Bookmarks</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">Saved Experiences</h1>
          <p className="text-sm text-slate-400 mt-1">
            Keep track of upcoming events you want to attend before passes sell out.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
          {savedEvents.length} Saved
        </div>
      </div>

      {savedEvents.length === 0 ? (
        <div className="p-12 rounded-3xl bg-slate-900/50 border border-slate-800 text-center space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">Your wishlist is empty</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tap the heart icon on any event card to save it for quick booking later.
          </p>
          <button
            onClick={() => setActiveTab('discover')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Explore Events
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      )}

    </div>
  );
}
