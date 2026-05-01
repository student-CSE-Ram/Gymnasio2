import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import GymnasioLogo from "/GymnasioBlackLogo.png";
import { userLogin } from "../../api/authApi";

export default function MemberLogin() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
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
    <div className="flex w-full min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800">
      
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
          Stay on track with your fitness journey. Access your{" "}
          <span className="text-blue-400 font-semibold">
            Workouts, Plans, and Progress
          </span>{" "}
          all in one place.
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
          <h2 className="text-3xl font-bold text-center text-blue-400 mb-2">
            Member Login
          </h2>

          <p className="text-center text-gray-400 mb-6 text-sm">
            Login to access your workouts and plans.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 mt-2 font-semibold rounded-lg transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Error */}
          {status === "error" && (
            <p className="text-center text-red-400 mt-4 font-medium">
              ❌ Invalid credentials or server error
            </p>
          )}

          {/* 🔥 Forgot Password FIX */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Forgot your password?{" "}
            <Link
              to="/forgot-password?role=member"
              state={{ email: formData.email }}
              className="text-blue-400 hover:underline"
            >
              Reset here
            </Link>
          </p>

          {/* Register */}
          <p className="text-gray-400 text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <span className="text-blue-400 hover:underline cursor-pointer">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}