export const INITIAL_EVENTS = [
  {
    id: 'evt-1',
    title: 'NexusAI Global Summit 2026',
    subtitle: 'Autonomous Agents, Frontier Models & The Future of Human-AI Synergy',
    category: 'Technology',
    format: 'in-person',
    featured: true,
    date: '2026-11-14',
    time: '09:00 AM - 06:30 PM PST',
    venue: {
      name: 'Moscone Convention Center',
      address: '747 Howard St, San Francisco, CA 94103',
      city: 'San Francisco',
      country: 'USA',
      mapQuery: 'Moscone Center, San Francisco'
    },
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    organizer: {
      name: 'Aetheria Labs & AI Guild',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      role: 'Premier Technology Host',
      verified: true,
      followers: 18400,
      bio: 'Leading developer summits across Silicon Valley, Tokyo, and London.'
    },
    description: `Join over 3,500 builders, AI researchers, founders, and venture pioneers at the premier intelligence summit of the year. 
    
Featuring live keynotes on self-evolving agent swarms, multimodal synthetic brains, distributed edge AI, and ethics frameworks. Hands-on coding workshops, investor roundtables, and VIP rooftop networking.`,
    tiers: [
      {
        id: 'tier-early',
        name: 'Early Adopter Pass',
        price: 149,
        originalPrice: 249,
        remaining: 18,
        total: 100,
        description: 'Full keynotes access, demo floor, community lunch & digital recordings.',
        perks: ['Main stage access', 'Expo hall entry', 'Lunch & refreshments', 'Digital video replay']
      },
      {
        id: 'tier-pro',
        name: 'Builder & Pro Pass',
        price: 299,
        originalPrice: 399,
        remaining: 45,
        total: 250,
        description: 'Includes hands-on AI workshops, code labs, and developer networking lounge.',
        perks: ['All Early Pass perks', 'Hands-on AI Lab seat', 'Priority Q&A mic', 'VIP Dev Lounge access']
      },
      {
        id: 'tier-vip',
        name: 'Founder & VIP All-Access',
        price: 599,
        originalPrice: 799,
        remaining: 6,
        total: 50,
        description: 'Private speaker dinner, executive summit lounge, fast-track check-in & 1:1 investor matching.',
        perks: ['All Builder perks', 'Private Speaker Dinner', 'VIP Concierge fast-track', '1:1 Investor Matching Hub', 'Hive VIP Swag Box']
      }
    ],
    agenda: [
      { time: '09:00 AM', title: 'Opening Keynote: Autonomous Swarms & Frontier Models', speaker: 'Dr. Elena Vance, Chief Scientist at Aetheria' },
      { time: '11:15 AM', title: 'Panel: Next-Gen Compute Architecture & Silicon Innovations', speaker: 'Marcus Chen & Tech Leaders' },
      { time: '01:00 PM', title: 'Gourmet Networking Lunch & Innovation Expo', speaker: 'All Attendees' },
      { time: '02:30 PM', title: 'Breakout Lab: Fine-Tuning Multi-Agent Workflows in Real-Time', speaker: 'Dev Advocates' },
      { time: '05:00 PM', title: 'Founder Pitch Showcase & Venture Awards', speaker: 'Finalist Startups' },
      { time: '06:00 PM', title: 'Sunset Rooftop Mixer & Live Ambient DJ Set', speaker: 'Special Guest' }
    ],
    speakers: [
      { name: 'Dr. Elena Vance', role: 'Head of Frontier Research', company: 'Aetheria Labs', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
      { name: 'Marcus Chen', role: 'VP of AI Systems', company: 'HyperScale Systems', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Sarah Lin', role: 'Partner & Seed Investor', company: 'Matrix Horizon', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' }
    ],
    tags: ['Artificial Intelligence', 'Machine Learning', 'Startups', 'Tech Conference'],
    views: 12450,
    likes: 840
  },
  {
    id: 'evt-2',
    title: 'Neon Odyssey: Electronic Arts & Music Festival',
    subtitle: '3 Days of Immersive Holographic Stages, Synthesizers & Visual Wonders',
    category: 'Music',
    format: 'in-person',
    featured: true,
    date: '2026-12-05',
    time: '04:00 PM - 02:00 AM EST',
    venue: {
      name: 'Brooklyn Mirage Waterfront Ground',
      address: '140 Stewart Ave, Brooklyn, NY 11237',
      city: 'New York',
      country: 'USA',
      mapQuery: 'Brooklyn Mirage, New York'
    },
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    organizer: {
      name: 'Vivid Pulse Entertainment',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      role: 'Festival Curator',
      verified: true,
      followers: 42100,
      bio: 'Award-winning festival producer bringing world-class electronic soundscapes to life.'
    },
    description: `Step into an otherworldly audio-visual dimension. Featuring four themed stages, 360-degree laser mapping, world-renowned electronic DJs, artisan craft cocktails, and interactive cyber-art pavilions. 
    
Prepare for pulsating bass, transcendent synth chords, and an unforgettable crowd energy under the neon night sky.`,
    tiers: [
      {
        id: 'tier-ga',
        name: 'General Admission',
        price: 89,
        originalPrice: 119,
        remaining: 120,
        total: 1000,
        description: 'Standard festival entry to all 4 stages, food truck garden & art installations.',
        perks: ['Access to all 4 stages', 'Food & craft beverage village', 'Free water refill stations']
      },
      {
        id: 'tier-vip',
        name: 'VIP Electric Pass',
        price: 199,
        originalPrice: 249,
        remaining: 24,
        total: 200,
        description: 'Express festival entry, elevated stage viewing platforms, private bars & luxury restrooms.',
        perks: ['Fast-lane expedited entry', 'Elevated VIP viewing decks', 'Dedicated private bars', 'Air-conditioned luxury restrooms', 'Commemorative LED wristband']
      }
    ],
    agenda: [
      { time: '04:00 PM', title: 'Gates Open & Ambient Sunsets Pavilion', speaker: 'DJ Solar' },
      { time: '06:30 PM', title: 'Synthwave & Cyberpunk Live Ensemble', speaker: 'Kavinsky Resonance' },
      { time: '09:00 PM', title: 'Holographic Stage Headliner: Tycho & Guests', speaker: 'Tycho Live' },
      { time: '11:30 PM', title: 'Midnight Bass Spectacular & Laser Pyrotechnics', speaker: 'Illenium Syndicate' }
    ],
    speakers: [
      { name: 'Kavinsky Resonance', role: 'Synthwave Pioneer', company: 'Record Label Neo', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { name: 'Astraea Vox', role: 'Vocal DJ Producer', company: 'Vivid Pulse', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' }
    ],
    tags: ['Music Festival', 'Electronic', 'Nightlife', 'EDM', 'New York'],
    views: 28900,
    likes: 1920
  },
  {
    id: 'evt-3',
    title: 'The Great Artisan Wine & Truffle Gastronomy Fair',
    subtitle: 'Taste award-winning vintages paired with Michelin-starred culinary craft',
    category: 'Food & Drinks',
    format: 'in-person',
    featured: false,
    date: '2026-11-21',
    time: '12:00 PM - 05:00 PM PST',
    venue: {
      name: 'St. Helena Vintners Pavilion',
      address: '1200 Main Street, Napa Valley, CA 94574',
      city: 'Napa Valley',
      country: 'USA',
      mapQuery: 'St. Helena, Napa Valley, California'
    },
    coverImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    organizer: {
      name: 'Napa Sommelier Guild',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
      role: 'Culinary Federation',
      verified: true,
      followers: 8900,
      bio: 'Championing organic viticulture, heritage truffles, and gourmet pairings.'
    },
    description: `An exquisite afternoon for epicureans. Discover 45 boutique estates pouring rare reserve vintages, accompanied by shaved Piedmont white truffles, artisan cheese charcuterie boards, and live acoustic Spanish guitar.`,
    tiers: [
      {
        id: 'tier-tasting',
        name: 'Grand Tasting Pass',
        price: 110,
        originalPrice: 135,
        remaining: 32,
        total: 150,
        description: 'Tasting glass, unlimited wine pours from 45 wineries & paired gourmet bites.',
        perks: ['Crystal souvenir Riedel glass', '45+ estate tastings', 'Truffle pairing flight', 'Sommelier tasting guide']
      },
      {
        id: 'tier-masterclass',
        name: 'Masterclass + Rare Vintage Cellar',
        price: 240,
        originalPrice: 280,
        remaining: 8,
        total: 40,
        description: 'Private 90-min cellar masterclass with Master of Wine and 5 library reserve tastings.',
        perks: ['Grand Tasting Pass included', '90-min private cellar masterclass', 'Rare 1990s library reserves', 'Gift bottle of estate Cabernet']
      }
    ],
    agenda: [
      { time: '12:00 PM', title: 'Grand Pavilion Tasting Opens', speaker: 'Sommelier Team' },
      { time: '01:30 PM', title: 'Truffle Foraging & Culinary Demonstration', speaker: 'Chef Jean-Luc Monet' },
      { time: '03:00 PM', title: 'Master Sommelier Blind Tasting Challenge', speaker: 'Master of Wine' }
    ],
    speakers: [
      { name: 'Jean-Luc Monet', role: 'Executive Chef (2-Star Michelin)', company: 'L’Atelier Napa', avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80' }
    ],
    tags: ['Wine Tasting', 'Gastronomy', 'Napa Valley', 'Gourmet'],
    views: 8200,
    likes: 640
  },
  {
    id: 'evt-4',
    title: 'DesignCraft 2026: Product Design & Spatial UX',
    subtitle: 'Crafting Next-Gen Interfaces for Spatial Computing, Glass & AI Hardware',
    category: 'Design & Art',
    format: 'online',
    featured: false,
    date: '2026-11-28',
    time: '10:00 AM - 04:00 PM GMT',
    venue: {
      name: 'EventHive Interactive Virtual Hall',
      address: 'Live Streamed Worldwide with Spatial Chat',
      city: 'Online',
      country: 'Global',
      mapQuery: 'London, UK'
    },
    coverImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
    organizer: {
      name: 'Studio Interface London',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      role: 'Design Collective',
      verified: true,
      followers: 24300,
      bio: 'Bringing together world-class interface architects and design system leads.'
    },
    description: `A fast-paced interactive virtual conference exploring the bleeding edge of interaction design: spatial vision gestures, dynamic typography, ambient computing feedback, and AI design copilots. 
    
Interact live with keynote speakers, join breakout Figma canvas jams, and receive downloadable design UI kits.`,
    tiers: [
      {
        id: 'tier-free',
        name: 'Community Stream (Free)',
        price: 0,
        originalPrice: 0,
        remaining: 350,
        total: 1000,
        description: 'Watch the live stream stages and community Q&A chat for free.',
        perks: ['HD Stream broadcast', 'Public chat participation', 'Event recap newsletter']
      },
      {
        id: 'tier-pro-designer',
        name: 'Designer Pro + UI Kit Bundle',
        price: 49,
        originalPrice: 79,
        remaining: 85,
        total: 300,
        description: 'Includes full HD recordings, Figma UI design library & workshop breakouts.',
        perks: ['Community Stream access', 'Lifetime replay video archive', 'Complete Figma Spatial UI Kit', 'Access to speaker workshop breakouts']
      }
    ],
    agenda: [
      { time: '10:00 AM', title: 'Spatial Computing UX: Beyond The Flat Screen', speaker: 'Clara Oswald, VR Design Lead' },
      { time: '12:00 PM', title: 'Figma Jam Live: Micro-Interactions in 2027', speaker: 'Design Systems Panel' },
      { time: '02:30 PM', title: 'Designing for Ambient & Voice AI Hardware', speaker: 'Kenji Sato' }
    ],
    speakers: [
      { name: 'Clara Oswald', role: 'Design Lead', company: 'Spatial Vision Lab', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80' },
      { name: 'Kenji Sato', role: 'Principal Interaction Architect', company: 'Kyoto Design Studio', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' }
    ],
    tags: ['UX Design', 'Figma', 'Virtual Event', 'Spatial Computing', 'Free Event'],
    views: 14100,
    likes: 1120
  },
  {
    id: 'evt-5',
    title: 'Horizon Web3 & Venture Capitalist Forum',
    subtitle: 'Institutional Liquidity, Real World Assets (RWA) & Decentralized Infrastructure',
    category: 'Business',
    format: 'in-person',
    featured: false,
    date: '2026-12-10',
    time: '08:30 AM - 07:00 PM GMT',
    venue: {
      name: 'The Mayfair Conference Hub',
      address: '22 Grosvenor Square, London W1K 6LF',
      city: 'London',
      country: 'United Kingdom',
      mapQuery: 'Mayfair, London'
    },
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    organizer: {
      name: 'Horizon Capital Ventures',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
      role: 'Investment Syndicate',
      verified: true,
      followers: 12800,
      bio: 'Leading fintech and blockchain institutional capital network.'
    },
    description: `Connecting sovereign wealth funds, Tier-1 venture funds, institutional traders, and protocols. Focused on regulated digital asset frameworks, institutional treasury yield, tokenized credit, and cross-chain settlement.`,
    tiers: [
      {
        id: 'tier-delegate',
        name: 'Institutional Delegate',
        price: 450,
        originalPrice: 600,
        remaining: 20,
        total: 150,
        description: 'Full day access, networking lunches, deal flow directory and closing reception.',
        perks: ['Delegate badge', 'Deal room access', 'Gourmet 3-course lunch', 'Closing cocktail reception']
      },
      {
        id: 'tier-vc-private',
        name: 'GP / LP Private Lounge',
        price: 950,
        originalPrice: 1200,
        remaining: 5,
        total: 40,
        description: 'Private syndicate rooms, dedicated dealmaker matchmaking, and invitation-only dinner.',
        perks: ['All Delegate perks', 'Private 1:1 meeting rooms', 'Exclusive Sovereign LP dinner', 'Dealflow database access']
      }
    ],
    agenda: [
      { time: '08:30 AM', title: 'Registration & Executive Breakfast', speaker: 'Horizon Network' },
      { time: '10:00 AM', title: 'Macro Economic Outlook & Digital Treasuries', speaker: 'Lord Hamilton & VCs' },
      { time: '02:00 PM', title: 'Tokenized Treasury Bills & On-chain Sovereign Debt', speaker: 'Panel Discussion' }
    ],
    speakers: [
      { name: 'Lord Arthur Hamilton', role: 'Managing Partner', company: 'Crown Capital', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
    ],
    tags: ['Business', 'Finance', 'Web3', 'Investment', 'London'],
    views: 9400,
    likes: 430
  },
  {
    id: 'evt-6',
    title: 'Zenith Sunset Yoga & Crystal Sound Bath',
    subtitle: 'An evening of restorative movement, Tibetan singing bowls, and herbal elixir tea bar',
    category: 'Health & Wellness',
    format: 'in-person',
    featured: false,
    date: '2026-11-18',
    time: '05:30 PM - 08:30 PM PST',
    venue: {
      name: 'Santa Monica Ocean Bluff Sanctuary',
      address: 'Palisades Park, Ocean Ave, Santa Monica, CA 90401',
      city: 'Los Angeles',
      country: 'USA',
      mapQuery: 'Santa Monica, California'
    },
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    organizer: {
      name: 'Prana Flow Holistic Society',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      role: 'Wellness Collective',
      verified: true,
      followers: 15600,
      bio: 'Mindfulness teachers, sound healers, and holistic yoga practitioners.'
    },
    description: `Immerse yourself in gentle sunset restorative yoga overlooking the golden Pacific coastline. Followed by a deeply calming 60-minute vibrational acoustic sound bath with quartz crystal bowls and gong resonance. Enjoy warm adaptogenic elixir teas under the twilight stars.`,
    tiers: [
      {
        id: 'tier-yoga-mat',
        name: 'Sanctuary Pass',
        price: 35,
        originalPrice: 45,
        remaining: 14,
        total: 60,
        description: 'Access to yoga session, sound bath, organic tea elixir & lavender eye pillow.',
        perks: ['75-min sunset vinyasa flow', '60-min quartz sound bath', 'Handcrafted herbal elixir', 'Complimentary mat rental']
      }
    ],
    agenda: [
      { time: '05:30 PM', title: 'Welcome Tea & Intention Setting', speaker: 'Maya Lin' },
      { time: '06:00 PM', title: 'Sunset Gentle Yoga Flow', speaker: 'Maya Lin' },
      { time: '07:15 PM', title: '432Hz Quartz Sound Healing Journey', speaker: 'David Sun' }
    ],
    speakers: [
      { name: 'Maya Lin', role: 'E-RYT 500 Yoga Instructor', company: 'Prana Flow', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
      { name: 'David Sun', role: 'Vibrational Sound Therapist', company: 'Sacred Sound Lab', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80' }
    ],
    tags: ['Yoga', 'Sound Bath', 'Mindfulness', 'Wellness', 'Los Angeles'],
    views: 6800,
    likes: 890
  },
  {
    id: 'evt-7',
    title: 'PixelStorm: Indie Game Dev Showcase & LAN Arena',
    subtitle: 'Play over 100 unreleased indie games, compete in retro LAN brackets & meet dev teams',
    category: 'Gaming',
    format: 'in-person',
    featured: false,
    date: '2026-12-18',
    time: '11:00 AM - 10:00 PM JST',
    venue: {
      name: 'Akihabara UDX Cyber Hall',
      address: '4 Chome-14-1 Sotokanda, Chiyoda City, Tokyo 101-0021',
      city: 'Tokyo',
      country: 'Japan',
      mapQuery: 'Akihabara, Tokyo, Japan'
    },
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    organizer: {
      name: 'Tokyo Indie Games Alliance',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80',
      role: 'Game Collective',
      verified: true,
      followers: 31000,
      bio: 'Championing grassroots indie developers and experimental game experiences across Asia.'
    },
    description: `Hands-on showcase for experimental game lovers. Test unreleased roguelikes, cozy RPGs, and VR simulations directly with indie creators. Join the 64-player retro arcade tournament, collect developer art badges, and experience live chiptune beats.`,
    tiers: [
      {
        id: 'tier-gamer-day',
        name: 'Gamer Day Pass',
        price: 25,
        originalPrice: 35,
        remaining: 68,
        total: 500,
        description: 'Full day access to demo booths, LAN tournament entry & arcade free-play.',
        perks: ['Free-play 100+ indie demos', 'LAN Tournament participation', 'Exclusive Steam demo codes', 'Commemorative Pixel badge']
      },
      {
        id: 'tier-vip-collector',
        name: 'Collector VIP + Merch Pack',
        price: 65,
        originalPrice: 85,
        remaining: 15,
        total: 80,
        description: 'Includes limited edition vinyl soundtrack, retro acrylic standee & dev dinner invite.',
        perks: ['All Gamer Pass perks', 'Vinyl Chiptune OST album', 'Limited Edition Pixel Pin & Standee', 'After-hours Dev mixer']
      }
    ],
    agenda: [
      { time: '11:00 AM', title: 'Floor Opening & Indie Showcase', speaker: 'Indie Teams' },
      { time: '02:00 PM', title: 'Speedrunning Showcase & Secret Boss Battles', speaker: 'Challengers' },
      { time: '06:00 PM', title: 'Indie Game of the Year Awards Ceremony', speaker: 'Judges Panel' },
      { time: '08:00 PM', title: 'Chiptune Synth Wave Afterparty', speaker: 'DJ Bitmaster' }
    ],
    speakers: [
      { name: 'Kenjiro Tanaka', role: 'Lead Director', company: 'Studio PixelHeart', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
    ],
    tags: ['Indie Games', 'Gaming', 'Tokyo', 'LAN', 'Esports'],
    views: 17800,
    likes: 1450
  },
  {
    id: 'evt-8',
    title: 'Laugh Out Loud Live: Underground Standup Comedy Spectacular',
    subtitle: 'Top comedy headliners from Netflix, HBO, and Comedy Cellar under one roof',
    category: 'Entertainment',
    format: 'in-person',
    featured: false,
    date: '2026-11-20',
    time: '08:00 PM - 10:30 PM CST',
    venue: {
      name: 'The Second Stage Speakeasy',
      address: '230 W Kinzie St, Chicago, IL 60654',
      city: 'Chicago',
      country: 'USA',
      mapQuery: 'Chicago, Illinois'
    },
    coverImage: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1200&q=80',
    organizer: {
      name: 'Windy City Comedy Club',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      role: 'Comedy House',
      verified: true,
      followers: 19200,
      bio: 'Chicago’s premier underground comedy club hosting award-winning standup comics.'
    },
    description: `Non-stop belly laughs in an intimate, speakeasy cabaret atmosphere. Featuring 5 acclaimed touring comedians seen on Netflix specials, late-night television, and festivals worldwide. 2-drink minimum waived with VIP seating!`,
    tiers: [
      {
        id: 'tier-table',
        name: 'Reserved Table Seat',
        price: 30,
        originalPrice: 40,
        remaining: 22,
        total: 100,
        description: 'Guaranteed reserved table seating close to the main stage.',
        perks: ['Reserved table seat', 'Table side cocktail service', 'Surprise opening act']
      },
      {
        id: 'tier-front-row',
        name: 'Front Row VIP + Free Cocktail',
        price: 55,
        originalPrice: 70,
        remaining: 7,
        total: 25,
        description: 'Front row seats (brace for crowd work!), complimentary signature cocktail & comic meet.',
        perks: ['Front row priority table', '1 signature cocktail included', 'Post-show comic photo op']
      }
    ],
    agenda: [
      { time: '07:30 PM', title: 'Speakeasy Doors Open & Cocktail Hour', speaker: 'House Mixologist' },
      { time: '08:15 PM', title: 'Opening Act & Host Warmup', speaker: 'Dave Morris' },
      { time: '09:00 PM', title: 'Headliner Showcase: 4 Comedy Veterans', speaker: 'Featured Comics' }
    ],
    speakers: [
      { name: 'Dave Morris', role: 'Resident Comic & MC', company: 'Second Stage', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ],
    tags: ['Comedy', 'Standup', 'Chicago', 'Nightlife', 'Live Show'],
    views: 11200,
    likes: 920
  }
];

export const INITIAL_TICKETS = [
  {
    id: 'HIVE-TK-89241',
    eventId: 'evt-1',
    eventTitle: 'NexusAI Global Summit 2026',
    eventDate: '2026-11-14',
    eventTime: '09:00 AM - 06:30 PM PST',
    eventVenue: 'Moscone Convention Center, San Francisco',
    eventCover: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
    tierName: 'Builder & Pro Pass',
    attendeeName: 'Alex Rivera',
    attendeeEmail: 'alex.rivera@example.com',
    attendeePhone: '+1 (415) 555-0199',
    quantity: 1,
    unitPrice: 299,
    totalPrice: 299,
    status: 'confirmed',
    bookingDate: '2026-10-09',
    seatCode: 'ROW-B / SEAT-14',
    qrCodeValue: 'HIVE-TICKET-89241-NEXUSAI-VALID',
    specialNotes: 'Vegetarian lunch box requested'
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Events', icon: 'Sparkles', color: 'from-amber-500 to-amber-600' },
  { id: 'Technology', name: 'Tech & AI', icon: 'Cpu', color: 'from-blue-500 to-cyan-500' },
  { id: 'Music', name: 'Concerts & Music', icon: 'Music', color: 'from-fuchsia-500 to-pink-500' },
  { id: 'Food & Drinks', name: 'Food & Drinks', icon: 'Utensils', color: 'from-orange-500 to-amber-500' },
  { id: 'Business', name: 'Business & Networking', icon: 'Briefcase', color: 'from-emerald-500 to-teal-500' },
  { id: 'Design & Art', name: 'Design & Art', icon: 'Palette', color: 'from-violet-500 to-purple-500' },
  { id: 'Health & Wellness', name: 'Health & Wellness', icon: 'HeartPulse', color: 'from-rose-500 to-pink-500' },
  { id: 'Gaming', name: 'Gaming & LAN', icon: 'Gamepad2', color: 'from-indigo-500 to-blue-500' },
  { id: 'Entertainment', name: 'Comedy & Shows', icon: 'Mic2', color: 'from-yellow-500 to-amber-500' }
];

export const CITIES = [
  'All Locations',
  'San Francisco',
  'New York',
  'London',
  'Tokyo',
  'Los Angeles',
  'Chicago',
  'Napa Valley',
  'Online'
];
