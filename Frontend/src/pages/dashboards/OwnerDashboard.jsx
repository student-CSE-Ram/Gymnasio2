// src/pages/dashboards/OwnerDashboard.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";


// Import owner pages
import Overview from "../OwnerDashboardpages/Overview";
import ManageMembers from "../OwnerDashboardpages/ManageMember";
import ManageTrainers from "../OwnerDashboardpages/ManageTrainer";
import ManagePayments from "../OwnerDashboardpages/ManagePayments";
import ManagePlans from "../OwnerDashboardpages/ManagePlans";
import Reports from "../OwnerDashboardpages/Reports";

import SettingsPage from "./SettingPage";
import AttendancePage from "./Attendance";

export default function OwnerDashboard() {
  return (
    <div className="flex h-full">
      

      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        <Routes>
          <Route path="overview" element={<Overview />} />
          <Route path="manage-members" element={<ManageMembers />} />
          <Route path="manage-trainers" element={<ManageTrainers />} />
          <Route path="manage-payments" element={<ManagePayments />} />
          <Route path="manage-plans" element={<ManagePlans />} />
          <Route path="reports" element={<Reports />} />
          <Route path="attendance" element={<AttendancePage user={{role:"owner"}} />} />
          <Route path="settings" element={<SettingsPage role="owner" />} />

          {/* Default */}

          <Route path="*" element={<Overview />} />
        </Routes>
      </div>
    </div>
  );
}
