'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChefHat, MapPin, Clock, Phone, Instagram, MessageCircle, Mail, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import './animations.css';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [stats, setStats] = useState({ items: 0, rating: 0, time: 0 });

  useEffect(() => {
    // Parallax scroll effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-scroll');
    elements.forEach((el) => observer.observe(el));

    // Stats counter animation
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && stats.items === 0) {
            // Animate counters
            let itemCount = 0;
            let ratingCount = 0;
            let timeCount = 0;
            const interval = setInterval(() => {
              if (itemCount < 25) itemCount++;
              if (ratingCount < 4.8) ratingCount += 0.1;
              if (timeCount < 30) timeCount++;
              setStats({ items: itemCount, rating: parseFloat(ratingCount.toFixed(1)), time: timeCount });
              if (itemCount >= 25 && ratingCount >= 4.8 && timeCount >= 30) {
                clearInterval(interval);
              }
            }, 30);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsElement = document.querySelector('.stats-section');
    if (statsElement) statsObserver.observe(statsElement);

    return () => {
      observer.disconnect();
      statsObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [stats.items]);

  const specials = [
    {
      name: "Butter Chicken",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80",
      description: "Creamy, rich, and absolutely delicious"
    },
    {
      name: "Biryani",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
      description: "Aromatic and flavorful rice perfection"
    },
    {
      name: "Margherita Pizza",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
      description: "Fresh, cheesy, and wood-fired"
    },
    {
      name: "Chicken Tandoori",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80",
      description: "Smoky, spicy, and tender"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ChefHat className="w-8 h-8 text-orange-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Demo Fork</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Home</Link>
            <Link href="/menu" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Menu</Link>
            <Link href="/cart" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Cart</Link>
          </nav>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-orange-50 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <nav className="flex flex-col py-4">
              <Link
                href="/"
                className="px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link
                href="/cart"
                className="px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80"
            alt="Delicious food"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Main Content */}
          <div className="text-center lg:text-left">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-float">
              🔥 Premium Cloud Kitchen
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-slide-in-left">
              Delicious Food
              <span className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent animate-slide-in-right">Delivered Fresh</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Experience culinary perfection from our cloud kitchen. Fresh ingredients, authentic flavors, delivered right to your doorstep.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                href="/menu"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-110 shadow-lg hover:shadow-2xl text-center animate-pulse-slow relative overflow-hidden group"
              >
                <span className="relative z-10">View Menu</span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
              <a
                href="tel:9108695696"
                className="bg-white border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-110 shadow-md hover:bg-orange-50 text-center hover:shadow-xl"
              >
                Call Now
              </a>
            </div>

            {/* Timing Info */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-full px-6 py-3 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
              <Clock className="w-6 h-6 text-orange-500 animate-spin-slow" />
              <div>
                <p className="text-sm font-bold text-gray-900">Open Daily</p>
                <p className="text-xs text-gray-600">10 AM - 10 PM</p>
              </div>
            </div>
          </div>

          {/* Right Side - Featured Image */}
          <div className="hidden lg:block">
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 hover:scale-105 shine-effect">
              <Image
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
                alt="Delicious food"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Specials Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-white to-orange-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-3 sm:mb-4 fade-in-scroll bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent animate-gradient">
            Our Specials
          </h2>
          <p className="text-center text-gray-600 text-base sm:text-lg mb-8 sm:mb-12 fade-in-scroll">
            Handcrafted dishes that define excellence
          </p>

          {/* Horizontal Scroll Container */}
          <div className="relative">
            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {specials.map((item, index) => (
                <div 
                  key={index}
                  className={`fade-in-scroll stagger-${index + 1} flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] snap-center`}
                >
                  <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                    <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                      <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{item.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-200">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scroll Indicator */}
            <div className="text-center mt-4 text-gray-400 text-sm animate-pulse">
              ← Swipe to explore →
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-12 fade-in-scroll">
            <Link 
              href="/menu"
              className="inline-block border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold transition-all hover:shadow-lg hover:shadow-orange-500/50 hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">Explore Full Menu</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 via-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4 fade-in-scroll">
            Why Choose <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Demo Fork</span>?
          </h2>
          <p className="text-center text-gray-600 mb-12 fade-in-scroll">Quality food, faster delivery, better experience</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 fade-in-scroll group cursor-pointer border-2 border-transparent hover:border-orange-200">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ChefHat className="w-8 h-8 text-orange-500 group-hover:rotate-12 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Chefs</h3>
              <p className="text-gray-600">Prepared by experienced chefs with authentic recipes and premium ingredients</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 fade-in-scroll stagger-1 group cursor-pointer border-2 border-transparent hover:border-orange-200">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-orange-500 group-hover:rotate-12 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Hot and fresh food delivered to your doorstep within 30 minutes</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 fade-in-scroll stagger-2 group cursor-pointer border-2 border-transparent hover:border-orange-200">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-orange-500 group-hover:rotate-12 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">Always available to take your orders and answer your questions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-orange-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-4 sm:mb-6 fade-in-scroll">
            <div className="p-4 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full animate-float">
              <Instagram className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 fade-in-scroll">
            Follow Our <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Journey</span>
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 fade-in-scroll">
            @xxx
          </p>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-8 sm:p-12 max-w-2xl mx-auto border-2 border-dashed border-gray-300 fade-in-scroll">
            <div className="text-gray-400">
              <Instagram className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 opacity-30" />
              <p className="text-lg sm:text-xl font-medium text-gray-500">
                Instagram Feed Coming Soon
              </p>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                This is a demo site - Stay tuned for delicious updates!
              </p>
            </div>
          </div>

          <p className="mt-6 sm:mt-8 text-gray-500 text-xs sm:text-sm fade-in-scroll">
            📸 Behind-the-scenes • 🍽️ Daily specials • ⭐ Customer favorites
          </p>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-8 sm:py-12 px-4 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-3 sm:mb-4">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            Have questions? We&apos;d love to hear from you!
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
            <a 
              href="tel:9108695696"
              className="bg-white rounded-xl p-4 hover:shadow-2xl transition-all hover:scale-110 border border-orange-200 hover:border-orange-500 transform hover:-translate-y-2 duration-300 group"
            >
              <Phone className="w-8 h-8 mx-auto mb-2 text-orange-500 group-hover:animate-float" />
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Call Us</h3>
              <p className="text-gray-600 text-xs">9108695696</p>
            </a>

            <a 
              href="mailto:xxx@xxx.com"
              className="bg-white rounded-xl p-4 hover:shadow-2xl transition-all hover:scale-110 border border-orange-200 hover:border-orange-500 transform hover:-translate-y-2 duration-300 group"
            >
              <Mail className="w-8 h-8 mx-auto mb-2 text-orange-500 group-hover:animate-float" />
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Email Us</h3>
              <p className="text-gray-600 text-xs">xxx@xxx.com</p>
            </a>

            <a 
              href="https://instagram.com/xxx"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-4 hover:shadow-2xl transition-all hover:scale-110 border border-orange-200 hover:border-pink-500 transform hover:-translate-y-2 duration-300 group"
            >
              <Instagram className="w-8 h-8 mx-auto mb-2 text-orange-500 group-hover:text-pink-500 group-hover:animate-float transition-colors" />
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Instagram</h3>
              <p className="text-gray-600 text-xs">@xxx</p>
            </a>
          </div>

          <a
            href="https://wa.me/919108695696"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold text-base hover:shadow-2xl transition-all hover:scale-110 animate-pulse-slow hover:animate-none"
          >
            <MessageCircle size={20} className="animate-float" />
            Contact Us Now
          </a>
        </div>
      </section>

      {/* Stats Section - Animated */}
      <section className="stats-section py-16 sm:py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-red-500 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-yellow-500 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-12 fade-in-scroll">
            Why We&apos;re <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Different</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center transform hover:scale-110 transition-all duration-500 fade-in-scroll cursor-pointer group">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gray-800 rounded-full p-6 border-2 border-orange-500">
                  <p className="text-5xl sm:text-6xl font-bold text-white">{stats.items}+</p>
                </div>
              </div>
              <p className="text-lg sm:text-xl text-gray-300 font-semibold">Menu Items</p>
              <p className="text-sm text-gray-500 mt-2">Delicious options</p>
            </div>
            
            <div className="text-center transform hover:scale-110 transition-all duration-500 fade-in-scroll stagger-1 cursor-pointer group">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gray-800 rounded-full p-6 border-2 border-yellow-500">
                  <p className="text-5xl sm:text-6xl font-bold text-white">{stats.rating}⭐</p>
                </div>
              </div>
              <p className="text-lg sm:text-xl text-gray-300 font-semibold">Average Rating</p>
              <p className="text-sm text-gray-500 mt-2">Customer satisfaction</p>
            </div>
            
            <div className="text-center transform hover:scale-110 transition-all duration-500 fade-in-scroll stagger-2 cursor-pointer group">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gray-800 rounded-full p-6 border-2 border-green-500">
                  <p className="text-5xl sm:text-6xl font-bold text-white">{stats.time}<span className="text-3xl">min</span></p>
                </div>
              </div>
              <p className="text-lg sm:text-xl text-gray-300 font-semibold">Delivery Time</p>
              <p className="text-sm text-gray-500 mt-2">Lightning fast</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-3 sm:mb-4">
            <ChefHat className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-2">Demo Fork</h3>
          <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">Cloud Kitchen • xxx</p>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-6 sm:mb-8 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
              <span>10 AM - 10 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
              <span>9108695696</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
              <span>xxx</span>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4 sm:pt-6 text-gray-500 text-xs sm:text-sm">
            <p>© 2024 Demo Fork. Demo site for presentation purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
