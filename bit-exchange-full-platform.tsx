import React, { useState, useEffect } from 'react';
import { Menu, X, TrendingUp, Lock, Zap, BarChart3, ArrowRight, ChevronRight, LogOut, User, Home, BookOpen, HelpCircle, Mail, Search, Heart, MessageCircle, Eye, EyeOff, ShoppingCart, DollarSign, PieChart } from 'lucide-react';

export default function BitExchangeApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Simulated user portfolio
  const [portfolio, setPortfolio] = useState({
    balance: 10000,
    assets: [
      { symbol: 'BTC', name: 'Bitcoin', amount: 0.5, price: 62850 },
      { symbol: 'ETH', name: 'Ethereum', amount: 5, price: 3420 },
      { symbol: 'SOL', name: 'Solana', amount: 20, price: 185.50 }
    ]
  });

  // Live market data
  const [prices, setPrices] = useState([
    { symbol: 'BTC', name: 'Bitcoin', price: 62850, change: 2.34, volume: '$28.5B', marketCap: '$1.23T' },
    { symbol: 'ETH', name: 'Ethereum', price: 3420, change: 1.87, volume: '$12.3B', marketCap: '$410B' },
    { symbol: 'SOL', name: 'Solana', price: 185.50, change: 3.21, volume: '$2.8B', marketCap: '$85B' },
    { symbol: 'XRP', name: 'Ripple', price: 2.85, change: -0.45, volume: '$1.9B', marketCap: '$155B' },
    { symbol: 'ADA', name: 'Cardano', price: 0.98, change: 1.12, volume: '$450M', marketCap: '$35B' },
    { symbol: 'DOT', name: 'Polkadot', price: 8.45, change: 2.56, volume: '$680M', marketCap: '$12.5B' }
  ]);

  // Update prices every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(p => ({
        ...p,
        price: p.price * (1 + (Math.random() - 0.5) * 0.01),
        change: p.change + (Math.random() - 0.5) * 0.5
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('bitexchange_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      const userData = {
        email: loginData.email,
        name: loginData.email.split('@')[0],
        id: Date.now()
      };
      localStorage.setItem('bitexchange_user', JSON.stringify(userData));
      setUser(userData);
      setLoginData({ email: '', password: '' });
      setShowLoginModal(false);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerData.password === registerData.confirmPassword && registerData.email && registerData.password) {
      const userData = {
        email: registerData.email,
        name: registerData.name,
        id: Date.now()
      };
      localStorage.setItem('bitexchange_user', JSON.stringify(userData));
      setUser(userData);
      setRegisterData({ name: '', email: '', password: '', confirmPassword: '' });
      setShowLoginModal(false);
      setIsRegistering(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bitexchange_user');
    setUser(null);
    setCurrentPage('home');
  };

  // Render different pages
  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage prices={prices} />;
      case 'markets':
        return <MarketsPage prices={prices} user={user} />;
      case 'dashboard':
        return user ? <DashboardPage user={user} portfolio={portfolio} prices={prices} /> : <HomePage prices={prices} />;
      case 'trade':
        return user ? <TradePage prices={prices} portfolio={portfolio} setPortfolio={setPortfolio} /> : <HomePage prices={prices} />;
      case 'learn':
        return <LearnPage />;
      case 'blog':
        return <BlogPage />;
      case 'faq':
        return <FAQPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage prices={prices} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="flex items-center space-x-2 hover:opacity-80 transition">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">₿</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Bit Exchange</span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => setCurrentPage('markets')} className="text-slate-400 hover:text-white transition">Markets</button>
              <button onClick={() => setCurrentPage('learn')} className="text-slate-400 hover:text-white transition">Learn</button>
              <button onClick={() => setCurrentPage('blog')} className="text-slate-400 hover:text-white transition">Blog</button>
              <button onClick={() => setCurrentPage('about')} className="text-slate-400 hover:text-white transition">About</button>
              
              {user ? (
                <div className="flex items-center gap-4">
                  <button onClick={() => setCurrentPage('dashboard')} className="text-slate-400 hover:text-white transition">Dashboard</button>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50">
                    <User size={16} />
                    <span className="text-sm">{user.name}</span>
                  </div>
                  <button onClick={handleLogout} className="px-4 py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500/10 transition">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <button onClick={() => { setShowLoginModal(true); setIsRegistering(false); }} className="px-4 py-2 rounded-lg border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 transition">
                    Sign In
                  </button>
                  <button onClick={() => { setShowLoginModal(true); setIsRegistering(true); }} className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/50 transition font-semibold">
                    Get Started
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <button onClick={() => { setCurrentPage('markets'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-slate-400 hover:text-white">Markets</button>
              <button onClick={() => { setCurrentPage('learn'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-slate-400 hover:text-white">Learn</button>
              <button onClick={() => { setCurrentPage('blog'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-slate-400 hover:text-white">Blog</button>
              <button onClick={() => { setCurrentPage('about'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-slate-400 hover:text-white">About</button>
              {user && <button onClick={() => { setCurrentPage('dashboard'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-slate-400 hover:text-white">Dashboard</button>}
              {!user && <button onClick={() => { setShowLoginModal(true); setIsRegistering(false); setIsMenuOpen(false); }} className="block w-full px-4 py-2 border border-cyan-500 text-cyan-400">Sign In</button>}
              {!user && <button onClick={() => { setShowLoginModal(true); setIsRegistering(true); setIsMenuOpen(false); }} className="block w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600">Get Started</button>}
            </div>
          )}
        </div>
      </nav>

      {/* Login/Register Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">{isRegistering ? 'Create Account' : 'Sign In'}</h2>
            
            {isRegistering ? (
              <form onSubmit={handleRegister} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-500 outline-none text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-500 outline-none text-white"
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-500 outline-none text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-500 outline-none text-white"
                />
                <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition">
                  Create Account
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-500 outline-none text-white"
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-500 outline-none text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition">
                  Sign In
                </button>
              </form>
            )}

            <div className="mt-6 text-center text-slate-400 text-sm">
              {isRegistering ? (
                <>
                  Already have an account? <button onClick={() => setIsRegistering(false)} className="text-cyan-400 hover:text-cyan-300">Sign In</button>
                </>
              ) : (
                <>
                  Don't have an account? <button onClick={() => setIsRegistering(true)} className="text-cyan-400 hover:text-cyan-300">Create one</button>
                </>
              )}
            </div>

            <button onClick={() => setShowLoginModal(false)} className="mt-6 w-full px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-600 transition">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative pt-20">
        {renderPage()}
      </div>

      {/* Footer */}
      <footer className="relative border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">₿</span>
                </div>
                <span className="font-bold">Bit Exchange</span>
              </div>
              <p className="text-slate-400 text-sm">The modern platform for digital asset trading.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><button onClick={() => setCurrentPage('markets')} className="hover:text-white transition">Markets</button></li>
                <li><button onClick={() => setCurrentPage('dashboard')} className="hover:text-white transition">Dashboard</button></li>
                <li><button onClick={() => setCurrentPage('trade')} className="hover:text-white transition">Trading</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><button onClick={() => setCurrentPage('learn')} className="hover:text-white transition">Learning</button></li>
                <li><button onClick={() => setCurrentPage('blog')} className="hover:text-white transition">Blog</button></li>
                <li><button onClick={() => setCurrentPage('faq')} className="hover:text-white transition">FAQ</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition">About</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white transition">Contact</button></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
            <p>&copy; 2024 Bit Exchange. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// HOME PAGE
function HomePage({ prices }) {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5">
                <span className="text-cyan-400 text-sm font-semibold">Trade Smarter, Not Harder</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Trade Digital Assets
                </span>
                <br />
                <span className="text-white">with Confidence</span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
                Experience the future of trading with our advanced platform. Low fees, instant settlements, and security you can trust.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/50 transition font-semibold flex items-center justify-center gap-2 group">
                Start Trading
                <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
              </button>
              <button className="px-8 py-4 rounded-lg border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-white transition font-semibold">
                View Demo
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div><div className="text-2xl font-bold">$2.3B+</div><div className="text-sm text-slate-400">Trading Volume</div></div>
              <div className="w-px h-8 bg-slate-700"></div>
              <div><div className="text-2xl font-bold">50K+</div><div className="text-sm text-slate-400">Active Traders</div></div>
              <div className="w-px h-8 bg-slate-700"></div>
              <div><div className="text-2xl font-bold">99.9%</div><div className="text-sm text-slate-400">Uptime</div></div>
            </div>
          </div>

          <div className="relative h-96 md:h-full min-h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl backdrop-blur-sm border border-cyan-500/30 p-6 flex flex-col">
              <div className="text-sm text-slate-400 mb-4">Top Cryptocurrencies</div>
              <div className="flex-1 space-y-3">
                {prices.slice(0, 4).map((price, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-xs font-bold">{price.symbol[0]}</div>
                      <div>
                        <div className="font-semibold text-sm">{price.symbol}</div>
                        <div className="text-xs text-slate-400">{price.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${price.price.toFixed(2)}</div>
                      <div className={`text-xs font-semibold ${price.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {price.change > 0 ? '+' : ''}{price.change.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Trade with Bit Exchange?</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Everything you need to trade like a pro</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Zap size={32} />, title: 'Lightning Fast', desc: 'Execute trades in milliseconds with our ultra-low latency infrastructure.' },
            { icon: <Lock size={32} />, title: 'Bank-Grade Security', desc: 'Military-grade encryption and cold storage for maximum protection.' },
            { icon: <BarChart3 size={32} />, title: 'Advanced Analytics', desc: 'Professional-grade charting tools and real-time analysis.' },
            { icon: <TrendingUp size={32} />, title: '0.1% Trading Fees', desc: 'Lowest fees in the industry with volume-based discounts.' },
            { icon: <ChevronRight size={32} />, title: '24/7 Support', desc: 'Expert support team available round the clock.' },
            { icon: <Lock size={32} />, title: 'Flexible APIs', desc: 'Integrate with our powerful API for algorithmic trading.' }
          ].map((feature, idx) => (
            <div key={idx} className="group p-8 rounded-xl border border-slate-700 bg-slate-800/30 hover:border-cyan-500/50 hover:bg-slate-800/60 transition cursor-pointer">
              <div className="text-cyan-400 mb-4 group-hover:text-cyan-300 transition">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400 group-hover:text-slate-300 transition">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// MARKETS PAGE
function MarketsPage({ prices, user }) {
  const [selectedAsset, setSelectedAsset] = useState(prices[0]);
  const [sortBy, setSortBy] = useState('marketCap');

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Markets</h1>
        <p className="text-slate-400">Real-time cryptocurrency prices and market data</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6 mb-6">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold">{selectedAsset.name}</h2>
                <p className="text-slate-400">{selectedAsset.symbol}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">${selectedAsset.price.toFixed(2)}</div>
                <div className={`text-lg font-semibold ${selectedAsset.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedAsset.change > 0 ? '+' : ''}{selectedAsset.change.toFixed(2)}%
                </div>
              </div>
            </div>
            <div className="h-32 bg-gradient-to-t from-cyan-500/10 to-transparent rounded-lg border border-cyan-500/20 mb-4"></div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Market Cap</span>
                <div className="font-bold text-lg">{selectedAsset.marketCap}</div>
              </div>
              <div>
                <span className="text-slate-400">Volume</span>
                <div className="font-bold text-lg">{selectedAsset.volume}</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
            <h3 className="text-xl font-bold mb-4">All Markets</h3>
            <div className="space-y-2">
              {prices.map((price, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAsset(price)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border transition ${
                    selectedAsset.symbol === price.symbol
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-slate-700 bg-slate-700/30 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold">{price.symbol[0]}</div>
                    <div className="text-left">
                      <div className="font-semibold">{price.symbol}</div>
                      <div className="text-xs text-slate-400">{price.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${price.price.toFixed(2)}</div>
                    <div className={`text-sm font-semibold ${price.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {price.change > 0 ? '+' : ''}{price.change.toFixed(2)}%
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-4">Market Summary</h3>
            <div className="space-y-4">
              <div>
                <div className="text-slate-400 text-sm mb-2">Total Market Cap</div>
                <div className="text-2xl font-bold">$2.8T</div>
              </div>
              <div className="border-t border-slate-700 pt-4">
                <div className="text-slate-400 text-sm mb-2">24h Volume</div>
                <div className="text-2xl font-bold">$89B</div>
              </div>
              <div className="border-t border-slate-700 pt-4">
                <div className="text-slate-400 text-sm mb-2">BTC Dominance</div>
                <div className="flex items-center">
                  <div className="text-2xl font-bold mr-2">42%</div>
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{width: '42%'}}></div>
                  </div>
                </div>
              </div>
              {user && (
                <button className="w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition">
                  Start Trading
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// DASHBOARD PAGE
function DashboardPage({ user, portfolio, prices }) {
  const totalValue = portfolio.assets.reduce((sum, asset) => {
    const price = prices.find(p => p.symbol === asset.symbol)?.price || asset.price;
    return sum + (asset.amount * price);
  }, portfolio.balance);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-400">Welcome back, {user.name}! Here's your portfolio overview</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
          <div className="text-slate-400 text-sm mb-2">Total Balance</div>
          <div className="text-3xl font-bold mb-2">${totalValue.toFixed(2)}</div>
          <div className="text-green-400 font-semibold">↑ 12.5% this month</div>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
          <div className="text-slate-400 text-sm mb-2">Available Balance</div>
          <div className="text-3xl font-bold">${portfolio.balance.toFixed(2)}</div>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
          <div className="text-slate-400 text-sm mb-2">Active Assets</div>
          <div className="text-3xl font-bold">{portfolio.assets.length}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Portfolio Chart</h2>
            <div className="h-64 bg-gradient-to-t from-cyan-500/10 to-transparent rounded-lg border border-cyan-500/20 flex items-end justify-around px-4 py-8">
              {[40, 65, 45, 70, 50, 80, 55].map((height, idx) => (
                <div key={idx} className="flex-1 bg-gradient-to-t from-cyan-500/50 to-cyan-400 rounded-t mx-1" style={{height: `${height}%`}}></div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
            <h2 className="text-2xl font-bold mb-4">Holdings</h2>
            <div className="space-y-4">
              {portfolio.assets.map((asset, idx) => {
                const currentPrice = prices.find(p => p.symbol === asset.symbol)?.price || asset.price;
                const value = asset.amount * currentPrice;
                const percentage = (value / totalValue) * 100;
                return (
                  <div key={idx} className="p-4 rounded-lg bg-slate-700/30 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-sm">{asset.symbol[0]}</div>
                        <div>
                          <div className="font-semibold">{asset.symbol}</div>
                          <div className="text-sm text-slate-400">{asset.amount} coins</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${value.toFixed(2)}</div>
                        <div className="text-sm text-slate-400">${currentPrice.toFixed(2)} each</div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{width: `${percentage}%`}}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition flex items-center justify-center gap-2">
                <ShoppingCart size={20} /> Buy Crypto
              </button>
              <button className="w-full py-3 rounded-lg border border-slate-700 hover:border-cyan-500 transition flex items-center justify-center gap-2">
                <DollarSign size={20} /> Withdraw
              </button>
              <button className="w-full py-3 rounded-lg border border-slate-700 hover:border-cyan-500 transition flex items-center justify-center gap-2">
                <PieChart size={20} /> Analytics
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <h3 className="font-bold mb-3">Your Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Trades</span>
                  <span className="font-semibold">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Win Rate</span>
                  <span className="font-semibold text-green-400">68%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Member Since</span>
                  <span className="font-semibold">3 months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// TRADE PAGE
function TradePage({ prices, portfolio, setPortfolio }) {
  const [selectedAsset, setSelectedAsset] = useState(prices[0]);
  const [orderType, setOrderType] = useState('buy');
  const [amount, setAmount] = useState('');

  const handleTrade = () => {
    if (!amount || isNaN(amount)) return;
    
    const totalCost = parseFloat(amount) * selectedAsset.price;
    
    if (orderType === 'buy') {
      if (totalCost > portfolio.balance) {
        alert('Insufficient balance');
        return;
      }
      setPortfolio({
        ...portfolio,
        balance: portfolio.balance - totalCost,
        assets: [...portfolio.assets, { symbol: selectedAsset.symbol, name: selectedAsset.name, amount: parseFloat(amount), price: selectedAsset.price }]
      });
    }
    
    setAmount('');
    alert(`${orderType === 'buy' ? 'Buy' : 'Sell'} order placed successfully!`);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Trade</h1>
        <p className="text-slate-400">Buy and sell digital assets instantly</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-8">
            <h2 className="text-2xl font-bold mb-6">Place Order</h2>

            {/* Asset Selection */}
            <div className="mb-6">
              <label className="text-slate-400 block mb-3">Select Asset</label>
              <div className="grid grid-cols-3 gap-3">
                {prices.map((price) => (
                  <button
                    key={price.symbol}
                    onClick={() => setSelectedAsset(price)}
                    className={`p-3 rounded-lg border transition ${
                      selectedAsset.symbol === price.symbol
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-slate-700 bg-slate-700/30 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-bold">{price.symbol}</div>
                    <div className="text-xs text-slate-400">${price.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Asset Info */}
            <div className="bg-slate-700/30 rounded-lg p-4 mb-6 border border-slate-700">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-slate-400">Current Price</div>
                  <div className="text-2xl font-bold">${selectedAsset.price.toFixed(2)}</div>
                </div>
                <div className={`text-right ${selectedAsset.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  <div className="text-sm">24h Change</div>
                  <div className="text-2xl font-bold">{selectedAsset.change > 0 ? '+' : ''}{selectedAsset.change.toFixed(2)}%</div>
                </div>
              </div>
            </div>

            {/* Order Type */}
            <div className="mb-6">
              <label className="text-slate-400 block mb-3">Order Type</label>
              <div className="flex gap-4">
                {['buy', 'sell'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`flex-1 py-3 rounded-lg border transition font-semibold capitalize ${
                      orderType === type
                        ? type === 'buy' ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-red-500 bg-red-500/10 text-red-400'
                        : 'border-slate-700 bg-slate-700/30 hover:border-slate-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-6">
              <label className="text-slate-400 block mb-3">Amount ({selectedAsset.symbol})</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-500 outline-none text-white text-lg"
              />
            </div>

            {/* Total Cost */}
            {amount && (
              <div className="bg-slate-700/30 rounded-lg p-4 mb-6 border border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Cost</span>
                  <span className="text-2xl font-bold">${(parseFloat(amount) * selectedAsset.price).toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleTrade}
              className={`w-full py-4 rounded-lg font-bold text-lg transition ${
                orderType === 'buy'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg hover:shadow-green-500/50'
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/50'
              }`}
            >
              {orderType === 'buy' ? 'Buy' : 'Sell'} {selectedAsset.symbol}
            </button>
          </div>
        </div>

        {/* Order Book */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6 sticky top-24">
          <h3 className="text-xl font-bold mb-4">Order Book</h3>
          <div className="space-y-4">
            <div>
              <div className="text-slate-400 text-sm mb-2 font-semibold">Buy Orders</div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between text-sm bg-green-500/10 border border-green-500/30 rounded p-2">
                    <span>${(selectedAsset.price - i * 100).toFixed(2)}</span>
                    <span className="text-green-400">{Math.random() * 100 | 0} BTC</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-700 pt-4">
              <div className="text-slate-400 text-sm mb-2 font-semibold">Sell Orders</div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between text-sm bg-red-500/10 border border-red-500/30 rounded p-2">
                    <span>${(selectedAsset.price + i * 100).toFixed(2)}</span>
                    <span className="text-red-400">{Math.random() * 100 | 0} BTC</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// LEARN PAGE
function LearnPage() {
  const [selectedCourse, setSelectedCourse] = useState(0);

  const courses = [
    {
      title: 'Crypto Basics 101',
      instructor: 'Sarah Johnson',
      duration: '2 hours',
      level: 'Beginner',
      students: '12.5K',
      rating: 4.8,
      desc: 'Learn the fundamentals of cryptocurrency, blockchain technology, and how digital assets work.'
    },
    {
      title: 'Technical Analysis Mastery',
      instructor: 'Mike Chen',
      duration: '4 hours',
      level: 'Intermediate',
      students: '8.3K',
      rating: 4.9,
      desc: 'Master chart patterns, indicators, and strategies used by professional traders.'
    },
    {
      title: 'Trading Strategies & Risk',
      instructor: 'Alex Rivera',
      duration: '3 hours',
      level: 'Advanced',
      students: '5.2K',
      rating: 4.7,
      desc: 'Advanced strategies, portfolio management, and risk mitigation techniques.'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Learning Center</h1>
        <p className="text-slate-400">Master cryptocurrency trading with our expert-led courses</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {courses.map((course, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCourse(idx)}
            className={`rounded-xl border transition p-6 text-left ${
              selectedCourse === idx
                ? 'border-cyan-500 bg-cyan-500/10'
                : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold">{course.title}</h3>
                <p className="text-sm text-slate-400">{course.instructor}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                course.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {course.level}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
              <span>{course.duration}</span>
              <span>•</span>
              <span>{course.students} students</span>
            </div>
            <div className="flex items-center gap-1">
              {'⭐'.repeat(5)}
              <span className="text-sm ml-2">{course.rating}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-4">{courses[selectedCourse].title}</h2>
            <p className="text-slate-300 text-lg mb-6 leading-relaxed">{courses[selectedCourse].desc}</p>
            
            <div className="h-64 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg border border-cyan-500/30 flex items-center justify-center mb-8">
              <div className="text-center">
                <div className="text-6xl mb-4">▶️</div>
                <p className="text-slate-400">Course Preview Video</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold">Course Content</h3>
              {['Introduction to Crypto', 'Blockchain Technology', 'Trading Platforms', 'Risk Management', 'Practical Trading'].map((lesson, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 border border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/30 border border-cyan-500/50 flex items-center justify-center text-xs font-bold text-cyan-400">{idx + 1}</div>
                  <span>{lesson}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-700/30 p-6 h-fit">
            <h3 className="text-xl font-bold mb-4">Instructor</h3>
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 mx-auto mb-4 flex items-center justify-center text-4xl">👨‍🏫</div>
              <div className="font-bold">{courses[selectedCourse].instructor}</div>
              <p className="text-sm text-slate-400">Expert Trader & Educator</p>
            </div>

            <div className="space-y-3 text-sm mb-6">
              <div>
                <span className="text-slate-400">Duration</span>
                <div className="font-semibold">{courses[selectedCourse].duration}</div>
              </div>
              <div>
                <span className="text-slate-400">Students</span>
                <div className="font-semibold">{courses[selectedCourse].students}</div>
              </div>
              <div>
                <span className="text-slate-400">Rating</span>
                <div className="font-semibold">⭐ {courses[selectedCourse].rating}</div>
              </div>
            </div>

            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// BLOG PAGE
function BlogPage() {
  const posts = [
    {
      title: 'Bitcoin ETF Approval: What Does It Mean?',
      author: 'John Smith',
      date: 'June 20, 2024',
      category: 'News',
      image: '📰',
      excerpt: 'The recent approval of Bitcoin ETFs marks a significant milestone in cryptocurrency mainstream adoption...'
    },
    {
      title: 'How to Identify Support & Resistance Levels',
      author: 'Emma Davis',
      date: 'June 18, 2024',
      category: 'Trading',
      image: '📊',
      excerpt: 'Master the art of identifying key support and resistance levels to improve your trading decisions...'
    },
    {
      title: 'Crypto Security Best Practices 2024',
      author: 'David Lee',
      date: 'June 15, 2024',
      category: 'Security',
      image: '🔐',
      excerpt: 'Protect your digital assets with these essential security practices every trader should know...'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Blog</h1>
        <p className="text-slate-400">Latest insights, news, and trading tips from our expert community</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {posts.map((post, idx) => (
          <button
            key={idx}
            className="group rounded-xl border border-slate-700 bg-slate-800/30 hover:border-cyan-500/50 hover:bg-slate-800/60 transition overflow-hidden text-left"
          >
            <div className="h-40 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center text-6xl">
              {post.image}
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  post.category === 'News' ? 'bg-blue-500/20 text-blue-400' :
                  post.category === 'Trading' ? 'bg-green-500/20 text-green-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  {post.category}
                </span>
                <span className="text-xs text-slate-400">{post.date}</span>
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition">{post.title}</h3>
              <p className="text-sm text-slate-400 mb-4">{post.excerpt}</p>
              <div className="text-xs text-slate-400">By {post.author}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-8">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-slate-400 mb-6">Get the latest market insights and trading tips delivered to your inbox every week</p>
        <div className="flex gap-4 max-w-md">
          <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-500 outline-none" />
          <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

// FAQ PAGE
function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      q: 'How do I create an account?',
      a: 'Click the "Get Started" button, enter your email and password, and verify your email address. You can start trading immediately after completing this simple 2-minute process.'
    },
    {
      q: 'What are the trading fees?',
      a: 'Our trading fees are 0.1% for makers and 0.15% for takers. We offer volume-based discounts for active traders. Premium members get up to 50% fee reduction.'
    },
    {
      q: 'How long does withdrawal take?',
      a: 'Withdrawals are processed instantly. Once initiated, funds appear in your wallet within minutes. Bank transfers may take 1-2 business days.'
    },
    {
      q: 'Is my money safe with Bit Exchange?',
      a: 'Yes. We use military-grade encryption, cold storage for 95% of assets, and are insured. We also conduct regular security audits by leading cybersecurity firms.'
    },
    {
      q: 'What cryptocurrencies can I trade?',
      a: 'We support over 500 cryptocurrencies including Bitcoin, Ethereum, Solana, and many altcoins. New assets are added weekly based on community demand.'
    },
    {
      q: 'Can I use a VPN?',
      a: 'VPNs are allowed in most countries. However, we comply with local regulations, so some features may be restricted depending on your jurisdiction.'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-slate-400">Find answers to common questions about Bit Exchange</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <button
            key={idx}
            onClick={() => setOpenFAQ(openFAQ === idx ? -1 : idx)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800/30 hover:border-slate-600 transition overflow-hidden text-left"
          >
            <div className="flex items-center justify-between p-6">
              <h3 className="text-lg font-semibold pr-4">{faq.q}</h3>
              <span className={`text-2xl transition-transform ${openFAQ === idx ? 'rotate-45' : ''}`}>+</span>
            </div>
            {openFAQ === idx && (
              <div className="px-6 pb-6 text-slate-400 border-t border-slate-700 pt-4">
                {faq.a}
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-slate-700 bg-slate-800/30 p-8 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-3">Can't find the answer you're looking for?</h2>
        <p className="text-slate-400 mb-6">Our support team is available 24/7 to help you with any questions.</p>
        <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition">
          Contact Support
        </button>
      </div>
    </div>
  );
}

// ABOUT PAGE
function AboutPage() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">About Bit Exchange</h1>
        <p className="text-lg text-slate-400">Building the future of cryptocurrency trading</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="h-96 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl border border-cyan-500/30"></div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-slate-300 leading-relaxed">
            At Bit Exchange, we're on a mission to democratize access to digital asset trading. We believe that everyone, regardless of their experience level, should have access to professional-grade trading tools and fair pricing.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Founded in 2021, we've grown to serve over 50,000 active traders worldwide. Our commitment to transparency, security, and innovation drives everything we do.
          </p>
          <div className="flex gap-8 pt-4">
            <div>
              <div className="text-3xl font-bold text-cyan-400">$2.3B</div>
              <div className="text-slate-400">Trading Volume</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400">50K+</div>
              <div className="text-slate-400">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400">150+</div>
              <div className="text-slate-400">Countries</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {['CEO', 'CTO', 'COO', 'Head of Security'].map((role, idx) => (
            <div key={idx} className="rounded-xl border border-slate-700 bg-slate-800/30 p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 mx-auto mb-4 flex items-center justify-center text-4xl">👤</div>
              <h3 className="font-bold mb-1">Executive Name</h3>
              <p className="text-sm text-slate-400">{role}</p>
              <p className="text-xs text-slate-500 mt-3">20+ years in fintech and crypto</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Transparency', desc: 'No hidden fees. Clear communication always.' },
            { title: 'Security', desc: 'Your assets are protected with military-grade encryption.' },
            { title: 'Innovation', desc: 'Continuously improving our platform and services.' }
          ].map((value, idx) => (
            <div key={idx} className="text-center">
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-slate-400">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// CONTACT PAGE
function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will get back to you shortly.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-slate-400">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-slate-400">support@bitexchange.com</p>
              <p className="text-slate-400">24/7 support team</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="text-slate-400">+1 (888) 123-4567</p>
              <p className="text-slate-400">Monday - Friday, 9AM-6PM EST</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Office</h3>
              <p className="text-slate-400">123 Crypto Street</p>
              <p className="text-slate-400">San Francisco, CA 94107</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Follow Us</h3>
              <div className="flex gap-4">
                {['Twitter', 'Discord', 'GitHub'].map((social) => (
                  <button key={social} className="px-4 py-2 rounded-lg border border-slate-700 hover:border-cyan-500 transition">
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-slate-400 block mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-500 outline-none text-white"
              required
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-500 outline-none text-white"
              required
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-2">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows="5"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-500 outline-none text-white resize-none"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
