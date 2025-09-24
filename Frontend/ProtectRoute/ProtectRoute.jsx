import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingEffects from "../src/Components/LoadingEffects";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      // localStorage me token check karo
      const token = localStorage.getItem("authToken");

      if (token) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <LoadingEffects />;

  if (!authenticated) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
