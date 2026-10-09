import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Calendar, 
  Bookmark, 
  PlusCircle, 
  LayoutDashboard, 
  Ticket, 
  Menu, 
  X, 
  Layers, 
  Hexagon, 
  UserCheck, 
  Search,
  Wallet
} from 'lucide-react';

export default function Navbar() {
  const { 
    userRole, 
    setUserRole, 
    activeTab, 
    setActiveTab, 
    tickets, 
    savedEventIds, 
    setIsCreateEventOpen,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const confirmedTicketsCount = tickets.filter(t => t.status === 'confirmed').length;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => { setActiveTab('discover'); }}
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 group-hover:scale-105 transition-all duration-300">
                <Hexagon className="w-6 h-6 text-slate-950 fill-slate-950" />
                <span className="absolute text-[10px] font-black text-amber-400">⚡</span>
              </div>
              <div>
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  EventHive
                </span>
                <span className="hidden sm:block text-[10px] font-medium uppercase tracking-widest text-slate-400">
                  Experiences Unlocked
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setActiveTab('discover')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'discover'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                Discover
              </button>

              <button
                onClick={() => setActiveTab('tickets')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 relative ${
                  activeTab === 'tickets'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Ticket className="w-4 h-4 text-amber-400" />
                My Tickets
                {confirmedTicketsCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs font-bold bg-amber-500 text-slate-950 rounded-full">
                    {confirmedTicketsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('saved')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 relative ${
                  activeTab === 'saved'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Bookmark className="w-4 h-4 text-rose-400" />
                Wishlist
                {savedEventIds.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 rounded-full">
                    {savedEventIds.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('organizer')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'organizer'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                Organizer Studio
              </button>
            </nav>
          </div>

          {/* Right Action Items */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Quick Wallet Credits Tag */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300">
              <Wallet className="w-3.5 h-3.5 text-amber-400" />
              <span>Credits:</span>
              <span className="font-bold text-amber-400">$120.00</span>
            </div>

            {/* Host an Event CTA */}
            <button
              onClick={() => setIsCreateEventOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              Create Event
            </button>

            {/* Profile Avatar / Quick Switch */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="relative group">
                <button 
                  onClick={() => {
                    const nextRole = userRole === 'attendee' ? 'organizer' : 'attendee';
                    setUserRole(nextRole);
                    if (nextRole === 'organizer') setActiveTab('organizer');
                  }}
                  className="flex items-center gap-2.5 p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
                  title="Click to toggle Attendee / Organizer view"
                >
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="User"
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-amber-500/50"
                  />
                  <div className="text-left hidden xl:block pr-1">
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      Alex Rivera
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                    </div>
                    <div className="text-[10px] text-amber-400/90 font-medium capitalize">
                      {userRole} Mode
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsCreateEventOpen(true)}
              className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold"
              title="Create Event"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 py-5 space-y-3">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => { setActiveTab('discover'); setMobileMenuOpen(false); }}
              className={`flex items-center justify-between p-3 rounded-xl font-medium text-sm ${
                activeTab === 'discover' ? 'bg-amber-500/10 text-amber-400 font-bold' : 'text-slate-300'
              }`}
            >
              <span className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-amber-400" /> Discover Events
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('tickets'); setMobileMenuOpen(false); }}
              className={`flex items-center justify-between p-3 rounded-xl font-medium text-sm ${
                activeTab === 'tickets' ? 'bg-amber-500/10 text-amber-400 font-bold' : 'text-slate-300'
              }`}
            >
              <span className="flex items-center gap-3">
                <Ticket className="w-4 h-4 text-amber-400" /> My Tickets
              </span>
              {confirmedTicketsCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold bg-amber-500 text-slate-950 rounded-full">
                  {confirmedTicketsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('saved'); setMobileMenuOpen(false); }}
              className={`flex items-center justify-between p-3 rounded-xl font-medium text-sm ${
                activeTab === 'saved' ? 'bg-amber-500/10 text-amber-400 font-bold' : 'text-slate-300'
              }`}
            >
              <span className="flex items-center gap-3">
                <Bookmark className="w-4 h-4 text-rose-400" /> Wishlist
              </span>
              <span className="px-2 py-0.5 text-xs bg-slate-800 text-slate-300 rounded-full">
                {savedEventIds.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('organizer'); setMobileMenuOpen(false); }}
              className={`flex items-center justify-between p-3 rounded-xl font-medium text-sm ${
                activeTab === 'organizer' ? 'bg-amber-500/10 text-amber-400 font-bold' : 'text-slate-300'
              }`}
            >
              <span className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4 text-emerald-400" /> Organizer Studio & Check-in
              </span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="User"
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-amber-500/50"
              />
              <div>
                <p className="text-sm font-bold text-white">Alex Rivera</p>
                <p className="text-xs text-amber-400 font-medium">Hive Credits: $120.00</p>
              </div>
            </div>
            <button
              onClick={() => {
                const nextRole = userRole === 'attendee' ? 'organizer' : 'attendee';
                setUserRole(nextRole);
                if (nextRole === 'organizer') setActiveTab('organizer');
                setMobileMenuOpen(false);
              }}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300"
            >
              Switch Role
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
