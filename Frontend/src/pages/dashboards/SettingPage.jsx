import React from "react";

export default function SettingsPage({ role = "Trainer" }) {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold">Settings ⚙️</h1>
        <p className="text-gray-500">Manage your account and preferences</p>
      </header>

      {/* Profile Settings */}
      <section className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              defaultValue="Alex Johnson"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-emerald-300"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              defaultValue="alex@gym.com"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-emerald-300"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Phone</label>
            <input
              type="text"
              defaultValue="+91 9876543210"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-emerald-300"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Role</label>
            <input
              type="text"
              value={role}
              readOnly
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </section>

      {/* Security Settings */}
      <section className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Security</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600">Change Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-emerald-300"
            />
          </div>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
            Update Password
          </button>
        </div>
      </section>

      {/* Role-Specific Settings */}
      {role === "Trainer" && (
        <section className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Trainer Settings</h2>
          <div>
            <label className="block text-sm text-gray-600">Availability</label>
            <input
              type="text"
              placeholder="Mon-Fri, 7AM - 5PM"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-emerald-300"
            />
          </div>
        </section>
      )}

      {role === "Owner" && (
        <section className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Owner Settings</h2>
          <div>
            <label className="block text-sm text-gray-600">Gym Name</label>
            <input
              type="text"
              defaultValue="Gymnasio Pro"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-emerald-300"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Business Contact</label>
            <input
              type="text"
              placeholder="+91 9988776655"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-emerald-300"
            />
          </div>
        </section>
      )}

      {role === "Member" && (
        <section className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Membership</h2>
          <p className="text-gray-600">Your current plan: <b>Gold Plan</b></p>
          <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
            Upgrade Plan
          </button>
        </section>
      )}

      {/* Danger Zone */}
      <section className="bg-white rounded-2xl shadow p-6 space-y-4 border border-red-300">
        <h2 className="text-lg font-semibold text-red-600 border-b pb-2">Danger Zone</h2>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
          Delete Account
        </button>
      </section>
    </div>
  );
}
