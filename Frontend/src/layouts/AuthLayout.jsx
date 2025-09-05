import React from 'react'
import { Outlet } from 'react-router-dom'
import OwnerLogin from '../pages/login/OwnerLogin'
import TrainerLogin from '../pages/login/trainerLogin'
import MemberLogin from '../pages/login/MemberLogin'

export default function AuthLayout() {
  return (
    <div>
       
<Outlet />
    </div>
  )
}
