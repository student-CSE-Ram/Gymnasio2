import { useLocation, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "your email";

  return (
    <div className="fp-page">
      <div className="fp-card">
        <h1 className="fp-title">Check your email</h1>

        <p className="fp-subtitle">
          We’ve sent a password reset link to <strong>{email}</strong>.
          Please check your inbox and click the link to reset your password.
        </p>

        <button
          className="fp-btn-primary"
          onClick={() => navigate("/login/member")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}