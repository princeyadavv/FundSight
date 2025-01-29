import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToken } from "./context/TokenContent"; // Adjust the path as needed
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token, decodeToken } = useToken();
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const menuRef = useRef(null);
  const [loading, setLoading] = useState(false); // Track loading state

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!(token || localStorage.getItem("bankai"))
  );

  
  console.log(decodeToken(token));
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
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("bankai");
      setIsLoggedIn(false);
      navigate("/");
      setLoading(false);
    }, 900);
  };

  // Function to check active route
  const isActive = (path) =>
    location.pathname === path ? "border-b-2 border-blue-500" : "";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-[#4e52b4] animate-progress z-50"></div>
      )}
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
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } lg:static lg:w-auto lg:bg-transparent lg:shadow-none lg:translate-x-0 flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6 p-6 lg:p-0`}
        >
          {/* Close button for mobile menu */}
          <button className="lg:hidden self-end mb-4" onClick={toggleMenu}>
            <X className="w-6 h-6" />
          </button>

          {["/", "/dashboard",  "/about", "/contact", "/profile"].map((path) => (
            <Link
              key={path}
              to={path}
              className={`block text-gray-800 font-medium hover:text-blue-500 py-2 lg:inline ${isActive(
                path
              )}`}
              onClick={() => setMenuOpen(false)} // Close menu on click
            >
              {path === "/"
                ? "Home"
                : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
            </Link>
          ))}

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block text-gray-800 font-medium hover:text-red-500 py-2 lg:inline"
            >
              Logout
            </button>
          ) : (
            ["/login", "/signup"].map((path) => (
              <Link
                key={path}
                to={path}
                className={`block text-gray-800 font-medium hover:text-blue-500 py-2 lg:inline ${isActive(
                  path
                )}`}
                onClick={() => setMenuOpen(false)} // Close menu on click
              >
                {path === "/login" ? "Login" : "Sign Up"}
              </Link>
            ))
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
