import React, { useEffect, useRef } from 'react'
import { useSearchStore } from '../Store/SearchValue.js'

function SearchBar({ SearchFoucs }) {
  const { initialValue, setInitialValue } = useSearchStore();
  const inputRef = useRef(null);


  useEffect(() => {
    if (SearchFoucs && inputRef.current) {
      inputRef.current.focus(); // 👈 Focus hoga, style bilkul same rahega
      
    }
  }, [SearchFoucs]);

  return (
    <div className='flex w-screen items-center justify-center'>
      <input
        ref={inputRef}
        type="text"
        value={initialValue}
        onChange={(e) => setInitialValue(e.target.value)}
        placeholder='Search Your Notes'
        className="p-3 w-[90vw] background border rounded outline-none"
      />  
    </div>
  )
}

export default SearchBar
