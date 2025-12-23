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
  setStatus(null);

  if (!formData.email || !formData.password) {
    setStatus("error");
    return;
  }

  try {
    setLoading(true);

    const res = await userLogin(formData);

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
    <div className="flex min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black p-4">
      {/* Left Section */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 text-white px-12">
        <img
          src={GymnasioLogo}
          alt="Gymnasio Logo"
          className="w-32 h-32 rounded-full mb-4"
        />
        <h1 className="text-5xl font-extrabold mb-6 text-amber-600">
          Gymnasio
        </h1>
        <p className="text-lg text-gray-300 max-w-md text-center">
          Track your members with powerful tools for managing{" "}
          <span className="text-indigo-400 font-semibold">
            Members, Workouts, Payments & Plans
          </span>
          .
        </p>
      </div>

      {/* Right Section */}
      <div className="flex w-full lg:w-1/2 justify-center items-center px-6">
        <div
          className={`w-full max-w-md bg-white/10 backdrop-blur-xl border rounded-2xl shadow-2xl p-8 transition-all duration-300 ${
            status === "success"
              ? "border-green-500"
              : status === "error"
              ? "border-red-500"
              : "border-white/20"
          }`}
        >
          <h2 className="text-3xl font-bold text-center text-indigo-400 mb-2">
            Trainer Login
          </h2>
          <p className="text-center text-gray-400 mb-6 text-sm">
            Login to manage your gym clients and schedules.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {status === "error" && (
            <p className="text-center text-red-400 mt-4 font-medium">
              ❌ Invalid credentials or server error
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
