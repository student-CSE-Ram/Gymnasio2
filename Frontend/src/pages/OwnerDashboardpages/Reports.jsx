import React from 'react'
import MembersPlanChart from '../../components/Charts/MembersPie'
import RecentPaymentsTable from '../../components/Charts/PaymentsTable'

import RevenueChart from '../../components/Charts/RevenueLines'

export default function Reports() {
  return (
    <div className='flex flex-col gap-8'>
        <MembersPlanChart />
        <RevenueChart />
        <RecentPaymentsTable />
    </div>
  )
}
