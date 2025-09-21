import React from 'react'
import haveNot from "../assets/haveNot.png"
import { Link } from 'react-router-dom'
function HaveNotNotes() {
  return (
    <main className='transition-all' >
      <div className=' mt-28 w-screen flex items-center justify-center flex-col  ' >
      <img src={haveNot} alt="have Not Note Png" className=' w-[80%] ' />
      <Link to="/create" className=' text-blue-300 text-sm cursor-pointer '> Create Your First Note </Link>
      </div>
    </main>
  )
}

export default HaveNotNotes
