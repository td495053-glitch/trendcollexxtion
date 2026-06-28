import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  DollarSign, 
  LogOut,
  Menu,
  X,
  Search,
  MoreVertical,
  CheckCircle,
  Clock,
  Truck,
  Settings
} from 'lucide-react';
import { products } from '../data/products';
import { motion, AnimatePresence } from 'motion/react';

const mockOrders = [
  { id: 'ORD-7392', customer: 'Sarah Jenkins', date: '2026-06-27', total: 450, status: 'Processing', method: 'COD' },
  { id: 'ORD-7391', customer: 'Michael Chen', date: '2026-06-26', total: 890, status: 'Shipped', method: 'Online' },
  { id: 'ORD-7390', customer: 'Emma Watson', date: '2026-06-26', total: 150, status: 'Delivered', method: 'COD' },
  { id: 'ORD-7389', customer: 'James Smith', date: '2026-06-25', total: 1100, status: 'Processing', method: 'Online' },
  { id: 'ORD-7388', customer: 'Olivia Davis', date: '2026-06-25', total: 320, status: 'Delivered', method: 'COD' },
];

const mockCustomers = [
  { id: 'CUS-01', name: 'Sarah Jenkins', email: 'sarah.j@example.com', orders: 3, spent: 1250 },
  { id: 'CUS-02', name: 'Michael Chen', email: 'm.chen@example.com', orders: 1, spent: 890 },
  { id: 'CUS-03', name: 'Emma Watson', email: 'emma.w@example.com', orders: 5, spent: 3450 },
  { id: 'CUS-04', name: 'James Smith', email: 'james.s@example.com', orders: 2, spent: 1420 },
];

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('adminAuth') === 'true');
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Settings state
  const [savedPassword, setSavedPassword] = useState(() => localStorage.getItem('adminPassword') || 'admin123');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [settingsMessage, setSettingsMessage] = useState({ text: '', type: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId === 'td495053' && password === savedPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setError('');
    } else {
      setError('Invalid ID or Password. (Default pass: admin123)');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-rose-100"
        >
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="flex items-center justify-center mb-4">
              <img src="/logo.jpg" alt="TRENDCOLLEXXTION" className="h-12 w-auto object-contain rounded-md" />
              <span className="ml-2 font-serif text-3xl font-bold tracking-tighter text-rose-600">
                trend<span className="text-gray-900">collexxtion</span>
              </span>
            </div>
            <h2 className="text-lg font-medium text-gray-600">Admin Authentication</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Admin ID</label>
              <input 
                type="text" 
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter Admin ID"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter Password"
              />
              {error && <p className="text-rose-500 text-sm mt-2 text-center">{error}</p>}
            </div>
            <button 
              type="submit"
              className="w-full py-3 px-4 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition-colors shadow-md hover:shadow-rose-500/30 mt-2"
            >
              Access Dashboard
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-rose-600 transition-colors">
              &larr; Return to Store
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Revenue', value: '$24,500', icon: DollarSign, trend: '+12%', color: 'bg-green-100 text-green-600' },
    { label: 'Active Orders', value: '34', icon: ShoppingBag, trend: '+5%', color: 'bg-blue-100 text-blue-600' },
    { label: 'Total Products', value: products.length.toString(), icon: Package, trend: '0%', color: 'bg-purple-100 text-purple-600' },
    { label: 'Total Customers', value: '1,240', icon: Users, trend: '+18%', color: 'bg-rose-100 text-rose-600' },
  ];

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Processing': return <Clock className="w-4 h-4 text-amber-500 mr-2" />;
      case 'Shipped': return <Truck className="w-4 h-4 text-blue-500 mr-2" />;
      case 'Delivered': return <CheckCircle className="w-4 h-4 text-green-500 mr-2" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Processing': return 'bg-amber-100 text-amber-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Delivered': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className={`text-xs mt-2 ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-gray-500'}`}>
                  {stat.trend} from last month
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
            <button onClick={() => setActiveTab('orders')} className="text-sm text-rose-600 hover:text-rose-700 font-medium transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg rounded-bl-lg">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-tr-lg rounded-br-lg text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.slice(0, 4).map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4 font-medium text-gray-900">{order.id}</td>
                    <td className="px-4 py-4">{order.customer}</td>
                    <td className="px-4 py-4">{order.date}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right font-medium text-gray-900">₹{order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Top Products</h3>
          <div className="space-y-4">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
                <div className="text-sm font-bold text-gray-900">₹{product.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-lg font-bold text-gray-900">All Orders</h3>
        <div className="relative w-full sm:w-auto">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg rounded-bl-lg">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3 rounded-tr-lg rounded-br-lg text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-4 font-medium text-gray-900">{order.id}</td>
                <td className="px-4 py-4">{order.customer}</td>
                <td className="px-4 py-4">{order.date}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${order.method === 'COD' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                    {order.method}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-4 font-medium text-gray-900">₹{order.total.toFixed(2)}</td>
                <td className="px-4 py-4 text-right">
                  <button className="text-gray-400 hover:text-rose-600 transition-colors p-1 rounded hover:bg-rose-50">
                    <MoreVertical className="w-5 h-5 ml-auto" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-lg font-bold text-gray-900">Products Catalog</h3>
        <button className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors shadow-sm">
          Add New Product
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all group">
            <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900 line-clamp-1" title={product.name}>{product.name}</h4>
                <span className="font-bold text-gray-900">₹{product.price}</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">{product.category}</p>
              <div className="flex gap-2">
                <button className="flex-1 border border-gray-200 text-gray-600 py-1.5 rounded-md text-xs font-medium hover:bg-gray-50 transition-colors">Edit</button>
                <button className="flex-1 border border-red-100 text-red-600 bg-red-50 py-1.5 rounded-md text-xs font-medium hover:bg-red-100 transition-colors">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-in fade-in duration-500">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Customer Base</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg rounded-bl-lg">Customer ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email Address</th>
              <th className="px-4 py-3 text-center">Total Orders</th>
              <th className="px-4 py-3 rounded-tr-lg rounded-br-lg text-right">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map((customer) => (
              <tr key={customer.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-4 font-medium text-gray-900">{customer.id}</td>
                <td className="px-4 py-4 font-medium text-gray-900">{customer.name}</td>
                <td className="px-4 py-4 text-gray-500">{customer.email}</td>
                <td className="px-4 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-700 font-medium text-xs">
                    {customer.orders}
                  </span>
                </td>
                <td className="px-4 py-4 text-right font-bold text-green-600">₹{customer.spent.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setSettingsMessage({ text: 'Passwords do not match.', type: 'error' });
      return;
    }
    if (newPassword.length < 6) {
      setSettingsMessage({ text: 'Password must be at least 6 characters.', type: 'error' });
      return;
    }
    
    setSavedPassword(newPassword);
    localStorage.setItem('adminPassword', newPassword);
    setSettingsMessage({ text: 'Password updated successfully.', type: 'success' });
    setNewPassword('');
    setConfirmPassword('');
    
    setTimeout(() => setSettingsMessage({ text: '', type: '' }), 3000);
  };

  const renderSettings = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-in fade-in duration-500 max-w-2xl">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
        <Settings className="w-5 h-5 mr-2" />
        Admin Settings
      </h3>
      
      <div className="border-t border-gray-100 pt-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Change Password</h4>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter new password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
              placeholder="Confirm new password"
              required
            />
          </div>
          
          {settingsMessage.text && (
            <div className={`p-3 rounded-lg text-sm ${settingsMessage.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {settingsMessage.text}
            </div>
          )}
          
          <button 
            type="submit"
            className="w-full sm:w-auto py-3 px-6 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors shadow-sm"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-10">
        <div className="p-6">
          <Link to="/" className="flex flex-col mb-8">
            <div className="flex items-center mb-1">
              <img src="/logo.jpg" alt="TRENDCOLLEXXTION" className="h-8 w-auto object-contain rounded-md" />
              <span className="ml-2 font-serif text-xl font-bold tracking-tighter text-rose-600">
                trend<span className="text-gray-900">collexxtion</span>
              </span>
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Admin Panel</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-rose-50 text-rose-600 font-medium' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-rose-600' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5 text-gray-400" />
            <span>Logout & Return</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-20 flex items-center justify-between px-4">
        <div className="flex items-center">
          <img src="/logo.jpg" alt="TC" className="h-6 w-auto object-contain rounded-sm mr-2" />
          <span className="font-serif text-lg font-bold tracking-tighter text-rose-600 flex items-center">
            trend<span className="text-gray-900">collexxtion</span>
            <span className="text-[10px] ml-2 text-gray-400 uppercase font-sans font-bold bg-gray-100 px-2 py-0.5 rounded">Admin</span>
          </span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-500 hover:text-gray-900 focus:outline-none"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed inset-x-0 top-16 z-10 bg-white border-b border-gray-200 shadow-lg overflow-hidden"
          >
            <nav className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-4 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-rose-50 text-rose-600 font-medium' 
                        : 'text-gray-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-base">{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-4 mt-2 border-t border-gray-100">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-4 text-gray-600 hover:bg-gray-50 rounded-xl"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-base">Logout & Return</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen">
        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">{activeTab}</h1>
            <p className="text-gray-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
          </div>

          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'customers' && renderCustomers()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </main>
    </div>
  );
};
