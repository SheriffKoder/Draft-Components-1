import React from 'react'
import IncreasingNumbers2 from './IncreasingNumbers2'
const page = () => {
  return (
    <div className='w-full flex items-center justify-center h-[100vh] bg-black'>
      <IncreasingNumbers2 number={2000} duration={2000}/>
    </div>
  )
}

export default page
