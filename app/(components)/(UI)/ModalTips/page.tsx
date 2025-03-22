"use client"
import React, { useState } from 'react'
import InstructionsModalListings from './InstructionsModalListings'

const page = () => {
  const [showInstructionsModal, setShowInstructionsModal] = useState(true)
  return (
    <div className='flex justify-center items-center h-screen'>
      
        <button className='bg-white/20 px-4 py-2 rounded-lg border border-white/20 cursor-pointer' 
        onClick={() => setShowInstructionsModal(true)}>
            Show Instructions
        </button>
      
      <InstructionsModalListings setShowInstructionsModal={setShowInstructionsModal} showInstructionsModal={showInstructionsModal} />
    </div>
  )
}

export default page
