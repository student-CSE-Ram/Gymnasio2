import React from 'react'
import BlogImg1 from '/BlogHero.png'
export default function BlogHero() {

  return (
    <div className=' max-w-6xl mt-20 mx-auto py-5 '>    
        
            <img src={BlogImg1} alt="Blog Hero" className=" m-auto object-cover shadow-lg rounded-md"/>

    </div>
  )
}
