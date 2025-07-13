import React, { useState, useEffect, useRef, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, MeshDistortMaterial, Environment, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Search, ShoppingCart, Heart, User, Menu, Star, ChevronDown, 
  ChevronRight, Plus, Minus, X, Instagram, Facebook, Twitter,
  Truck, Shield, Leaf, Recycle, ArrowRight, Play, Pause,
  Filter, Grid, List, SlidersHorizontal, Eye, Share2
} from 'lucide-react';
import { 
  categories, featuredProducts, heroContent, testimonials, 
  brandStory, mockCartItems, mockUser, collections 
} from './mockData';
import './App.css';

// 3D Floating Product Component
const FloatingProduct = ({ position = [0, 0, 0], rotation = [0, 0, 0], color = "#f8f7f4", name = "Organic Cotton Tee", price = "$45" }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
      <group ref={meshRef} position={position} rotation={rotation}>
        {/* Main product shape */}
        <Box args={[1.2, 1.6, 0.15]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.1}
            metalness={0.1}
          />
        </Box>
        
        {/* Eco badge */}
        <Box args={[0.4, 0.15, 0.05]} position={[0.4, 0.6, 0.1]}>
          <meshStandardMaterial color="#22c55e" />
        </Box>
        
        {/* Product name */}
        <Text
          position={[0, -1, 0.1]}
          fontSize={0.12}
          color="#1f2937"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
        >
          {name}
        </Text>
        
        {/* Price */}
        <Text
          position={[0, -1.3, 0.1]}
          fontSize={0.1}
          color="#059669"
          anchorX="center"
          anchorY="middle"
          font-weight="bold"
        >
          {price}
        </Text>
      </group>
    </Float>
  );
};

// 3D Particle System
const Particles = () => {
  const particlesRef = useRef();
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 50 }).map((_, i) => (
        <Sphere key={i} args={[0.015]} position={[
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 8
        ]}>
          <meshBasicMaterial 
            color="#22c55e" 
            transparent 
            opacity={Math.random() * 0.6 + 0.2} 
          />
        </Sphere>
      ))}
    </group>
  );
};

// 3D Scene Background
const Scene3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full opacity-80">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#22c55e" />
          <Environment preset="studio" />
          
          <FloatingProduct 
            position={[3, 1, 0]} 
            rotation={[0, -0.5, 0]} 
            color="#f8f7f4"
            name="Organic Tee"
            price="$45"
          />
          <FloatingProduct 
            position={[-3, -1, -1]} 
            rotation={[0, 0.5, 0]} 
            color="#e2ded0"
            name="Hemp Joggers" 
            price="$65"
          />
          <FloatingProduct 
            position={[2, -2, -0.5]} 
            rotation={[0, 1, 0]} 
            color="#d4d4aa"
            name="Wool Sweater"
            price="$89"
          />
          
          <Particles />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Header Component
const Header = ({ cartItems, toggleCart, user, toggleMobileMenu, mobileMenuOpen }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryHover = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleCategoryLeave = () => {
    setActiveCategory(null);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-slate-800 tracking-tight">
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Terra
              </span>
              <span className="text-slate-800">Cloth</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => handleCategoryHover(category.id)}
                onMouseLeave={handleCategoryLeave}
              >
                <Link
                  to={`/category/${category.slug}`}
                  className="flex items-center space-x-1 text-slate-700 hover:text-green-600 font-medium transition-colors duration-200"
                >
                  <span>{category.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </Link>
                
                {/* Mega Menu */}
                {activeCategory === category.id && (
                  <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-slate-200 py-4 mt-2 transform animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-3">{category.name}</h3>
                      <div className="space-y-2">
                        {category.subcategories.map((subcategory, index) => (
                          <Link
                            key={index}
                            to={`/category/${category.slug}/${subcategory.toLowerCase()}`}
                            className="block text-slate-600 hover:text-green-600 py-1 transition-colors duration-200"
                          >
                            {subcategory}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 max-w-xs">
              <Search className="w-4 h-4 text-slate-500 mr-2" />
              <input
                type="text"
                placeholder="Search sustainable fashion..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm flex-1"
              />
            </div>

            {/* User */}
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200">
              <User className="w-5 h-5 text-slate-700" />
            </button>

            {/* Wishlist */}
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200 relative">
              <Heart className="w-5 h-5 text-slate-700" />
            </button>

            {/* Cart */}
            <button 
              onClick={toggleCart}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200 relative"
            >
              <ShoppingCart className="w-5 h-5 text-slate-700" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button 
              onClick={toggleMobileMenu}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200 lg:hidden"
            >
              <Menu className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Section with 3D
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % 3);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* 3D Background */}
      <Scene3D />
      
      {/* Content Overlay */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="transform animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Conscious
            </span>
            <br />
            Fashion for a
            <br />
            <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
              Better Tomorrow
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover sustainable style that doesn't compromise on quality or ethics. 
            Every piece tells a story of craftsmanship and care.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2">
              <span>Shop Collection</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button className="flex items-center space-x-2 text-slate-700 hover:text-green-600 font-medium transition-colors duration-200">
              <Play className="w-5 h-5" />
              <span>Watch Our Story</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

// Product Card Component
const ProductCard = ({ product, onAddToCart, onToggleWishlist, isInWishlist }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product.new && (
            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
              NEW
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{product.discount}%
            </span>
          )}
          {product.sustainable && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
              <Leaf className="w-3 h-3" />
              <span>ECO</span>
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onToggleWishlist(product.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-200 ${
              isInWishlist ? 'bg-red-500 text-white' : 'bg-white/80 text-slate-700 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
          
          <button className="p-2 bg-white/80 text-slate-700 rounded-full backdrop-blur-sm hover:bg-white transition-colors duration-200">
            <Eye className="w-4 h-4" />
          </button>
          
          <button className="p-2 bg-white/80 text-slate-700 rounded-full backdrop-blur-sm hover:bg-white transition-colors duration-200">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <button
            onClick={() => onAddToCart(product, selectedSize, selectedColor)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full font-semibold transition-colors duration-200"
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-slate-800 group-hover:text-green-600 transition-colors duration-200">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-slate-600">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-slate-600 text-sm mb-4">{product.category}</p>
        
        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xl font-bold text-slate-800">${product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-slate-500 line-through">${product.originalPrice}</span>
          )}
        </div>

        {/* Color Options */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-slate-600">Colors:</span>
          <div className="flex space-x-1">
            {product.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === color ? 'border-green-600 scale-110' : 'border-slate-300'
                }`}
                style={{ 
                  backgroundColor: color.toLowerCase() === 'natural' ? '#f8f7f4' : 
                                   color.toLowerCase() === 'sage' ? '#9caf88' :
                                   color.toLowerCase() === 'charcoal' ? '#36454f' :
                                   color.toLowerCase() === 'cream' ? '#fffdd0' :
                                   color.toLowerCase() === 'forest' ? '#355e3b' :
                                   color.toLowerCase() === 'navy' ? '#000080' :
                                   color.toLowerCase() === 'olive' ? '#808000' :
                                   color.toLowerCase() === 'black' ? '#000000' : '#f8f7f4'
                }}
              />
            ))}
          </div>
        </div>

        {/* Materials */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.materials.map((material, index) => (
            <span
              key={index}
              className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
            >
              {material}
            </span>
          ))}
        </div>

        {/* Reviews */}
        <p className="text-sm text-slate-500">
          {product.reviews} reviews
        </p>
      </div>
    </div>
  );
};

// Category Grid
const CategoryGrid = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Shop by Category</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover our thoughtfully curated collections, each designed with sustainability at its core
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-green-50 to-green-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
              </div>
              
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-200 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-green-100 text-sm opacity-90">
                  {category.subcategories.length} categories
                </p>
                
                <div className="mt-4 flex items-center text-white group-hover:text-green-200 transition-colors duration-300">
                  <span className="text-sm font-medium">Explore</span>
                  <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// Featured Products Section
const FeaturedProducts = ({ onAddToCart, onToggleWishlist, wishlist }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Featured Products</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Our most loved pieces, crafted with care for you and the planet
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlist.includes(product.id)}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

// Brand Story Section
const BrandStorySection = () => {
  return (
    <section className="py-20 bg-slate-800 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">{brandStory.title}</h2>
            <h3 className="text-xl text-green-300 mb-8 font-medium">{brandStory.subtitle}</h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              {brandStory.description}
            </p>
            
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <span>Learn More</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {brandStory.values.map((value, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl mb-4">{value.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                <p className="text-slate-300 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">What Our Customers Say</h2>
        <p className="text-xl text-slate-600 mb-16">
          Real stories from people who choose conscious fashion
        </p>
        
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-8 lg:p-12">
          <div className="flex transition-transform duration-500 ease-in-out" 
               style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="w-full flex-shrink-0">
                <div className="flex items-center justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-xl lg:text-2xl text-slate-800 mb-8 leading-relaxed">
                  "{testimonial.review}"
                </blockquote>
                
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{testimonial.name}</p>
                    <p className="text-slate-600">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentTestimonial ? 'bg-green-600' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Newsletter Section
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Stay in the Loop</h2>
        <p className="text-xl text-green-100 mb-8">
          Get early access to new collections, exclusive offers, and sustainability tips
        </p>
        
        {isSubscribed ? (
          <div className="bg-white/20 backdrop-blur-sm rounded-full py-4 px-8 inline-flex items-center space-x-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-semibold">Thank you for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-slate-800 outline-none focus:ring-4 focus:ring-white/30 transition-all duration-200"
              required
            />
            <button
              type="submit"
              className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
        
        <p className="text-sm text-green-100 mt-6">
          No spam, unsubscribe at any time. Read our{' '}
          <Link to="/privacy" className="underline hover:no-underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-green-400">Terra</span>Cloth
            </div>
            <p className="text-slate-400 mb-6">
              Sustainable fashion that doesn't compromise on style or ethics.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-slate-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-slate-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-slate-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/category/${category.slug}`} className="text-slate-400 hover:text-white transition-colors duration-200">
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/new-arrivals" className="text-slate-400 hover:text-white transition-colors duration-200">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/our-story" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2025 TerraCloth. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 text-sm">
            <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-slate-400 hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
            <div className="flex items-center space-x-2 text-slate-400">
              <Leaf className="w-4 h-4 text-green-400" />
              <span>Carbon Neutral Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Shopping Cart Sidebar
const CartSidebar = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-800 mb-2">Your cart is empty</h3>
                <p className="text-slate-600 mb-6">Add some sustainable fashion to get started!</p>
                <button
                  onClick={onClose}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-800">{item.name}</h3>
                      <p className="text-sm text-slate-600">{item.color} • {item.size}</p>
                      <p className="text-lg font-semibold text-slate-800">${item.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-1 hover:bg-slate-100 rounded transition-colors duration-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-slate-100 rounded transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-slate-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-slate-800">Subtotal</span>
                <span className="text-xl font-bold text-slate-800">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold transition-colors duration-200">
                  Checkout
                </button>
                <button 
                  onClick={onClose}
                  className="w-full border border-slate-300 text-slate-700 py-3 rounded-full font-semibold hover:bg-slate-50 transition-colors duration-200"
                >
                  Continue Shopping
                </button>
              </div>
              
              <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-slate-600">
                <Truck className="w-4 h-4" />
                <span>Free shipping on orders over $75</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Homepage Component
const Homepage = ({ onAddToCart, onToggleWishlist, wishlist }) => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts 
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlist={wishlist}
      />
      <BrandStorySection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};

// Main App Component
const App = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState(mockUser);
  const [wishlist, setWishlist] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cart functions
  const addToCart = (product, size, color) => {
    const existingItem = cartItems.find(
      item => item.productId === product.id && item.size === size && item.color === color
    );

    if (existingItem) {
      updateCartQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      const newItem = {
        id: Date.now(),
        productId: product.id,
        name: product.name,
        size,
        color,
        quantity: 1,
        price: product.price,
        image: product.images[0]
      };
      setCartItems([...cartItems, newItem]);
    }
    
    // Show cart briefly
    setCartOpen(true);
    setTimeout(() => setCartOpen(false), 2000);
  };

  const updateCartQuantity = (itemId, quantity) => {
    if (quantity === 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(items =>
        items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  // Wishlist functions
  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header 
          cartItems={cartItems}
          toggleCart={toggleCart}
          user={user}
          toggleMobileMenu={toggleMobileMenu}
          mobileMenuOpen={mobileMenuOpen}
        />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <Homepage 
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                wishlist={wishlist}
              />
            } 
          />
          <Route path="/category/:slug" element={<div className="pt-20 p-8">Category page coming soon...</div>} />
          <Route path="/product/:id" element={<div className="pt-20 p-8">Product page coming soon...</div>} />
        </Routes>
        
        <CartSidebar
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
        />
        
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;