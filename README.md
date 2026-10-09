# 🐝 EventHive • Event Booking & Management Platform

**EventHive** is a modern, high-performance event discovery, ticket booking, and host management web application built with React, Vite, Tailwind CSS, and Lucide Icons.

---

## ✨ Features Overview

### 🎟️ 1. Attendee & Discovery Experience
- **Dynamic Search & Filtering**:
  - Full-text search across titles, descriptions, speakers, tags, and cities.
  - Multi-category navigation: Tech & AI, Concerts & Music, Food & Wine, Business, Design & Art, Wellness, Gaming & LAN, Entertainment.
  - City/Location selector (San Francisco, New York, London, Tokyo, Los Angeles, Chicago, Napa Valley, Online).
  - Price filtering (Free, Under \$50, \$50–\$150, \$150+) & multi-criteria sorting (Featured, Date, Price, Popularity).
  - Toggle between **Grid View** and **Compact List View**.
- **Interactive Event Detail Pages**:
  - High-res visual banners, countdown markers, and organizer profiles with verification badges.
  - Multi-tab layout: **Overview**, **Schedule & Agenda Timeline**, **Featured Speakers & Hosts**, and **Venue Map Simulator**.
  - Direct admission tier selector with remaining stock countdowns.
- **Frictionless Ticket Checkout Flow**:
  - Dynamic pass quantity selector with stock limits.
  - Experience add-ons (Express Fast-Lane entry, craft welcome cocktail voucher).
  - Promo code discounts (e.g. `HIVE2026` for 20% off, `WELCOME10` for 10% off).
  - Multi-method simulated checkout (Credit Card, Apple Pay / Google Pay, Hive Credits).
  - Confetti celebration upon reservation confirmation.
- **Attendee Pass Vault ("My Tickets")**:
  - Filter by Active/Upcoming, Checked In, and Cancelled passes.
  - Holographic E-Ticket badge with **verified QR Code**, seat allocations, and attendee details.
  - **1-Click Calendar Export**: Downloads standard `.ics` file for Google Calendar, Apple Calendar, and Outlook.
  - **Print / PDF Export**: Formatted print styles for paper passes.
  - Bookmark & Wishlist management.

---

### 💼 2. Organizer Studio & Gate Operations
- **Real-Time Analytics & KPI Metrics**:
  - Gross Ticket Sales Revenue ($), Passes Sold, Venue Gate Check-In Rate (%), and Discovery Impressions.
  - Visual capacity distribution and inventory tracking bars for each hosted event.
  - **Attendee Registry CSV Export**: Instant 1-click download of all booked ticket holders.
- **Event Publishing Studio**:
  - Create and publish new live experiences in seconds.
  - Multi-tier pricing configuration (e.g., General Admission, VIP Pass, Early Bird) with custom ticket quantities.
  - Cover image presets (Tech, Concert Rave, Gastronomy, Spatial UX, Gaming) or custom image URLs.
- **Venue Gate Check-In Scanner**:
  - Real-time scanner simulator with animated laser viewfinder.
  - Instant QR code and Ticket ID verification.
  - Prevents duplicate entries: identifies already checked-in badges with exact entry timestamps.
  - 1-click test scan demo shortcuts.

---

## 🚀 Running The Project

The development server is running locally at:
```
http://localhost:3000/
```

### Useful Commands:
```bash
# Start Vite development server
npm run dev

# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Architecture
```
eventhive/
├── index.html                   # HTML entry point with fonts & meta
├── vite.config.js               # Vite configuration (port 3000)
├── tailwind.config.js           # Hive honey-amber and dark theme tokens
├── src/
│   ├── main.jsx                 # React root render
│   ├── App.jsx                  # Main view and modal orchestrator
│   ├── index.css                # Tailwind directives, print & glass styles
│   ├── context/
│   │   └── AppContext.jsx       # State management & LocalStorage persistence
│   ├── data/
│   │   └── mockEvents.js        # Seed events, categories, and sample passes
│   └── components/
│       ├── Navbar.jsx           # Responsive header, search & role switch
│       ├── Hero.jsx             # Hero banner with search and spotlight
│       ├── EventFilters.jsx     # Category chips, sort and price filter
│       ├── EventCard.jsx        # Grid and compact event cards
│       ├── EventDetailModal.jsx # Deep event view with agenda & speakers
│       ├── BookingCheckoutModal.jsx # Checkout modal with promo codes
│       ├── MyTicketsView.jsx    # Attendee ticket vault
│       ├── TicketBadgeModal.jsx # Printable holographic QR pass & .ics
│       ├── SavedEventsView.jsx  # Wishlist view
│       ├── OrganizerDashboard.jsx # Analytics, capacity and CSV export
│       ├── CreateEventModal.jsx # Event creation studio
│       ├── CheckInScannerModal.jsx # Gate QR check-in scanner
│       ├── Toast.jsx            # Toast alert system
│       └── Footer.jsx           # Platform footer & newsletter
```
