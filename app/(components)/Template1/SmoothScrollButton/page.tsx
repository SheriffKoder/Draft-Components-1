import React from 'react'
import SmoothScrollButton from './SmoothScrollButton'
const page = () => {
  return (
    <div className='w-full h-screen bg-black flex flex-row justify-center items-center'>
      <SmoothScrollButton sectionId="fleet" text="Check our fleet" backgroundColor="#03684B" textColor="white"
      className='localfont2 text-[15px] underline underline-offset-[5px] uppercase absolute bottom-1/2 right-1/2 translate-x-1/2  translate-x-1/2 z-[10]'/>
    </div>
  )
}

export default page
