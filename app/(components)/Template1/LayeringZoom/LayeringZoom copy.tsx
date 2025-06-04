"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
// import CreativeTextAnim from './CreativeTextAnim'

// Define box positions (final positions)
const boxPositions = [
  { top: '10%', left: '15%', color: 'bg-blue-500', initialScale: 15, initialX: -1500, initialY: -1000, finalScale: 1.5 },
  { top: '25%', left: '35%', color: 'bg-green-500', initialScale: 10, initialX: 200, initialY: -1500, finalScale: 0.8 },
  { top: '60%', left: '18%', color: 'bg-yellow-500', initialScale: 15, initialX: -2000, initialY: 1000, finalScale: 1.2 },
  { top: '60%', left: '70%', color: 'bg-fuchsia-500', initialScale: 15, initialX: 3000, initialY: 1200, finalScale: 1.7 },
  { top: '25%', left: '65%', color: 'bg-red-500', initialScale: 10, initialX: 2000, initialY: -900, finalScale: 0.9 }
]

const LayeringZoomBoxes = () => {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const secondElementRef = useRef(null)
  const backgroundRef = useRef(null)
  const textContentRef = useRef(null)
  const boxRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)
    
    // Create the scaling animation for the first element
    const firstAnimation = gsap.to(textRef.current, {
      scale: 0.3, // Scale down to 30%
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "50% top", // Start at the top of the container
        end: "75% bottom", // trigger / viewport
        // markers: true,
        scrub: true, // Smooth scrubbing effect
      }
    })
    
    // Create the opacity animation for the background (faster)
    gsap.to(backgroundRef.current, {
      opacity: 1, // Increase opacity to 100%
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "60% bottom", // Start earlier
        end: "70% bottom", // End earlier
        scrub: true,
      }
    })
    
    // Create the opacity animation for the text content (slower)
    gsap.to(textContentRef.current, {
      opacity: 1, // Increase opacity to 100%
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "63% bottom", // Start earlier
        end: "85% bottom", // End later
        scrub: true,
      }
    })
    
    // Animate each box from scaled position to final position
    boxRefs.current.forEach((box, index) => {
      if (box) {
        // Set initial position (scaled and offset)
        gsap.set(box, { 
          top: boxPositions[index].top, 
          left: boxPositions[index].left, 
          opacity: 0,
          scale: boxPositions[index].initialScale,
          x: boxPositions[index].initialX,
          y: boxPositions[index].initialY,
          transformOrigin: "center center"
        })
        
        // Animate to final position
        gsap.to(box, {
          scale: boxPositions[index].finalScale,
          x: 0,
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "67% bottom", // Start earlier
            end: "100% bottom", // End later
            scrub: true,
          }
        })
      }
    })
    
    return () => {
      // Clean up ScrollTrigger on component unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-black">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center">
        <h1 ref={textRef} className="text-white text-[100px]">
          {/* <CreativeTextAnim trigger={containerRef} /> */}
          Hello World
        </h1>
        
        {/* Second fixed element with separate background and text */}
        <div 
          ref={secondElementRef} 
          className="absolute w-full h-[100vh] overflow-hidden"
        >
          {/* Background div */}
          <div 
            ref={backgroundRef}
            className="absolute w-full h-full bg-black opacity-0"
          ></div>
          
          {/* Render boxes using the positions array */}
          {boxPositions.map((box, index) => (
            <div 
              key={index}
              ref={el => {
                if (el) {
                  boxRefs.current[index] = el;
                }
              }}
              className={`absolute w-[100px] h-[100px] ${box.color}`}
              style={{ position: 'absolute' }}
            ></div>
          ))}
          
          {/* Text content */}
          <div 
            ref={textContentRef}
            className='scale-[5] relative flex flex-col items-start justify-center px-[20%] h-full w-full z-10 opacity-0'
          >
            <span className='text-white text-[20px]'>(OUR AWARDS)</span>
            <h1 className='text-white text-[30px]'>
              NOT FOR OUR EGOS, BUT BECAUSE AWARDS ARE A MEASURE OF CREATIVITY,
              ORIGINALITY AND QUALITY. AIMING FOR AWARDS PUSHES US TO THINK DEEPER, GO
              FURTHER AND HAVE MEANINGFUL CONVERSATIONS ABOUT WHAT CREATIVITY IS.
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayeringZoomBoxes
