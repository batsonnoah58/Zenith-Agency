import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/auth";
import { FaHome, FaTachometerAlt, FaTasks, FaMoneyBillWave, FaUser, FaLifeRing, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/", public: true },
    { name: "Dashboard", path: "/dashboard", public: false },
    { name: "Tasks", path: "/tasks", public: false },
    { name: "Profit", path: "/profit", public: false },
    { name: "Account", path: "/account", public: false },
    { name: "Support", path: "/support", public: true },
  ];

  const navIcons = {
    Home: <FaHome size={22} />, // Home icon
    Dashboard: <FaTachometerAlt size={22} />, // Dashboard icon
    Tasks: <FaTasks size={22} />, // Tasks icon
    Profit: <FaMoneyBillWave size={22} />, // Profit icon
    Account: <FaUser size={22} />, // Account icon
    Support: <FaLifeRing size={22} />, // Support icon
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold text-lg">Z</span>
                </div>
                <span className="text-white text-xl font-bold">Zenith Agency</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.filter(item => item.public || user).map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {!user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="text-white font-semibold">{user.name}</span>
                  <button
                    onClick={logout}
                    className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-300 transition-colors shadow"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
          </div>
        </div>
      </nav>
      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow md:hidden flex justify-around items-center h-16">
        {navItems.filter(item => item.public || user).map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center justify-center flex-1 h-full text-xs font-medium transition-colors ${
              location.pathname === item.path
                ? "text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            {navIcons[item.name as keyof typeof navIcons]}
            <span className="mt-1">{item.name}</span>
          </Link>
        ))}
        {user && (
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="flex flex-col items-center justify-center flex-1 h-full text-xs font-medium text-gray-500 hover:text-red-600 transition-colors"
            style={{ background: "none", border: "none" }}
          >
            <FaSignOutAlt size={22} />
            <span className="mt-1">Logout</span>
          </button>
        )}
      </div>
    </>
  );
}

export default Navbar;