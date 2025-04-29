"use client";
import React, { useRef, useState } from 'react'
import Image from 'next/image'
const page = () => {

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLDivElement>(null);
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (imageRef.current) {
          const rect = imageRef.current.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setMousePosition({ x, y });
        }
      };
    
      const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        // Implement the logic to handle click event
        console.log("Mouse Position", "X:", mousePosition.x.toFixed(2), "Y:", mousePosition.y.toFixed(2))
      };

  return (
    <div className='relative w-full h-[100vh] flex items-center justify-center'>
        <div 
            className="relative aspect-[568/357] w-[900px] group overflow-visible bg-purple-800/10
            "
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
            style={{
        }}>

          {/* div with 8x8 boxes */}
          <div className='h-full w-full flex flex-row flex-wrap'>
            {Array.from({ length: 12 }, (_, index) => (
              <div key={index} className='w-1/4 h-1/3 border'></div>
            ))}
          </div>
            <div className='absolute inset-0'
            style={{
                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(150, 0, 200, 0.5), rgba(0, 0, 0, 0))`
            }}
            ></div>
                    
            <div className="absolute bottom-0 left-0 bg-black/70 text-white p-1 text-xs">
                Position: {mousePosition.x.toFixed(2)}% left, {mousePosition.y.toFixed(2)}% top
            </div>
        </div>
    </div>
  )
}

export default page
