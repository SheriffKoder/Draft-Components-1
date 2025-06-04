"use client"
import React from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

const SmoothScrollButton = ({ 
  sectionId, 
  text, 
  backgroundColor, 
  textColor, 
  className 
}: { 
  sectionId: string, 
  text: string, 
  backgroundColor: string, 
  textColor: string, 
  className: string 
}) => {
  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Attempting to scroll to section with ID: ${sectionId}`);
    
    const targetElement = document.getElementById(sectionId);
    console.log("Target element found:", targetElement);
    
    if (targetElement) {
      // Use GSAP to animate scroll instead of our custom animation
      // This will work better with your ScrollTrigger setup
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: `#${sectionId}`,
          offsetY: 0
        },
        ease: "power3.inOut",
        onStart: () => console.log("GSAP scroll animation started"),
        onComplete: () => console.log("GSAP scroll animation completed")
      });
    } else {
      console.error(`Target element with ID '${sectionId}' not found!`);
      console.log("Available IDs on page:", 
        Array.from(document.querySelectorAll('[id]'))
          .map(el => `${el.id} (${el.tagName})`)
      );
    }
  };

  return (
    <a 
      href={`#${sectionId}`}
      className={`cursor-pointer group ${className}`}
      onClick={handleScroll}
    >
      <span className='opacity-0'>{text}</span>
      
      {/* <div 
        className={`z-[-1] h-[calc(100%+15px)] rounded-[1px]  w-[calc(100%+30px)] -skew-x-11 absolute top-[55%] left-[50%] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out rotate-[12deg]`}
        style={{ backgroundColor }}
      ></div> */}

      <div className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[calc(100%+30px)] h-[calc(100%+15px)] group-hover:w-[10px] z-[-1] skew-x-11 transition-all duration-300 ease-in-out
         group-hover:opacity-50 underline underline-offset-[5px] text-white border-transparent
      `} style={{ backgroundColor }}></div> 



      <span 
        className={`absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-full group-hover:pb-2 group-hover:underline transition-all duration-300 ease-in-out`}
        style={{ color: textColor }}
      >
        {text}
      </span>
    </a>
  )
}

export default SmoothScrollButton