import React from 'react'
import RevenueChart from '../../components/Charts/RevenueLines'
import MembersPlanChart from '../../components/Charts/MembersPie'
import RecentPaymentsTable from '../../components/Charts/PaymentsTable'

export default function Overview() {
  return (
    <div className="flex flex-col p-6">
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg hover:shadow-2xl bg-green-50 hover:scale-[1.02] transition-transform duration-300 ease-in-out">
          <h2 className="text-xl font-semibold mb-2">Total Members</h2>
          <p className="text-3xl font-bold text-indigo-600">150</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-2xl bg-green-50 hover:scale-[1.02] transition-transform duration-300 ease-in-out">
          <h2 className="text-xl font-semibold mb-2">Active Trainers</h2>
          <p className="text-3xl font-bold text-green-600">25</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-2xl bg-green-50 hover:scale-[1.02] transition-transform duration-300 ease-in-out">
          <h2 className="text-xl font-semibold mb-2">Monthly Revenue</h2>
          <p className="text-3xl font-bold text-yellow-600">$12,500</p>
        </div>

        {/* Charts - each in its own grid cell */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 hover:shadow-2xl bg-green-50 hover:scale-[1.02] transition-transform duration-300 ease-in-out">
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
