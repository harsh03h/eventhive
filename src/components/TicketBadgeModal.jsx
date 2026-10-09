import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Printer, 
  Calendar, 
  MapPin, 
  User, 
  QrCode, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Hexagon, 
  Share2 
} from 'lucide-react';

export default function TicketBadgeModal() {
  const { ticketBadgeModal, setTicketBadgeModal, addToast } = useApp();
  const { isOpen, ticket } = ticketBadgeModal;

  if (!isOpen || !ticket) return null;

  const handlePrint = () => {
    window.print();
  };

  // Calendar Export generator (.ics file)
  const handleDownloadICS = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//EventHive//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${ticket.eventTitle}`,
      `DESCRIPTION:EventHive Admission Pass for ${ticket.attendeeName} (${ticket.tierName}). Ticket ID: ${ticket.id}`,
      `LOCATION:${ticket.eventVenue}`,
      `DTSTART:${ticket.eventDate.replace(/-/g, '')}T100000Z`,
      `DTEND:${ticket.eventDate.replace(/-/g, '')}T180000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${ticket.id}-eventhive-calendar.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Calendar invite (.ics) downloaded!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl my-6">
        
        {/* Header / Actions */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hexagon className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span className="text-sm font-black tracking-wide text-white">EventHive Pass</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
              title="Print E-Ticket"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTicketBadgeModal({ isOpen: false, ticket: null })}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Ticket Area */}
        <div id="printable-ticket" className="p-6 sm:p-8 space-y-6 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
          
          {/* Top Holographic / Ticket Stub Header */}
          <div className="relative p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-indigo-500/15 border border-amber-500/30 overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                Official E-Pass
              </span>
              <span className="text-xs font-mono font-bold text-amber-300">
                {ticket.id}
              </span>
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-extrabold text-white leading-snug">
                {ticket.eventTitle}
              </h2>
              <p className="text-xs text-amber-400/90 font-semibold mt-1">
                Tier: {ticket.tierName}
              </p>
            </div>
          </div>

          {/* Ticket Information Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Attendee</span>
              <span className="text-sm font-bold text-white mt-0.5 block truncate">{ticket.attendeeName}</span>
              <span className="text-[11px] text-slate-400 truncate block">{ticket.attendeeEmail}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Seat / Allocation</span>
              <span className="text-sm font-bold text-amber-400 mt-0.5 block">{ticket.seatCode || 'General Entry'}</span>
              <span className="text-[11px] text-slate-400 block">{ticket.quantity} Pass(es)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Date & Schedule</span>
              <span className="text-xs font-bold text-white mt-0.5 block">{ticket.eventDate}</span>
              <span className="text-[11px] text-slate-400 block truncate">{ticket.eventTime}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Status</span>
              <span className={`text-xs font-black mt-0.5 uppercase block ${
                ticket.status === 'checked-in' ? 'text-emerald-400' : ticket.status === 'cancelled' ? 'text-rose-400' : 'text-amber-400'
              }`}>
                ● {ticket.status}
              </span>
              <span className="text-[11px] text-slate-400 block">Total: ${ticket.totalPrice}</span>
            </div>
          </div>

          {/* Venue Info */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-2.5 text-xs">
            <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Venue</span>
              <span className="text-slate-400">{ticket.eventVenue}</span>
            </div>
          </div>

          {/* Perforated Divider line */}
          <div className="relative py-2 flex items-center">
            <div className="absolute -left-6 w-5 h-5 rounded-full bg-black border-r border-slate-800" />
            <div className="w-full border-t border-dashed border-slate-700" />
            <div className="absolute -right-6 w-5 h-5 rounded-full bg-black border-l border-slate-800" />
          </div>

          {/* Simulated QR Code Badge & Scanner Validation */}
          <div className="p-6 rounded-2xl bg-white text-slate-950 text-center space-y-3 shadow-xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 block">
              Scan at Venue Gate
            </span>

            {/* Simulated high-fidelity QR Code with centered hive logo */}
            <div className="relative w-44 h-44 mx-auto bg-slate-100 p-2 rounded-2xl border-2 border-slate-900 flex items-center justify-center">
              {/* SVG QR Code Pattern */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950 fill-current">
                {/* 3 Corner positional anchors */}
                <rect x="5" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="12" y="12" width="11" height="11" fill="currentColor" />
                
                <rect x="70" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="77" y="12" width="11" height="11" fill="currentColor" />

                <rect x="5" y="70" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="12" y="77" width="11" height="11" fill="currentColor" />

                {/* Random dense data blocks */}
                <rect x="36" y="8" width="6" height="6" />
                <rect x="48" y="12" width="6" height="6" />
                <rect x="58" y="6" width="6" height="6" />
                
                <rect x="8" y="38" width="6" height="6" />
                <rect x="20" y="44" width="6" height="6" />
                <rect x="8" y="54" width="6" height="6" />

                <rect x="36" y="36" width="7" height="7" />
                <rect x="48" y="46" width="6" height="6" />
                <rect x="56" y="36" width="8" height="8" />
                <rect x="42" y="60" width="6" height="6" />

                <rect x="72" y="38" width="6" height="6" />
                <rect x="84" y="48" width="8" height="6" />
                <rect x="76" y="62" width="6" height="6" />

                <rect x="38" y="76" width="8" height="8" />
                <rect x="52" y="74" width="6" height="6" />
                <rect x="68" y="80" width="8" height="8" />
                <rect x="84" y="74" width="6" height="6" />
              </svg>

              {/* Center Bee Emblem */}
              <div className="absolute w-10 h-10 rounded-xl bg-amber-400 border-2 border-slate-950 flex items-center justify-center shadow-lg">
                <Hexagon className="w-5 h-5 text-slate-950 fill-slate-950" />
              </div>
            </div>

            <p className="font-mono text-xs font-extrabold text-slate-800 tracking-wider">
              {ticket.qrCodeValue}
            </p>

            <p className="text-[10px] text-slate-500 font-medium">
              Verified by EventHive Cryptographic Pass Registry
            </p>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleDownloadICS}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Add to Calendar (.ics)
            </button>

            <button
              onClick={handlePrint}
              className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
