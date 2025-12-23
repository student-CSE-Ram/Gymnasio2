import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GymnasioLogo from "/GymnasioBlackLogo.png";
import { ownerLogin } from "../../api/authApi";

export default function OwnerLogin() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus(null);

  if (!formData.email || !formData.password) {
    setStatus("error");
    return;
  }

  try {
    setLoading(true);

    const res = await ownerLogin(formData);

    // Save auth state in localStorage
    localStorage.setItem("token", res.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: res.user._id,
        name: res.user.name,
        role: res.user.role,
      })
    );

    setStatus("success");

    // Navigate to proper dashboard based on role
    const role = res.user.role.toLowerCase();
    navigate(`/${role}-dashboard/overview`);
  } catch (err) {
    console.error("Login failed:", err);
    setStatus("error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black">
      {/* Left Section */}
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
          Take control of your gym with tools for managing{" "}
          <span className="text-indigo-400 font-semibold">
            Members, Trainers, Payments & Plans.
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
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Owner Login
          </h2>

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
              disabled={loading}
              className={`w-full py-3 mt-4 font-semibold rounded-lg shadow-lg transform transition duration-300 ${
                loading
                  ? "bg-indigo-500 cursor-not-allowed"
                  : status === "success"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-[1.03]"
              }`}
            >
              {loading
                ? "Logging in..."
                : status === "success"
                ? "✅ Login Successful!"
                : "Login"}
            </button>
          </form>

          {/* Error Text */}
          {status === "error" && (
            <p className="text-center text-red-400 mt-4 font-medium">
              ❌ Invalid credentials or network error
            </p>
          )}

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
