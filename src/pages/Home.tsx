import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { products, categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-rose-50">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=2000" 
            alt="Jewellery Collection" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-100/90 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-rose-200 text-rose-800 text-sm font-semibold tracking-wider mb-6">
              NEW COLLECTION 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-tight mb-6">
              Embrace Your <br />
              <span className="text-rose-600 italic">Radiance</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-md">
              Discover our vibrant, trend-setting pieces designed to make you shine in every moment.
            </p>
            <a 
              href="#products"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-rose-600 border border-transparent rounded-full hover:bg-rose-700 transition-colors shadow-lg hover:shadow-rose-500/30"
            >
              Shop the Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Shop by Category</h2>
            <div className="w-24 h-1 bg-rose-200 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, idx) => {
              // Just finding a representative image for the category
              const repProduct = products.find(p => p.category === category);
              return (
                <motion.a
                  href="#products"
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative rounded-full aspect-square overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer shadow-md hover:shadow-xl transition-all"
                >
                  <img 
                    src={repProduct?.image} 
                    alt={category} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                  <span className="relative z-10 text-xl font-bold text-white tracking-widest uppercase bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                    {category}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Trending Now</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Our most coveted pieces, curated just for you. Add a touch of vibrant elegance to your everyday look.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (idx % 4) * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
