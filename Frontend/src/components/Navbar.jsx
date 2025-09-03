import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons for hamburger
import Logo from "/GymnasioBlackLogo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // track mobile menu open/close

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

        {/* Middle - Links (hidden on mobile) */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-green-500">Home</Link>
          <Link to="/blog" className="hover:text-green-500">Blog</Link>
          <Link to="/contact" className="hover:text-green-500">Contact</Link>
          <Link to="/pricing" className="hover:text-green-500">Pricing</Link>
        </div>

        {/* Right - Contact + Dropdown (hidden on mobile) */}
        <div className="hidden md:flex gap-6 items-center">
          <span className="text-gray-300">+919792541956</span>

          {/* Dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="bg-blue-600 hover:bg-green-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity duration-300">
              <Link to="/login/owner" className="block px-4 py-2 hover:bg-gray-700">Owner</Link>
              <Link to="/login/trainer" className="block px-4 py-2 hover:bg-gray-700">Trainer</Link>
              <Link to="/login/member" className="block px-4 py-2 hover:bg-gray-700">Member</Link>
            </div>
          </div>
        </div>

        {/* Hamburger button (visible only on mobile) */}
        <button
          className="md:hidden text-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (visible when isOpen = true) */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 bg-[#111827] border-t border-gray-700">
          <Link to="/" className="hover:text-green-500">Home</Link>
          <Link to="/blog" className="hover:text-green-500">Blog</Link>
          <Link to="/contact" className="hover:text-green-500">Contact</Link>
          <Link to="/pricing" className="hover:text-green-500">Pricing</Link>
          <span className="text-gray-300">+919792541956</span>
          <Link to="/login/owner" className="hover:text-green-500">Owner Login</Link>
          <Link to="/login/trainer" className="hover:text-green-500">Trainer Login</Link>
          <Link to="/login/member" className="hover:text-green-500">Member Login</Link>
        </div>
      )}
    </div>
  );
}
