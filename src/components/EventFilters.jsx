import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  CATEGORIES, 
  CITIES 
} from '../data/mockEvents';
import { 
  Sparkles, 
  Cpu, 
  Music, 
  Utensils, 
  Briefcase, 
  Palette, 
  HeartPulse, 
  Gamepad2, 
  Mic2,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw
} from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Cpu,
  Music,
  Utensils,
  Briefcase,
  Palette,
  HeartPulse,
  Gamepad2,
  Mic2
};

export default function EventFilters() {
  const {
    selectedCategory,
    setSelectedCategory,
    priceFilter,
    setPriceFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    filteredEvents,
    searchQuery,
    setSearchQuery,
    selectedCity,
    setSelectedCity
  } = useApp();

  const isFiltered =
    selectedCategory !== 'all' ||
    selectedCity !== 'All Locations' ||
    priceFilter !== 'all' ||
    sortBy !== 'featured' ||
    searchQuery.trim() !== '';

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedCity('All Locations');
    setPriceFilter('all');
    setSortBy('featured');
    setSearchQuery('');
  };

  return (
    <div id="events-section" className="space-y-6 pt-4 pb-8">
      
      {/* Category Pills Slider / Bar */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2.5 min-w-max">
          {CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon] || Sparkles;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25 scale-105'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Bar: Price Filter, Sort, Results count & View toggle */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Results count & Active filters info */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-300">
            Showing <strong className="text-white font-bold">{filteredEvents.length}</strong> events
          </span>

          {isFiltered && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>

        {/* Right: Controls (Price, Sort, View Layout) */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Price Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">Price:</span>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">All Prices</option>
              <option value="free" className="bg-slate-900">Free Events</option>
              <option value="under50" className="bg-slate-900">Under $50</option>
              <option value="50to150" className="bg-slate-900">$50 - $150</option>
              <option value="over150" className="bg-slate-900">$150+</option>
            </select>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-slate-900">Featured</option>
              <option value="popular" className="bg-slate-900">Most Popular</option>
              <option value="date-asc" className="bg-slate-900">Soonest Date</option>
              <option value="price-asc" className="bg-slate-900">Price: Low to High</option>
              <option value="price-desc" className="bg-slate-900">Price: High to Low</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'compact'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
