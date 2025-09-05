// import React from 'react'

// export default function Sidebar() {
//   return (
//     <div  className='flex flex-col h-screen bg-[#111827] text-gray-200 font-semibold p-4 w-64 space-y-4'>
        
//         <nav className='flex flex-col space-y-3'>
//         <span className='text-2xl font-bold mb-10 text-amber-600'>
//             <img src="/GymnasioBlackLogo.png" alt="Gymnasio Logo" className="w-14 h-14 inline-block mr-2 rounded-full " />
//             Gymnasio
//         </span>
//             <Link to="/owner-dashboard" className='hover:bg-gray-700 p-2 rounded-lg transition-colors'>Overview</Link>
//             <Link to="/manage-members" className='hover:bg-gray-700 p-2 rounded-lg transition-colors'>Manage Members</Link>
//             <Link to="/manage-trainers" className='hover:bg-gray-700 p-2 rounded-lg transition-colors'>Manage Trainers</Link>
//             <Link to="/manage-payments" className='hover:bg-gray-700 p-2 rounded-lg transition-colors'>Manage Payments</Link>
//             <Link to="/manage-plans" className='hover:bg-gray-700 p-2 rounded-lg transition-colors'>Manage Plans</Link>
//             <Link to="/reports" className='hover:bg-gray-700 p-2 rounded-lg transition-colors'>Reports</Link>
//             <Link to="/settings" className='hover:bg-gray-700 p-2 rounded-lg transition-colors'>Settings</Link>
//         </nav>
//     </div>
//   )
// }




import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  CreditCard,
  ClipboardList,
  BarChart3,
  Settings,
} from "lucide-react";
const menuConfig = {
  Owner: [
    { name: "Overview", to: `overview`, icon: <LayoutDashboard size={20} /> },
    { name: "Manage Members", to: "manage-members", icon: <Users size={20} /> },
    { name: "Manage Trainers", to: "manage-trainers", icon: <Dumbbell size={20} /> },
    { name: "Manage Payments", to: "manage-payments", icon: <CreditCard size={20} /> },
    { name: "Manage Plans", to: "manage-plans", icon: <ClipboardList size={20} /> },
    { name: "Reports", to: "reports", icon: <BarChart3 size={20} /> },
    { name: "Settings", to: "settings", icon: <Settings size={20} /> },
  ],
  Trainer: [
    { name: "Overview", to: "overview", icon: <LayoutDashboard size={20} /> },
    { name: "My Members", to: "my-members", icon: <Users size={20} /> },
    { name: "Schedule", to: "schedule", icon: <ClipboardList size={20} /> },
    { name: "Reports", to: "reports", icon: <BarChart3 size={20} /> },
    { name: "Settings", to: "settings", icon: <Settings size={20} /> },
  ],
  Member: [
    { name: "Overview", to: "overview", icon: <LayoutDashboard size={20} /> },
    { name: "My Plan", to: "plan", icon: <ClipboardList size={20} /> },
    { name: "Payments", to: "payments", icon: <CreditCard size={20} /> },
    { name: "Progress", to: "progress", icon: <BarChart3 size={20} /> },
    { name: "Settings", to: "settings", icon: <Settings size={20} /> },
  ],
};

export default function Sidebar({role}) {
  const location = useLocation();

  const basePath = `/${role.toLowerCase()}-dashboard`;
  
  const menuItems = menuConfig[role] || [];
  

  return (
    <div className="flex flex-col h-screen bg-[#111827] text-gray-200 font-semibold p-4 w-64">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-10">
      <Link 
    to="/" 
    className="flex items-center space-x-3 mb-10 hover:opacity-80 transition-opacity"
  >
    <img
      src="/GymnasioBlackLogo.png"
      alt="Gymnasio Logo"
      className="w-12 h-12 rounded-full"
    />
    <span className="text-2xl font-bold text-amber-600">Gymnasio</span>
  </Link>
        
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item, index) => {
          const fullPath = `${basePath}/${item.to}`.replace("//", "/");
          const isActive = location.pathname.startsWith(fullPath);

          return (
            <Link
              key={index}
              to={fullPath}
              className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}