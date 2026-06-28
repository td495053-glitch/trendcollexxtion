import React, { useState } from 'react';
import { Instagram, Mail, X, Truck, RotateCcw, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Footer = () => {
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-gray-50 border-t border-rose-100 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center">
                <img src="/logo.jpg" alt="TRENDCOLLEXXTION" className="h-12 w-auto object-contain rounded-md" />
                <span className="ml-2 font-serif text-2xl font-bold tracking-tighter text-rose-600">
                  trend<span className="text-gray-900">collexxtion</span>
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-500 max-w-sm">
                Discover our curated collection of trend-setting jewellery. Crafted with passion, designed for the bold.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="https://www.instagram.com/trendcollextion.in?igsh=MXQ2MWloZXMzOWRxMA==" target="_blank" rel="noopener noreferrer" className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all shadow-sm">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="mailto:666store.order@gmail.com" className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all shadow-sm">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-rose-600 transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-rose-600 transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-rose-600 transition-colors">Rings</a></li>
                <li><a href="#" className="hover:text-rose-600 transition-colors">Necklaces</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <button 
                    onClick={() => setIsFAQModalOpen(true)}
                    className="hover:text-rose-600 transition-colors text-left"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsShippingModalOpen(true)}
                    className="hover:text-rose-600 transition-colors text-left"
                  >
                    Shipping & Returns
                  </button>
                </li>
                <li><a href="https://wa.me/918695263153?text=Hii" target="_blank" rel="noopener noreferrer" className="hover:text-rose-600 transition-colors">Contact Us</a></li>
                <li><a href="/admin" className="hover:text-rose-600 transition-colors">Admin Panel</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} trendcollexxtion. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-xs text-gray-400">Privacy Policy</span>
              <span className="text-xs text-gray-400">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Shipping & Returns Poster Modal */}
      <AnimatePresence>
        {isShippingModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full relative border border-rose-100"
            >
              <button
                onClick={() => setIsShippingModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="bg-rose-50 p-8 text-center border-b border-rose-100">
                <div className="flex items-center justify-center mb-2">
                  <img src="/logo.jpg" alt="TRENDCOLLEXXTION" className="h-10 w-auto object-contain rounded-md" />
                  <span className="ml-2 font-serif text-3xl font-bold tracking-tighter text-rose-600">
                    trend<span className="text-gray-900">collexxtion</span>
                  </span>
                </div>
                <p className="text-sm font-medium tracking-widest text-gray-500 uppercase">Customer Promise</p>
              </div>
              
              <div className="p-8 space-y-8">
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4 text-rose-600 group-hover:scale-110 transition-transform shadow-sm">
                    <Truck className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Free Shipping</h3>
                  <p className="text-rose-600 font-medium text-lg uppercase tracking-wide">
                    Shipping without any extra cost
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Enjoy complimentary delivery on all your orders across India. No hidden fees.
                  </p>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent"></div>

                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4 text-rose-600 group-hover:scale-110 transition-transform shadow-sm">
                    <RotateCcw className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Returns</h3>
                  <p className="text-rose-600 font-medium text-lg uppercase tracking-wide">
                    Return available within 5 days
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Not completely in love? Return your unworn pieces within 5 days for a full refund.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                <button
                  onClick={() => setIsShippingModalOpen(false)}
                  className="w-full py-3 px-6 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition-colors shadow-md hover:shadow-rose-500/30"
                >
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FAQ Modal */}
      <AnimatePresence>
        {isFAQModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full relative border border-rose-100 max-h-[90vh] flex flex-col"
            >
              <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 mr-3">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
                </div>
                <button
                  onClick={() => setIsFAQModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-base font-semibold text-gray-900 mb-1">1. How long does delivery take?</h4>
                  <p className="text-gray-600 text-sm">Orders are usually delivered within 3–7 business days across India.</p>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900 mb-1">2. Do you offer Cash on Delivery (COD)?</h4>
                  <p className="text-gray-600 text-sm">Yes, COD is available on all locations.</p>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900 mb-1">3. What are the shipping charges?</h4>
                  <p className="text-gray-600 text-sm">We offer Free Shipping on all orders.</p>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900 mb-1">4. Can I return or exchange my order?</h4>
                  <p className="text-gray-600 text-sm">Yes, returns/exchanges are accepted within 5 days if the product is unused and in its original packaging.</p>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900 mb-1">5. How can I track my order?</h4>
                  <p className="text-gray-600 text-sm">Once your order is shipped, you'll receive a tracking link via Whatsapp.</p>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900 mb-1">6. Are your jewellery products anti-tarnish?</h4>
                  <p className="text-gray-600 text-sm">Our jewellery is made with premium-quality materials. To maintain its shine, keep it away from water, perfume, and chemicals.</p>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900 mb-1">7. What payment methods do you accept?</h4>
                  <p className="text-gray-600 text-sm">UPI, Net Banking, and Cash on Delivery.</p>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900 mb-1">8. How can I contact customer support?</h4>
                  <p className="text-gray-600 text-sm">You can reach us through our Contact Us page or email us at 666store.order@gmail.com & whatsapp 8695263153.</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                <button
                  onClick={() => setIsFAQModalOpen(false)}
                  className="w-full py-3 px-6 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition-colors shadow-md hover:shadow-rose-500/30"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
