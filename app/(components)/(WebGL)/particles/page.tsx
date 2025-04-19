"use client"
import React, { useEffect } from 'react'
import { particleAnimation } from './particles'
const page = () => {
    useEffect(() => {
        particleAnimation()
    }, [])  
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
      <div className="w-full h-full bg-black overflow-hidden" id='canvasContainer'></div>
    </div>
  )
}

export default page
