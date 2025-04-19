"use client"
import React from 'react'
import VaporWave from './VaporWave'
const page = () => {
  return (
    <div className="h-screen w-screen">
        <div className="w-full h-full absolute top-0 left-0 z-[-2] opacity-50 overflow-hidden vaporWave"
        id="#vaporWave">
            <VaporWave />
        </div>
    </div>
  )
}

export default page
