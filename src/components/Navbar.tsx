import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-rose-900 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium tracking-widest uppercase flex items-center justify-center space-x-2">
        <span>✨ PAN INDIA COD AVAILABLE [CASH ON DELIVERY] ✨</span>
      </div>
      <nav className="bg-white/90 backdrop-blur-md border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="/logo.jpg" alt="TRENDCOLLEXXTION" className="h-10 w-auto object-contain rounded-md" />
              <span className="ml-2 font-serif text-xl font-bold tracking-tighter text-rose-600 hidden sm:block">
                trend<span className="text-gray-900">collexxtion</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-600 hover:text-rose-600 px-3 py-2 text-sm font-medium transition-colors">Home</Link>
            <a href="/#categories" className="text-gray-600 hover:text-rose-600 px-3 py-2 text-sm font-medium transition-colors">Categories</a>
            <a href="/#products" className="text-gray-600 hover:text-rose-600 px-3 py-2 text-sm font-medium transition-colors">Shop</a>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-rose-600 transition-colors">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-rose-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-rose-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
              >
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-rose-100 bg-white overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50">Home</Link>
              <a href="/#categories" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50">Categories</a>
              <a href="/#products" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50">Shop</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </div>
  );
};
