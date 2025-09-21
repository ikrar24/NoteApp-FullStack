import React from 'react'
import { SyncLoader } from 'react-spinners'

function LoadingEffects() {
  return (
    <div className=" fixed flex z-[1000] items-center justify-center backdrop-blur-md background-loading w-screen h-screen ">
      
    <SyncLoader />
  
    </div>
  )
}

export default LoadingEffects;
