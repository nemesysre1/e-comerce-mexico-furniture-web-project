import { Menu, X, Phone, ShoppingCart, Settings, History } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  onCartOpen: () => void;
  onDashboardOpen: () => void;
  onHistoryOpen: () => void;
  onLoginOpen: () => void;
}

export function Navbar({ onCartOpen, onDashboardOpen, onHistoryOpen, onLoginOpen }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { isAuthenticated } = useAuth();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              {/* Decorative Icon */}
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              {/* Brand Text */}
              <div className="flex flex-col leading-tight">
                <span className="text-xl tracking-tight">
                  <span className="text-gray-800 font-semibold">UD.</span>
                  <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-bold">Mexico</span>
                </span>
                <span className="text-xs text-gray-500 tracking-wide uppercase">Furniture Tempahan</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('beranda')}
              className="text-gray-700 hover:text-amber-600 transition-colors"
            >
              Beranda
            </button>
            <button
              onClick={() => scrollToSection('layanan')}
              className="text-gray-700 hover:text-amber-600 transition-colors"
            >
              Layanan
            </button>
            <button
              onClick={() => scrollToSection('produk')}
              className="text-gray-700 hover:text-amber-600 transition-colors"
            >
              Produk
            </button>
            <button
              onClick={() => scrollToSection('galeri')}
              className="text-gray-700 hover:text-amber-600 transition-colors"
            >
              Galeri
            </button>
            <button
              onClick={() => scrollToSection('cabang')}
              className="text-gray-700 hover:text-amber-600 transition-colors"
            >
              Cabang
            </button>
            <button
              onClick={onHistoryOpen}
              className="text-gray-700 hover:text-amber-600 transition-colors"
              title="Riwayat Pesanan"
            >
              <History className="w-5 h-5" />
            </button>
            {isAuthenticated ? (
              <button
                onClick={onDashboardOpen}
                className="text-gray-700 hover:text-amber-600 transition-colors"
                title="Dashboard Admin"
              >
                <Settings className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={onLoginOpen}
                className="text-gray-700 hover:text-amber-600 transition-colors text-sm"
              >
                Admin Login
              </button>
            )}
            <button
              onClick={onCartOpen}
              className="relative text-gray-700 hover:text-amber-600 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{getTotalItems()}</span>}
            </button>
            <button
              onClick={() => scrollToSection('kontak')}
              className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Hubungi Kami
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={onCartOpen}
              className="relative text-gray-700 hover:text-amber-600 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{getTotalItems()}</span>}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-amber-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection('beranda')}
                className="text-gray-700 hover:text-amber-600 transition-colors text-left"
              >
                Beranda
              </button>
              <button
                onClick={() => scrollToSection('layanan')}
                className="text-gray-700 hover:text-amber-600 transition-colors text-left"
              >
                Layanan
              </button>
              <button
                onClick={() => scrollToSection('produk')}
                className="text-gray-700 hover:text-amber-600 transition-colors text-left"
              >
                Produk
              </button>
              <button
                onClick={() => scrollToSection('galeri')}
                className="text-gray-700 hover:text-amber-600 transition-colors text-left"
              >
                Galeri
              </button>
              <button
                onClick={() => scrollToSection('cabang')}
                className="text-gray-700 hover:text-amber-600 transition-colors text-left"
              >
                Cabang
              </button>
              <button
                onClick={() => {
                  onHistoryOpen();
                  setIsOpen(false);
                }}
                className="text-gray-700 hover:text-amber-600 transition-colors text-left"
              >
                Riwayat Pesanan
              </button>
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    onDashboardOpen();
                    setIsOpen(false);
                  }}
                  className="text-gray-700 hover:text-amber-600 transition-colors text-left"
                >
                  Dashboard Admin
                </button>
              ) : (
                <button
                  onClick={() => {
                    onLoginOpen();
                    setIsOpen(false);
                  }}
                  className="text-gray-700 hover:text-amber-600 transition-colors text-left"
                >
                  Admin Login
                </button>
              )}
              <button
                onClick={() => scrollToSection('kontak')}
                className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors flex items-center gap-2 w-fit"
              >
                <Phone className="w-4 h-4" />
                Hubungi Kami
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
