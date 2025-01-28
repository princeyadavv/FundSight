import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToken } from "./context/TokenContent"; // Adjust the path as needed
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token } = useToken();
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const menuRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!(token || localStorage.getItem("bankai"))
  );

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("bankai"));
  }, [token]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("bankai");
    setIsLoggedIn(false);
    navigate("/");
  };

  // Function to check active route
  const isActive = (path) =>
    location.pathname === path ? "border-b-2 border-blue-500" : "";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="src/assets/images/logo.png"
            alt="FundSphere Logo"
            className="w-9 h-9"
          />
          <span className="text-xl font-semibold text-gray-800">
            FundSphere
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden" onClick={toggleMenu}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Navigation Menu */}
        <nav
          ref={menuRef}
          className={`absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none transition-all duration-300 ${
            menuOpen ? "block" : "hidden"
          } lg:flex items-center space-x-6 p-4 lg:p-0`}
        >
          <Link
            to="/"
            className={`block text-gray-800 font-medium hover:text-blue-500 py-2 lg:inline ${isActive(
              "/"
            )}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block text-gray-800 font-medium hover:text-blue-500 py-2 lg:inline ${isActive(
              "/about"
            )}`}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`block text-gray-800 font-medium hover:text-blue-500 py-2 lg:inline ${isActive(
              "/contact"
            )}`}
          >
            Contact Us
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block text-gray-800 font-medium hover:text-red-500 py-2 lg:inline"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className={`block text-gray-800 font-medium hover:text-blue-500 py-2 lg:inline ${isActive(
                  "/login"
                )}`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`block text-gray-800 font-medium hover:text-blue-500 py-2 lg:inline ${isActive(
                  "/signup"
                )}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
