import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "/GymnasioBlackLogo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef();

  // 🔥 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#111827] text-gray-200 shadow-md">
      <div className="max-w-6xl mx-auto h-20 flex justify-between items-center px-4">
        
        {/* Left - Logo */}
        <span className="flex items-center">
          <img
            src={Logo}
            alt="logo"
            className="w-12 h-12 rounded-full mr-2 border border-gray-400 bg-white"
          />
          <span className="font-bold text-lg">Gymnasio</span>
        </span>

        {/* Middle - Links */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-green-500">Home</Link>
          <Link to="/blog" className="hover:text-green-500">Blog</Link>
          <Link to="/contact" className="hover:text-green-500">Contact</Link>
          <Link to="/pricing" className="hover:text-green-500">Pricing</Link>
        </div>

        {/* Right - Contact + Dropdown */}
        <div className="hidden md:flex gap-6 items-center">
          <span className="text-gray-300">+919792541956</span>

          {/* 🔥 Dropdown (FIXED) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-blue-600 hover:bg-green-500 text-white px-4 py-2 rounded transition"
            >
              Login
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
                <Link
                  to="/login/owner"
                  className="block px-4 py-2 hover:bg-gray-700"
                  onClick={() => setShowDropdown(false)}
                >
                  Owner
                </Link>
                <Link
                  to="/login/trainer"
                  className="block px-4 py-2 hover:bg-gray-700"
                  onClick={() => setShowDropdown(false)}
                >
                  Trainer
                </Link>
                <Link
                  to="/login/member"
                  className="block px-4 py-2 hover:bg-gray-700"
                  onClick={() => setShowDropdown(false)}
                >
                  Member
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 bg-[#111827] border-t border-gray-700">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/pricing" onClick={() => setIsOpen(false)}>Pricing</Link>

          <span className="text-gray-300">+919792541956</span>

          <Link to="/login/owner" onClick={() => setIsOpen(false)}>Owner Login</Link>
          <Link to="/login/trainer" onClick={() => setIsOpen(false)}>Trainer Login</Link>
          <Link to="/login/member" onClick={() => setIsOpen(false)}>Member Login</Link>
        </div>
      )}
    </div>
  );
}