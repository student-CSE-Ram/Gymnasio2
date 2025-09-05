import React from 'react'
import { Routes, Route } from "react-router-dom";

import Overview from '../TrainerDashboardPages/Overview'
import MyMembers from '../TrainerDashboardPages/MyMembers'
import Schedule from '../TrainerDashboardPages/Schedule'
import Reports from '../TrainerDashboardPages/Reports'
import Settings from '../TrainerDashboardPages/Settings'

export default function TrainerDashboard() {
  return (
    <div className="flex h-full">
      

      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        <Routes>
          <Route path="overview" element={<Overview />} />
          <Route path="my-members" element={<MyMembers />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />


          {/* Default */}

          <Route path="*" element={<Overview />} />
        </Routes>
      </div>
    </div>
  )
}
