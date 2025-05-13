"use client"
import React, { useState } from 'react'
import GaugeContainer from './GaugeContainer'

///////////////////////////////////////////////////////////
// MAIN COMPONENT
///////////////////////////////////////////////////////////

const Page = () => {
  ///////////////////////////////////////////////////////////
  // STATE MANAGEMENT
  ///////////////////////////////////////////////////////////
  const [greedValue, setGreedValue] = useState(50); // Default value of 50

  ///////////////////////////////////////////////////////////
  // EVENT HANDLERS
  ///////////////////////////////////////////////////////////
  const handleRandomGreed = () => {
    // Generate random number between 0 and 100
    const randomValue = Math.floor(Math.random() * 101);
    setGreedValue(randomValue);
  };

  ///////////////////////////////////////////////////////////
  // RENDER COMPONENT
  ///////////////////////////////////////////////////////////
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center pt-[2rem]'>
        <h1 className='text-2xl font-bold p-2 mb-[2rem] w-full bg-white/10 text-center'>
            Greed Index
            <p className='text-xs font-light text-foreground/30'>Greed Index/ speedometer chart</p>
        </h1>

        <div className='w-[600px] h-[460px] bg-white/10 rounded-lg'>
            <GaugeContainer value={greedValue} />
        </div>

        {/* Random Value Button */}
        <div className='mt-6 z-10'>
            <button 
                onClick={handleRandomGreed}
                className='px-6 py-3 bg-purple-900 hover:bg-purple-700 text-white rounded-lg 
                          transition-colors duration-200 shadow-lg flex items-center justify-center'
            >
                <span className='mr-2'>Generate Random Greed Value</span>
                <span className='text-sm bg-white/20 px-2 py-1 rounded-full'>{greedValue}</span>
            </button>
        </div>
    </div>
  )
}

export default Page
