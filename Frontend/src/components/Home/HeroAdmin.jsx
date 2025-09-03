
import React from 'react';
import heroAdminImage from '/Admin.png';

export default function HeroSection2() {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-zink-200 hover:scale-[1.01] transition-transform duration-300 ease-in-out"
      data-aos="fade-right"
    >
      <div className="md:w-1/2 space-y-6 mb-10 md:mb-0">
        <h2 className="text-3xl md:text-3xl font-bold text-blue-700 leading-tight">
          Take Full Control of Your Gym
        </h2>

        <p className="text-gray-600 text-base md:text-sm">
          Designed for gym owners and managers, this platform gives you everything you need to run your gym smoothly and efficiently — no technical skills required.
        </p>

        <p className="text-gray-700 text-base leading-relaxed">
          Manage everything in one place — from trainers to members, subscriptions, payments, and gym performance reports. With your unique Gym Code, Username, and Password, you can easily log in and streamline operations without hassle.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-green-500 hover:to-green-400 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300">
            Book a demo
          </button>
          <button className="bg-white border border-blue-500 text-blue-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-lg shadow-sm transition duration-300">
            Get Started Now
          </button>
        </div>
      </div>

      {/* Right: Image Section */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src={heroAdminImage}
          alt="Admin Hero Section"
          className="w-[90%] md:w-[80%] h-auto rounded-lg shadow-xl"
        />
      </div>
    </div>
  );
}
