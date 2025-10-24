import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roleRequired }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && (!roleRequired || role === roleRequired)) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }

    // Small delay to prevent flicker (optional but useful)
    setTimeout(() => setLoading(false), 100);
  }, [roleRequired]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Checking authentication...</p>
      </div>
    );
  }

  return authorized ? children : <Navigate to="/login/member" replace />;
}
