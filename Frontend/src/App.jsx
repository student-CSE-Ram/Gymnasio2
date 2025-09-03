import React,{useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Pricing from './pages/Pricing'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import FreeTrial from './pages/FreeTrial'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './components/Footer'




export default function App() {

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true, // Animates only once
    });
  }, []);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/freetrial' element={<FreeTrial />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}
