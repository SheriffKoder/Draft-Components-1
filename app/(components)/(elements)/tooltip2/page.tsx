import React from 'react'
import Tooltip2 from './tooltip2'

const page = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold relative'>Tooltip 2
        <Tooltip2 />
      </h1>
    </div>
  )
}

export default page
