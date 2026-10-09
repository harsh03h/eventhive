import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Clock, 
  DollarSign, 
  Tag, 
  Globe, 
  Check 
} from 'lucide-react';
import { CATEGORIES, CITIES } from '../data/mockEvents';

const PRESET_COVERS = [
  { name: 'Tech / AI', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Concert Rave', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Culinary & Wine', url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Design / Art', url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Gaming / LAN', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80' }
];

export default function CreateEventModal() {
  const { isCreateEventOpen, setIsCreateEventOpen, addEvent } = useApp();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Technology');
  const [format, setFormat] = useState('in-person'); // 'in-person' | 'online'
  const [date, setDate] = useState('2026-11-25');
  const [time, setTime] = useState('10:00 AM - 05:00 PM EST');
  const [venueName, setVenueName] = useState('');
  const [city, setCity] = useState('San Francisco');
  const [address, setAddress] = useState('');
  const [coverImage, setCoverImage] = useState(PRESET_COVERS[0].url);
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('Innovation, Summit, Networking');

  // Ticket Tiers
  const [tiers, setTiers] = useState([
    { id: 'tier-1', name: 'General Admission', price: 49, originalPrice: 69, remaining: 150, total: 150, perks: ['Full stage access', 'Digital recordings'] },
    { id: 'tier-2', name: 'VIP Pass', price: 149, originalPrice: 199, remaining: 30, total: 30, perks: ['VIP front row seat', 'Speaker lounge access', 'Networking lunch'] }
  ]);

  if (!isCreateEventOpen) return null;

  const handleAddTier = () => {
    setTiers([
      ...tiers,
      {
        id: `tier-${Date.now()}`,
        name: 'Early Bird Pass',
        price: 29,
        originalPrice: 39,
        remaining: 50,
        total: 50,
        perks: ['Event entry pass']
      }
    ]);
  };

  const handleUpdateTier = (index, field, value) => {
    const copy = [...tiers];
    copy[index][field] = value;
    setTiers(copy);
  };

  const handleRemoveTier = (index) => {
    if (tiers.length <= 1) return;
    setTiers(tiers.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    const newEvent = {
      title,
      subtitle: subtitle || 'Exclusive experience on EventHive',
      category,
      format,
      featured: false,
      date,
      time,
      venue: {
        name: venueName || (format === 'online' ? 'EventHive Virtual Stage' : 'Central Hall'),
        address: address || `${city} Metropolitan Center`,
        city: format === 'online' ? 'Online' : city,
        country: 'Global'
      },
      coverImage,
      organizer: {
        name: 'Alex Rivera (You)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        role: 'Verified Host',
        verified: true,
        followers: 1200,
        bio: 'Creating unforgettable community experiences.'
      },
      description,
      tiers,
      agenda: [
        { time: '10:00 AM', title: 'Welcome & Opening Session', speaker: 'Host Team' },
        { time: '01:00 PM', title: 'Interactive Showcase & Breakouts', speaker: 'Featured Presenters' }
      ],
      speakers: [
        { name: 'Alex Rivera', role: 'Event Host & Producer', company: 'EventHive Guild', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' }
      ],
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    };

    addEvent(newEvent);
    setIsCreateEventOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl my-6">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Create & Publish Experience</h2>
          </div>
          <button
            onClick={() => setIsCreateEventOpen(false)}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              1. Event Overview
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FutureAI Developers Summit 2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Catchy Subtitle / Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Next-Gen Autonomous Systems & Developer Hackathon"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Format</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormat('in-person')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      format === 'in-person'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    📍 In-Person
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormat('online')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      format === 'online'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    🌐 Virtual
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Date, Time & Venue */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              2. Date, Time & Location
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Time & Timezone</label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {format === 'in-person' && (
                <>
                  <div>
                    <label className="text-xs text-slate-300 font-semibold mb-1 block">Venue Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Grand Ballroom, Hilton Bayfront"
                      value={venueName}
                      onChange={(e) => setVenueName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 font-semibold mb-1 block">City</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      {CITIES.filter(c => c !== 'All Locations').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs text-slate-300 font-semibold mb-1 block">Address</label>
                    <input
                      type="text"
                      placeholder="e.g. 100 Waterfront Way, Suite 400"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Section 3: Visual Cover Image */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              3. Visual Banner Image
            </h3>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-slate-400 font-medium self-center mr-2">Presets:</span>
                {PRESET_COVERS.map((preset) => (
                  <button
                    type="button"
                    key={preset.name}
                    onClick={() => setCoverImage(preset.url)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      coverImage === preset.url
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">Or Custom Image URL</label>
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Banner Preview */}
              <div className="relative h-32 w-full rounded-2xl overflow-hidden border border-slate-800">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-xs font-bold text-white bg-black/70 px-3 py-1 rounded-full backdrop-blur-md">
                    Cover Banner Preview
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Ticket Tiers & Capacity */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                4. Admission Passes & Pricing Tiers
              </h3>
              <button
                type="button"
                onClick={handleAddTier}
                className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Tier
              </button>
            </div>

            <div className="space-y-3">
              {tiers.map((t, idx) => (
                <div
                  key={t.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                >
                  <div className="sm:col-span-5">
                    <label className="text-[10px] text-slate-500 block uppercase font-bold">Tier Name</label>
                    <input
                      type="text"
                      value={t.name}
                      onChange={(e) => handleUpdateTier(idx, 'name', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="text-[10px] text-slate-500 block uppercase font-bold">Price ($)</label>
                    <input
                      type="number"
                      min="0"
                      value={t.price}
                      onChange={(e) => handleUpdateTier(idx, 'price', Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-bold"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="text-[10px] text-slate-500 block uppercase font-bold">Pass Stock</label>
                    <input
                      type="number"
                      min="1"
                      value={t.remaining}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        handleUpdateTier(idx, 'remaining', val);
                        handleUpdateTier(idx, 'total', val);
                      }}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-1 text-right">
                    <button
                      type="button"
                      disabled={tiers.length <= 1}
                      onClick={() => handleRemoveTier(idx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 disabled:opacity-20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Description & Tags */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              5. Details & Highlights
            </h3>

            <div>
              <label className="text-xs text-slate-300 font-semibold mb-1 block">Full Description *</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what attendees will experience, keynotes, perks, food & beverages..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold mb-1 block">Tags (comma-separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Tech, AI, Networking, Founders"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCreateEventOpen(false)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/25 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              Publish Live Experience
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
