import React from "react";

export default function OwnerProfile({
  user,
  showProfile,
  setShowProfile
}) {

  if (!showProfile) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

      <div className="bg-white rounded-3xl w-[95%] h-[90vh] overflow-y-auto p-8 relative">

        <button
          onClick={() => setShowProfile(false)}
          className="absolute top-6 right-6 text-3xl text-gray-500"
        >
          ×
        </button>

        <h1 className="text-4xl font-bold mb-8">
          Owner Profile
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="border rounded-3xl p-6">

            <div className="flex flex-col items-center">

              <div className="w-32 h-32 rounded-full bg-orange-500 flex items-center justify-center text-white text-5xl font-bold">
                {user?.name?.[0]?.toUpperCase()}
              </div>

              <h2 className="text-3xl font-bold mt-4">
                {user?.name}
              </h2>

              <p className="text-gray-500">
                {user?.email}
              </p>

            </div>

          </div>

          <div className="md:col-span-2 border rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Account Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="border rounded-xl p-4">
                <p className="text-gray-500">Role</p>
                <p className="font-semibold capitalize">
                  {user?.role}
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-500">Email</p>
                <p className="font-semibold">
                  {user?.email}
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-500">Joined As Owner</p>
                <p className="font-semibold">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}