import { useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import "./ForgotPassword.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "member";

  const roleConfig = {
    member: { label: "Member", accent: "#e63946", loginPath: "/login/member" },
    owner: { label: "Owner", accent: "#2563eb", loginPath: "/login/owner" },
    trainer: { label: "Trainer", accent: "#16a34a", loginPath: "/login/trainer" },
  };

  const config = roleConfig[role] || roleConfig.member;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or expired reset link.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // await api.resetPassword({ token, newPassword: password, role });

      await new Promise((r) => setTimeout(r, 1200));

      setSuccess(true);
    } catch {
      setError("Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fp-page">
        <div className="fp-card">
          <h1 className="fp-title">Password Reset!</h1>
          <p className="fp-subtitle">
            Your password has been updated successfully.
          </p>

          <button
            className="fp-btn-primary"
            style={{ "--accent": config.accent }}
            onClick={() => navigate(config.loginPath)}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fp-page">
      <div className="fp-card">
        <h1 className="fp-title">Set New Password</h1>

        <form onSubmit={handleSubmit} className="fp-form">
          <div className="fp-field">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Min 8 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="fp-field">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter password"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                setError("");
              }}
            />
          </div>

          {error && <span className="fp-error">{error}</span>}

          <button
            type="submit"
            className="fp-btn-primary"
            style={{ "--accent": config.accent }}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}