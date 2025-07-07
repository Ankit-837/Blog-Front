import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  FileText,
  User,
  Settings,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isLogin, user, setIsLogin, setToken, setUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const navItems = [
    { name: "Home", icon: Home, route: "/dashboard" },
    { name: "Create Post", icon: FileText, route: "/createpost" },
    { name: "Logout", icon: Settings, logout: true },
  ];
  const handleItemClick = (item) => {
    if (item.logout) {
      setUser(null);
      setToken(null);
      setIsLogin(false);
      navigate("/login"); // navigate to login page after logout
    } else if (item.route) {
      navigate(item.route);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-purple-100"
            : "bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div
                className={`text-2xl sm:text-3xl font-bold transition-colors duration-300 ${
                  isScrolled ? "text-red-600" : "text-white"
                }`}
              >
                <span className="bg-gradient-to-r from-red-600 to-blue-900 bg-clip-text text-transparent">
                  Postify
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            {isLogin === true && (
              <div className="hidden md:flex items-center space-x-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-2 py-2 rounded-full  cursor-pointer transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm ${
                      isScrolled
                        ? "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                        : "text-white hover:text-purple-200"
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                ))}
              </div>
            )}
            {isLogin === false && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center ">
                  <a
                    className={`flex items-center space-x-2 px-6 py-1 bg-purple-600 rounded-sm cursor-pointer transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm ${
                      isScrolled
                        ? "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                        : "text-white hover:text-purple-200"
                    }`}
                    onClick={() => navigate("/login")}
                  >
                    <span className="font-medium flex items-center">
                      <span>
                        <IoLogIn />
                      </span>
                      Login
                    </span>
                  </a>
                  <a
                    className={`flex items-center space-x-2 px-6 py-1 rounded-sm ms-2 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm ${
                      isScrolled
                        ? "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                        : "text-white hover:text-purple-200"
                    }`}
                    onClick={() => navigate("/register")}
                  >
                    <span className="font-medium">Register</span>
                  </a>
                </div>
              </div>
            )}

            {isLogin === true && (
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className={`p-2 rounded-full transition-all duration-300 hover:bg-white/10 ${
                    isScrolled
                      ? "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                      : "text-white hover:text-purple-200"
                  }`}
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-4 pt-2 pb-4 space-y-2 bg-white/95 backdrop-blur-md border-t border-purple-100">
            {/* Mobile Navigation Items */}
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-300"
                onClick={() => {
                  handleItemClick(item);
                  setIsMenuOpen(false);
                }}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </a>
            ))}

            {/* Mobile Actions */}
            {/* <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800"></div>
                    <div className="text-sm text-gray-500">{user.username}</div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
