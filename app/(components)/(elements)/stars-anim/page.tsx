import React from 'react'
import StarsContainer from './StarsContainer'
import StarsContainer1 from './StarsContainer copy'
import StarsContainer2 from './StarsContainer copy 2'
import Star from './Star'

const page = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center relative bg-black'>
        <StarsContainer size={100} animateStars={true} />
        <StarsContainer1 size={100} />
        <StarsContainer2 size={100} />
        <Star size={50} />
    </div>
  )
}

export default page
