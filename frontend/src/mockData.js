// Mock data for sustainable fashion e-commerce

export const categories = [
  {
    id: 1,
    name: "Women",
    slug: "women",
    image: "https://images.unsplash.com/photo-1614028609503-590a6a47146a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxzdXN0YWluYWJsZSUyMGZhc2hpb258ZW58MHx8fHdoaXRlfDE3NTIzOTE0NDV8MA&ixlib=rb-4.1.0&q=85",
    subcategories: ["Dresses", "Tops", "Bottoms", "Outerwear", "Intimates"]
  },
  {
    id: 2,
    name: "Men",
    slug: "men",
    image: "https://images.unsplash.com/photo-1473861646675-0252edc45daa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhc2hpb258ZW58MHx8fHdoaXRlfDE3NTIzOTE0NDV8MA&ixlib=rb-4.1.0&q=85",
    subcategories: ["Shirts", "T-Shirts", "Pants", "Outerwear", "Accessories"]
  },
  {
    id: 3,
    name: "Kids",
    slug: "kids",
    image: "https://images.unsplash.com/photo-1605096481060-7654cb6a7e9d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxzdXN0YWluYWJsZSUyMGZhc2hpb258ZW58MHx8fHdoaXRlfDE3NTIzOTE0NDV8MA&ixlib=rb-4.1.0&q=85",
    subcategories: ["Baby", "Toddler", "Girls", "Boys", "Shoes"]
  },
  {
    id: 4,
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1639690200179-a6533853f414?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxvcmdhbmljJTIwY290dG9ufGVufDB8fHx3aGl0ZXwxNzUyMzkxNDUzfDA&ixlib=rb-4.1.0&q=85",
    subcategories: ["Bags", "Jewelry", "Scarves", "Hats", "Belts"]
  }
];

export const featuredProducts = [
  {
    id: 1,
    name: "Organic Cotton Essential Tee",
    category: "Women",
    price: 45,
    originalPrice: 60,
    discount: 25,
    rating: 4.8,
    reviews: 234,
    colors: ["Natural", "Sage", "Charcoal"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1639690222445-595b0794bbd4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9ufGVufDB8fHx3aGl0ZXwxNzUyMzkxNDUzfDA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1614028609503-590a6a47146a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxzdXN0YWluYWJsZSUyMGZhc2hpb258ZW58MHx8fHdoaXRlfDE3NTIzOTE0NDV8MA&ixlib=rb-4.1.0&q=85"
    ],
    description: "Soft, breathable organic cotton tee made from GOTS-certified organic cotton. Perfect for everyday wear.",
    materials: ["100% Organic Cotton", "GOTS Certified", "Fair Trade"],
    inStock: true,
    featured: true,
    new: false,
    sustainable: true
  },
  {
    id: 2,
    name: "Recycled Wool Sweater",
    category: "Women",
    price: 89,
    originalPrice: 120,
    discount: 26,
    rating: 4.9,
    reviews: 156,
    colors: ["Cream", "Forest", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1605096481060-7654cb6a7e9d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxzdXN0YWluYWJsZSUyMGZhc2hpb258ZW58MHx8fHdoaXRlfDE3NTIzOTE0NDV8MA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1639690200179-a6533853f414?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxvcmdhbmljJTIwY290dG9ufGVufDB8fHx3aGl0ZXwxNzUyMzkxNDUzfDA&ixlib=rb-4.1.0&q=85"
    ],
    description: "Cozy sweater made from 100% recycled wool. Consciously crafted for warmth and style.",
    materials: ["100% Recycled Wool", "RWS Certified", "Carbon Neutral"],
    inStock: true,
    featured: true,
    new: true,
    sustainable: true
  },
  {
    id: 3,
    name: "Hemp Blend Joggers",
    category: "Men",
    price: 65,
    originalPrice: 85,
    discount: 24,
    rating: 4.7,
    reviews: 89,
    colors: ["Natural", "Olive", "Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1473861646675-0252edc45daa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhc2hpb258ZW58MHx8fHdoaXRlfDE3NTIzOTE0NDV8MA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1554990462-e8e4bca9eec2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxvcmdhbmljJTIwY290dG9ufGVufDB8fHx3aGl0ZXwxNzUyMzkxNDUzfDA&ixlib=rb-4.1.0&q=85"
    ],
    description: "Comfortable joggers made from a hemp-organic cotton blend. Perfect for active lifestyles.",
    materials: ["55% Hemp", "45% Organic Cotton", "Vegan"],
    inStock: true,
    featured: true,
    new: false,
    sustainable: true
  }
];

export const heroContent = {
  title: "Conscious Fashion for a Better Tomorrow",
  subtitle: "Discover sustainable style that doesn't compromise on quality or ethics. Every piece tells a story of craftsmanship and care.",
  cta: "Shop Collection",
  backgroundImage: "https://images.unsplash.com/photo-1473861646675-0252edc45daa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhc2hpb258ZW58MHx8fHdoaXRlfDE3NTIzOTE0NDV8MA&ixlib=rb-4.1.0&q=85"
};

export const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    rating: 5,
    review: "Beautiful, high-quality pieces that feel good to wear and good for the planet. The organic cotton is incredibly soft!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1-avatar"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    rating: 5,
    review: "Love knowing that my clothes are made ethically. The fit and quality exceed my expectations every time.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d-avatar"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    rating: 5,
    review: "Finally found a brand that aligns with my values without sacrificing style. The sustainable materials feel amazing.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80-avatar"
  }
];

export const brandStory = {
  title: "Our Story",
  subtitle: "Born from a vision of fashion that heals, not harms",
  description: "We believe that beautiful clothing shouldn't come at the cost of our planet or the people who make it. Every thread, every stitch, every design choice is made with intention – to create timeless pieces that honor both style and sustainability.",
  values: [
    {
      icon: "🌱",
      title: "Sustainable Materials",
      description: "Organic, recycled, and innovative eco-friendly fabrics"
    },
    {
      icon: "👥",
      title: "Fair Trade",
      description: "Ethical production supporting artisan communities"
    },
    {
      icon: "♻️",
      title: "Circular Design",
      description: "Made to last, designed for end-of-life recycling"
    },
    {
      icon: "🌍",
      title: "Carbon Neutral",
      description: "Climate positive shipping and operations"
    }
  ]
};

// Mock cart data
export const mockCartItems = [
  {
    id: 1,
    productId: 1,
    name: "Organic Cotton Essential Tee",
    size: "M",
    color: "Natural",
    quantity: 2,
    price: 45,
    image: "https://images.unsplash.com/photo-1639690222445-595b0794bbd4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9ufGVufDB8fHx3aGl0ZXwxNzUyMzkxNDUzfDA&ixlib=rb-4.1.0&q=85"
  }
];

// Mock user data
export const mockUser = {
  name: "Alex Morgan",
  email: "alex@example.com",
  isLoggedIn: false,
  wishlist: [],
  orders: [],
  addresses: []
};

export const collections = [
  {
    id: 1,
    name: "Earth Essentials",
    description: "Timeless basics made from nature's finest materials",
    image: "https://images.unsplash.com/photo-1639690222445-595b0794bbd4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9ufGVufDB8fHx3aGl0ZXwxNzUyMzkxNDUzfDA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 2,
    name: "Urban Renewal",
    description: "City-ready styles crafted from recycled materials",
    image: "https://images.unsplash.com/photo-1614028609503-590a6a47146a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxzdXN0YWluYWJsZSUyMGZhc2hpb258ZW58MHx8fHdoaXRlfDE3NTIzOTE0NDV8MA&ixlib=rb-4.1.0&q=85"
  }
];