// src/pages/dashboards/OwnerDashboard.jsx
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    // Optional: clear session storage if used
    sessionStorage.clear();

    navigate("/login/owner");
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-white shadow-md px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-800">🏋️‍♂️ Owner Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Dashboard Content */}
      <div className="flex flex-1 p-6">
        <div className="flex-1 bg-gray-50 rounded-xl shadow-inner p-4">
          <Routes>
            <Route path="overview" element={<Overview />} />
            <Route path="manage-members" element={<ManageMembers />} />
            <Route path="manage-trainers" element={<ManageTrainers />} />
            <Route path="manage-payments" element={<ManagePayments />} />
            <Route path="manage-plans" element={<ManagePlans />} />
            <Route path="reports" element={<Reports />} />
            <Route path="attendance" element={<AttendancePage user={{ role: "owner" }} />} />
            <Route path="settings" element={<SettingsPage role="owner" />} />
            <Route path="*" element={<Overview />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
