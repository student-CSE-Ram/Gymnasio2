import React from 'react';
import heroTrainerImage from '/TrainerDash.png';

export default function HeroSection3() {
  return (
    <div
      className="flex flex-col md:flex-row justify-between items-center px-10 py-20 bg-zink-200 hover:scale-[1.01] transition-transform duration-300 ease-in-out"
      data-aos="fade-up"
    >
      
      <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
        <img
          src={heroTrainerImage}
          alt="trainerHeroSectionImage"
          className="w-[90%] md:w-[80%] h-auto rounded-lg shadow-xl"
        />
      </div>

      <div className="md:w-1/2 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 leading-tight">
          Empower Trainers to Guide Better
        </h2>
        <p className="text-gray-700 text-base md:text-sm leading-relaxed">
          Trainers get their own dashboard to track assigned members, manage workout plans, record attendance, and monitor progress. They can focus more on coaching while the system handles the admin work.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button className="bg-gradient-to-r from-green-600 to-teal-500 hover:from-cyan-500 hover:to-blue-400 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300">
            Trainer Login
          </button>
          <button className="bg-white border border-green-500 text-green-700 hover:bg-green-50 font-medium px-6 py-3 rounded-lg shadow-sm transition duration-300">
            View Member Progress
          </button>
        </div>
      </div>
    </div>
  );
}
