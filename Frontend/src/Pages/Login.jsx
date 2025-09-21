import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingEffects from "../Components/LoadingEffects";

function Login() {
  const inputStyle = "background-icons p-3 md:p-4 rounded-lg outline-none";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false)
  const navigate = useNavigate();

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch("https://noteapp-fullstack-6ksr.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
         credentials: "include", // include cookies in the request
      });

      const data = await res.json();
     
      
      if (res.ok) {
     console.log(data);
     
        toast.success(data.message);
        localStorage.setItem("token", data.token); // token save
        setTimeout(() => navigate("/"), 500);
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error);
     toast.error(error)
    }finally{
      setLoading(false)
    }
  };

  return (
    <>
    <section className="flex items-center justify-center w-screen h-screen">
      <div className="w-[90%] h-[50%] md:w-[50%]">
        <h1 className="text-center text-2xl font-semibold">Login</h1>

        {/* form handling */}
        <form
          className="flex flex-col gap-5 mt-7"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder=" Email "
            className={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="p-3 rounded-lg outline-none bg-white text-black text-xl"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3 text-sm">
          If you don’t have an account{" "}
          <Link to="/signup" className="text-blue-400">
            Signup Now
          </Link>
        </p>
      </div>
    </section>
    {Loading && <LoadingEffects />}
    </>
  );
}

export default Login;
