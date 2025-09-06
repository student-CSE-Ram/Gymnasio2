import React from "react";
import Logo from "/GymnasioBlackLogo.png";
import { Instagram, Linkedin, Facebook, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-300 px-6 md:px-10 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative">
        
        {/* Contact */}
        <div className="px-2">
          <h3 className="text-white font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">
            Shahpur thana, medical road, Gorakhpur, Uttar Pradesh, 273015
          </p>
          <p className="text-sm mt-2">📧 info@gymnasio.in</p>
          <p className="text-sm mt-1">
            <span>📞 +91 8808824412 </span>
            <br />
            <span>📞 +91 9792541956</span>
          </p>
        </div>

        {/* Resources */}
        <div className="md:ml-10">
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/blog"
                className="hover:text-white transition-colors duration-200"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="/support"
                className="hover:text-white transition-colors duration-200"
              >
                Contact Support
              </a>
            </li>
            <li>
              <a
                href="/faqs"
                className="hover:text-white transition-colors duration-200"
              >
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="md:ml-10">
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 mb-6">
            <li>
              <a
                href="/privacy"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/app-privacy"
                className="hover:text-white transition-colors duration-200"
              >
                App Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="hover:text-white transition-colors duration-200"
              >
                Terms of Use
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="md:ml-10">
          <h3 className="text-white font-semibold mb-4">Social</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Instagram size={16} /> Instagram
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Facebook size={16} /> Facebook
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label="YouTube"
                className="hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Youtube size={16} /> YouTube
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Twitter size={16} /> Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center md:text-left text-sm text-gray-400 mt-12 border-t border-gray-700 pt-6 relative">
        <div className="flex justify-center md:absolute left-1/2 transform md:-translate-x-1/2 items-center mb-4">
          <img
            src={Logo}
            alt="Gymnasio Logo"
            className="w-12 h-12 rounded-full mr-3 border border-gray-400 bg-white"
          />
          <span className="text-xl  font-bold text-amber-600">
            Gymnasio
          </span>
        </div>
        <span>
          © {new Date().getFullYear()} Gymnasio Technologies Pvt. Ltd. All rights
          reserved
        </span>
      </div>
    </footer>
  );
}
