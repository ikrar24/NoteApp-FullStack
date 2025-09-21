// ProtectedRoute.js
import React from "react";
import { getCookie } from "./Utils/GetCookies";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = getCookie("authToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
