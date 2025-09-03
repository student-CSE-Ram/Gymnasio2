import React from 'react'
import HeroSection from '../components/Home/MainHeroSection'
import HeroSection2 from '../components/Home/HeroAdmin'
import HeroSection3 from '../components/Home/HeroTrainer'
import HeroMemberSection from '../components/Home/HeroMember'
import HeroFeatures from '../components/Home/HeroFeatures'
import HeroCards from '../components/Home/HeroCards'
import HeroLast from '../components/Home/HeroLast'



export default function Home() {
  return (
    <div className="space-y-16">
        <div data-aos="fade-right">
          <HeroSection />
        </div>
        <div data-aos="fade-up">
        <h1 className="text-3xl md:text-4xl mb-8 font-bold text-amber-600 text-center">
          How Admins Manage Everything
        </h1>
          <HeroSection2 /></div>
        <div data-aos="fade-up">
        <h1 className="text-3xl md:text-4xl mb-8 font-bold text-amber-600 text-center">
          Manage your Members Effectively
        </h1>
          <HeroSection3 /></div>
         <div data-aos="fade-up">
         <h1 className="text-3xl md:text-4xl mb-8 font-bold text-amber-600 text-center">
          Members Take Charge of Their Fitness
        </h1>
           <HeroMemberSection />
         </div>

         <div data-aos="fade-up">
         <h1 className="text-3xl md:text-4xl mb-18 font-bold text-amber-600 text-center">
         Features</h1>
            <HeroFeatures />
         </div>
         <HeroCards />
         <HeroLast />
    </div>
  )
}
