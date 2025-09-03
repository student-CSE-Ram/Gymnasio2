import React from 'react'

export default function HeroCards() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-18 px-6'>
        <div className='bg-blue-50 backdrop-blur-sm p-10 mx-10 h-fit rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl'>
            <h2 className='text-3xl font-bold text-left text-black-700 mb-8'>People connected</h2>
            <p className='text-left text-gray-600 text-sm'>There are over 100+ people actively connected with Gymnasio, creating a strong and motivated fitness community. Members range from beginners to advanced athletes.</p>
        </div>

        <div className='bg-gradient-to-b from-fuchsia-50 via-fuchsia-100 to-fuchsia-200 backdrop-blur-sm p-10 mx-10 h-fit rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl'>
            <h2 className='text-3xl font-bold text-left text-black-700 mb-8'>Trainers</h2>
            <p className='text-left text-gray-600 text-sm'>Gymnasio boasts a team of over 20 certified trainers, each bringing their unique expertise and passion for fitness. These trainers specialize in various areas such as strength training, cardio, yoga, and nutrition. Welcome to Gymnasio</p>
        </div>
        <div className='bg-blue-50 backdrop-blur-sm p-10 mx-10 h-fit rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl'>
            <h2 className='text-3xl font-bold text-left text-black-700 mb-8'>Workouts</h2>
            <p className='text-left text-gray-600 text-sm'>Gymnasio offers over 50 diverse workout plans designed to cater to all fitness levels and goals. From beginner-friendly routines to each workout plan is crafted by expert trainers to ensure effectiveness and safety.</p>
        </div>
    </div>
  )
}
