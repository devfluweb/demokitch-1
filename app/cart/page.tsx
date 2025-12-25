'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, ShoppingBag, ArrowLeft, Trash2, Plus, Minus, Navigation, MessageCircle, CreditCard, Gift } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isVeg: boolean;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getLocation = () => {
    setIsLoadingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const coords = `Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`;
          const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
          
          // Add coordinates and map link to address
          const locationText = `\n\n📍 Current Location:\n${coords}\nMap: ${mapsLink}`;
          setAddress(prev => prev + locationText);
          setIsLoadingLocation(false);
          alert('Location added to address! You can edit if needed.');
        },
        (error) => {
          console.error('Geolocation error:', error);
          let errorMsg = 'Unable to get location. ';
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMsg += 'Please allow location access in your browser settings.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMsg += 'Location information unavailable.';
              break;
            case error.TIMEOUT:
              errorMsg += 'Location request timed out.';
              break;
            default:
              errorMsg += 'An unknown error occurred.';
          }
          
          alert(errorMsg);
          setIsLoadingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert('Geolocation is not supported by your browser. Please enter your address manually.');
      setIsLoadingLocation(false);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 499 ? 0 : 40;
  const total = subtotal + deliveryFee;
  const amountNeededForFreeDelivery = Math.max(0, 499 - subtotal);

  const generateWhatsAppMessage = () => {
    let message = `*New Order from Demo Fork*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${name}\n`;
    message += `Mobile: ${mobile}\n`;
    if (email) message += `Email: ${email}\n`;
    message += `Address: ${address}\n`;
    if (deliveryInstructions) message += `Instructions: ${deliveryInstructions}\n`;
    message += `\n*Order Items:*\n`;
    
    cartItems.forEach(item => {
      const vegIcon = item.isVeg ? '🟢' : '🔴';
      message += `${vegIcon} ${item.name} x ${item.quantity} - ₹${item.price * item.quantity}\n`;
    });
    
    message += `\n*Order Summary:*\n`;
    message += `Subtotal: ₹${subtotal}\n`;
    message += `Delivery: ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}\n`;
    message += `*Total: ₹${total}*\n`;
    
    return encodeURIComponent(message);
  };

  const generateUPILink = () => {
    const upiId = '9108695696@jupiteraxis';
    const amount = total;
    const note = `Order from Demo Fork`;
    return `upi://pay?pa=${upiId}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
  };

  const handleOrderNow = () => {
    if (!name || !address || !mobile) {
      alert('Please fill in all required fields (Name, Address, Mobile)');
      return;
    }
    
    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    
    const whatsappNumber = '919108695696';
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handlePayNow = () => {
    if (!name || !address || !mobile) {
      alert('Please fill in all required fields before payment');
      return;
    }
    
    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    
    const upiLink = generateUPILink();
    window.location.href = upiLink;
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/menu" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-8 transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Menu</span>
          </Link>
          
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some delicious items from our menu!</p>
            <Link 
              href="/menu"
              className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Link href="/menu" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-4 sm:mb-6 transition-colors px-2">
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Menu</span>
        </Link>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 px-2">Your Cart</h1>
        <p className="text-gray-600 mb-6 sm:mb-8 px-2">Review your order and complete checkout</p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Cart Items */}
          <div className="space-y-4">
            {/* Free Delivery Banner */}
            {subtotal < 499 && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Gift className="w-6 h-6" />
                  <span className="font-semibold">Almost there!</span>
                </div>
                <p className="text-sm">
                  Add items worth <span className="font-bold">₹{amountNeededForFreeDelivery}</span> more to get FREE delivery!
                </p>
                <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-white h-full rounded-full transition-all duration-500"
                    style={{ width: `${(subtotal / 499) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {subtotal >= 499 && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white shadow-lg">
                <div className="flex items-center gap-3">
                  <Gift className="w-6 h-6" />
                  <span className="font-semibold">🎉 You got FREE delivery!</span>
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
              
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-orange-400 transition-colors bg-gray-50">
                  <div className="relative w-28 h-28 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`w-4 h-4 rounded-sm border-2 ${item.isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center`}>
                            <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></span>
                          </span>
                          <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                        </div>
                        <p className="text-orange-600 font-bold text-lg">₹{item.price} each</p>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 bg-white rounded-xl p-2 shadow-md border-2 border-orange-200">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-9 h-9 flex items-center justify-center bg-orange-100 rounded-lg hover:bg-orange-500 hover:text-white transition-colors font-bold"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="w-12 text-center font-bold text-xl text-orange-600">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-9 h-9 flex items-center justify-center bg-orange-100 rounded-lg hover:bg-orange-500 hover:text-white transition-colors font-bold"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">=</span>
                        <span className="text-gray-900 font-bold text-xl">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Customer Details & Checkout */}
          <div className="space-y-6">
            {/* Customer Details Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your complete address"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                    required
                  />
                  <button
                    onClick={getLocation}
                    disabled={isLoadingLocation}
                    className="mt-2 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors disabled:opacity-50"
                  >
                    <Navigation size={16} />
                    {isLoadingLocation ? 'Getting location...' : 'Share My Location'}
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-700">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="10-digit mobile number"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Instructions <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <textarea
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    placeholder="Any special instructions for delivery..."
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border-2 border-orange-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-gray-700">
                  <span className="text-sm sm:text-base">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-bold text-lg">₹{subtotal}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-700">Delivery Fee</span>
                  {deliveryFee === 0 ? (
                    <div className="text-right">
                      <span className="font-bold text-lg text-green-600">FREE</span>
                      <p className="text-xs text-green-600">Saved ₹40!</p>
                    </div>
                  ) : (
                    <span className="font-bold text-lg text-gray-900">₹{deliveryFee}</span>
                  )}
                </div>
                
                <div className="border-t-2 border-orange-200 pt-4 flex justify-between items-center">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">Order Total</span>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">₹{total}</span>
                    {deliveryFee === 0 && (
                      <p className="text-xs text-green-600 font-medium">✓ Free delivery applied</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleOrderNow}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <MessageCircle size={20} />
                  Order via WhatsApp
                </button>

                <button
                  onClick={handlePayNow}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <CreditCard size={20} />
                  Pay Now (UPI)
                </button>
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> Some UPI apps may block direct payment links. If payment fails, please use WhatsApp order option or scan QR code after placing order.
                </p>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing an order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
