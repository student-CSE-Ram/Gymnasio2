import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../pages/dashboards/Sidebar'
import Footer from '../components/Footer';

export default function DashboardLayout() {
  const location = useLocation();

  // Dynamic dashboard context
  let context = { title: "", role: "" };
  if (location.pathname.includes("owner-dashboard")) {
    context = { title: "Owner", role: "Owner" };
  } else if (location.pathname.includes("trainer-dashboard")) {
    context = { title: "Trainer", role: "Trainer" };
  } else if (location.pathname.includes("member-dashboard")) {
    context = { title: "Member", role: "Member" };
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#111827] text-gray-200 font-semibold p-4">
        <Sidebar role={context.role} />
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <header className="bg-[#111827] text-gray-200 p-4 shadow-md fixed top-0 left-64 right-0 z-10 flex flex-col">
          <h1 className="text-2xl font-bold">{context.title} Dashboard</h1>
          <p className="text-gray-400 text-sm">Welcome back, {context.role}!</p>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pt-24 px-6 pb-6">
          {/* Responsive Grid Wrapper */}
          
            <Outlet context={context} />
          
        </main>
        
      </div>
    </div>
  )
}
