import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-rose-50"
    >
      <Link to={`/product/${product.id}`} className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-semibold text-rose-600 uppercase tracking-wider">
          {product.category}
        </div>
      </Link>
      
      <div className="flex flex-col flex-1 p-5">
        <Link to={`/product/${product.id}`} className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-rose-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-4">{product.description}</p>
        </Link>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="flex items-center justify-center p-2 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
