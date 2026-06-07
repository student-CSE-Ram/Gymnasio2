import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../pages/dashboards/Sidebar'
import Footer from '../components/Footer';
import { getMyProfile } from "../api/userApi";
import { getMyMemberships } from "../api/membershipApi";
import ProfileModal from "../pages/profile/ProfileModal";
import { Menu } from "lucide-react";
import {
  getAttendanceStats
} from "../api/attendanceApi";

export default function DashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
const [showProfile, setShowProfile] = useState(false);
const [user, setUser] = useState(null);
const [membership, setMembership] = useState(null);
const [attendanceStats,
  setAttendanceStats] =
  useState(null);
useEffect(() => {

  fetchProfile();
  fetchMembership();
  fetchAttendanceStats();

}, []);

const fetchProfile = async () => {

  try {

    const data =
      await getMyProfile();

    setUser(data.user);

  } catch (error) {

    console.error(
      "Profile fetch failed",
      error
    );
  }
};

const fetchMembership = async () => {

  try {

    const data = await getMyMemberships();

    const memberships =
      data.membership || [];

    if (memberships.length > 0) {

      const latestMembership =
        [...memberships].sort(
          (a, b) =>
            new Date(b.startDate) -
            new Date(a.startDate)
        )[0];

      setMembership(latestMembership);
    }

  } catch (error) {

    console.error(
      "Membership fetch failed",
      error
    );
  }
};
const fetchAttendanceStats =
  async () => {

    try {

      const data =
        await getAttendanceStats();

      setAttendanceStats(data);

    } catch (error) {

      console.error(
        "Attendance stats failed",
        error
      );
    }
  };

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
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-[#111827] text-gray-200 font-semibold p-4">
        <Sidebar role={context.role} />
      </aside>
      {sidebarOpen && (
  <div className="fixed inset-0 z-50 lg:hidden">

    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => setSidebarOpen(false)}
    />

    <div className="absolute left-0 top-0 h-full w-64 bg-[#111827]">

      <Sidebar role={context.role} />

    </div>

  </div>
)}

      {/* Main Section */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
<header className="bg-[#111827] text-gray-200 p-4 shadow-md fixed top-0 left-0 lg:left-64 right-0 z-10 flex items-center justify-between">
<div className="flex items-center gap-4">

  <button
    onClick={() => setSidebarOpen(true)}
    className="lg:hidden"
  >
    <Menu size={28} />
  </button>

  <div>
    <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
      {context.title} Dashboard
    </h1>

    <p className="text-gray-400 text-sm">
  Welcome back, {user?.name?.split(" ")[0] || context.role}!
</p>
  </div>

</div>
<button
  onClick={() => setShowProfile(true)}
  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-500 text-white font-bold text-lg flex items-center justify-center hover:bg-orange-600 transition"
>
   {user?.name?.[0]?.toUpperCase() || "U"}
  </button>

</header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pt-24 px-4 md:px-6 pb-6">
          {/* Responsive Grid Wrapper */}
          
            <Outlet context={context} />
          
        </main>
        
      </div>
<ProfileModal
  user={user}
  membership={membership}
  attendanceStats={attendanceStats}
  showProfile={showProfile}
  setShowProfile={setShowProfile}
/>
    </div>
  )
}
