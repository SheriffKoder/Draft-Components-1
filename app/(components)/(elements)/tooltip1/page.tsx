import React from 'react'
import Tooltip1 from './tooltip1'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      
      <h1 className='text-2xl font-bold relative'>Tooltip 1
        <Tooltip1 />
      </h1>
    
    </div>
  )
}

export default page
