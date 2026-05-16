import { useEffect, useMemo, useState } from "react";

import {
  CheckCircle,
  Clock,
  CreditCard,
  CalendarDays,
  AlertTriangle,
} from "lucide-react";

import { getMyPlans } from "../../api/planApi";

export default function MyPlansPage() {

  const [plans, setPlans] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchMyPlans();

  }, []);

  const fetchMyPlans = async () => {

    try {

      const data = await getMyPlans();

      console.log("MEMBERSHIP DATA:", data.plans);

      setPlans(data.plans || []);

    } catch (error) {

      console.error("Failed to fetch my plans", error);

    } finally {

      setLoading(false);
    }
  };

  // LATEST MEMBERSHIP ONLY
  const latestPlan = useMemo(() => {

    if (!plans.length) return null;

    return [...plans].sort(
      (a, b) =>
        new Date(b.start) - new Date(a.start)
    )[0];

  }, [plans]);

  // DAYS LEFT
  const calculateDaysLeft = (endDate) => {

    const diff =
      new Date(endDate).getTime() -
      new Date().getTime();

    return Math.max(
      Math.ceil(diff / (1000 * 60 * 60 * 24)),
      0
    );
  };

  // STATS
  const totalPlans = plans.length;

  const activePlans = plans.filter(
    (p) => p.status?.toLowerCase() === "active"
  ).length;

  const expiredPlans = plans.filter(
    (p) => p.status?.toLowerCase() === "expired"
  ).length;

  const cancelledPlans = plans.filter(
    (p) => p.status?.toLowerCase() === "cancelled"
  ).length;

  if (loading) {

    return (
      <div className="p-6 text-gray-500">
        Loading membership...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">

      {/* HEADER */}
      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          My Membership
        </h1>

        <p className="text-gray-500 mt-1">
          Track your active plan, membership history and status.
        </p>
      </div>

      {/* CANCELLED MEMBERSHIP */}
      {latestPlan?.status?.toLowerCase() === "cancelled" ? (

        <div className="bg-gradient-to-r from-red-500 to-red-700 text-white rounded-3xl p-8 shadow-xl">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium">

                <AlertTriangle className="w-4 h-4" />

                Membership Cancelled
              </div>

              <h2 className="text-4xl font-bold mt-5">
                Access Restricted
              </h2>

              <p className="text-red-100 mt-3 max-w-2xl leading-relaxed">

                Your membership has been cancelled by the gym owner.
                Please contact the gym administration for more details.

              </p>
            </div>

            <div className="bg-white/10 rounded-2xl px-6 py-5 backdrop-blur-md">

              <p className="text-red-100 text-sm">
                Membership Status
              </p>

              <h3 className="text-3xl font-bold mt-2">
                Cancelled
              </h3>
            </div>
          </div>
        </div>

      ) : latestPlan?.status?.toLowerCase() === "active" ? (

        /* ACTIVE MEMBERSHIP */
        <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-3xl p-8 shadow-xl">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

            <div className="space-y-4">

              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-1 rounded-full text-sm">

                <CheckCircle className="w-4 h-4" />

                Active Membership
              </div>

              <h2 className="text-4xl font-bold">
                {latestPlan.name}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-200">

                <div className="flex items-center gap-2">

                  <CalendarDays className="w-4 h-4" />

                  Start:
                  {" "}
                  {new Date(latestPlan.start).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2">

                  <Clock className="w-4 h-4" />

                  Ends:
                  {" "}
                  {new Date(latestPlan.end).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2">

                  <CreditCard className="w-4 h-4" />

                  Payment:
                  {" "}
                  Paid
                </div>

                <div className="flex items-center gap-2">

                  <AlertTriangle className="w-4 h-4" />

                  {calculateDaysLeft(latestPlan.end)}
                  {" "}
                  Days Remaining
                </div>
              </div>
            </div>

            {/* PRICE */}
            <div className="text-center md:text-right">

              <p className="text-gray-300 text-sm">
                Membership Price
              </p>

              <h3 className="text-5xl font-bold">
                ₹{latestPlan.price}
              </h3>

              <button
                disabled
                className="mt-5 bg-white/20 text-white px-6 py-3 rounded-xl font-semibold cursor-not-allowed"
              >
                Membership Active
              </button>
            </div>
          </div>
        </div>

      ) : (

        /* NO MEMBERSHIP */
        <div className="bg-white rounded-3xl shadow p-10 text-center border">

          <h2 className="text-2xl font-bold text-gray-800">
            No Active Membership
          </h2>

          <p className="text-gray-500 mt-2">
            Purchase a membership plan to access gym features,
            classes and attendance tracking.
          </p>

          <button className="mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
            Browse Plans
          </button>
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl p-6 shadow border">

          <p className="text-gray-500 text-sm">
            Total Memberships
          </p>

          <h3 className="text-3xl font-bold mt-2">
            {totalPlans}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow border">

          <p className="text-gray-500 text-sm">
            Active Plans
          </p>

          <h3 className="text-3xl font-bold mt-2 text-green-600">
            {activePlans}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow border">

          <p className="text-gray-500 text-sm">
            Expired Plans
          </p>

          <h3 className="text-3xl font-bold mt-2 text-red-500">
            {expiredPlans}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow border">

          <p className="text-gray-500 text-sm">
            Cancelled Plans
          </p>

          <h3 className="text-3xl font-bold mt-2 text-yellow-600">
            {cancelledPlans}
          </h3>
        </div>
      </div>

      {/* HISTORY */}
      <div className="bg-white rounded-3xl shadow border overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold text-gray-900">
            Membership History
          </h2>

          <p className="text-gray-500 mt-1">
            View all your current and previous plans.
          </p>
        </div>

        {plans.length === 0 ? (

          <div className="p-8 text-center text-gray-500">
            No membership history found.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-gray-100 text-gray-600">

                <tr>
                  <th className="text-left p-4">Plan</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Start Date</th>
                  <th className="text-left p-4">End Date</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>

              <tbody>

                {plans.map((plan) => (

                  <tr
                    key={plan._id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    <td className="p-4 font-medium text-gray-900">
                      {plan.name}
                    </td>

                    <td className="p-4 text-gray-700">
                      ₹{plan.price}
                    </td>

                    <td className="p-4 text-gray-600">
                      {new Date(plan.start).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-gray-600">
                      {new Date(plan.end).toLocaleDateString()}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          plan.status?.toLowerCase() === "active"
                            ? "bg-green-100 text-green-700"

                            : plan.status?.toLowerCase() === "cancelled"

                            ? "bg-yellow-100 text-yellow-700"

                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {plan.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}
      </div>
    </div>
  );
}