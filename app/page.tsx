'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChefHat, MapPin, Clock, Phone, Instagram, MessageCircle, Mail } from 'lucide-react';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <style jsx global>{`
        .fade-in-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .fade-in-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .stagger-1 {
          transition-delay: 0.1s;
        }
        
        .stagger-2 {
          transition-delay: 0.2s;
        }
        
        .stagger-3 {
          transition-delay: 0.3s;
        }
        
        .stagger-4 {
          transition-delay: 0.4s;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12 sm:py-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80"
            alt="Delicious food"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto w-full">
          <div className="flex justify-center mb-4 sm:mb-6">
            <ChefHat className="w-16 h-16 sm:w-20 sm:h-20 text-orange-500" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4 sm:mb-6 tracking-tight">
            Demo Fork
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-6 sm:mb-8 font-light">
            Cloud Kitchen Excellence
          </p>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Experience culinary perfection from our cloud kitchen. 
            Fresh ingredients, authentic flavors, delivered right to your doorstep.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
            <Link 
              href="/menu"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              View Menu
            </Link>
            
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-gray-700 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                <span>10 AM - 10 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                <span className="hidden sm:inline">+91 XXXXX XXXXX</span>
                <span className="sm:hidden">Call Us</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Our Specials Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-3 sm:mb-4 fade-in-scroll">
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
              className="inline-block border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold transition-all"
            >
              Explore Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-4 sm:mb-6 fade-in-scroll">
            <Instagram className="w-12 h-12 sm:w-16 sm:h-16 text-pink-500" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 fade-in-scroll">
            Follow Our Journey
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
              className="bg-white rounded-xl p-4 hover:shadow-lg transition-all hover:scale-105 border border-orange-200"
            >
              <Phone className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Call Us</h3>
              <p className="text-gray-600 text-xs">9108695696</p>
            </a>

            <a 
              href="mailto:xxx@xxx.com"
              className="bg-white rounded-xl p-4 hover:shadow-lg transition-all hover:scale-105 border border-orange-200"
            >
              <Mail className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Email Us</h3>
              <p className="text-gray-600 text-xs">xxx@xxx.com</p>
            </a>

            <a 
              href="https://instagram.com/xxx"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-4 hover:shadow-lg transition-all hover:scale-105 border border-orange-200"
            >
              <Instagram className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Instagram</h3>
              <p className="text-gray-600 text-xs">@xxx</p>
            </a>
          </div>

          <a
            href="https://wa.me/919108695696"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold text-base hover:shadow-xl transition-all hover:scale-105"
          >
            <MessageCircle size={20} />
            Contact Us Now
          </a>
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
