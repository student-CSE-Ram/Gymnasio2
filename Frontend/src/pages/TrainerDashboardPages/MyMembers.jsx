import React from "react";
import { User, Dumbbell, CalendarDays, MessageCircle } from "lucide-react";

export default function TrainerMembersPage() {
  // Dummy data (replace with API later)
  const members = [
    {
      id: 1,
      name: "Aarav Sharma",
      plan: "Gold Plan",
      sessions: 12,
      progress: "Weight Loss",
      nextSession: "Sep 8, 7:00 AM",
    },
    {
      id: 2,
      name: "Neha Patel",
      plan: "Silver Plan",
      sessions: 8,
      progress: "Muscle Gain",
      nextSession: "Sep 9, 6:00 PM",
    },
    {
      id: 3,
      name: "Rohan Mehta",
      plan: "Platinum Plan",
      sessions: 15,
      progress: "Endurance",
      nextSession: "Sep 10, 8:00 AM",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold">My Members</h1>
        <p className="text-gray-500">Manage and track your assigned members</p>
      </header>

      {/* Members Table */}
      <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3">Name</th>
              <th className="py-3">Plan</th>
              <th className="py-3">Sessions</th>
              <th className="py-3">Progress</th>
              <th className="py-3">Next Session</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-b hover:bg-gray-50">
                <td className="py-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-500" />
                  {m.name}
                </td>
                <td className="py-3">{m.plan}</td>
                <td className="py-3">{m.sessions}</td>
                <td className="py-3">{m.progress}</td>
                <td className="py-3">{m.nextSession}</td>
                <td className="py-3 flex gap-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs flex items-center gap-1">
                    <Dumbbell className="w-4 h-4" /> Plan
                  </button>
                  <button className="px-3 py-1 bg-green-500 text-white rounded text-xs flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" /> Schedule
                  </button>
                  <button className="px-3 py-1 bg-amber-500 text-white rounded text-xs flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" /> Chat
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
