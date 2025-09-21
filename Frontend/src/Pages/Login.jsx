import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const inputStyle = "background-icons p-3 md:p-4 rounded-lg outline-none";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
         credentials: "include", // include cookies in the request
      });

      const data = await res.json();
      console.log(data);
      
      if (res.ok) {
        alert("Login successful ✅");
        localStorage.setItem("token", data.token); // token save
        navigate("/"); // redirect after login
      } else {
        alert(data.message || "Invalid credentials ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server error, please try again later.");
    }
  };

  return (
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
  );
}

export default Login;
