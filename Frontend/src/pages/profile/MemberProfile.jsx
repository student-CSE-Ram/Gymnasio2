import React, {useState,useEffect} from "react";
import QRCode from "react-qr-code";
// import {} from '../../api/attendanceApi'

export default function MemberProfile({
  user,
  membership,
  attendanceStats,
  showProfile,
  setShowProfile,
})
{
    
  if (!showProfile) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

     <div className="bg-white rounded-none lg:rounded-3xl w-full h-full lg:w-[95%] lg:h-[90vh] overflow-y-auto relative p-4 md:p-6 lg:p-8">

        {/* Close Button */}
        <button
          onClick={() => setShowProfile(false)}
          className="absolute top-6 right-6 text-gray-500 text-3xl"
        >
          ×
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Profile
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage your profile and membership details
          </p>
        </div>

        {/* Main Grid */}
       <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* LEFT PANEL */}
          <div className="xl:col-span-3">

            <div className="bg-gray-50 rounded-3xl p-6 border h-full">

              <div className="flex flex-col items-center">

                <div className="w-36 h-36 rounded-full bg-orange-500 flex items-center justify-center text-white text-6xl font-bold">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>

                <h2 className="text-3xl font-bold mt-6">
                  {user?.name}
                </h2>

                <p className="text-gray-500 mt-2">
                  {user?.email}
                </p>

                <span className="mt-4 px-4 py-2 rounded-full bg-orange-100 text-orange-700">
                  {user?.role}
                </span>

              </div>

              <hr className="my-8" />

              <div className="space-y-6">

                <div>
                  <p className="text-gray-500 text-sm">
                    Member Since
                  </p>

                  <p className="font-semibold">
                    {user?.createdAt
                      ? new Date(
                          user.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                {user?.assignedTrainer && (
                  <div>
                    <p className="text-gray-500 text-sm">
                      Assigned Trainer
                    </p>

                    <p className="font-semibold">
                      {user.assignedTrainer.name}
                    </p>
                  </div>
                )}

              </div>

            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="xl:col-span-9 space-y-6">

            {/* Membership Card */}
            <div className="
rounded-3xl
bg-gradient-to-r
from-[#111827]
via-[#1f2937]
to-[#111827]
text-white
p-8
shadow-2xl
">

              <h2 className="text-orange-500 text-4xl font-bold">
                GYMNASIO
              </h2>

              <p className="text-gray-400 mt-1">
                FITNESS • STRENGTH • LIFESTYLE
              </p>

              <div className="mt-8">

                <p className="text-gray-400">
                  CURRENT MEMBERSHIP
                </p>

                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-2">
                  {membership?.plan?.name || "No Plan"}
                </h3>

                <div className="inline-block mt-4 px-4 py-2 rounded-full bg-green-500/20 text-green-400">
                  {membership?.status || "N/A"}
                </div>

              </div>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

              <div className="border rounded-2xl p-5">
                <p className="text-gray-500 text-sm">
                  Duration
                </p>

                <p className="font-bold text-xl">
                  {membership?.plan?.durationInMonths || 0} Months
                </p>
              </div>

              <div className="border rounded-2xl p-5">
                <p className="text-gray-500 text-sm">
                  Amount Paid
                </p>

                <p className="font-bold text-xl">
                  ₹{membership?.plan?.price || 0}
                </p>
              </div>

              <div className="border rounded-2xl p-5">
                <p className="text-gray-500 text-sm">
                  Daily Check-ins
                </p>

                <p className="font-bold text-xl">
                  {membership?.plan?.dailyCheckinLimit}
                </p>
              </div>

              <div className="border rounded-2xl p-5">
                <p className="text-gray-500 text-sm">
                  Status
                </p>

                <p className="font-bold text-xl capitalize">
                  {membership?.status}
                </p>
              </div>

            </div>
            {/* Bottom Section */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

  {/* Attendance */}
  <div className="border rounded-3xl p-6 bg-white shadow-sm">

    <h3 className="text-2xl font-bold mb-6">
      Attendance Overview
    </h3>

    <div className="flex items-center justify-center">

      <div className="w-44 h-44 rounded-full border-[12px] border-orange-500 flex items-center justify-center">

        <div className="text-center">

        <h2 className="text-4xl font-bold">
  {attendanceStats?.totalVisits || 0}
</h2>

          <p className="text-gray-500">
            Total Visits
          </p>

        </div>

      </div>

    </div>

    <div className="mt-8 space-y-4">

      <div className="flex justify-between">
        <span className="text-gray-500">
          Last Visit
        </span>

        <span>
          {attendanceStats?.lastVisit
 ? new Date(
     attendanceStats.lastVisit
   ).toLocaleDateString()
 : "N/A"}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">
          Current Status
        </span>

        <span className="text-green-600 font-semibold">
          {attendanceStats?.currentStatus ||
 "Checked Out"}
        </span>
      </div>

    </div>

  </div>

  {/* QR Section */}
  <div className="border rounded-3xl p-6 bg-white shadow-sm">

    <h3 className="text-2xl font-bold mb-6">
      Membership QR
    </h3>

    <div className="flex justify-center">

      <div className="bg-white p-4 border rounded-2xl">

        <QRCode
  value={user?._id || ""}
  size={180}
/>

      </div>

    </div>

    <p className="text-center text-gray-500 mt-4">
      Scan this QR for attendance
    </p>

  </div>

  {/* Additional Info */}
  <div className="border rounded-3xl p-6 bg-white shadow-sm">

    <h3 className="text-2xl font-bold mb-6">
      Additional Information
    </h3>

    <div className="space-y-4">

      <div className="flex justify-between">
        <span className="text-gray-500">
          Assigned Trainer
        </span>

        <span className="font-semibold">
          {user?.assignedTrainer?.name || "N/A"}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">
          Email
        </span>

        <span className="font-semibold">
          {user?.email}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">
          Member Since
        </span>

        <span className="font-semibold">
          {user?.createdAt
            ? new Date(
                user.createdAt
              ).toLocaleDateString()
            : "N/A"}
        </span>
      </div>

    </div>

  </div>

</div>

          </div>

        </div>

      </div>

    </div>
  );
}