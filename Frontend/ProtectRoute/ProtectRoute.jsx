import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingEffects from "../src/Components/LoadingEffects";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Backend se auth check karo
        const response = await fetch("https://noteapp-fullstack-6ksr.onrender.com/check-auth", {
          method: "GET",
          credentials: "include", // cookies send karne ke liye
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok && data.authenticated) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <LoadingEffects />;

  if (!authenticated) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
