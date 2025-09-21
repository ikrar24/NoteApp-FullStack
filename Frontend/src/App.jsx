import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import PlusIcon from "./Components/PlusIcon";
import { Routes, Route, useLocation } from "react-router-dom";
import CreatePage from "./Pages/CreatePage";
import HaveNotNotes from "./Components/HaveNotNotes";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import ProtectedRoute from "../ProtectRoute/ProtectRoute";
import TotalNotes from "./Components/TotalNotes";
import useUserStore from "./Store/UseUserStore";
import LoadingEffects from "./Components/LoadingEffects";
import NotesDetails from "./Pages/NotesDetails";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === "/create";

  const { error, fetchUsers, loading, users } = useUserStore();
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // ✅ Check user auth with backend
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('https://noteapp-fullstack-6ksr.onrender.com/check-auth', {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        setAuthenticated(data.authenticated);
        if (data.authenticated) {
          fetchUsers(); // Only call fetchUsers if authenticated
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, [fetchUsers]);

  if (checkingAuth) return <LoadingEffects />; // Wait till auth check is done

  return (
    <>
      <div className="flex items-center justify-center w-screen ">
        <div className="overflow-x-hidden scrollbar-hide md:w-[95%] w-full h-[100vh] background text-white flex flex-col">
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  {!hideLayout && <Navbar />}
                  {authenticated && (
                    users?.user?.notes.length === 0
                      ? (!hideLayout && <HaveNotNotes />)
                      : (!hideLayout && <TotalNotes />)
                  )}
                  {!hideLayout && <PlusIcon />}
                </ProtectedRoute>
              }
            />

            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreatePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notedetails/:id"
              element={
                <ProtectedRoute>
                  <NotesDetails />
                </ProtectedRoute>
              }
            />

          </Routes>
        </div>
      </div>

      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </>
  );
}

export default App;
