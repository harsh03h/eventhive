import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  Check, 
  CreditCard, 
  ShieldCheck, 
  Ticket, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Minus, 
  Plus, 
  Sparkles, 
  Tag, 
  CheckCircle2,
  Download,
  QrCode,
  Smartphone
} from 'lucide-react';

export default function BookingCheckoutModal() {
  const { 
    checkoutModal, 
    setCheckoutModal, 
    bookTicket, 
    setTicketBadgeModal,
    addToast
  } = useApp();

  const { isOpen, event, tier } = checkoutModal;

  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    phone: '+1 (415) 555-0199',
    specialNotes: ''
  });

  // Add-ons
  const [addons, setAddons] = useState({
    fastTrack: false, // $15
    cocktailVoucher: false // $20
  });

  // Promo code
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'applepay' | 'credits'
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedTicket, setConfirmedTicket] = useState(null);

  if (!isOpen || !event || !tier) return null;

  // Calculation
  const unitPrice = tier.price;
  const subtotal = unitPrice * quantity;
  const addonTotal = (addons.fastTrack ? 15 : 0) + (addons.cocktailVoucher ? 20 : 0);
  const discountAmount = discountPercent > 0 ? (subtotal * discountPercent) / 100 : 0;
  const platformFee = unitPrice > 0 ? 3.50 : 0;
  const grandTotal = Math.max(0, subtotal + addonTotal - discountAmount + platformFee);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'HIVE2026') {
      setDiscountPercent(20);
      setPromoApplied('HIVE2026 (20% OFF)');
      addToast('20% promo code applied!', 'success');
    } else if (code === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoApplied('WELCOME10 (10% OFF)');
      addToast('10% promo code applied!', 'success');
    } else {
      addToast('Invalid promo code. Try "HIVE2026" or "WELCOME10"', 'error');
    }
  };

  const handleCompleteBooking = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      addToast('Please provide your name and email.', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      const booked = bookTicket({
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventVenue: `${event.venue.name}, ${event.venue.city}`,
        eventCover: event.coverImage,
        tierName: tier.name,
        attendeeName: formData.name,
        attendeeEmail: formData.email,
        attendeePhone: formData.phone,
        specialNotes: formData.specialNotes,
        quantity,
        unitPrice,
        totalPrice: grandTotal,
        seatCode: `SEC-A / ROW-${Math.floor(1 + Math.random() * 8)} / SEAT-${Math.floor(10 + Math.random() * 80)}`,
        promoCodeUsed: promoApplied || null
      });

      setConfirmedTicket(booked);
    }, 1200);
  };

  const handleClose = () => {
    setCheckoutModal({ isOpen: false, event: null, tier: null });
    setConfirmedTicket(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl my-6">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">
              {confirmedTicket ? 'Booking Confirmed!' : 'Secure Ticket Checkout'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Screen */}
        {confirmedTicket ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-400 badge-glow">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
                You're in the hive!
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                Passes Reserved Successfully
              </h3>
              <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
                A confirmation receipt and digital wallet pass have been registered for <strong>{confirmedTicket.attendeeEmail}</strong>.
              </p>
            </div>

            {/* Ticket Pass Preview Card */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400">Order ID</span>
                  <p className="text-sm font-black text-amber-400">{confirmedTicket.id}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  Confirmed Active
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <h4 className="text-sm font-bold text-white">{confirmedTicket.eventTitle}</h4>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {confirmedTicket.eventDate} • {confirmedTicket.seatCode}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  handleClose();
                  setTicketBadgeModal({ isOpen: true, ticket: confirmedTicket });
                }}
                className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                View & Print QR Pass
              </button>

              <button
                onClick={handleClose}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all"
              >
                Back to Discovery
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleCompleteBooking} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Event Summary Banner */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4">
              <img
                src={event.coverImage}
                alt={event.title}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400">
                  {tier.name}
                </span>
                <h3 className="text-sm font-bold text-white line-clamp-1">{event.title}</h3>
                <p className="text-xs text-slate-400">{event.date} • {event.venue.city}</p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <div>
                <label className="text-sm font-bold text-white block">Pass Quantity</label>
                <span className="text-xs text-slate-400">${unitPrice} each</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-base font-bold text-white w-6 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(tier.remaining || 10, quantity + 1))}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Attendee Details Form */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Attendee Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-semibold mb-1 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold mb-1 block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Mobile Number (For SMS QR Pass)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Optional Add-ons */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Experience Add-ons (Optional)
              </h4>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={addons.fastTrack}
                    onChange={(e) => setAddons({ ...addons, fastTrack: e.target.checked })}
                    className="rounded text-amber-500 focus:ring-amber-400"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Expedited Fast-Lane Entry</span>
                    <span className="text-[11px] text-slate-400">Skip the queue with express RFID band</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400">+$15</span>
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={addons.cocktailVoucher}
                    onChange={(e) => setAddons({ ...addons, cocktailVoucher: e.target.checked })}
                    className="rounded text-amber-500 focus:ring-amber-400"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Craft Welcome Cocktail / Mocktail</span>
                    <span className="text-[11px] text-slate-400">Redeemable at the main venue bar</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400">+$20</span>
              </label>
            </div>

            {/* Promo Code Applicator */}
            <div className="pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (try HIVE2026)"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-400 border border-slate-700"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-[11px] text-emerald-400 font-semibold mt-1.5 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Code {promoApplied} applied!
                </p>
              )}
            </div>

            {/* Payment Method Tabs */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Payment Method
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'applepay', label: 'Apple / G-Pay', icon: Smartphone },
                  { id: 'credits', label: 'Hive Credits ($120)', icon: Sparkles }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setPaymentMethod(item.id)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMethod === item.id
                          ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[11px] block">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Calculation Summary */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>{quantity}x {tier.name}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {addonTotal > 0 && (
                <div className="flex justify-between text-slate-400">
                  <span>Selected Add-ons</span>
                  <span>+${addonTotal.toFixed(2)}</span>
                </div>
              )}
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Promo Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              {platformFee > 0 && (
                <div className="flex justify-between text-slate-400">
                  <span>Processing & Platform Fee</span>
                  <span>${platformFee.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-black text-white">
                <span>Total Amount Due</span>
                <span className="text-amber-400 text-base">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  Securing Encrypted Reservation...
                </span>
              ) : (
                <>
                  <span>Confirm & Authorize ${grandTotal.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit TLS Security • Instant Verified QR Pass Delivery</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
