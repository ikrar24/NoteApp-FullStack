import React from 'react'
import { useSearchStore } from '../Store/SearchValue.js'




function SearchBar() {
  const { initialValue, setInitialValue } = useSearchStore();
  return (
    <div className=' flex w-screen items-center justify-center ' >
    <input type="text" value={initialValue}  onChange={(e)=>{setInitialValue(e.target.value)}} placeholder='Search Your Notes' className=" p-3 w-[90vw] background border rounded outline-none " />  
    </div>
  )
}

export default SearchBar
