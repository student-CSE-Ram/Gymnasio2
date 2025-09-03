// import React from 'react'
// import heroTrainerImage from '/hero-Image.png'

// export default function HeroMember() {
//   return (
//     <div className='flex flex-col md:flex-row justify-between items-center px-10 py-16 bg-gray-100'>
//         <div className='md:w-1/2 mb-8 md:mb-0'>
//            <h2 className='text-4xl md:text-5xl font-bold mb-6 text-orange-700'>🏋️ Empowering Gym Members</h2>
//            <p>
//            As a gym member, you have full control over your fitness journey. Our platform lets you book workout sessions, view your personalized workout and diet plans, track your attendance, and monitor your progress over time. Stay connected with your trainers, receive real-time updates, and manage your membership — all from one place. It's fitness made simple, smart, and accessible.
//            </p>

//            <button class="bg-gradient-to-r from-orange-400 to-orange-300 text-white gap-4 font-semibold py-2 px-6 rounded shadow-md hover:scale-105 hover:from-orange-500 hover:to-orange-400 transition duration-300 ">Book a Session 
//            </button>

//            <button class="bg-white text-orange-500 border-2 border-orange-400 font-semibold py-2 px-6 rounded hover:bg-orange-50 hover:font-bold transition duration-300"> View Workout Plan
//            </button>

//         </div>

//         <div className='md:w-1/2 flex justify-center'>
//               <img 
//                 src={heroTrainerImage}
//                 alt="trainerHeroSectionImage"
//                 className='w-[90%] md:w-[80%] h-auto rounded-lg shadow-lg' />
//         </div>
        

//     </div>
//   )
// }















import React from 'react';
import heroMember from '/memberDash.png'

export default function HeroMemberSection() {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between px-10 py-16 bg-zink-200 hover:scale-[1.01] transition-transform duration-300 ease-in-out"
      data-aos="fade-left"
    >
      <div className="md:w-1/2 space-y-6 mb-8 md:mb-0">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 leading-tight">
          Your Fitness, Your Control
        </h2>
        <p className="text-gray-700 text-base md:text-sm leading-relaxed">
          As a member, you can easily book sessions, access workout plans, track your progress, and connect with your trainer — all from a single dashboard. Simple, intuitive, and built for results.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button className="bg-gradient-to-r from-green-500 to-teal-400 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:scale-105 transition duration-300">
            Book a Session
          </button>
          <button className="bg-white border border-green-500 text-green-600 hover:bg-green-50 font-medium px-6 py-3 rounded-lg shadow-sm transition duration-300">
            Track Progress
          </button>
        </div>
      </div>

      <div className="md:w-1/2 flex justify-center">
        <img
          src={heroMember}
          alt="Member Hero"
          className="w-[90%] md:w-[80%] h-auto rounded-lg shadow-xl"
        />
      </div>
    </div>
  );
}
