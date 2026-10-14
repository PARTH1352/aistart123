/**
 * NEXUS E-Commerce Catalog & Static Mock Data
 */

const PRODUCTS_DATA = [
  {
    id: "run-01",
    name: "Velocity Carbon Pro Runner",
    category: "shoes",
    categoryLabel: "Running Shoes",
    price: 189.99,
    originalPrice: 229.99,
    rating: 4.9,
    reviewCount: 342,
    badge: "Bestseller",
    badgeType: "hot",
    image: "assets/images/running_shoes_ai.jpg",
    description: "Engineered with a full-length curved carbon fiber propulsion plate and dual-density supercritical foam. Delivers maximum kinetic energy return and cuts fatigue over marathon distances.",
    specs: {
      "Weight": "198g (Size 9)",
      "Drop": "8mm offset",
      "Upper": "Ultra-breathable AeroKnit Mesh",
      "Outsole": "Vibram™ Wet-Traction Grip",
      "Best For": "Marathons, Tempo Runs, Road Racing"
    },
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: [
      { name: "Cyan Velocity", hex: "#0284c7" },
      { name: "Sonic White", hex: "#e2e8f0" },
      { name: "Stealth Black", hex: "#1e293b" }
    ],
    inStock: true,
    stockCount: 14
  },
  {
    id: "run-02",
    name: "AeroGlide Ultralight Trail Runner",
    category: "shoes",
    categoryLabel: "Running Shoes",
    price: 159.00,
    originalPrice: 180.00,
    rating: 4.8,
    reviewCount: 218,
    badge: "All-Terrain",
    badgeType: "new",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    description: "Master rocky ridges, muddy trails, and steep elevation gains. Reinforced ballistic toe cap and multi-directional 5mm chevron lugs ensure unshakeable stability.",
    specs: {
      "Weight": "240g",
      "Drop": "6mm",
      "Protection": "Rock-Shield Composite Plate",
      "Lacing": "QuickLock Kevlar Cord System",
      "Best For": "Technical Trail, Ultra Distances, Mud/Snow"
    },
    sizes: ["US 8", "US 9", "US 10", "US 10.5", "US 11", "US 12"],
    colors: [
      { name: "Crimson Blaze", hex: "#e11d48" },
      { name: "Obsidian", hex: "#0f172a" }
    ],
    inStock: true,
    stockCount: 8
  },
  {
    id: "run-03",
    name: "PulseStrike Boost Cloud Runner",
    category: "shoes",
    categoryLabel: "Running Shoes",
    price: 139.50,
    originalPrice: 165.00,
    rating: 4.7,
    reviewCount: 185,
    badge: "Cloud Cushion",
    badgeType: "trending",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
    description: "Built for everyday endurance athletes seeking plush cloud-like shock absorption. Protects knee joints with triple-pod nitrogen-infused heel cradles.",
    specs: {
      "Weight": "225g",
      "Drop": "10mm",
      "Cushion": "Max Cloud Pods",
      "Lining": "Odor-Resistant Bamboo Fiber",
      "Best For": "Daily 10K, Recovery Runs, Walking"
    },
    sizes: ["US 7.5", "US 8.5", "US 9.5", "US 10.5", "US 11.5"],
    colors: [
      { name: "Glacier Grey", hex: "#94a3b8" },
      { name: "Volt Green", hex: "#84cc16" }
    ],
    inStock: true,
    stockCount: 22
  },
  {
    id: "run-04",
    name: "Endurance Quantum Air Speedster",
    category: "shoes",
    categoryLabel: "Running Shoes",
    price: 174.99,
    originalPrice: 210.00,
    rating: 4.9,
    reviewCount: 412,
    badge: "20% OFF",
    badgeType: "sale",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    description: "The choice of professional track athletes. Features an aerodynamic profile with seamless hot-melt overlays to eliminate friction blisters over long runs.",
    specs: {
      "Weight": "184g",
      "Drop": "5mm",
      "Midsole": "Supercritical Pebax® Foam",
      "Best For": "Speed Intervals, 5K / 10K Records"
    },
    sizes: ["US 8", "US 9", "US 10", "US 11"],
    colors: [
      { name: "Pure White & Lavender", hex: "#c084fc" },
      { name: "Midnight Navy", hex: "#1e3a8a" }
    ],
    inStock: true,
    stockCount: 5
  },
  {
    id: "pack-01",
    name: "Nomad Apex 35L Waterproof Tech Pack",
    category: "backpacks",
    categoryLabel: "Backpacks",
    price: 149.00,
    originalPrice: 189.00,
    rating: 5.0,
    reviewCount: 529,
    badge: "Editor's Choice",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    description: "The ultimate modern commuter and travel pack. Crafted with 840D Cordura® ballistic nylon, magnetic Fidlock® buckles, and a suspended TSA-ready 16” laptop cocoon.",
    specs: {
      "Capacity": "35 Liters (Expandable to 40L)",
      "Weight": "1.1 kg",
      "Material": "IPX6 Submersible Weatherproof Nylon",
      "Laptop Pocket": "Fits up to 16.2” MacBook Pro",
      "Features": "Hidden RFID Passport Sleeve, Luggage Pass-Through"
    },
    sizes: ["Standard 35L", "Compact 28L"],
    colors: [
      { name: "Stealth Matte Black", hex: "#0f172a" },
      { name: "Urban Gunmetal", hex: "#475569" },
      { name: "Arctic Storm", hex: "#cbd5e1" }
    ],
    inStock: true,
    stockCount: 19
  },
  {
    id: "pack-02",
    name: "Summit Traverse 45L Tactical Rucksack",
    category: "backpacks",
    categoryLabel: "Backpacks",
    price: 198.00,
    originalPrice: 240.00,
    rating: 4.8,
    reviewCount: 310,
    badge: "Heavy Duty",
    badgeType: "trending",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80",
    description: "Built for multi-day expeditions and alpine ascents. Features an internal aerospace-grade aluminum suspension frame and lumbar load transfer harness.",
    specs: {
      "Capacity": "45 Liters + 5L Floating Top Lid",
      "Weight": "1.35 kg",
      "Hydration": "Compatible with 3L Reservoir",
      "Straps": "Padded Ergonomic Load-Lifter Harness",
      "Bonus": "Integrated Hi-Vis Rainfly Included"
    },
    sizes: ["Medium (Torso 17-20\")", "Large (Torso 20-23\")"],
    colors: [
      { name: "Forest Ranger Olive", hex: "#3f6212" },
      { name: "Desert Coyote", hex: "#a16207" }
    ],
    inStock: true,
    stockCount: 11
  },
  {
    id: "pack-03",
    name: "Veloce Minimalist City Commuter",
    category: "backpacks",
    categoryLabel: "Backpacks",
    price: 98.00,
    originalPrice: 120.00,
    rating: 4.7,
    reviewCount: 194,
    badge: "Popular",
    badgeType: "sale",
    image: "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=800&q=80",
    description: "Sleek, streamlined profile for high-density city commutes, subway rides, and coffee shop work sessions. Clean aesthetic with zero dangling straps.",
    specs: {
      "Capacity": "22 Liters",
      "Weight": "680g",
      "Material": "Water-Repellent Eco-Canvas",
      "Pockets": "Quick-Access Top Valuables & Water Bottle"
    },
    sizes: ["One Size"],
    colors: [
      { name: "Charcoal Slate", hex: "#334155" },
      { name: "Burgundy Wine", hex: "#881337" }
    ],
    inStock: true,
    stockCount: 26
  },
  {
    id: "pack-04",
    name: "AeroShield Modular Camera & Drone Pack",
    category: "backpacks",
    categoryLabel: "Backpacks",
    price: 219.99,
    originalPrice: 269.99,
    rating: 4.9,
    reviewCount: 167,
    badge: "Pro Creator",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&w=800&q=80",
    description: "Customizable high-density EVA foam dividers keep camera bodies, prime lenses, and gimbal drones shockproof and organized. Side-access hatch for shooting on the fly.",
    specs: {
      "Capacity": "30 Liters Modular",
      "Protection": "Crushproof Polycarbonate Shell Panel",
      "Access": "Side Quick-Draw & Full Rear Clamshell",
      "Tripod": "Dedicated Heavy-Duty Tripod Straps"
    },
    sizes: ["Pro 30L"],
    colors: [
      { name: "Matte Black", hex: "#0f172a" }
    ],
    inStock: true,
    stockCount: 7
  },
  {
    id: "gear-01",
    name: "Chronos Apex GPS Multi-Sport Watch",
    category: "gear",
    categoryLabel: "Performance Tech",
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.9,
    reviewCount: 428,
    badge: "Titanium",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    description: "Sapphire glass lens with grade-5 titanium bezel. Dual-frequency GNSS positioning for precise trail tracking and 21-day battery life in ultra-runner mode.",
    specs: {
      "Battery": "21 Days / 60h GPS",
      "Display": "1.4” Sunlight-Readable AMOLED",
      "Water Resistance": "100m (10 ATM)",
      "Sensors": "VO2 Max, HRV, Pulse Ox, Altimeter"
    },
    sizes: ["47mm", "42mm"],
    colors: [
      { name: "Titanium Raw", hex: "#94a3b8" },
      { name: "DLC Black", hex: "#0f172a" }
    ],
    inStock: true,
    stockCount: 15
  },
  {
    id: "gear-02",
    name: "SonicPulse Pro ANC Sports Earbuds",
    category: "gear",
    categoryLabel: "Performance Tech",
    price: 119.00,
    originalPrice: 149.00,
    rating: 4.8,
    reviewCount: 382,
    badge: "Waterproof IPX8",
    badgeType: "trending",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    description: "Engineered specifically for vigorous sprints and rainy runs. Secure wingtip lock, awareness transparency mode, and bass-heavy acoustic drivers.",
    specs: {
      "Playtime": "9h + 27h with Wireless Charging Case",
      "Rating": "IPX8 Sweat & Rain Submersible",
      "Audio": "Custom 11mm Graphene Drivers",
      "Bluetooth": "5.3 with Low-Latency Gaming/Run Mode"
    },
    sizes: ["Universal Fit with 4 Tip Sizes"],
    colors: [
      { name: "Matte Carbon", hex: "#1e293b" },
      { name: "Electric Indigo", hex: "#6366f1" }
    ],
    inStock: true,
    stockCount: 30
  }
];

// Verified Customer Reviews Data
const REVIEWS_DATA = [
  {
    id: "rev-1",
    author: "Marcus Vance",
    role: "Marathon Runner (Boston Qualified)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    productName: "Velocity Carbon Pro Runner",
    rating: 5,
    date: "October 8, 2026",
    title: "Crushed my PR by 4 minutes 12 seconds!",
    content: "The energy return in the forefoot is unbelievable. Usually at mile 20 my quads start screaming, but the carbon plate rocker rolls your gait effortlessly. And they look phenomenal in person. Worth every single penny.",
    verified: true,
    helpfulCount: 84
  },
  {
    id: "rev-2",
    author: "Elena Rostova",
    role: "Digital Nomad & Trekker",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    productName: "Nomad Apex 35L Waterproof Tech Pack",
    rating: 5,
    date: "October 11, 2026",
    title: "Survived a monsoon in Tokyo without a drop inside",
    content: "I took this backpack across 4 countries over 3 months. Caught in a sudden torrential downpour in Shibuya for 40 minutes—my $3,000 MacBook Pro and camera were bone dry. The harness comfort is light years ahead of ordinary bags.",
    verified: true,
    helpfulCount: 112
  },
  {
    id: "rev-3",
    author: "David Chen",
    role: "Ultra-Distance Trail Athlete",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    productName: "AeroGlide Ultralight Trail Runner",
    rating: 5,
    date: "September 29, 2026",
    title: "Best grip on wet granite I've ever tested",
    content: "The chevron outsole bites into loose shale and slick mud with zero slippage. Toe bumper saved my toenails when kicking a submerged root. Light, fast, and remarkably durable after 300+ miles.",
    verified: true,
    helpfulCount: 65
  },
  {
    id: "rev-4",
    author: "Sarah Jenkins",
    role: "Urban Commuter & Designer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    productName: "Veloce Minimalist City Commuter",
    rating: 4,
    date: "October 2, 2026",
    title: "Super chic and ergonomic for daily subway trips",
    content: "Fits my laptop, lunch container, gym gear, and water bottle without looking bulky or bulging out. Cleanest aesthetic on the market right now. Loving the magnetic top flap!",
    verified: true,
    helpfulCount: 39
  }
];

// Why Shop with Us Pillars
const WHY_SHOP_PILLARS = [
  {
    icon: "⚡",
    title: "Proprietary Kinetic Engineering",
    description: "Every shoe is scientifically tuned in biomechanics labs to absorb 32% more strike impact and convert downward momentum into explosive forward push.",
    metric: "32% Less Joint Fatigue"
  },
  {
    icon: "🌧️",
    title: "IPX6 Ballistic Weather-Shield",
    description: "Our backpacks utilize mil-spec 840D Cordura® nylon bonded with hydrostatic TPU membranes. Tested against monsoons, snow, and airport rough handling.",
    metric: "100% Water Impermeable"
  },
  {
    icon: "🌱",
    title: "Circular Eco-Craftsmanship",
    description: "We harvest discarded ocean ghost nets and recycled PET bottles to form 70% of our knit uppers and inner linings. Zero compromise on tensile durability.",
    metric: "Carbon Neutral Certified"
  },
  {
    icon: "🔄",
    title: "30-Day Real-World Wear Test",
    description: "Take our running shoes to the pavement and backpacks up the trail. If they don't exceed your expectations, return them for a 100% immediate refund.",
    metric: "Zero-Risk Guarantee"
  },
  {
    icon: "🚀",
    title: "Express 48h Worldwide Dispatch",
    description: "Every order ships same-day from automated regional fulfillment centers with fully tracked express delivery and signature confirmation.",
    metric: "Free Shipping > $75"
  },
  {
    icon: "🔒",
    title: "Bank-Grade 256-Bit SSL Checkout",
    description: "Certified Level-1 PCI compliant security. We support Apple Pay, Google Pay, Visa, Mastercard, and PayPal with end-to-end tokenized privacy.",
    metric: "100% Secure Transaction"
  }
];

// Default Shopping Lists (Like Shopify Lists / Wishlist Collections)
const DEFAULT_SHOPPING_LISTS = [
  {
    id: "list-marathon",
    title: "🏃 Marathon Race Day Essentials",
    description: "Curated gear for tempo runs and race morning readiness",
    itemIds: ["run-01", "run-04", "gear-01"]
  },
  {
    id: "list-travel",
    title: "🎒 Digital Nomad & Alpine Travel",
    description: "Weatherproof gear ready for plane rides and summit hikes",
    itemIds: ["pack-01", "pack-02", "gear-02"]
  }
];
