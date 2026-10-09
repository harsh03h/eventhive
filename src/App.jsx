import React from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventFilters from './components/EventFilters';
import EventCard from './components/EventCard';
import EventDetailModal from './components/EventDetailModal';
import BookingCheckoutModal from './components/BookingCheckoutModal';
import TicketBadgeModal from './components/TicketBadgeModal';
import MyTicketsView from './components/MyTicketsView';
import SavedEventsView from './components/SavedEventsView';
import OrganizerDashboard from './components/OrganizerDashboard';
import CreateEventModal from './components/CreateEventModal';
import CheckInScannerModal from './components/CheckInScannerModal';
import Toast from './components/Toast';
import Footer from './components/Footer';
import { Frown } from 'lucide-react';

export default function App() {
  const { 
    activeTab, 
    filteredEvents, 
    viewMode, 
    selectedCategory, 
    setSelectedCategory 
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      
      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {activeTab === 'discover' && (
          <div>
            {/* Hero Section */}
            <Hero />

            {/* Event Discovery Catalog Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Filter Controls */}
              <EventFilters />

              {/* Event Cards Grid / List */}
              {filteredEvents.length === 0 ? (
                <div className="py-20 text-center space-y-4 max-w-md mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-400">
                    <Frown className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">No experiences found</h3>
                  <p className="text-sm text-slate-400">
                    We couldn't find any events matching your selected filters. Try broadening your search or resetting category filters.
                  </p>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
                  >
                    View All Events
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} compact />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* My Tickets View */}
        {activeTab === 'tickets' && <MyTicketsView />}

        {/* Wishlist View */}
        {activeTab === 'saved' && <SavedEventsView />}

        {/* Organizer Management Dashboard */}
        {activeTab === 'organizer' && <OrganizerDashboard />}
      </main>

      {/* Interactive Modals */}
      <EventDetailModal />
      <BookingCheckoutModal />
      <TicketBadgeModal />
      <CreateEventModal />
      <CheckInScannerModal />

      {/* Floating Notifications */}
      <Toast />

      {/* Platform Footer */}
      <Footer />

    </div>
  );
}
