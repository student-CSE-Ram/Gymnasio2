import {React,useEffect} from 'react'
import { Routes, Route,useNavigate } from "react-router-dom";

import Overview from '../TrainerDashboardPages/Overview'
import MyMembers from '../TrainerDashboardPages/MyMembers'
import Schedule from '../TrainerDashboardPages/Schedule'
import Reports from '../TrainerDashboardPages/Reports'
import SettingsPage from './SettingPage';
import AttendancePage from './Attendance';

export default function TrainerDashboard() {
    const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    // Optional: clear session storage if used
    sessionStorage.clear();

    navigate("/login/trainer");
  };

  // When the tab closes or refreshes, remove token
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <div className="flex h-full">

      
      

      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        <Routes>
          <Route path="overview" element={<Overview />} />
          <Route path="my-members" element={<MyMembers />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="reports" element={<Reports />} />
          <Route path="attendance" element={<AttendancePage user={{role:"trainer"}} />} />
          <Route path="settings" element={<SettingsPage />} />


          {/* Default */}

          <Route path="*" element={<Overview />} />
        </Routes>
      </div>
    </div>
  )
}
