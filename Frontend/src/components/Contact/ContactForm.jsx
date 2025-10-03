import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto my-20 mt-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left Section */}
      <div className="flex flex-col justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8 rounded-2xl shadow-md">
        <h2 className="text-4xl font-bold mb-6 text-amber-600">Get in Touch</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          We’d love to hear from you! Whether you have questions about our
          services, want to book a free demo, or just want to say hi, our team
          is ready to help you out.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="text-amber-500" />
            <span className="text-gray-800">+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-amber-500" />
            <span className="text-gray-800">support@yourdomain.com</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-amber-500" />
            <span className="text-gray-800">Noida, Uttar Pradesh, India</span>
          </div>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="bg-gradient-to-br from-blue-100 via-white to-blue-300 p-8 rounded-2xl shadow-md">
        <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />
            <input
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              type="number"
              name="number"
              placeholder="Mobile"
              required
            />
          </div>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            name="message"
            rows="5"
            placeholder="Your Message"
            required
          ></textarea>
          <div className="text-center">
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-amber-600 transition duration-300"
              type="submit"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
