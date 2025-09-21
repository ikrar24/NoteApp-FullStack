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
import { SyncLoader } from "react-spinners"
import LoadingEffects from "./Components/LoadingEffects";
import NotesDetails from "./Pages/NotesDetails";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const location = useLocation();
  const hideLayout = location.pathname === "/create";



  // ✅ Zustand store destructure
  const { error, fetchUsers, loading, users } = useUserStore();
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers])
  
  // setuserLength(users.user.notes)
  // setTimeout(() => {
    
    // }, 3000);
 

  

  


  return (
    <>
{
  loading?<LoadingEffects/>:  <div className="flex items-center justify-center w-screen ">
      <div className="overflow-x-hidden scrollbar-hide md:w-[95%] w-full h-[100vh] background text-white flex flex-col">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                {!hideLayout && <Navbar />}
              {
  users?.user?.notes.length===0?(!hideLayout && <HaveNotNotes/>) 
    : (!hideLayout && <TotalNotes />)
}

                
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

}

    

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
