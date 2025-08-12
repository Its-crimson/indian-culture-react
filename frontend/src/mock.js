// Mock data for Indian Culture Heritage website

export const heroSlides = [
  {
    id: 1,
    title: "Classical Dance Forms",
    description: "Bharatanatyam, Kathak, Odissi - Ancient stories told through graceful movements",
    categories: ["Dance", "Arts", "Traditions"],
    bgColor: "#d987ff", // mid-purple
    textColor: "#151515", // black
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    region: "Pan-India"
  },
  {
    id: 2,
    title: "Vibrant Festivals",
    description: "Diwali, Holi, Durga Puja - Celebrations that unite communities across the nation",
    categories: ["Festivals", "Traditions", "Community"],
    bgColor: "#ffe03d", // mid-yellow
    textColor: "#151515", // black
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&h=600&fit=crop",
    region: "National"
  },
  {
    id: 3,
    title: "Magnificent Architecture",
    description: "From Taj Mahal to ancient temples - Architectural marvels that define India's skyline",
    categories: ["Architecture", "Heritage", "History"],
    bgColor: "#88a2ff", // mid-blue
    textColor: "#ffffff", // white
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
    region: "Historical"
  },
  {
    id: 4,
    title: "Culinary Heritage",
    description: "Rich flavors and diverse cuisines - A gastronomic journey across Indian states",
    categories: ["Cuisine", "Culture", "Regional"],
    bgColor: "#ff965a", // mid-orange
    textColor: "#ffffff", // white
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
    region: "Pan-India"
  },
  {
    id: 5,
    title: "Traditional Crafts",
    description: "Handloom textiles, pottery, jewelry - Artisan skills passed down through generations",
    categories: ["Crafts", "Arts", "Heritage"],
    bgColor: "#78d692", // mid-green
    textColor: "#151515", // black
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    region: "Rural India"
  }
];

export const culturalCategories = [
  {
    id: 1,
    title: "Classical Arts",
    description: "Explore the timeless beauty of Indian classical music, dance, and performing arts that have captivated audiences for millennia.",
    bgColor: "#ffd1e7", // light-pink
    textColor: "#151515", // black
    categories: ["Music", "Dance", "Theatre"],
    count: "12+ Forms",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Festivals & Celebrations",
    description: "Discover the vibrant tapestry of Indian festivals that celebrate seasons, harvests, and spiritual traditions.",
    bgColor: "#f6fd87", // light-yellow
    textColor: "#151515", // black
    categories: ["Festivals", "Traditions", "Spirituality"],
    count: "50+ Festivals",
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Architectural Wonders",
    description: "Journey through India's magnificent architectural heritage from ancient temples to Mughal monuments.",
    bgColor: "#b6cbcb", // grey
    textColor: "#151515", // black
    categories: ["Architecture", "Heritage", "History"],
    count: "100+ Sites",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Regional Cuisines",
    description: "Savor the diverse flavors and cooking traditions that vary dramatically across India's states and regions.",
    bgColor: "#b7fbff", // light-blue
    textColor: "#151515", // black
    categories: ["Food", "Culture", "Regional"],
    count: "25+ Cuisines",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Traditional Crafts",
    description: "Appreciate the intricate craftsmanship of India's artisans through textiles, pottery, jewelry, and more.",
    bgColor: "#d987ff", // mid-purple
    textColor: "#ffffff", // white
    categories: ["Crafts", "Textiles", "Artisan"],
    count: "30+ Crafts",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    title: "Languages & Literature",
    description: "Explore India's linguistic diversity and rich literary traditions spanning ancient epics to modern works.",
    bgColor: "#88a2ff", // mid-blue
    textColor: "#ffffff", // white
    categories: ["Literature", "Languages", "Poetry"],
    count: "22+ Languages",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
  }
];

export const regionalHighlights = [
  {
    id: 1,
    region: "North India",
    states: ["Punjab", "Rajasthan", "Delhi", "Uttar Pradesh"],
    highlights: ["Punjabi Bhangra", "Rajasthani Folk Art", "Mughal Architecture", "Classical Music"],
    bgColor: "#ff84e4", // mid-pink
    textColor: "#151515" // black
  },
  {
    id: 2,
    region: "South India",
    states: ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh"],
    highlights: ["Bharatanatyam", "Ayurveda", "Temple Architecture", "Classical Music"],
    bgColor: "#78d692", // mid-green
    textColor: "#151515" // black
  },
  {
    id: 3,
    region: "East India",
    states: ["West Bengal", "Odisha", "Assam", "Jharkhand"],
    highlights: ["Durga Puja", "Odissi Dance", "Tea Culture", "Handicrafts"],
    bgColor: "#ffe03d", // mid-yellow
    textColor: "#151515" // black
  },
  {
    id: 4,
    region: "West India",
    states: ["Maharashtra", "Gujarat", "Goa", "Rajasthan"],
    highlights: ["Bollywood", "Garba Dance", "Portuguese Heritage", "Business Culture"],
    bgColor: "#d1903a", // dark-orange
    textColor: "#ffffff" // white
  }
];

export const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Culture", href: "/culture" },
  { label: "Heritage", href: "/heritage" },
  { label: "Regions", href: "/regions" },
  { label: "Learn", href: "/learn" },
  { label: "About", href: "/about" }
];

export const featuredStories = [
  {
    id: 1,
    title: "The Art of Mehendi",
    excerpt: "Discover the intricate patterns and cultural significance of henna art in Indian weddings and celebrations.",
    category: "Traditional Arts",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Spice Routes of India",
    excerpt: "Journey through the historical trade routes that brought the world to India's doorstep.",
    category: "History & Culture",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Monsoon Festivals",
    excerpt: "Celebrate the life-giving rains through India's monsoon festivals and traditions.",
    category: "Festivals",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=300&h=200&fit=crop"
  }
];