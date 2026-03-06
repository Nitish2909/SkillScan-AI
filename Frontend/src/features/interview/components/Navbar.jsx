import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles, ChevronRight } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/features", label: "Features" },
    { path: "/pricing", label: "Pricing" },
    { path: "/about", label: "About" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`
          fixed top-0 w-full z-50 transition-all duration-500
          ${isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg py-3" 
            : "bg-transparent py-5"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo with gradient and icon */}
            <Link 
              to="/" 
              className="group flex items-center space-x-2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                SkillScan AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    relative font-medium transition-all duration-300 group
                    ${isActive(link.path)
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                    }
                  `}
                >
                  {link.label}
                  <span
                    className={`
                      absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 
                      transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100
                      ${isActive(link.path) ? "scale-x-100" : ""}
                    `}
                  />
                </Link>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/signin"
                className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors relative group"
              >
                Sign In
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
              
              <Link
                to="/signup"
                className="group relative px-6 py-2.5 text-sm font-medium text-white overflow-hidden rounded-xl"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-transform group-hover:scale-105" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity" />
                <span className="relative flex items-center justify-center">
                  Get Started
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              ) : (
                <Menu className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`
            md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl
            transition-all duration-400 overflow-hidden
            ${isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    block px-4 py-3 rounded-lg font-medium transition-all
                    ${isActive(link.path)
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Mobile Auth Buttons */}
            <div className="space-y-3 pt-2">
              <Link
                to="/signin"
                className="block w-full px-4 py-3 text-center font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block w-full px-4 py-3 text-center font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all transform hover:scale-[1.02]"
              >
                Get Started Free
              </Link>
            </div>

            {/* Bonus: Quick stats for mobile */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">10K+</div>
                <div className="text-xs text-gray-600">Active Users</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">95%</div>
                <div className="text-xs text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className={`${isScrolled ? "h-16" : "h-20"} transition-all duration-500`} />
    </>
  );
};

export default Navbar;