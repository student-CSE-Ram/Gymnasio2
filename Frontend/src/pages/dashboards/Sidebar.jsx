import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  CalendarCheck,
  CreditCard,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const menuConfig = {
  Owner: [
    { name: "Overview", to: "overview", icon: <LayoutDashboard size={20} /> },
    { name: "Manage Members", to: "manage-members", icon: <Users size={20} /> },
    { name: "Manage Trainers", to: "manage-trainers", icon: <Dumbbell size={20} /> },
    { name: "Attendance", to: "attendance", icon: <CalendarCheck size={20} /> },
    { name: "Manage Payments", to: "manage-payments", icon: <CreditCard size={20} /> },
    { name: "Manage Plans", to: "manage-plans", icon: <ClipboardList size={20} /> },
    { name: "Reports", to: "reports", icon: <BarChart3 size={20} /> },
    { name: "Settings", to: "settings", icon: <Settings size={20} /> },
  ],
  Trainer: [
    { name: "Overview", to: "overview", icon: <LayoutDashboard size={20} /> },
    { name: "My Members", to: "my-members", icon: <Users size={20} /> },
    { name: "Schedule", to: "schedule", icon: <ClipboardList size={20} /> },
    { name: "Attendance", to: "attendance", icon: <CalendarCheck size={20} /> },
    { name: "Reports", to: "reports", icon: <BarChart3 size={20} /> },
    { name: "Settings", to: "settings", icon: <Settings size={20} /> },
  ],
  Member: [
    { name: "Overview", to: "overview", icon: <LayoutDashboard size={20} /> },
    { name: "My Plan", to: "plan", icon: <ClipboardList size={20} /> },
    { name: "Attendance", to: "attendance", icon: <CalendarCheck size={20} /> },
    { name: "Plans", to: "allplans", icon: <ClipboardList size={20} /> },
    { name: "Progress", to: "progress", icon: <BarChart3 size={20} /> },
    { name: "Settings", to: "settings", icon: <Settings size={20} /> },
  ],
};

export default function Sidebar({ role }) {
  const location = useLocation();
  const navigate = useNavigate();

  const basePath = `/${role.toLowerCase()}-dashboard`;
  const menuItems = menuConfig[role] || [];

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate(`/login/${role.toLowerCase()}`);
  };

  return (
    <aside className="flex flex-col h-screen w-64 bg-[#111827] text-gray-200 p-4">
      
      {/* Logo */}
      <Link
        to={basePath}
        className="flex items-center space-x-3 mb-10 hover:opacity-80 transition-opacity"
      >
        <img
          src="/GymnasioBlackLogo.png"
          alt="Gymnasio Logo"
          className="w-12 h-12 rounded-full"
        />
        <span className="text-2xl font-bold text-amber-600">
          Gymnasio
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2 flex-1">
        {menuItems.map((item, index) => {
          const fullPath = `${basePath}/${item.to}`;
          const isActive = location.pathname.startsWith(fullPath);

          return (
            <Link
              key={index}
              to={fullPath}
              className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="pt-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 p-2 w-full rounded-lg text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
