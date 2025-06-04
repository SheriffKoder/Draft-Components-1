'use client'
import React, { useEffect, useState } from 'react'

const PressIndicatorText = ({show, buttonClicked}: {show: boolean, buttonClicked: boolean}) => {
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    if (show) {
        setTimeout(() => {
            setIsRevealed(true)
        }, 1000)
    }
  }, [show])

  return (
    <div className='flex flex-row gap-2 w-[220px] items-center justify-center opacity-50 font-extralight'>
        <div className={`text-white transition-opacity duration-1000 ease-in-out ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>[</div>
        <div className={`w-0 ${isRevealed ? 'w-[280px] opacity-100' : 'opacity-0'} transition-all duration-1000 overflow-hidden flex justify-center`}>
            <div className='text-white whitespace-nowrap text-center w-full'>
                PRESS THE BUTTON


            </div>
        </div>
        <div className={`text-white transition-opacity duration-500 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>]</div>
    </div>
  )
}

export default PressIndicatorText
