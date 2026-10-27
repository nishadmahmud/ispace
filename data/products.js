export const categories = [
  {
    id: "phones",
    name: "Phones & Tablets",
    slug: "phones",
    icon: "Smartphone",
    count: "45+ Models",
    description: "Official flagships, BTRC-approved models & international editions.",
    banner: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "laptops",
    name: "Laptops & Mac",
    slug: "laptops",
    icon: "Laptop",
    count: "30+ Models",
    description: "Apple MacBook M4/M3 series, Creator ultrabooks & Gaming beasts.",
    banner: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "wearables",
    name: "Smartwatches",
    slug: "wearables",
    icon: "Watch",
    count: "25+ Models",
    description: "Apple Watch Ultra, Series 10, Galaxy Watch & fitness trackers.",
    banner: "https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "audio",
    name: "Audio & Sound",
    slug: "audio",
    icon: "Headphones",
    count: "40+ Models",
    description: "AirPods, Sony noise-canceling headphones, Marshall speakers & TWS.",
    banner: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    icon: "Zap",
    count: "80+ Items",
    description: "MagSafe chargers, Anker GaN power adapters, Spigen cases & cables.",
    banner: "https://images.unsplash.com/photo-1622445262464-84b1456045b6?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "gaming",
    name: "Gaming & Drones",
    slug: "gaming",
    icon: "Gamepad2",
    count: "20+ Gadgets",
    description: "PlayStation 5 Slim, DJI 4K Drones, handheld consoles & gimbals.",
    banner: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "pre-owned",
    name: "Certified Pre-Owned",
    slug: "pre-owned",
    icon: "RotateCcw",
    count: "50+ Inspected",
    description: "iSPACE Recell certified Grade A+ devices with 7-day replacement.",
    banner: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1200&auto=format&fit=crop"
  }
];

export const products = [
  // PHONES
  {
    id: "iphone-16-pro-max",
    name: "Apple iPhone 16 Pro Max",
    slug: "iphone-16-pro-max",
    brand: "Apple",
    category: "phones",
    categoryName: "Phones & Tablets",
    price: 169999,
    regularPrice: 184999,
    badge: "Official BTRC Available",
    rating: 4.95,
    reviewCount: 168,
    inStock: true,
    stockCount: 12,
    warranty: "1 Year Official Apple Warranty + 7 Days Replacement",
    isFlashDeal: true,
    flashDiscount: "8% OFF",
    featured: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Desert Titanium", hex: "#bfa38a" },
      { name: "Natural Titanium", hex: "#9f9991" },
      { name: "White Titanium", hex: "#e5e5e7" },
      { name: "Black Titanium", hex: "#3b3a3e" }
    ],
    storage: [
      { size: "256GB", priceOffset: 0 },
      { size: "512GB", priceOffset: 24000 },
      { size: "1TB", priceOffset: 48000 }
    ],
    simOptions: [
      "Physical Dual SIM (Hong Kong / China)",
      "eSIM + Physical SIM (Global / UK)",
      "Dual eSIM (USA Edition)"
    ],
    description: "iPhone 16 Pro Max. Forged in titanium and featuring the groundbreaking A18 Pro chip, Camera Control for tactile shooting control, and the best iPhone battery life ever.",
    keyFeatures: [
      "Grade 5 Titanium design with refined micro-blasted finish",
      "All-new Camera Control button with two-stage shutter",
      "48MP Fusion camera with 2nd-gen quad-pixel sensor & 5x Telephoto",
      "A18 Pro chip with 6-core GPU delivering pro-grade ray tracing",
      "Up to 33 hours video playback, longest battery life in iPhone history"
    ],
    specs: {
      "Display": "6.9-inch Super Retina XDR OLED, 120Hz ProMotion, 2000 nits peak",
      "Chipset": "Apple A18 Pro (3nm architecture), 6-core CPU, 16-core Neural Engine",
      "Main Camera": "48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto",
      "Front Camera": "12MP TrueDepth with autofocus",
      "Battery": "4,685 mAh, 50% charge in 30 mins with 25W MagSafe",
      "Build": "Titanium Frame, Ceramic Shield front, Textured matte glass back",
      "OS": "iOS 18 with Apple Intelligence ready",
      "Weight": "227 grams",
      "Water Resistance": "IP68 (6m depth up to 30 mins)"
    }
  },
  {
    id: "iphone-16",
    name: "Apple iPhone 16",
    slug: "iphone-16",
    brand: "Apple",
    category: "phones",
    categoryName: "Phones & Tablets",
    price: 108999,
    regularPrice: 119999,
    badge: "Hot Deal",
    rating: 4.88,
    reviewCount: 94,
    inStock: true,
    stockCount: 22,
    warranty: "1 Year Official Apple Warranty",
    isFlashDeal: false,
    featured: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Ultramarine", hex: "#4b6cc1" },
      { name: "Teal", hex: "#76a7a8" },
      { name: "Pink", hex: "#e8a7b8" },
      { name: "White", hex: "#f2f2f2" },
      { name: "Black", hex: "#2b2b2b" }
    ],
    storage: [
      { size: "128GB", priceOffset: 0 },
      { size: "256GB", priceOffset: 14000 },
      { size: "512GB", priceOffset: 34000 }
    ],
    simOptions: [
      "Physical Dual SIM",
      "eSIM + Physical SIM"
    ],
    description: "iPhone 16 brings vibrant color-infused glass, the Action button, and the innovative Camera Control to everyone. Powered by the A18 chip designed for Apple Intelligence.",
    keyFeatures: [
      "Super Retina XDR OLED display with Dynamic Island",
      "A18 chip jumping two generations ahead for console-level gaming",
      "Camera Control button for instant framing and spatial capture",
      "48MP 2-in-1 Fusion camera with 2x optical-quality Telephoto",
      "Action button customizable for silent mode, flashlight, translator & shortcuts"
    ],
    specs: {
      "Display": "6.1-inch Super Retina XDR OLED, HDR10, 2000 nits peak",
      "Chipset": "Apple A18 chip (3nm) with 5-core GPU",
      "Camera": "48MP Fusion + 12MP Ultra-Wide with Macro autofocus",
      "Front Camera": "12MP TrueDepth Camera",
      "OS": "iOS 18",
      "Weight": "170 grams",
      "Resistance": "IP68 water and dust resistance"
    }
  },
  {
    id: "samsung-galaxy-s25-ultra",
    name: "Samsung Galaxy S25 Ultra 5G",
    slug: "samsung-galaxy-s25-ultra",
    brand: "Samsung",
    category: "phones",
    categoryName: "Phones & Tablets",
    price: 154999,
    regularPrice: 169999,
    badge: "Pre-Order Available",
    rating: 4.92,
    reviewCount: 78,
    inStock: true,
    stockCount: 9,
    warranty: "1 Year Official Samsung Warranty",
    isFlashDeal: true,
    flashDiscount: "9% OFF",
    featured: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Titanium Silver Blue", hex: "#8ea4b8" },
      { name: "Titanium Black", hex: "#2e2e2e" },
      { name: "Titanium Gray", hex: "#7a7978" }
    ],
    storage: [
      { size: "256GB / 12GB RAM", priceOffset: 0 },
      { size: "512GB / 16GB RAM", priceOffset: 18000 },
      { size: "1TB / 16GB RAM", priceOffset: 42000 }
    ],
    simOptions: [
      "Dual Nano-SIM + eSIM",
      "Dual eSIM"
    ],
    description: "The apex of Android performance. Galaxy S25 Ultra features Qualcomm Snapdragon 8 Elite for Galaxy, built-in S Pen, titanium borders with rounded ergonomic corners, and 200MP AI ProVisual engine.",
    keyFeatures: [
      "Snapdragon 8 Elite (3nm) for Galaxy with unprecedented NPU power",
      "Anti-reflective Corning Gorilla Armor 2 display",
      "200MP Quad Telephoto System with 5x & 3x optical periscope",
      "Next-generation Galaxy AI with multi-modal real-time translation & video gen",
      "Integrated S Pen stylus with Bluetooth remote control"
    ],
    specs: {
      "Display": "6.86-inch Dynamic AMOLED 2X, 1-120Hz, 2600 nits",
      "Chipset": "Snapdragon 8 Elite for Galaxy (Oryon CPU)",
      "Rear Camera": "200MP Main + 50MP Periscope + 50MP Ultra Wide + 10MP Telephoto",
      "Battery": "5,000 mAh with 45W Fast Charging & 15W Wireless",
      "Build": "Titanium frame, Gorilla Armor glass front/back",
      "OS": "One UI 7 on Android 15 (7 Years OS updates guaranteed)"
    }
  },
  {
    id: "google-pixel-9-pro-xl",
    name: "Google Pixel 9 Pro XL",
    slug: "google-pixel-9-pro-xl",
    brand: "Google",
    category: "phones",
    categoryName: "Phones & Tablets",
    price: 124999,
    regularPrice: 139999,
    badge: "Best Camera 2026",
    rating: 4.86,
    reviewCount: 52,
    inStock: true,
    stockCount: 8,
    warranty: "1 Year International Service Warranty",
    isFlashDeal: false,
    featured: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02560?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Obsidian", hex: "#1f2022" },
      { name: "Porcelain", hex: "#e8e5de" },
      { name: "Hazel", hex: "#8f9489" },
      { name: "Rose Quartz", hex: "#d8b4b8" }
    ],
    storage: [
      { size: "128GB", priceOffset: 0 },
      { size: "256GB", priceOffset: 12000 },
      { size: "512GB", priceOffset: 28000 }
    ],
    simOptions: [
      "Nano-SIM and eSIM"
    ],
    description: "The most powerful Pixel yet. Featuring Google Tensor G4, Gemini Live AI assistant, Super Actua display, and pro-level triple camera system with 8K Video Boost.",
    keyFeatures: [
      "Google Tensor G4 chip tuned specifically for on-device Gemini models",
      "6.8-inch Super Actua LTPO display with 3000 nits peak brightness",
      "Triple rear camera: 50MP wide, 48MP telephoto with 5x optical, 48MP ultrawide",
      "Magic Editor, Add Me photo blending, and Best Take AI studio tools",
      "7 years of Android OS, security, and Pixel Feature Drops"
    ],
    specs: {
      "Display": "6.8-inch Super Actua OLED, 120Hz LTPO, 3000 nits",
      "Chipset": "Google Tensor G4 with Titan M2 security coprocessor",
      "RAM": "16GB LPDDR5X",
      "Battery": "5,060 mAh with 37W wired charging",
      "OS": "Stock Android 15"
    }
  },

  // LAPTOPS & MAC
  {
    id: "macbook-pro-14-m4-pro",
    name: "Apple MacBook Pro 14\" (M4 Pro Chip)",
    slug: "macbook-pro-14-m4-pro",
    brand: "Apple",
    category: "laptops",
    categoryName: "Laptops & Mac",
    price: 248000,
    regularPrice: 265000,
    badge: "0% EMI Available",
    rating: 4.98,
    reviewCount: 64,
    inStock: true,
    stockCount: 6,
    warranty: "1 Year Apple Global Warranty",
    isFlashDeal: true,
    flashDiscount: "6% OFF",
    featured: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Space Black", hex: "#1c1d1f" },
      { name: "Silver", hex: "#e3e4e5" }
    ],
    storage: [
      { size: "24GB Unified Memory / 512GB SSD", priceOffset: 0 },
      { size: "24GB Unified Memory / 1TB SSD", priceOffset: 28000 },
      { size: "48GB Unified Memory / 1TB SSD", priceOffset: 65000 }
    ],
    simOptions: ["Wi-Fi 6E + Bluetooth 5.3"],
    description: "MacBook Pro 14-inch with M4 Pro. Phenomenal speed for code compilation, 3D rendering, and 8K ProRes editing with up to 24 hours of industry-shattering battery life.",
    keyFeatures: [
      "Apple M4 Pro chip with up to 14-core CPU and 20-core GPU",
      "Liquid Retina XDR display with 1600 nits peak HDR and optional nano-texture",
      "Thunderbolt 5 ports delivering up to 120Gb/s bidirectional transfer",
      "12MP Center Stage camera with Desk View support",
      "Up to 24 hours of battery life on a single charge"
    ],
    specs: {
      "Display": "14.2-inch Liquid Retina XDR, 3024x1964, 120Hz ProMotion",
      "Chipset": "Apple M4 Pro chip (12-core or 14-core)",
      "Memory": "24GB or 48GB Unified Memory",
      "Ports": "3x Thunderbolt 5, HDMI, SDXC slot, MagSafe 3, 3.5mm jack",
      "Audio": "Six-speaker sound system with force-cancelling woofers",
      "Weight": "1.60 kg"
    }
  },
  {
    id: "macbook-air-13-m3",
    name: "Apple MacBook Air 13\" (M3 Chip)",
    slug: "macbook-air-13-m3",
    brand: "Apple",
    category: "laptops",
    categoryName: "Laptops & Mac",
    price: 132000,
    regularPrice: 145000,
    badge: "Best Student Laptop",
    rating: 4.91,
    reviewCount: 110,
    inStock: true,
    stockCount: 15,
    warranty: "1 Year Official Apple Warranty",
    isFlashDeal: false,
    featured: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Midnight", hex: "#1e2430" },
      { name: "Starlight", hex: "#f0e5d3" },
      { name: "Space Gray", hex: "#7d7e80" },
      { name: "Silver", hex: "#e0e2e4" }
    ],
    storage: [
      { size: "16GB RAM / 256GB SSD", priceOffset: 0 },
      { size: "16GB RAM / 512GB SSD", priceOffset: 22000 },
      { size: "24GB RAM / 512GB SSD", priceOffset: 45000 }
    ],
    simOptions: ["Wi-Fi 6E"],
    description: "Lean, mean, M3 machine. Strikingly thin design, up to 18 hours of battery, dual external display support, and an anodization seal on Midnight that reduces fingerprints.",
    keyFeatures: [
      "Ultra-thin 11.3mm durable aluminum unibody enclosure",
      "Apple M3 8-core CPU with hardware-accelerated mesh shading",
      "Support for up to two external displays with laptop lid closed",
      "Liquid Retina display with 500 nits brightness and 1 billion colors",
      "MagSafe charging, two Thunderbolt ports, and headphone jack"
    ],
    specs: {
      "Display": "13.6-inch Liquid Retina LED backlit display, 2560x1664",
      "Processor": "Apple M3 chip with 8-core CPU and 10-core GPU",
      "Battery": "Up to 18 hours Apple TV app movie playback",
      "Weight": "1.24 kg"
    }
  },
  {
    id: "asus-rog-zephyrus-g16",
    name: "ASUS ROG Zephyrus G16 (RTX 4080)",
    slug: "asus-rog-zephyrus-g16",
    brand: "ASUS",
    category: "laptops",
    categoryName: "Laptops & Mac",
    price: 315000,
    regularPrice: 335000,
    badge: "Ultimate Gaming Rig",
    rating: 4.89,
    reviewCount: 38,
    inStock: true,
    stockCount: 4,
    warranty: "2 Years International ASUS Warranty",
    isFlashDeal: false,
    featured: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Eclipse Gray", hex: "#3a3c40" },
      { name: "Platinum White", hex: "#eaeaea" }
    ],
    storage: [
      { size: "32GB LPDDR5X / 1TB Gen4 SSD", priceOffset: 0 },
      { size: "32GB LPDDR5X / 2TB Gen4 SSD", priceOffset: 25000 }
    ],
    simOptions: ["Wi-Fi 7 + BT 5.4"],
    description: "CNC-milled aluminum precision laptop featuring 2.5K 240Hz ROG Nebula OLED display, Intel Core Ultra 9 processor, and NVIDIA GeForce RTX 4080 GPU.",
    keyFeatures: [
      "Slash Lighting LED bar on aluminum lid",
      "ROG Nebula OLED display with 0.2ms response time and G-Sync",
      "NVIDIA GeForce RTX 4080 12GB GDDR6 (115W TGP)",
      "Vapor Chamber with Tri-Fan cooling technology"
    ],
    specs: {
      "Display": "16-inch 2.5K (2560 x 1600) OLED 240Hz, 100% DCI-P3",
      "CPU": "Intel Core Ultra 9 185H with Intel AI Boost NPU",
      "GPU": "NVIDIA GeForce RTX 4080 Laptop GPU",
      "Weight": "1.85 kg"
    }
  },

  // WEARABLES
  {
    id: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2 (Black Titanium)",
    slug: "apple-watch-ultra-2",
    brand: "Apple",
    category: "wearables",
    categoryName: "Smartwatches",
    price: 99999,
    regularPrice: 109999,
    badge: "0% EMI Available",
    rating: 4.97,
    reviewCount: 82,
    inStock: true,
    stockCount: 11,
    warranty: "1 Year Official Apple Warranty",
    isFlashDeal: true,
    flashDiscount: "9% OFF",
    featured: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Black Titanium (Ocean Band)", hex: "#1f2124" },
      { name: "Natural Titanium (Trail Loop)", hex: "#9a978f" },
      { name: "Black Titanium (Alpine Loop)", hex: "#26282b" }
    ],
    storage: [
      { size: "49mm GPS + Cellular (64GB)", priceOffset: 0 }
    ],
    simOptions: ["Embedded eSIM (Cellular)"],
    description: "The ultimate sports and adventure watch now comes in a stunning satin Black Titanium finish. With multi-day battery life, precision dual-frequency GPS, and the brightest Apple display ever.",
    keyFeatures: [
      "49mm aerospace-grade titanium case with diamond-like carbon coating",
      "Up to 3,000 nits display brightness for blinding sun visibility",
      "Up to 36 hours normal use and 72 hours in Low Power Mode",
      "Dual-frequency L1 & L5 precision GPS with route backtrack",
      "Water resistance to 100 meters, dive certified EN13319 to 40 meters"
    ],
    specs: {
      "Case": "49mm Titanium, Sapphire crystal glass",
      "Display": "Always-On Retina OLED, 3000 nits peak",
      "Sensors": "ECG, Blood Oxygen, Water temperature, Depth gauge",
      "Battery": "Up to 36 hours (72h Low Power)",
      "Durability": "MIL-STD 810H tested, IP6X dust resistant"
    }
  },
  {
    id: "apple-watch-series-10",
    name: "Apple Watch Series 10 (Titanium / Aluminum)",
    slug: "apple-watch-series-10",
    brand: "Apple",
    category: "wearables",
    categoryName: "Smartwatches",
    price: 56999,
    regularPrice: 62999,
    badge: "Thinnest Ever",
    rating: 4.88,
    reviewCount: 96,
    inStock: true,
    stockCount: 16,
    warranty: "1 Year Official Apple Warranty",
    isFlashDeal: false,
    featured: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Jet Black (Aluminum)", hex: "#111215" },
      { name: "Rose Gold", hex: "#cda69c" },
      { name: "Slate (Titanium)", hex: "#434850" }
    ],
    storage: [
      { size: "42mm GPS", priceOffset: 0 },
      { size: "46mm GPS", priceOffset: 5000 },
      { size: "46mm GPS + Cellular", priceOffset: 16000 }
    ],
    simOptions: ["GPS Edition", "GPS + Cellular eSIM"],
    description: "Series 10 is the thinnest Apple Watch ever made with the biggest, most advanced wide-angle OLED display. Charge to 80% in just 30 minutes.",
    keyFeatures: [
      "Nearly 10% thinner than Series 9 with polished aerospace titanium option",
      "Wide-angle OLED delivers up to 40% brighter off-axis viewing",
      "Sleep apnea notifications and depth/water temperature sensors",
      "On-device speaker music and podcast playback without headphones"
    ],
    specs: {
      "Display": "Wide-angle OLED, up to 2000 nits",
      "Chip": "S10 SiP with 64-bit dual-core processor",
      "Charging": "Fast charge: 0 to 80% in ~30 minutes",
      "Water Resistance": "50 meters swimproof with depth gauge to 6m"
    }
  },
  {
    id: "samsung-galaxy-watch-7",
    name: "Samsung Galaxy Watch 7 (44mm)",
    slug: "samsung-galaxy-watch-7",
    brand: "Samsung",
    category: "wearables",
    categoryName: "Smartwatches",
    price: 33500,
    regularPrice: 38000,
    badge: "Galaxy AI Inside",
    rating: 4.79,
    reviewCount: 44,
    inStock: true,
    stockCount: 14,
    warranty: "1 Year Official Warranty",
    isFlashDeal: false,
    featured: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Green", hex: "#3d4b3b" },
      { name: "Silver", hex: "#d8d9db" }
    ],
    storage: [
      { size: "44mm Bluetooth", priceOffset: 0 },
      { size: "44mm LTE", priceOffset: 6500 }
    ],
    simOptions: ["Bluetooth / Wi-Fi", "Standalone LTE"],
    description: "Powered by a brand-new 3nm processor, dual-frequency GPS, and the BioActive Sensor 2 for unprecedented accuracy in health tracking and Energy Score calculation.",
    keyFeatures: [
      "Industry-first 3nm wearable processor (Exynos W1000)",
      "Daily Energy Score combining sleep, heart rate, and activity",
      "Dual-frequency L1 + L5 GPS for pinpoint city mapping"
    ],
    specs: {
      "Display": "1.5-inch Super AMOLED, Sapphire Crystal",
      "Memory": "2GB RAM + 32GB Storage",
      "Durability": "5ATM + IP68 / MIL-STD-810H"
    }
  },

  // AUDIO & SOUND
  {
    id: "airpods-pro-2-usb-c",
    name: "Apple AirPods Pro 2 (USB-C)",
    slug: "airpods-pro-2-usb-c",
    brand: "Apple",
    category: "audio",
    categoryName: "Audio & Sound",
    price: 26500,
    regularPrice: 29500,
    badge: "Best Seller",
    rating: 4.96,
    reviewCount: 320,
    inStock: true,
    stockCount: 35,
    warranty: "1 Year Official Apple Warranty",
    isFlashDeal: true,
    flashDiscount: "10% OFF",
    featured: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "White", hex: "#ffffff" }
    ],
    storage: [
      { size: "MagSafe Case (USB-C)", priceOffset: 0 }
    ],
    simOptions: ["Bluetooth 5.3"],
    description: "AirPods Pro 2 with USB-C. Up to 2x more Active Noise Cancellation, Adaptive Audio that tailors sound control to your environment, and clinically-validated Hearing Aid feature.",
    keyFeatures: [
      "Apple H2 headphone chip delivering richer bass and crisp highs",
      "Adaptive Audio dynamically blends ANC and Transparency mode",
      "Conversation Awareness lowers volume when you begin speaking",
      "MagSafe charging case with Precision Finding speaker and lanyard loop",
      "IP54 dust, sweat, and water resistance for both earbuds and case"
    ],
    specs: {
      "Battery": "Up to 6 hours listening with ANC (up to 30 hours with case)",
      "Charging": "USB-C, MagSafe, Apple Watch charger, Qi certified",
      "Sensors": "Skin-detect sensor, touch volume sliders"
    }
  },
  {
    id: "airpods-max-usb-c",
    name: "Apple AirPods Max (USB-C)",
    slug: "airpods-max-usb-c",
    brand: "Apple",
    category: "audio",
    categoryName: "Audio & Sound",
    price: 66999,
    regularPrice: 74999,
    badge: "Lossless Audio",
    rating: 4.92,
    reviewCount: 71,
    inStock: true,
    stockCount: 7,
    warranty: "1 Year Official Apple Warranty",
    isFlashDeal: false,
    featured: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Midnight", hex: "#1f232b" },
      { name: "Starlight", hex: "#ede7da" },
      { name: "Blue", hex: "#7a9cb8" },
      { name: "Purple", hex: "#b4a5bc" },
      { name: "Orange", hex: "#d97851" }
    ],
    storage: [
      { size: "Standard Edition", priceOffset: 0 }
    ],
    simOptions: ["Bluetooth 5.0 + USB-C Audio"],
    description: "Over-ear acoustic masterpiece updated with convenient USB-C charging and fresh colors. Custom acoustic design combined with advanced computational audio.",
    keyFeatures: [
      "Apple-designed dynamic driver provides high-fidelity audio reproduction",
      "Pro-level Active Noise Cancellation with Transparency mode",
      "Personalized Spatial Audio with dynamic head tracking",
      "Breathable knit mesh canopy and memory foam acoustic ear cushions"
    ],
    specs: {
      "Port": "USB-C charging and lossless audio playback",
      "Battery": "Up to 20 hours listening with ANC enabled",
      "Weight": "384.8 grams"
    }
  },
  {
    id: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5 Wireless Headphones",
    slug: "sony-wh-1000xm5",
    brand: "Sony",
    category: "audio",
    categoryName: "Audio & Sound",
    price: 36500,
    regularPrice: 42000,
    badge: "Industry Best ANC",
    rating: 4.93,
    reviewCount: 148,
    inStock: true,
    stockCount: 19,
    warranty: "1 Year Official Sony Warranty",
    isFlashDeal: true,
    flashDiscount: "13% OFF",
    featured: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Silver", hex: "#dfdeda" },
      { name: "Midnight Blue", hex: "#1a2c42" }
    ],
    storage: [
      { size: "Standard Packaging", priceOffset: 0 }
    ],
    simOptions: ["Multipoint Bluetooth 5.2 + 3.5mm Aux"],
    description: "With two processors and eight microphones, Sony WH-1000XM5 rewrites the rules for noise-free listening and exceptional voice clarity during calls.",
    keyFeatures: [
      "Integrated Processor V1 and HD Noise Canceling Processor QN1",
      "Specially designed 30mm carbon fiber composite driver unit",
      "Crystal clear hands-free calling with 4 beamforming microphones",
      "Up to 30 hours battery life with 3-minute quick charge for 3 hours"
    ],
    specs: {
      "Battery": "30 hours (ANC ON), 40 hours (ANC OFF)",
      "Codecs": "LDAC, AAC, SBC",
      "Weight": "250 grams"
    }
  },
  {
    id: "marshall-emberton-ii",
    name: "Marshall Emberton II Portable Bluetooth Speaker",
    slug: "marshall-emberton-ii",
    brand: "Marshall",
    category: "audio",
    categoryName: "Audio & Sound",
    price: 19500,
    regularPrice: 22500,
    badge: "30+ Hours Battery",
    rating: 4.87,
    reviewCount: 63,
    inStock: true,
    stockCount: 12,
    warranty: "1 Year Replacement Warranty",
    isFlashDeal: false,
    featured: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Black and Brass", hex: "#1e1e1e" },
      { name: "Cream", hex: "#eae6db" }
    ],
    storage: [
      { size: "Portable 20W Stereo", priceOffset: 0 }
    ],
    simOptions: ["Bluetooth 5.1"],
    description: "Emberton II delivers 30+ hours of portable playtime and True Stereophonic 360-degree multidirectional sound in a rugged IP67 dust and water-resistant build.",
    keyFeatures: [
      "True Stereophonic multi-directional 360 sound signature",
      "Stack Mode to connect multiple Emberton II speakers together",
      "Rugged IP67 water and dust resistant brass-textured body"
    ],
    specs: {
      "Playtime": "30+ hours on full charge",
      "Drivers": "Two 2-inch 10W full range + two passive radiators",
      "Weight": "0.7 kg"
    }
  },

  // ACCESSORIES
  {
    id: "apple-20w-usb-c-power-adapter",
    name: "Apple 20W USB-C Power Adapter (Original)",
    slug: "apple-20w-usb-c-power-adapter",
    brand: "Apple",
    category: "accessories",
    categoryName: "Accessories",
    price: 2450,
    regularPrice: 3200,
    badge: "100% Genuine",
    rating: 4.95,
    reviewCount: 540,
    inStock: true,
    stockCount: 80,
    warranty: "6 Months Official Apple Replacement Warranty",
    isFlashDeal: false,
    featured: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1622445262464-84b1456045b6?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "White", hex: "#ffffff" }
    ],
    storage: [
      { size: "3-Pin UK Plug", priceOffset: 0 },
      { size: "2-Pin EU/US Plug", priceOffset: 0 }
    ],
    simOptions: ["Universal USB-C Power Delivery"],
    description: "The Apple 20W USB-C Power Adapter offers fast, efficient charging at home, in the office, or on the go. Charges iPhone 16 / 15 series from 0 to 50% in 30 minutes.",
    keyFeatures: [
      "Official Apple authentic serial number verified",
      "Fast charging compatibility with iPhone 8 through iPhone 16 series & iPads",
      "Over-voltage and thermal safety cutoff sensors"
    ],
    specs: {
      "Wattage": "20 Watts Output",
      "Input": "100-240V AC 50-60Hz",
      "Compatibility": "iPhones, iPads, Apple Watches, AirPods"
    }
  },
  {
    id: "anker-prime-200w-gan-charging-station",
    name: "Anker Prime 200W GaN Charging Station (6-in-1)",
    slug: "anker-prime-200w-gan-charging-station",
    brand: "Anker",
    category: "accessories",
    categoryName: "Accessories",
    price: 13500,
    regularPrice: 15500,
    badge: "Smart Display",
    rating: 4.92,
    reviewCount: 42,
    inStock: true,
    stockCount: 15,
    warranty: "18 Months Anker Official Warranty",
    isFlashDeal: true,
    flashDiscount: "12% OFF",
    featured: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Space Gray", hex: "#4b4f58" }
    ],
    storage: [
      { size: "200W Desktop Station (4 USB-C + 2 USB-A)", priceOffset: 0 }
    ],
    simOptions: ["Power Delivery 3.0 / PPS / GaNPrime"],
    description: "Ultra-fast multi-device desktop powerhouse. Delivers up to 100W per single USB-C port to power two MacBooks simultaneously, with an active smart digital LCD display.",
    keyFeatures: [
      "200W total combined output with intelligent power redistribution",
      "Smart digital display monitors real-time wattage per port",
      "GaNPrime tech with ActiveShield 2.0 temperature monitoring 3M times/day"
    ],
    specs: {
      "Total Wattage": "200W Max",
      "Ports": "4x USB-C, 2x USB-A",
      "Display": "Full-color smart LCD status screen"
    }
  },
  {
    id: "apple-magsafe-charger-25w",
    name: "Apple 25W MagSafe Wireless Charger (2m)",
    slug: "apple-magsafe-charger-25w",
    brand: "Apple",
    category: "accessories",
    categoryName: "Accessories",
    price: 5200,
    regularPrice: 6200,
    badge: "Official MagSafe",
    rating: 4.89,
    reviewCount: 88,
    inStock: true,
    stockCount: 30,
    warranty: "6 Months Official Warranty",
    isFlashDeal: false,
    featured: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1622445262464-84b1456045b6?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Silver Braided Cable", hex: "#e5e5e7" }
    ],
    storage: [
      { size: "1 Meter", priceOffset: 0 },
      { size: "2 Meter", priceOffset: 1200 }
    ],
    simOptions: ["Qi2 / MagSafe Wireless"],
    description: "Upgraded MagSafe Charger brings ultra-fast wireless charging up to 25W for iPhone 16 series when paired with a 30W adapter. Premium braided durable cable.",
    keyFeatures: [
      "Fast wireless charging up to 25W for iPhone 16 series",
      "Braided cable construction for prolonged longevity",
      "Strong magnetic auto-alignment snap"
    ],
    specs: {
      "Wireless Output": "Up to 25W on iPhone 16, 15W on iPhone 12-15",
      "Cable Type": "Braided textile woven jacket"
    }
  },

  // GAMING & DRONES
  {
    id: "sony-playstation-5-slim",
    name: "Sony PlayStation 5 Slim (Disc Edition)",
    slug: "sony-playstation-5-slim",
    brand: "Sony",
    category: "gaming",
    categoryName: "Gaming & Drones",
    price: 68500,
    regularPrice: 76000,
    badge: "1TB SSD Included",
    rating: 4.96,
    reviewCount: 92,
    inStock: true,
    stockCount: 8,
    warranty: "1 Year Service Warranty + 7 Days Replacement",
    isFlashDeal: true,
    flashDiscount: "10% OFF",
    featured: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Glacier White", hex: "#f0f0f0" }
    ],
    storage: [
      { size: "1TB NVMe SSD + DualSense Controller", priceOffset: 0 },
      { size: "1TB SSD + 2 Controllers Bundle", priceOffset: 8500 }
    ],
    simOptions: ["Ultra HD Blu-ray Disc + Digital"],
    description: "The sleek, compact PlayStation 5 Slim console packs monumental gaming power into a 30% smaller chassis with a full 1TB of ultra-high speed internal storage.",
    keyFeatures: [
      "Haptic feedback and adaptive triggers via DualSense wireless controller",
      "Custom RDNA 2 GPU with hardware ray tracing support at up to 120fps",
      "Tempest 3D AudioTech for immersive gaming acoustic spatial cues",
      "Removable Ultra HD Blu-ray disc drive"
    ],
    specs: {
      "Storage": "1TB Custom High-Speed NVMe SSD (5.5 GB/s raw)",
      "Output": "Supports 4K 120Hz TVs, 8K TVs, VRR (HDMI 2.1)",
      "Weight": "3.2 kg"
    }
  },
  {
    id: "dji-osmo-pocket-3-creator-combo",
    name: "DJI Osmo Pocket 3 (Creator Combo)",
    slug: "dji-osmo-pocket-3-creator-combo",
    brand: "DJI",
    category: "gaming",
    categoryName: "Gaming & Drones",
    price: 78500,
    regularPrice: 85000,
    badge: "1-Inch CMOS Sensor",
    rating: 4.97,
    reviewCount: 112,
    inStock: true,
    stockCount: 5,
    warranty: "1 Year Official DJI Warranty",
    isFlashDeal: false,
    featured: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1527698266440-12104e498b76?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Matte Black", hex: "#222222" }
    ],
    storage: [
      { size: "Standard Package", priceOffset: 0 },
      { size: "Creator Combo (Mic 2 + Battery Handle)", priceOffset: 16500 }
    ],
    simOptions: ["Wi-Fi & Bluetooth App Connection"],
    description: "The ultimate pocket vlogging camera featuring a massive 1-inch CMOS sensor, 4K/120fps recording, 3-axis mechanical gimbal stabilization, and rotating 2-inch OLED touchscreen.",
    keyFeatures: [
      "Large 1-inch CMOS sensor captures rich details even in low light",
      "Rotatable 2-inch OLED screen switches between horizontal and vertical shooting",
      "Creator Combo includes DJI Mic 2 transmitter for studio-grade audio capture",
      "ActiveTrack 6.0 keeps your subject dead center dynamically"
    ],
    specs: {
      "Sensor": "1-inch CMOS, f/2.0 aperture",
      "Video": "Up to 4K/120fps, 10-bit D-Log M and HLG",
      "Stabilization": "3-Axis Mechanical Gimbal",
      "Weight": "179 grams"
    }
  },

  // CERTIFIED PRE-OWNED (RECELL)
  {
    id: "preowned-iphone-14-pro-256gb",
    name: "iPhone 14 Pro 256GB (Certified Pre-Owned)",
    slug: "preowned-iphone-14-pro-256gb",
    brand: "Apple",
    category: "pre-owned",
    categoryName: "Certified Pre-Owned",
    price: 88500,
    regularPrice: 125000,
    badge: "Grade A+ (92% Battery)",
    rating: 4.86,
    reviewCount: 76,
    inStock: true,
    stockCount: 4,
    warranty: "7 Days Replacement + 1 Year iSPACE Service Warranty",
    isFlashDeal: true,
    flashDiscount: "29% OFF",
    featured: true,
    isNew: false,
    isPreOwned: true,
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Deep Purple", hex: "#4d4157" },
      { name: "Space Black", hex: "#2e2e30" },
      { name: "Gold", hex: "#fae7cf" }
    ],
    storage: [
      { size: "128GB", priceOffset: -7000 },
      { size: "256GB", priceOffset: 0 },
      { size: "512GB", priceOffset: 12000 }
    ],
    simOptions: [
      "Physical SIM + eSIM (Global)",
      "Physical Dual SIM"
    ],
    description: "iSPACE Recell Certified Pre-Owned. Flawless Grade A+ condition, passed 32-point hardware diagnostic inspection. 100% original Apple parts with guaranteed minimum 90% battery health.",
    keyFeatures: [
      "32-point comprehensive hardware & battery diagnostic passed",
      "Guaranteed original OEM display, camera, and logic board",
      "Includes premium braided charging cable and box",
      "7 Days hassle-free replacement guarantee + 1 Year free service"
    ],
    specs: {
      "Condition": "Grade A+ (No visible scratches, like new)",
      "Battery Health": "92% - 96% Genuine Apple Battery",
      "Display": "6.1-inch Super Retina XDR OLED 120Hz ProMotion with Dynamic Island",
      "Camera": "48MP Pro triple-lens camera system with Photonic Engine",
      "Warranty": "7 Days Replacement + 1 Year Service Warranty"
    }
  },
  {
    id: "preowned-macbook-air-m1",
    name: "MacBook Air 13\" M1 (Certified Pre-Owned)",
    slug: "preowned-macbook-air-m1",
    brand: "Apple",
    category: "pre-owned",
    categoryName: "Certified Pre-Owned",
    price: 68500,
    regularPrice: 95000,
    badge: "Super Deal",
    rating: 4.88,
    reviewCount: 89,
    inStock: true,
    stockCount: 7,
    warranty: "7 Days Replacement + 1 Year iSPACE Service Warranty",
    isFlashDeal: false,
    featured: false,
    isNew: false,
    isPreOwned: true,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [
      { name: "Space Gray", hex: "#5b5d62" },
      { name: "Gold", hex: "#f0d4ba" }
    ],
    storage: [
      { size: "8GB RAM / 256GB SSD", priceOffset: 0 },
      { size: "16GB RAM / 256GB SSD", priceOffset: 14000 }
    ],
    simOptions: ["Wi-Fi 6"],
    description: "The most legendary laptop ever built. Fully tested Grade A pre-owned unit with battery cycle under 120, silent fanless thermal design, and all-day battery life.",
    keyFeatures: [
      "M1 chip with 8-core CPU delivers blazing everyday performance",
      "Fanless silent acoustic operation",
      "Retina display with P3 wide color gamut"
    ],
    specs: {
      "Condition": "Grade A+ Pristine",
      "Battery Health": "94%+ Original Health",
      "Processor": "Apple M1 chip",
      "Weight": "1.29 kg"
    }
  }
];

export const brands = [
  { name: "Apple", logoText: " Apple", count: 18 },
  { name: "Samsung", logoText: "SAMSUNG", count: 12 },
  { name: "Google", logoText: "Google", count: 6 },
  { name: "Sony", logoText: "SONY", count: 9 },
  { name: "Anker", logoText: "ANKER", count: 14 },
  { name: "DJI", logoText: "DJI", count: 5 },
  { name: "Marshall", logoText: "Marshall", count: 4 },
  { name: "ASUS", logoText: "ASUS ROG", count: 7 }
];
