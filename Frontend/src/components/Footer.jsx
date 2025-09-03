import React from "react";
import Logo from "/GymnasioBlackLogo.png";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-300 px-10 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo + Contact */}
        <div className="md:w-1/2 pl-10">
          <div className="flex items-center mb-4">
            <img
              src={Logo}
              alt="Gymnasio Logo"
              className="w-12 h-12 rounded-full mr-3 border border-gray-400 bg-white"
            />
            <span className="text-2xl italic font-semibold text-white">Gymnasio</span>
          </div>
          <h3 className="text-white font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">Shahpur thana, medical road, Gorakhpur </p>
          <p className="text-sm">Uttar Pradesh, 273015</p>
          <p className="text-sm mt-2">📧 info@gymnasio.in</p>
          <p className="text-sm mt-1">📞 +91 8808824412 | +91 9792541956</p>
        </div>

        {/* Resources */}
        <div className="ml-10">
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="/blog" className="hover:text-white">Blog</a></li>
            <li><a href="/support" className="hover:text-white">Contact Support</a></li>
            <li><a href="/faqs" className="hover:text-white">FAQs</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="ml-10">
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 mb-6">
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/app-privacy" className="hover:text-white">App Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms of Use</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="ml-10">
          <h3 className="text-white font-semibold mb-4">Social</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Instagram</a></li>
            <li><a href="#" className="hover:text-white">LinkedIn</a></li>
            <li><a href="#" className="hover:text-white">Facebook</a></li>
            <li><a href="#" className="hover:text-white">YouTube</a></li>
            <li><a href="#" className="hover:text-white">Twitter</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-left text-sm text-gray-400 ml-6 mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Gymnasio Technologies Pvt. Ltd. All rights reserved
      </div>
    </footer>
  );
}
