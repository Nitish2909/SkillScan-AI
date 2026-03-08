import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sparkles, ChevronRight } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate()

const { handleLogout} = useAuth();

const handleLogoutbtn = ()=>{
      handleLogout();
     navigate("/")
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`
        fixed top-0 w-full z-50 transition-all duration-500
        ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
            : "bg-white/95 py-5"
        }
      `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>

              <span className="text-xl font-bold text-gray-900">
                SkillScan AI
              </span>
            </Link>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleLogoutbtn}
                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Logout
              </button>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 m-auto" />
              ) : (
                <Menu className="w-5 h-5 m-auto" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg px-4 py-6 space-y-3">
            <button onClick={handleLogoutbtn} className="block text-center py-2 text-gray-700">
              Logout
            </button>
          </div>
        )}
      </nav>

      <div className={`${isScrolled ? "h-16" : "h-20"}`} />
    </>
  );
};

export default Navbar;
