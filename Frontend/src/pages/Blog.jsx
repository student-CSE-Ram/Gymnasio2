import React from 'react'
import BlogHero from '../components/Blog/BlogHero'
import BlogMain from '../components/Blog/BlogMain'

export default function Blog() {
  return (
    <div>
        <div>
        < BlogHero />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl mb-8 mt-10 font-bold text-center">
            Get to know more about <span className="text-amber-600">Gymnasio BLOG</span>
          </h2>
          <BlogMain />
        </div>
    </div>
    
  )
}
