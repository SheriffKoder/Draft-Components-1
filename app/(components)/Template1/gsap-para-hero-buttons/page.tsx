"use client"
import React, { useState } from 'react'
import FramerHeroAnimation from './FramerHeroAnimation'

const page = () => {

    const [currentText, setCurrentText] = useState("para1");
    const [isBusy, setIsBusy] = useState(false);

    const handleClick = (identifier: string) => {
        setIsBusy(true);
        setCurrentText(identifier);
        setTimeout(() => {
            setIsBusy(false);
        }, 1500);
    }


  return (
    <div className='w-full h-screen bg-black flex flex-row justify-center items-center relative'>
    
    <div className='h-[50vh] w-[50vw] bg-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border flex flex-col justify-center items-center'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <FramerHeroAnimation 
            checker="para1"
            identifier={currentText}
            paragraph="This is a paragraph, of many lines, and it will be animated"
        />
        </div>

        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <FramerHeroAnimation 
            checker="para2"
            identifier={currentText}
            paragraph="In a real world scenario, this would be a paragraph, of many lines, and it will be animated"
        />
        </div>
    </div>


    <div className='absolute bottom-[3rem] left-1/2 -translate-x-1/2 -translate-y-1/2'>
    <button onClick={() => handleClick("para1")} disabled={isBusy} className={`bg-white text-black px-4 py-2 rounded-md ${isBusy ? "opacity-50" : ""}`}>Para 1</button>
    <button onClick={() => handleClick("para2")} disabled={isBusy} className={`bg-white text-black px-4 py-2 rounded-md ${isBusy ? "opacity-50" : ""}`}>Para 2</button>
    </div>

    </div>
  )
}

export default page
