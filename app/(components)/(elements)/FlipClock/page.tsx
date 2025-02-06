import React from 'react'
import FlipClock1 from './FlipClock1'
import FlipClock2 from './FlipClock2'

const page = () => {
  return (
    <div className='h-[100vh] flex items-center justify-center flex-col gap-[10rem]'>
      <FlipClock1/>
      <FlipClock2/>
    </div>
  )
}

export default page
