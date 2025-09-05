import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GymnasioLogo from "/GymnasioBlackLogo.png"; 

export default function OwnerLogin() {
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

    console.log("Owner wants to login");
    navigate("/owner-dashboard");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 text-white px-12">
        <img src={GymnasioLogo} alt="Gymnasio Logo" className="w-32 h-32 object-contain rounded-full" />
        <h1 className="text-5xl font-extrabold mb-6 text-amber-600">Gymnasio</h1>
        <p className="text-lg text-gray-300 max-w-md text-center">
          Take control of your gym with powerful tools for managing{" "}
          <span className="text-indigo-400 font-semibold">
            Members, Trainers, Payments & Plans.
          </span>
        </p>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex w-full lg:w-1/2 justify-center items-center px-6 relative">
        

        <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Owner Login
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-5 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-5 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-[1.03] transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Extra Options */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Forgot your password?{" "}
            <span className="text-indigo-400 hover:underline cursor-pointer">
              Reset here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
