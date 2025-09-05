import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from '../pages/Home'
import Blog from '../pages/Blog'
import Pricing from '../pages/Pricing'
import Contact from '../pages/Contact'
import FreeTrial from '../pages/FreeTrial'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MainLayout() {
  return (
    <div>
        <Navbar />
        <main>
        <Outlet />
        </main>
        <Footer />
        
        
    </div>
  )
}
