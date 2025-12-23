import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute
 * - roleRequired: "owner" | "trainer" | "member"
 * - children: the dashboard component
 */
export default function ProtectedRoute({ children, roleRequired }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // No token or user → redirect to login based on required role
  if (!token || !user) {
    let loginPage = "/login/member";
    if (roleRequired === "owner") loginPage = "/login/owner";
    else if (roleRequired === "trainer") loginPage = "/login/trainer";

    return <Navigate to={loginPage} replace />;
  }

  // Role mismatch → unauthorized
  if (roleRequired && user.role.toLowerCase() !== roleRequired.toLowerCase()) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
