'use client'
import React, { useEffect, useRef, useState } from 'react'
import { AnimatedText } from '../../(elements)/FadeUpText/AnimatedText';



const TabSwitcher = ({incomingData}: {incomingData: any}) => {
  // State management
  const [selectedService, setSelectedService] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Refs
  const containerRef = useRef(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeButtonPosition, setActiveButtonPosition] = useState({ left: 0, width: 0 });

  // Update the active button indicator position
  useEffect(() => {
    const activeButton = buttonRefs.current[selectedService];
    if (activeButton) {
      setActiveButtonPosition({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [selectedService]);

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setSelectedService((prev) => (prev + 1) % incomingData.length);
      }
    }, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [isPaused]);
  
  return (
    <div 
      className="border w-full flex flex-col justify-center items-center"
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Description display area */}
      <div className="text-start w-full">
        <p className='font-light text-3xl text-gray-300'>
            <AnimatedText text={incomingData[selectedService].description} />
        </p>
      </div>
      
      {/* Navigation at the bottom */}
      <div className="absolute bottom-0 flex flex-row items-center justify-center
        rounded-tl-2xl rounded-tr-2xl bg-gray-200/10 border border-gray-200/10
        overflow-hidden ">
        
        {/* Moving background indicator */}
        <div 
          className="absolute h-full bg-[#17D9FF] transition-all duration-300 ease-in-out"
          style={{
            left: activeButtonPosition.left,
            width: activeButtonPosition.width,
          }}
        />
        
        {/* Service buttons */}
        {incomingData.map((service: any, index: any) => (
          <button
            key={index}
            ref={el => { buttonRefs.current[index] = el; }}
            className={`px-8 py-5 pb-4 relative z-10
                ${selectedService === index ? 'text-black' : 'hover:text-[#17D9FF]'}`}
            onClick={() => setSelectedService(index)}
          >
            {service.title}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TabSwitcher
