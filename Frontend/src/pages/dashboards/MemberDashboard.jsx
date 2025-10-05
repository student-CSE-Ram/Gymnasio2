import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Overview from '../MemberDashboardPages/Overview'
import Progress from '../MemberDashboardPages/Progress'
import MyPlans from '../MemberDashboardPages/MyPlans'
import Payments from '../MemberDashboardPages/Payments'
import SettingsPage from './SettingPage'
import AttendancePage from './Attendance'

export default function MemberDashboard() {
  return (
    <div className="flex h-full">
      

    {/* Content Area */}
    <div className="flex-1 p-6 bg-gray-100">
      <Routes>
        <Route path="overview" element={<Overview />} />
        <Route path="progress" element={<Progress />} />
        <Route path='attendance' element={<AttendancePage />} />
        <Route path="plan" element={<MyPlans />} />
        <Route path="payments" element={<Payments />} />
        <Route path="settings" element={<SettingsPage role='member' />} />


        {/* Default */}

        <Route path="*" element={<Overview />} />
      </Routes>
    </div>
  </div>
  )
}
