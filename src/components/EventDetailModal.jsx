import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  Share2, 
  Heart, 
  CheckCircle2, 
  Users, 
  Tag, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

export default function EventDetailModal() {
  const { 
    selectedEvent, 
    setSelectedEvent, 
    savedEventIds, 
    toggleSaveEvent, 
    openCheckout,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'agenda' | 'speakers' | 'venue'
  const [selectedTier, setSelectedTier] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!selectedEvent) return null;

  const isSaved = savedEventIds.includes(selectedEvent.id);
  const currentTier = selectedTier || selectedEvent.tiers[0];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    addToast('Event link copied to clipboard! 📋', 'info');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      
      {/* Container Modal */}
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl my-6">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedEvent(null)}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-950 text-slate-300 hover:text-white border border-white/15 transition-all shadow-lg"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner Header */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-950">
          <img
            src={selectedEvent.coverImage}
            alt={selectedEvent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

          {/* Quick Header Badges */}
          <div className="absolute top-5 left-5 flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-md">
              {selectedEvent.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/70 backdrop-blur-md text-slate-200 border border-white/10">
              {selectedEvent.format === 'online' ? '🌐 Virtual Event' : '📍 In-Person'}
            </span>
          </div>

          {/* Floating Actions on Top Right of Banner */}
          <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-2 z-10">
            <button
              onClick={handleShare}
              className="p-3 rounded-2xl bg-slate-950/80 hover:bg-slate-950 border border-slate-700 text-slate-200 hover:text-white transition-all flex items-center gap-2 text-xs font-bold"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
            </button>

            <button
              onClick={(e) => toggleSaveEvent(selectedEvent.id, e)}
              className={`p-3 rounded-2xl border transition-all flex items-center gap-2 text-xs font-bold ${
                isSaved
                  ? 'bg-rose-500/20 border-rose-500 text-rose-500'
                  : 'bg-slate-950/80 hover:bg-slate-950 border-slate-700 text-slate-200 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Wishlist'}</span>
            </button>
          </div>

          {/* Title & Date Overlay on Image Bottom */}
          <div className="absolute bottom-6 left-6 right-6 sm:right-48">
            <div className="flex items-center gap-3 text-amber-400 text-xs sm:text-sm font-semibold mb-2">
              <span className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                <Calendar className="w-3.5 h-3.5" />
                {selectedEvent.date}
              </span>
              <span className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                <Clock className="w-3.5 h-3.5" />
                {selectedEvent.time}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight drop-shadow-md">
              {selectedEvent.title}
            </h1>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 border-b border-slate-800 bg-slate-950/50 flex items-center gap-4 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'agenda', label: 'Schedule & Agenda' },
            { id: 'speakers', label: 'Speakers & Hosts' },
            { id: 'venue', label: 'Venue & Details' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3.5 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Main Body Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[60vh] overflow-y-auto">
          
          {/* Left Column: Tab Contents */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">About This Experience</h3>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Organizer Card */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedEvent.organizer.avatar}
                      alt={selectedEvent.organizer.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-amber-500/40"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-sm text-white">
                        {selectedEvent.organizer.name}
                        {selectedEvent.organizer.verified && (
                          <ShieldCheck className="w-4 h-4 text-amber-400" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{selectedEvent.organizer.role}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => addToast(`Following ${selectedEvent.organizer.name}!`, 'info')}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500/50 text-xs font-semibold text-slate-200 transition-colors"
                  >
                    Follow
                  </button>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.tags?.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Agenda Tab */}
            {activeTab === 'agenda' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">Event Schedule</h3>
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                  {selectedEvent.agenda?.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-amber-400 group-hover:bg-amber-400 transition-colors" />
                      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                        <span className="text-xs font-bold text-amber-400">{item.time}</span>
                        <h4 className="text-sm font-bold text-white">{item.title}</h4>
                        {item.speaker && (
                          <p className="text-xs text-slate-400 font-medium">Presenter: {item.speaker}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Speakers Tab */}
            {activeTab === 'speakers' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">Featured Speakers & Hosts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedEvent.speakers?.map((sp, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-3">
                      <img
                        src={sp.avatar}
                        alt={sp.name}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-700"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">{sp.name}</h4>
                        <p className="text-xs text-amber-400 font-medium">{sp.role}</p>
                        <p className="text-[11px] text-slate-400">{sp.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Venue & Details Tab */}
            {activeTab === 'venue' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">Venue & Location</h3>
                <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-white">{selectedEvent.venue.name}</h4>
                    <p className="text-sm text-slate-400">{selectedEvent.venue.address}</p>
                  </div>

                  {/* Simulated Map Visual */}
                  <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="z-10 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center mx-auto text-amber-400 animate-bounce">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-white">{selectedEvent.venue.city}, {selectedEvent.venue.country}</p>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(selectedEvent.venue.name + ' ' + selectedEvent.venue.address)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline font-semibold"
                      >
                        Open in Google Maps <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Ticket Tier Selection & Fast Checkout Action */}
          <div className="lg:col-span-5 space-y-4">
            <div className="sticky top-0 p-5 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Select Admission Tier
                </h3>
                <span className="text-xs text-slate-400 font-medium">Instant QR Delivery</span>
              </div>

              {/* Tier Cards List */}
              <div className="space-y-3">
                {selectedEvent.tiers.map((tier) => {
                  const isSelected = currentTier.id === tier.id;
                  const isSoldOut = tier.remaining <= 0;

                  return (
                    <div
                      key={tier.id}
                      onClick={() => !isSoldOut && setSelectedTier(tier)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 shadow-md shadow-amber-500/10'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      } ${isSoldOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{tier.name}</span>
                            {tier.remaining < 20 && !isSoldOut && (
                              <span className="px-1.5 py-0.5 text-[10px] rounded bg-rose-500/20 text-rose-400 font-bold">
                                {tier.remaining} left!
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-1">{tier.description}</p>
                        </div>

                        <div className="text-right">
                          <span className="text-base font-extrabold text-amber-400">
                            {tier.price === 0 ? 'FREE' : `$${tier.price}`}
                          </span>
                          {tier.originalPrice > tier.price && (
                            <span className="text-xs text-slate-500 line-through block">
                              ${tier.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Tier Perks */}
                      {tier.perks && tier.perks.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-800/60 grid grid-cols-1 gap-1 text-[11px] text-slate-300">
                          {tier.perks.slice(0, 3).map((perk, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-amber-400 flex-shrink-0" />
                              <span>{perk}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => openCheckout(selectedEvent, currentTier)}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                Book with {currentTier.name} (${currentTier.price})
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected by EventHive Guaranteed Entry Policy</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
