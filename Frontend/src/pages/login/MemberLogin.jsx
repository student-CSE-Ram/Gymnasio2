import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../api/authApi"; // <-- Make sure this API exists

export default function MemberLogin() {
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
      return alert("Please fill all the fields");
    }

    try {
      const data = await userLogin(formData); // <-- call your member login API

      // Save token + role in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userId", data.user._id);

      setStatus("success");

      // Navigate after success animation
      setTimeout(() => {
        navigate("/member-dashboard");
      }, 1200);
    } catch (err) {
      console.error("Login failed:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div
        className={`bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20 transition-all duration-500 ${
          status === "success"
            ? "border-green-500 shadow-green-400/40 scale-[1.03]"
            : status === "error"
            ? "border-red-500 shadow-red-400/40 animate-shake"
            : ""
        }`}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-lg">
          Member Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 ${
              loading
                ? "bg-blue-500 cursor-not-allowed"
                : status === "success"
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02]"
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

        {/* Extra */}
        <p className="text-gray-400 text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
