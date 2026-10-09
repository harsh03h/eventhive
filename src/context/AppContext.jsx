import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_EVENTS, INITIAL_TICKETS } from '../data/mockEvents';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Events
  const [events, setEvents] = useState(() => {
    try {
      const stored = localStorage.getItem('eventhive_events');
      return stored ? JSON.parse(stored) : INITIAL_EVENTS;
    } catch (e) {
      return INITIAL_EVENTS;
    }
  });

  // User Tickets / Bookings
  const [tickets, setTickets] = useState(() => {
    try {
      const stored = localStorage.getItem('eventhive_tickets');
      return stored ? JSON.parse(stored) : INITIAL_TICKETS;
    } catch (e) {
      return INITIAL_TICKETS;
    }
  });

  // Saved / Liked Events
  const [savedEventIds, setSavedEventIds] = useState(() => {
    try {
      const stored = localStorage.getItem('eventhive_saved');
      return stored ? JSON.parse(stored) : ['evt-1', 'evt-2'];
    } catch (e) {
      return ['evt-1', 'evt-2'];
    }
  });

  // User Role & View
  const [userRole, setUserRole] = useState('attendee'); // 'attendee' | 'organizer'
  const [activeTab, setActiveTab] = useState('discover'); // 'discover' | 'tickets' | 'organizer' | 'saved'

  // Modals
  const [selectedEvent, setSelectedEvent] = useState(null); // for EventDetailModal
  const [checkoutModal, setCheckoutModal] = useState({ isOpen: false, event: null, tier: null });
  const [ticketBadgeModal, setTicketBadgeModal] = useState({ isOpen: false, ticket: null });
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isCheckInScannerOpen, setIsCheckInScannerOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('All Locations');
  const [dateFilter, setDateFilter] = useState('all'); // 'all', 'today', 'weekend', 'month'
  const [priceFilter, setPriceFilter] = useState('all'); // 'all', 'free', 'under50', '50to150', 'over150'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'date-asc', 'price-asc', 'price-desc', 'popular'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'compact'

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('eventhive_events', JSON.stringify(events));
    } catch (e) {}
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem('eventhive_tickets', JSON.stringify(tickets));
    } catch (e) {}
  }, [tickets]);

  useEffect(() => {
    try {
      localStorage.setItem('eventhive_saved', JSON.stringify(savedEventIds));
    } catch (e) {}
  }, [savedEventIds]);

  const addToast = (message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle bookmark / saved
  const toggleSaveEvent = (eventId, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setSavedEventIds((prev) => {
      const isSaved = prev.includes(eventId);
      if (isSaved) {
        addToast('Removed from saved events', 'info');
        return prev.filter((id) => id !== eventId);
      } else {
        addToast('Saved to your wishlist! 🐝', 'success');
        return [...prev, eventId];
      }
    });
  };

  // Book Ticket Handler
  const bookTicket = (bookingData) => {
    const newTicketId = `HIVE-TK-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTicket = {
      id: newTicketId,
      status: 'confirmed',
      bookingDate: new Date().toISOString().split('T')[0],
      qrCodeValue: `EVENTHIVE-VERIFIED-${newTicketId}-${bookingData.eventId}`,
      ...bookingData
    };

    // Update tickets
    setTickets((prev) => [newTicket, ...prev]);

    // Decrement tier remaining count in events
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === bookingData.eventId) {
          const updatedTiers = evt.tiers.map((t) => {
            if (t.name === bookingData.tierName) {
              return { ...t, remaining: Math.max(0, t.remaining - bookingData.quantity) };
            }
            return t;
          });
          return { ...evt, tiers: updatedTiers };
        }
        return evt;
      })
    );

    addToast(`Ticket confirmed! Order ID: ${newTicketId}`, 'success', 5000);
    return newTicket;
  };

  // Cancel Ticket
  const cancelTicket = (ticketId) => {
    setTickets((prev) =>
      prev.map((tk) => (tk.id === ticketId ? { ...tk, status: 'cancelled' } : tk))
    );
    addToast('Ticket cancelled and refund initiated.', 'info');
  };

  // Check In Attendee (Organizer Tool)
  const checkInAttendee = (ticketIdOrCode) => {
    const cleanQuery = ticketIdOrCode.trim().toUpperCase();
    const foundIndex = tickets.findIndex(
      (tk) =>
        tk.id.toUpperCase() === cleanQuery ||
        tk.qrCodeValue.toUpperCase().includes(cleanQuery)
    );

    if (foundIndex === -1) {
      return { success: false, message: 'Ticket not found or invalid QR code.' };
    }

    const ticket = tickets[foundIndex];
    if (ticket.status === 'checked-in') {
      return {
        success: false,
        message: `Ticket ${ticket.id} was already checked in earlier!`,
        ticket
      };
    }

    if (ticket.status === 'cancelled') {
      return {
        success: false,
        message: `Cannot check in. Ticket ${ticket.id} is marked CANCELLED.`,
        ticket
      };
    }

    const updated = {
      ...ticket,
      status: 'checked-in',
      checkedInAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTickets((prev) => {
      const copy = [...prev];
      copy[foundIndex] = updated;
      return copy;
    });

    addToast(`Successfully checked in: ${ticket.attendeeName} (${ticket.tierName})`, 'success');
    return { success: true, message: 'Attendee Verified & Checked In!', ticket: updated };
  };

  // Add New Event
  const addEvent = (newEventData) => {
    const newId = `evt-${Date.now()}`;
    const completeEvent = {
      id: newId,
      views: 0,
      likes: 0,
      ...newEventData
    };
    setEvents((prev) => [completeEvent, ...prev]);
    addToast('🎉 New event published live on EventHive!', 'success');
    return completeEvent;
  };

  // Update Event
  const updateEvent = (id, updatedFields) => {
    setEvents((prev) =>
      prev.map((evt) => (evt.id === id ? { ...evt, ...updatedFields } : evt))
    );
    addToast('Event updated successfully.', 'success');
  };

  // Delete Event
  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((evt) => evt.id !== id));
    addToast('Event has been deleted.', 'info');
  };

  // Open Checkout
  const openCheckout = (event, tier) => {
    setSelectedEvent(null); // close detail modal if open
    setCheckoutModal({ isOpen: true, event, tier });
  };

  // Filtered Events logic
  const filteredEvents = events.filter((evt) => {
    // Category
    if (selectedCategory !== 'all' && evt.category !== selectedCategory) {
      return false;
    }
    // Location
    if (selectedCity !== 'All Locations') {
      if (selectedCity === 'Online' && evt.format !== 'online') return false;
      if (selectedCity !== 'Online' && evt.venue?.city !== selectedCity) return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = evt.title.toLowerCase().includes(q);
      const matchDesc = evt.description.toLowerCase().includes(q);
      const matchVenue = evt.venue?.name?.toLowerCase().includes(q) || evt.venue?.city?.toLowerCase().includes(q);
      const matchOrg = evt.organizer?.name?.toLowerCase().includes(q);
      const matchTags = evt.tags?.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchVenue && !matchOrg && !matchTags) {
        return false;
      }
    }
    // Price filter
    if (priceFilter !== 'all') {
      const minPrice = Math.min(...evt.tiers.map((t) => t.price));
      if (priceFilter === 'free' && minPrice > 0) return false;
      if (priceFilter === 'under50' && (minPrice < 0 || minPrice > 50)) return false;
      if (priceFilter === '50to150' && (minPrice < 50 || minPrice > 150)) return false;
      if (priceFilter === 'over150' && minPrice <= 150) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'featured') {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
    if (sortBy === 'popular') {
      return (b.views || 0) - (a.views || 0);
    }
    if (sortBy === 'price-asc') {
      const minA = Math.min(...a.tiers.map((t) => t.price));
      const minB = Math.min(...b.tiers.map((t) => t.price));
      return minA - minB;
    }
    if (sortBy === 'price-desc') {
      const maxA = Math.max(...a.tiers.map((t) => t.price));
      const maxB = Math.max(...b.tiers.map((t) => t.price));
      return maxB - maxA;
    }
    if (sortBy === 'date-asc') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return 0;
  });

  return (
    <AppContext.Provider
      value={{
        events,
        filteredEvents,
        tickets,
        savedEventIds,
        userRole,
        setUserRole,
        activeTab,
        setActiveTab,
        selectedEvent,
        setSelectedEvent,
        checkoutModal,
        setCheckoutModal,
        ticketBadgeModal,
        setTicketBadgeModal,
        isCreateEventOpen,
        setIsCreateEventOpen,
        isCheckInScannerOpen,
        setIsCheckInScannerOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedCity,
        setSelectedCity,
        dateFilter,
        setDateFilter,
        priceFilter,
        setPriceFilter,
        sortBy,
        setSortBy,
        viewMode,
        setViewMode,
        toasts,
        addToast,
        removeToast,
        toggleSaveEvent,
        bookTicket,
        cancelTicket,
        checkInAttendee,
        addEvent,
        updateEvent,
        deleteEvent,
        openCheckout
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
