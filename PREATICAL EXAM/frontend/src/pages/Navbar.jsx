import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    alert("User logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and main navigation */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center space-x-3 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-teal-600 group-hover:text-teal-500 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 group-hover:from-teal-500 group-hover:to-emerald-500 transition-all duration-300">
                RecipeMaster
              </span>
            </Link>
            <div className="hidden md:flex md:ml-10 md:space-x-8">
              <Link
                to="/"
                className="relative text-gray-700 hover:text-teal-600 font-medium text-sm transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-teal-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform duration-300"
              >
                Home
              </Link>
              <Link
                to="/myrecipes"
                className="relative text-gray-700 hover:text-teal-600 font-medium text-sm transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-teal-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform duration-300"
              >
                My Recipes
              </Link>
            </div>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {token ? (
              <>
                <Link
                  to="/addrecipe"
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  + Add Recipe
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold border border-gray-300 hover:border-gray-400 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="bg-white hover:bg-gray-100 text-teal-600 px-4 py-2 rounded-full text-sm font-semibold border border-gray-300 hover:border-teal-400 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-teal-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1 bg-white shadow-inner animate-slide-down">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 font-medium text-base transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/myrecipes"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 font-medium text-base transition-all duration-200"
            >
              My Recipes
            </Link>
            {token && (
              <Link
                to="/addrecipe"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 font-medium text-base transition-all duration-200"
              >
                Add Recipe
              </Link>
            )}
            {token ? (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                  navigate("/");
                }}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-500 font-medium text-base transition-all duration-200"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/signin"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 font-medium text-base transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 font-medium text-base rounded-full mx-4 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
