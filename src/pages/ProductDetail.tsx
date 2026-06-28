import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button onClick={() => navigate('/')} className="text-rose-600 hover:underline">
          Return Home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-[80vh] bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm text-gray-500 hover:text-rose-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to shop
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Image Gallery (Single image for now) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-lg border border-gray-100"
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col pt-8 md:pt-0"
          >
            <div className="mb-2">
              <span className="text-xs font-bold tracking-widest text-rose-500 uppercase">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-medium text-gray-900 mb-6">
              ₹{product.price.toFixed(2)}
            </p>
            
            <div className="prose prose-sm text-gray-600 mb-8">
              <p>{product.description}</p>
              <ul className="mt-4 space-y-2">
                <li>✨ Premium quality materials</li>
                <li>🛡️ Secure checkout & payment</li>
                <li>🚚 Free worldwide shipping on orders over ₹200</li>
              </ul>
            </div>

            <div className="border-t border-gray-100 pt-8 mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-sm font-medium text-gray-700">Quantity</span>
                <div className="flex items-center border border-gray-200 rounded-full bg-gray-50">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-gray-500 hover:text-rose-600 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-gray-500 hover:text-rose-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center py-4 px-8 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all hover:shadow-lg hover:shadow-rose-500/30"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart - ₹{(product.price * quantity).toFixed(2)}
              </button>
            </div>
            
            {/* Delivery Info */}
            <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100">
              <h4 className="font-medium text-rose-900 mb-2">Estimated Delivery</h4>
              <p className="text-sm text-rose-700">Order now and get it delivered in 3-5 business days.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
