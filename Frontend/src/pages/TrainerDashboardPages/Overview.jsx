import React from "react";
import {
  CalendarDays,
  Users,
  Dumbbell,
  BarChart3,
  DollarSign,
  Bell,
} from "lucide-react";

export default function TrainerDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Alex 👋</h1>
          <p className="text-gray-500">Here’s what’s happening today</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition">
          <Bell className="w-4 h-4" />
          <span>Notifications</span>
        </button>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg text-center">
          <CalendarDays className="w-10 h-10 text-blue-500 mx-auto mb-2" />
          <p className="text-lg font-semibold">5 Sessions</p>
          <span className="text-gray-500 text-sm">Today</span>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg text-center">
          <Users className="w-10 h-10 text-green-500 mx-auto mb-2" />
          <p className="text-lg font-semibold">20 Clients</p>
          <span className="text-gray-500 text-sm">Active</span>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg text-center">
          <Dumbbell className="w-10 h-10 text-amber-500 mx-auto mb-2" />
          <p className="text-lg font-semibold">15 Plans</p>
          <span className="text-gray-500 text-sm">Assigned</span>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg text-center">
          <DollarSign className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
          <p className="text-lg font-semibold">₹12,500</p>
          <span className="text-gray-500 text-sm">This Month</span>
        </div>
      </div>

      {/* Schedule + Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schedule */}
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg">
          <h2 className="text-lg font-bold mb-4">Today’s Schedule</h2>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span>07:00 AM - John Doe (Strength Training)</span>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                View
              </button>
            </li>
            <li className="flex justify-between items-center">
              <span>09:00 AM - Sarah Smith (Cardio)</span>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                View
              </button>
            </li>
            <li className="flex justify-between items-center">
              <span>11:00 AM - Mike Johnson (CrossFit)</span>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                View
              </button>
            </li>
          </ul>
        </div>

        {/* Clients */}
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg">
          <h2 className="text-lg font-bold mb-4">Active Clients</h2>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span>Jane Doe</span>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">
                Details
              </button>
            </li>
            <li className="flex justify-between items-center">
              <span>Mark Lee</span>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">
                Details
              </button>
            </li>
            <li className="flex justify-between items-center">
              <span>Emma Brown</span>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">
                Details
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg">
        <h2 className="text-lg font-bold mb-4">Client Progress Overview</h2>
        <div className="flex justify-center items-center">
          <BarChart3 className="w-32 h-32 text-purple-500" />
          <p className="ml-6 text-gray-600">
            Track clients’ weight, BMI, and workout completion here.
          </p>
        </div>
      </div>
    </div>
  );
}
