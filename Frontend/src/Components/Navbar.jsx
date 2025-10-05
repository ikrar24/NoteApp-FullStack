import React, { useState } from "react";
import { FaSearch, FaPlus , FaTimes} from "react-icons/fa";
import SearchBar from "./SearchBar";
function Navbar() {

  const [toggleSearch, setToggleSearch] = useState(false)
  const [SearchFoucs, setSearchFoucs] = useState(false)
const handleSearch = ()=>{
  setToggleSearch((prev)=>!prev)
  setSearchFoucs((prev)=>!prev)
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


        {/* search Box  */}
        <ul>
          <li className=" text-2xl cursor-pointer ">
            {
              toggleSearch?<FaTimes onClick={handleSearch} />:<FaSearch onClick={handleSearch} />
            }
            
          </li>
        </ul>

      </nav>
    </header>
    
    
      <div className={`  w-screen ${toggleSearch?"flex":"hidden"} items-center justify-center mt-6  `} >
<SearchBar SearchFoucs={SearchFoucs} />
    </div>
    </>
  );
}

export default Navbar;
