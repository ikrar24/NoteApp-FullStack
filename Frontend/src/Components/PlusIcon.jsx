import React, { useState } from 'react'
import {FaPlus} from "react-icons/fa"
import { Link } from 'react-router-dom'
function PlusIcon() {
    const [TogglePlusIcon, setTogglePlusIcon] = useState(false)

    const handlePlus = ()=>{
        setTogglePlusIcon((prev)=>!prev)
    }
  return (
    <>
    <div className={`${TogglePlusIcon?"translate-y-0 scale-100":"translate-y-20 scale-0 "} cursor-pointer transition-all fixed bottom-44 right-5 background-icons p-2 px-5 shadow-xl z-[1000] `}>
        <Link to="/create" className=' font-semibold ' >Create Notes</Link>
    </div>
    <div className={`${TogglePlusIcon?"rotate-45":"rotate-0"} transition-all fixed bottom-20 right-8  shadow-xl p-5 cursor-pointer background-icons rounded-full `} >
      <FaPlus  onClick={handlePlus} className=' text-2xl  font-extralight  ' />
    </div>
    </>
  )
}

export default PlusIcon
