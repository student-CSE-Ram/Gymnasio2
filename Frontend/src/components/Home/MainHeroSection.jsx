import React from 'react'
import heroImg from '/hero-Image.png'

export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-10 py-16 bg-[#111827] text-white mt-10">
      
      {/* Left Side - Image */}
      <div className="md:w-1/2 flex justify-center">
        <img 
          src={heroImg} 
          alt="hero image" 
          className="w-[90%] md:w-[80%] h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side - Text */}
      <div className="md:w-1/2 mt-10 md:mt-0 md:pl-12">
        <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
          Transform Your Body, <br /> Elevate Your Mind.
        </h3>
        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          At <span className="text-emerald-400 font-semibold">Gymnasio</span>, 
          fitness isn’t just about lifting weights — it’s about building strength, 
          confidence, and discipline. Whether you’re a beginner or a pro athlete, 
          our expert trainers, modern equipment, and motivating community will 
          help you crush your goals.
        </p>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row gap-4'>
        <button className="bg-blue-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg shadow-md transition-colors">
        Get Started
          </button>
          <button className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-3 rounded-lg shadow-md transition-colors">
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  )
}
