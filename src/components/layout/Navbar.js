import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Function to check if the current route is active
  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'text-teal font-bold' : 'navbar-link';
  };
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-10 w-auto"
                src="/images/logo.png"
                alt="USAR Logo"
              />
              <span className="ml-2 text-xl font-bold text-gray-800">USAR Placements</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className={getNavLinkClass('/')}>
              Home
            </Link>
            <Link to="/placements" className={getNavLinkClass('/placements')}>
              Placement Stats
            </Link>
            <Link to="/companies" className={getNavLinkClass('/companies')}>
              Companies
            </Link>
            <Link to="/about" className={getNavLinkClass('/about')}>
              About USAR
            </Link>
            <Link to="/contact" className={getNavLinkClass('/contact')}>
              Contact
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-teal focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md ${getNavLinkClass('/')}`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/placements"
              className={`block px-3 py-2 rounded-md ${getNavLinkClass('/placements')}`}
              onClick={toggleMenu}
            >
              Placement Stats
            </Link>
            <Link
              to="/companies"
              className={`block px-3 py-2 rounded-md ${getNavLinkClass('/companies')}`}
              onClick={toggleMenu}
            >
              Companies
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md ${getNavLinkClass('/about')}`}
              onClick={toggleMenu}
            >
              About USAR
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md ${getNavLinkClass('/contact')}`}
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 