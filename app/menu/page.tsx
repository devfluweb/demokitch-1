'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ChefHat, ChevronDown, ChevronUp, Filter, ShoppingCart, MessageCircle, Plus, Minus, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MenuPage() {
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Keep all categories closed by default
    setExpandedCategories(new Set());
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        const quantities: Record<string, number> = {};
        let total = 0;
        cartItems.forEach((item: any) => {
          quantities[item.id] = item.quantity;
          total += item.quantity;
        });
        setItemQuantities(quantities);
        setCartCount(total);
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
    
    // Trigger fade-in animations on mount
    const timer = setTimeout(() => {
      const items = document.querySelectorAll('.menu-item');
      items.forEach((item, index) => {
        setTimeout(() => {
          setVisibleItems(prev => new Set([...prev, item.id]));
        }, index * 50);
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

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
  }, [expandedCategories]);

  const toggleCategory = (index: number) => {
    setExpandedCategories(prev => {
      const newSet = new Set<number>();
      // If clicking on already open category, close it. Otherwise, open only this one
      if (!prev.has(index)) {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const toggleItemExpand = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const updateQuantity = (itemId: string, change: number, itemData?: any) => {
    setItemQuantities(prev => {
      const current = prev[itemId] || 0;
      const newQty = Math.max(0, current + change);
      const newQuantities = { ...prev, [itemId]: newQty };
      
      // Update cart count
      const total = Object.values(newQuantities).reduce((sum, qty) => sum + qty, 0);
      setCartCount(total);
      
      // Save to localStorage
      if (itemData) {
        const savedCart = localStorage.getItem('cart');
        let cartItems = savedCart ? JSON.parse(savedCart) : [];
        
        const existingIndex = cartItems.findIndex((item: any) => item.id === itemId);
        
        if (newQty > 0) {
          if (existingIndex >= 0) {
            cartItems[existingIndex].quantity = newQty;
          } else {
            cartItems.push({
              id: itemId,
              name: itemData.name,
              price: parseInt(itemData.price.replace(/[^\d]/g, '')),
              quantity: newQty,
              image: itemData.image,
              isVeg: itemData.isVeg
            });
          }
        } else {
          if (existingIndex >= 0) {
            cartItems.splice(existingIndex, 1);
          }
        }
        
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }
      
      return newQuantities;
    });
  };
  const menuCategories = [
    {
      category: "Starters",
      items: [
        {
          name: "Paneer Tikka",
          description: "Marinated cottage cheese grilled to perfection with aromatic spices",
          price: "₹249",
          image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80",
          isVeg: true
        },
        {
          name: "Chicken Wings",
          description: "Crispy wings tossed in special BBQ sauce, served with ranch",
          price: "₹299",
          image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80",
          isVeg: false
        },
        {
          name: "Crispy Veg Spring Rolls",
          description: "Golden fried vegetable rolls with sweet chili dipping sauce",
          price: "₹189",
          image: "https://images.unsplash.com/photo-1545865347-c59561a516d0?w=400&q=80",
          isVeg: true
        },
        {
          name: "Fish Fingers",
          description: "Crispy breaded fish strips with tartar sauce",
          price: "₹279",
          image: "https://images.unsplash.com/photo-1580217593608-61931cefc821?w=400&q=80",
          isVeg: false
        }
      ]
    },
    {
      category: "Main Course",
      items: [
        {
          name: "Butter Chicken",
          description: "Tender chicken in rich, creamy tomato gravy with aromatic spices",
          price: "₹349",
          image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80",
          isVeg: false
        },
        {
          name: "Dal Makhani",
          description: "Black lentils slow-cooked overnight with butter, cream and spices",
          price: "₹229",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80",
          isVeg: true
        },
        {
          name: "Chicken Biryani",
          description: "Fragrant basmati rice layered with succulent chicken and spices",
          price: "₹329",
          image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80",
          isVeg: false
        },
        {
          name: "Paneer Butter Masala",
          description: "Soft cottage cheese cubes in rich, creamy tomato gravy",
          price: "₹279",
          image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80",
          isVeg: true
        },
        {
          name: "Mutton Rogan Josh",
          description: "Tender mutton cooked in aromatic Kashmiri spices and yogurt",
          price: "₹399",
          image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80",
          isVeg: false
        },
        {
          name: "Veg Fried Rice",
          description: "Wok-tossed rice with fresh vegetables and soy sauce",
          price: "₹199",
          image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80",
          isVeg: true
        }
      ]
    },
    {
      category: "Pizza & Pasta",
      items: [
        {
          name: "Margherita Pizza",
          description: "Classic pizza with fresh mozzarella, tomatoes and basil",
          price: "₹299",
          image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80",
          isVeg: true
        },
        {
          name: "Chicken Pepperoni Pizza",
          description: "Loaded with pepperoni, mozzarella and Italian herbs",
          price: "₹399",
          image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80",
          isVeg: false
        },
        {
          name: "Alfredo Pasta",
          description: "Creamy white sauce pasta with garlic, herbs and parmesan",
          price: "₹269",
          image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80",
          isVeg: true
        },
        {
          name: "Arrabiata Pasta",
          description: "Spicy tomato sauce pasta with garlic and red chili flakes",
          price: "₹249",
          image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80",
          isVeg: true
        }
      ]
    },
    {
      category: "Burgers & Sandwiches",
      items: [
        {
          name: "Classic Chicken Burger",
          description: "Juicy chicken patty with lettuce, tomato, cheese and special sauce",
          price: "₹229",
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
          isVeg: false
        },
        {
          name: "Veg Cheese Burger",
          description: "Crispy veg patty with melted cheese and fresh vegetables",
          price: "₹199",
          image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&q=80",
          isVeg: true
        },
        {
          name: "Grilled Chicken Sandwich",
          description: "Grilled chicken with mayo, lettuce and tomatoes",
          price: "₹189",
          image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80",
          isVeg: false
        }
      ]
    },
    {
      category: "Beverages",
      items: [
        {
          name: "Fresh Lime Soda",
          description: "Refreshing lime juice with soda and mint",
          price: "₹79",
          image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80",
          isVeg: true
        },
        {
          name: "Mango Lassi",
          description: "Creamy yogurt smoothie with fresh mango pulp",
          price: "₹99",
          image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&q=80",
          isVeg: true
        },
        {
          name: "Cold Coffee",
          description: "Chilled coffee with milk and vanilla ice cream",
          price: "₹129",
          image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&q=80",
          isVeg: true
        }
      ]
    },
    {
      category: "Desserts",
      items: [
        {
          name: "Gulab Jamun",
          description: "Soft milk dumplings soaked in sweet rose-flavored syrup",
          price: "₹99",
          image: "https://images.unsplash.com/photo-1544461595-1617e6f446be?w=400&q=80",
          isVeg: true
        },
        {
          name: "Chocolate Brownie",
          description: "Warm fudgy brownie topped with vanilla ice cream",
          price: "₹149",
          image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80",
          isVeg: true
        },
        {
          name: "Rasmalai",
          description: "Soft cheese patties in sweet, saffron-flavored milk",
          price: "₹129",
          image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
          isVeg: true
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <style jsx global>{`
        .fade-in-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .menu-item {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .category-header {
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #fff 0%, #fff5f0 100%);
        }
        
        .category-header:hover {
          background: linear-gradient(135deg, #fff5f0 0%, #ffe8d6 100%);
          transform: translateX(5px);
        }
        
        .category-header:active {
          transform: scale(0.98);
        }
        
        .veg-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 4px;
          box-shadow: 0 0 5px rgba(0,0,0,0.2);
        }
        
        @media (min-width: 640px) {
          .veg-indicator {
            width: 12px;
            height: 12px;
            margin-right: 6px;
          }
        }
        
        .veg {
          background: #22c55e;
        }
        
        .non-veg {
          background: #ef4444;
        }
        
        .floating-btn {
          position: fixed;
          bottom: 20px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
          z-index: 1000;
          cursor: pointer;
        }
        
        .floating-btn:hover {
          transform: scale(1.1) translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        }
        
        .floating-btn:active {
          transform: scale(0.95);
        }
        
        .whatsapp-btn {
          left: 20px;
          background: linear-gradient(135deg, #34D399 0%, #10B981 100%);
        }
        
        .cart-btn {
          right: 20px;
          background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
        }
        
        .cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          border: 2px solid white;
        }
        
        .pulse {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
          50% {
            box-shadow: 0 4px 20px rgba(249, 115, 22, 0.6);
          }
        }
      `}</style>

      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-red-500 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all transform hover:scale-110"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <ChefHat className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
              <h1 className="text-xl sm:text-3xl font-bold text-white tracking-wide">Demo Fork</h1>
            </div>
            
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Menu Hero */}
      <section className="py-6 sm:py-8 md:py-12 px-4 text-center fade-in-scroll fade-in-visible bg-gradient-to-b from-orange-50 to-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2 sm:mb-3">Our Menu</h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Explore our delicious dishes
        </p>
      </section>

      {/* Filter Buttons */}
      <section className="pb-8 px-4 fade-in-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-1 sm:gap-2 text-gray-700 text-xs sm:text-sm font-medium mr-2 sm:mr-4">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter:</span>
            </div>
            
            <button
              onClick={() => setFilter('all')}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-500'
              }`}
            >
              All Items
            </button>
            
            <button
              onClick={() => setFilter('veg')}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 sm:gap-2 ${
                filter === 'veg'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-500'
              }`}
            >
              <span className="veg-indicator veg"></span>
              <span className="hidden sm:inline">Veg Only</span>
              <span className="sm:hidden">Veg</span>
            </button>
            
            <button
              onClick={() => setFilter('nonveg')}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 sm:gap-2 ${
                filter === 'nonveg'
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-red-500'
              }`}
            >
              <span className="veg-indicator non-veg"></span>
              <span className="hidden sm:inline">Non-Veg Only</span>
              <span className="sm:hidden">Non-Veg</span>
            </button>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="pb-12 sm:pb-16 md:pb-20 px-4">
        <div className="max-w-7xl mx-auto">{menuCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-6 sm:mb-8 md:mb-12 fade-in-scroll">
              {/* Category Header - Clickable */}
              <button
                onClick={() => toggleCategory(categoryIndex)}
                className="category-header w-full flex items-center justify-between p-4 sm:p-5 md:p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all mb-4 sm:mb-6"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  {category.category}
                </h2>
                {expandedCategories.has(categoryIndex) ? (
                  <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500" />
                ) : (
                  <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500" />
                )}
              </button>
              
              {/* Category Items - Collapsible */}
              {expandedCategories.has(categoryIndex) && (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  {category.items.map((item, itemIndex) => {
                    const itemId = `item-${categoryIndex}-${itemIndex}`;
                    const quantity = itemQuantities[itemId] || 0;
                    const isExpanded = expandedItems.has(itemId);
                    
                    return (
                      <div 
                        key={itemIndex}
                        id={itemId}
                        className="menu-item bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-2 border-transparent hover:border-orange-300"
                        style={{ animationDelay: `${itemIndex * 0.05}s` }}
                      >
                        <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden group">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        <div className="p-3 sm:p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-1 mb-1">
                                <span className={`veg-indicator ${item.isVeg ? 'veg' : 'non-veg'}`}></span>
                                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                              </div>
                            </div>
                          </div>
                          
                          <p className={`text-xs sm:text-sm text-gray-600 mb-2 ${isExpanded ? '' : 'line-clamp-2'}`}>
                            {item.description}
                          </p>
                          
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-lg sm:text-xl font-bold text-orange-500">{item.price}</span>
                            
                            {quantity === 0 ? (
                              <button
                                onClick={() => updateQuantity(itemId, 1, item)}
                                className="text-xs sm:text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold transition-all transform hover:scale-105 shadow-md"
                              >
                                Add
                              </button>
                            ) : (
                              <div className="flex items-center gap-2 bg-orange-500 rounded-full shadow-md">
                                <button
                                  onClick={() => updateQuantity(itemId, -1, item)}
                                  className="p-1 sm:p-1.5 text-white hover:bg-orange-600 rounded-full transition-all"
                                >
                                  <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                                <span className="text-white font-bold text-sm sm:text-base min-w-[20px] text-center">{quantity}</span>
                                <button
                                  onClick={() => updateQuantity(itemId, 1, item)}
                                  className="p-1 sm:p-1.5 text-white hover:bg-orange-600 rounded-full transition-all"
                                >
                                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                          
                          <button
                            onClick={() => toggleItemExpand(itemId)}
                            className="w-full mt-2 text-xs text-orange-500 hover:text-orange-600 font-medium flex items-center justify-center gap-1 transition-all"
                          >
                            <Eye className="w-3 h-3" />
                            {isExpanded ? 'Show Less' : 'View More'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Demo Notice */}
      <section className="py-8 sm:py-12 px-4 bg-orange-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm sm:text-base md:text-lg text-gray-700">
            <span className="font-semibold">Note:</span> This is a demo menu for presentation purposes. 
            Actual menu items, prices, and availability may vary.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-gray-400">© 2024 Demo Fork. Demo site for presentation purposes.</p>
        </div>
      </footer>

      {/* Floating Buttons */}
      <a
        href="https://wa.me/919108695696"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp-btn"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

      <Link href="/cart">
        <button
          className={`floating-btn cart-btn ${cartCount > 0 ? 'pulse' : ''}`}
          title="View Cart"
        >
          <ShoppingCart className="w-7 h-7 text-white" />
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </button>
      </Link>
    </div>
  );
}
