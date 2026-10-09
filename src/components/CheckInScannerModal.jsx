import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  QrCode, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Camera, 
  Scan, 
  Sparkles, 
  UserCheck 
} from 'lucide-react';

export default function CheckInScannerModal() {
  const { 
    isCheckInScannerOpen, 
    setIsCheckInScannerOpen, 
    checkInAttendee, 
    tickets 
  } = useApp();

  const [inputCode, setInputCode] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [isScanningAnim, setIsScanningAnim] = useState(true);

  if (!isCheckInScannerOpen) return null;

  const handleProcessScan = (codeToTest) => {
    const code = (codeToTest || inputCode).trim();
    if (!code) return;

    const res = checkInAttendee(code);
    setScanResult(res);
    setInputCode('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl my-6">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scan className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">EventHive Gate Scanner</h2>
          </div>
          <button
            onClick={() => {
              setIsCheckInScannerOpen(false);
              setScanResult(null);
            }}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scanner Body */}
        <div className="p-6 space-y-6">
          
          {/* Simulated Camera Viewfinder */}
          <div className="relative h-60 w-full rounded-2xl bg-black border-2 border-slate-800 overflow-hidden flex items-center justify-center">
            {/* Camera Background Simulation */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:12px_12px]" />
            
            {/* Viewfinder Target Box */}
            <div className="relative w-48 h-48 border-2 border-amber-400/80 rounded-2xl flex items-center justify-center">
              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-amber-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-amber-400" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-amber-400" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-amber-400" />

              {/* Laser Scan line animation */}
              <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b] animate-pulse" />

              <div className="text-center space-y-1">
                <QrCode className="w-10 h-10 text-amber-400/60 mx-auto" />
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Align QR Code
                </span>
              </div>
            </div>

            {/* Camera Status Tag */}
            <div className="absolute bottom-3 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-[10px] text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Camera Active (Gate Terminal 01)
            </div>
          </div>

          {/* Quick Manual / Test Barcode Bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleProcessScan();
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Scan or enter Ticket ID (e.g. HIVE-TK-89241)..."
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 uppercase"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
            >
              Verify
            </button>
          </form>

          {/* Verification Feedback Result */}
          {scanResult && (
            <div className={`p-4 rounded-2xl border transition-all ${
              scanResult.success
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                : scanResult.ticket?.status === 'checked-in'
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
            }`}>
              <div className="flex items-start gap-3">
                {scanResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                )}

                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-sm text-white">
                    {scanResult.message}
                  </h4>
                  {scanResult.ticket && (
                    <div className="text-slate-300 space-y-0.5 pt-1">
                      <p><strong>Guest:</strong> {scanResult.ticket.attendeeName} ({scanResult.ticket.attendeeEmail})</p>
                      <p><strong>Event:</strong> {scanResult.ticket.eventTitle}</p>
                      <p><strong>Tier / Seat:</strong> {scanResult.ticket.tierName} • {scanResult.ticket.seatCode}</p>
                      {scanResult.ticket.checkedInAt && (
                        <p className="text-emerald-400 font-semibold">
                          Timestamp: {scanResult.ticket.checkedInAt}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Fast Simulation Shortcuts */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              1-Click Test Scans (Demo Attendees)
            </span>
            <div className="flex flex-wrap gap-2">
              {tickets.slice(0, 4).map((tk) => (
                <button
                  key={tk.id}
                  onClick={() => handleProcessScan(tk.id)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  {tk.id} ({tk.attendeeName})
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
