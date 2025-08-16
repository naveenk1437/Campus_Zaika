import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import { Menu, X } from 'lucide-react';

const ADMIN_EMAILS = ['admin@zaika.com'];
const DEFAULT_AVATAR =
  'https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg';

const Navbar = () => {
  const { user, logout } = useAuth();
  const isAdmin = user && ADMIN_EMAILS.includes(user.email);

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle scroll to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(lastScrollY > currentScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      } bg-yellow-400 text-black shadow`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/campus-zaika-gif-unscreen.gif"
            alt="Campus Zaika Logo"
            className="h-12 w-12 md:h-16 md:w-16 rounded-full border border-black hover:scale-105 transition-transform"
          />
          <span className="text-xl md:text-2xl font-bold font-serif">Campus Zaika</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center font-serif text-lg">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/about" className="hover:text-white">About</Link>
          <Link to="/ourService" className="hover:text-white">Our Service</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>

          {isAdmin && <Link to="/orders" className="hover:text-white">Orders</Link>}
          {isAdmin && <Link to="/admin-dashboard" className="hover:text-white">Dashboard</Link>}
          {isAdmin && <Link to="/admin-dashboard/add-item" className="hover:text-white">Add Menu Item</Link>}

          <Link to="/order">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
              alt="Cart"
              className="w-6 h-6"
            />
          </Link>

          {user ? (
            <>
              {/* Profile pic updates instantly when user object changes */}
              <Link to="/dashboard">
                <img
                  src={user.photoURL || DEFAULT_AVATAR}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border"
                />
              </Link>
              <button
                onClick={logout}
                className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <img src="profile_pic.png" alt="Login" className="w-8 h-8 rounded-full" />
            </Link>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden bg-yellow-400 text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-3 px-4 pb-4 font-serif text-base bg-yellow-400">
          <Link to="/" onClick={handleLinkClick}>Home</Link>
          <Link to="/about" onClick={handleLinkClick}>About</Link>
          <Link to="/ourService" onClick={handleLinkClick}>Our Service</Link>
          <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
          {isAdmin && <Link to="/orders" onClick={handleLinkClick}>Orders</Link>}
          {isAdmin && <Link to="/admin-dashboard" onClick={handleLinkClick}>Dashboard</Link>}
          {isAdmin && <Link to="/admin-dashboard/add-item" onClick={handleLinkClick}>Add Menu Item</Link>}
          
          <Link to="/order" onClick={handleLinkClick}>
            <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" alt="Cart" className="w-5 h-5" />
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" onClick={handleLinkClick}>
                <img
                  src={user.photoURL || DEFAULT_AVATAR}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border"
                />
              </Link>
              <button
                onClick={() => {
                  logout();
                  handleLinkClick();
                }}
                className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={handleLinkClick}>
              <img src="profile_pic.png" alt="Login" className="w-8 h-8 rounded-full" />
            </Link>
          )}
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
