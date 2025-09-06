import React from "react";
import {
  CalendarDays,
  Dumbbell,
  Activity,
  CreditCard,
  Trophy,
} from "lucide-react";

export default function MemberOverview() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold">Welcome back, Siddharth 👋</h1>
        <p className="text-gray-500">Here’s an overview of your fitness journey</p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg text-center">
          <Dumbbell className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
          <p className="text-lg font-semibold">Gold Plan</p>
          <span className="text-gray-500 text-sm">Active Membership</span>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg text-center">
          <CalendarDays className="w-10 h-10 text-blue-500 mx-auto mb-2" />
          <p className="text-lg font-semibold">12 Sessions</p>
          <span className="text-gray-500 text-sm">This Month</span>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg text-center">
          <Activity className="w-10 h-10 text-amber-500 mx-auto mb-2" />
          <p className="text-lg font-semibold">5 Kg</p>
          <span className="text-gray-500 text-sm">Weight Loss</span>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg text-center">
          <CreditCard className="w-10 h-10 text-purple-500 mx-auto mb-2" />
          <p className="text-lg font-semibold">₹2,000</p>
          <span className="text-gray-500 text-sm">Next Due</span>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg">
        <h2 className="text-lg font-bold mb-4">Upcoming Sessions</h2>
        <ul className="space-y-3">
          <li className="flex justify-between items-center">
            <span>07:00 AM - Yoga with Priya</span>
            <span className="text-sm text-gray-500">Tomorrow</span>
          </li>
          <li className="flex justify-between items-center">
            <span>06:00 PM - Strength Training with Arjun</span>
            <span className="text-sm text-gray-500">Sep 8</span>
          </li>
          <li className="flex justify-between items-center">
            <span>08:00 AM - Cardio Blast with Ramesh</span>
            <span className="text-sm text-gray-500">Sep 9</span>
          </li>
        </ul>
      </div>

      {/* Achievements / Progress */}
      <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg">
        <h2 className="text-lg font-bold mb-4">Your Progress</h2>
        <div className="flex items-center space-x-6">
          <Trophy className="w-16 h-16 text-yellow-500" />
          <div>
            <p className="text-lg font-semibold">Milestone Unlocked 🎉</p>
            <p className="text-gray-600">You’ve completed 50 workouts!</p>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg">
        <h2 className="text-lg font-bold mb-4">Payment History</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2">Date</th>
              <th className="py-2">Plan</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Aug 1, 2025</td>
              <td className="py-2">Gold Plan</td>
              <td className="py-2">₹2,000</td>
              <td className="py-2 text-green-600 font-medium">Paid</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Jul 1, 2025</td>
              <td className="py-2">Gold Plan</td>
              <td className="py-2">₹2,000</td>
              <td className="py-2 text-green-600 font-medium">Paid</td>
            </tr>
            <tr>
              <td className="py-2">Jun 1, 2025</td>
              <td className="py-2">Gold Plan</td>
              <td className="py-2">₹2,000</td>
              <td className="py-2 text-green-600 font-medium">Paid</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
