import React from 'react'
import Navbar from '../components/Navbar'
import TextPrice from '../components/Pricing/TextPrice'
import PriceCards from '../components/Pricing/PriceCards'
import HeroLast from '../components/Home/HeroLast'

export default function Pricing() {
  return (
    <div className='pt-20"'>
        <TextPrice />
        <div data-aos="fade-up">
          <PriceCards />
        </div>
        <HeroLast />
    </div>
    
  )
}
