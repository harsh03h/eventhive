import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  PlusCircle, 
  DollarSign, 
  Users, 
  Eye, 
  CheckCircle, 
  QrCode, 
  Trash2, 
  Calendar, 
  TrendingUp, 
  Download, 
  MapPin, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Search
} from 'lucide-react';

export default function OrganizerDashboard() {
  const { 
    events, 
    tickets, 
    setIsCreateEventOpen, 
    setIsCheckInScannerOpen, 
    deleteEvent,
    addToast,
    setSelectedEvent
  } = useApp();

  const [searchTable, setSearchTable] = useState('');

  // Calculate aggregates
  const totalRevenue = tickets
    .filter(t => t.status !== 'cancelled')
    .reduce((sum, t) => sum + (t.totalPrice || 0), 0);

  const totalTicketsSold = tickets.filter(t => t.status !== 'cancelled').length;
  const checkedInCount = tickets.filter(t => t.status === 'checked-in').length;
  const checkInRate = totalTicketsSold > 0 ? Math.round((checkedInCount / totalTicketsSold) * 100) : 0;
  const totalPageViews = events.reduce((sum, e) => sum + (e.views || 0), 0);

  // Filter events for the dashboard table
  const tableEvents = events.filter(e => {
    if (!searchTable.trim()) return true;
    const q = searchTable.toLowerCase();
    return e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q) || e.venue.city.toLowerCase().includes(q);
  });

  const handleExportCSV = () => {
    const headers = 'Ticket ID,Event,Attendee,Email,Tier,Price,Status\n';
    const rows = tickets.map(t => 
      `"${t.id}","${t.eventTitle}","${t.attendeeName}","${t.attendeeEmail}","${t.tierName}",${t.totalPrice},"${t.status}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `eventhive-attendees-export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Attendee registry exported as CSV! 📊', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header & Fast Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <LayoutDashboard className="w-4 h-4" />
            <span>Organizer Management Suite</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">Host Operations & Analytics</h1>
          <p className="text-sm text-slate-400 mt-1">
            Track real-time ticket sales, monitor live venue check-ins, and publish experiences.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Check-In QR Scanner CTA */}
          <button
            onClick={() => setIsCheckInScannerOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-2 shadow-lg"
          >
            <QrCode className="w-4 h-4" />
            Check-In Scanner
          </button>

          {/* Create New Event CTA */}
          <button
            onClick={() => setIsCreateEventOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            Publish New Event
          </button>
        </div>
      </div>

      {/* Analytics KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Revenue */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Gross Ticket Sales</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white">${totalRevenue.toLocaleString()}</span>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% this month</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Tickets Sold */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 relative overflow-hidden group hover:border-indigo-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Passes Booked</span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white">{totalTicketsSold}</span>
            <div className="text-xs text-slate-400 mt-1">
              Across {events.length} active hosted events
            </div>
          </div>
        </div>

        {/* Metric 3: Check-in Rate */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Gate Check-In</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white">{checkInRate}%</span>
            <div className="text-xs text-emerald-400 font-semibold mt-1">
              {checkedInCount} verified at venue door
            </div>
          </div>
        </div>

        {/* Metric 4: Impressions */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 relative overflow-hidden group hover:border-pink-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Discovery Views</span>
            <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white">{totalPageViews.toLocaleString()}</span>
            <div className="text-xs text-slate-400 mt-1">
              High conversion rate (4.8%)
            </div>
          </div>
        </div>

      </div>

      {/* Visual Analytics & Performance Chart Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Event Capacity & Ticket Sales Distribution
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live inventory tracking across all scheduled sessions
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            Export Attendee CSV
          </button>
        </div>

        {/* Event Sales Progress Bars */}
        <div className="space-y-4">
          {events.slice(0, 5).map((evt) => {
            const totalCap = evt.tiers.reduce((acc, t) => acc + (t.total || 100), 0);
            const remaining = evt.tiers.reduce((acc, t) => acc + (t.remaining || 0), 0);
            const sold = Math.max(0, totalCap - remaining);
            const percentage = Math.min(100, Math.round((sold / totalCap) * 100));

            return (
              <div key={evt.id} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white truncate max-w-md">{evt.title}</span>
                  <span className="text-slate-400 font-semibold">
                    <strong className="text-amber-400">{sold}</strong> / {totalCap} passes sold ({percentage}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-700"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hosted Events Management Table */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl space-y-4">
        
        {/* Table Controls */}
        <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">Your Hosted Experiences</h3>
            <p className="text-xs text-slate-400">Manage event statuses, preview details, or remove listings.</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTable}
              onChange={(e) => setSearchTable(e.target.value)}
              placeholder="Search hosted events..."
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Event Details</th>
                <th className="px-6 py-4">Category & Format</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Price Range</th>
                <th className="px-6 py-4">Total Views</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {tableEvents.map((evt) => {
                const prices = evt.tiers.map((t) => t.price);
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);

                return (
                  <tr key={evt.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={evt.coverImage}
                          alt={evt.title}
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                        />
                        <div>
                          <span 
                            onClick={() => setSelectedEvent(evt)}
                            className="font-bold text-white hover:text-amber-400 transition-colors cursor-pointer block line-clamp-1"
                          >
                            {evt.title}
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            {evt.venue.city}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 text-amber-300 font-semibold text-[11px]">
                        {evt.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-300 font-medium">
                      {evt.date}
                    </td>

                    <td className="px-6 py-4 font-bold text-amber-400">
                      {minPrice === 0 ? 'FREE' : `$${minPrice} - $${maxPrice}`}
                    </td>

                    <td className="px-6 py-4 text-slate-300">
                      {(evt.views || 0).toLocaleString()} views
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedEvent(evt)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="Preview Event Page"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => deleteEvent(evt.id)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors"
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
