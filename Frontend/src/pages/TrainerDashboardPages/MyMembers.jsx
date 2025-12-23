import React, { useEffect, useState } from "react";
import {
  User,
  Dumbbell,
  CalendarDays,
  MessageCircle,
} from "lucide-react";
import { getTrainerMembers } from "../../api/ownerapi";

export default function TrainerMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await getTrainerMembers();
        setMembers(res || []);
      } catch (err) {
        console.error("Failed to fetch trainer members", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <div className="p-6">Loading members...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold">My Members</h1>
        <p className="text-gray-500">
          Members assigned to you by the owner
        </p>
      </header>

      {/* Table */}
      <div className="bg-white rounded-2xl p-6 shadow">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3">Name</th>
              <th className="py-3">Email</th>
              <th className="py-3">Joined</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">
                  No members assigned yet
                </td>
              </tr>
            ) : (
              members.map((m) => (
                <tr key={m._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 flex items-center gap-2">
                    <User className="w-5 h-5 text-emerald-500" />
                    {m.name}
                  </td>
                  <td className="py-3">{m.email}</td>
                  <td className="py-3">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
