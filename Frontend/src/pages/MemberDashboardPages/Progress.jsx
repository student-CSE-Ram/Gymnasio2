import React from "react";
import { Trophy, Activity } from "lucide-react";

export default function MyProgressPage() {
  const progress = [
    { id: 1, date: "Aug 2025", detail: "Lost 5kg weight" },
    { id: 2, date: "Jul 2025", detail: "Bench Press increased by 10kg" },
    { id: 3, date: "Jun 2025", detail: "Completed 40 workout sessions" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Progress</h1>
      <p className="text-gray-500">Track your fitness achievements and milestones</p>

      {/* Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg space-y-4">
        <h2 className="text-lg font-semibold mb-2">Achievements</h2>
        {progress.map((p) => (
          <div key={p.id} className="flex items-center gap-3 border-b pb-2 last:border-0 last:pb-0">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <div>
              <p className="font-medium">{p.detail}</p>
              <p className="text-sm text-gray-500">{p.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Example */}
      <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Stats</h2>
        <div className="flex justify-around">
          <div className="text-center">
            <Activity className="w-8 h-8 text-emerald-500 mx-auto" />
            <p className="text-lg font-bold">50</p>
            <p className="text-sm text-gray-500">Total Workouts</p>
          </div>
          <div className="text-center">
            <Activity className="w-8 h-8 text-blue-500 mx-auto" />
            <p className="text-lg font-bold">120km</p>
            <p className="text-sm text-gray-500">Run Distance</p>
          </div>
          <div className="text-center">
            <Activity className="w-8 h-8 text-red-500 mx-auto" />
            <p className="text-lg font-bold">35 hrs</p>
            <p className="text-sm text-gray-500">Training Time</p>
          </div>
        </div>
      </div>
    </div>
  );
}
