import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingEffects from "../src/Components/LoadingEffects";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('https://noteapp-fullstack-6ksr.onrender.com/check-auth', {
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();
        setAuthenticated(data.authenticated);
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthenticated(false); // error hua toh login page bhej do
      } finally {
        setLoading(false); // fetch complete hone ke baad loading false
      }
    };

    checkAuth();
  }, []);

  if (loading) return <LoadingEffects/>;

  if (!authenticated) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
