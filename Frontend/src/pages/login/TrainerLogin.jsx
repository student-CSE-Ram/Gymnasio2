import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GymnasioLogo from "/GymnasioBlackLogo.png";
import { userLogin } from "../../api/authApi";

export default function TrainerLogin() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    if (!formData.email || !formData.password) {
      setLoading(false);
      setStatus("error");
      return;
    }

    try {
      const data = await userLogin(formData);

      // Save token + role in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userId", data.user._id);

      setStatus("success");

      // Navigate after short delay for visual feedback
      setTimeout(() => {
        navigate("/trainer-dashboard");
      }, 1200);
    } catch (err) {
      console.error("Login failed:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black p-4">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 text-white px-12">
        <img
          src={GymnasioLogo}
          alt="Gymnasio Logo"
          className="w-32 h-32 object-contain rounded-full"
        />
        <h1 className="text-5xl font-extrabold mb-6 text-amber-600">
          Gymnasio
        </h1>
        <p className="text-lg text-gray-300 max-w-md text-center">
          Track your members with powerful tools for managing{" "}
          <span className="text-indigo-400 font-semibold">
            Members, Workouts, Payments & Plans.
          </span>
        </p>
      </div>

      {/* Right Section */}
      <div className="flex w-full lg:w-1/2 justify-center items-center px-6 relative">
        <div
          className={`relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 transition-all duration-500 ${
            status === "success"
              ? "border-green-500 shadow-green-400/40 scale-[1.03]"
              : status === "error"
              ? "border-red-500 shadow-red-400/40 animate-shake"
              : ""
          }`}
        >
          <h2 className="text-3xl font-bold text-center text-indigo-400 mb-2">
            Trainer Login
          </h2>
          <p className="text-center text-gray-400 mb-6 text-sm">
            Login to manage your gym clients and workout schedules.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
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
              disabled={loading}
              className={`w-full py-2.5 font-semibold rounded-lg shadow-md transition-all duration-300 ${
                loading
                  ? "bg-indigo-500 cursor-not-allowed"
                  : status === "success"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white hover:scale-[1.03]"
              }`}
            >
              {loading
                ? "Logging in..."
                : status === "success"
                ? "✅ Login Successful!"
                : "Login"}
            </button>
          </form>

          {/* Error message */}
          {status === "error" && (
            <p className="text-center text-red-400 mt-4 font-medium">
              ❌ Invalid credentials or network error
            </p>
          )}

          <p className="mt-6 text-xs text-gray-500 text-center">
            Powered by{" "}
            <span className="text-indigo-400 font-semibold">Gymnasio</span>
          </p>
        </div>
      </div>
    </div>
  );
}
