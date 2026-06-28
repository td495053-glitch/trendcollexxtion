import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';

export const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          cart,
          total: cartTotal,
          paymentMethod,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        clearCart();
      } else {
        alert("There was an issue processing your order. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("There was an issue processing your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0 && !isSuccess) {
    navigate('/cart');
    return null;
  }

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-gray-50">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg w-full border border-gray-100"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for shopping with trendcollextion, {formData.firstName}. Your payment was successful and your beautiful jewellery is being prepared for shipment.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 px-8 bg-gray-900 text-white rounded-full font-medium hover:bg-black transition-colors"
          >
            Return to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h1 className="text-2xl font-serif font-bold text-gray-900 mb-8">Checkout</h1>
              
              <form onSubmit={handleSubmit} id="checkout-form">
                <div className="space-y-8">
                  {/* Contact Info */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-100">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Shipping Info */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-100">Shipping Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
                        <input required type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal Code / PIN Code</label>
                        <input required type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <select required name="country" value={formData.country} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all">
                          <option value="India">India</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-100 pt-6 mb-6 space-y-3">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Payment Method</span>
                </div>
                <div className="space-y-3 mb-6">
                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-rose-300 bg-rose-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                    <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300" />
                    <div className="ml-3">
                      <span className="block text-sm font-medium text-gray-900">Cash on Delivery (COD)</span>
                      <span className="block text-xs text-gray-500">Pay when your order arrives</span>
                    </div>
                  </label>
                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-rose-300 bg-rose-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                    <input type="radio" name="paymentMethod" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300" />
                    <div className="ml-3">
                      <span className="block text-sm font-medium text-gray-900">Google Pay / UPI</span>
                      <span className="block text-xs text-gray-500">Scan QR code to pay</span>
                    </div>
                  </label>
                </div>
                
                {paymentMethod === 'upi' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-6 p-4 bg-white rounded-xl border border-gray-200 text-center"
                  >
                    <p className="text-sm font-medium text-gray-900 mb-2">Scan & Pay with any UPI App</p>
                    <div className="flex justify-center mb-3">
                      {/* Using the standard UPI QR code generation format with the provided UPI ID */}
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=9144691469@okbizaxis%26pn=Trend%20Collection%26cu=INR`} 
                        alt="UPI QR Code" 
                        className="w-48 h-48 border border-gray-100 p-2 rounded-lg"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mb-1">UPI ID: 9144691469@okbizaxis</p>
                    <div className="flex justify-center items-center space-x-2 mt-3 opacity-70">
                      <span className="text-[10px] font-bold text-gray-500">GPay</span>
                      <span className="text-[10px] font-bold text-gray-500">• PhonePe</span>
                      <span className="text-[10px] font-bold text-gray-500">• Paytm</span>
                      <span className="text-[10px] font-bold text-gray-500">• BHIM</span>
                    </div>
                  </motion.div>
                )}

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center py-4 px-6 rounded-xl shadow-md text-base font-medium text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-70 transition-colors"
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : null}
                  {isProcessing ? 'Processing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
