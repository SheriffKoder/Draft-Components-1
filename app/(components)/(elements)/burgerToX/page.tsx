"use client"
import React, { useState } from 'react'

const BurgerToX = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="FullScreen_CenteredFlex" onClick={handleClick}>
      <button className="flex flex-col justify-center items-center">
        <span className={`dark:bg-white bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-2' : '-translate-y-0.5'}`}></span>
        <span className={`dark:bg-white bg-black block transition-all duration-300 ease-out  h-0.5 w-6 rounded-sm my-1 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`dark:bg-white bg-black block transition-all duration-300 ease-out  h-0.5 w-6 rounded-sm my-1 ${isOpen ? '-rotate-45 -translate-y-2' : '-translate-y-0.5'}`}></span>
      </button>
    </div>
  )
}

export default BurgerToX;