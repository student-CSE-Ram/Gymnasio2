import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../api/authApi";


export default function ForgotPassword() {
const location = useLocation();

const initialEmail = location.state?.email || "";
const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "member";

  const roleConfig = {
    member: { label: "Member", accent: "#e63946", back: "/login/member" },
    owner: { label: "Owner", accent: "#2563eb", back: "/login/owner" },
    trainer: { label: "Trainer", accent: "#16a34a", back: "/login/trainer" },
  };

  const config = roleConfig[role] || roleConfig.member;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    setLoading(true);
    try {
      // await api.sendResetEmail({ email, role });

      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fp-page">
        <div className="fp-card">
          <h1 className="fp-title">Check your email</h1>
          <p className="fp-subtitle">
            We’ve sent a password reset link to <strong>{email}</strong>.
          </p>

          <button
            className="fp-btn-primary"
            style={{ "--accent": config.accent }}
            onClick={() => navigate(config.back)}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fp-page">
      <div className="fp-card">
        <h1 className="fp-title">Forgot Password?</h1>
        <p className="fp-subtitle">
          Enter the email linked to your <strong>{config.label}</strong> account.
          We’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="fp-form">
          <div className="fp-field">
            <label>Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
            {error && <span className="fp-error">{error}</span>}
          </div>

          <button
            type="submit"
            className="fp-btn-primary"
            style={{ "--accent": config.accent }}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <Link to={config.back} className="fp-back-link">
          ← Back to {config.label} Login
        </Link>
      </div>
    </div>
  );
}