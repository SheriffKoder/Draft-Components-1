"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'


// Define box positions (final positions)
const boxPositions = [
  { top: '10%', left: '15%', color: 'bg-blue-500', initialScale: 25, initialX: -2500, initialY: -1800, finalScale: 1.6, image: '/images/clients/client-1.png', opacity: 0.95 },
  { top: '15%', left: '35%', color: 'bg-green-500', initialScale: 18, initialX: 400, initialY: -2200, finalScale: 1.3, image: '/images/clients/client-2.png', opacity: 0.93 },
  { top: '75%', left: '18%', color: 'bg-yellow-500', initialScale: 25, initialX: -3000, initialY: 1800, finalScale: 1.4, image: '/images/clients/client-3.png', opacity: 0.93 },
  { top: '65%', left: '70%', color: 'bg-fuchsia-500', initialScale: 25, initialX: 4000, initialY: 2000, finalScale: 2.1, image: '/images/clients/client-4.png', opacity: 1 },
  { top: '18%', left: '65%', color: 'bg-red-500', initialScale: 18, initialX: 3000, initialY: -1500, finalScale: 1.8, image: '/images/clients/client-5.png', opacity: 1 }
]

const LayeringZoom = () => {
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
          opacity: boxPositions[index].opacity,
          ease: "power3.out",
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
              className={`absolute w-[100px] h-[100px] rounded-md overflow-hidden bg-red-500`}
              style={{ position: 'absolute' }}
            >
                {/* <Image src={box.image} alt={box.image} fill className='object-cover' /> */}
            </div>
          ))}
          
          {/* Text content */}
          <div 
            ref={textContentRef}
            className='scale-[5] relative flex flex-col items-center justify-center w-[100%] mx-auto h-full z-10 opacity-0'
          >
            <div className='block border'>
              {/* <Slider cards={testimonialsCards} variation={1} */}
              {/* // mode={mode} */}
              {/* // handleShowModal={handleShowModal} */}
              {/* /> */}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayeringZoom
