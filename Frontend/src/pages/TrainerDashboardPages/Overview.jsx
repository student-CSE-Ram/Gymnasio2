import React from 'react'
import RevenueChart from '../../components/Charts/RevenueLines'
import MembersPlanChart from '../../components/Charts/MembersPie'
import RecentPaymentsTable from '../../components/Charts/PaymentsTable'

export default function Overview() {
  return (
    <div className="flex flex-col p-6">
    <main className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-6">
      
      {/* Stats Cards */}
      <div className="bg-green-50 p-6 w-70 h-70 rounded-lg hover:shadow-2xl bg-green-50 hover:scale-[1.02] transition-transform duration-300 ease-in-out">
        <h2 className="text-xl font-semibold mb-2 ">Clients</h2>
        <p className="text-3xl font-bold text-indigo-600 ">15</p>
      </div>

      <div className=" w-70 h-70 bg-gradient-to-b from-fuchsia-50 via-fuchsia-100 to-fuchsia-200 p-6 rounded-lg shadow hover:shadow-2xl bg-green-50 hover:scale-[1.02] transition-transform duration-300 ease-in-out">
        <h2 className="text-xl font-semibold mb-2">Workout</h2>
        <p className="text-3xl font-bold text-green-600">5+</p>
      </div>

      <div className=" w-70 h-70 bg-green-50 p-6 rounded-lg shadow hover:shadow-2xl bg-green-50 hover:scale-[1.02] transition-transform duration-300 ease-in-out">
        <h2 className="text-xl font-semibold mb-2">Exercises</h2>
        <p className="text-3xl font-bold text-yellow-600">50</p>
      </div>

      <div className="bg-green-50 p-6 rounded-lg shadow hover:shadow-2xl bg-green-50 hover:scale-[1.02] transition-transform duration-300 ease-in-out">
        <h2 className="text-xl font-semibold mb-2">Attendence</h2>
        <p className="text-3xl font-bold text-yellow-600">12</p>
      </div>

      {/* Charts - each in its own grid cell */}
      <div className="bg-gradient-to-b from-fuchsia-50 via-fuchsia-100 to-fuchsia-200 col-span-1 md:col-span-2 lg:col-span-1 hover:shadow-2xl bg-green-50 hover:scale-[1.02] transition-transform duration-300 ease-in-out">
        <RevenueChart />
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-1 hover:shadow-2xl bg-green-50 hover:scale-[1.02] transition-transform duration-300 ease-in-out">
        <MembersPlanChart />
      </div>

      {/* Table - make it span full width on large screens */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 hover:shadow-2xl bg-green-50 hover:scale-[1.02] transition-transform duration-300 ease-in-out">
        <RecentPaymentsTable />
      </div>
    </main>
  </div>
  )
}
