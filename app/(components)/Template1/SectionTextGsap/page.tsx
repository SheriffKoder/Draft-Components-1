"use client"
import React, { useRef } from 'react'
import CreativeTextAnim from './CreativeTextAnim'

const page = () => {
  const containerRef = useRef(null)
  return (
    <div className='w-full bg-black flex flex-col justify-center items-center relative'>
      
      
    <div className='h-screen w-full bg-black flex flex-col justify-center items-center relative'>
    </div>

    <div className='h-screen w-full bg-black flex flex-col justify-center items-center relative'
    ref={containerRef}>
    <CreativeTextAnim trigger={containerRef} />
    </div>

    <div className='h-screen w-full bg-black flex flex-col justify-center items-center relative'>
    </div>

    </div>
  )
}

export default page
