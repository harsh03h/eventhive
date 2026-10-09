import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  QrCode, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  AlertCircle 
} from 'lucide-react';

export default function MyTicketsView() {
  const { 
    tickets, 
    setTicketBadgeModal, 
    cancelTicket, 
    setActiveTab,
    addToast 
  } = useApp();

  const [filter, setFilter] = useState('all'); // 'all' | 'confirmed' | 'checked-in' | 'cancelled'
  const [searchTicket, setSearchTicket] = useState('');

  const filteredTickets = tickets.filter((t) => {
    if (filter !== 'all' && t.status !== filter) return false;
    if (searchTicket.trim()) {
      const q = searchTicket.toLowerCase();
      return (
        t.eventTitle.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.attendeeName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Ticket className="w-4 h-4" />
            <span>Attendee Vault</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">My Bookings & Passes</h1>
          <p className="text-sm text-slate-400 mt-1">
            Access your verified entry passes, holographic QR codes, and reservation receipts.
          </p>
        </div>

        {/* Stats Pill */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block font-medium">Total Passes</span>
            <span className="text-lg font-black text-amber-400">{tickets.length}</span>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block font-medium">Active Passes</span>
            <span className="text-lg font-black text-emerald-400">
              {tickets.filter((t) => t.status === 'confirmed').length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Passes' },
            { id: 'confirmed', label: 'Upcoming / Active' },
            { id: 'checked-in', label: 'Checked In' },
            { id: 'cancelled', label: 'Cancelled' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Ticket Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTicket}
            onChange={(e) => setSearchTicket(e.target.value)}
            placeholder="Search tickets or Order ID..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Tickets List */}
      {filteredTickets.length === 0 ? (
        <div className="p-12 rounded-3xl bg-slate-900/50 border border-slate-800 text-center space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <Ticket className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">No passes found</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {searchTicket || filter !== 'all'
              ? 'Try modifying your search or switching filter categories.'
              : 'You haven’t booked any event passes yet. Browse exciting experiences in the hive!'}
          </p>
          <button
            onClick={() => setActiveTab('discover')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Discover Events
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTickets.map((tk) => {
            const isConfirmed = tk.status === 'confirmed';
            const isCheckedIn = tk.status === 'checked-in';
            const isCancelled = tk.status === 'cancelled';

            return (
              <div
                key={tk.id}
                className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 overflow-hidden shadow-xl flex flex-col justify-between transition-all"
              >
                {/* Top Section */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      {tk.id}
                    </span>

                    {/* Status Badge */}
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                      isCheckedIn
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : isCancelled
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {isCheckedIn && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {isCancelled && <XCircle className="w-3.5 h-3.5" />}
                      {isConfirmed && <Clock className="w-3.5 h-3.5" />}
                      <span className="capitalize">{tk.status}</span>
                    </span>
                  </div>

                  {/* Main Event Info */}
                  <div className="flex gap-4 items-start">
                    {tk.eventCover && (
                      <img
                        src={tk.eventCover}
                        alt={tk.eventTitle}
                        className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                      />
                    )}

                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                        {tk.tierName} • {tk.quantity} Pass(es)
                      </span>
                      <h3 className="text-base font-extrabold text-white leading-snug">
                        {tk.eventTitle}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {tk.eventDate} ({tk.eventTime})
                      </p>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span className="truncate max-w-[280px]">{tk.eventVenue}</span>
                      </p>
                    </div>
                  </div>

                  {/* Attendee Info bar */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-bold uppercase">Pass Holder</span>
                      <span className="text-white font-semibold truncate block">{tk.attendeeName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-bold uppercase">Allocated Seat</span>
                      <span className="text-amber-400 font-semibold block">{tk.seatCode || 'GA Standing'}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div className="text-xs">
                    <span className="text-slate-500 block">Total Paid</span>
                    <span className="text-sm font-extrabold text-white">${tk.totalPrice}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isConfirmed && (
                      <button
                        onClick={() => cancelTicket(tk.id)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
                      >
                        Cancel
                      </button>
                    )}

                    <button
                      onClick={() => setTicketBadgeModal({ isOpen: true, ticket: tk })}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      View QR Pass
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
