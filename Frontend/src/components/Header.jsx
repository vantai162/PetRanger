import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PawPrint, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header({ currentUser, onLogout }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Trang chủ' },
    { path: '/services', label: 'Dịch vụ' },
    { path: '/pets', label: 'Thú cưng' },
    { path: '/products', label: 'Sản phẩm' },
    { path: '/about', label: 'Giới thiệu' },
    { path: '/contact', label: 'Liên hệ' },
    
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
    setMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-[#6ccff6] p-2 rounded-lg group-hover:bg-[#6ccff6] transition-colors">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">PetRanger</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors ${
                  isActive(item.path)
                    ? 'text-[#6ccff6]'
                    : 'text-gray-600 hover:text-[#6ccff6]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {currentUser ? (
              <div className="flex items-center gap-3 ml-4">
                <span className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700">
                  {currentUser.name}
                </span>
                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-4 bg-[#6ccff6] text-white px-4 py-2 rounded-lg hover:bg-[#12B7F9] transition-colors"
              >
                Đăng nhập
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 px-4 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-[#6ccff6] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {currentUser ? (
              <div className="mt-2 px-4">
                <div className="py-2 rounded-lg bg-gray-100 text-gray-700 text-center mb-2">
                  {currentUser.name}
                </div>
                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 block py-2 px-4 rounded-lg bg-[#6ccff6] text-white text-center hover:bg-[#12B7F9] transition-colors"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
