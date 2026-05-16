
import React, { useEffect, useMemo, useState } from "react";

import {
  CalendarDays,
  Dumbbell,
  Activity,
  CreditCard,
  Trophy,
  User,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import { getMyMemberships } from "../../api/membershipApi";
import { getMyPayments } from "../../api/paymentApi";

export default function MemberOverview() {

const [memberships, setMemberships] = useState([]);
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    fetchDashboardData();

  }, []);

const fetchDashboardData = async () => {

  try {

    const membershipsData = await getMyMemberships();

    setMemberships(
      membershipsData.membership || []
    );

    try {

      const paymentsData = await getMyPayments();

      setPayments(
        paymentsData.payments || []
      );

    } catch (paymentError) {

      console.error(
        "Payment API failed",
        paymentError
      );

      setPayments([]);
    }

  } catch (error) {

    console.error(
      "Failed to load memberships",
      error
    );

  } finally {

    setLoading(false);
  }
};

  // Latest membership
  const latestMembership = useMemo(() => {

if (!memberships.length) return null;
return [...memberships].sort(
  (a, b) =>
    new Date(b.startDate) -
    new Date(a.startDate)
)[0];

  }, [memberships]);

  // Remaining days
const remainingDays =
  latestMembership?.endDate
    ? Math.max(
        0,
        Math.ceil(
          (
            new Date(
              latestMembership.endDate
            ) - new Date()
          ) /
          (1000 * 60 * 60 * 24)
        )
      )
    : 0;

  // Total amount spent
  const totalSpent = useMemo(() => {

    return payments.reduce(
      (acc, payment) => acc + Number(payment.amount || 0),
      0
    );

  }, [payments]);

  // Latest payment
  const latestPayment = payments[0];

  if (loading) {

    return (
      <div className="p-6 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name} 👋
          </h1>

          <p className="text-gray-500 mt-1">
            Here’s your real-time fitness dashboard overview.
          </p>
        </div>

        <div className="bg-black text-white px-5 py-3 rounded-2xl shadow-lg">

          <p className="text-sm text-gray-300">
            Current Membership
          </p>

          <h2 className="text-xl font-bold mt-1 capitalize">
            {latestMembership?.status || "No Membership"}
          </h2>
        </div>
      </header>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* MEMBERSHIP */}
        <div className="bg-white rounded-3xl p-6 shadow border hover:shadow-xl transition-all">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                Active Plan
              </p>

              <h2 className="text-2xl font-bold mt-2 text-gray-900">
{latestMembership?.plan?.name || "No Plan"}              </h2>
            </div>

            <div className="bg-emerald-100 p-3 rounded-2xl">
              <Dumbbell className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* REMAINING DAYS */}
        <div className="bg-white rounded-3xl p-6 shadow border hover:shadow-xl transition-all">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                Remaining Days
              </p>

              <h2 className="text-2xl font-bold mt-2 text-gray-900">
                {remainingDays}
              </h2>
            </div>

            <div className="bg-blue-100 p-3 rounded-2xl">
              <CalendarDays className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* TOTAL PAYMENTS */}
        <div className="bg-white rounded-3xl p-6 shadow border hover:shadow-xl transition-all">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                Total Spent
              </p>

              <h2 className="text-2xl font-bold mt-2 text-gray-900">
                ₹{totalSpent}
              </h2>
            </div>

            <div className="bg-purple-100 p-3 rounded-2xl">
              <CreditCard className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* MEMBERSHIP STATUS */}
        <div className="bg-white rounded-3xl p-6 shadow border hover:shadow-xl transition-all">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                Membership Status
              </p>

              <h2 className="text-2xl font-bold mt-2 capitalize text-gray-900">
                {latestMembership?.status || "None"}
              </h2>
            </div>

            <div
              className={`p-3 rounded-2xl ${
                latestMembership?.status === "active"
                  ? "bg-green-100"
                  : latestMembership?.status === "cancelled"
                  ? "bg-red-100"
                  : "bg-yellow-100"
              }`}
            >
              <Activity
                className={`w-8 h-8 ${
                  latestMembership?.status === "active"
                    ? "text-green-600"
                    : latestMembership?.status === "cancelled"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MEMBERSHIP ALERT */}
      {latestMembership?.status === "cancelled" && (

        <div className="bg-red-50 border border-red-200 rounded-3xl p-6 flex items-start gap-4">

          <div className="bg-red-100 p-3 rounded-2xl">
            <AlertTriangle className="text-red-600 w-8 h-8" />
          </div>

          <div>

            <h2 className="text-xl font-bold text-red-700">
              Membership Cancelled
            </h2>

            <p className="text-red-600 mt-2 leading-relaxed">
              Your membership has been cancelled by the gym owner.
              Please contact the administration for more information.
            </p>
          </div>
        </div>
      )}

      {/* MEMBERSHIP DETAILS */}
      <div className="bg-white rounded-3xl shadow border p-6">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold text-gray-900">
              Membership Overview
            </h2>

            <p className="text-gray-500 mt-1">
              Your current membership information.
            </p>
          </div>

          <div className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium capitalize">
            {latestMembership?.status || "No Membership"}
          </div>
        </div>

        {latestMembership ? (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-gray-50 rounded-2xl p-5 border">

              <div className="flex items-center gap-3 mb-3">
                <Dumbbell className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-gray-800">
                  Plan Name
                </h3>
              </div>

              <p className="text-2xl font-bold text-gray-900 capitalize">
                {latestMembership?.plan?.name}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border">

              <div className="flex items-center gap-3 mb-3">
                <Clock3 className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-800">
                  Duration
                </h3>
              </div>

              <p className="text-2xl font-bold text-gray-900">
{latestMembership?.plan?.durationInMonths || 0} Months              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border">

              <div className="flex items-center gap-3 mb-3">
                <CalendarDays className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-800">
                  Start Date
                </h3>
              </div>

              <p className="text-xl font-bold text-gray-900">
{latestMembership?.startDate
  ? new Date(
      latestMembership.startDate
    ).toLocaleDateString()
  : "N/A"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border">

              <div className="flex items-center gap-3 mb-3">
                <CreditCard className="w-5 h-5 text-pink-600" />
                <h3 className="font-semibold text-gray-800">
                  Expiry Date
                </h3>
              </div>

              <p className="text-xl font-bold text-gray-900">
{latestMembership?.endDate
  ? new Date(
      latestMembership.endDate
    ).toLocaleDateString()
  : "N/A"}
              </p>
            </div>
          </div>

        ) : (

          <div className="text-center py-12">

            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />

            <h3 className="text-xl font-bold text-gray-800">
              No Membership Found
            </h3>

            <p className="text-gray-500 mt-2">
              Purchase a plan to activate your gym membership.
            </p>
          </div>
        )}
      </div>

      {/* PAYMENT HISTORY */}
      <div className="bg-white rounded-3xl p-6 shadow border overflow-hidden">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold text-gray-900">
              Payment History
            </h2>

            <p className="text-gray-500 mt-1">
              Track all your completed payments.
            </p>
          </div>

          <div className="bg-gray-100 px-4 py-2 rounded-xl text-sm font-medium">
            {payments.length} Payments
          </div>
        </div>

        {payments.length === 0 ? (

          <div className="text-center py-10 text-gray-500">
            No payments found.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-gray-100 text-gray-600">

                <tr>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Plan</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>

              <tbody>

                {payments.map((payment) => (

                  <tr
                    key={payment.id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    <td className="p-4 text-gray-700">
                      {payment.date}
                    </td>

                    <td className="p-4 font-medium text-gray-900">
                      {payment.plan}
                    </td>

                    <td className="p-4 text-gray-700">
                      ₹{payment.amount}
                    </td>

                    <td className="p-4">

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold capitalize">
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PROGRESS SECTION */}
      <div className="bg-gradient-to-r from-black to-gray-800 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex items-center gap-5">

          <div className="bg-white/10 p-5 rounded-3xl">
            <Trophy className="w-16 h-16 text-yellow-400" />
          </div>

          <div>

            <h2 className="text-3xl font-bold">
              Keep Going 🚀
            </h2>

            <p className="text-gray-300 mt-2 max-w-2xl leading-relaxed">
              Stay consistent with your workouts and membership activity.
              Your fitness journey is being tracked in real time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
