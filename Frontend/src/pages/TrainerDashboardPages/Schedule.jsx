import React from "react";
import { CalendarDays, Clock, User } from "lucide-react";

export default function TrainerSchedulePage() {
  // Dummy schedule
  const schedule = [
    { id: 1, member: "Aarav Sharma", session: "Strength Training", date: "Sep 8", time: "7:00 AM" },
    { id: 2, member: "Neha Patel", session: "Cardio Blast", date: "Sep 8", time: "6:00 PM" },
    { id: 3, member: "Rohan Mehta", session: "Yoga", date: "Sep 9", time: "8:00 AM" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold">My Schedule</h1>
        <p className="text-gray-500">View and manage your upcoming training sessions</p>
      </header>

      {/* Schedule List */}
      <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg space-y-4">
        {schedule.map((s) => (
          <div
            key={s.id}
            className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0"
          >
            <div>
              <p className="font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-500" /> {s.member}
              </p>
              <p className="text-gray-500 text-sm">{s.session}</p>
            </div>
            <div className="text-right">
              <p className="flex items-center gap-1 text-sm text-gray-700">
                <CalendarDays className="w-4 h-4" /> {s.date}
              </p>
              <p className="flex items-center gap-1 text-sm text-gray-700">
                <Clock className="w-4 h-4" /> {s.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
