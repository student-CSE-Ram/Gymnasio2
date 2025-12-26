import { useEffect, useState } from "react";
import RevenueChart from "../../components/Charts/RevenueLines";
import MembersPlanChart from "../../components/Charts/MembersPie";
import RecentPaymentsTable from "../../components/Charts/PaymentsTable";
import { getOwnerOverview } from "../../api/ownerDashboardApi";

export default function Overview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getOwnerOverview();
    setStats(data);
  };

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className="flex flex-col p-6">
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Total Members */}
        <div className="bg-white p-6 rounded-lg hover:shadow-2xl bg-green-50 hover:scale-[1.02] transition">
          <h2 className="text-xl font-semibold mb-2">Total Members</h2>
          <p className="text-3xl font-bold text-indigo-600">
            {stats.totalMembers}
          </p>
        </div>

        {/* Trainers */}
        <div className="bg-white p-6 rounded-lg hover:shadow-2xl bg-green-50 hover:scale-[1.02] transition">
          <h2 className="text-xl font-semibold mb-2">Active Trainers</h2>
          <p className="text-3xl font-bold text-green-600">
            {stats.totalTrainers}
          </p>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white p-6 rounded-lg hover:shadow-2xl bg-green-50 hover:scale-[1.02] transition">
          <h2 className="text-xl font-semibold mb-2">Monthly Revenue</h2>
          <p className="text-3xl font-bold text-yellow-600">
            ₹{stats.monthlyRevenue}
          </p>
        </div>

        {/* Charts */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <RevenueChart />
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <MembersPlanChart />
        </div>

        {/* Recent Payments */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <RecentPaymentsTable />
        </div>

      </main>
    </div>
  );
}
