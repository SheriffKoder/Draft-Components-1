import React from 'react'
import GradientCornerBorder from './GradientCornerBorder'

const page = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center relative bg-black'>
        
        <div className='w-[500px] h-[500px] relative'>

            {/* gradient border */}
            <GradientCornerBorder />

            {/* main card */}
            <div className="absolute top-[0px] left-[0px] w-full h-full bg-gray-900/70 rounded-lg z-[1]
            flex flex-col justify-center items-center">
                Main card
            </div>
        </div>
    </div>
  )
}

export default page
