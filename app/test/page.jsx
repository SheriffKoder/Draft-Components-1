'use client'
import React, { useState } from 'react'

const Page = () => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className='w-full flex items-center justify-center h-[100vh] bg-black'>
      <div className="relative">
        <button 
          onClick={() => setShowTooltip(!showTooltip)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Click Me
        </button>
        
        <div 
          className={`
            absolute left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded
            transition-all duration-500 pointer-events-none
            ${showTooltip ? 'opacity-100 -translate-y-[50px]' : 'opacity-0 translate-y-0'}
          `}
          style={{ 
            transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
          }}
        >
          This is a tooltip that moves with cubic-bezier!
        </div>
      </div>
    </div>
  )
}

export default Page
