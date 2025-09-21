import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingEffects from "../Components/LoadingEffects";

function SignUp() {
  const inputStyle = "background-icons p-3 md:p-4 rounded-lg outline-none";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("https://noteapp-fullstack-6ksr.onrender.com/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
       toast.success(data.message)
        navigate("/login");
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error);
      alert("Server error, please try again later.");
    }finally{
      setLoading(false)
    }
  };

  return (
    <>    <section className="flex items-center justify-center w-screen h-screen">
      <div className="w-[90%] md:w-[50%] h-[50%]">
        <h1 className="text-center text-2xl font-semibold"> Sign Up First </h1>

        <form className="flex flex-col gap-5 mt-7" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder=" Name "
            className={inputStyle}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
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
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>

    </section>
      {Loading && <LoadingEffects />}
    </>
  );
}

export default SignUp;
