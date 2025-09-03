import React from 'react'

export default function TextPrice() {
  return (
    <div className='flex flex-col justify-center items-center mt-20 mb-10 gap-4'>
      <h1 className='text-4xl font-bold '>Choose Plan Thats Fit For you</h1>
      <p className='text-gray-600 text-lg'>
        All-In-One Gym Membership Management Software With Multiple
      </p>
      <p className='text-gray-600 text-lg'>
        Features Made for Gyms & Fitness Health Clubs.
      </p>
      <p className='text-3xl font-semibold'>Gym Software price</p>
      <button
        type='button'
        className='bg-amber-600 hover:bg-green-500 text-white px-4 py-2 rounded'>Annual plan</button>
    </div>
  )
}
