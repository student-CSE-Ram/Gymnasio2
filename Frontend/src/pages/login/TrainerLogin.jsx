import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GymnasioLogo from '/GymnasioBlackLogo.png'

export default function TrainerLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all the fields");
      return;
    }

    console.log("Trainer wants to login");
    navigate("/trainer-dashboard");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black p-4">
      {/* Left side branding*/}
      {/* Left Section - Branding */}
            <div className="hidden lg:flex flex-col justify-center items-center w-1/2 text-white px-12">
              <img src={GymnasioLogo} alt="Gymnasio Logo" className="w-32 h-32 object-contain rounded-full" />
              <h1 className="text-5xl font-extrabold mb-6 text-amber-600">Gymnasio</h1>
              <p className="text-lg text-gray-300 max-w-md text-center">
                Track your members with powerful tools for managing{" "}
                <span className="text-indigo-400 font-semibold">
                  Members, Workouts, Payments & Plans.
                </span>
              </p>
            </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center px-6 relative">
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-2">
          Trainer Login
        </h2>
        <p className="text-center text-gray-400 mb-6 text-sm">
          Login to manage your gym clients and workout schedules.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 text-white font-semibold rounded-lg shadow-md"
          >
            Login
          </button>
        </form>

        {/* Extra text */}
        <p className="mt-6 text-xs text-gray-500 text-center">
          Powered by <span className="text-indigo-400 font-semibold">Gymnasio</span>
        </p>
      </div>
      </div>
    </div>
  );
}