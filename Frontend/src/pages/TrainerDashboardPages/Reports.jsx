import React from "react";
import { BarChart3, Activity, CalendarDays } from "lucide-react";

export default function TrainerReportPage() {
  // Dummy report data
  const reports = [
    { id: 1, name: "Aarav Sharma", attendance: "85%", progress: "Lost 5kg", sessions: 20 },
    { id: 2, name: "Neha Patel", attendance: "92%", progress: "Muscle Gain 3kg", sessions: 15 },
    { id: 3, name: "Rohan Mehta", attendance: "78%", progress: "Improved Stamina", sessions: 18 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-gray-500">Overview of member performance and attendance</p>
      </header>

      {/* Report Table */}
      <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3">Member</th>
              <th className="py-3">Attendance</th>
              <th className="py-3">Sessions</th>
              <th className="py-3">Progress</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="py-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-500" /> {r.name}
                </td>
                <td className="py-3">{r.attendance}</td>
                <td className="py-3">{r.sessions}</td>
                <td className="py-3">{r.progress}</td>
                <td className="py-3">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs flex items-center gap-1">
                    <BarChart3 className="w-4 h-4" /> View Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
