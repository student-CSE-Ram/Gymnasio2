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
import OwnerLogin from './pages/login/OwnerLogin'
import MemberLogin from './pages/login/MemberLogin'
import OwnerDashboard from './pages/dashboards/OwnerDashboard'
import TrainerDashboard from './pages/dashboards/TrainerDashboard'
import MemberDashboard from './pages/dashboards/MemberDashboard'
import TrainerLogin from './pages/login/trainerLogin'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'




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
        {/* <Navbar /> */}
        <Routes>
          <Route element={<MainLayout />}>
             <Route path='/' element={<Home />} />
             <Route path='/pricing' element={<Pricing />} />
             <Route path='/blog' element={<Blog />} />
             <Route path='/contact' element={<Contact />} />
             <Route path='/freetrial' element={<FreeTrial />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path='/login/owner' element={<OwnerLogin />} />
            <Route path='/login/trainer' element={<TrainerLogin />} />
            <Route path='/login/member' element={<MemberLogin />} />
          </Route>
          <Route element={<DashboardLayout />}>
              <Route path='/owner-dashboard/*' element={<OwnerDashboard />} />
              <Route path='/trainer-dashboard/*' element={<TrainerDashboard />}/>
              <Route path='/member-dashboard/*' element={<MemberDashboard />}  />
          </Route>

          
          
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  )
}
