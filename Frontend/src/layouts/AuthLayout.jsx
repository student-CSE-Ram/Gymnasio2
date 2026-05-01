import React from 'react'
import { Outlet } from 'react-router-dom'
import OwnerLogin from '../pages/login/OwnerLogin'
import TrainerLogin from '../pages/login/TrainerLogin.jsx'
import MemberLogin from '../pages/login/MemberLogin'

export default function AuthLayout() {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden">
      <Outlet />
    </div>
  );
}
