import React, { useState } from "react";
import { FaSearch, FaPlus, FaTimes } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom"
function Navbar() {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [SearchFoucs, setSearchFoucs] = useState(false);

// config navigation 
const navigate = useNavigate();

  // Search 
  const handleSearch = () => {
    setToggleSearch((prev) => !prev);
    setSearchFoucs((prev) => !prev);
  };


// Logout 
const handleLogOute = async ()=>{
   await fetch("https://noteapp-fullstack-6ksr.onrender.com/api/user/logout", {
    method: "POST",
    credentials: "include" 
  });

  // Redirect ya UI update
  navigate("/login")
}

  return (
    <>
      <header className="flex items-center justify-center mt-5">
        <nav className="flex items-center justify-between w-[80%] ">
          {/* heading  */}
          <ul className=" ">
            <li className=" font-300 text-4xl font-nunito ">
              <a href="/"> Note </a>
            </li>
          </ul>

          {/* search $ Logout */}
          <ul className=" flex gap-5 justify-center items-center " >
           
            <li className=" text-2xl cursor-pointer ">
              {toggleSearch ? (
                <FaTimes onClick={handleSearch} />
              ) : (
                <FaSearch onClick={handleSearch} />
              )}
            </li>

<li className=" text-3xl cursor-pointer font-bold  ">
              <MdLogout onClick={handleLogOute} />
            </li>


          </ul>


        </nav>
      </header>

      <div
        className={`  w-screen ${
          toggleSearch ? "flex" : "hidden"
        } items-center justify-center mt-6  `}
      >
        <SearchBar SearchFoucs={SearchFoucs} />
      </div>
    </>
  );
}

export default Navbar;
