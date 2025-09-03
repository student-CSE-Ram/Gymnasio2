import React from 'react'
import {MapPin,ThumbsUp,Heart} from 'lucide-react'
export default function HeroLast() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center mx-30 mt-40 mb-10 p-8 shadow-lg rounded-lg'>
        <div className='flex items-center gap-4'>
        <ThumbsUp className='h-12 w-12 text-sky-400 fill-sky-300'/>
            <div className='flex flex-col'>
            <h1 className='text-4xl font-bold'>99</h1>
            <p className='text-sm'>% Customer retention rate</p>
            </div>
        </div>

        <div className='flex items-center gap-4'>
        <Heart className='h-12 w-12 text-red-400 fill-red-400'/>
            <div className='flex flex-col'>
            <h1 className='text-4xl font-bold'>100+</h1>
            <p className='text-sm'>People trusted</p>
            </div>
        </div>

        <div className='flex items-center gap-4'>
            <MapPin className='h-12 w-12 text-orange-400 fill-orange-200'/>
            <div className='flex flex-col'>
            <h1 className='text-4xl font-bold'>PAN India</h1>
            <p className='text-sm'>Location</p>
            </div>
        </div>  
    </div>
  )
}
